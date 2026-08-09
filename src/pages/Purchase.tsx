import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, X, Maximize2,
  ShoppingCart, Users, FileText, CreditCard, BarChart3,
  Calculator, AlertTriangle, Landmark, RefreshCw, Upload, ClipboardList,
  TrendingUp, ShieldCheck,
  Zap, ArrowLeftRight, GraduationCap,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/supplier list.png', title: 'Supplier list', desc: 'Manage all suppliers with contact details, tax numbers and balances.' },
  { src: '/supplier invoice .png', title: 'Supplier invoice', desc: 'Capture supplier bills with line items, VAT and due dates.' },
  { src: '/purchase form .png', title: 'Purchase order form', desc: 'Raise POs with line items before invoices arrive.' },
  { src: '/purchase layout.png', title: 'Purchase layout', desc: 'Full purchase module layout with tabs and navigation.' },
  { src: '/process debit note .png', title: 'Debit note', desc: 'Process returns and debit notes with automatic AP adjustments.' },
  { src: '/creditors control .png', title: 'Creditors control', desc: 'Track outstanding payables and supplier balances in real time.' },
  { src: '/creditors control 2.png', title: 'Creditors control summary', desc: 'Aged creditors summary with payment status breakdown.' },
  { src: '/creditors control advisor.png', title: 'Creditors advisor', desc: 'AI-powered insights on supplier payments and cash flow.' },
  { src: '/payable accounts .png', title: 'Payable accounts', desc: 'Accounts payable dashboard with KPIs and ageing analysis.' },
  { src: '/purchase by item.png', title: 'Purchases by item', desc: 'Analyse purchase history by inventory item.' },
  { src: '/sales by supplier .png', title: 'Sales by supplier', desc: 'Spending analysis per supplier with trend charts.' },
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
    icon: Users,
    name: 'Suppliers',
    tagline: 'Create and manage supplier profiles with contact, tax and payment details.',
    description:
      'Maintain a central supplier database with contact information, VAT registration numbers, payment terms and opening balances. Every supplier links to their purchase orders, invoices and payments — giving you a complete view of who you owe and what you have spent.',
    features: [
      'Supplier profiles with contact and tax details',
      'Payment terms and credit limit management',
      'Opening balance tracking for supplier onboarding',
      'Full transaction history per supplier',
      'Supplier statement generation',
      'Link suppliers to every PO, invoice and payment',
    ],
  },
  {
    icon: FileText,
    name: 'Purchase Orders',
    tagline: 'Raise POs before invoices arrive to keep procurement accountable.',
    description:
      'Create purchase orders with line items — type, description, quantity and price. Track PO status from Draft to Sent to Processed. When the supplier invoice arrives, convert the PO directly into a bill with one click, ensuring what was ordered matches what was billed.',
    features: [
      'Create POs with line items, quantities and prices',
      'Track status: Draft → Sent/Open → Processed',
      'Convert POs directly into supplier invoices',
      'Automatic PO numbering and sequential audit trail',
      'Line item types: inventory, service, expense',
      'PO approval workflow before sending to suppliers',
    ],
  },
  {
    icon: ShoppingCart,
    name: 'Supplier Invoices (Bills)',
    tagline: 'Capture every supplier bill with automatic double-entry accounting.',
    description:
      'Record supplier invoices with line items, VAT and due dates. Link bills to existing purchase orders. Download formatted PDF copies, batch export and bulk print. Every bill automatically posts Debit Expense / Credit Accounts Payable to the general ledger — no manual journal entries needed.',
    features: [
      'Capture supplier bills with line items and VAT',
      'Link bills to existing purchase orders',
      'Download formatted PDF copies of any invoice',
      'Batch export and bulk print support',
      'Automatic double-entry: Debit Expense / Credit AP',
      'Due date tracking and ageing analysis',
    ],
  },
  {
    icon: ArrowLeftRight,
    name: 'Supplier Adjustments',
    tagline: 'Handle debit notes, returns and credit notes with automatic AP adjustments.',
    description:
      'When goods are returned or a supplier issues a credit, Rigel creates debit note transactions that Debit Accounts Payable and reduce the supplier outstanding balance. Returned or paid bills get a "returned" status. Supplier refunds can be allocated from the Banking module.',
    features: [
      'Process debit notes for returns and credits',
      'Automatic Debit AP / Credit Expense or Inventory posting',
      'Returned bills flagged with "returned" status',
      'Supplier refunds allocated from Banking receipts',
      'Credit note tracking with full audit trail',
      'Adjustment history per supplier',
    ],
  },
];

