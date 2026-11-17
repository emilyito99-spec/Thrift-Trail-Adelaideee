import React, { useState } from 'react';
import { PageRoute } from '../types';
import {
  Mail,
  Send,
  Store,
  AlertTriangle,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';

function normalizeFormspreeEndpoint(raw: string): string {
  const value = raw.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('formspree.io/')) return `https://${value}`;
  if (value.startsWith('/f/')) return `https://formspree.io${value}`;
  if (value.startsWith('f/')) return `https://formspree.io/${value}`;
  if (/^[a-zA-Z0-9_-]{6,32}$/.test(value)) return `https://formspree.io/f/${value}`;
  return value;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formEndpoint = normalizeFormspreeEndpoint(
    import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email address, and message before sending.');
      return;
    }

    if (!formEndpoint) {
      setStatus('unconfigured');
      setErrorMessage(
        'This contact form is not connected to a form delivery service yet (VITE_FORMSPREE_ENDPOINT is not configured), so your message has not been sent.'
      );
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          _subject: `Thrift Trail Adelaide message from ${trimmedName}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        trackEvent('contact_form_sent', 'Contact', 'Formspree submission');
      } else {
        let serverError = 'Unable to send your message right now. Please try again later.';
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length > 0) {
            serverError = data.errors
              .map((err: { message?: string }) => err.message)
              .filter(Boolean)
              .join(' ');
          }
        } catch {
          // ignore JSON parse errors on non-JSON responses
        }
        setStatus('error');
        setErrorMessage(serverError);
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'A network error prevented your message from sending. Please check your connection and try again.'
      );
    }
  };

  const contactReasons = [
    {
      icon: Store,
      title: 'Suggest a Store',
      description:
        'Know an Adelaide op shop, vintage boutique, or preloved market we should feature in the directory? Let us know its name and suburb.',
    },
    {
      icon: AlertTriangle,
      title: 'Report Outdated Info',
      description:
        'Spotted changed opening hours, a closed location, or an updated Instagram handle or website link? Help us keep listings accurate.',
    },
    {
      icon: MessageSquare,
      title: 'Share Feedback',
      description:
        'Have ideas for new style filters, thrift guides, or ways to make comparing second-hand clothing stores easier for students?',
    },
    {
      icon: HelpCircle,
      title: 'Ask Questions',
      description:
        'Curious about our university Digital Marketing project, sustainable fashion tips, or how Thrift Trail Adelaide works?',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header & Breadcrumb */}
      <div className="border-b border-[#E8DFD5] pb-8 max-w-3xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#7A7167] mb-2 font-medium">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#213B24] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#213B24]">Contact</span>
        </nav>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#213B24] tracking-tight leading-tight">
          Contact Thrift Trail Adelaide
        </h1>
        <p className="text-sm sm:text-base text-[#585047] mt-3 leading-relaxed">
          Have a favourite Adelaide op shop to recommend, noticed outdated store details, or want to share feedback on the project? We&apos;d love to hear from you—send us a quick note below.
        </p>
      </div>

      {/* Main Content: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Why Reach Out */}
        <section className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
              How We Can Help
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
              Ways to get in touch
            </h2>
            <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
              Thrift Trail Adelaide is built to make second-hand shopping simpler and more reliable across Adelaide. Feel free to message us anytime to:
            </p>
          </div>

          <div className="space-y-4">
            {contactReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="bg-white p-5 rounded-lg border border-[#E8DFD5] flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-editorial text-base font-bold text-[#213B24]">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-[#585047] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Contact Form */}
        <section className="lg:col-span-7 bg-white rounded-xl border border-[#E8DFD5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F4EFEA] pb-5">
            <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#213B24]">
                Send a Message
              </h2>
              <p className="text-xs text-[#585047]">
                Fill out your details below and we&apos;ll review your note.
              </p>
            </div>
          </div>

          {/* Verified Success Banner — ONLY shown when Formspree returns HTTP OK */}
          {status === 'success' && (
            <div
              role="status"
              className="p-4 bg-[#EBF2EC] border border-[#2F5233]/30 rounded-lg flex items-start gap-3 text-xs sm:text-sm text-[#213B24]"
            >
              <CheckCircle2 className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Message sent successfully</p>
                <p className="text-xs text-[#585047] leading-relaxed">
                  Thank you for reaching out to Thrift Trail Adelaide. Your message has been delivered and we appreciate your contribution.
                </p>
              </div>
            </div>
          )}

          {/* Unconfigured or Error Banner */}
          {(status === 'error' || status === 'unconfigured') && errorMessage && (
            <div
              role="alert"
              className="p-4 bg-[#FAF7F2] border border-[#C06443]/40 rounded-lg flex items-start gap-3 text-xs sm:text-sm text-[#213B24]"
            >
              <AlertCircle className="w-5 h-5 text-[#C06443] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">
                  {status === 'unconfigured' ? 'Form delivery not connected yet' : 'Message could not be sent'}
                </p>
                <p className="text-xs text-[#585047] leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-semibold text-[#213B24]">
                Name <span className="text-[#C06443]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status === 'success') setStatus('idle');
                }}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#213B24] placeholder:text-[#7A7167] focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-semibold text-[#213B24]">
                Email <span className="text-[#C06443]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'success') setStatus('idle');
                }}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#213B24] placeholder:text-[#7A7167] focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#213B24]">
                Message <span className="text-[#C06443]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === 'success') setStatus('idle');
                }}
                placeholder="Suggest an Adelaide store, report updated hours or prices, share feedback, or ask a question..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#213B24] placeholder:text-[#7A7167] focus:outline-none focus:ring-2 focus:ring-[#2F5233]/30 focus:border-[#2F5233] resize-y"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[11px] text-[#7A7167]">
                All fields are required. Your details are only used to reply to your message.
              </p>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2F5233] hover:bg-[#213B24] disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-md shadow-xs cursor-pointer whitespace-nowrap w-full sm:w-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
