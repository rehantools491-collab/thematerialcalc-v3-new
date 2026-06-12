import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SchemaMarkup, { organizationSchema } from '@/components/seo/SchemaMarkup';
import { CALCULATOR_TOOLS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About MaterialCalc — Free Construction Calculators by Rehan Ilahi',
  description:
    'Learn about MaterialCalc, founded by Rehan Ilahi. We provide free construction calculators, material estimation tools, and project planning resources for homeowners, DIYers, and contractors.',
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About MaterialCalc — Free Construction Calculators',
    description:
      'MaterialCalc helps homeowners, DIYers, and contractors calculate construction material quantities accurately.',
    url: '/about/',
  },
};

const VALUES = [
  { icon: '✓', title: 'Accuracy First', desc: 'Every calculator uses industry-standard formulas verified against professional construction references.' },
  { icon: '⚡', title: 'Free and Instant', desc: 'No accounts, no emails, no paywalls. Open the calculator, enter your dimensions, and get results immediately.' },
  { icon: '🏗️', title: 'Built for Real Projects', desc: 'Practical features like waste factors, project presets, and bag estimates that matter on the jobsite.' },
  { icon: '🔒', title: 'Privacy Respected', desc: 'We don\'t store your calculations or personal data. Your project details stay on your device.' },
];

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup schemas={[organizationSchema()]} />
      <Breadcrumb items={[{ label: 'About' }]} />

      {/* Hero */}
      <section className="bg-white py-12 text-center">
        <div className="container-main">
          <h1 className="heading-1 mb-2">About MaterialCalc</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Free, accurate construction calculators built for people who build things.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">Our Mission</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            MaterialCalc was founded by Rehan Ilahi to provide free, accurate construction calculators for homeowners, DIY enthusiasts, contractors, and builders.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            We build free online calculators that give you precise material quantities in seconds. No signups. No paywalls. No guesswork. Just enter your project dimensions, and get the results you need to order with confidence.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">What We Do</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            MaterialCalc provides specialized construction calculators designed for real-world projects. Every calculator uses industry-standard formulas, supports both Imperial and Metric units, and includes practical features like waste factor adjustments and project-type presets.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            We currently offer a complete suite of concrete calculators, with plans to expand into gravel, sand, asphalt, brick, roofing, lumber, and more. Our goal is to become the most trusted construction calculator resource on the web.
          </p>

          <h3 className="heading-3 mb-3">Our Concrete Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CALCULATOR_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="flex items-center gap-3 p-4 border border-gray-100 rounded-lg hover:border-orange hover:shadow-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-light text-orange flex items-center justify-center text-sm shrink-0">■</div>
                <div>
                  <div className="text-sm font-semibold text-navy">{tool.name}</div>
                  <div className="text-xs text-gray-400">{tool.shortDesc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-orange transition-colors">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-base font-semibold text-navy mb-1.5">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses */}
      <section className="bg-white section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="heading-2 mb-4">Who Uses MaterialCalc</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            <strong className="text-navy">Homeowners</strong> use MaterialCalc to estimate materials before starting a project, helping them budget accurately and avoid costly over-ordering or short-falls at the ready-mix plant.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            <strong className="text-navy">DIY enthusiasts</strong> rely on our calculators when planning weekend projects like patios, sidewalks, fence posts, and shed foundations. The bag calculator is especially popular for smaller projects.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            <strong className="text-navy">Contractors and builders</strong> use MaterialCalc as a quick reference tool for estimates and proposals. The cost calculator helps generate accurate project quotes.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            <strong className="text-navy">Students and educators</strong> find our step-by-step formulas and worked examples useful for learning construction math fundamentals.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-12 text-center">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Start Calculating</h2>
          <p className="text-base text-white/70 mb-6 max-w-md mx-auto">Choose a calculator and get accurate results in seconds. No signup required.</p>
          <Link href="/" className="inline-block px-8 py-3.5 bg-orange text-white font-bold rounded-lg hover:bg-orange-dark transition-all hover:-translate-y-[1px] hover:shadow-lg">
            Open Concrete Calculator
          </Link>
        </div>
      </section>
    </>
  );
}