const reports = [
  { icon: BarChart3, title: 'Creditors Control Report', desc: 'Detailed creditors ageing with supplier breakdown.' },
  { icon: TrendingUp, title: 'AP Dashboard', desc: 'Full AP analytics with interactive charts and KPIs.' },
  { icon: FileText, title: 'Accounts Payable Report', desc: 'AP summary and working papers for accountants.' },
  { icon: ClipboardList, title: 'Creditors Control Working Paper', desc: 'Reconciliation working paper for audit trails.' },
  { icon: Users, title: 'Creditors Per Supplier Report', desc: 'Per-supplier outstanding balances and history.' },
  { icon: CreditCard, title: 'Payment Report', desc: 'History of all supplier payments with allocations.' },
  { icon: TrendingUp, title: 'AP Cash Flow Forecast', desc: 'Projected AP cash outflows by period.' },
  { icon: Users, title: 'Supplier List Report', desc: 'All suppliers and their current balances.' },
  { icon: ShoppingCart, title: 'Purchases by Item Report', desc: 'Purchase history analysis by inventory item.' },
  { icon: Users, title: 'Purchase by Supplier Report', desc: 'Spending analysis per supplier with trends.' },
  { icon: ArrowLeftRight, title: 'Return Report', desc: 'Summary of returns and debit notes processed.' },
  { icon: FileText, title: 'Supplier Statement', desc: 'Printable supplier account statement with transaction history.' },
];

const tutorialSteps = [
  { num: '01', title: 'Overview', desc: 'Introduction to the Purchase module' },
  { num: '02', title: 'Suppliers', desc: 'Create and manage supplier profiles' },
  { num: '03', title: 'Purchase Orders', desc: 'Raise and track POs' },
  { num: '04', title: 'Supplier Invoices', desc: 'Capture and manage bills' },
  { num: '05', title: 'Create Invoice', desc: 'Step-by-step bill creation' },
  { num: '06', title: 'Payments', desc: 'Process supplier payments' },
  { num: '07', title: 'Returns & Credits', desc: 'Handle debit notes and returns' },
  { num: '08', title: 'Import CSV', desc: 'Bulk import suppliers and POs' },
  { num: '09', title: 'Reconciliation', desc: 'Match supplier statements' },
  { num: '10', title: 'Reports', desc: 'Generate AP and creditors reports' },
  { num: '11', title: 'Complete', desc: 'You are ready to manage purchases' },
];

