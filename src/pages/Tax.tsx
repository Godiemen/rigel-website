import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, X, Maximize2,
  Landmark, FileText, Users, Calculator, BarChart3,
  ShieldCheck, AlertTriangle, RefreshCw, ClipboardList,
  TrendingUp, Zap, GraduationCap, LockKeyhole,
  Gift, Building2, Percent, Calendar,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/vat layout.png', title: 'VAT 201 dashboard', desc: 'Current period card with output/input VAT, net position and payment status.' },
  { src: '/close vat period .png', title: 'Close VAT period', desc: 'Select transactions within the period to finalize and lock the VAT return.' },
  { src: '/vat adjustment.png', title: 'VAT adjustments', desc: 'Create manual output/input VAT adjustments with date, type and amount.' },
  { src: '/vat graph report .png', title: 'VAT intelligence dashboard', desc: 'Compliance score, filing countdown, YTD totals and monthly trend charts.' },
  { src: '/rip 5 for sars .png', title: 'IRP5 / SARS reports', desc: 'SARS-compliant tax certificates and reports generated from pay run data.' },
];

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

const moduleTabs = [
  { icon: Landmark, title: 'VAT 201', desc: 'Period-based VAT returns with output/input tracking and SARS filing.' },
  { icon: Calculator, title: 'Provisional Tax', desc: 'IRP6 calculations across two periods per tax year.' },
  { icon: Building2, title: 'Corporate Tax', desc: 'Annual CIT computation with add-backs and capital allowances.' },
  { icon: Zap, title: 'Corporate Tax IIV', desc: 'Instant real-time tax computation from ledger data.' },
  { icon: Users, title: 'Employee Tax', desc: 'Aggregated PAYE/UIF/SDL with bulk SARS payment.' },
  { icon: Gift, title: 'Donation Tax', desc: 'Section 54 (20%) and Section 18A with IT144 forms.' },
];

const reports = [
  { icon: Landmark, title: 'VAT201 Report', desc: 'Transaction-level breakdown with SARS box totals and finalize.' },
  { icon: BarChart3, title: 'VAT Intelligence Dashboard', desc: 'Compliance score, filing countdown, YTD totals and trend charts.' },
  { icon: FileText, title: 'Sales Tax Report', desc: 'Monthly sales excluding VAT, VAT collected and effective rate.' },
  { icon: FileText, title: 'Purchase Tax Report', desc: 'Monthly purchases excluding VAT, VAT input and effective rate.' },
  { icon: TrendingUp, title: 'Annual VAT Report', desc: '12-month VAT summary aligned to fiscal year with PDF export.' },
  { icon: FileText, title: 'IRP6 Statement', desc: 'Formal provisional tax statement per return or all returns.' },
  { icon: FileText, title: 'IT144 Donation Form', desc: 'Printable SARS donation tax return with company and donor details.' },
  { icon: ClipboardList, title: 'Audit Log', desc: 'Version history of all calculation and adjustment changes.' },
];

