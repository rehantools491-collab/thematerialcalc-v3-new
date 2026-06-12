import Link from 'next/link';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export default function NotFound() {
  return (
    <section className="bg-white section-padding min-h-[60vh] flex items-center">
      <div className="container-main text-center">
        <div className="text-6xl md:text-8xl font-bold text-gray-100 mb-4">404</div>
        <h1 className="heading-1 mb-2">Page Not Found</h1>
        <p className="text-base text-gray-400 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our calculators instead.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-orange text-white font-bold rounded-lg hover:bg-orange-dark transition-all hover:-translate-y-[1px] hover:shadow-lg mb-10"
        >
          Go to Concrete Calculator
        </Link>

        <div className="max-w-lg mx-auto">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            All Calculators
          </h2>
          <div className="space-y-2">
            {CALCULATOR_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-orange transition-colors"
              >
                <span className="text-sm font-semibold text-orange">{tool.name}</span>
                <span className="text-xs text-gray-400">— {tool.shortDesc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
