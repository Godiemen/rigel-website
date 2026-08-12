import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play,
  Package, FileText,
  TrendingUp, ShieldCheck, ArrowLeftRight,
  Boxes, Layers, Gift,
  GraduationCap,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-two.vercel.app';



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
        <button onClick={() => scroll(-1)} className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => scroll(1)} className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div ref={ref} className={`flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 pt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ${className}`}>
        {Array.isArray(children) ? children.map((child, i) => (
          <div key={i} className={`transition-all duration-500 ease-out shrink-0 snap-center ${i === centerIndex ? 'scale-[1.12] z-10' : 'scale-90 opacity-60 hover:opacity-90'}`}>
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
  { title: 'Inventory Turnover Report', desc: 'Turnover ratios, days to sell and movement trends per item.', image: '/view transaction report.png' },
  { title: 'Sales by Item Report', desc: 'Revenue and quantity sold per item with date filtering.', image: '/sales by supplier .png' },
  { title: 'Purchases by Item Report', desc: 'Purchase history per item with supplier details.', image: '/supplier invoice .png' },
  { title: 'Supplier Listing Report', desc: 'All suppliers with current balances.', image: '/creditors control.png' },
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

const INVENTORY_DEMO_VIDEOS = [
  { url: 'https://youtu.be/byaPMh_0mF4', title: 'Inventory demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/vNRrculPKYA', title: 'Inventory demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/k_Kmzq3fhpg', title: 'Inventory demo 3', desc: 'by Rigel Team' },
];

function InventoryVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Inventory demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function Inventory() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<typeof INVENTORY_DEMO_VIDEOS[number] | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoSliderRef = useRef<HTMLDivElement>(null);

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
            src="/PL2ri.jpg"
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
              <Package className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Inventory &amp; Stock</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Full control of your stock
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Track stock levels, movements, batches, donations, adjustments and AI-powered forecasts — all integrated with your accounting ledger.
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
          <CardSlider>
            {[
              { title: 'Items', desc: 'Physical stock with qty, cost, SKU, status badges and movement history.', image: '/assets register .png' },
              { title: 'Services', desc: 'Non-stock services with selling price — no stock or accounting entries.', image: '/services .png' },
              { title: 'Three Pathways', desc: 'Opening stock, capital contribution or donated stock — each posts correctly.', image: '/add assets form .png' },
              { title: 'Batch Tracking', desc: 'Batches with expiry dates, locations and quantities for traceability.', image: '/assets manangement.png' },
            ].map((p) => (
              <div key={p.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={p.image} alt={p.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                  <p className="text-xs text-white/80 leading-5">{p.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Inventory demo video */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Inventory module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click the thumbnail below to watch a short inventory demo.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(INVENTORY_DEMO_VIDEOS.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => {
                  const el = videoSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  if (!card) return;
                  const i = Math.max(0, activeVideoIndex - 1);
                  const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                  el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const el = videoSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  if (!card) return;
                  const i = Math.min(INVENTORY_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
                  const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                  el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div
              ref={videoSliderRef}
              onScroll={() => {
                const el = videoSliderRef.current;
                if (!el) return;
                const card = el.firstElementChild as HTMLElement | null;
                if (!card) return;
                const center = el.scrollLeft + el.clientWidth / 2;
                const index = Math.round((center - card.offsetWidth / 2) / (card.offsetWidth + 16));
                setActiveVideoIndex(Math.max(0, Math.min(index, INVENTORY_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {INVENTORY_DEMO_VIDEOS.map((video, i) => (
                <button
                  key={video.url}
                  onClick={() => setPlayingVideo(video)}
                  className={`group text-left shrink-0 snap-center w-[85%] sm:w-[60%] lg:w-[45%] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${i === activeVideoIndex ? 'ring-2 ring-emerald-500 scale-[1.07] shadow-2xl z-10' : 'opacity-70 scale-95 hover:opacity-100 hover:scale-100 hover:shadow-xl'}`}
                  style={{ fontFamily: "'Inter Tight', sans-serif" }}
                >
                  <div className="relative aspect-video">
                    <img
                      src={getYouTubeThumb(video.url)}
                      alt={video.title}
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
                    <h3 className="text-sm font-bold text-slate-900">{video.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{video.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {INVENTORY_DEMO_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = videoSliderRef.current;
                    if (!el) return;
                    const card = el.firstElementChild as HTMLElement | null;
                    if (!card) return;
                    const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                  }}
                  className={`h-2 rounded-full transition-all ${i === activeVideoIndex ? 'w-6 bg-[#1BA37B]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
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
            <InventoryVideoPlayer src={playingVideo.url} />
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
          <CardSlider className="mb-8">
            {[
              { label: 'Stock Healthy', value: '0', image: '/assets register .png' },
              { label: 'Low Stock', value: '0', image: '/assets report graphs .png' },
              { label: 'Out of Stock', value: '0', image: '/aging for debtors .png' },
              { label: 'Total Inventory Value', value: 'R 0', image: '/income statement.png' },
            ].map((kpi) => (
              <div key={kpi.label} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={kpi.image} alt={kpi.label} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{kpi.value}</p>
                  <p className="text-xs text-white/80">{kpi.label}</p>
                </div>
              </div>
            ))}
          </CardSlider>
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
          <CardSlider className="mb-6">
            {[
              { title: 'Action Centre', features: ['Items needing price review (selling at a loss or break-even)', 'Items needing stock (out of stock or below reorder threshold)', 'Click any alert to jump directly to the action', 'Shows top 10 priority items with stock quantities and status'], image: '/assets report graphs .png' },
              { title: 'AI Decision Engine', features: ['Critical: out of stock with lost revenue calculation', 'Critical: only X days of stock remaining with lead time warning', 'Warning: high-margin item running low — prioritise restocking', 'Warning: overstocked — months of supply exceeds 3 months', 'Warning: stock variance detected with percentage and value', 'Success: item in good standing with healthy margin'], image: '/payroll graphs.png' },
              { title: 'Financial Impact', features: ['Quantified financial impact per AI recommendation', 'Title, detail and recommended action per alert', 'Cost-of-ignore calculation for prioritisation'], image: '/income statement.png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-6 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <ul className="space-y-1.5">
                    {card.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-2 text-[11px] text-white/80">
                        <CheckCircle2 className="h-3 w-3 text-white/60 shrink-0 mt-0.5" />
                        <span className="leading-4">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Bulk Actions + Import/Export + Image Management + Search */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardSlider>
            {[
              { title: 'Bulk Actions', features: ['Checkbox selection on the items table', 'Bulk deactivate selected items', 'Bulk mark active/inactive', 'Prevents deletion of items with stock on hand'], image: '/assets register .png' },
              { title: 'Import & Export', features: ['Import opening stock from CSV/Excel — posts to Inventory and Opening Equity', 'Import services from CSV/Excel — no stock or accounting entries', 'Template download available in the import dialog', 'Export all items to Excel, CSV or PDF'], image: '/supplier invoice .png' },
              { title: 'Image Management', features: ['Upload product images stored in Supabase Storage', 'View product images in the items table', 'Image upload dialog with error handling', 'Broken image fallback handling'], image: '/add assets form .png' },
              { title: 'Search, Filter & Pagination', features: ['Search by item name, SKU or description', 'Filter by All / Active / Inactive', 'Category filter (Parts vs Service)', 'Paginated table with page navigation', 'Real-time filtering as you type'], image: '/view transaction report.png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-6 bg-[#0052CC]">
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <ul className="space-y-1.5">
                    {card.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-start gap-2 text-[11px] text-white/80">
                        <CheckCircle2 className="h-3 w-3 text-white/60 shrink-0 mt-0.5" />
                        <span className="leading-4">{f}</span>
                      </li>
                    ))}
                  </ul>
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
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Quick Reports</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              4 reports for complete stock visibility
            </h2>
          </div>
          <CardSlider>
            {reports.map((r) => (
              <div key={r.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={r.image} alt={r.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
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
          <CardSlider className="mt-6">
            {[
              { desc: 'PostgreSQL RPC stock_transaction_engine handles all quantity updates and records stock_movements with type, quantity, unit cost and reference.', image: '/general ledger .png' },
              { desc: 'GL balance check alerts if debits do not equal credits.', image: '/trial balance .png' },
            ].map((card, i) => (
              <div key={i} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt="" className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <p className="text-xs text-white/80">{card.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
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
          <CardSlider>
            {tutorialSteps.map((step) => (
              <div key={step.num} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src="/desktop app.png" alt={step.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
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
