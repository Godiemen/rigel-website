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
    <div className="bg-white">
      {/* Hero — full-bleed image banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_u5wb3gu5wb3gu5wb.png"
            alt="Rigel Business contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-[#0B1220]/50" />
          <div className="absolute inset-0 bg-[#0B1220]/30" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F9D6C]/15 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Rigel Support Desk</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Talk to the Rigel Business team
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-8">
              Need help choosing a plan, setting up your company, or understanding VAT, payroll, inventory or reporting? Send us a message and we'll guide you.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Sales enquiries', 'Technical support', 'Setup guidance'].map(item => (
                <span key={item} className="rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-200">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact info cards + form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              <div className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Email us</h4>
                <p className="text-slate-500 text-sm">support@rigelbusiness.co.za</p>
              </div>
              <div className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Response time</h4>
                <p className="text-slate-500 text-sm">We reply within 24 hours on business days.</p>
              </div>
              <div className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Office location</h4>
                <p className="text-slate-500 text-sm leading-6">52 Norfolk Terrace, 11 Westville Centre<br />Durban, KwaZulu-Natal 3629, ZA</p>
              </div>
              <div className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Phone className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Priority support</h4>
                <p className="text-slate-500 text-sm">Sign in and use in-app chat for account-specific assistance.</p>
              </div>
              <div className="rounded-2xl bg-[#0F9D6C] p-5 text-white">
                <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Need help fast?</h4>
                <p className="text-emerald-50 text-sm mb-4">Sign in to your account and use the in-app support chat for priority assistance.</p>
                <a href="https://biz-flow-sa.vercel.app/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-emerald-100 transition-colors">
                  Sign in to Rigel <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Message sent!</h3>
                  <p className="text-slate-600">Your email client should have opened. We'll reply within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-emerald-600 text-sm font-semibold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Send us a message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F9D6C]/30 focus:border-[#0F9D6C] transition-colors"
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
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F9D6C]/30 focus:border-[#0F9D6C] transition-colors"
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
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F9D6C]/30 focus:border-[#0F9D6C] transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F9D6C]/30 focus:border-[#0F9D6C] transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-pill w-full h-12 bg-[#0F9D6C] hover:bg-[#0B7A52] text-white font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <iframe
              title="Rigel Business Durban office map"
              src={MAP_URL}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-md border border-slate-200 hover:text-emerald-600 transition-colors"
            >
              Open exact location
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
