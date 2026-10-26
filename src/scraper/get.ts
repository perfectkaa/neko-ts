import { load } from 'cheerio';
import type { EpisodeMetadata, HentaiMetadata, IError } from '../types/interfaces.js';
import { headersConfig } from '../utils/config.js';
import { parseSeriesMetadata, parseEpisodeMetadata } from '../utils/parser.js';

/**
 * Retrieves detailed metadata from a specific NekoPoi hentai episode or series URL.
 *
 * @param url - A valid NekoPoi hentai episode or series URL.
 * @returns A promise resolving to `HentaiMetadata`, `EpisodeMetadata`, or `IError`.
 */
export const get = async (
  url: string,
): Promise<HentaiMetadata | EpisodeMetadata | IError> => {
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

    if (url.includes('/hentai/')) {
      return parseSeriesMetadata($, url);
    }
    return parseEpisodeMetadata($);
  } catch (err) {
    console.error(err);
    return {
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};