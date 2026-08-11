import { useState, useEffect, useRef, type ReactNode, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play, Landmark, PieChart,
  TrendingUp, Wallet, Calendar, RefreshCw,
  ShieldCheck, Download, BarChart3,
  Coins, Percent, ArrowLeftRight,
  GraduationCap, BookOpen,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

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

const INVESTMENT_DEMO_VIDEOS = [
  { url: 'https://youtu.be/Ueamy35tjBM', title: 'Investment demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/GSD8DNM7lqE', title: 'Investment demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/HBGaPYna51A', title: 'Investment demo 3', desc: 'by Rigel Team' },
];

function InvestmentVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Investment demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

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

type AccordionSection = {
  icon: typeof Landmark;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const moduleTabs = [
  { icon: Landmark, title: 'Fixed Deposits', desc: 'FD positions with principal, accrued interest, book value and maturity.', color: 'from-emerald-400 to-emerald-600' },
  { icon: TrendingUp, title: 'Buy Share', desc: 'Share/equity positions with symbol, broker, avg cost and market value.', color: 'from-emerald-400 to-emerald-600' },
  { icon: BookOpen, title: 'History', desc: 'Transaction history with type, price, total, source and status.', color: 'from-slate-700 to-slate-900' },
  { icon: Calendar, title: 'Month-End', desc: 'Run month-end, view variance and export logs.', color: 'from-slate-700 to-slate-900' },
  { icon: ArrowLeftRight, title: 'Clearing Status', desc: 'Investment clearing balances and bank allocations.', color: 'from-indigo-400 to-indigo-600' },
];

const addMenu = [
  { title: 'New Fixed Deposit', desc: 'Create a new FD with term, rate and institution.' },
  { title: 'Opening FD (CSV)', desc: 'Bulk import fixed deposits from CSV.' },
  { title: 'Opening FD (Form)', desc: 'Manual opening balance form.' },
  { title: 'Buy Share', desc: 'Record a share purchase.' },
  { title: 'Record Sell', desc: 'Record a share sale with realized gain/loss.' },
  { title: 'Record Dividend', desc: 'Record dividend income.' },
  { title: 'Record Interest', desc: 'Record interest income or accrual.' },
  { title: 'Opening Share Balance', desc: 'CSV or form-based share opening balances.' },
];

const systemAccounts = [
  { code: '1460', name: 'INVESTMENT_CLEARING', desc: 'Clearing account for buy/sell pending bank allocation.' },
  { code: '1350/1470', name: 'ACCRUED_INTEREST', desc: 'Receivable for FD interest accruals.' },
  { code: '1440', name: 'Short-term Investments', desc: 'Current asset classification.' },
  { code: '1920', name: 'Long-term Investments', desc: 'Non-current asset classification.' },
  { code: '3900', name: 'Opening Balance Equity', desc: 'Contra for opening balance postings.' },
  { code: '4205', name: 'Dividend Income', desc: 'Revenue for dividend income.' },
  { code: '4200', name: 'Interest Income', desc: 'Revenue for interest income.' },
  { code: '1100', name: 'Bank - Current', desc: 'Bank account for cash receipts.' },
];

const accordionSections: AccordionSection[] = [
  {
    icon: TrendingUp,
    name: 'Buy Share & Fixed Deposits',
    tagline: 'Record purchases with journal preview, classification and clearing entries.',
    description:
      'Buy Share and New FD dialogs collect account, classification (current/non-current), broker/funding bank, trade date, symbol, quantity, price or principal. The system posts a balanced journal: Dr Short-term/Long-term Investments (1440/1920) / Cr Investment Clearing (1460). Classification is automatically set by term for FDs: ≤ 12 months = current, > 12 = non-current. The position is updated with recalculated avg_cost, quantity and market_value.',
    features: [
      'Journal preview before posting: Dr Investments / Cr Investment Clearing',
      'Auto classification for FDs by term (≤ 12m current, > 12m non-current)',
      'Updates investment_positions (quantity, avg_cost, market_value, broker)',
      'Investment_transactions audit log inserted for every buy',
      'Increase position: recalculates avg_cost in-place without duplicate rows',
    ],
  },
  {
    icon: ArrowLeftRight,
    name: 'Sell Share & FD Maturity',
    tagline: 'Realized gain/loss on sell; maturity journals for FD redemption.',
    description:
      'Sell Share fetches current position (avg_cost, quantity), computes cost basis and gain/loss, then posts: Dr Investment Clearing (1460) for gross, Cr Investment Asset (1440/1920) for cost, plus Cr Realized Gain or Dr Realized Loss. Redeem FD posts: Dr Investment Clearing (1460) / Cr Investment Asset (1920) for principal + Cr Accrued Interest Receivable (1470) for accrued interest. In both cases the bank allocation happens later via the Banking module.',
    features: [
      'Realized gain/loss computed as gross proceeds minus cost basis',
      'Position quantity and avg_cost recalculated after sell',
      'FD maturity: principal and accrued interest cleared to Investment Clearing',
      'Bank allocation deferred to Banking module for full reconciliation',
      'No direct bank balance change on buy/sell/maturity',
    ],
  },
  {
    icon: Coins,
    name: 'Dividend & Interest',
    tagline: 'Track dividend income and interest accruals with duplicate prevention.',
    description:
      'Record Dividend posts Dr Bank (1100) / Cr Dividend Income (4205) and updates the selected bank balance. Record Interest supports two modes: for FDs it records an estimated accrual as an investment_transaction only (no GL), which posts later when the bank transaction is allocated as Investment Interest. Cash mode posts Dr Bank / Cr Interest Income immediately. Duplicate prevention checks existing interest records for the same account/symbol/month before posting.',
    features: [
      'Dividend: Dr Bank / Cr Dividend Income + bank balance update',
      'FD interest accrual: estimated record only, GL on bank allocation',
      'Cash interest: immediate Dr Bank / Cr Interest Income',
      'Monthly duplicate prevention for interest postings',
      'Maturity value: principal × (1 + rate × termMonths / 12)',
    ],
  },
  {
    icon: RefreshCw,
    name: 'Month-End & Reconciliation',
    tagline: 'Automated month-end accrual and statement-vs-system reconciliation.',
    description:
      'Run Month-End triggers the Supabase RPC post_company_investment_month_end, which posts accrued interest for all FDs and writes month-end logs. The combined variance table shows estimated vs actual interest, variance % and status (awaiting / flagged / matched). Reconciliation lets users enter their own statement figures for opening, interest, payments and closing, compares to system balances, and saves the record to investment_reconciliations.',
    features: [
      'post_company_investment_month_end RPC posts accrued interest and logs',
      'Variance table: estimated vs bank actual, variance %, status filters',
      'Reconciliation: opening, interest, payments, closing — system vs statement',
      'Color-coded variance: green matching, blue positive, red negative',
      'All records persisted; no GL posted from reconciliation',
    ],
  },
  {
    icon: BarChart3,
    name: 'Visual Dashboard & Metrics',
    tagline: 'KPI cards, pie/bar charts and interest income summary.',
    description:
      'The FD Visual Dashboard shows Total Principal, Avg Rate, Monthly Interest and Peak Maturity month. Recharts-powered Pie chart exposes principal concentration by institution; Bar chart shows maturity profile by month. The Interest & Income table filters by date range and source (estimated / bank_actual / all) with columns for date, type, symbol, source and amount. Metrics include Total Investment Value, Total Unrealized Gain, Dividends YTD and Interest YTD.',
    features: [
      'KPI cards: Total Principal, Avg Rate, Monthly Interest, Peak Maturity',
      'Pie chart: principal concentration by institution',
      'Bar chart: maturity profile by month',
      'Interest & Income table with source filter (estimated / bank_actual)',
      'YTD dividends and interest aggregated by fiscal year',
    ],
  },
  {
    icon: Download,
    name: 'CSV Import & Export',
    tagline: '3-step CSV wizard plus Excel, CSV and PDF exports.',
    description:
      'FD CSV import supports Symbol, Principal, InterestRate, TermMonths, StartDate columns with upload, preview and import steps. Share CSV import supports Symbol, Quantity, AvgCost, CurrentPrice. Position exports to Excel, CSV and PDF with styled headers, alternating rows and color-coded status (green active, red sold/redeemed). Transaction and month-end exports use DownloadDropdown with configurable columns.',
    features: [
      'FD CSV template: Symbol, Principal, InterestRate, TermMonths, StartDate',
      'Share CSV template: Symbol, Quantity, AvgCost, CurrentPrice',
      '3-step wizard: upload, editable preview, import with progress console',
      'Position exports: Excel, CSV, PDF with professional headers and footers',
      'Transaction & month-end DownloadDropdown exports',
    ],
  },
];

const journalPreviews = [
  { action: 'Buy Share / New FD', debit: 'Short-term/Long-term Investments (1440/1920)', credit: 'Investment Clearing (1460)' },
  { action: 'Sell Share (gain)', debit: 'Investment Clearing (1460)', credit: 'Investments (cost) + Realized Gain' },
  { action: 'Sell Share (loss)', debit: 'Investment Clearing (1460) + Realized Loss', credit: 'Investments (cost)' },
  { action: 'Record Dividend', debit: 'Bank (1100)', credit: 'Dividend Income (4205)' },
  { action: 'Record Interest (cash)', debit: 'Bank (1100)', credit: 'Interest Income (4200)' },
  { action: 'FD Maturity', debit: 'Investment Clearing (1460)', credit: 'Investments (principal) + Accrued Interest (1470)' },
  { action: 'Opening Balance', debit: 'Long-term Investments (1920)', credit: 'Opening Balance Equity (3900)' },
];

const accountingPrinciples = [
  { title: 'Pending → Posted Pattern', desc: 'Transactions inserted as pending, then entries/ledger posted, then status updated via updateWithVersionCheck.' },
  { title: 'Investment Clearing (1460)', desc: 'All buys/sells flow through clearing. Bank allocation in Banking module clears it.' },
  { title: 'FD Interest Accrual', desc: 'Estimated interest is recorded only; actual GL posts when bank is allocated as Investment Interest.' },
  { title: 'Classification', desc: 'Positions are current (≤ 12m) or non-current (> 12m), posting to 1440 or 1920.' },
  { title: 'Realized Gains/Losses', desc: 'Sell proceeds minus cost basis posts to Realized Gain or Loss.' },
  { title: 'Duplicate Prevention', desc: 'Interest postings check for existing same month/symbol/account records.' },
];

const tutorialSteps = [
  { num: '01', title: 'Open Module', desc: 'Access Investment Management' },
  { num: '02', title: 'Add FD / Share', desc: 'Create or import positions' },
  { num: '03', title: 'Record Income', desc: 'Log dividends and interest' },
  { num: '04', title: 'Run Month-End', desc: 'Post accrued interest and review variance' },
  { num: '05', title: 'Reconcile', desc: 'Match statement to system balances' },
  { num: '06', title: 'Export', desc: 'Download positions, transactions or logs' },
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

export function Investments() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<typeof INVESTMENT_DEMO_VIDEOS[number] | null>(null);
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_h5kk1uh5kk1uh5kk.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <PieChart className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Investment Management</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Track Fixed Deposits &amp; Share Portfolios
            </h1>
            <p className="text-lg text-slate-600 leading-8 mb-8 max-w-lg">
              Manage the full investment lifecycle — from acquisition and interest accrual through disposal, reconciliation and month-end processing — with automatic double-entry accounting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 px-7 font-semibold text-slate-700">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module Tabs Overview */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Five tabs, one investment command center
            </h2>
          </div>
          <CardSlider>
            {moduleTabs.map((m, i) => (
              <div key={m.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={m.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{m.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Add Menu */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Quick Actions</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Add menu — 8 actions
            </h2>
          </div>
          <CardSlider>
            {addMenu.map((item, i) => (
              <div key={item.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={ArrowRight} index={i} label={String(i + 1).padStart(2, '0')} />
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Core Tables */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Data Model</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Core Supabase tables
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { table: 'investment_accounts', desc: 'Portfolio accounts (Fixed Deposit, Share Portfolio, broker).' },
              { table: 'investment_positions', desc: 'Holdings per account/symbol with quantity, avg_cost, current_price, market_value.' },
              { table: 'investment_transactions', desc: 'Transaction log: buy, sell, dividend, interest, fixed_deposit.' },
              { table: 'investment_reconciliations', desc: 'Saved reconciliation records with period, system vs statement balances.' },
              { table: 'investment_month_end_auto_run_log', desc: 'Logs from post_company_investment_month_end RPC.' },
              { table: 'transactions / ledger_entries', desc: 'Double-entry GL transactions and flat posted ledger lines.' },
            ].map((t) => (
              <div key={t.table} className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-emerald-600 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{t.table}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Accounts */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">System Accounts</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Pre-configured GL accounts
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Code</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Name</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Purpose</span>
            </div>
            {systemAccounts.map((a) => (
              <div key={a.code} className="grid grid-cols-3 px-6 py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm font-mono text-emerald-600">{a.code}</span>
                <span className="text-sm font-semibold text-slate-900">{a.name}</span>
                <span className="text-sm text-slate-500">{a.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion — Transaction Workflows */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Workflows</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Full investment lifecycle
            </h2>
          </div>
          <div className="space-y-3">
            {accordionSections.map((sec, i) => (
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

      {/* Journal Previews */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Entries</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Automatic double-entry for every action
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Action</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Debit</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Credit</span>
            </div>
            {journalPreviews.map((entry) => (
              <div key={entry.action} className="grid grid-cols-3 px-6 py-4 border-b border-slate-100 last:border-0">
                <span className="text-sm font-semibold text-slate-900">{entry.action}</span>
                <span className="text-sm text-emerald-600">{entry.debit}</span>
                <span className="text-sm text-blue-600">{entry.credit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Dashboard / Metrics */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Insights</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Visual dashboard & KPIs
            </h2>
          </div>
          <CardSlider className="mb-8">
            {[
              { label: 'Total Investment Value', icon: Wallet, desc: 'Sum of market values / book values across all positions.' },
              { label: 'Total Unrealized Gain', icon: TrendingUp, desc: 'Sum of unrealized_gain across positions.' },
              { label: 'Dividends YTD', icon: Coins, desc: 'Dividend transactions in current fiscal year.' },
              { label: 'Interest YTD', icon: Percent, desc: 'Interest transactions in current fiscal year.' },
            ].map((k, i) => (
              <div key={k.label} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={k.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{k.label}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{k.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
          <CardSlider>
            {[
              { icon: PieChart, title: 'Principal by Institution', desc: 'Recharts pie chart showing FD exposure concentration across banks and institutions.' },
              { icon: BarChart3, title: 'Maturity Profile', desc: 'Recharts bar chart showing principal maturities grouped by month over the fiscal year.' },
            ].map((card, i) => (
              <div key={card.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={card.icon} index={i} />
                <div className="p-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{card.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Key Accounting Principles */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Principles</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Built on sound double-entry rules
            </h2>
          </div>
          <CardSlider>
            {accountingPrinciples.map((p, i) => (
              <div key={p.title} className="card-lift shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={ShieldCheck} index={i} />
                <div className="p-5">
                  <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{p.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Investment demo videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Investments module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to watch a short investment demo.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(INVESTMENT_DEMO_VIDEOS.length).padStart(2, '0')}
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
                  const i = Math.min(INVESTMENT_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
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
                setActiveVideoIndex(Math.max(0, Math.min(index, INVESTMENT_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {INVESTMENT_DEMO_VIDEOS.map((video, i) => (
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
              {INVESTMENT_DEMO_VIDEOS.map((_, i) => (
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
            <InvestmentVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Tutorial */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Built-in Tutorial</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              6-step investment guide
            </h2>
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
            Manage investments with confidence
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Fixed deposits, shares, dividends, interest accruals and month-end processing — all posting to the GL with automatic realized and unrealized gain tracking.
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
