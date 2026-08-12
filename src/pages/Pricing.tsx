import { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Building2, Users } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const plans = [
  {
    name: 'Standard',
    price: 'R1,500',
    period: 'per month',
    desc: 'For growing SMEs that need full accounting, VAT, payroll and multi-company management.',
    badge: 'Most Popular',
    cta: 'Choose Standard',
    features: [
      'Up to 25 companies',
      'Up to 30 users',
      'Full accounting & double-entry bookkeeping',
      'VAT201 reports & SARS compliance',
      'Payroll processing with PAYE, UIF & SDL',
      'Employee portal with clock-in',
      'Inventory & stock management',
      'Full financial statements (AFS)',
      'Desktop app + web app + PWA',
      'Priority email & phone support',
    ],
  },
  {
    name: 'Custom',
    price: null,
    period: '',
    desc: 'For accountants, franchises and enterprises that need tailored scale and dedicated support.',
    badge: '',
    cta: 'Contact us',
    features: [
      'Unlimited companies',
      'Unlimited users',
      'Everything in Standard',
      'Dedicated account manager',
      'Custom workflows & integrations',
      'Advanced audit logs',
      'Custom email templates',
      'Onboarding & training included',
      'SLA & priority support',
    ],
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="bg-white">
      {/* Hero — split layout with image showcase */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_st6xx8st6xx8st6x.png"
            alt="Rigel Business pricing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D6C] animate-pulse" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Pricing</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Simple pricing for growing South African businesses
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              One plan that covers everything — accounting, VAT, payroll, inventory and reporting. No hidden fees, no per-user add-ons. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <a href="#plans" className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white">
                See plans
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === 'monthly' ? 'bg-[#0F9D6C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === 'annual' ? 'bg-[#0F9D6C] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Annual <span className="text-xs ml-1 opacity-80">(2 months free)</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                  plan.badge
                    ? 'border-2 border-[#0F9D6C] shadow-xl bg-white'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="bg-[#0F9D6C] text-white text-xs font-semibold text-center py-2 tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> {plan.badge}
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-6">{plan.desc}</p>
                  <div className="mb-8">
                    {plan.price ? (
                      <>
                        <span className="text-5xl font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                          {billing === 'annual' ? 'R1,250' : plan.price}
                        </span>
                        <span className="text-slate-500 text-sm ml-2">/month</span>
                        {billing === 'annual' && (
                          <p className="text-xs text-emerald-600 mt-1 font-medium">Billed annually (R15,000/year)</p>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                          Let's talk
                        </span>
                        <p className="text-xs text-slate-400 mt-1">Custom pricing for your scale</p>
                      </>
                    )}
                  </div>

                  {/* Quick stats for Standard */}
                  {plan.price && (
                    <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">25</div>
                          <div className="text-xs text-slate-400">Companies</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">30</div>
                          <div className="text-xs text-slate-400">Users</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.price ? `${APP_URL}/signup` : '/contact'}
                    className={`btn-pill w-full h-12 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                      plan.badge
                        ? 'bg-[#0F9D6C] hover:bg-[#0B7A52] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              All plans include a 7-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Questions</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What's included in the Standard plan?", a: 'Standard includes up to 25 companies, 30 users, full accounting, VAT201 reports, payroll processing, employee portal with clock-in, inventory management, financial statements, desktop app, web app and PWA access.' },
              { q: 'Is there a free trial?', a: 'Yes. Start free for 7 days with no credit card required. Cancel anytime with no setup or hidden fees.' },
              { q: 'Does Rigel support VAT for South African businesses?', a: 'Yes. Rigel includes VAT tracking, VAT periods and SARS-compliant VAT201 reports designed for South African business workflows.' },
              { q: 'Is payroll included?', a: 'Yes. Standard includes full payroll processing with automated PAYE, UIF and SDL calculations, employee self-service portal, clock-in and payslip management.' },
              { q: 'Can I use Rigel on desktop and mobile?', a: 'Yes. You can use Rigel in the browser, install it as a PWA on your phone, or download the native Windows desktop app.' },
              { q: 'What if I need more than 25 companies or 30 users?', a: 'Contact us about the Custom plan. We offer unlimited companies and users with dedicated support, custom workflows and SLA coverage.' },
            ].map((item, index) => (
              <div key={item.q} className={`rounded-2xl border transition-all ${openFaq === index ? 'border-emerald-300 bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <h4 className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.q}</h4>
                  <span className={`text-xl font-light text-emerald-600 transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Ready to take control of your business?
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Start your 7-day free trial today. No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white">
              Start free trial <ArrowRight className="h-4 w-4 ml-2" />
            </a>
            <a href="/book-demo" className="btn-pill inline-flex h-12 items-center border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-8 font-semibold text-slate-700">
              Book a demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
