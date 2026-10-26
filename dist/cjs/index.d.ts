import type { EpisodeMetadata, HentaiMetadata, HentaiRelease, IError } from './types/interfaces.js';
export default class NekoTs {
    /**
     * Get a list of released hentai.
     *
     * @param {number} [page=1] - Page number to be shown. Default is `1`.
     * @returns {Promise<HentaiRelease[]>} Array object of released hentai.
     */
    release(page?: number): Promise<HentaiRelease[]>;
    /**
     * Get a search result from NekoPoi.
     *
     * @param {string} query - Search query.
     * @returns {Promise<HentaiRelease[]>} Array object of search result.
     */
    search(query: string): Promise<HentaiRelease[]>;
    /**
     * Get the metadata of a specific hentai episode or page from a valid URL.
     *
     * @param {string} url - Hentai episode or page URL.
     * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
     */
    get(url: string): Promise<HentaiMetadata | EpisodeMetadata | IError>;
    /**
     * Get a random hentai episode or page.
     *
     * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
     */
    random(): Promise<HentaiMetadata | EpisodeMetadata | IError>;
}
