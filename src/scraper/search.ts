import { load } from 'cheerio';
import type { HentaiRelease } from '../types/interfaces.js';
import { baseUrl, endpoints, headersConfig } from '../utils/config.js';
import { parseReleaseItem } from '../utils/parser.js';

/**
 * Searches NekoPoi for hentai matching the given query.
 *
 * @param query - The search query string.
 * @returns A promise resolving to an array of matching `HentaiRelease` objects.
 */
export const search = async (query: string): Promise<HentaiRelease[]> => {
  const url = baseUrl + endpoints.search.replace('__QUERY', encodeURIComponent(query));

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: headersConfig.headers,
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const html = await res.text();
    const $ = load(html);
    const array: HentaiRelease[] = [];

    $('div.result div.top').each((_i, e) => {
      array.push(parseReleaseItem($, e, baseUrl));
    });

    return array;
  } catch (err) {
    console.error(err);
    return [];
  }
};