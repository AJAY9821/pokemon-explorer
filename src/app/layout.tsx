import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokemon Explorer | 3D Interactive Pokédex",
  description: "Explore Pokemon details, stats, abilities, and dynamic data powered by PokeAPI with 3D holographic cards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#080C14] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

