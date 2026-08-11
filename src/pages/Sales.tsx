import { useState, useEffect, useRef, type ComponentType, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Maximize2, Play,
  FileText, Receipt, Users, CreditCard, Calculator, BarChart3,
  Zap, ShieldCheck, Clock, Link2, Mail, TrendingUp,
  ShoppingCart, AlertTriangle, Landmark, RefreshCw, Upload, ClipboardList,
  ArrowLeftRight, GraduationCap, Bell,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/list of customers .png', title: 'Customer list', desc: 'View all customers with balances and payment status at a glance.' },
  { src: '/magic link for qoutes .png', title: 'Quote magic link', desc: 'Generate a secure magic link for any quote — send by email or WhatsApp.' },
  { src: '/accepting qoutes.png', title: 'Accepting quotes', desc: 'Customers review and accept quotes online without logging in.' },
  { src: '/sales order .png', title: 'Sales order', desc: 'Create detailed sales orders with line items and automatic numbering.' },
  { src: '/magic link for sales order .png', title: 'Sales order magic link', desc: 'Share sales orders via magic link for instant online acceptance.' },
  { src: '/accepting sales order .png', title: 'Accepting sales orders', desc: 'Customers accept sales orders online — converted to invoices automatically.' },
  { src: '/tax invoice .png', title: 'Tax invoice', desc: 'SARS-compliant tax invoices with VAT breakdown and branding.' },
  { src: '/tax invoice temeplete.png', title: 'Tax invoice template', desc: 'Customise invoice templates with your logo, colours and banking details.' },
  { src: '/processing credit note .png', title: 'Credit note', desc: 'Issue credit notes for returns and adjustments with full audit trail.' },
  { src: '/debtors control .png', title: 'Debtors control', desc: 'Track outstanding receivables and customer balances in real time.' },
  { src: '/aging for debtors .png', title: 'Aged debtors', desc: '30/60/90/120-day ageing analysis to prioritise follow-ups.' },
  { src: '/customer statement .png', title: 'Customer statement', desc: 'Generate professional statements of account per customer.' },
  { src: '/account reciable dash board .png', title: 'AR dashboard', desc: 'Accounts receivable dashboard with KPIs and collection insights.' },
];

const avatarGradients = [
  'from-emerald-400 to-teal-600',
  'from-blue-400 to-indigo-600',
  'from-amber-400 to-orange-600',
  'from-purple-400 to-pink-600',
  'from-cyan-400 to-blue-600',
  'from-rose-400 to-red-600',
  'from-lime-400 to-green-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-cyan-600',
  'from-fuchsia-400 to-pink-600',
];

