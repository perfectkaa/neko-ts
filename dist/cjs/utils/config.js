"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valid = exports.endpoints = exports.headersConfig = exports.baseUrl = void 0;
exports.baseUrl = 'https://nekopoi.care';
exports.headersConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        Referer: exports.baseUrl,
        'Accept-Language': 'en-US,en;q=0.9',
    },
};
exports.endpoints = {
    latest: '/category/hentai/page/__PAGE',
    search: '/search/__QUERY',
    random: '/random',
};
/**
 * Check if URL match with NekoPoi's URL.
 *
 * @param {string} url - URL to check.
 * @returns {boolean}
 */
const valid = (url) => new RegExp(/^(?:https?:\/\/)?(?:[^.]+\.)?nekopoi\.care(\/.*)?$/gm).test(url);
exports.valid = valid;
