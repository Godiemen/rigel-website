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
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <img src={APP_ICON} alt="" className="absolute -right-10 -top-10 h-52 w-52 rotate-12 rounded-[2.5rem] object-cover opacity-[0.06]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_55%_42%,rgba(27,163,123,0.26),transparent_34%)] pointer-events-none" />
        <div className="absolute right-[8%] top-14 h-[30rem] w-[30rem] rounded-full bg-[#00df5f]/90 opacity-90 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-700 mb-6">Small business accounting software | South Africa</p>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 mb-6">
                Accounting plans for small and growing businesses
              </h1>
              <p className="text-slate-500 text-lg leading-8 max-w-xl mb-8">
                Choose the Rigel Business plan that fits your team, then manage invoices, VAT, inventory, payroll and reports from one connected dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`${APP_URL}/signup`} className="h-12 px-8 rounded-full bg-[#1BA37B] hover:bg-[#158a66] text-white font-black text-sm flex items-center gap-2 transition-colors">
                  Choose a plan <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#plans" className="h-12 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center transition-colors">
                  See plans
                </a>
              </div>
            </div>

            <div className="relative min-h-[390px]">
              <div className="absolute left-0 right-0 top-4">
                <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-300/80 ring-1 ring-white/70">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white">
                    <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-3 text-xs font-bold text-slate-500">Rigel Business Desktop</span>
                    </div>
                    <div className="relative bg-white">
                      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none" />
                      <img src="/desktop%20app.png" alt="Rigel Business desktop app pricing preview" className="relative z-0 w-full object-cover" />
                    </div>
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
                className={`bg-white rounded-2xl border-2 ${plan.color} shadow-sm overflow-hidden flex flex-col relative ${plan.badge ? 'shadow-lg shadow-[#1BA37B]/10' : ''}`}
              >
                {plan.badge && (
                  <div className="bg-[#1BA37B] text-white text-xs font-black text-center py-1.5 tracking-wider uppercase">{plan.badge}</div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                    {plan.period && <span className="text-slate-400 text-sm ml-2">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[#1BA37B] shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                    {plan.missing.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400 line-through">
                        <CheckCircle2 className="h-4 w-4 text-slate-200 shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${APP_URL}/signup`}
                    className={`w-full h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                      plan.badge
                        ? 'bg-[#1BA37B] hover:bg-[#158a66] text-white'
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
      <section className="py-20 bg-[#090d12] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Questions</p>
            <h2 className="text-4xl font-black">Frequently asked questions</h2>
          </div>
          <div className="border-y border-white/15">
            {[
              { q: 'Which plan should I choose?', a: 'Basic is best for smaller teams, Standard is best for growing businesses, and Premium is best when you need unlimited companies and users.' },
              { q: 'Does Rigel support VAT for South African businesses?', a: 'Yes. Rigel includes VAT tracking, VAT periods and VAT reports designed for South African business workflows.' },
              { q: 'Can I manage sales, purchases and inventory in one plan?', a: 'Yes. Standard and Premium are built for connected invoicing, purchase management, inventory, VAT and financial reporting.' },
              { q: 'Is payroll included in Rigel Business?', a: 'Payroll features are part of the broader business management workspace and are designed to connect employee totals to your reporting.' },
              { q: 'Can I use Rigel on desktop and mobile?', a: 'Yes. You can use Rigel in the browser, install it as a PWA, or download the desktop app where available.' },
              { q: 'Can I upgrade or downgrade later?', a: 'Yes. You can start small and move to a larger plan when your company needs more features, users or companies.' },
            ].map((item, index) => (
              <div key={item.q} className="group border-b border-white/15 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={openFaq === index}
                >
                  <h4 className="text-base font-semibold text-slate-100">{item.q}</h4>
                  <span className="text-2xl font-light text-white transition-colors group-hover:text-[#1BA37B]">
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
