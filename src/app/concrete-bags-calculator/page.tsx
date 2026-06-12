import type { Metadata } from 'next';
import Link from 'next/link';
import BagsCalculator from '@/components/calculators/BagsCalculator';
import FAQ from '@/components/ui/FAQ';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaMarkup, { webAppSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Concrete Bags Calculator — How Many Bags Do You Need?',
  description:
    'Use MaterialCalc\'s free concrete bags calculator to find how many 40, 50, 60, or 80 lb bags you need. Compare bag sizes, costs, and plan your purchase.',
  alternates: { canonical: '/concrete-bags-calculator/' },
  openGraph: {
    title: 'Concrete Bags Calculator — Compare Bag Sizes & Plan Your Purchase',
    description:
      'Enter project dimensions or volume to see how many bags of concrete you need. Side-by-side comparison of all bag sizes with cost estimates.',
    url: '/concrete-bags-calculator/',
  },
};

const FAQ_ITEMS = [
  {
    question: 'How many bags of concrete do I need?',
    answer:
      'It depends on your project volume and bag size. Calculate your volume in cubic feet (length × width × depth in feet), then divide by the bag yield: 0.30 cu ft for 40 lb, 0.45 cu ft for 60 lb, or 0.60 cu ft for 80 lb. Always round up to the next whole bag.',
  },
  {
    question: 'How many 80 lb bags of concrete are in a cubic yard?',
    answer:
      'There are approximately 45 bags of 80 lb concrete in one cubic yard. Each 80 lb bag yields about 0.60 cubic feet, and there are 27 cubic feet in a cubic yard (27 ÷ 0.60 = 45).',
  },
  {
    question: 'How many 60 lb bags of concrete are in a cubic yard?',
    answer:
      'Approximately 60 bags of 60 lb concrete make one cubic yard. Each 60 lb bag yields about 0.45 cubic feet (27 ÷ 0.45 = 60).',
  },
  {
    question: 'How much does a bag of concrete cover?',
    answer:
      'An 80 lb bag covers about 0.60 cubic feet, which is roughly a 2 ft × 2 ft area at 2 inches thick, or a 1.5 ft × 1.5 ft area at 4 inches thick. A 60 lb bag covers about 0.45 cubic feet.',
  },
  {
    question: 'Which is better — 60 lb or 80 lb concrete bags?',
    answer:
      '80 lb bags offer the best value per cubic foot and require fewer bags. 60 lb bags are easier to carry and mix. Choose 80 lb for larger projects to minimize bag count, and 60 lb when weight handling is a concern.',
  },
  {
    question: 'How many bags of concrete for a fence post?',
    answer:
      'A typical fence post hole (8 inch diameter, 24 inches deep) needs about 1 bag of 80 lb concrete or 2 bags of 60 lb. For 10 fence posts, plan on 10–12 bags of 80 lb with a waste factor.',
  },
  {
    question: 'How many bags of concrete for a 10×10 slab?',
    answer:
      'A 10×10 slab at 4 inches thick requires about 33.3 cubic feet of concrete. That equals approximately 56 bags of 80 lb, 74 bags of 60 lb, or 111 bags of 40 lb. At this volume, ready-mix delivery is usually more practical.',
  },
  {
    question: 'Is it cheaper to buy bags or order ready-mix?',
    answer:
      'Bags are cheaper for projects under about 0.75–1 cubic yard. Above that, ready-mix is more cost-effective. Bagged concrete costs $180–$250 per cubic yard equivalent, while ready-mix costs $125–$175 per yard plus delivery.',
  },
  {
    question: 'How many bags of concrete fit in a pickup truck?',
    answer:
      'A standard pickup truck with a 1,500 lb bed capacity can carry about 18 bags of 80 lb concrete or 25 bags of 60 lb per trip. Plan your trips accordingly for larger projects.',
  },
  {
    question: 'How long does an unopened bag of concrete last?',
    answer:
      'Unopened bags of concrete can last 3–6 months when stored in a dry location off the ground. Moisture causes premature hardening. Once opened, use the bag within 24 hours.',
  },
];

