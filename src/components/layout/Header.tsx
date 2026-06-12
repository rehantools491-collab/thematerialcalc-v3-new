'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CALCULATOR_TOOLS, NAV_LINKS } from '@/lib/constants';

const ICON_COLORS = {
  orange: 'bg-orange-light text-orange',
  blue: 'bg-[#E6F1FB] text-info',
  green: 'bg-[#ECFDF5] text-success',
  pink: 'bg-[#FBEAF0] text-[#D4537E]',
  purple: 'bg-[#EEEDFE] text-[#534AB7]',
} as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-main h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MaterialCalc Home">
          <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="4" y="8" width="24" height="24" rx="2" fill="#1B365D" />
            <rect x="12" y="8" width="24" height="24" rx="2" fill="#1B365D" opacity="0.7" />
            <line x1="16" y1="8" x2="16" y2="32" stroke="#E8862A" strokeWidth="2" />
            <line x1="24" y1="8" x2="24" y2="32" stroke="#E8862A" strokeWidth="2" />
            <line x1="12" y1="16" x2="36" y2="16" stroke="#E8862A" strokeWidth="2" />
            <line x1="12" y1="24" x2="36" y2="24" stroke="#E8862A" strokeWidth="2" />
            <rect x="28" y="14" width="6" height="6" fill="#fff" rx="1" />
            <rect x="28" y="24" width="6" height="8" fill="#fff" rx="1" />
          </svg>
          <span className="text-xl font-bold text-navy tracking-tight">MaterialCalc</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link
            href="/"
            className={`text-[15px] font-medium py-5 border-b-[3px] transition-colors ${
              pathname === '/' ? 'text-orange border-orange' : 'text-navy border-transparent hover:text-orange hover:border-orange'
            }`}
          >
            Home
          </Link>

          {/* Calculators Dropdown */}
          <div className="relative group">
            <button
              className="text-[15px] font-medium text-navy py-5 border-b-[3px] border-transparent hover:text-orange flex items-center gap-1"
              aria-haspopup="true"
            >
              Calculators
              <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="hidden group-hover:block absolute top-full left-0 pt-1 z-50">
              <div className="bg-white border border-gray-100 rounded-xl py-2 min-w-[300px] shadow-calc-hover" role="menu">
                <div className="px-5 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Concrete Calculators</div>
                {CALCULATOR_TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-orange transition-colors"
                    role="menuitem"
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${ICON_COLORS[tool.color]}`}>
                      ■
                    </span>
                    <span>
                      <span className="block font-medium text-navy text-sm">{tool.name}</span>
                      <span className="block text-xs text-gray-400">{tool.shortDesc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[15px] font-medium py-5 border-b-[3px] transition-colors ${
                pathname === link.href || pathname === link.href.replace(/\/$/, '')
                  ? 'text-orange border-orange'
                  : 'text-navy border-transparent hover:text-orange hover:border-orange'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-navy"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-2">
            <Link href="/" className="block py-3 text-[15px] font-medium text-navy border-b border-gray-50" onClick={() => setMobileOpen(false)}>Home</Link>
            <div className="py-3 border-b border-gray-50">
              <span className="text-[15px] font-semibold text-navy">Calculators</span>
              <div className="mt-2 space-y-1">
                {CALCULATOR_TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="block py-2 pl-4 text-sm text-gray-600 hover:text-orange"
                    onClick={() => setMobileOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-[15px] font-medium text-navy border-b border-gray-50 hover:text-orange"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/privacy-policy/" className="block py-3 text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Privacy Policy</Link>
            <Link href="/terms-of-service/" className="block py-3 text-sm text-gray-400" onClick={() => setMobileOpen(false)}>Terms of Service</Link>
          </div>
        </div>
      )}
    </header>
  );
}
