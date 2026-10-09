# ⚡ Pokemon Explorer (Next.js & PokeAPI)

A modern, responsive, and visually stunning **Pokemon Explorer** web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Fonts (Outfit & Space Grotesk)**, powered by the **PokeAPI**.

---

## 🌟 Key Features

- 🏠 **Homepage Grid**: Displays a responsive grid of 3D holographic Pokemon cards with mouse-tilt perspective, high-resolution artwork, ID numbers, names, and color-coded type badges.
- 🔍 **Real-Time Search & Type Filtering**: Instant search filtering by Pokemon name or ID with shortcut key listener (`/`), plus elemental type filter badges.
- ⚡ **Dynamic Detail Routes**: Dynamic routing (`/pokemon/[id]`) for individual Pokemon detail pages.
- 📊 **Detailed Stats & Info**: Displays HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed base stats with animated progress bars, physical attributes (height, weight), abilities (including hidden status), movesets, and interactive evolution chain flow.
- ✨ **Shiny Form Toggle**: Interactive Shiny artwork toggle on detail pages.
- 🚀 **Performance Optimized**: Uses Static Site Generation (SSG) with `generateStaticParams` for top routes, Server-Side Rendering (SSR), `<Suspense>` streaming, and fetch caching.
- 📱 **Fully Responsive & Dark Mode Theme**: Deep atmospheric workspace background with neon gradient accents optimized for mobile, tablet, and desktop displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Google Fonts (`Outfit` & `Space Grotesk`)
- **Data Source**: [PokeAPI](https://pokeapi.co/)

---

## 📁 Project Architecture

```text
src/
├── app/                    # Next.js App Router routes & layouts
│   ├── globals.css         # Base styles, 3D card perspective & Tailwind setup
│   ├── layout.tsx          # Root layout with Outfit & Space Grotesk Google Fonts
│   ├── page.tsx            # Homepage (SSR & SSG)
│   └── pokemon/
│       └── [id]/
│           └── page.tsx    # Dynamic Pokemon Detail route (SSG / SSR)
│
├── components/             # Reusable UI components
│   ├── common/             # Common UI (Loading, ErrorMessage, PokeballWatermark)
│   ├── pokemon/            # Pokemon UI (Card, Grid, Details, Stats, About, Evolution, Moves, TypeFilter)
│   └── search/             # Spotlight search input component
│
├── lib/                    # API integration & Constants
│   ├── api/
│   │   └── pokeapi.ts      # Native fetch wrapper for PokeAPI
│   └── constants.ts        # Dual-gradient elemental type color maps
│
├── types/                  # Strict TypeScript interface definitions
│   └── pokemon.ts
│
└── utils/                  # Helper utilities
    └── formatPokemonName.ts# String formatting helper
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

## 🧪 Build & Type Check

To check for TypeScript errors:
```bash
npx tsc --noEmit
```

To build for production:
```bash
npm run build
npm run start
```
