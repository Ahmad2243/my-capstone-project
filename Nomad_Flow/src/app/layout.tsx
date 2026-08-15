import '../styles/globals.css'
import type { ReactNode } from 'react'
import Navigation from './components/Navigation'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Nomad Flow',
  description: 'Capstone project',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
          {children}
        </main>
        <footer className="w-full border-t mt-8 py-6">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Nomad Flow — Built with care
          </div>
        </footer>
      </body>
    </html>
  )
}
