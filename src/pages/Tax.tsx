import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play,
  Landmark, FileText, Users, Calculator,
  ShieldCheck, AlertTriangle, ClipboardList,
  Zap, GraduationCap,
  Gift, Building2,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';



function CardSlider({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const childCount = Array.isArray(children) ? children.length : 1;

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      const index = Math.round((center - card.offsetWidth / 2) / (card.offsetWidth + 16));
      setCenterIndex(Math.max(0, Math.min(index, childCount - 1)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [childCount]);

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 flex items-center gap-3">
        <span className="text-sm font-mono text-slate-500">
          {String(centerIndex + 1).padStart(2, '0')} / {String(childCount).padStart(2, '0')}
        </span>
        <button
          onClick={() => scroll(-1)}
          className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div
        ref={ref}
        className={`flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ${className}`}
      >
        {Array.isArray(children) ? children.map((child, i) => (
          <div
            key={i}
            className={`transition-all duration-500 ease-out shrink-0 snap-center ${
              i === centerIndex ? 'scale-[1.12] z-10' : 'scale-90 opacity-60 hover:opacity-90'
            }`}
          >
            {child}
          </div>
        )) : children}
      </div>
    </div>
  );
}

type AccordionSection = {
  icon: typeof FileText;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const moduleSections: AccordionSection[] = [
  {
    icon: Landmark,
    name: 'VAT 201 Management',
    tagline: 'Period-based VAT returns — track output/input, close periods, file and pay SARS.',
    description:
      'Manage VAT periods with flexible filing frequencies (1, 2, 4, 6, or 12-month cycles). The current period card shows output VAT, input VAT, net position and payment status. Close periods by selecting transactions, link bank payments, and generate SARS-format VAT201 PDF/Excel reports. The VAT calculation engine handles output VAT (Box 4), input VAT (Box 15), standard-rated (Box 1), zero-rated (Box 2), exempt supplies (Box 3), and net VAT (Box 20).',
    features: [
      'Flexible filing: 1, 2, 4, 6, or 12-month cycles with auto period dates',
      'Output VAT (Box 4) from sales — handles inclusive and exclusive amounts',
      'Input VAT (Box 15) from purchases — debit notes adjust input',
      'Standard-rated (Box 1), zero-rated (Box 2), exempt (Box 3) tracking',
      'Close period links transactions and locks for editing',
      'VAT201 PDF and Excel generators with SARS box structure',
    ],
  },
  {
    icon: Calculator,
    name: 'Provisional Tax (IRP6)',
    tagline: 'SARS provisional tax engine — calculate, adjust, post and pay across two periods.',
    description:
      'SARS provisional tax system for companies with two payments per tax year. The calculation engine derives accounting profit from posted ledger entries, applies auto-identified add-backs (depreciation, non-deductible expenses, donations), deductions (capital allowances, assessed losses, Section 18A), and computes taxable income × CIT rate (27%). Includes wear & tear breakdown per asset, deferred tax calculation, assessed loss tracking, and under-estimation warnings.',
    features: [
      'Two periods per tax year — Period 1 (half year) and Period 2 (full year)',
      'Accounting profit from posted ledger entries (income − COGS − expenses)',
      'Auto add-backs: depreciation, non-deductible, penalties, non-S18A donations',
      'Wear & tear breakdown: cost, residual, life years, annual allowance, prorated',
      'Deferred tax asset/liability from temporary differences',
      'Status flow: DRAFT → CALCULATED → ADJUSTED → POSTED → PAID',
    ],
  },
  {
    icon: Building2,
    name: 'Corporate Tax (CIT)',
    tagline: 'Annual corporate income tax — accounting profit to taxable income with add-backs.',
    description:
      'Annual corporate income tax computation. Select tax year, auto-calculate accounting profit from posted entries, apply add-backs (depreciation, non-deductible), deductions (capital allowances, assessed loss), and compute tax payable at 27% CIT rate. Provisional tax paid offsets final liability. Manual adjustments with description, type and amount. Settings include CIT rate, fiscal year dates, account mappings, and year lock. Diagnostics via diagnose_tax_data and rebuild_ledger_entries RPCs.',
    features: [
      'Accounting profit auto-calculated from posted transaction entries',
      'Add-backs: depreciation, non-deductible expenses, manual adjustments',
      'Capital allowances per SARS asset class schedules',
      'Provisional tax paid offset against final tax liability',
      'Account mappings: Income Tax Expense, Current Tax Payable, Deferred Tax',
      'Diagnostics: detect unposted transactions, rebuild ledger entries',
    ],
  },
  {
    icon: Zap,
    name: 'Corporate Tax IIV',
    tagline: 'Instant Information View — simplified real-time tax computation from ledger data.',
    description:
      'Simplified real-time tax computation via calculate_simple_tax_computation RPC. Shows sales/gross income, total expenses, profit before tax, non-taxable incomes, double tax deductions, non-allowable expenses, capital allowances, capital charges, chargeable income, tax rate and tax payable. SARS-style formatting with space thousand separators and brackets for negatives. Data integrity alert warns when approved transactions are not in the general ledger.',
    features: [
      'Real-time computation from ledger data via RPC',
      'Sales, expenses, profit, non-taxable incomes, capital allowances',
      'SARS-style formatting: space separators, brackets for negatives',
      'Quick info panel: tax type (CIT), region (South Africa), currency (ZAR)',
      'Data integrity alert for unposted transactions',
      'Refresh analysis on demand with fiscal year awareness',
    ],
  },
  {
    icon: Users,
    name: 'Employee Tax (PAYE/UIF/SDL)',
    tagline: 'Aggregated employee tax with bulk SARS payment posting and duplicate prevention.',
    description:
      'Aggregated employee tax management — view all PAYE, UIF (employee + employer) and SDL withheld across pay runs for a selected period. Per-employee breakdown table with withholding and SARS payment status. Summary cards show totals. Bulk Pay SARS creates a single payment debiting PAYE, UIF and SDL payables and crediting Bank. Duplicate prevention via reference number checking. GL accounts auto-created if missing.',
    features: [
      'Per-employee breakdown: PAYE, UIF (emp + er), SDL, payment status',
      'Summary cards: total employees, PAYE, UIF, SDL',
      'Bulk Pay SARS: single transaction debiting all payables, crediting bank',
      'Duplicate prevention via reference number checking',
      'GL accounts auto-created: PAYE (2315), UIF, SDL (2220), Bank (1000)',
      'Responsive: desktop table and mobile card views',
    ],
  },
  {
    icon: Gift,
    name: 'Donation Tax',
    tagline: 'Section 54 donation tax (20%) and Section 18A deductions with IT144 generation.',
    description:
      'Manages Section 54 donation tax (20% on gratuitous asset transfers) and Section 18A tax-deductible donations. Tracks donations from fixed assets, inventory and cash. Section 56(2)(a) annual exemption of R10,000 per tax year pooled cumulatively. Taxable amount = market value − exemption. Donation tax = taxable × 20%. Dashboard with records table, summary metrics, pie and bar charts. IT144 form generation and PDF/Excel export.',
    features: [
      'Section 54: 20% donation tax on gratuitous transfers to non-S18A donees',
      'Section 56(2)(a): R10,000 annual exemption pooled cumulatively',
      'Section 18A: tax-deductible donations — no donation tax payable',
      'Sources: fixed assets, inventory (movement_type = DONATION), cash',
      'IT144 form generation with company and donor details',
      'Dashboard: pie chart of sources, bar chart of values, PDF/Excel export',
    ],
  },
];

const accountingEntries = [
  { action: 'VAT — Output on Sales', debit: '—', credit: 'VAT Control (output)' },
  { action: 'VAT — Input on Purchases', debit: 'VAT Control (input)', credit: '—' },
  { action: 'VAT Settlement (Pay SARS)', debit: 'VAT Payable', credit: 'Bank' },
  { action: 'VAT Refund (from SARS)', debit: 'Bank', credit: 'VAT Receivable' },
  { action: 'Provisional Tax Post', debit: 'Income Tax Expense', credit: 'Current Tax Payable' },
  { action: 'Provisional Tax Paid', debit: 'Current Tax Payable', credit: 'Bank / Provisional Tax Paid' },
  { action: 'Employee Tax Bulk Pay', debit: 'PAYE + UIF + SDL Payable', credit: 'Bank' },
  { action: 'Donation Tax Journal', debit: 'Donation Expense', credit: 'Asset / Inventory + Donation Tax Payable' },
];

const wearAndTear = [
  { asset: 'Computer hardware', life: '3 years' },
  { asset: 'Off-the-shelf software', life: '3 years' },
  { asset: 'Office equipment (printers/copiers)', life: '3–5 years' },
  { asset: 'Furniture and fittings', life: '6 years' },
  { asset: 'Motor vehicles (passenger)', life: '5 years' },
  { asset: 'Delivery vehicles (commercial)', life: '4–5 years' },
  { asset: 'Plant and machinery (general)', life: '5–10 years' },
  { asset: 'Tools and implements', life: '3–5 years' },
  { asset: 'Servers & network gear', life: '3–5 years' },
];

function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = section.icon;
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-emerald-300 bg-white shadow-md'
          : 'border-slate-200 bg-white hover:border-emerald-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-5 lg:p-6 text-left"
      >
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#1BA37B] text-white scale-110'
              : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base lg:text-lg font-bold text-slate-900"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            {section.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate hidden sm:block">
            {section.tagline}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-mono text-slate-300 transition-opacity ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 lg:px-6 pb-6 pl-[5rem] lg:pl-[5.5rem]">
            <p className="text-sm text-slate-600 leading-7 mb-4">
              {section.description}
            </p>
            <ul className="space-y-2.5">
              {section.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-6">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function getYouTubeId(url: string) {
  try {
    return url.split('youtu.be/')[1]?.split('?')[0] ?? '';
  } catch {
    return '';
  }
}

function getYouTubeEmbedUrl(url: string) {
  const id = getYouTubeId(url);
  return `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
}

function getYouTubeThumb(url: string) {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

const TAX_DEMO_VIDEOS = [
  { url: 'https://youtu.be/Z4w-v6xg0Do', title: 'VAT demo 1', desc: 'by Rigel Team' },
];

function TaxVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="VAT demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function Tax() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<typeof TAX_DEMO_VIDEOS[number] | null>(null);

  useEffect(() => {
    if (!playingVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlayingVideo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playingVideo]);

  return (
    <div className="bg-white">
      {/* Hero — split layout with image showcase */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_f1imttf1imttf1im.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Tax Management</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              SARS-Compliant Tax, End to End
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              File VAT201 returns, calculate provisional tax (IRP6), compute corporate income tax, manage employee tax (PAYE/UIF/SDL), and track donation tax — all from a single unified tax dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module overview — 6 sub-modules */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Six sub-modules, one unified tax hub
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Every South African tax obligation — from VAT to donation tax — managed from a single dashboard.
            </p>
          </div>
          <CardSlider>
            {[
              { title: 'VAT 201', desc: 'Period-based VAT returns with output/input tracking and SARS filing.', image: '/vat layout.png' },
              { title: 'Provisional Tax', desc: 'IRP6 calculations across two periods per tax year.', image: '/rip 5 for sars .png' },
              { title: 'Corporate Tax', desc: 'Annual CIT computation with add-backs and capital allowances.', image: '/income statement.png' },
              { title: 'Corporate Tax IIV', desc: 'Instant real-time tax computation from ledger data.', image: '/vat graph report .png' },
              { title: 'Employee Tax', desc: 'Aggregated PAYE/UIF/SDL with bulk SARS payment.', image: '/payroll graphs.png' },
              { title: 'Donation Tax', desc: 'Section 54 (20%) and Section 18A with IT144 forms.', image: '/general ledger .png' },
            ].map((p) => (
              <div key={p.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={p.image} alt={p.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-base font-bold text-white mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                  <p className="text-xs text-white/80 leading-5 line-clamp-2">{p.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* How VAT affects sales, expenses and purchases */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Everyday VAT</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              How VAT affects your sales, expenses and purchases
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: FileText,
                title: 'Invoices',
                desc: 'Rigel automatically calculates and tracks VAT on every customer invoice, quote and sales order so your output tax stays accurate and SARS-ready.',
              },
              {
                icon: ClipboardList,
                title: 'Expenses and Purchase Orders',
                desc: 'Rigel automatically calculates and tracks VAT on supplier invoices, debit notes and purchase orders so your input tax is captured from each business expense.',
              },
              {
                icon: Landmark,
                title: 'One-click SARS forms',
                desc: 'Rigel lets you view your VAT payable and receivable position in a few clicks, helping you prepare and submit your VAT201 claim with SARS.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-8 card-lift">
                <div className="inline-flex h-20 w-16 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
                  <item.icon className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-slate-500 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VAT demo video */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the VAT module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click the thumbnail below to watch a short VAT201 demo.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setPlayingVideo(TAX_DEMO_VIDEOS[0])}
              className="group text-left shrink-0 w-[85%] sm:w-[60%] lg:w-[45%] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ring-2 ring-emerald-500 scale-100 shadow-2xl"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              <div className="relative aspect-video">
                <img
                  src={getYouTubeThumb(TAX_DEMO_VIDEOS[0].url)}
                  alt={TAX_DEMO_VIDEOS[0].title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/95 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="h-7 w-7 text-[#1BA37B] ml-1" fill="#1BA37B" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900">{TAX_DEMO_VIDEOS[0].title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{TAX_DEMO_VIDEOS[0].desc}</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {playingVideo && (
        <div
          className="fixed inset-0 z-[100] bg-[#0B1220]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-10 right-0 h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <TaxVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Accordion — detailed features */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Core Features</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Everything you need for SARS compliance
            </h2>
          </div>
          <div className="space-y-3">
            {moduleSections.map((sec, i) => (
              <AccordionItem
                key={sec.name}
                section={sec}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statutory Rates Reference */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Statutory Rates</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              South African tax rates at a glance
            </h2>
          </div>
          <CardSlider>
            {[
              { label: 'Standard VAT Rate', value: '15%', desc: 'Applied to most goods and services', image: '/vat layout.png' },
              { label: 'Zero-Rated VAT', value: '0%', desc: 'Exports and basic food items', image: '/close vat period .png' },
              { label: 'Corporate Income Tax', value: '27%', desc: 'Standard CIT rate (configurable)', image: '/income statement.png' },
              { label: 'Donation Tax', value: '20%', desc: 'Section 54 rate on gratuitous donations', image: '/vat adjustment.png' },
              { label: 'UIF (Employee + Employer)', value: '1% + 1%', desc: 'Of cash remuneration, R17,712 ceiling', image: '/payroll history .png' },
              { label: 'SDL', value: '1%', desc: 'Of gross payroll (R500,000 exemption)', image: '/run payroll.png' },
            ].map((r) => (
              <div key={r.label} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={r.image} alt={r.label} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.value}</p>
                  <p className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.label}</p>
                  <p className="text-xs text-white/80 leading-5">{r.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Wear & Tear Allowances */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Wear & Tear</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              SARS asset depreciation schedules
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Asset Class</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Write-off Period</span>
            </div>
            {wearAndTear.map((w) => (
              <div key={w.asset} className="grid grid-cols-2 px-6 py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{w.asset}</span>
                <span className="text-sm font-semibold text-emerald-600">{w.life}</span>
              </div>
            ))}
          </div>
          <CardSlider className="mt-6">
            {[
              { label: 'Section 12C', desc: 'Manufacturing plant — 20% p.a. over 5 years', image: '/deprciation schedule.png' },
              { label: 'Section 12B (Solar PV)', desc: '50/30/20 accelerated schedule', image: '/depreciation schedule 4.png' },
              { label: 'Small Business Corp', desc: 'Accelerated per SBC rules', image: '/depreciation policies .png' },
            ].map((s) => (
              <div key={s.label} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={s.image} alt={s.label} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-4 bg-[#0052CC]">
                  <h3 className="text-xs font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.label}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{s.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Tax Settings */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Tax & Invoicing Settings</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Configurable per company
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'Tax Authority', desc: 'Configurable name (VAT, GST) and registration number.', image: '/vat layout.png' },
              { title: 'Standard Rate', desc: 'Default tax rate percentage — 15% for South Africa.', image: '/vat adjustment.png' },
              { title: 'Tax Active', desc: 'Enable or disable tax calculations globally.', image: '/vat graph report .png' },
              { title: 'Invoice Prefix', desc: 'Configurable invoice and quote numbering prefixes.', image: '/tax invoice .png' },
              { title: 'Tax Periods', desc: 'Multi-type periods (VAT, PAYE) with auto-creation.', image: '/close vat period .png' },
              { title: 'Official Rate History', desc: 'Admin-manageable SARS official interest rates with dates.', image: '/vat graph report .png' },
              { title: 'Account Mappings', desc: 'Map GL accounts for tax expense, payable and deferred.', image: '/general ledger .png' },
              { title: 'Year Lock', desc: 'Lock fiscal year to prevent further transaction changes.', image: '/close vat period .png' },
            ].map((item) => (
              <div key={item.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={item.image} alt={item.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-4 bg-[#0052CC]">
                  <h3 className="text-xs font-bold text-white mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Reports Suite */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Reports & Analytics</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              SARS-compliant reports and analytics
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'VAT201 Report', desc: 'Transaction-level breakdown with SARS box totals and finalize.', image: '/vat layout.png' },
              { title: 'VAT Intelligence Dashboard', desc: 'Compliance score, filing countdown, YTD totals and trend charts.', image: '/vat graph report .png' },
              { title: 'Sales Tax Report', desc: 'Monthly sales excluding VAT, VAT collected and effective rate.', image: '/tax invoice .png' },
              { title: 'Purchase Tax Report', desc: 'Monthly purchases excluding VAT, VAT input and effective rate.', image: '/supplier invoice .png' },
              { title: 'Annual VAT Report', desc: '12-month VAT summary aligned to fiscal year with PDF export.', image: '/vat graph report .png' },
              { title: 'IRP6 Statement', desc: 'Formal provisional tax statement per return or all returns.', image: '/rip 5 for sars .png' },
              { title: 'IT144 Donation Form', desc: 'Printable SARS donation tax return with company and donor details.', image: '/vat adjustment.png' },
              { title: 'Audit Log', desc: 'Version history of all calculation and adjustment changes.', image: '/view transaction report.png' },
            ].map((r) => (
              <div key={r.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={r.image} alt={r.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-4 bg-[#0052CC]">
                  <h3 className="text-xs font-bold text-white mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{r.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Accounting Integration */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Integration</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Automatic double-entry across all tax types
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Action</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Debit</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Credit</span>
            </div>
            {accountingEntries.map((entry) => (
              <div key={entry.action} className="grid grid-cols-3 px-6 py-4 border-b border-slate-100 last:border-0">
                <span className="text-sm font-semibold text-slate-900">{entry.action}</span>
                <span className="text-sm text-emerald-600">{entry.debit}</span>
                <span className="text-sm text-blue-600">{entry.credit}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-slate-600">Tax period linking — each transaction linked via tax_period_id. Closed period transactions are locked.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-slate-600">Data integrity diagnostics detect unposted transactions and ledger inconsistencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tutorial */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Built-in Tutorial</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              8-step VAT201 interactive guide
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Walks users through the full VAT201 workflow — auto-shows on first visit for new users.
            </p>
          </div>
          <CardSlider>
            {[
              { title: 'Overview', desc: 'Introduction to VAT 201 module', image: '/overview.png' },
              { title: 'Frequency', desc: 'Set filing frequency (1/2/4/6/12 months)', image: '/vat layout.png' },
              { title: 'Periods', desc: 'Create and manage VAT periods', image: '/close vat period .png' },
              { title: 'Close Period', desc: 'Select transactions and finalize', image: '/close vat period .png' },
              { title: 'Reports', desc: 'View VAT201 and analytics reports', image: '/vat graph report .png' },
              { title: 'Payments', desc: 'Link bank payments and refunds', image: '/vat adjustment.png' },
              { title: 'Adjustments', desc: 'Create manual VAT adjustments', image: '/vat adjustment.png' },
              { title: 'Compliance', desc: 'Monitor compliance score and deadlines', image: '/vat graph report .png' },
            ].map((step) => (
              <div key={step.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={step.image} alt={step.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-4 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{step.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Stay compliant with SARS
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            File VAT201 returns, calculate provisional tax, manage employee tax and track donations — all with automatic double-entry accounting. Start your 7-day free trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#1BA37B] hover:bg-[#158560] px-8 font-semibold text-white">
              Start free trial <ArrowRight className="h-4 w-4 ml-2" />
            </a>
            <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-8 font-semibold text-slate-700">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
