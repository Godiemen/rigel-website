import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';

const plans = [
  {
    name: 'Basic',
    price: 'R150',
    period: 'per month',
    desc: 'For small businesses that need clean accounting, VAT and daily admin tools.',
    color: 'border-slate-200',
    badge: '',
    cta: 'Choose Basic',
    features: [
      'Up to 5 companies',
      'Up to 5 users',
      'Invoices, quotes and receipts',
      'Basic accounting reports',
      'VAT tracking',
      'Email support',
      'PWA access',
    ],
    missing: ['Unlimited companies', 'Unlimited users', 'Priority support'],
  },
  {
    name: 'Standard',
    price: 'R250',
    period: 'per month',
    desc: 'For growing teams that need more companies, users and connected reporting.',
    color: 'border-[#1BA37B]',
    badge: 'Most Popular',
    cta: 'Choose Standard',
    features: [
      'Up to 10 companies',
      'Up to 10 users',
      'Unlimited invoices',
      'Full financial statements',
      'Trial balance and general ledger',
      'VAT201 reports',
      'Inventory management',
      'Desktop app included',
      'Priority email support',
    ],
    missing: [],
  },
  {
    name: 'Premium',
    price: 'R500',
    period: 'per month',
    desc: 'For accountants and larger businesses that need unlimited scale.',
    color: 'border-slate-200',
    badge: '',
    cta: 'Choose Premium',
    features: [
      'Unlimited companies',
      'Unlimited users',
      'Unlimited invoices',
      'Full financial statements',
      'Trial balance and general ledger',
      'Corporate tax tools',
      'Advanced audit logs',
      'Custom email templates',
      'Desktop app included',
      'Dedicated account manager',
      'Phone support',
    ],
    missing: [],
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Header */}
      <section
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center text-white py-20 lg:py-24"
        style={{ backgroundImage: "url('/pricing-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute right-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400 mb-6">Small business accounting software | South Africa</p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Accounting plans for small and growing businesses
              </h1>
              <p className="text-slate-300 text-lg leading-8 max-w-xl mb-8">
                Choose the Rigel Business plan that fits your team, then manage invoices, VAT, inventory, payroll and reports from one connected dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`${APP_URL}/signup`} className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/30">
                  Choose a plan <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#plans" className="h-12 px-8 rounded-xl border border-slate-500 hover:border-slate-300 text-white font-semibold text-sm flex items-center transition-colors">
                  See plans
                </a>
              </div>
            </div>

            <div className="relative min-h-[390px]">
              <div className="absolute left-4 right-0 top-0 transform -rotate-2">
                <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl shadow-black/25 border border-slate-200">
                  <div className="overflow-hidden rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 text-xs text-slate-600">Rigel Business Desktop</span>
                    </div>
                    <img src="/desktop%20app.png" alt="Rigel Business desktop app pricing preview" className="w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border ${plan.color} shadow-sm overflow-hidden flex flex-col relative ${plan.badge ? 'shadow-xl shadow-emerald-50/50' : ''}`}
              >
                {plan.badge && (
                  <div className="bg-emerald-600 text-white text-xs font-semibold text-center py-1.5 tracking-wider uppercase">{plan.badge}</div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mb-6">{plan.desc}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm ml-2">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                    {plan.missing.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400 line-through">
                        <CheckCircle2 className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${APP_URL}/signup`}
                    className={`w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                      plan.badge
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-3">Questions</p>
            <h2 className="text-4xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="border-y border-white/10">
            {[
              { q: 'Which plan should I choose?', a: 'Basic is best for smaller teams, Standard is best for growing businesses, and Premium is best when you need unlimited companies and users.' },
              { q: 'Does Rigel support VAT for South African businesses?', a: 'Yes. Rigel includes VAT tracking, VAT periods and VAT reports designed for South African business workflows.' },
              { q: 'Can I manage sales, purchases and inventory in one plan?', a: 'Yes. Standard and Premium are built for connected invoicing, purchase management, inventory, VAT and financial reporting.' },
              { q: 'Is payroll included in Rigel Business?', a: 'Payroll features are part of the broader business management workspace and are designed to connect employee totals to your reporting.' },
              { q: 'Can I use Rigel on desktop and mobile?', a: 'Yes. You can use Rigel in the browser, install it as a PWA, or download the desktop app where available.' },
              { q: 'Can I upgrade or downgrade later?', a: 'Yes. You can start small and move to a larger plan when your company needs more features, users or companies.' },
            ].map((item, index) => (
              <div key={item.q} className="group border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={openFaq === index}
                >
                  <h4 className="text-base font-semibold text-slate-100">{item.q}</h4>
                  <span className="text-2xl font-light text-white transition-colors group-hover:text-emerald-400">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <p className="-mt-2 max-w-3xl pb-6 text-sm leading-7 text-slate-400">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
