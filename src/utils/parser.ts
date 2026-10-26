import type { EpisodeMetadata, HentaiMetadata, HentaiRelease, IError } from '../types/interfaces.js';
import type { CheerioAPI, Element } from 'cheerio';

/**
 * Parses a single release item from a NekoPoi results page.
 *
 * @param $ - Cheerio instance loaded with the page HTML.
 * @param element - The DOM element representing a single release card.
 * @param baseUrl - The base URL for constructing absolute links.
 * @returns A populated `HentaiRelease` object.
 */
export const parseReleaseItem = (
  $: CheerioAPI<Element>,
  element: Element,
  baseUrl: string,
): HentaiRelease => {
  const $el = $(element);

  return {
    img: $el.find('img').attr('src') ?? '',
    title: $el.find('h2').text().trim() ?? '',
    url: baseUrl + ($el.find('a').attr('href') ?? ''),
    genre: $el.find('div.genre a')
      .map((_i, a) => $(a).text().trim())
      .get(),
    duration: $el.find('div.duration').text().trim() || null,
  };
};

/**
 * Parses metadata from a NekoPoi series page.
 *
 * @param $ - Cheerio instance loaded with the series page HTML.
 * @param url - The series URL (passed for potential future use or reference).
 * @returns Parsed `HentaiMetadata` object.
 */
export const parseSeriesMetadata = (
  $: CheerioAPI<Element>,
  _url: string,
): HentaiMetadata => {
  const episodesUrl = $('div.episodelist > ul > li a')
    .map((_i, e) => $(e).attr('href'))
    .get();

  const episodeCount = $('div.episodelist > ul > li').length;
  const list = $('div.listinfo li');

  return {
    img: $('div.imgdesc').find('img').attr('src') ?? '',
    title: $('title').text().trim() ?? '',
    synopsis: $('span.desc').find('p').text().trim() ?? '',
    views: Number($('div.tabs.tab2').last().text().split(' ')[0]) || 0,
    japanese: extractTextAfterLabel(list, $, 'Japanese') ?? '',
    category: extractTextAfterLabel(list, $, 'Jenis') ?? '',
    episode: episodeCount,
    status: extractTextAfterLabel(list, $, 'Status') ?? '',
    aired: extractTextAfterLabel(list, $, 'Tayang') ?? '',
    producer: extractListAfterLabel(list, $, 'Produser'),
    genre: extractLinksFromLabel(list, $, 'Genres'),
    duration: extractTextAfterLabel(list, $, 'Durasi') ?? '',
    score: Number(extractTextAfterLabel(list, $, 'Skor') ?? 0),
    url: episodesUrl,
  };
};

/**
 * Parses metadata from a NekoPoi episode page.
 *
 * @param $ - Cheerio instance loaded with the episode page HTML.
 * @returns Parsed `EpisodeMetadata` object.
 */
export const parseEpisodeMetadata = ($: CheerioAPI<Element>): EpisodeMetadata => {
  const konten = $('div.konten p');

  const result: EpisodeMetadata = {
    img: $('div.thm').find('img').attr('src') ?? '',
    title: $('title').text().trim() ?? '',
    synopsis: konten.eq(1).text().trim() ?? '',
    genre: extractTextFromChildren(konten, $, 'Genre'),
    producer: extractTextFromChildren(konten, $, 'Producers'),
    duration: extractTextFromChildren(konten, $, 'Duration'),
    size: {},
    download: {},
  };

  // Parse size info
  const sizeText = konten
    .filter((_i, el) => $(el).text().includes('Size'))
    .text()
    .replace(/^Size\s*:\s*/, '')
    .trim();

  if (sizeText) {
    sizeText.split('|').forEach((part) => {
      const match = part.trim().match(/(\d+P)\s*:\s*(\d+mb)/i);
      if (match) {
        const [, resolution, size] = match;
        result.size[resolution] = size.toUpperCase();
      }
    });
  }

  // Parse download links
  $('div.liner').each((_i, e) => {
    const qualityText = $(e).find('div.name').text().trim();
    const match = qualityText.match(/\[(\d+p)\]/i);

    if (match) {
      const resolution = match[1].toLowerCase();
      result.download[resolution] = [];

      $(e)
        .find('a')
        .each((_j, a) => {
          const link = $(a).attr('href')?.trim();
          if (link) {
            result.download[resolution].push(link);
          }
        });
    }
  });

  return result;
};

/* ----- Helper Functions ----- */

/**
 * Extracts and cleans text content that comes after a `<b>` label matching the given keyword.
 *
 * @param items - Cheerio collection of `<li>` elements to filter.
 * @param $ - Cheerio instance.
 * @param label - The label text to search for inside the `<b>` tag.
 * @returns Cleaned text content after the label, or `null` if not found.
 */
function extractTextAfterLabel(
  items: CheerioAPI<Element>,
  $: CheerioAPI<Element>,
  label: string,
): string | null {
  return (
    items
      .filter((_i, el) => $(el).find('b').text().includes(label))
      .contents()
      .not('b')
      .text()
      .trim()
      .replace(/^:\s*/, '') || null
  );
}

/**
 * Extracts and cleans a comma-separated list of items after a `<b>` label.
 *
 * @param items - Cheerio collection of `<li>` elements to filter.
 * @param $ - Cheerio instance.
 * @param label - The label text to search for inside the `<b>` tag.
 * @returns Array of trimmed strings parsed from the comma-separated list.
 */
function extractListAfterLabel(
  items: CheerioAPI<Element>,
  $: CheerioAPI<Element>,
  label: string,
): string[] {
  return (
    items
      .filter((_i, el) => $(el).find('b').text().includes(label))
      .contents()
      .not('b')
      .text()
      .trim()
      .replace(/^:\s*/, '')
      .split(/\s*,\s*/)
      .map((item) => item.trim())
      .filter((item) => item !== '') || []
  );
}

/**
 * Extracts text from `<a>` links within an `<li>` element whose `<b>` label matches.
 *
 * @param items - Cheerio collection of `<li>` elements to filter.
 * @param $ - Cheerio instance.
 * @param label - The label text to search for inside the `<b>` tag.
 * @returns Array of trimmed genre name strings.
 */
function extractLinksFromLabel(
  items: CheerioAPI<Element>,
  $: CheerioAPI<Element>,
  label: string,
): string[] {
  return (
    items
      .filter((_i, el) => $(el).find('b').text().includes(label))
      .find('a')
      .map((_i, a) => $(a).text().trim())
      .get() || []
  );
}

/**
 * Extracts and cleans text from child elements after removing the `<b>` label from a filtered set.
 *
 * @param items - Cheerio collection of `<p>` elements to filter.
 * @param $ - Cheerio instance.
 * @param label - The label text to search for inside the `<b>` tag.
 * @returns Cleaned string parsed from the comma-separated list.
 */
function extractTextFromChildren(
  items: CheerioAPI<Element>,
  $: CheerioAPI<Element>,
  label: string,
): string {
  return (
    items
      .filter((_i, el) => $(el).text().includes(label))
      .clone()
      .children('b')
      .remove()
      .end()
      .text()
      .trim()
      .replace(/^:\s*/, '')
      .split(/\s*,\s*/)
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .join(', ') || ''
  );
}