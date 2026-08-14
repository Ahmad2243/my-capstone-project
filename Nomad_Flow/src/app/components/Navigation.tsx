"use client"

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/trips', label: 'My Trips' },
  { href: '/explore', label: 'Explore' },
  { href: '/health', label: 'System Health' },
]

export default function Navigation() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-brand-600">Nomad Flow</Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium ${isActive(l.href) ? 'text-brand-600' : 'text-gray-600 hover:text-gray-800'}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-2 py-2 rounded-md text-base font-medium ${isActive(l.href) ? 'text-brand-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
