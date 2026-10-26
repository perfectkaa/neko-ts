import type { HentaiRelease } from '../types/interfaces.js';
/**
 * Get a search result from NekoPoi.
 *
 * @param {string} query - Search query.
 * @returns {Promise<HentaiRelease[]>} Array object of search result.
 */
export declare const search: (query: string) => Promise<HentaiRelease[]>;
