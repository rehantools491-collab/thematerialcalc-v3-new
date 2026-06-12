import Link from 'next/link';
import { SITE, CALCULATOR_TOOLS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-navy pt-12 pb-6">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <svg width="24" height="24" viewBox="0 0 40 40" aria-hidden="true">
                <rect x="4" y="8" width="24" height="24" rx="2" fill="#fff" opacity="0.8" />
                <rect x="12" y="8" width="24" height="24" rx="2" fill="#fff" opacity="0.5" />
                <line x1="16" y1="8" x2="16" y2="32" stroke="#E8862A" strokeWidth="2" />
                <line x1="24" y1="8" x2="24" y2="32" stroke="#E8862A" strokeWidth="2" />
                <line x1="12" y1="16" x2="36" y2="16" stroke="#E8862A" strokeWidth="2" />
                <line x1="12" y1="24" x2="36" y2="24" stroke="#E8862A" strokeWidth="2" />
              </svg>
              MaterialCalc
            </Link>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Free construction calculators for every project. Accurate, instant, and built for real builders.
            </p>
            <div className="flex gap-2.5 mt-4">
              {[
                { label: 'Facebook', href: SITE.social.facebook, icon: 'FB' },
                { label: 'Instagram', href: SITE.social.instagram, icon: 'IG' },
                { label: 'LinkedIn', href: SITE.social.linkedin, icon: 'LI' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 text-xs font-semibold hover:bg-white/20 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Calculators</h4>
            {CALCULATOR_TOOLS.map((tool) => (
              <Link key={tool.slug} href={tool.slug} className="block text-sm text-white/60 mb-1.5 hover:text-white transition-colors">
                {tool.name.replace('Concrete ', '')}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company</h4>
            <Link href="/about/" className="block text-sm text-white/60 mb-1.5 hover:text-white transition-colors">About</Link>
            <Link href="/contact/" className="block text-sm text-white/60 mb-1.5 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy-policy/" className="block text-sm text-white/60 mb-1.5 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service/" className="block text-sm text-white/60 mb-1.5 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} ThematerialCalc.com. All rights reserved.</span>
          <span>We don&apos;t store your calculations or personal data.</span>
        </div>
      </div>
    </footer>
  );
}
