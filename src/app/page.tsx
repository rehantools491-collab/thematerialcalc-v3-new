import type { Metadata } from 'next';
import Link from 'next/link';
import ConcreteCalculator from '@/components/calculators/ConcreteCalculator';
import ToolCard from '@/components/ui/ToolCard';
import FAQ from '@/components/ui/FAQ';
import SchemaMarkup, { websiteSchema, organizationSchema, webAppSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS, COMMON_PROJECTS, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Concrete Calculator — Free Concrete Volume Calculator',
  description: 'Use MaterialCalc\'s free concrete calculator to find how much concrete you need in cubic yards, cubic feet, and cubic meters. Instant results for any project.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Concrete Calculator — How Much Concrete Do I Need?',
    description: 'Calculate concrete volume for slabs, footings, and more. Free instant results in cubic yards.',
    url: '/',
  },
};

const FAQ_ITEMS = [
  { question: 'How much concrete do I need?', answer: 'Multiply your project\'s length by width by depth (all in feet) to get cubic feet, then divide by 27 to convert to cubic yards. For example, a 10×10 ft area at 4 inches deep needs about 1.24 cubic yards. Use our calculator above for instant results.' },
  { question: 'How do you calculate concrete in cubic yards?', answer: 'Convert all measurements to feet (divide inches by 12), then multiply length × width × depth to get cubic feet. Divide cubic feet by 27 to get cubic yards. Always add 10% extra for waste.' },
  { question: 'How many cubic yards is a 10×10 slab?', answer: 'A 10×10 foot slab at 4 inches thick requires approximately 1.24 cubic yards of concrete. At 6 inches thick, it requires about 1.85 cubic yards. Use a 10% waste factor for ordering.' },
  { question: 'How much does a cubic yard of concrete cover?', answer: 'One cubic yard of concrete covers 81 square feet at 4 inches thick, 65 square feet at 5 inches thick, or 54 square feet at 6 inches thick.' },
  { question: 'How thick should concrete be?', answer: 'Standard thickness is 4 inches for patios and sidewalks, 5-6 inches for driveways, and 6 inches for garage floors. Heavier loads require thicker slabs. Always check local building codes.' },
  { question: 'Should I order extra concrete?', answer: 'Yes. Industry standard is to order 10% more concrete than calculated. Uneven subgrade, form leaks, and spillage can consume more material than expected. Running short mid-pour is far more costly than having a small surplus.' },
  { question: 'What is the difference between cubic feet and cubic yards?', answer: 'There are 27 cubic feet in one cubic yard. Cubic yards are the standard unit for ordering ready-mix concrete. To convert cubic feet to cubic yards, divide by 27.' },
];

export default function HomePage() {
  const otherTools = CALCULATOR_TOOLS.filter((t) => t.slug !== '/');

  return (
    <>
      <SchemaMarkup schemas={[
        websiteSchema(),
        organizationSchema(),
        webAppSchema('Concrete Calculator', '/', 'Calculate concrete volume in cubic yards, cubic feet, and cubic meters.'),
      ]} />

      {/* Hero + Calculator */}
      <section className="bg-white pt-8 pb-0">
        <div className="container-main text-center">
          <h1 className="heading-1 mb-2">Concrete Calculator</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6">
            Calculate how much concrete you need in cubic yards, cubic feet, and cubic meters — free and instant.
          </p>
          <ConcreteCalculator />
        </div>
      </section>

      {/* Tool Cards */}
      <section className="bg-gray-50 section-padding">
        <div className="container-main">
          <h2 className="heading-2 text-center mb-2">Concrete Calculators for Every Project</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Choose the right calculator for your specific project type.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {otherTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                name={tool.name}
                slug={tool.slug}
                description={tool.description}
                color={tool.color}
                cta={`Calculate ${tool.name.replace('Concrete ', '').replace(' Calculator', '').toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <h2 className="heading-2 text-center mb-2">How It Works</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Get accurate results in seconds.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {[
              { step: '1', title: 'Choose calculator', desc: 'Pick the right tool for your project' },
              { step: '2', title: 'Enter dimensions', desc: 'Input length, width, and depth' },
              { step: '3', title: 'Get instant results', desc: 'Volume in cubic yards, feet, and meters' },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">{s.step}</div>
                <h3 className="text-base font-semibold text-navy mb-1">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Calculate Concrete */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">How to Calculate Concrete</h2>
          <div className="formula-box mb-4">
            Volume = Length (ft) × Width (ft) × Depth (in) ÷ 12 ÷ 27 = Cubic Yards
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Multiply your project&apos;s length and width in feet, then multiply by the depth converted from inches to feet (divide inches by 12). Divide the result by 27 to convert cubic feet to cubic yards. This gives you the volume of concrete needed for a rectangular area.
          </p>
          <h3 className="heading-3 mb-2">How to Measure Your Project</h3>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Measure the longest side (length) and shortest side (width) in feet. For depth, measure in inches — most slabs are 4 to 6 inches thick. Measure in at least three spots and use the largest measurement. For irregular or L-shaped areas, break the project into separate rectangles, calculate each one individually, and add them together.
          </p>
          <h3 className="heading-3 mb-2">How Much Extra Concrete Should You Order?</h3>
          <p className="text-base text-gray-600 leading-relaxed">
            The industry standard is to order 10% more concrete than your calculated volume. Uneven subgrade, form leaks, spillage, and slight measurement variations consume more concrete than expected. Running short during a pour is far more expensive than having a small surplus, so always round up.
          </p>
        </div>
      </section>

      {/* Common Projects Table */}
      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-6">Common Concrete Projects</h2>
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold text-xs">Project</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">Size</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">Depth</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">Est. Yards</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_PROJECTS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-medium text-navy">{row.project}</td>
                    <td className="px-4 py-3 text-gray-600">{row.size}</td>
                    <td className="px-4 py-3 text-gray-600">{row.depth}</td>
                    <td className="px-4 py-3 text-gray-600 font-medium">{row.yards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why MaterialCalc */}
      <section className="bg-gray-50 section-padding">
        <div className="container-main">
          <h2 className="heading-2 text-center mb-2">Why Use MaterialCalc?</h2>
          <p className="text-sm text-gray-400 text-center mb-8">Trusted by homeowners, DIYers, and contractors.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
            {[
              { icon: '✓', title: 'Accurate', desc: 'Industry-standard formulas' },
              { icon: '⚡', title: 'Free & instant', desc: 'No signup, no email' },
              { icon: '📱', title: 'Mobile friendly', desc: 'Use on the jobsite' },
              { icon: '🏗️', title: 'Built for projects', desc: 'Real construction needs' },
              { icon: '🔒', title: 'Privacy first', desc: 'No data stored' },
              { icon: '🔄', title: 'Always updated', desc: 'Quarterly price reviews' },
            ].map((v) => (
              <div key={v.title} className="py-3">
                <div className="text-2xl mb-2">{v.icon}</div>
                <h3 className="text-sm font-semibold text-navy mb-0.5">{v.title}</h3>
                <p className="text-xs text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">Related Concrete Calculators</h2>
          <div className="space-y-2">
            {otherTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-orange hover:bg-[#FFFBF5] transition-colors"
              >
                <span className="text-sm font-semibold text-orange">{tool.name}</span>
                <span className="text-xs text-gray-400">— {tool.shortDesc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <FAQ items={FAQ_ITEMS} heading="Concrete Calculator — Frequently Asked Questions" />
        </div>
      </section>
    </>
  );
}
