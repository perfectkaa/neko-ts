import type { HentaiRelease } from '../types/interfaces.js';
/**
 * Get a list of released hentai.
 *
 * @param {number} [page=1] - Page number to be shown. Default is `1`.
 * @returns {Promise<HentaiRelease[]>} Array object of released hentai.
 */
export declare const release: (page?: number) => Promise<HentaiRelease[]>;
