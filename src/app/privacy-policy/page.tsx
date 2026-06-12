import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MaterialCalc\'s privacy policy. Learn how we handle your data, cookies, analytics, and your privacy rights when using our free construction calculators.',
  alternates: { canonical: '/privacy-policy/' },
  openGraph: { title: 'Privacy Policy — MaterialCalc', url: '/privacy-policy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      <section className="bg-white py-12 text-center">
        <div className="container-main">
          <h1 className="heading-1 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: June 9, 2026</p>
        </div>
      </section>

      <section className="pb-16">
        <article className="max-w-content mx-auto px-6 prose-navy">
          <div className="alert-info mb-8">
            <p className="text-sm text-gray-600"><strong className="text-info">Summary:</strong> MaterialCalc is a free calculator website. We don&apos;t require accounts or store your calculations. We use Google Analytics to understand how our site is used and cookies to improve your experience. We never sell your personal data.</p>
          </div>

          {/* TOC */}
          <nav className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-base font-semibold text-navy mb-3">Table of Contents</h2>
            <ol className="list-decimal list-inside text-sm text-orange space-y-1.5">
              {['Information We Collect','How We Use Your Information','Cookies and Tracking','Google Analytics','Advertising','Third-Party Services','Data Retention','Your Rights','Children\'s Privacy','Changes to This Policy','Contact Us'].map((t,i) => (
                <li key={i}><a href={`#section-${i+1}`} className="hover:underline">{t}</a></li>
              ))}
            </ol>
          </nav>

          {([
            { id: 1, title: 'Information We Collect', content: (
              <>
                <h3 className="heading-3 mb-2 mt-4">Information You Provide</h3>
                <p>When you use the contact form on our website, we collect the information you voluntarily submit, which may include your name, email address, and the content of your message. This information is used solely to respond to your inquiry.</p>
                <h3 className="heading-3 mb-2 mt-4">Calculator Data</h3>
                <p>All calculations performed on MaterialCalc are processed entirely within your web browser. We do not collect, transmit, or store any dimensions, measurements, costs, or other values you enter into our calculators. Your project data stays on your device.</p>
                <h3 className="heading-3 mb-2 mt-4">Automatically Collected Information</h3>
                <p>When you visit MaterialCalc, certain information is collected automatically through cookies and similar technologies, including your anonymized IP address, browser type, device type, pages visited, time spent on pages, and geographic location at the country/city level.</p>
              </>
            )},
            { id: 2, title: 'How We Use Your Information', content: (
              <p>We use collected information to respond to contact form inquiries, understand how visitors use our website so we can improve our calculators, identify technical issues, analyze traffic patterns, and comply with legal obligations. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            )},
            { id: 3, title: 'Cookies and Tracking Technologies', content: (
              <>
                <p>MaterialCalc uses cookies to enhance your experience. <strong>Essential cookies</strong> enable basic features like page navigation and remembering your unit preference. <strong>Analytics cookies</strong> (Google Analytics) collect anonymized data about page views and traffic sources. <strong>Advertising cookies</strong> may be introduced in the future to support our free calculators — we will update this policy and provide consent mechanisms before that happens.</p>
                <p className="mt-3">You can control cookies through your browser settings. Disabling essential cookies may affect calculator functionality.</p>
              </>
            )},
            { id: 4, title: 'Google Analytics', content: (
              <p>MaterialCalc uses Google Analytics 4 (GA4) to understand how visitors use our website. We have enabled IP anonymization, do not use Google Signals or User-ID features, and do not link analytics data with other Google services. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>
            )},
            { id: 5, title: 'Advertising', content: (
              <p>MaterialCalc currently does not display third-party advertisements. We may introduce advertising in the future to support our free calculators. If advertising is introduced, we will update this privacy policy with detailed information about advertising partners, data collected, and how to manage your preferences. We will never display ads that interfere with calculator usability.</p>
            )},
            { id: 6, title: 'Third-Party Services', content: (
              <p>MaterialCalc uses Google Analytics (website analytics), Google Fonts (typography), and a hosting provider (standard server operations). Each service has its own privacy policy governing data handling.</p>
            )},
            { id: 7, title: 'Data Retention', content: (
              <p><strong>Contact form submissions</strong> are retained for up to 12 months. <strong>Analytics data</strong> is retained for 14 months, then automatically deleted. <strong>Calculator data</strong> is never retained — all calculations are performed in your browser and are not transmitted to our servers.</p>
            )},
            { id: 8, title: 'Your Rights', content: (
              <>
                <p>Depending on your location, you may have the right to access, correct, delete, restrict, or port your personal data, and to object to or withdraw consent for processing. To exercise these rights, contact us at <a href={`mailto:${SITE.email}`} className="text-orange hover:underline">{SITE.email}</a>. We will respond within 30 days.</p>
                <p className="mt-3"><strong>EEA residents:</strong> Our legal bases for processing are legitimate interest (analytics), consent (non-essential cookies), and contractual necessity (contact form). You may lodge a complaint with your local data protection authority.</p>
                <p className="mt-3"><strong>California residents:</strong> Under the CCPA, you have the right to know what personal information is collected, to delete it, and to opt out of its sale. MaterialCalc does not sell personal information.</p>
              </>
            )},
            { id: 9, title: 'Children\'s Privacy', content: (
              <p>MaterialCalc is not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child under 13, please contact us and we will promptly delete it.</p>
            )},
            { id: 10, title: 'Changes to This Policy', content: (
              <p>We may update this privacy policy to reflect changes in our practices or legal requirements. When we make material changes, we will update the &quot;Last updated&quot; date at the top. We encourage you to review this policy periodically.</p>
            )},
            { id: 11, title: 'Contact Us', content: (
              <p>If you have questions about this privacy policy, contact us at: <strong>MaterialCalc</strong> — Email: <a href={`mailto:${SITE.email}`} className="text-orange hover:underline">{SITE.email}</a> — Website: <a href={SITE.url} className="text-orange hover:underline">{SITE.domain}</a></p>
            )},
          ] as { id: number; title: string; content: React.ReactNode }[]).map((section) => (
            <div key={section.id} id={`section-${section.id}`} className="mb-8 pt-6 border-t border-gray-100 first:border-t-0 first:pt-0">
              <h2 className="heading-2 mb-3">{section.id}. {section.title}</h2>
              <div className="text-base text-gray-600 leading-relaxed [&_p]:mb-3">{section.content}</div>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
