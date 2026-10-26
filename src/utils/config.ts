/** Base URL for the NekoPoi website. */
export const baseUrl = 'https://nekopoi.care';

/** HTTP headers used for requests to mimic a real browser. */
export const headersConfig = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    Referer: baseUrl,
    'Accept-Language': 'en-US,en;q=0.9',
  },
};

/** API endpoints and URL templates for various NekoPoi pages. */
export const endpoints = {
  /** Endpoint for the latest hentai releases. `__PAGE` is replaced with a page number. */
  latest: '/category/hentai/page/__PAGE',

  /** Endpoint for searching hentai. `__QUERY` is replaced with a URL-encoded search term. */
  search: '/search/__QUERY',

  /** Endpoint for fetching a random hentai. */
  random: '/random',
};

/**
 * Validates whether a given URL belongs to NekoPoi.
 *
 * @param url - The URL string to validate.
 * @returns `true` if the URL matches NekoPoi's domain, `false` otherwise.
 */
export const valid = (url: string): boolean =>
  new RegExp(/^(?:https?:\/\/)?(?:[^.]+\.)?nekopoi\.care(\/.*)?$/gm).test(url);