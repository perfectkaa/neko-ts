import type { EpisodeMetadata, HentaiMetadata, IError } from '../types/interfaces.js';
/**
 * Get a random hentai episode or page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata | IError>} Object of hentai episode or page metadata.
 */
export declare const random: () => Promise<HentaiMetadata | EpisodeMetadata | IError>;
