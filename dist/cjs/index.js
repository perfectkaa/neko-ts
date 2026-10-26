"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./scraper/index.js");
const config_js_1 = require("./utils/config.js");
class NekoTs {
    /**
     * Get a list of released hentai.
     *
     * @param {number} [page=1] - Page number to be shown. Default is `1`.
     * @returns {Promise<HentaiRelease[]>} Array object of released hentai.
     */
    release(page) {
        return (0, index_js_1.release)(page);
    }
    /**
     * Get a search result from NekoPoi.
     *
     * @param {string} query - Search query.
     * @returns {Promise<HentaiRelease[]>} Array object of search result.
     */
    search(query) {
        if (!query.trim()) {
            throw new Error('Please provide a valid search query!');
        }
        else {
            return (0, index_js_1.search)(query);
        }
    }
    /**
     * Get the metadata of a specific hentai episode or page from a valid URL.
     *
     * @param {string} url - Hentai episode or page URL.
     * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
     */
    get(url) {
        if (!url || !(0, config_js_1.valid)(url)) {
            throw new Error('Please provide a valid URL!');
        }
        else {
            return (0, index_js_1.get)(url);
        }
    }
    /**
     * Get a random hentai episode or page.
     *
     * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
     */
    random() {
        return (0, index_js_1.random)();
    }
}
exports.default = NekoTs;
