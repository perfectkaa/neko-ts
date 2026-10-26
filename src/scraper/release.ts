import { load } from 'cheerio';
import type { HentaiRelease } from '../types/interfaces.js';
import { baseUrl, endpoints, headersConfig } from '../utils/config.js';
import { parseReleaseItem } from '../utils/parser.js';

/**
 * Fetches a list of released hentai from NekoPoi.
 *
 * @param page - Page number to retrieve. Defaults to `1`.
 * @returns A promise resolving to an array of `HentaiRelease` objects.
 */
export const release = async (page: number = 1): Promise<HentaiRelease[]> => {
  const url = baseUrl + endpoints.latest.replace('__PAGE', String(page));

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