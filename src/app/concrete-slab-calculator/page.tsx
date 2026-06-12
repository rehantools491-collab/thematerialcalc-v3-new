import type { Metadata } from 'next';
import Link from 'next/link';
import SlabCalculator from '@/components/calculators/SlabCalculator';
import FAQ from '@/components/ui/FAQ';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaMarkup, { webAppSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Concrete Slab Calculator — How Much Concrete for a Slab?',
  description: 'Use MaterialCalc\'s free concrete slab calculator to find how much concrete you need for a patio, driveway, or garage slab. Instant results in cubic yards.',
  alternates: { canonical: '/concrete-slab-calculator/' },
  openGraph: {
    title: 'Concrete Slab Calculator — Calculate Slab Volume Instantly',
    description: 'Enter your slab dimensions and get concrete volume in cubic yards. Free calculator for patios, driveways, and garage floors.',
    url: '/concrete-slab-calculator/',
  },
};

const FAQ_ITEMS = [
  { question: 'How much concrete do I need for a slab?', answer: 'Multiply the length by width by thickness (converted to feet) to get cubic feet, then divide by 27 for cubic yards. A 10×10 ft patio at 4 inches thick needs about 1.24 cubic yards.' },
  { question: 'How thick should a concrete slab be?', answer: 'Standard thickness is 4 inches for patios and sidewalks, 5-6 inches for driveways, and 6 inches for garage floors. Heavier loads and vehicle traffic require thicker slabs.' },
  { question: 'How many cubic yards of concrete for a 10×10 slab?', answer: 'At 4 inches thick, a 10×10 slab requires approximately 1.24 cubic yards. With 10% waste added, you should order about 1.36 cubic yards.' },
  { question: 'How many cubic yards of concrete for a 20×20 slab?', answer: 'At 5 inches thick (standard for driveways), a 20×20 slab requires approximately 6.17 cubic yards. With 10% waste, order about 6.79 cubic yards.' },
  { question: 'How do you calculate concrete for a patio?', answer: 'Measure the patio length and width in feet, and determine thickness in inches (4 inches is standard for patios). Multiply length × width × (thickness ÷ 12) ÷ 27 to get cubic yards.' },
  { question: 'Should I use 4 inch or 6 inch concrete?', answer: 'Use 4 inches for patios, sidewalks, and light foot traffic. Use 6 inches for driveways, garage floors, and any slab that will support vehicles or heavy loads.' },
  { question: 'How much extra concrete should I order for a slab?', answer: 'Order 10% more than calculated. This accounts for uneven ground, form leaks, waste, and minor measurement differences. The waste factor toggle in our calculator adjusts for this automatically.' },
  { question: 'Is it cheaper to mix your own concrete or order delivery?', answer: 'For projects under 1 cubic yard, bagged concrete is usually cheaper. For projects over 1 cubic yard, ready-mix delivery is more cost-effective and saves significant time and labor.' },
  { question: 'How many bags of concrete do I need for a slab?', answer: 'It depends on the slab size and bag weight. A 10×10 patio at 4 inches thick needs about 56 bags of 80 lb concrete or 74 bags of 60 lb. Use our Concrete Bags Calculator for exact numbers.' },
];

export default function ConcreteSlabPage() {
  const related = CALCULATOR_TOOLS.filter((t) => t.slug !== '/concrete-slab-calculator/');

  return (
    <>
      <SchemaMarkup schemas={[
        webAppSchema('Concrete Slab Calculator', '/concrete-slab-calculator/', 'Calculate concrete volume for slabs including patios, driveways, and garage floors.'),
      ]} />
      <Breadcrumb items={[{ label: 'Concrete Slab Calculator' }]} />

      {/* Hero + Calculator */}
      <section className="bg-white pt-4 pb-0">
        <div className="container-main text-center">
          <h1 className="heading-1 mb-2">Concrete Slab Calculator</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6">
            Calculate how much concrete you need for a patio, driveway, garage floor, or sidewalk slab.
          </p>
          <SlabCalculator />
        </div>
      </section>

      {/* How to Calculate */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">How to Calculate Concrete for a Slab</h2>
          <h3 className="heading-3 mb-2">Slab Volume Formula</h3>
          <div className="formula-box mb-4">Volume = Length (ft) × Width (ft) × Thickness (in) ÷ 12 ÷ 27 = Cubic Yards</div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">Multiply your slab&apos;s length and width in feet, then multiply by the thickness converted from inches to feet (divide inches by 12). Divide the total by 27 to convert cubic feet to cubic yards.</p>

          <h3 className="heading-3 mb-2">Recommended Slab Thickness by Project</h3>
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy text-white"><th className="text-left px-4 py-3 font-semibold text-xs">Project</th><th className="text-left px-4 py-3 font-semibold text-xs">Thickness</th><th className="text-left px-4 py-3 font-semibold text-xs">Notes</th></tr></thead>
              <tbody>
                {[
                  ['Patio', '4 inches', 'Standard for foot traffic'],
                  ['Sidewalk', '4 inches', 'Residential standard'],
                  ['Driveway', '5–6 inches', 'Must support vehicles'],
                  ['Garage floor', '6 inches', 'Heavy loads, vehicles'],
                  ['Shed foundation', '4–6 inches', 'Depends on shed size'],
                ].map(([p, t, n], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}><td className="px-4 py-3 font-medium text-navy">{p}</td><td className="px-4 py-3">{t}</td><td className="px-4 py-3 text-gray-400">{n}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="heading-2 mb-4">Concrete Slab Calculator — Examples</h2>
          {[
            { title: 'Concrete for a 10×10 Patio Slab', body: '10 ft × 10 ft × 4" thick = 33.33 cu ft ÷ 27', result: '1.24 cubic yards (1.36 with 10% waste)' },
            { title: 'Concrete for a 20×20 Driveway', body: '20 ft × 20 ft × 5" thick = 166.67 cu ft ÷ 27', result: '6.17 cubic yards (6.79 with 10% waste)' },
            { title: 'Concrete for a 24×24 Garage Slab', body: '24 ft × 24 ft × 6" thick = 288 cu ft ÷ 27', result: '10.67 cubic yards (11.73 with 10% waste)' },
          ].map((ex) => (
            <div key={ex.title} className="example-box mb-4">
              <h3 className="text-sm font-semibold text-navy mb-2">{ex.title}</h3>
              <p className="text-sm text-gray-600">{ex.body}</p>
              <p className="text-sm font-bold text-navy mt-2">Result: {ex.result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why MaterialCalc */}
      <section className="bg-white section-padding">
        <div className="container-main text-center">
          <h2 className="heading-2 mb-6">Why Use MaterialCalc&apos;s Slab Calculator?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {['Project type presets', 'Adjustable waste factor', 'Imperial & metric', 'Multiple slab support', 'Bag estimate included', 'Free, no signup'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                <svg className="w-4 h-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">Related Concrete Calculators</h2>
          <div className="space-y-2">
            {related.map((t) => (
              <Link key={t.slug} href={t.slug} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-white hover:border-orange transition-colors">
                <span className="text-sm font-semibold text-orange">{t.name}</span>
                <span className="text-xs text-gray-400">— {t.shortDesc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <FAQ items={FAQ_ITEMS} heading="Concrete Slab Calculator — Frequently Asked Questions" />
        </div>
      </section>
    </>
  );
}
