/**
 * Represents a single released hentai item in a list (e.g., from release() or search()).
 */
export interface HentaiRelease {
  /** URL of the thumbnail image. */
  img: string;

  /** Title of the post. */
  title: string;

  /** URL of the post. */
  url: string;

  /** Genres associated with the post. */
  genre: string[];

  /** Duration of the hentai (if available). May be `null` if not specified. */
  duration: string | null;
}

/**
 * Represents detailed metadata for a NekoPoi series page.
 */
export interface HentaiMetadata {
  /** URL of the thumbnail image. */
  img: string;

  /** Title of the hentai. */
  title: string;

  /** Synopsis of the hentai. */
  synopsis: string;

  /** Total number of views. */
  views: number;

  /** Japanese title of the hentai. */
  japanese: string;

  /** Category of the hentai. */
  category: string;

  /** Total number of episodes. */
  episode: number;

  /** Current status of the hentai (e.g., "Ongoing", "Completed"). */
  status: string;

  /** Release date of the hentai. */
  aired: string;

  /** Production studio(s) or producer(s). */
  producer: string[];

  /** List of genres. */
  genre: string[];

  /** Duration of each episode. */
  duration: string;

  /** User rating or score. */
  score: number;

  /** URLs of available episodes. */
  url: string[];
}

/**
 * Represents detailed metadata for a specific NekoPoi episode page.
 */
export interface EpisodeMetadata {
  /** URL of the thumbnail image. */
  img: string;

  /** Title of the hentai. */
  title: string;

  /** Synopsis of the hentai. */
  synopsis: string;

  /** List of genres. */
  genre: string[];

  /** Production studio(s) or producer(s). */
  producer: string[];

  /** Duration of the episode. */
  duration: string;

  /**
   * File size for each available quality.
   * The key is the resolution (e.g., `"1080p"`), and the value is the size (e.g., `"195MB"`).
   */
  size: Record<string, string>;

  /**
   * Download links categorized by quality.
   * The key is the resolution (e.g., `"1080p"`), and the value is an array of download URLs.
   */
  download: Record<string, string[]>;
}

/**
 * Represents an error response returned when scraping fails.
 */
export interface IError {
  /** Human-readable error message. */
  error: string;
}