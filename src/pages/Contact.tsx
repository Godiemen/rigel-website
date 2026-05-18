import { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2, Clock, Building2, ArrowRight, Phone } from 'lucide-react';

const OFFICE_ADDRESS = '11 Westville Centre, 52 Norfolk Terrace, Westville, Durban, 3629, KwaZulu-Natal, South Africa';
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto as a simple contact method
    const mailto = `mailto:support@rigelbusiness.co.za?subject=${encodeURIComponent(form.subject || 'Enquiry from website')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-[#06110e] text-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(27,163,123,0.34),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.16),transparent_28%)] pointer-events-none" />
        <div className="absolute right-[8%] top-16 h-56 w-56 rounded-full bg-[#00df5f]/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-black text-[#70e1bf] mb-6">
                <MessageSquare className="h-4 w-4" /> Rigel support desk
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">Talk to the Rigel Business team.</h1>
              <p className="text-slate-300 text-lg leading-8 max-w-xl mb-8">
                Need help choosing a plan, setting up your company, or understanding VAT, payroll, inventory or reporting? Send us a message and we’ll guide you.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Sales enquiries', 'Technical support', 'Setup guidance'].map(item => (
                  <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-200">{item}</span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-[#1BA37B]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white text-slate-900 shadow-2xl shadow-black/40">
                <iframe
                  title="Rigel Business Durban office map"
                  src={MAP_URL}
                  className="h-96 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-900 shadow-lg ring-1 ring-slate-200 hover:text-[#1BA37B] transition-colors"
                >
                  Open exact location
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="h-10 w-10 rounded-xl bg-[#1BA37B]/10 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 text-[#1BA37B]" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Email us</h4>
                <p className="text-slate-500 text-sm">support@rigelbusiness.co.za</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="h-10 w-10 rounded-xl bg-[#1BA37B]/10 flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 text-[#1BA37B]" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Response time</h4>
                <p className="text-slate-500 text-sm">We reply within 24 hours on business days.</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="h-10 w-10 rounded-xl bg-[#1BA37B]/10 flex items-center justify-center mb-3">
                  <Building2 className="h-5 w-5 text-[#1BA37B]" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Office location</h4>
                <p className="text-slate-500 text-sm leading-6">52 Norfolk Terrace<br />11 Westville Centre<br />Durban, KwaZulu-Natal 3629, ZA</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="h-10 w-10 rounded-xl bg-[#1BA37B]/10 flex items-center justify-center mb-3">
                  <Phone className="h-5 w-5 text-[#1BA37B]" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Priority support</h4>
                <p className="text-slate-500 text-sm">Sign in and use in-app chat for account-specific assistance.</p>
              </div>
              <div className="bg-[#1BA37B] rounded-2xl p-6 text-white">
                <h4 className="font-black mb-2">Need help fast?</h4>
                <p className="text-emerald-100 text-sm mb-5">Sign in to your account and use the in-app support chat for priority assistance.</p>
                <a href="https://biz-flow-sa.vercel.app/login" className="inline-flex items-center gap-2 text-sm font-black text-white">
                  Sign in to Rigel <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-[#1BA37B]/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-[#1BA37B]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-slate-500">Your email client should have opened. We'll reply within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-[#1BA37B] text-sm font-semibold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Send us a message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA37B]/30 focus:border-[#1BA37B] transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA37B]/30 focus:border-[#1BA37B] transition-colors"
                        placeholder="john@company.co.za"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA37B]/30 focus:border-[#1BA37B] transition-colors"
                      placeholder="Sales enquiry / Technical support / Other"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1BA37B]/30 focus:border-[#1BA37B] transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#1BA37B] hover:bg-[#158a66] text-white font-bold transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
