'use client';

import { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  heading?: string;
}

export default function FAQ({ items, heading }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {heading && <h2 className="heading-2 mb-6">{heading}</h2>}
      <div className="space-y-2" role="list">
        {items.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'border-l-[3px] border-l-orange' : ''}`}
            role="listitem"
          >
            <button
              className="w-full flex items-center justify-between p-4 md:p-5 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="text-sm md:text-base font-semibold text-navy pr-4">{item.question}</span>
              <svg
                className={`w-4 h-4 text-orange shrink-0 transition-transform ${openIndex === i ? 'rotate-90' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-gray-100">
                <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed mt-3">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
