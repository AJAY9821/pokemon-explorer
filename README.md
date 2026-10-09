# ⚡ Pokemon Explorer (Next.js & PokeAPI)

A modern, responsive, and visually appealing **Pokemon Explorer** web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**, powered by the **PokeAPI**.

---

## 🌟 Key Features

- 🏠 **Homepage Grid**: Displays a responsive grid of Pokemon cards featuring high-resolution artwork, ID numbers, names, and color-coded type badges.
- 🔍 **Real-Time Search**: Instant search filtering by Pokemon name or ID.
- ⚡ **Dynamic Detail Routes**: Dynamic routing (`/pokemon/[id]`) for individual Pokemon detail pages.
- 📊 **Detailed Stats & Info**: Displays HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed base stats with animated progress bars, physical attributes (height, weight), abilities (including hidden status), and move sets.
- 🚀 **Performance Optimized**: Uses Server-Side Rendering (SSR), static site generation for top routes (`generateStaticParams`), and fetch caching.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Source**: [PokeAPI](https://pokeapi.co/)

---

## 📁 Project Architecture

```text
src/
├── app/                    # Next.js App Router routes & layouts
│   ├── globals.css         # Base styles & Tailwind setup
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage (SSR)
│   └── pokemon/
│       └── [id]/
│           └── page.tsx    # Dynamic Pokemon Detail route (SSG / SSR)
│
├── components/             # Reusable UI components
│   ├── common/             # Common UI (Loading, ErrorMessage, Pagination)
│   ├── pokemon/            # Pokemon UI (Card, Grid, Details, Stats, Abilities, Moves, Types)
│   └── search/             # Search input component
│
├── lib/                    # API integration & Constants
│   ├── api/
│   │   └── pokeapi.ts      # Native fetch wrapper for PokeAPI
│   └── constants.ts        # Elemental type color maps & defaults
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
   git clone https://github.com/your-username/pokemon-explorer.git
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
