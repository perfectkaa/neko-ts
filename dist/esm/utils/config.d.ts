export declare const baseUrl = "https://nekopoi.care";
export declare const headersConfig: {
    headers: {
        'User-Agent': string;
        Referer: string;
        'Accept-Language': string;
    };
};
export declare const endpoints: {
    latest: string;
    search: string;
    random: string;
};
/**
 * Check if URL match with NekoPoi's URL.
 *
 * @param {string} url - URL to check.
 * @returns {boolean}
 */
export declare const valid: (url: string) => boolean;
