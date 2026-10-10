# Pokémon Explorer

A responsive Pokémon Explorer application built with Next.js 16 (App Router), TypeScript, and Tailwind CSS, powered by [PokeAPI](https://pokeapi.co/).

## Features

- **Pokédex Grid**: View and search Pokémon by name or ID.
- **Filtering**: Filter by elemental types, regions (Gen 1 to Gen 5), or saved favorites.
- **Detailed Pokémon Page**: Dynamic routes (`/pokemon/[id]`) showing stats, abilities, movesets, and evolution chains.
- **Side-by-Side Comparison**: Battle comparison tool comparing stats and type matchups between two Pokémon.
- **Weakness & Resistance Matrix**: Automatic calculation of type effectiveness.
- **Audio Cries**: Authentic Pokémon audio playback directly from PokéAPI.
- **Favorites**: Client-side bookmarking stored in `localStorage`.
- **Performance**: Pre-rendered static pages (SSG) for Gen 1 Pokémon.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: PokeAPI REST API

## Getting Started

### Prerequisites

- Node.js v18.17+
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AJAY9821/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Run development server
- `npm run build` - Build production bundle with static page pre-rendering
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
