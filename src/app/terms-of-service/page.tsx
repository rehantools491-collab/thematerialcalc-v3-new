import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MaterialCalc.com. Read our terms covering calculator usage, limitations of liability, and website policies.',
  alternates: { canonical: '/terms-of-service/' },
  openGraph: { title: 'Terms of Service — MaterialCalc', url: '/terms-of-service/' },
};

const SECTIONS = [
  { id: 1, title: 'Acceptance of Terms', content: 'By accessing and using MaterialCalc.com ("the Website," "the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Website. These Terms apply to all visitors, users, and others who access or use the Service.' },
  { id: 2, title: 'Description of Service', content: 'MaterialCalc provides free, web-based construction calculators designed to help users estimate material quantities and project costs. Our current offerings include concrete calculators for volume, cost, and bag quantity estimation. The Service is provided free of charge and does not require user registration. All calculations are performed within your web browser.' },
  { id: 3, title: 'Calculator Usage and Limitations', content: 'Our calculators produce estimates based on mathematical formulas and standard industry assumptions. These estimates are intended for planning and budgeting purposes only. They should never be used as the sole basis for construction decisions, material purchases, or structural engineering. MaterialCalc calculators are not a replacement for professional services from licensed engineers, architects, contractors, or building officials.' },
  { id: 4, title: 'User Responsibility', content: 'You are solely responsible for: verifying all calculator results independently before making purchasing or construction decisions; taking accurate measurements of your project area; consulting local building codes, regulations, and permit requirements; ordering appropriate materials based on your specific project conditions; and engaging qualified professionals for structural, safety-critical, or code-regulated work.' },
  { id: 5, title: 'Accuracy and Verification', content: 'While we strive to provide accurate calculations based on industry-standard formulas, MaterialCalc makes no warranty or guarantee regarding the accuracy, completeness, or reliability of any calculation results. Results may differ from actual material requirements due to variations in site conditions, material dimensions, concrete mix variations, waste factors, regional differences, and environmental factors. Cost estimates are based on general price ranges and may not reflect current local pricing.' },
  { id: 6, title: 'Limitation of Liability', content: 'To the fullest extent permitted by applicable law, MaterialCalc, its owners, operators, affiliates, and contributors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Website or reliance on any calculator results. This includes damages from errors in results, material shortages, construction defects, financial losses, personal injury, or inability to access the Website. The Service is provided on an "as is" and "as available" basis without any warranties.' },
  { id: 7, title: 'Indemnification', content: 'You agree to indemnify, defend, and hold harmless MaterialCalc, its owners, operators, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses arising from your use of the Website, your violation of these Terms, or your reliance on calculator results.' },
  { id: 8, title: 'Intellectual Property', content: 'All content on MaterialCalc.com, including text, graphics, logos, icons, images, calculator code, formulas, and the overall design, is the property of MaterialCalc and is protected by applicable intellectual property laws. The MaterialCalc name, logo (including the cube icon), and branding are trademarks of MaterialCalc.' },
  { id: 9, title: 'User Conduct', content: 'When using MaterialCalc, you agree not to: use the Website for unlawful purposes; attempt unauthorized access to any part of the Website; use automated bots or scraping tools; introduce malicious code; interfere with the Website\'s functionality; or copy, mirror, or frame the Website without permission.' },
  { id: 10, title: 'Third-Party Links and Content', content: 'MaterialCalc may contain links to third-party websites. These are provided for convenience and do not imply endorsement. In the future, MaterialCalc may display third-party advertisements. The appearance of ads does not constitute endorsement of advertised products or services.' },
  { id: 11, title: 'Modifications', content: 'MaterialCalc reserves the right to modify, suspend, or discontinue any part of the Service at any time. We may update these Terms at any time — continued use after changes constitutes acceptance. We encourage periodic review.' },
  { id: 12, title: 'Governing Law', content: 'These Terms shall be governed by applicable laws, without regard to conflict of law principles. If any provision is found unenforceable, the remaining provisions continue in full force. These Terms, together with our Privacy Policy, constitute the entire agreement between you and MaterialCalc.' },
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />
      <section className="bg-white py-12 text-center">
        <div className="container-main">
          <h1 className="heading-1 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: June 9, 2026</p>
        </div>
      </section>

      <section className="pb-16">
        <article className="max-w-content mx-auto px-6">
          <div className="alert-warning mb-8">
            <p className="text-sm text-gray-600">
              <strong className="text-warning">Important:</strong> MaterialCalc provides free construction calculators for informational and estimation purposes only. All calculations should be verified independently before making purchasing or construction decisions. MaterialCalc is not a substitute for professional engineering, architectural, or construction advice.
            </p>
          </div>

          <nav className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-base font-semibold text-navy mb-3">Table of Contents</h2>
            <ol className="list-decimal list-inside text-sm text-orange space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}><a href={`#tos-${s.id}`} className="hover:underline">{s.title}</a></li>
              ))}
              <li><a href="#tos-contact" className="hover:underline">Contact Information</a></li>
            </ol>
          </nav>

          {SECTIONS.map((s) => (
            <div key={s.id} id={`tos-${s.id}`} className="mb-8 pt-6 border-t border-gray-100 first:border-t-0 first:pt-0">
              <h2 className="heading-2 mb-3">{s.id}. {s.title}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}

          <div id="tos-contact" className="mb-8 pt-6 border-t border-gray-100">
            <h2 className="heading-2 mb-3">13. Contact Information</h2>
            <p className="text-base text-gray-600 leading-relaxed">
              If you have questions about these Terms of Service, contact us at:{' '}
              <strong>MaterialCalc</strong> — Email:{' '}
              <a href={`mailto:${SITE.email}`} className="text-orange hover:underline">{SITE.email}</a>{' '}
              — Website:{' '}
              <a href={SITE.url} className="text-orange hover:underline">{SITE.domain}</a>
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
