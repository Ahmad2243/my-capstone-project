import '../styles/globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { BriefcaseBusiness, Camera, Code2, Mail, MessageCircle, Sparkles } from 'lucide-react';
import AssistantModal from '@/components/AssistantModal';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Nomad Flow',
  description: 'Capstone project',
};

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/trips', label: 'My Trips' },
  { href: '/explore', label: 'Explore' },
  { href: '/health', label: 'System Health' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={'min-h-screen bg-slate-900 text-slate-100 font-sans ' + inter.variable}>
      <body className="min-h-screen bg-slate-900 text-slate-100">
        <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-slate-900 text-slate-100 selection:bg-sky-500 selection:text-white">
          {/* Top-Left Sky Glow */}
          <div className="pointer-events-none fixed -top-24 -left-24 -z-10 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[120px]" />
          {/* Center Ambient Cyan Glow */}
          <div className="pointer-events-none fixed top-1/3 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
          {/* Bottom-Right Amber Glow */}
          <div className="pointer-events-none fixed -bottom-24 -right-24 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]" />

          <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-slate-900/40 px-6 py-4 backdrop-blur-md">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><img src="/Logo.jpeg" alt="Nomad Flow" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10" />Nomad Flow</Link>
            <nav className="hidden items-center gap-5 text-sm font-medium text-slate-200 lg:flex">
              {navLinks.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-white">{link.label}</Link>)}
            </nav>
            <AssistantModal />
          </header>

          <div className="relative z-10 flex flex-1 flex-col">{children}</div>

          <footer className="z-40 mt-auto border-t border-white/10 bg-slate-900/80 px-6 py-8 text-slate-300 backdrop-blur-xl">
            <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-3">
              <div><div className="flex items-center gap-2 font-bold text-white"><img src="/Logo.jpeg" alt="Nomad Flow" className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10" />Nomad Flow</div><p className="mt-3 max-w-xs text-sm leading-6">Elevating travel planning with intelligent insights.</p><p className="mt-4 text-xs text-slate-400">© 2026 Nomad Flow. All rights reserved.</p></div>
              <div><h2 className="text-sm font-semibold text-white">Contact</h2><a href="mailto:support@nomadflow.com" className="mt-3 inline-flex items-center gap-2 text-sm transition-colors hover:text-sky-400"><Mail className="h-4 w-4" />support@nomadflow.com</a></div>
              <div><h2 className="text-sm font-semibold text-white">Follow the journey</h2><div className="mt-3 flex gap-4"><a href="https://twitter.com" aria-label="Twitter" className="transition-colors hover:text-sky-400"><MessageCircle className="h-5 w-5" /></a><a href="https://github.com" aria-label="GitHub" className="transition-colors hover:text-sky-400"><Code2 className="h-5 w-5" /></a><a href="https://instagram.com" aria-label="Instagram" className="transition-colors hover:text-sky-400"><Camera className="h-5 w-5" /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="transition-colors hover:text-sky-400"><BriefcaseBusiness className="h-5 w-5" /></a></div></div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
