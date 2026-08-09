import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileText,
  Users, Star, Building2,
  TrendingUp, Receipt, LockKeyhole,
  FileSpreadsheet, CalendarClock, ShoppingCart,
  Truck, CreditCard, BarChart3,
  Wallet, Landmark, Package,
  ShieldCheck, Clock, ChevronDown,
  PieChart
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const testimonials = [
  { name: 'Sipho M.', role: 'Owner, Mthaba Trading', text: 'Rigel replaced my spreadsheets completely. My VAT returns now take 10 minutes instead of 2 hours.', metric: '90% faster VAT filing' },
  { name: 'Naledi K.', role: 'Accountant, KZN Bookkeeping', text: 'The multi-company feature is a game changer. I manage 14 clients from one dashboard without switching logins.', metric: '14 clients in one dashboard' },
  { name: 'Thabo R.', role: 'Retailer, Rigel Hardware', text: 'The desktop app works perfectly even with slow internet. Stock control and invoicing never stops.', metric: 'Zero downtime since 2024' },
];

const purchaseScreenshots = [
  { src: '/creditors%20control%20advisor.png', title: 'Creditors control advisor' },
  { src: '/creditors%20control%202.png', title: 'Creditors control summary' },
  { src: '/creditors%20control.png', title: 'Creditors control' },
  { src: '/process%20debit%20note%20.png', title: 'Process debit note' },
  { src: '/purchase%20form%20.png', title: 'Purchase form' },
  { src: '/purchase%20layout.png', title: 'Purchase layout' },
  { src: '/payable%20accounts%20.png', title: 'Payable accounts' },
];

const salesScreenshots = [
  { src: '/list%20of%20customers%20.png', title: 'List of customers' },
  { src: '/magic%20link%20for%20qoutes%20.png', title: 'Quote magic link' },
  { src: '/accepting%20qoutes.png', title: 'Accepting quotes' },
  { src: '/sales%20order%20.png', title: 'Sales order' },
  { src: '/magic%20link%20for%20sales%20order%20.png', title: 'Sales order magic link' },
  { src: '/accepting%20sales%20order%20.png', title: 'Accepting sales order' },
  { src: '/tax%20invoice%20.png', title: 'Tax invoice' },
  { src: '/tax%20invoice%20temeplete.png', title: 'Tax invoice template' },
  { src: '/processing%20credit%20note%20.png', title: 'Processing credit note' },
  { src: '/debtors%20control%20.png', title: 'Debtors control' },
  { src: '/aging%20for%20debtors%20.png', title: 'Aging for debtors' },
  { src: '/customer%20statement%20.png', title: 'Customer statement' },
  { src: '/account%20reciable%20dash%20board%20.png', title: 'Accounts receivable dashboard' },
];

const SLIDESHOW_INTERVAL_MS = 10000;

const purchaseFeatures = [
  {
    icon: ShoppingCart,
    title: 'Control purchase orders',
    desc: 'Draft supplier orders, track approval status and keep procurement linked to invoices and receipts.',
  },
  {
    icon: Truck,
    title: 'Match receipts properly',
    desc: 'Confirm goods received before finalising supplier invoices so stock, costs and payables stay accurate.',
  },
  {
    icon: CreditCard,
    title: 'Understand supplier debt',
    desc: 'See outstanding bills, vendor balances and payment exposure before cash leaves the business.',
  },
];

const customerFeatures = [
  {
    icon: Users,
    title: 'Manage customer profiles',
    desc: 'Keep contact details, payment terms, credit limits and customer balances connected to every sales document.',
  },
  {
    icon: FileText,
    title: 'Create sales documents',
    desc: 'Move from quote to sales order to tax invoice with clean tracking for status, delivery and outstanding amounts.',
  },
  {
    icon: CreditCard,
    title: 'Allocate customer receipts',
    desc: 'Record payments and allocate them against open invoices or opening balances so accounts receivable stays accurate.',
  },
];

