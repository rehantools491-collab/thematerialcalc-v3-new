import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ContactForm, { ContactSidebar } from '@/components/pages/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description:
    'Contact MaterialCalc for calculator suggestions, partnerships, website feedback, or general support. We typically respond within 24–48 hours.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact MaterialCalc — Get in Touch',
    description:
      'Have a question, suggestion, or partnership inquiry? Contact MaterialCalc.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <section className="bg-white py-12 text-center">
        <div className="container-main">
          <h1 className="heading-1 mb-2">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Have a question, suggestion, or partnership inquiry? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </>
  );
}