function CardSlider({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 flex gap-2">
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
        className={`flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

function CardAvatar({ icon: Icon, index, label }: { icon: ComponentType<{ className?: string }>; index: number; label?: string }) {
  const gradient = avatarGradients[index % avatarGradients.length];
  return (
    <div className={`relative h-20 bg-gradient-to-br ${gradient} overflow-hidden rounded-t-xl`}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }} />
      <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/10" />
      <div className="absolute -left-3 -bottom-6 h-14 w-14 rounded-full bg-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-9 w-9 text-white drop-shadow-sm" />
      </div>
      <span className="absolute top-2 right-2.5 text-[10px] font-mono font-bold text-white/60">
        {label ?? String(index + 1).padStart(2, '0')}
      </span>
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

const SALES_DEMO_VIDEOS = [
  { url: 'https://youtu.be/95Qn83PR3G4', title: 'Sales demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/qra2AII4r1Q', title: 'Sales demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/YJsZN2XwN8c', title: 'Sales demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/xgYsgYLwyHA', title: 'Sales demo 4', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/9ykroNunh8M', title: 'Sales demo 5', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/XSTp3kfM5qg', title: 'Sales demo 6', desc: 'by Rigel Team' },
];

function SalesVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Sales demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

type Section = {
  icon: typeof FileText;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const sections: Section[] = [
  {
    icon: FileText,
    name: 'Quotes & Estimates',
    tagline: 'Create branded quotes that customers can accept online in one click.',
    description:
      'Build professional quotes with line items, discounts and automatic numbering. Send a secure magic link via email or WhatsApp so customers can review, accept or decline online — no login required. Accepted quotes convert to invoices with a single click.',
    features: [
      'Branded quote templates with line items and discounts',
      'Automatic quote numbering and sequential tracking',
      'Secure magic link — customers accept or decline online',
      'Email or WhatsApp quotes directly from the app',
      'One-click conversion from accepted quote to invoice',
      'Track acceptance status and response history',
    ],
  },
  {
    icon: Receipt,
    name: 'Invoicing',
    tagline: 'Professional tax invoices with recurring billing, credit notes and multi-currency.',
    description:
      'Generate SARS-compliant tax invoices with your branding, banking details and VAT breakdown. Set up recurring invoices for repeat customers, issue credit notes for returns, and produce delivery notes — all with automatic numbering and multi-currency support.',
    features: [
      'Professional branded tax invoices with VAT breakdown',
      'Recurring invoices for repeat billing cycles',
      'Credit notes for returns and adjustments',
      'Delivery notes linked to sales orders',
      'Multi-currency support with exchange rate tracking',
      'Automatic invoice numbering and sequential audit trail',
    ],
  },
  {
    icon: Users,
    name: 'Customer Management',
    tagline: 'Complete customer profiles with contact details, VAT info and sales history.',
    description:
      'Maintain a central customer database with contact information, VAT registration numbers, payment terms and full sales history. View outstanding balances, generate statements of account and track every interaction — from first quote to final payment.',
    features: [
      'Customer profiles with contact and VAT details',
      'Full sales history per customer — quotes, orders, invoices',
      'Outstanding balance and overdue tracking at a glance',
      'Customer statement of account generation',
      'Payment terms and credit limit management',
      'Customer ageing and payment behaviour insights',
    ],
  },
  {
    icon: CreditCard,
    name: 'Payments & Magic Links',
    tagline: 'Generate secure magic payment links — customers pay online without logging in.',
    description:
      'Create one-time or reusable magic links for any invoice or sales order. Email or WhatsApp the link to your customer — they view and pay online without creating an account. Rigel automatically allocates payments to the correct invoice and updates the balance in real time.',
    features: [
      'Generate secure one-time or reusable magic payment links',
      'Email or WhatsApp links directly from the app',
      'Customers view and pay online — no login or account needed',
      'Automatic payment allocation to the correct invoice',
      'Real-time balance updates after payment received',
      'Payment confirmation sent to customer and business',
    ],
  },
  {
    icon: Calculator,
    name: 'VAT & SARS Compliance',
    tagline: 'VAT output on every invoice with VAT201 return preparation built in.',
    description:
      'Every invoice automatically calculates output VAT at the correct rate. Rigel generates tax-compliant invoices that meet SARS requirements, prepares VAT201 return data from your sales transactions, and handles export invoice VAT treatment correctly.',
    features: [
      'Automatic output VAT calculation on every invoice',
      'SARS-compliant tax invoice format with VAT breakdown',
      'VAT201 return preparation from sales transaction data',
      'Export invoice handling with zero-rated VAT treatment',
      'VAT period tracking aligned to your filing cycle',
      'Complete VAT audit trail for SARS reviews',
    ],
  },
  {
    icon: BarChart3,
    name: 'Debtors & Reporting',
    tagline: 'Aged debtors, overdue reminders and sales reports for better cash flow.',
    description:
      'Track who owes you money with aged debtors reports, send automated overdue reminders, and analyse sales by customer or product. Rigel gives you full visibility over receivables so you can follow up on time, write off bad debt when needed, and keep cash flow healthy.',
    features: [
      'Aged debtors report with 30/60/90/120-day breakdowns',
      'Automated overdue invoice reminder emails',
      'Sales by customer and sales by product reports',
      'Payment tracking and receipt allocation',
      'Bad debt write-off with audit trail',
      'Accounts receivable dashboard with KPIs',
    ],
  },
];

const benefits = [
  { icon: Zap, title: 'Get paid faster', desc: 'Magic links let customers pay instantly — no logins, no friction, no delays.' },
  { icon: Link2, title: 'Magic link payments', desc: 'Send secure payment links by email or WhatsApp. Customers pay online in seconds.' },
  { icon: ShieldCheck, title: 'SARS-compliant', desc: 'Tax invoices and VAT calculations aligned to South African requirements.' },
  { icon: Clock, title: 'Save hours per week', desc: 'Automated numbering, recurring invoices and payment reminders do the admin for you.' },
  { icon: TrendingUp, title: 'Full sales visibility', desc: 'Aged debtors, sales by customer and product reports for better decisions.' },
  { icon: Mail, title: 'Automated reminders', desc: 'Overdue invoice emails sent automatically so you never miss a follow-up.' },
];

const reports = [
  { icon: BarChart3, title: 'Debtors Control Report', desc: 'Detailed debtors ageing with customer breakdown.' },
  { icon: TrendingUp, title: 'AR Dashboard', desc: 'Full AR analytics with interactive charts and KPIs.' },
  { icon: FileText, title: 'Accounts Receivable Report', desc: 'AR summary and working papers for accountants.' },
  { icon: ClipboardList, title: 'Debtors Control Working Paper', desc: 'Reconciliation working paper for audit trails.' },
  { icon: Users, title: 'Debtors Per Customer Report', desc: 'Per-customer outstanding balances and history.' },
  { icon: CreditCard, title: 'Payment Report', desc: 'History of all customer payments with allocations.' },
  { icon: TrendingUp, title: 'AR Cash Flow Forecast', desc: 'Projected AR cash inflows by period.' },
  { icon: Users, title: 'Customer List Report', desc: 'All customers and their current balances.' },
  { icon: ShoppingCart, title: 'Sales by Item Report', desc: 'Sales history analysis by inventory item.' },
  { icon: Users, title: 'Sales by Customer Report', desc: 'Revenue analysis per customer with trends.' },
  { icon: ArrowLeftRight, title: 'Credit Note Report', desc: 'Summary of credit notes and returns processed.' },
  { icon: FileText, title: 'Customer Statement', desc: 'Printable customer account statement with transaction history.' },
];

const tutorialSteps = [
  { num: '01', title: 'Overview', desc: 'Introduction to the Sales module' },
  { num: '02', title: 'Customers', desc: 'Create and manage customer profiles' },
  { num: '03', title: 'Quotes', desc: 'Create and send branded quotes' },
  { num: '04', title: 'Sales Orders', desc: 'Manage sales orders and magic links' },
  { num: '05', title: 'Invoices', desc: 'Generate tax invoices and credit notes' },
  { num: '06', title: 'Magic Links', desc: 'Send secure payment links to customers' },
  { num: '07', title: 'Payments', desc: 'Process and allocate customer payments' },
  { num: '08', title: 'Returns', desc: 'Handle credit notes and returns' },
  { num: '09', title: 'Reconciliation', desc: 'Match customer payments to invoices' },
  { num: '10', title: 'Reports', desc: 'Generate AR and debtors reports' },
  { num: '11', title: 'Complete', desc: 'You are ready to manage sales' },
];

const accountingEntries = [
  { action: 'Customer Invoice', debit: 'Accounts Receivable', credit: 'Revenue (Output VAT if applicable)' },
  { action: 'Customer Payment', debit: 'Bank / Cash', credit: 'Accounts Receivable' },
  { action: 'Credit Note / Return', debit: 'Revenue / Output VAT', credit: 'Accounts Receivable' },
  { action: 'Magic Link Payment', debit: 'Bank / Cash', credit: 'Accounts Receivable' },
];

function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
}: {
  section: Section;
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
              ? 'bg-[#0F9D6C] text-white scale-110'
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

export function Sales() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<typeof SALES_DEMO_VIDEOS[number] | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoSliderRef = useRef<HTMLDivElement>(null);

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
            src="/3QRJb.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <Receipt className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Sales Management</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Your sales and invoicing command centre
            </h1>
            <p className="text-lg text-slate-600 leading-8 mb-8 max-w-lg">
              Quote, invoice and get paid faster — manage customers, quotes, sales orders, tax invoices, magic link payments and full accounts receivable in one integrated module.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 px-7 font-semibold text-slate-700">
                See sales in action
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module overview — 4 pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Four pillars of sales
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Everything from customer onboarding to payment collection — integrated with your general ledger.
            </p>
          </div>
          <CardSlider>
            {[
              { icon: Users, title: 'Customers', desc: 'Profiles, VAT details, payment terms and sales history.' },
              { icon: FileText, title: 'Quotes & Orders', desc: 'Branded quotes, sales orders, magic link acceptance.' },
              { icon: Receipt, title: 'Tax Invoices', desc: 'SARS-compliant invoices, credit notes, recurring billing.' },
              { icon: CreditCard, title: 'Payments', desc: 'Magic link payments, auto-allocation, real-time balances.' },
            ].map((p, i) => (
              <div key={p.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={p.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{p.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Magic link highlight */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-[#0F9D6C] text-white flex items-center justify-center shrink-0">
              <Link2 className="h-7 w-7" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Magic Link Payments — no login required
              </h2>
              <p className="text-sm lg:text-base text-slate-600 leading-7">
                Generate a secure payment link for any invoice or sales order. Email it, WhatsApp it — your customer clicks, views and pays online instantly. Rigel allocates the payment automatically.
              </p>
            </div>
            <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-11 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-6 font-semibold text-white text-sm shrink-0">
              Try it free <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {false && (
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Sales management, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From customer lists to magic link payments, tax invoices and aged debtors — explore the actual Rigel Business sales interface.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { label: 'All', filter: 'all' },
              { label: 'Quotes & Orders', filter: 'quotes' },
              { label: 'Invoices', filter: 'invoices' },
              { label: 'Debtors', filter: 'debtors' },
            ].map((tab) => (
              <button
                key={tab.filter}
                onClick={() => {
                  setActiveTab(tab.filter);
                  if (tab.filter === 'all') {
                    setLightbox(0);
                  } else {
                    const filtered = screenshots
                      .map((s, i) => {
                        if (tab.filter === 'quotes' && (s.title.includes('quote') || s.title.includes('Quote') || s.title.includes('Sales order') || s.title.includes('Accepting'))) return i;
                        if (tab.filter === 'invoices' && (s.title.includes('Tax invoice') || s.title.includes('Credit note') || s.title.includes('invoice'))) return i;
                        if (tab.filter === 'debtors' && (s.title.includes('Debtors') || s.title.includes('Aged') || s.title.includes('Customer') || s.title.includes('AR'))) return i;
                        return -1;
                      })
                      .filter((i) => i >= 0);
                    setLightbox(filtered[0] ?? 0);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  activeTab === tab.filter
                    ? 'bg-[#0F9D6C] text-white border-[#0F9D6C]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Featured carousel */}
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
                {/* Expand hint */}
                <div className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4 text-slate-700" />
                </div>
                {/* Gradient overlay with info */}
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
            <div className="flex lg:flex-col gap-2 lg:gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[460px] pb-2 lg:pb-0 scrollbar-thin">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.title}
                  onClick={() => setLightbox(i)}
                  className={`relative shrink-0 w-32 lg:w-full overflow-hidden rounded-xl border-2 transition-all duration-200 text-left ${
                    lightbox === i
                      ? 'border-[#0F9D6C] shadow-md'
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
                    <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-[#0F9D6C] flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>)}

      {false && (
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

            {/* Nav arrows on sides */}
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

                {/* Progress dots */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        lightbox === i ? 'w-6 bg-[#0F9D6C]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
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
                    className="flex-1 h-11 rounded-lg bg-[#0F9D6C] hover:bg-[#0B7A52] text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales demo videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Sales module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to watch a short demo of quoting, invoicing and getting paid.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(SALES_DEMO_VIDEOS.length).padStart(2, '0')}
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
                  const i = Math.min(SALES_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
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
                setActiveVideoIndex(Math.max(0, Math.min(index, SALES_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {SALES_DEMO_VIDEOS.map((video, i) => (
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
                        <Play className="h-7 w-7 text-[#0F9D6C] ml-1" fill="#0F9D6C" />
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
              {SALES_DEMO_VIDEOS.map((_, i) => (
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
                  className={`h-2 rounded-full transition-all ${i === activeVideoIndex ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
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
            <SalesVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Accordion */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Sales Features</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Everything you need to sell and collect
            </h2>
          </div>
          <div className="space-y-3">
            {sections.map((sec, i) => (
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

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Why Rigel Business Sales?</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Close sales faster and get paid on time
            </h2>
          </div>
          <CardSlider>
            {benefits.map((b, i) => (
              <div key={b.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={b.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{b.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* AR Dashboard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">AR Dashboard</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Real-time accounts receivable at a glance
            </h2>
          </div>
          <CardSlider className="mb-8">
            {[
              { label: 'Unpaid Invoices', value: 'R 0', icon: FileText, color: 'text-amber-600' },
              { label: 'Overdue Invoices', value: 'R 0', icon: AlertTriangle, color: 'text-red-600' },
              { label: 'Paid Invoices', value: 'R 0', icon: CheckCircle2, color: 'text-emerald-600' },
              { label: 'Total Outstanding', value: 'R 0', icon: TrendingUp, color: 'text-blue-600' },
            ].map((kpi, i) => (
              <div key={kpi.label} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={kpi.icon} index={i} label="ZAR" />
                <div className="p-5">
                  <p className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{kpi.value}</p>
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                </div>
              </div>
            ))}
          </CardSlider>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AR Ageing Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Current (0-30)', pct: 50, color: 'bg-emerald-500' },
                  { label: '31-60 days', pct: 22, color: 'bg-amber-500' },
                  { label: '61-90 days', pct: 16, color: 'bg-orange-500' },
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
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Collected vs Outstanding</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-r-transparent border-b-transparent rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">72%</p>
                      <p className="text-[10px] text-slate-400">Collected</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-xs text-slate-600">Collected</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="text-xs text-slate-600">Outstanding</span></div>
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
              Intelligent alerts that prioritise collection
            </h2>
          </div>
          <CardSlider>
            {[
              { icon: FileText, title: 'Unpaid Invoices', desc: 'Invoices awaiting payment from customers.', color: 'amber' },
              { icon: AlertTriangle, title: 'Overdue Invoices', desc: 'Invoices past their due date — follow up now.', color: 'red' },
              { icon: Users, title: 'Customers with Balances', desc: 'Customers with outstanding receivables.', color: 'orange' },
              { icon: FileText, title: 'Pending Quotes', desc: 'Quotes sent but not yet accepted or declined.', color: 'blue' },
              { icon: Bell, title: 'Payment Reminders', desc: 'Automated reminder emails scheduled for overdue invoices.', color: 'purple' },
              { icon: Landmark, title: 'GL Imbalance', desc: 'Debits do not equal credits — investigate.', color: 'red' },
            ].map((alert, i) => (
              <div key={alert.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={alert.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{alert.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{alert.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-100 p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#0F9D6C] text-white flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AI-Powered Insights</h3>
              <p className="text-sm text-slate-600 leading-6">Smart messages prioritise your actions — telling you which invoices to chase, which customers to follow up with, and when cash inflow is projected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Payments & Banking */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Payments & Banking</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Integrated customer payments
            </h2>
          </div>
          <CardSlider>
            {[
              { icon: CreditCard, title: 'Magic Link Payments', desc: 'Generate secure one-time or reusable links. Customers pay online without logging in.' },
              { icon: Landmark, title: 'Banking Integration', desc: 'Allocate bank and cash transactions to customer invoices from the Banking module.' },
              { icon: Link2, title: 'Email & WhatsApp', desc: 'Send payment links directly by email or WhatsApp — customers click and pay instantly.' },
              { icon: RefreshCw, title: 'Auto-Allocation', desc: 'Payments are automatically allocated to the correct invoice with real-time balance updates.' },
            ].map((item, i) => (
              <div key={item.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={item.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{item.desc}</p>
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
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Reports Suite</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              12 reports for complete AR visibility
            </h2>
          </div>
          <CardSlider>
            {reports.map((r, i) => (
              <div key={r.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={r.icon} index={i} />
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{r.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Customer Reconciliation + Recurring Invoices + CSV Import + Invoice Management */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardSlider>
            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={ClipboardList} index={0} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Customer Reconciliation</h3>
                <ul className="space-y-2">
                  {['Match customer payments against system records', 'Identify discrepancies between deposits and invoices', 'Reconciliation working paper for audit trails'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={RefreshCw} index={1} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Recurring Invoices</h3>
                <ul className="space-y-2">
                  {['Set up recurring customer invoices — monthly, quarterly, annually', 'Auto-generation of invoices on schedule', 'Edit or pause recurring templates anytime'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={Upload} index={2} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>CSV Import</h3>
                <ul className="space-y-2">
                  {['Bulk import customers from CSV', 'Bulk import quotes and sales orders from CSV', 'Template download and validation'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={FileText} index={3} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Invoice Management</h3>
                <ul className="space-y-2">
                  {['Full lifecycle: Draft → Sent → Paid → Cancelled/Credited', 'Approval workflow and bulk actions (send, cancel)', 'Invoice ageing and due date tracking'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardSlider>
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
              Walks users through the entire Sales module — from overview to completion.
            </p>
          </div>
          <CardSlider>
            {tutorialSteps.map((step, i) => (
              <div key={step.num} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={GraduationCap} index={i} label={step.num} />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{step.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Start invoicing smarter
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Send your first branded quote, generate a magic payment link and watch your customers pay online — all in your 7-day free trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white">
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