const accountingEntries = [
  { action: 'Supplier Invoice', debit: 'Expense (or Inventory)', credit: 'Accounts Payable' },
  { action: 'Supplier Payment', debit: 'Accounts Payable', credit: 'Bank / Cash' },
  { action: 'Debit Note / Return', debit: 'Accounts Payable', credit: 'Expense / Inventory' },
  { action: 'Director Paid Settlement', debit: 'Accounts Payable', credit: 'Director Loan Payable' },
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

export function Purchase() {
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
      {/* Hero — full-bleed image banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_cq6dxlcq6dxlcq6d.png"
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
              <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Purchase Management</span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Your procurement command centre
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-10">
              Manage suppliers, purchase orders, supplier invoices, payments, returns and full accounts payable — all in one integrated module built for South African businesses.
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

      {/* Module overview — 4 pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Four pillars of procurement
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Everything from supplier onboarding to payment — integrated with your general ledger.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: 'Suppliers', desc: 'Profiles, tax numbers, payment terms and opening balances.' },
              { icon: FileText, title: 'Purchase Orders', desc: 'Raise POs, track status, convert to supplier invoices.' },
              { icon: ShoppingCart, title: 'Supplier Invoices', desc: 'Capture bills with VAT, auto double-entry to GL.' },
              { icon: ArrowLeftRight, title: 'Adjustments', desc: 'Debit notes, returns, credit notes and refunds.' },
            ].map((p, i) => (
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
              Purchase management, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From supplier lists to creditors control and debit notes — explore the actual Rigel Business purchase interface.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-4 lg:gap-6">
            {/* Main preview */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox! - 1);
                        }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox! + 1);
                        }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex lg:flex-col gap-2 lg:gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[460px] pb-2 lg:pb-0">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.title}
                  onClick={() => setLightbox(i)}
                  className={`relative shrink-0 w-32 lg:w-full overflow-hidden rounded-xl border-2 transition-all duration-200 text-left ${
                    lightbox === i
                      ? 'border-[#1BA37B] shadow-md'
                      : 'border-slate-200 hover:border-emerald-300 opacity-70 hover:opacity-100'
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
          <div
            className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-slate-700 rotate-180" />
            </button>
            <button
              onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-slate-700" />
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 bg-slate-100 flex items-center justify-center min-h-[300px] lg:min-h-[600px] p-4">
                <img
                  src={screenshots[lightbox].src}
                  alt={screenshots[lightbox].title}
                  className="max-h-[280px] lg:max-h-[560px] w-full object-contain"
                />
              </div>
              <div className="lg:w-80 p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                    {String(lightbox + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-300">/ {String(screenshots.length).padStart(2, '0')}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  {screenshots[lightbox].title}
                </h3>
                <p className="text-sm text-slate-500 leading-7 mb-8">
                  {screenshots[lightbox].desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        lightbox === i ? 'w-6 bg-[#1BA37B]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)}
                    className="flex-1 h-11 rounded-lg border border-slate-200 hover:border-slate-300 text-sm font-semibold text-slate-600 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Prev
                  </button>
                  <button
                    onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)}
                    className="flex-1 h-11 rounded-lg bg-[#1BA37B] hover:bg-[#158560] text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
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
              Everything you need to manage procurement
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

      {/* AP Dashboard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">AP Dashboard</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Real-time accounts payable at a glance
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Unpaid Bills', value: 'R 0', icon: FileText, color: 'text-amber-600' },
              { label: 'Overdue Bills', value: 'R 0', icon: AlertTriangle, color: 'text-red-600' },
              { label: 'Paid Bills', value: 'R 0', icon: CheckCircle2, color: 'text-emerald-600' },
              { label: 'Total Outstanding', value: 'R 0', icon: TrendingUp, color: 'text-blue-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">ZAR</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{kpi.value}</p>
                <p className="text-xs text-slate-500">{kpi.label}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AP Ageing Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Current (0-30)', pct: 45, color: 'bg-emerald-500' },
                  { label: '31-60 days', pct: 25, color: 'bg-amber-500' },
                  { label: '61-90 days', pct: 18, color: 'bg-orange-500' },
                  { label: '90+ days', pct: 12, color: 'bg-red-500' },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">{bar.label}</span>
                      <span className="text-xs font-semibold text-slate-900">{bar.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Paid vs Unpaid</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-r-transparent border-b-transparent rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">65%</p>
                      <p className="text-[10px] text-slate-400">Paid</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-xs text-slate-600">Paid</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="text-xs text-slate-600">Unpaid</span></div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">Dashboard reflects fiscal year-aware filtering and live data from every module.</p>
        </div>
      </section>

      {/* System Alerts */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">System Alerts</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Intelligent alerts that prioritise action
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: 'Pending Bills', desc: 'Bills awaiting approval or payment.', color: 'amber' },
              { icon: AlertTriangle, title: 'Unpaid Invoices', desc: 'Overdue supplier invoices need attention.', color: 'red' },
              { icon: Users, title: 'Unpaid Suppliers', desc: 'Suppliers with outstanding balances.', color: 'orange' },
              { icon: ClipboardList, title: 'Pending POs', desc: 'Purchase orders not yet processed.', color: 'blue' },
              { icon: Calculator, title: 'Depreciation Reminders', desc: 'Assets due for depreciation posting.', color: 'purple' },
              { icon: Landmark, title: 'GL Imbalance', desc: 'Debits do not equal credits — investigate.', color: 'red' },
            ].map((alert) => (
              <div key={alert.title} className="card-lift bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  alert.color === 'red' ? 'bg-red-50 text-red-600' :
                  alert.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                  alert.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                  alert.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  <alert.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{alert.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#1BA37B] text-white flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AI-Powered Insights</h3>
              <p className="text-sm text-slate-600 leading-6">Smart messages prioritise your actions — telling you exactly which bills to pay, which suppliers to follow up with, and when cash outflow is projected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Payments & Banking */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Payments & Banking</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Integrated supplier payments
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: CreditCard, title: 'Process Payments', desc: 'Pay suppliers directly from the Purchase module with automatic bank/cash allocation.' },
              { icon: Landmark, title: 'Banking Integration', desc: 'Allocate bank and cash transactions to supplier bills from the Banking module.' },
              { icon: Users, title: 'Director Paid', desc: 'When a director pays personally, the system creates a settlement: Debit AP / Credit Director Loan Payable.' },
              { icon: RefreshCw, title: 'Refunds & Advances', desc: 'Track supplier deposits, advance payments and allocate refunds from Banking receipts.' },
            ].map((item) => (
              <div key={item.title} className="card-lift bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{item.desc}</p>
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
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Reports Suite</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              12 reports for complete AP visibility
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* Supplier Reconciliation + Recurring Bills + CSV Import + Bill Management */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Reconciliation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Supplier Reconciliation</h3>
              <ul className="space-y-2">
                {['Match supplier statements against system records', 'Identify discrepancies between balances and remittance', 'Reconciliation working paper for audit trails'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recurring Bills */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Recurring Bills</h3>
              <ul className="space-y-2">
                {['Set up recurring supplier bills — monthly, quarterly, annually', 'Auto-generation of bills on schedule', 'Edit or pause recurring templates anytime'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CSV Import */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>CSV Import</h3>
              <ul className="space-y-2">
                {['Bulk import suppliers from CSV', 'Bulk import purchase orders from CSV', 'Template download and validation'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bill Management */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Bill Management</h3>
              <ul className="space-y-2">
                {['Full lifecycle: Pending → Approved → Paid → Cancelled/Returned', 'Approval workflow and bulk actions (approve, pay, cancel)', 'Bill ageing and due date tracking'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accounting Integration */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Integration</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Automatic double-entry on every action
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
              <p className="text-xs text-slate-600">All transactions flow through pending → entries → posted for ledger integrity.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-slate-600">GL balance check alerts if debits do not equal credits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tutorial */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Built-in Tutorial</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              11-step interactive guide
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Walks users through the entire Purchase module — from overview to completion.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Take control of your procurement
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Manage suppliers, raise POs, track bills and pay on time — all with automatic double-entry accounting. Start your 7-day free trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#1BA37B] hover:bg-[#158560] px-8 font-semibold text-white">
              Start free trial <ArrowRight className="h-4 w-4 ml-2" />
            </a>
            <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-slate-200 hover:border-slate-300 hover:bg-white px-8 font-semibold text-slate-700">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
