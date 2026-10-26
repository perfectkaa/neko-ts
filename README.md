# neko-ts

A modern, lightweight and modular TypeScript scraper for NekoPoi.

Built on top of **nekobocc** as the base foundation, restructured into a clean modular codebase.

## 👤 Author

**PerfectKaa**  
GitHub: [https://github.com/PerfectKaa](https://github.com/PerfectKaa)

---

## 📦 Installation

> ⚠️ The npm package is not published yet.  
> Clone and build locally for now:

```bash
git clone https://github.com/PerfectKaa/neko-ts.git
cd neko-ts
npm install
npm run build
```

## ⚙️ Usage

### ES Modules (ESM)
```js
import NekoTs from './dist/esm/index.js';
const neko = new NekoTs();
```

### CommonJS
```js
const NekoTs = require('./dist/cjs/index.js').default;
const neko = new NekoTs();
```

## 🚀 Example

```js
import NekoTs from 'neko-ts';
const neko = new NekoTs();

// Get a list of released hentai.
neko.release()
  .then((res) => console.log(res));

// Search for a title.
neko.search('Akane')
  .then((res) => console.log(res));

// Get metadata from a URL.
neko.get('https://nekopoi.care/some-hentai-episode/')
  .then((res) => console.log(res));

// Get a random hentai.
neko.random()
  .then((res) => console.log(res));
```

## 📊 Response Examples

### `HentaiRelease`
Returned by `release()` and `search()`.

```json
[
  {
    "img": "https://nekopoi.care/wp-content/uploads/2022/02/vlcsnap-2022-02-06-03h46m23s608-300x169.png",
    "title": "[4K] Akane wa Tsumare Somerareru Episode 2 Subtitle Indonesia",
    "url": "https://nekopoi.care/akane-wa-tsumare-somerareru-episode-2-subtitle-indonesia/",
    "genre": ["Ahegao", "Armpit"],
    "duration": "16 menit"
  }
]
```

### `EpisodeMetadata`
Returned by `get()` and `random()` for episode pages.

```json
{
  "img": "https://nekopoi.care/wp-content/uploads/2022/02/vlcsnap-2022-02-06-03h46m23s608-300x169.png",
  "title": "[4K] Akane wa Tsumare Somerareru Episode 2 Subtitle Indonesia – NekoPoi",
  "synopsis": "Akane yang merasa tersanjung dengan...",
  "genre": ["Ahegao", "Armpit"],
  "producer": ["Antechinus"],
  "duration": "16 menit",
  "size": {
    "360P": "29MB",
    "480P": "44MB",
    "720P": "98MB",
    "1080P": "195MB"
  },
  "download": {
    "1080p": ["https://linkpoi.me/imQD"],
    "720p": ["https://linkpoi.me/EsYB"],
    "480p": ["https://linkpoi.me/vLjPqWvJ"],
    "360p": ["https://linkpoi.me/SvDBaJ"]
  }
}
```

### `HentaiMetadata`
Returned by `get()` and `random()` for series pages.

```json
{
  "img": "https://nekopoi.care/wp-content/uploads/2022/01/Akane-wa-Tsumare-Somerareru2-212x300.jpg",
  "title": "Akane wa Tsumare Somerareru – NekoPoi",
  "synopsis": "Akane yang merasa tersanjung dengan...",
  "views": 47457,
  "japanese": "茜ハ摘マレ染メラレル",
  "category": "Hentai",
  "episode": 2,
  "status": "Completed",
  "aired": "Feb 04, 2022",
  "producer": ["Antechinus"],
  "genre": ["Ahegao", "Armpit"],
  "duration": "16 min",
  "score": 6.89,
  "url": [
    "https://nekopoi.care/akane-wa-tsumare-somerareru-episode-1-subtitle-indonesia/",
    "https://nekopoi.care/akane-wa-tsumare-somerareru-episode-2-subtitle-indonesia/"
  ]
}
```

### `IError`
Returned when an error occurs during scraping.

```json
{
  "error": "Request failed with status 404"
}
```

## 📚 API Reference

### `neko.release([page])`
- `page` `(number, optional)` — Page number. Default is `1`.
- Returns `Promise<HentaiRelease[]>`.

### `neko.search(query)`
- `query` `(string, required)` — Search query.
- Returns `Promise<HentaiRelease[]>`.

### `neko.get(url)`
- `url` `(string, required)` — NekoPoi hentai episode or series URL.
- Returns `Promise<HentaiMetadata | EpisodeMetadata | IError>`.

### `neko.random()`
- No parameters.
- Returns `Promise<HentaiMetadata | EpisodeMetadata | IError>`.

## 🏗️ Project Structure

```
neko-ts/
├── src/
│   ├── index.ts              # Main NekoTs class
│   ├── scraper/
│   │   ├── index.ts          # Barrel export
│   │   ├── release.ts        # List latest releases
│   │   ├── search.ts         # Search hentai
│   │   ├── get.ts            # Get metadata from URL
│   │   └── random.ts         # Fetch random hentai
│   ├── types/
│   │   └── interfaces.ts     # TypeScript interfaces
│   └── utils/
│       ├── config.ts         # Base URL, headers, endpoints, validators
│       └── parser.ts         # HTML parsing logic
├── dist/                     # Build output (esm + cjs)
├── test/
│   └── index.ts              # Test examples
├── package.json
├── tsconfig.json
├── tsconfig.cjs.json
├── eslint.config.js
├── .gitignore
└── README.md
```

## 🛠️ Scripts

```bash
npm run build       # Build ESM + CJS bundles
npm run lint        # Run ESLint
npm run lint:fix    # Auto-fix lint issues
npm test            # Run test examples
```

## 📄 License

MIT License

---

> ⚠️ **Disclaimer:** This is an unofficial scraper for educational purposes only. It is not affiliated with or endorsed by NekoPoi.