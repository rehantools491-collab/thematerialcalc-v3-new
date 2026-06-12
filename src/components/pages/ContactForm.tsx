'use client';

import { useState, type FormEvent } from 'react';
import { SITE } from '@/lib/constants';

const SUBJECTS = [
  'Calculator Suggestion',
  'Bug Report',
  'Website Feedback',
  'Partnership Inquiry',
  'Advertising Inquiry',
  'General Question',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-calc">
      <h2 className="text-xl font-bold text-navy mb-1">Send Us a Message</h2>
      <p className="text-sm text-gray-400 mb-6">
        Fill out the form below and we&apos;ll get back to you within 24–48 hours.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="input-label">
              Your Name <span className="text-error">*</span>
            </label>
            <input id="name" type="text" required placeholder="John Smith" className="input-field" />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="input-label">
              Email Address <span className="text-error">*</span>
            </label>
            <input id="email" type="email" required placeholder="john@example.com" className="input-field" />
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="input-label">Subject</label>
            <select
              id="subject"
              className="input-field appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center] pr-10"
              defaultValue=""
            >
              <option value="" disabled>Choose a topic</option>
              {SUBJECTS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="input-label">
              Message <span className="text-error">*</span>
            </label>
            <textarea id="message" required rows={5} placeholder="Tell us what's on your mind..." className="input-field h-auto py-3 resize-y" />
            <p className="text-xs text-gray-400 mt-1">Please include as much detail as possible.</p>
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      ) : (
        <div className="alert-success">
          <p className="text-sm text-gray-600">
            <strong className="text-success">Message sent!</strong> Thank you for reaching out. We&apos;ll respond within 24–48 business hours.
          </p>
        </div>
      )}
    </div>
  );
}

export function ContactSidebar() {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-navy mb-3">Contact Information</h3>
        <div className="bg-white rounded-xl p-5 border border-gray-100 space-y-4">
          {[
            { icon: '✉', label: 'Email', value: <a href={`mailto:${SITE.email}`} className="text-orange hover:underline">{SITE.email}</a> },
            { icon: '🕐', label: 'Business Hours', value: 'Monday – Friday, 9 AM – 5 PM' },
            { icon: '⏱', label: 'Response Time', value: 'Usually within 24–48 hours' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-light text-orange flex items-center justify-center text-sm shrink-0">{item.icon}</div>
              <div>
                <div className="text-xs font-semibold text-navy">{item.label}</div>
                <div className="text-sm text-gray-600">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-navy mb-3">What Can We Help With?</h3>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <ul className="space-y-2.5">
            {['Calculator suggestions and feature requests', 'Bug reports and technical issues', 'Partnership and collaboration inquiries', 'Advertising and sponsorship opportunities', 'Website feedback and improvements', 'General questions and support'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-navy mb-2">Follow Us</h3>
        <p className="text-sm text-gray-400 mb-3">Stay updated on new calculators and features.</p>
        <div className="flex gap-2.5">
          {[
            { label: 'Facebook', href: SITE.social.facebook, text: 'FB' },
            { label: 'Instagram', href: SITE.social.instagram, text: 'IG' },
            { label: 'LinkedIn', href: SITE.social.linkedin, text: 'LI' },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-10 h-10 rounded-lg border border-gray-100 flex items-center justify-center text-sm font-semibold text-gray-400 hover:border-orange hover:text-orange hover:bg-orange-light transition-colors">
              {s.text}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
