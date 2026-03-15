import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina | Digital Art Gallery",
  description: "A showcase of high-performance digital art marketplaces by Primis-Inginium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-2xl">
              <span className="h-8 w-8 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/20 rotate-3 flex items-center justify-center text-white text-base">L</span>
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">LUMINA</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-blue-500">Explore</Link>
              <Link href="/artists" className="transition-colors hover:text-blue-500">Artists</Link>
              <Link href="/favorites" className="transition-colors hover:text-blue-500">Collections</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 transition-colors hover:text-blue-500">
                <ShoppingBag className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Connect Wallet
              </button>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 min-h-screen">
          {children}
        </main>

        <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
          <div className="container mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 Primis-Inginium. Built with Lumina Architecture.
          </div>
        </footer>
      </body>
    </html>
  );
}
