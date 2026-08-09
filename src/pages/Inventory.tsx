import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, X, Maximize2,
  Package, FileText, Users,
  AlertTriangle, RefreshCw, Upload, ClipboardList,
  TrendingUp, ShieldCheck, Zap, ArrowLeftRight, GraduationCap,
  Bell, Boxes, Layers, Gift, Image as ImageIcon, Search,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/inventory stock .png', title: 'Inventory items', desc: 'View all stock items with quantities, costs, prices and status badges.' },
  { src: '/stock control graph.png', title: 'Stock control graph', desc: 'Stock trend chart showing expected vs actual on-hand over time.' },
  { src: '/inventory turn over .png', title: 'Inventory turnover', desc: 'Turnover ratios, days to sell and movement trends per item.' },
  { src: '/purchase by item.png', title: 'Purchases by item', desc: 'Purchase history per item with supplier details and costs.' },
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
    icon: Package,
    name: 'Items (Products)',
    tagline: 'Physical stock items with quantity, cost, selling price, SKU and category.',
    description:
      'Track physical stock items with quantity on hand, cost price, average cost, selling price, SKU, style, color and category. Stock status badges show Stock Healthy (green), Need to Order (amber, 5 or fewer units) or Out of Stock (red, 0 units). New products are created automatically from Purchase Management when supplier invoices are captured.',
    features: [
      'Quantity on hand, average cost and selling price per item',
      'SKU, style, color and category classification',
      'Stock status badges: Healthy, Need to Order, Out of Stock',
      'Automatic product creation from supplier invoices',
      'Cost price tracking from receipts and adjustments',
      'Committed quantity tracking for allocated stock',
    ],
  },
  {
    icon: FileText,
    name: 'Services',
    tagline: 'Non-stock services with selling price only — no stock tracking or inventory accounting.',
    description:
      'Create non-stock services with a name, description and selling price. Services have no stock tracking and no inventory accounting entries at creation. Use services on quotes, sales orders and invoices alongside physical products.',
    features: [
      'Non-stock services with name and description',
      'Selling price only — no stock or cost tracking',
      'No accounting entry at creation',
      'Available on quotes, sales orders and invoices',
      'Filter items table by Parts vs Service',
      'Bulk import services from CSV',
    ],
  },
  {
    icon: Boxes,
    name: 'Adding Items — Three Pathways',
    tagline: 'Opening stock, capital contribution or donated stock — each with correct accounting.',
    description:
      'Add inventory through three pathways. Opening Stock brings in existing quantities and cost prices, posting Debit Inventory / Credit Opening Equity. Capital Contribution records a director contributing stock, posting Debit Inventory / Credit Capital. Donated Stock records stock received as a donation, posting Debit Inventory / Credit Donations Received with donor name and notes.',
    features: [
      'Opening Stock: Debit Inventory / Credit Opening Equity',
      'Capital Contribution: Debit Inventory / Credit Capital (select director)',
      'Donated Stock: Debit Inventory / Credit Donations Received',
      'Cost price and quantity capture per item',
      'Director selection from the Directors module',
      'Donor name and notes for donated stock',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Stock Tracking & Movement History',
    tagline: 'Detailed dialog with stock summary, trend charts, forecasting, variance alerts and full movement log.',
    description:
      'Click any item name to open a detailed stock tracking dialog. View stock summary cards (purchased, sold, returned, donated, net sold, expected on hand, variance, committed), stock trend and cost trend charts, sales velocity with days-of-stock remaining and predicted run-out date, variance analysis with alerts, and a full chronological movement history table with filterable sub-tabs for sales, returns and purchases.',
    features: [
      'Stock summary: purchased, sold, returned, donated, net sold, expected, variance',
      'Stock trend chart: expected vs actual on-hand over time',
      'Cost trend chart: cost price changes from receipts and adjustments',
      'Sales velocity: daily rate, days remaining, predicted run-out date',
      'Variance analysis: high variance (>10%) triggers red alert',
      'Movement history: receipts, sales, returns, donations, adjustments, opening stock',
    ],
  },
  {
    icon: ArrowLeftRight,
    name: 'Stock Adjustments',
    tagline: 'Adjust quantities up or down with reason and cost price — prevents negative stock.',
    description:
      'Adjust stock quantities up or down with a required reason and cost price. The system prevents reducing stock below zero with a warning dialog. Adjustments post Debit Inventory (adjustment in) or Credit Inventory (adjustment out) to the general ledger. Available from the item row dropdown menu or the Action Centre.',
    features: [
      'Adjust stock up or down with reason and cost price',
      'Prevents reducing stock below zero — shows warning',
      'Debit Inventory (in) or Credit Inventory (out) to GL',
      'Reason required for audit compliance',
      'Accessible from item dropdown or Action Centre',
      'Full adjustment history in movement log',
    ],
  },
  {
    icon: Layers,
    name: 'Batch Tracking & Traceability',
    tagline: 'Manage batches with expiry dates, locations and quantities — ordered by soonest expiry.',
    description:
      'Add and manage batches for any product item. Each batch records a batch number, expiry date, location, quantity and notes. Batches are ordered by expiry date with soonest first. Edit or delete batches as needed. A batch count badge appears in the stock tracking dialog. Essential for expiry-sensitive inventory and audit traceability.',
    features: [
      'Batch number, expiry date, location, quantity and notes',
      'Batches ordered by expiry date — soonest first',
      'Edit or delete batches anytime',
      'Batch count badge in stock tracking dialog',
      'Essential for expiry-sensitive inventory',
      'Full audit traceability per batch',
    ],
  },
  {
    icon: Gift,
    name: 'Stock Donations (SARS-Compliant)',
    tagline: 'Donate stock with VAT deemed supply, Section 18A receipts and live tax preview.',
    description:
      'Donate stock items to recipients with full accounting and SARS-compliant tax handling. SARS treats donation of trading stock as a deemed supply — if VAT-registered, the system calculates output VAT on the open market value. Support for Section 18A tax-deductible donations with receipt numbers. A live donation tax preview shows taxable amount, prior cumulative donations, exemption remaining and a plain-language explanation before posting.',
    features: [
      'Donation reasons: charitable, damaged, promotional, sample, other',
      'VAT on donated trading stock — deemed supply calculation',
      'Section 18A receipts with receipt numbers',
      'Live donation tax preview before posting',
      'Market value required when VAT is included',
      'Debit Donations Expense / Credit Inventory + VAT Output',
    ],
  },
  {
    icon: ShieldCheck,
    name: 'Item Deactivation (Audit-Safe)',
    tagline: 'Items cannot be hard-deleted — deactivated with reason for audit trail.',
    description:
      'Items cannot be hard-deleted for audit compliance — they are deactivated instead. Deactivation requires a reason that is recorded for the audit trail. Items with stock on hand cannot be deactivated (must adjust to zero first). Batch deactivation of multiple selected items is supported. Deactivated items show as inactive and are excluded from transactions.',
    features: [
      'No hard delete — items are deactivated with a reason',
      'Reason recorded for audit trail',
      'Items with stock on hand cannot be deactivated',
      'Batch deactivation of multiple selected items',
      'Deactivated items excluded from transactions',
      'Toggle active/inactive status anytime',
    ],
  },
];

