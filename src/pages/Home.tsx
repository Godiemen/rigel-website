import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileText,
  Users, Star, Building2,
  TrendingUp, Receipt, Smartphone, WalletCards, LockKeyhole,
  FileSpreadsheet, CalendarClock, ShoppingCart,
  Truck, CreditCard
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa.vercel.app';

const testimonials = [
  { name: 'Sipho M.', role: 'Small Business Owner', text: 'Rigel Business replaced my spreadsheets completely. My VAT returns now take 10 minutes instead of 2 hours.' },
  { name: 'Naledi K.', role: 'Accountant', text: 'The multi-company feature is a game changer. I manage all my clients from one dashboard.' },
  { name: 'Thabo R.', role: 'Retailer', text: 'The desktop app works perfectly even with slow internet. Perfect for my shop.' },
];

const vatFeatures = [
  {
    icon: CalendarClock,
    title: 'Track every VAT period',
    desc: 'See active, previous and archived VAT periods with submission dates, due dates and balances in one place.',
  },
  {
    icon: LockKeyhole,
    title: 'Close periods with confidence',
    desc: 'Review included transactions before locking a VAT return so late entries do not change your submitted numbers.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Generate VAT reports',
    desc: 'View output VAT, input VAT, refundable amounts and payable totals with clean reports your accountant can understand.',
  },
];

const vatScreenshots = [
  { src: '/vat%20layout.png', title: 'VAT layout' },
  { src: '/view%20transaction%20report.png', title: 'Transaction report' },
  { src: '/vat%20graph%20report%20.png', title: 'VAT graph report' },
  { src: '/close%20vat%20period%20.png', title: 'Close VAT period' },
];

