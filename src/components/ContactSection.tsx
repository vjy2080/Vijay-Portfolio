import React, { useState } from 'react';
import { ContactData } from '../types/portfolio';
import { Mail, Phone, Code2, Send, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  contact: ContactData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'React Native / Web Project Collaboration',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('sent');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <section id="contact" className="w-full py-28 md:py-36 px-6 lg:px-12 bg-[#0a0f18] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{contact.kicker}</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            {contact.headline}
          </h2>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            {contact.description}
          </p>

          <div className="flex flex-col gap-6 pt-4">
            {/* Email Card */}
            <div
              onClick={() => handleCopy(contact.directEmail, 'email')}
              className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-slate-900/50 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:border-sky-400/40 transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <span>Direct Email</span>
                  {copiedItem === 'email' && (
                    <span className="text-[10px] text-emerald-400 font-mono lowercase">copied!</span>
                  )}
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {contact.directEmail}
                </div>
              </div>
              <button
                type="button"
                className="p-2 text-slate-500 group-hover:text-sky-400 transition-colors"
                title="Copy email"
              >
                {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div
              onClick={() => handleCopy(contact.phone, 'phone')}
              className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-slate-900/50 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-sky-500/20 flex items-center justify-center text-indigo-300 group-hover:scale-105 group-hover:border-indigo-400/40 transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <span>Phone</span>
                  {copiedItem === 'phone' && (
                    <span className="text-[10px] text-emerald-400 font-mono lowercase">copied!</span>
                  )}
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {contact.phone}
                </div>
              </div>
              <button
                type="button"
                className="p-2 text-slate-500 group-hover:text-indigo-400 transition-colors"
                title="Copy phone"
              >
                {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-slate-900/50 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:border-sky-400/40 transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Location
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {contact.location || "Gandhinagar, Gujarat, India"}
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <a
              href={contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 -mx-3 rounded-2xl hover:bg-slate-900/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-500/20 flex items-center justify-center text-sky-200 group-hover:scale-105 group-hover:border-sky-400/40 transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px]">code</span>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  GitHub
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {contact.github}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors mr-2" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-900/40 backdrop-blur-2xl p-8 sm:p-12 border border-sky-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Send a Message to Vijay
              </h3>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            </div>

            {status === 'sent' ? (
              <div className="p-8 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center shadow-[0_0_20px_#7dd3fc]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-sm text-slate-300 max-w-md font-light">
                  Thank you for reaching out. Vijay has received your inquiry and will respond to your email promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-sky-500/20 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors shadow-inner placeholder-slate-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-sky-500/20 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors shadow-inner placeholder-slate-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="React Native / Web Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-sky-500/20 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors shadow-inner placeholder-slate-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your mobile or web project scope, timeline, or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-950/80 border border-sky-500/20 text-white text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none shadow-inner placeholder-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-base hover:opacity-95 active:scale-95 transition-all shadow-[0_0_35px_rgba(125,211,252,0.4)] flex items-center justify-center gap-3 mt-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{status === 'submitting' ? 'Transmitting Message...' : 'Send Message'}</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