const reports = [
  { icon: RefreshCw, title: 'Inventory Turnover Report', desc: 'Turnover ratios, days to sell and movement trends per item.' },
  { icon: TrendingUp, title: 'Sales by Item Report', desc: 'Revenue and quantity sold per item with date filtering.' },
  { icon: Package, title: 'Purchases by Item Report', desc: 'Purchase history per item with supplier details.' },
  { icon: Users, title: 'Supplier Listing Report', desc: 'All suppliers with current balances.' },
];

const tutorialSteps = [
  { num: '01', title: 'Overview', desc: 'Introduction to the Inventory module' },
  { num: '02', title: 'Add Services & Opening Stock', desc: 'Create services and bring in existing stock' },
  { num: '03', title: 'Import Inventory vs Services', desc: 'Bulk import items and services from CSV' },
  { num: '04', title: 'Using the Items Table', desc: 'Search, filter, track and adjust stock' },
  { num: '05', title: 'Quick Reports & Next Steps', desc: 'Generate turnover and sales reports' },
  { num: '06', title: 'Complete', desc: 'You are ready to manage inventory' },
];

const accountingEntries = [
  { action: 'Opening Stock', debit: 'Inventory', credit: 'Opening Equity' },
  { action: 'Capital Contribution', debit: 'Inventory', credit: 'Capital' },
  { action: 'Donated Stock Received', debit: 'Inventory', credit: 'Donations Received' },
  { action: 'Stock Donation (out)', debit: 'Donations Expense', credit: 'Inventory + VAT Output' },
  { action: 'Stock Adjustment In', debit: 'Inventory', credit: 'Inventory Adjustment Income' },
  { action: 'Stock Adjustment Out', debit: 'Inventory Adjustment Expense', credit: 'Inventory' },
  { action: 'COGS on Sale', debit: 'COGS', credit: 'Inventory (via delivery note)' },
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

export function Inventory() {
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
            src="/PL2ri.jpg"
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
              <Package className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Inventory & Stock</span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Full control of your stock
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-10">
              Track stock levels, movements, batches, donations, adjustments and AI-powered forecasts — all integrated with your accounting ledger.
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

      {/* Module overview — two modes */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Two tabs, complete stock control
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Physical products with full stock tracking and non-stock services — all in one module.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Package, title: 'Items', desc: 'Physical stock with qty, cost, SKU, status badges and movement history.' },
              { icon: FileText, title: 'Services', desc: 'Non-stock services with selling price — no stock or accounting entries.' },
              { icon: Boxes, title: 'Three Pathways', desc: 'Opening stock, capital contribution or donated stock — each posts correctly.' },
              { icon: Layers, title: 'Batch Tracking', desc: 'Batches with expiry dates, locations and quantities for traceability.' },
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
              Inventory management, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From stock items to turnover reports and control graphs — explore the actual Rigel Business inventory interface.
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
              Everything you need to manage stock
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

      {/* Inventory Dashboard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Inventory Dashboard</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Real-time stock visibility at a glance
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Stock Healthy', value: '0', icon: CheckCircle2, color: 'text-emerald-600' },
              { label: 'Low Stock', value: '0', icon: AlertTriangle, color: 'text-amber-600' },
              { label: 'Out of Stock', value: '0', icon: AlertTriangle, color: 'text-red-600' },
              { label: 'Total Inventory Value', value: 'R 0', icon: TrendingUp, color: 'text-blue-600' },
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
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Stock by Category</h3>
              <div className="space-y-3">
                {[
                  { label: 'Parts', pct: 60, color: 'bg-emerald-500' },
                  { label: 'Consumables', pct: 25, color: 'bg-blue-500' },
                  { label: 'Equipment', pct: 15, color: 'bg-amber-500' },
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
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Received vs Sold</h3>
              <div className="flex items-end justify-between gap-4 h-32 pt-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 justify-center">
                      <div className="w-3 rounded-t bg-emerald-500" style={{ height: `${30 + i * 8}px` }} />
                      <div className="w-3 rounded-t bg-blue-400" style={{ height: `${20 + i * 6}px` }} />
                    </div>
                    <span className="text-[10px] text-slate-400">{m}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-xs text-slate-600">Received</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-400" /><span className="text-xs text-slate-600">Sold</span></div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">Dashboard reflects live data with fiscal year-aware filtering.</p>
        </div>
      </section>

      {/* Action Centre & AI Engine */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Smart Alerts & AI</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Action Centre and AI-powered decision engine
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Action Centre</h3>
              <ul className="space-y-2">
                {['Items needing price review (selling at a loss or break-even)', 'Items needing stock (out of stock or below reorder threshold)', 'Click any alert to jump directly to the action', 'Shows top 10 priority items with stock quantities and status'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AI Decision Engine</h3>
              <ul className="space-y-2">
                {['Critical: out of stock with lost revenue calculation', 'Critical: only X days of stock remaining with lead time warning', 'Warning: high-margin item running low — prioritise restocking', 'Warning: overstocked — months of supply exceeds 3 months', 'Warning: stock variance detected with percentage and value', 'Success: item in good standing with healthy margin'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#1BA37B] text-white flex items-center justify-center shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Financial Impact Per Recommendation</h3>
              <p className="text-sm text-slate-600 leading-6">Each AI recommendation includes a title, detail, recommended action and quantified financial impact — so you know exactly what it costs to ignore.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Actions + Import/Export + Image Management + Search */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Bulk Actions</h3>
              <ul className="space-y-2">
                {['Checkbox selection on the items table', 'Bulk deactivate selected items', 'Bulk mark active/inactive', 'Prevents deletion of items with stock on hand'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Import & Export</h3>
              <ul className="space-y-2">
                {['Import opening stock from CSV/Excel — posts to Inventory and Opening Equity', 'Import services from CSV/Excel — no stock or accounting entries', 'Template download available in the import dialog', 'Export all items to Excel, CSV or PDF'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <ImageIcon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Image Management</h3>
              <ul className="space-y-2">
                {['Upload product images stored in Supabase Storage', 'View product images in the items table', 'Image upload dialog with error handling', 'Broken image fallback handling'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Search, Filter & Pagination</h3>
              <ul className="space-y-2">
                {['Search by item name, SKU or description', 'Filter by All / Active / Inactive', 'Category filter (Parts vs Service)', 'Paginated table with page navigation', 'Real-time filtering as you type'].map(f => (
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

      {/* Reports Suite */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Quick Reports</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              4 reports for complete stock visibility
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
              Automatic double-entry on every stock action
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
              <p className="text-xs text-slate-600">PostgreSQL RPC stock_transaction_engine handles all quantity updates and records stock_movements with type, quantity, unit cost and reference.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-slate-600">GL balance check alerts if debits do not equal credits.</p>
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
              6-step interactive guide
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Walks users through the entire Inventory module — from overview to completion.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
            Take control of your stock
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Track every item, batch and movement with AI-powered forecasting and automatic double-entry accounting. Start your 7-day free trial.
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