const afsScreenshots = [
  { src: '/trial%20balance%20.png', title: 'Trial balance' },
  { src: '/general%20ledger%20.png', title: 'General ledger' },
  { src: '/balance%20sheet%201.png', title: 'Balance sheet' },
  { src: '/balance%20sheet%202.png', title: 'Balance sheet details' },
  { src: '/income%20statement.png', title: 'Income statement' },
  { src: '/changes%20in%20equity.png', title: 'Changes in equity' },
  { src: '/note%20to%20afs%20.png', title: 'Notes to AFS' },
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

const payrollScreenshots = [
  { src: '/rip%205%20for%20sars%20.png', title: 'RIP 5 for SARS' },
  { src: '/payroll%20graphs.png', title: 'Payroll graphs' },
  { src: '/payslip%20templete%20.png', title: 'Payslip template' },
  { src: '/payroll%20history%20.png', title: 'Payroll history' },
  { src: '/run%20payroll.png', title: 'Run payroll' },
];

const inventoryScreenshots = [
  { src: '/inventory%20stock%20.png', title: 'Inventory stock' },
  { src: '/services%20.png', title: 'Services' },
  { src: '/stock%20control%20graph.png', title: 'Stock control graph' },
  { src: '/services%20tracking.png', title: 'Services tracking' },
  { src: '/inventory%20turn%20over%20.png', title: 'Inventory turnover' },
  { src: '/supplier%20list.png', title: 'Supplier list' },
  { src: '/sales%20by%20supplier%20.png', title: 'Sales by supplier' },
  { src: '/purchase%20by%20item.png', title: 'Purchase by item' },
];

const assetScreenshots = [
  { src: '/impairment%20calculator.png', title: 'Impairment calculator' },
  { src: '/add%20assets%20form%20.png', title: 'Add assets form' },
  { src: '/depreciation%20policies%20.png', title: 'Depreciation policies' },
  { src: '/assets%20report%20graphs%20.png', title: 'Assets report graphs' },
  { src: '/assets%20register%20.png', title: 'Assets register' },
  { src: '/overviw%20.png', title: 'Overview' },
  { src: '/depreciation%20schedule%204.png', title: 'Depreciation schedule' },
  { src: '/deprciation%20schedule.png', title: 'Depreciation schedule details' },
  { src: '/assets%20manangement.png', title: 'Assets management' },
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
  const [activeVatScreenshot, setActiveVatScreenshot] = useState(0);
  const [activeAfsScreenshot, setActiveAfsScreenshot] = useState(0);
  const [activePurchaseScreenshot, setActivePurchaseScreenshot] = useState(0);
  const [activeSalesScreenshot, setActiveSalesScreenshot] = useState(0);
  const [activePayrollScreenshot, setActivePayrollScreenshot] = useState(0);
  const [activeInventoryScreenshot, setActiveInventoryScreenshot] = useState(0);
  const [activeAssetScreenshot, setActiveAssetScreenshot] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveVatScreenshot(current => (current + 1) % vatScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAfsScreenshot(current => (current + 1) % afsScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePayrollScreenshot(current => (current + 1) % payrollScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveInventoryScreenshot(current => (current + 1) % inventoryScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAssetScreenshot(current => (current + 1) % assetScreenshots.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#04100d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,223,95,0.24),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(20,184,166,0.26),transparent_30%),radial-gradient(circle_at_58%_92%,rgba(59,130,246,0.12),transparent_34%)] pointer-events-none" />
        <div className="hero-grid absolute inset-0 opacity-[0.18] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div className="hero-drift absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="hero-orb absolute right-[8%] top-14 h-44 w-44 rounded-full bg-[#00df5f]/20 blur-2xl pointer-events-none" />
        <div className="hero-orb-slow absolute bottom-10 left-[42%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
        <div className="hero-shimmer absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 34px)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
                Keep your business moving in one smart flow.
              </h1>
              <p className="text-lg text-slate-200 max-w-xl mb-9 leading-8">
                Rigel Business brings sales, stock, VAT, cash flow and reporting together so you can work faster and make better decisions.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
              <a
                href={`${APP_URL}/signup`}
                className="h-12 px-7 rounded-full bg-[#00df5f] hover:bg-[#16c957] text-slate-950 font-black text-sm flex items-center gap-2 transition-colors shadow-xl shadow-emerald-500/20"
              >
                Start your free account <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/pricing"
                className="h-12 px-2 text-white font-bold text-sm flex items-center gap-2 underline underline-offset-4 decoration-white/60 hover:decoration-white transition-colors"
              >
                Explore pricing
              </Link>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-slate-300">
                {['No credit card required', 'SARS-ready VAT', 'Cloud + desktop access'].map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#00df5f]" /> {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[470px] lg:min-h-[540px]">
              <div className="hero-soft-pulse absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[#00df5f] opacity-95 shadow-[0_0_90px_rgba(0,223,95,0.28)]" />
              <div className="hero-device-float absolute left-0 right-6 top-4">
                <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-black/40 ring-1 ring-white/70">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white">
                    <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-3 text-xs font-bold text-slate-500">Rigel Business Desktop</span>
                    </div>
                    <div className="relative bg-white">
                      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none" />
                      <img src="/desktop%20app.png" alt="Rigel Business desktop app screenshot" className="relative z-0 w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-device-float absolute right-0 bottom-0 w-44 sm:w-52 rounded-[2.8rem] bg-white p-2.5 shadow-2xl shadow-black/60 ring-1 ring-white/70 [animation-delay:-3s]">
                <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-1.5">
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-white" />
                  <div className="absolute inset-x-8 top-3 z-20 h-1 rounded-full bg-slate-200" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/18 via-transparent to-transparent pointer-events-none" />
                  <img src="/mobile%20app.png" alt="Rigel Business mobile PWA screenshot" className="relative z-0 w-full rounded-[1.85rem] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rigel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Why South African businesses choose Rigel</h2>
              <div className="space-y-5">
                {[
                  { icon: Building2, title: 'Built for SA', desc: 'VAT201, fiscal periods aligned to SARS requirements, ZAR currency by default.' },
                  { icon: TrendingUp, title: 'Clear dashboard', desc: 'See revenue, expenses, profit, cash balance and overdue invoices without digging.' },
                  { icon: Receipt, title: 'Documents done properly', desc: 'Create quotes, invoices, credit notes and statements that look professional.' },
                  { icon: Smartphone, title: 'Works on every screen', desc: 'Use the web app, install it on mobile, or download the desktop version.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#1BA37B]/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-[#1BA37B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1BA37B] to-teal-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6">Start in minutes</h3>
              {['Create your free account', 'Add your company details', 'Create your first invoice', 'Track VAT, cash and reports'].map((step, i) => (
                <div key={step} className="flex items-center gap-4 mb-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
              <a href={`${APP_URL}/signup`} className="mt-6 w-full h-12 rounded-xl bg-white text-[#1BA37B] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute right-[8%] top-12 h-[32rem] w-[32rem] rounded-full bg-[#00df5f] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(27,163,123,0.25),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.14),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#70e1bf] mb-4">Financial reporting</p>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6">Generate full AFS, trial balance and general ledger reports.</h2>
              <p className="text-slate-300 text-lg leading-8 mb-8">
                Rigel turns your captured transactions into structured accounting reports, so you can review balances, trace ledger movement and prepare financial statements faster.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {['Annual Financial Statements', 'Trial Balance', 'General Ledger'].map(item => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-[#00df5f]" />
                    <p className="text-sm font-black leading-5">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-10 h-[26rem] w-[26rem] rounded-full bg-[#00df5f] opacity-90" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 text-slate-900 shadow-2xl shadow-black/50 ring-1 ring-white/30">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#1BA37B] shadow-lg shadow-slate-900/10 backdrop-blur">
                    {afsScreenshots[activeAfsScreenshot].title}
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                  <img
                    src={afsScreenshots[activeAfsScreenshot].src}
                    alt={afsScreenshots[activeAfsScreenshot].title}
                    className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {afsScreenshots.map((screenshot, index) => (
                    <button
                      key={screenshot.title}
                      type="button"
                      aria-label={`Show ${screenshot.title}`}
                      onClick={() => setActiveAfsScreenshot(index)}
                      className={`h-3 rounded-full transition-all ${
                        activeAfsScreenshot === index ? 'w-9 bg-[#1BA37B]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">VAT management</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5">Create VAT returns without the spreadsheet stress</h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-8">
              Rigel helps you prepare, review and close VAT periods with the transactions, totals and reports already connected to your business records.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <div className="space-y-4">
              {vatFeatures.map((item, index) => (
                <div key={item.title} className={`rounded-3xl border p-6 transition-colors ${index === 0 ? 'bg-white border-[#1BA37B]/30 shadow-xl shadow-emerald-100/70' : 'bg-white/70 border-slate-100'}`}>
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-12 h-[26rem] w-[26rem] rounded-full bg-[#00df5f] opacity-90" />
              <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#1BA37B]/20 via-cyan-400/10 to-blue-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#1BA37B] shadow-lg shadow-slate-900/10 backdrop-blur">
                    {vatScreenshots[activeVatScreenshot].title}
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                  <img
                    src={vatScreenshots[activeVatScreenshot].src}
                    alt={vatScreenshots[activeVatScreenshot].title}
                    className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {vatScreenshots.map((screenshot, index) => (
                    <button
                      key={screenshot.title}
                      type="button"
                      aria-label={`Show ${screenshot.title}`}
                      onClick={() => setActiveVatScreenshot(index)}
                      className={`h-3 rounded-full transition-all ${
                        activeVatScreenshot === index ? 'w-9 bg-[#1BA37B]' : 'w-3 bg-white/25 hover:bg-white/40'
                      }`}
                    />
                  ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(27,163,123,0.08),transparent_28%),radial-gradient(circle_at_90%_40%,rgba(59,130,246,0.08),transparent_32%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-10 -top-12 h-[26rem] w-[26rem] rounded-full bg-[#00df5f] opacity-90" />
              <div className="absolute -inset-6 rounded-[3rem] bg-emerald-100/60 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#1BA37B] shadow-lg shadow-slate-900/10 backdrop-blur">
                    {purchaseScreenshots[activePurchaseScreenshot].title}
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                  <img
                    src={purchaseScreenshots[activePurchaseScreenshot].src}
                    alt={purchaseScreenshots[activePurchaseScreenshot].title}
                    className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {purchaseScreenshots.map((screenshot, index) => (
                    <button
                      key={screenshot.title}
                      type="button"
                      aria-label={`Show ${screenshot.title}`}
                      onClick={() => setActivePurchaseScreenshot(index)}
                      className={`h-3 rounded-full transition-all ${
                        activePurchaseScreenshot === index ? 'w-9 bg-[#1BA37B]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Purchase management</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5">Know what you ordered, received and still owe</h2>
              <p className="text-slate-500 text-lg leading-8 mb-8">
                Rigel connects suppliers, purchase orders, supplier invoices and accounts payable so your buying process stays organised from request to payment.
              </p>
              <div className="space-y-4">
                {purchaseFeatures.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(59,130,246,0.09),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(27,163,123,0.12),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Customer management</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5">Turn quotes into paid invoices without losing the trail</h2>
              <p className="text-slate-500 text-lg leading-8 mb-8">
                Rigel keeps customers, quotes, sales orders, invoices, delivery status and receipts in one connected revenue workspace.
              </p>
              <div className="space-y-4">
                {customerFeatures.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-12 h-[26rem] w-[26rem] rounded-full bg-[#00df5f] opacity-90" />
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-100 via-emerald-100 to-white blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#1BA37B] shadow-lg shadow-slate-900/10 backdrop-blur">
                    {salesScreenshots[activeSalesScreenshot].title}
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                  <img
                    src={salesScreenshots[activeSalesScreenshot].src}
                    alt={salesScreenshots[activeSalesScreenshot].title}
                    className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {salesScreenshots.map((screenshot, index) => (
                    <button
                      key={screenshot.title}
                      type="button"
                      aria-label={`Show ${screenshot.title}`}
                      onClick={() => setActiveSalesScreenshot(index)}
                      className={`h-3 rounded-full transition-all ${
                        activeSalesScreenshot === index ? 'w-9 bg-[#1BA37B]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(27,163,123,0.10),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.08),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">More business modules</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-5">Run payroll, stock and assets from the same workspace</h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-8">
              Rigel keeps operational records connected to your accounts, so payroll, inventory movement and asset values stay visible in your reports.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#00df5f] opacity-20" />
            <div className="relative grid lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#1BA37B] shadow-lg shadow-slate-900/10 backdrop-blur">
                  {payrollScreenshots[activePayrollScreenshot].title}
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                <img
                  src={payrollScreenshots[activePayrollScreenshot].src}
                  alt={payrollScreenshots[activePayrollScreenshot].title}
                  className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {payrollScreenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.title}
                    type="button"
                    aria-label={`Show ${screenshot.title}`}
                    onClick={() => setActivePayrollScreenshot(index)}
                    className={`h-3 rounded-full transition-all ${
                      activePayrollScreenshot === index ? 'w-9 bg-[#1BA37B]' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 shadow-lg shadow-slate-900/10 backdrop-blur">
                  {inventoryScreenshots[activeInventoryScreenshot].title}
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                <img
                  src={inventoryScreenshots[activeInventoryScreenshot].src}
                  alt={inventoryScreenshots[activeInventoryScreenshot].title}
                  className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {inventoryScreenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.title}
                    type="button"
                    aria-label={`Show ${screenshot.title}`}
                    onClick={() => setActiveInventoryScreenshot(index)}
                    className={`h-3 rounded-full transition-all ${
                      activeInventoryScreenshot === index ? 'w-9 bg-blue-600' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100">
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-purple-700 shadow-lg shadow-slate-900/10 backdrop-blur">
                  {assetScreenshots[activeAssetScreenshot].title}
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                <img
                  src={assetScreenshots[activeAssetScreenshot].src}
                  alt={assetScreenshots[activeAssetScreenshot].title}
                  className="relative z-0 w-full object-cover transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {assetScreenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.title}
                    type="button"
                    aria-label={`Show ${screenshot.title}`}
                    onClick={() => setActiveAssetScreenshot(index)}
                    className={`h-3 rounded-full transition-all ${
                      activeAssetScreenshot === index ? 'w-9 bg-purple-700' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Loved by businesses across SA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden py-24 text-white text-center bg-slate-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/7-differences-between-book-keeping-and-accounting-1.jpeg.webp')" }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/75 to-[#1BA37B]/35" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-[#1BA37B]/10 flex items-center justify-center">
            <WalletCards className="h-7 w-7 text-[#1BA37B]" />
          </div>
          <h2 className="text-5xl font-black mb-6">Ready to take control of your business flow?</h2>
          <p className="text-slate-400 text-lg mb-10">Try Rigel Business free and manage your invoices, VAT, inventory and reports from one beautiful dashboard.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`${APP_URL}/signup`} className="h-12 px-8 rounded-xl bg-[#1BA37B] hover:bg-[#158a66] text-white font-bold flex items-center gap-2 transition-colors">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/pricing" className="h-12 px-8 rounded-xl border border-slate-700 hover:border-slate-500 text-white font-bold flex items-center transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
