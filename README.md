# ⚡ Pokémon Explorer — Interview Showcase Edition

A world-class, interactive **Pokémon Explorer** web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Fonts**, powered by the **PokeAPI**.

Designed as a feature-complete take-home project for technical interviews, featuring 3D holographic tilt cards, audio cries, battle stat comparison, type weakness calculation, and persistent bookmarks.

---

## 🌟 Key Standout Features

- 🏠 **3D Holographic Showcase Grid**: Interactive Pokémon cards with realistic 3D mouse-tilt perspective, holographic sheen layer, dynamic lighting, and elemental aura glowing effects.
- ❤️ **Persistent Favorites System**: Save and bookmark your favorite Pokémon with client-side `localStorage` state synchronization and a dedicated "Favorites Only" view filter.
- 🔊 **Native Audio Cries Player**: Listen to authentic Pokémon cries fetched directly from PokeAPI's sound library with animated equalizer wave feedback.
- ⚔️ **Head-to-Head Battle Comparison**: Compare any 2 Pokémon side-by-side with individual stat bars, stat differential calculations, height/weight metrics, and automated battle superiority verdict.
- 🛡️ **Elemental Type Weakness & Resistance Matrix**: Automated calculation of 2x damage weaknesses, 0.5x resistances, and 0x immunities based on single or dual Pokémon typing.
- 🌍 **Generation & Region Selector**: Switch seamlessly between Generation I (Kanto), Gen II (Johto), Gen III (Hoenn), Gen IV (Sinnoh), and Gen V (Unova).
- ✨ **Shiny Form Toggle**: Instant toggle between standard artwork and rare Shiny sprite variations.
- 🔍 **Spotlight Keyboard Search**: Instant search filter with keyboard shortcut (`/`) focusing, live fallback PokeAPI search for un-cached Pokémon, and elemental type pills.
- ⚡ **SSG & Performance Optimized**: Pre-built static pages via `generateStaticParams` for Gen 1 Pokémon delivering instant 0ms page transitions, custom dynamic SEO metadata, and `<Suspense>` streaming.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Google Fonts (`Outfit` & `Space Grotesk`)
- **Data Source**: [PokeAPI](https://pokeapi.co/) & PokeAPI Cries Library

---

## 📁 Project Architecture

```text
src/
├── app/                    # Next.js App Router pages, static params & SEO metadata
│   ├── globals.css         # 3D perspective transforms, holographic sheen & keyframes
│   ├── layout.tsx          # Root font providers & theme layout
│   ├── page.tsx            # Homepage with SSG data pre-fetching
│   └── pokemon/
│       └── [id]/
│           └── page.tsx    # Dynamic SSG detail routes with static params pre-generation
│
├── components/             # Modular React UI components
│   ├── common/             # AudioCryButton, Loading, ErrorMessage, PokeballWatermark
│   ├── pokemon/            # Card, Grid, ExplorerView, CompareModal, WeaknessTab, Stats, Evolution
│   └── search/             # Keyboard-driven search input
│
├── hooks/                  # Custom React hooks
│   └── useFavorites.ts     # Persistent local storage synchronization hook
│
├── lib/                    # API wrappers & Constants
│   ├── api/pokeapi.ts      # PokéAPI native fetcher & evolution chain tree parser
│   └── constants.ts        # HSL type color theme map & default parameters
│
├── types/                  # Strict TypeScript interfaces
│   └── pokemon.ts
│
└── utils/                  # Domain calculation logic
    ├── formatPokemonName.ts# String & ID formatting helpers
    └── typeMatrix.ts       # Elemental weakness, resistance & immunity matrix calculator
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or later
- **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AJAY9821/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Build

Check for TypeScript type safety:
```bash
npx tsc --noEmit
```

Build for production (generates static pages for top 151 Pokémon):
```bash
npm run build
npm run start
```
