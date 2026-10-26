import type { EpisodeMetadata, HentaiMetadata, IError } from '../types/interfaces.js';
/**
 * Get the metadata of a specific hentai episode or page from a valid URL.
 *
 * @param {string} url - Hentai episode or page URL.
 * @returns {Promise<HentaiMetadata | EpisodeMetadata | IError>} Object of hentai episode or page metadata.
 */
export declare const get: (url: string) => Promise<HentaiMetadata | EpisodeMetadata | IError>;
