"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const config_js_1 = require("../utils/config.js");
const get_js_1 = require("./get.js");
/**
 * Get a random hentai episode or page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata | IError>} Object of hentai episode or page metadata.
 */
const random = async () => {
    try {
        const res = await fetch(config_js_1.baseUrl + config_js_1.endpoints.random, {
            method: 'GET',
            headers: config_js_1.headersConfig.headers,
            redirect: 'manual',
        });
        if (res.status >= 300 && res.status < 400) {
            const redirectUrl = res.headers.get('location');
            if (!redirectUrl)
                throw new Error('Redirect location not found');
            return await (0, get_js_1.get)(redirectUrl);
        }
        throw new Error(`Unexpected response: ${res.status}`);
    }
    catch (err) {
        console.error(err);
        return {
            error: err instanceof Error ? err.message : 'Unknown error',
        };
    }
};
exports.random = random;
