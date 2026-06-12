import type { Metadata } from 'next';
import Link from 'next/link';
import CostCalculator from '@/components/calculators/CostCalculator';
import FAQ from '@/components/ui/FAQ';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaMarkup, { webAppSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Concrete Cost Calculator — Estimate Your Project Cost',
  description: 'Use MaterialCalc\'s free concrete cost calculator to estimate materials, delivery, and labor costs for your project. Get an itemized breakdown instantly.',
  alternates: { canonical: '/concrete-cost-calculator/' },
  openGraph: { title: 'Concrete Cost Calculator — How Much Does Concrete Cost?', description: 'Estimate total concrete project cost with an itemized breakdown.', url: '/concrete-cost-calculator/' },
};

const FAQ_ITEMS = [
  { question: 'How much does a cubic yard of concrete cost?', answer: 'The national average is $125–$175 per cubic yard for ready-mix concrete (material only). Prices vary by region, concrete type, and seasonal demand.' },
  { question: 'How much does it cost to pour a 10×10 concrete slab?', answer: 'A 10×10 slab at 4 inches thick (1.24 yd³) costs approximately $155–$217 for materials only. With labor at $4–$8 per square foot, total cost ranges from $555–$1,017.' },
  { question: 'How much does a concrete driveway cost?', answer: 'A 20×20 driveway at 5 inches thick (6.17 yd³) costs approximately $770–$1,080 for materials. With labor, total cost ranges from $1,570–$4,280 depending on site conditions and finishing.' },
  { question: 'Is it cheaper to buy bags or order ready-mix concrete?', answer: 'Bags are cheaper for projects under 0.75–1 cubic yard. Above that, ready-mix delivery is more cost-effective because bag prices per yard ($180–$250) exceed ready-mix prices ($125–$175).' },
  { question: 'How much does concrete labor cost per square foot?', answer: 'Basic concrete labor (pour, spread, finish) costs $2–$8 per square foot. Stamped or decorative finishes add $8–$18 per square foot. Rates vary by region and project complexity.' },
  { question: 'How much does concrete delivery cost?', answer: 'Delivery fees typically range from $0–$100+, depending on distance and minimum order requirements. Many companies charge short-load fees for orders under their minimum (often 1 cubic yard).' },
  { question: 'What is a short-load fee for concrete?', answer: 'A short-load fee is an extra charge applied when you order less than the ready-mix company\'s minimum delivery amount. It\'s typically $30–$50 per cubic yard below the minimum.' },
  { question: 'How do I estimate the cost of a concrete project?', answer: 'Calculate your volume in cubic yards, multiply by your local price per yard for material cost, add delivery fees, and optionally add labor cost (area × labor rate per sq ft). Our calculator does this automatically.' },
  { question: 'Is it cheaper to pour concrete yourself or hire a contractor?', answer: 'DIY saves 30–50% on labor but requires tool rental ($150–$300), physical effort, and experience. For small projects under 200 sq ft, DIY is often worthwhile. For larger projects, hiring a contractor usually ensures better quality.' },
];

export default function ConcreteCostPage() {
  const related = CALCULATOR_TOOLS.filter((t) => t.slug !== '/concrete-cost-calculator/');

  return (
    <>
      <SchemaMarkup schemas={[webAppSchema('Concrete Cost Calculator', '/concrete-cost-calculator/', 'Estimate concrete project cost including materials, delivery, and labor.')]} />
      <Breadcrumb items={[{ label: 'Concrete Cost Calculator' }]} />

      <section className="bg-white pt-4 pb-0">
        <div className="container-main text-center">
          <h1 className="heading-1 mb-2">Concrete Cost Calculator</h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6">Estimate your total concrete project cost including materials, delivery, and labor.</p>
          <CostCalculator />
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">How Much Does Concrete Cost?</h2>
          <h3 className="heading-3 mb-2">Concrete Price per Cubic Yard</h3>
          <p className="text-base text-gray-600 leading-relaxed mb-4">The national average for ready-mix concrete is $125–$175 per cubic yard (material only). Low-cost markets like rural and Midwest areas average around $125, while high-cost coastal and metro areas can reach $175 or more. Select a preset in the calculator above or enter your exact local price for the most accurate estimate.</p>

          <h2 className="heading-2 mb-4 mt-8">Cost Breakdown by Project Type</h2>
          <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy text-white"><th className="text-left px-4 py-3 font-semibold text-xs">Project</th><th className="text-left px-4 py-3 font-semibold text-xs">Volume</th><th className="text-left px-4 py-3 font-semibold text-xs">Material*</th><th className="text-left px-4 py-3 font-semibold text-xs">With Labor**</th></tr></thead>
              <tbody>
                {[
                  ['Patio (10×10)', '1.2 yd³', '$180–$210', '$380–$810'],
                  ['Driveway (20×20)', '6.2 yd³', '$930–$1,085', '$1,730–$4,285'],
                  ['Sidewalk (4×20)', '1.0 yd³', '$150–$175', '$310–$655'],
                  ['Garage (24×24)', '10.7 yd³', '$1,605–$1,872', '$2,757–$6,480'],
                ].map(([p, v, m, l], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}><td className="px-4 py-3 font-medium text-navy">{p}</td><td className="px-4 py-3">{v}</td><td className="px-4 py-3">{m}</td><td className="px-4 py-3">{l}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mb-6">*Based on $150–$175/yd³. **Including labor at $2–$8/sq ft.</p>
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
          <FAQ items={FAQ_ITEMS} heading="Concrete Cost Calculator — Frequently Asked Questions" />
        </div>
      </section>
    </>
  );
}