const tutorialSteps = [
  { num: '01', title: 'Overview', desc: 'Introduction to VAT 201 module' },
  { num: '02', title: 'Frequency', desc: 'Set filing frequency (1/2/4/6/12 months)' },
  { num: '03', title: 'Periods', desc: 'Create and manage VAT periods' },
  { num: '04', title: 'Close Period', desc: 'Select transactions and finalize' },
  { num: '05', title: 'Reports', desc: 'View VAT201 and analytics reports' },
  { num: '06', title: 'Payments', desc: 'Link bank payments and refunds' },
  { num: '07', title: 'Adjustments', desc: 'Create manual VAT adjustments' },
  { num: '08', title: 'Compliance', desc: 'Monitor compliance score and deadlines' },
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

const statutoryRates = [
  { label: 'Standard VAT Rate', value: '15%', desc: 'Applied to most goods and services' },
  { label: 'Zero-Rated VAT', value: '0%', desc: 'Exports and basic food items' },
  { label: 'Corporate Income Tax', value: '27%', desc: 'Standard CIT rate (configurable)' },
  { label: 'Donation Tax', value: '20%', desc: 'Section 54 rate on gratuitous donations' },
  { label: 'UIF (Employee + Employer)', value: '1% + 1%', desc: 'Of cash remuneration, R17,712 ceiling' },
  { label: 'SDL', value: '1%', desc: 'Of gross payroll (R500,000 exemption)' },
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

export function Tax() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1);
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lightbox]);

  return (
    <div className="bg-white">
      {/* Hero — polished dark gradient with glowing blobs */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_f1imttf1imttf1im.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220]/90 via-[#0B1F1A]/85 to-[#0B1220]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/60 to-[#0B1220]/30" />
          <div className="absolute inset-0">
            <div className="absolute top-[10%] left-[5%] h-[400px] w-[400px] bg-[#1BA37B]/15 blur-[100px] rounded-full" />
            <div className="absolute bottom-[5%] right-[10%] h-[350px] w-[350px] bg-[#1BA37B]/10 blur-[90px] rounded-full" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Tax Management</span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              SARS-Compliant Tax, End to End
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-10">
              File VAT201 returns, calculate provisional tax (IRP6), compute corporate income tax, manage employee tax (PAYE/UIF/SDL), and track donation tax — all from a single unified tax dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#1BA37B] hover:bg-[#158560] px-8 font-semibold text-white">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-white/25 hover:border-white/60 hover:bg-white/5 px-8 font-semibold text-white">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleTabs.map((p, i) => (
              <div key={p.title} className="card-lift bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1BA37B] to-[#0F9D6C]" />
                <div className="h-12 w-12 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-300 absolute top-4 right-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                <p className="text-xs text-slate-500 leading-5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots carousel */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Tax management, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From VAT dashboards to period closing, adjustments and SARS reports — explore the actual Rigel Business tax interface.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-4 lg:gap-6">
            <div className="relative group">
              <div
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg cursor-pointer"
                onClick={() => lightbox !== null && setLightboxOpen(true)}
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  {lightbox !== null && (
                    <img
                      src={screenshots[lightbox].src}
                      alt={screenshots[lightbox].title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4 text-slate-700" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/40 to-transparent p-6 lg:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1.5">
                        {lightbox !== null ? String(lightbox + 1).padStart(2, '0') : '01'} / {String(screenshots.length).padStart(2, '0')}
                      </p>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {lightbox !== null ? screenshots[lightbox].title : ''}
                      </h3>
                      <p className="text-sm text-slate-300 leading-6 max-w-md hidden sm:block">
                        {lightbox !== null ? screenshots[lightbox].desc : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox! - 1); }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox! + 1); }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 lg:gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[460px] pb-2 lg:pb-0">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.title}
                  onClick={() => setLightbox(i)}
                  className={`relative shrink-0 w-32 lg:w-full overflow-hidden rounded-xl border-2 transition-all duration-200 text-left ${
                    lightbox === i ? 'border-[#1BA37B] shadow-md' : 'border-slate-200 hover:border-emerald-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={shot.src} alt={shot.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                    <p className="text-[10px] font-semibold text-white truncate">{shot.title}</p>
                  </div>
                  {lightbox === i && (
                    <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-[#1BA37B] flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0B1220]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <X className="h-5 w-5 text-slate-700" />
            </button>
            <button onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <ArrowRight className="h-5 w-5 text-slate-700 rotate-180" />
            </button>
            <button onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <ArrowRight className="h-5 w-5 text-slate-700" />
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 bg-slate-100 flex items-center justify-center min-h-[300px] lg:min-h-[600px] p-4">
                <img src={screenshots[lightbox].src} alt={screenshots[lightbox].title} className="max-h-[280px] lg:max-h-[560px] w-full object-contain" />
              </div>
              <div className="lg:w-80 p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{String(lightbox + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-slate-300">/ {String(screenshots.length).padStart(2, '0')}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{screenshots[lightbox].title}</h3>
                <p className="text-sm text-slate-500 leading-7 mb-8">{screenshots[lightbox].desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {screenshots.map((_, i) => (
                    <button key={i} onClick={() => setLightbox(i)} className={`h-1.5 rounded-full transition-all duration-300 ${lightbox === i ? 'w-6 bg-[#1BA37B]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)} className="flex-1 h-11 rounded-lg border border-slate-200 hover:border-slate-300 text-sm font-semibold text-slate-600 flex items-center justify-center gap-1.5 transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Prev
                  </button>
                  <button onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)} className="flex-1 h-11 rounded-lg bg-[#1BA37B] hover:bg-[#158560] text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-colors">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statutoryRates.map((r) => (
              <div key={r.label} className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <Percent className="h-5 w-5 text-emerald-600" />
                  <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.value}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.label}</p>
                <p className="text-xs text-slate-500 leading-5">{r.desc}</p>
              </div>
            ))}
          </div>
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
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Section 12C', desc: 'Manufacturing plant — 20% p.a. over 5 years' },
              { label: 'Section 12B (Solar PV)', desc: '50/30/20 accelerated schedule' },
              { label: 'Small Business Corp', desc: 'Accelerated per SBC rules' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-emerald-600 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.label}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{s.desc}</p>
              </div>
            ))}
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Landmark, title: 'Tax Authority', desc: 'Configurable name (VAT, GST) and registration number.' },
              { icon: Percent, title: 'Standard Rate', desc: 'Default tax rate percentage — 15% for South Africa.' },
              { icon: ShieldCheck, title: 'Tax Active', desc: 'Enable or disable tax calculations globally.' },
              { icon: FileText, title: 'Invoice Prefix', desc: 'Configurable invoice and quote numbering prefixes.' },
              { icon: Calendar, title: 'Tax Periods', desc: 'Multi-type periods (VAT, PAYE) with auto-creation.' },
              { icon: RefreshCw, title: 'Official Rate History', desc: 'Admin-manageable SARS official interest rates with dates.' },
              { icon: Building2, title: 'Account Mappings', desc: 'Map GL accounts for tax expense, payable and deferred.' },
              { icon: LockKeyhole, title: 'Year Lock', desc: 'Lock fiscal year to prevent further transaction changes.' },
            ].map((item) => (
              <div key={item.title} className="card-lift bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {reports.map((r) => (
              <div key={r.title} className="card-lift bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <r.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {tutorialSteps.map((step) => (
              <div key={step.num} className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden group hover:border-emerald-300 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#1BA37B] to-[#0F9D6C] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-mono text-emerald-600 font-bold">{step.num}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{step.title}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{step.desc}</p>
              </div>
            ))}
          </div>
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
