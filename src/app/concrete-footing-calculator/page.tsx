import type { Metadata } from 'next';
import Link from 'next/link';
import FootingCalculator from '@/components/calculators/FootingCalculator';
import FAQ from '@/components/ui/FAQ';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaMarkup, { webAppSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Concrete Footing Calculator — Calculate Footing Volume',
  description: 'Use MaterialCalc\'s free concrete footing calculator for deck posts, piers, wall footings, and columns. Rectangular and round shapes supported.',
  alternates: { canonical: '/concrete-footing-calculator/' },
  openGraph: { title: 'Concrete Footing Calculator — Deck, Pier & Column Footings', description: 'Calculate concrete volume for rectangular or cylindrical footings.', url: '/concrete-footing-calculator/' },
};

const FAQ_ITEMS = [
  { question: 'How much concrete do I need for a footing?', answer: 'For rectangular footings: length × width × depth (all in feet). For round footings: π × radius² × depth. Divide by 27 for cubic yards. A 12" diameter footing at 36" deep needs about 0.087 cubic yards.' },
  { question: 'How do you calculate concrete for a round footing?', answer: 'Use the formula: Volume = π × (diameter ÷ 2)² × depth. Convert diameter and depth from inches to feet first. For a 12" diameter, 36" deep footing: π × 0.5² × 3 = 2.36 cubic feet = 0.087 cubic yards.' },
  { question: 'How deep should concrete footings be?', answer: 'Footings must extend below the frost line, which varies by region: 0–6" in the Southern US, 36–48" in the Midwest and Northeast, and up to 60" in northern states. Check your local building codes.' },
  { question: 'How many bags of concrete for a deck footing?', answer: 'A typical 12" diameter, 36" deep deck footing needs about 2.36 cubic feet of concrete, which equals approximately 4 bags of 80 lb concrete or 6 bags of 60 lb.' },
  { question: 'What size footing do I need for a deck post?', answer: 'Most residential decks use 12" diameter footings extending 36–48" below grade. For larger decks or multi-story structures, 16" diameter or larger may be required. Always verify with local building codes.' },
  { question: 'How much concrete for a sonotube?', answer: 'It depends on the tube diameter and depth. A 12" sonotube at 48" deep needs about 3.14 cubic feet (0.12 cubic yards). Our calculator handles sonotube calculations with the cylindrical shape option.' },
  { question: 'Do I need rebar in concrete footings?', answer: 'Building codes often require rebar in footings, especially for structural loads. Rebar reduces cracking and improves tensile strength. It does not significantly change the volume of concrete needed.' },
  { question: 'How many footings do I need for a deck?', answer: 'Deck footing count depends on the deck size and joist span. A typical rule is one footing every 6–8 feet along each beam. A 12×16 deck might need 6–9 footings. Consult your local building department for requirements.' },
  { question: 'Should I use bags or ready-mix for footings?', answer: 'Most footing projects use 0.5–3 cubic yards total. Under 1 cubic yard, bags are practical and cost-effective. Over 1 cubic yard, ready-mix delivery saves significant time and effort.' },
];

export default function ConcreteFootingPage() {
  const related = CALCULATOR_TOOLS.filter((t) => t.slug !== '/concrete-footing-calculator/');

  return (
    <>
      <SchemaMarkup schemas={[webAppSchema('Concrete Footing Calculator', '/concrete-footing-calculator/', 'Calculate concrete volume for rectangular or cylindrical footings.')]} />
      <Breadcrumb items={[{ label: 'Concrete Footing Calculator' }]} />

      <section className="bg-white pt-4 pb-0">
        <div className="container-main text-center">
          <h1 className="heading-1 mb-2">Concrete Footing Calculator</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6">Calculate how much concrete you need for rectangular or cylindrical footings — deck posts, piers, columns, and wall footings.</p>
          <FootingCalculator />
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">How to Calculate Concrete for Footings</h2>
          <h3 className="heading-3 mb-2">Rectangular Footing Formula</h3>
          <div className="formula-box mb-4">Volume = Length (ft) × Width (ft) × Depth (ft)</div>
          <h3 className="heading-3 mb-2">Cylindrical (Round) Footing Formula</h3>
          <div className="formula-box mb-4">Volume = π × (Diameter ÷ 2)² × Depth — all in feet</div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">Convert inches to feet by dividing by 12. Multiply the volume per footing by the number of footings for your total. Divide cubic feet by 27 to get cubic yards.</p>

          <h2 className="heading-2 mb-4 mt-8">Footing Size Reference</h2>
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy text-white"><th className="text-left px-4 py-3 font-semibold text-xs">Type</th><th className="text-left px-4 py-3 font-semibold text-xs">Shape</th><th className="text-left px-4 py-3 font-semibold text-xs">Size</th><th className="text-left px-4 py-3 font-semibold text-xs">Per Footing</th></tr></thead>
              <tbody>
                {[
                  ['Deck post', 'Round', '12" dia × 36"', '0.07 yd³'],
                  ['Deck post', 'Round', '12" dia × 48"', '0.10 yd³'],
                  ['Fence post', 'Round', '8" dia × 24"', '0.02 yd³'],
                  ['Pier/Sonotube', 'Round', '14" dia × 48"', '0.14 yd³'],
                  ['Wall footing', 'Rectangular', '24"W × 12"D', '0.07/lin ft'],
                  ['Column footing', 'Rectangular', '24"×24"×12"', '0.15 yd³'],
                ].map(([t, s, sz, v], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}><td className="px-4 py-3 font-medium text-navy">{t}</td><td className="px-4 py-3">{s}</td><td className="px-4 py-3">{sz}</td><td className="px-4 py-3 font-medium">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">Related Concrete Calculators</h2>
          <div className="space-y-2">
            {related.map((t) => (<Link key={t.slug} href={t.slug} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-orange transition-colors"><span className="text-sm font-semibold text-orange">{t.name}</span><span className="text-xs text-gray-400">— {t.shortDesc}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <FAQ items={FAQ_ITEMS} heading="Concrete Footing Calculator — Frequently Asked Questions" />
        </div>
      </section>
    </>
  );
}