export default function ConcreteBagsPage() {
  const related = CALCULATOR_TOOLS.filter(
    (t) => t.slug !== '/concrete-bags-calculator/'
  );

  return (
    <>
      <SchemaMarkup
        schemas={[
          webAppSchema(
            'Concrete Bags Calculator',
            '/concrete-bags-calculator/',
            'Calculate how many 40, 50, 60, or 80 lb bags of concrete you need for your project.'
          ),
        ]}
      />
      <Breadcrumb items={[{ label: 'Concrete Bags Calculator' }]} />

      {/* Hero + Calculator */}
      <section className="bg-white pt-4 pb-0">
        <div className="container-main text-center">
          <h1 className="heading-1 mb-2">Concrete Bags Calculator</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6">
            Find out how many bags of concrete you need for your project. Compare 40, 50,
            60, and 80&nbsp;lb bag sizes to plan your purchase.
          </p>
          <BagsCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">How Many Bags of Concrete Do I Need?</h2>

          <h3 className="heading-3 mb-2">Concrete Bag Yield by Size</h3>
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold text-xs">Bag Size</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">
                    Yield (cu&nbsp;ft)
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">
                    Yield (cu&nbsp;yd)
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">
                    Bags / Yard
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['40 lb', '0.30', '0.011', '90'],
                  ['50 lb', '0.375', '0.014', '72'],
                  ['60 lb', '0.45', '0.017', '60'],
                  ['80 lb', '0.60', '0.022', '45'],
                ].map(([s, cf, cy, bpy], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 font-medium text-navy">{s}</td>
                    <td className="px-4 py-3">{cf}</td>
                    <td className="px-4 py-3">{cy}</td>
                    <td className="px-4 py-3 font-medium">{bpy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="heading-3 mb-2">How to Calculate Bags Needed</h3>
          <div className="formula-box mb-4">
            Bags = Total Volume (cu&nbsp;ft) ÷ Yield per Bag (cu&nbsp;ft) — round UP
          </div>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Calculate your project volume in cubic feet (length × width × depth in feet),
            then divide by the yield of your chosen bag size. Always round up to the next
            whole number — concrete bags cannot be split. Add 10% for waste.
          </p>

          <h2 className="heading-2 mb-4 mt-8">Bags vs. Ready-Mix — When to Switch</h2>
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold text-xs">Volume</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">
                    80&nbsp;lb Bags
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">Bag Cost*</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">
                    Ready-Mix**
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs">Winner</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0.25 yd³', '12', '$66–$96', '$150 + del.', 'Bags'],
                  ['0.50 yd³', '23', '$127–$184', '$175 + del.', 'Bags'],
                  ['1.0 yd³', '45', '$248–$360', '$150–$175', 'Ready-Mix'],
                  ['2.0 yd³', '90', '$495–$720', '$300–$350', 'Ready-Mix'],
                ].map(([v, b, bc, rc, w], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 font-medium text-navy">{v}</td>
                    <td className="px-4 py-3">{b}</td>
                    <td className="px-4 py-3">{bc}</td>
                    <td className="px-4 py-3">{rc}</td>
                    <td className="px-4 py-3 font-semibold text-orange">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            *At $5.50–$8.00 per 80&nbsp;lb bag. **At $150–$175/yd³ (not including delivery).
          </p>

          <h2 className="heading-2 mb-4">Concrete Bags Calculator — Examples</h2>
          {[
            {
              title: 'Bags for 10 Fence Post Holes',
              body: '8" diameter × 24" deep × 10 holes = 5.8 cu ft',
              result: '10 bags (80 lb) · 13 bags (60 lb)',
            },
            {
              title: 'Bags for a Small Patio (8×8)',
              body: '8 ft × 8 ft × 4" thick = 21.3 cu ft = 0.79 yd³',
              result: '36 bags (80 lb) · 48 bags (60 lb)',
            },
            {
              title: 'Bags for 4 Deck Post Footings',
              body: '12" diameter × 36" deep × 4 footings = 9.42 cu ft',
              result: '16 bags (80 lb) · 21 bags (60 lb)',
            },
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
          <h2 className="heading-2 mb-6">
            Why Use MaterialCalc&apos;s Bags Calculator?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              'All bag sizes compared',
              'Best value highlighted',
              'Two input modes',
              'Purchase planning',
              'Cost comparison',
              'Free, no signup',
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-gray-600 justify-center"
              >
                <svg
                  className="w-4 h-4 text-success shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
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
              <Link
                key={t.slug}
                href={t.slug}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-white hover:border-orange transition-colors"
              >
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
          <FAQ
            items={FAQ_ITEMS}
            heading="Concrete Bags Calculator — Frequently Asked Questions"
          />
        </div>
      </section>
    </>
  );
}
