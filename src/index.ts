import { get, random, release, search } from './scraper/index.js';
import type { EpisodeMetadata, HentaiMetadata, HentaiRelease, IError } from './types/interfaces.js';
import { valid } from './utils/config.js';

/**
 * Main entry point for the NekoTs scraper.
 *
 * Provides methods to fetch releases, search results, and detailed
 * metadata from NekoPoi.
 */
export default class NekoTs {
  /**
   * Fetches a list of the latest released hentai.
   *
   * @param page - Page number to retrieve. Defaults to `1`.
   * @returns A promise resolving to an array of `HentaiRelease` objects.
   */
  release(page?: number): Promise<HentaiRelease[]> {
    return release(page ?? 1);
  }

  /**
   * Searches NekoPoi for a given query string.
   *
   * @param query - The search term. Must be a non-empty string.
   * @returns A promise resolving to an array of matching `HentaiRelease` objects.
   * @throws { Error } If the query is empty or consists only of whitespace.
   */
  search(query: string): Promise<HentaiRelease[]> {
    if (!query.trim()) {
      throw new Error('Please provide a valid search query!');
    }
    return search(query);
  }

  /**
   * Retrieves detailed metadata from a specific NekoPoi hentai episode or series URL.
   *
   * @param url - A valid NekoPoi episode or series URL.
   * @returns A promise resolving to either a `HentaiMetadata`, `EpisodeMetadata`, or `IError` object.
   * @throws { Error } If the URL is empty or does not match NekoPoi's domain.
   */
  get(url: string): Promise<HentaiMetadata | EpisodeMetadata | IError> {
    if (!url || !valid(url)) {
      throw new Error('Please provide a valid URL!');
    }
    return get(url);
  }

  /**
   * Fetches metadata for a randomly selected hentai from NekoPoi.
   *
   * @returns A promise resolving to either a `HentaiMetadata`, `EpisodeMetadata`, or `IError` object.
   */
  random(): Promise<HentaiMetadata | EpisodeMetadata | IError> {
    return random();
  }
}