export function Home() {
  const [activePurchaseScreenshot, setActivePurchaseScreenshot] = useState(0);
  const [activeSalesScreenshot, setActiveSalesScreenshot] = useState(0);
  const [procurementTab, setProcurementTab] = useState<'purchase' | 'sales'>('purchase');

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePurchaseScreenshot(current => (current + 1) % purchaseScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSalesScreenshot(current => (current + 1) % salesScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [solutionsPaused, setSolutionsPaused] = useState(false);

  useEffect(() => {
    if (solutionsPaused) return;
    const interval = window.setInterval(() => {
      const el = sliderRef.current;
      if (!el) return;
      const cardWidth = el.firstElementChild?.clientWidth ?? 300;
      const gap = 24;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [solutionsPaused]);

  return (
    <div className="bg-white">
      {/* Hero — editorial fintech with gradient mesh */}
      <section className="relative overflow-hidden mesh-bg text-white">
        {/* Background image overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/Gemini_Generated_Image_xefbhfxefbhfxefb.png" alt="" className="w-full h-full object-cover" />
          {/* Left-side dark scrim for text legibility — keeps image original colors on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/45 to-transparent" />
          {/* Bottom fade for smooth transition */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1220]/60 to-transparent" />
        </div>
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="mesh-drift absolute top-[10%] left-[5%] h-[400px] w-[400px] bg-[#0F9D6C]/15 blur-[100px] rounded-full" />
          <div className="mesh-drift absolute bottom-[5%] right-[10%] h-[350px] w-[350px] bg-[#1BA37B]/10 blur-[90px] rounded-full" style={{ animationDelay: '5s' }} />
          <div className="mesh-drift absolute top-[40%] left-[50%] h-[300px] w-[300px] bg-[#0F9D6C]/8 blur-[80px] rounded-full" style={{ animationDelay: '10s' }} />
          {/* Rotating rings */}
          <div className="ring-rotate absolute top-[15%] left-[8%] h-40 w-40 border border-emerald-500/15 rounded-full" />
          <div className="ring-rotate-reverse absolute top-[60%] left-[5%] h-24 w-24 border border-emerald-500/10 rounded-full" />
          <div className="ring-rotate absolute top-[20%] right-[12%] h-56 w-56 border border-slate-500/10 rounded-full" />
          <div className="ring-rotate-reverse absolute bottom-[15%] right-[8%] h-32 w-32 border border-emerald-500/15 rounded-full" />
          {/* Bouncing dots */}
          <div className="dot-bounce absolute top-[50%] left-[12%] h-1.5 w-1.5 bg-emerald-400/50 rounded-full" />
          <div className="dot-bounce absolute top-[30%] right-[18%] h-1.5 w-1.5 bg-slate-300/30 rounded-full" style={{ animationDelay: '1.5s' }} />
          <div className="dot-bounce absolute bottom-[35%] right-[40%] h-1.5 w-1.5 bg-emerald-400/40 rounded-full" style={{ animationDelay: '2.5s' }} />
          {/* Pulsing lines */}
          <div className="line-pulse absolute top-[10%] left-[35%] h-32 w-px bg-emerald-500/20" />
          <div className="line-pulse absolute top-[50%] left-[55%] h-24 w-px bg-slate-400/15" style={{ animationDelay: '1s' }} />
          <div className="line-pulse absolute top-[15%] right-[30%] h-40 w-px bg-emerald-500/15" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left column — text */}
            <div className="reveal reveal-visible">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-6">
                Accounting &amp; ERP Software · South Africa
              </p>
              <h1
                className="text-[2.5rem] sm:text-5xl lg:text-[4rem] font-bold leading-[1.02] tracking-[-0.02em] mb-6"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Run your entire business on one connected platform
              </h1>
              <p className="text-lg text-slate-300 max-w-xl mb-10 leading-8">
                From first invoice to annual financial statements — Rigel Business brings accounting, VAT, payroll, inventory and reporting together so your team works faster and makes better decisions.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <a
                  href={`${APP_URL}/signup`}
                  className="btn-pill h-12 px-8 bg-[#0F9D6C] hover:bg-[#0B7A52] text-white font-semibold text-sm flex items-center gap-2"
                >
                  Start free trial <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/book-demo"
                  className="btn-pill h-12 px-8 border border-white/25 hover:border-white/60 hover:bg-white/5 text-white font-semibold text-sm flex items-center gap-2"
                >
                  Book a demo
                </Link>
              </div>
              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />)}
                  </div>
                  <span className="text-sm text-slate-400">Rated by SA businesses</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> SARS-compliant VAT201
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="h-4 w-4 text-emerald-400" /> Cancel anytime
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions grid — staggered cards with gradient icons */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Solutions</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Everything your business needs, in one system
            </h2>
            <p className="text-slate-600 text-lg leading-8">
              From day-to-day transactions to year-end financial statements, Rigel connects every part of your operation.
            </p>
          </div>

          {/* Auto-sliding square cards */}
          <div
            className="relative group/slider"
            onMouseEnter={() => setSolutionsPaused(true)}
            onMouseLeave={() => setSolutionsPaused(false)}
          >
            <div
              ref={sliderRef}
              id="solutions-slider"
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {[
                { icon: BarChart3, title: 'Accounting & Reporting', desc: 'Trial balance, general ledger and full AFS.', accent: '#0F9D6C', tag: 'AFS-ready', image: '/MOQWE.jpg', link: '/reporting' },
                { icon: Landmark, title: 'VAT Management', desc: 'VAT periods, returns and SARS-ready reports.', accent: '#2563EB', tag: 'SARS', image: '/Gemini_Generated_Image_f1imttf1imttf1im.png', link: '/tax' },
                { icon: PieChart, title: 'Investments', desc: 'Fixed deposits, shares and month-end processing.', accent: '#1BA37B', tag: 'FD & Shares', image: '/Gemini_Generated_Image_h5kk1uh5kk1uh5kk.png', link: '/investments' },
                { icon: Landmark, title: 'Banking', desc: 'Bank accounts, reconciliation and cash flow.', accent: '#2563EB', tag: 'Auto-match', image: '/tRPrb.jpg', link: '/banking' },
                { icon: Wallet, title: 'Sales & Invoicing', desc: 'Quotes, orders, invoices and magic links.', accent: '#0F9D6C', tag: 'Magic links', image: '/3QRJb.jpg', link: '/sales' },
                { icon: ShoppingCart, title: 'Purchase & Payables', desc: 'POs, supplier invoices and receipts.', accent: '#2563EB', tag: 'PO tracking', image: '/Gemini_Generated_Image_cq6dxlcq6dxlcq6d.png', link: '/purchase' },
                { icon: Package, title: 'Inventory & Stock', desc: 'Multi-warehouse stock and reorder alerts.', accent: '#0F9D6C', tag: 'Multi-warehouse', image: '/PL2ri.jpg', link: '/inventory' },
                { icon: Users, title: 'Payroll & HR', desc: 'Compliant payroll, payslips and SARS.', accent: '#2563EB', tag: 'Payslips', image: '/vp9tD.jpg', link: '/payroll' },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="snap-start shrink-0 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl relative overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 group/card"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
                  <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-slate-700 bg-white/95 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                    {item.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <item.icon className="h-4 w-4" style={{ color: item.accent === '#2563EB' ? '#93C5FD' : '#6EE7B7' }} />
                      </div>
                      <h3 className="text-sm font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                    </div>
                    <p className="text-xs text-slate-200/80 leading-5 mb-3 line-clamp-2">{item.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: item.accent === '#2563EB' ? '#93C5FD' : '#6EE7B7' }}>
                      Read more <ArrowRight className="h-3 w-3 group-hover/card:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent hidden sm:block" />

            {/* Arrow buttons */}
            <button
              type="button"
              onClick={() => sliderRef.current?.scrollBy({ left: -336, behavior: 'smooth' })}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors hidden sm:flex"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.scrollBy({ left: 336, behavior: 'smooth' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors hidden sm:flex"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — dashed path with glowing circles */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">How it works</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Get started in minutes, not weeks
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Dashed connecting path */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-emerald-200" />
            {[
              { step: '01', icon: Users, title: 'Create your account', desc: 'Sign up free and add your company details in under 5 minutes.' },
              { step: '02', icon: Receipt, title: 'Capture transactions', desc: 'Record invoices, bills, payments and receipts as they happen.' },
              { step: '03', icon: BarChart3, title: 'Run reports', desc: 'Generate trial balance, AFS and VAT201 with one click.' },
              { step: '04', icon: ShieldCheck, title: 'Stay compliant', desc: 'Close VAT periods, submit SARS returns and keep audit trails.' },
            ].map(item => (
              <div key={item.step} className="text-center relative">
                <div className="relative inline-flex mb-6">
                  <div className="h-[72px] w-[72px] rounded-full bg-white text-emerald-600 flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 4px rgba(15, 157, 108, 0.1), 0 0 24px rgba(15, 157, 108, 0.15)' }}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 h-7 w-7 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center z-20" style={{ boxShadow: '0 4px 12px rgba(15, 157, 108, 0.3)' }}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-slate-500 leading-6 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rigel vs the alternatives */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/home-bg.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1220]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-transparent to-[#0B1220]/80" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ring-rotate absolute top-[15%] right-[10%] h-32 w-32 border border-emerald-500/15 rounded-full" />
          <div className="ring-rotate-reverse absolute bottom-[20%] left-[8%] h-24 w-24 border border-slate-500/10 rounded-full" />
          <div className="dot-bounce absolute top-[25%] left-[15%] h-1.5 w-1.5 bg-emerald-400/40 rounded-full" />
          <div className="dot-bounce absolute bottom-[30%] right-[20%] h-1.5 w-1.5 bg-slate-300/20 rounded-full" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-400 mb-3 tracking-wide">Why switch</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Rigel vs spreadsheets and stitched-together apps
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-8">
              Most businesses juggle spreadsheets, a separate accounting app, a payroll tool, a bank feed and an inventory tracker. Rigel replaces all of them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Spreadsheets</h3>
              </div>
              <ul className="space-y-4">
                {['Manual data entry and formulas', 'No audit trail or version control', 'VAT calculated by hand', 'Reports take hours to build', 'One person at a time', 'No backup or sync'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-slate-600 text-xs">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Separate systems</h3>
              </div>
              <ul className="space-y-4">
                {['Accounting, payroll and stock apps never talk', 'Double-captured data across tools', 'Monthly reconciliations between systems', 'Extra subscriptions for every module', 'Limited SA tax and VAT support', 'Fragmented reporting'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-slate-600 text-xs">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 relative" style={{ boxShadow: '0 0 0 1px rgba(15, 157, 108, 0.3), 0 0 40px rgba(15, 157, 108, 0.15)' }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F9D6C] rounded-t-2xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-[#0F9D6C] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Rigel Business</h3>
              </div>
              <ul className="space-y-4">
                {['One platform for every department', 'Automatic double-entry bookkeeping', 'Full audit trail on every transaction', 'VAT201, EMP201 and AFS in one click', 'SARS-compliant payroll built in', 'Cloud sync + offline desktop app'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All-in-one banner */}
          <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-slate-800/50 p-8 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#0F9D6C]/20 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Why run four tools when one does it all?</h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-6 leading-7">
              Rigel combines accounting, VAT, banking, sales, purchases, inventory, investments, payroll and full IFRS reporting in a single connected system. No integrations. No exports. No double capture.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: BarChart3, label: 'Accounting & Reporting' },
                { icon: Landmark, label: 'VAT' },
                { icon: Landmark, label: 'Banking' },
                { icon: Wallet, label: 'Sales' },
                { icon: ShoppingCart, label: 'Purchases' },
                { icon: Package, label: 'Inventory' },
                { icon: PieChart, label: 'Investments' },
                { icon: Users, label: 'Payroll' },
              ].map(m => (
                <div key={m.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-emerald-500/20 text-xs text-slate-200">
                  <m.icon className="h-3.5 w-3.5 text-emerald-400" />
                  {m.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buy & Sell — combined advanced section with tabbed viewer */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/4 h-72 w-72 bg-blue-100/30 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 h-72 w-72 bg-emerald-100/40 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Procurement & Sales</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              From supplier invoice to customer payment — one connected flow
            </h2>
            <p className="text-slate-600 text-lg leading-8 max-w-2xl mx-auto">
              Rigel links every purchase order, supplier bill, customer quote, sales invoice and payment receipt so your buying and selling stay in sync with your accounts.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex gap-1 p-1 bg-slate-100 rounded-full">
              <button
                type="button"
                onClick={() => setProcurementTab('purchase')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${procurementTab === 'purchase' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Purchase & Payables
              </button>
              <button
                type="button"
                onClick={() => setProcurementTab('sales')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${procurementTab === 'sales' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sales & Invoicing
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Screenshot viewer */}
            <div className="relative">
              <div className={`absolute -inset-6 blur-2xl rounded-3xl pointer-events-none transition-all duration-500 ${procurementTab === 'purchase' ? 'bg-gradient-to-bl from-blue-100/40 to-transparent' : 'bg-gradient-to-br from-emerald-100/50 to-transparent'}`} />
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-slate-50 overflow-hidden">
                  <img
                    src={procurementTab === 'purchase'
                      ? purchaseScreenshots[activePurchaseScreenshot].src
                      : salesScreenshots[activeSalesScreenshot].src}
                    alt={procurementTab === 'purchase'
                      ? purchaseScreenshots[activePurchaseScreenshot].title
                      : salesScreenshots[activeSalesScreenshot].title}
                    className="w-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="h-1 bg-slate-100">
                  <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${((procurementTab === 'purchase' ? activePurchaseScreenshot + 1 : activeSalesScreenshot + 1) / (procurementTab === 'purchase' ? purchaseScreenshots.length : salesScreenshots.length)) * 100}%` }} />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {procurementTab === 'purchase'
                      ? purchaseScreenshots[activePurchaseScreenshot].title
                      : salesScreenshots[activeSalesScreenshot].title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(procurementTab === 'purchase' ? purchaseScreenshots : salesScreenshots).map((screenshot, index) => (
                      <button
                        key={screenshot.title}
                        type="button"
                        aria-label={`Show ${screenshot.title}`}
                        onClick={() => procurementTab === 'purchase' ? setActivePurchaseScreenshot(index) : setActiveSalesScreenshot(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          (procurementTab === 'purchase' ? activePurchaseScreenshot : activeSalesScreenshot) === index ? 'w-5 bg-emerald-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature content */}
            <div>
              {procurementTab === 'purchase' ? (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                    <ShoppingCart className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">Purchase management</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Know what you ordered, received and still owe
                  </h3>
                  <p className="text-slate-600 text-base leading-7 mb-6">
                    Rigel connects suppliers, purchase orders, supplier invoices and accounts payable so your buying process stays organised from request to payment.
                  </p>
                  <div className="space-y-4">
                    {purchaseFeatures.map((item) => (
                      <div key={item.title} className="feature-item flex gap-4 group">
                        <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h4>
                          <p className="text-sm leading-6 text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
                    <Wallet className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Customer management</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    Turn quotes into paid invoices without losing the trail
                  </h3>
                  <p className="text-slate-600 text-base leading-7 mb-6">
                    Rigel keeps customers, quotes, sales orders, invoices, delivery status and receipts in one connected revenue workspace.
                  </p>
                  <div className="space-y-4">
                    {customerFeatures.map((item) => (
                      <div key={item.title} className="feature-item flex gap-4 group">
                        <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h4>
                          <p className="text-sm leading-6 text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill mt-8 inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
              >
                Try it free <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — avatars, pill tags, featured card */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Customer stories</p>
              <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                See what high-performance finance looks like
              </h2>
              <p className="text-slate-600 text-lg leading-8 mb-6">
                Real businesses across South Africa use Rigel to run accounting, VAT, payroll and inventory from one dashboard.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />)}
                </div>
                <span className="text-sm text-slate-600 font-medium">Rated by SA businesses</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.name} className={`card-lift bg-slate-50 rounded-2xl border border-slate-200 p-7 ${i === 0 ? 'lg:-rotate-1 lg:shadow-lg' : ''}`}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-7 mb-5">“{t.text}”</p>
                  <div className="pt-4 border-t border-slate-200">
                    <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1 mb-3 uppercase tracking-wide">{t.metric}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges — tinted bg, gradient circles */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Audit trail', desc: 'Every transaction records who, what and when. Full traceability for auditors and SARS reviews.' },
              { icon: Users, title: 'Multi-company', desc: 'Switch between entities without logging out. Manage holding companies and subsidiaries in one place.' },
              { icon: CalendarClock, title: 'Fiscal periods', desc: 'Lock closed periods to prevent changes. Keep current and historical data clean and accurate.' },
              { icon: FileText, title: 'Document templates', desc: 'Customise invoices, quotes and statements with your logo, colours and banking details.' },
            ].map(item => (
              <div key={item.title} className="card-lift bg-white rounded-2xl p-8 group">
                <div className="h-14 w-14 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-slate-600 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — chevron accordion */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">FAQ</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Questions, answered
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Is Rigel SARS-compliant?', a: 'Yes. Rigel generates VAT201 reports aligned to SARS requirements, tracks fiscal periods and supports ZAR currency by default.' },
              { q: 'Can I manage multiple companies?', a: 'Yes. Rigel supports multiple companies from a single dashboard. Switch between entities without logging out.' },
              { q: 'Do I need an internet connection?', a: 'The desktop app works offline. Your data syncs automatically when you reconnect to the internet.' },
              { q: 'Is there a free trial?', a: 'Yes. Start free with no credit card required. Cancel anytime with no setup or hidden fees.' },
              { q: 'Can my accountant access my books?', a: 'Yes. Invite your accountant with view or edit access. They can manage multiple clients from one login.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-200 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="text-base font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{faq.q}</span>
                  <ChevronDown className="faq-chevron h-5 w-5 text-emerald-600 shrink-0 ml-4" />
                </summary>
                <div className="faq-answer px-5 text-sm text-slate-600 leading-7">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — gradient mesh bookend */}
      <section className="mesh-bg py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#0F9D6C] to-transparent" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="mesh-drift absolute top-[20%] left-[8%] h-[300px] w-[300px] bg-[#0F9D6C]/10 blur-[80px] rounded-full" />
          <div className="mesh-drift absolute bottom-[25%] right-[12%] h-[250px] w-[250px] bg-[#1BA37B]/8 blur-[70px] rounded-full" style={{ animationDelay: '5s' }} />
          <div className="ring-rotate absolute top-[20%] left-[8%] h-32 w-32 border border-emerald-500/15 rounded-full" />
          <div className="ring-rotate-reverse absolute bottom-[25%] right-[12%] h-24 w-24 border border-slate-500/10 rounded-full" />
          <div className="dot-bounce absolute top-[40%] left-[15%] h-1.5 w-1.5 bg-emerald-400/40 rounded-full" />
          <div className="dot-bounce absolute top-[60%] right-[20%] h-1.5 w-1.5 bg-slate-300/20 rounded-full" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-[2.5rem] font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Ready to take control of your business flow?
              </h2>
              <p className="text-slate-400 text-lg leading-8 mb-10">
                Try Rigel Business free and manage your invoices, VAT, inventory and reports from one connected dashboard. No credit card required.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`${APP_URL}/signup`}
                  className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
                >
                  Start free trial <ArrowRight className="h-4 w-4 ml-2" />
                </a>
                <Link
                  to="/book-demo"
                  className="btn-pill inline-flex h-12 items-center border border-white/25 hover:border-white/60 hover:bg-white/5 px-8 font-semibold text-white"
                >
                  Book a demo
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="glass-chip rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  <span className="text-white font-semibold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Why businesses choose Rigel</span>
                </div>
                <div className="space-y-4">
                  {['No setup fees or hidden costs', 'Works on desktop, web and mobile', 'SARS-compliant VAT201 filing', 'Multi-company from one dashboard'].map(benefit => (
                    <div key={benefit} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
