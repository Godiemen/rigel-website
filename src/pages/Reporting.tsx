import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play,
  FileBarChart, TrendingUp, Layers, FileText, Scale,
  BookOpen, Wallet, Calculator, ScrollText, History,
  LayoutGrid, GraduationCap,
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
    icon: FileBarChart,
    name: 'Balance Sheet (Statement of Financial Position)',
    tagline: 'IFRS-compliant as-of reporting with account drilldown, PPE schedule and trace dialog.',
    description:
      'White paper-style container with centered header showing company name, period end date and currency. Sections in classic IFRS order: Non-Current Assets (PPE, intangibles, investments), Current Assets (inventory, receivables, cash per IAS 7), Total Assets, Equity (share capital, retained earnings), Non-Current Liabilities, Current Liabilities, Total Equity and Liabilities, and Accounting Equation Check. Click any account line to open AccountDrilldown showing all ledger entries. PPE Movement Schedule button opens monthly cost, accumulated depreciation and NBV dialog.',
    features: [
      'Classic IFRS order: Non-Current Assets → Current Assets → Equity → Liabilities',
      'PPE: cost minus accumulated depreciation, with fixed_assets table fallback',
      'Cash & cash equivalents per IAS 7: bank/asset accounts minus overdrafts',
      'Retained earnings: opening + net profit – dividends – drawings',
      'Accounting equation check: Assets = Liabilities + Equity with difference display',
      'Trace dialog: click any balance to see trial balance row and monthly movements',
    ],
  },
  {
    icon: TrendingUp,
    name: 'Income Statement (Statement of Comprehensive Income)',
    tagline: 'Revenue to net profit with custom date ranges, COGS fallback and multi-month snapshots.',
    description:
      'Sections: Revenue (sales excluding interest/dividends/gains), Cost of Sales (code 50xx or name matching), Gross Profit, Other Income, Operating Expenses (excluding COGS, depreciation, tax, VAT), Depreciation & Amortisation (code 5600), Operating Profit/EBIT, Taxation (corporate income tax only — excludes VAT, donation tax, provisional), Net Profit/(Loss). Custom period override via IncomeFilterBar allows start/end dates independent of fiscal year. COGS fallback calculates from delivered invoice items if no 50xx accounts exist.',
    features: [
      'Revenue, COGS, Gross Profit, Other Income, Operating Expenses, EBIT, Tax, Net Profit',
      'Custom date range via IncomeFilterBar — independent of fiscal year',
      'COGS fallback: calculates from invoice_items with cost_price if no 50xx accounts',
      'Taxation: corporate income tax only (code 2250 or name matching)',
      'isIncomeStatementAccount() filter excludes assets, liabilities, equity, GRNI',
      'Multi-month snapshot and comparative year modes supported',
    ],
  },
  {
    icon: FileText,
    name: 'Notes to the Financial Statements (IFRS)',
    tagline: '16 numbered IFRS disclosure notes with accounting policies, PPE, receivables and directors.',
    description:
      'Scrollable document with 16 numbered note sections. Note 1: Accounting Policies (from generated_accounting_policies table, editable). Note 2: PPE (per-asset breakdown with current/prior/opening columns). Notes 3–8: Inventory, Trade Receivables, Other Receivables, Cash & Equivalents, Trade Payables, Other Payables. Notes 9–11: Revenue, COGS, Operating Expenses. Note 12: Borrowings & Finance Costs. Note 13: Investments. Note 14: Related Party Transactions (Directors Emoluments + Loan Accounts per Section 33). Notes 15–16: Taxation and Equity. Click any note heading to open focused dialog. Comparative notes mode shows Year A vs Year B side-by-side.',
    features: [
      '16 IFRS notes: Policies, PPE, Inventory, Receivables, Cash, Payables, Revenue, COGS',
      'Note 14: Directors Emoluments (KMP compensation) + Loan Accounts per Section 33',
      'Accounting Policies loaded from generated_accounting_policies table (editable)',
      'PPE note: per-asset cost, accumulated depreciation, carrying value, 3-column layout',
      'Click any note heading → opens focused dialog with that note content',
      'Comparative notes mode: Year A vs Year B side-by-side tables',
    ],
  },
  {
    icon: Layers,
    name: 'Statement of Changes in Equity',
    tagline: 'Opening retained earnings → net profit → dividends → drawings → closing.',
    description:
      'Analysis of Retained Earnings with five rows: Opening Retained Earnings (from opening trial balance equity accounts), Add: Net Profit/(Loss) for the period (from income statement calculation), Less: Dividends Declared (from dividend_payment transactions), Less: Drawings (from drawings/owner withdrawal transactions), Closing Retained Earnings (bold, bordered). Multi-month snapshot mode shows each selected month as a column with opening → profit → dividends → drawings → closing. Comparative mode renders Year A vs Year B side-by-side. Reuses BalanceSheetFilterBar for period selection.',
    features: [
      'Five rows: Opening, Net Profit, Dividends, Drawings, Closing Retained Earnings',
      'Opening: sum of equity accounts (excluding share capital) from opening TB',
      'Net profit: revenue – COGS – expenses – depreciation – tax (period-specific)',
      'Dividends: dividend_payment transaction types within period',
      'Multi-month snapshot: each month as a column with full movement',
      'Comparative mode: Year A vs Year B side-by-side',
    ],
  },
  {
    icon: Scale,
    name: 'Trial Balance',
    tagline: 'Auto-retained earnings calculation, equity transfer dialog and account drilldown.',
    description:
      'Full GL balance summary with Account Code, Name, Category, Debit and Credit columns. Totals row shows Total Debits, Total Credits, Difference and Balanced status badge. Auto-Retained Earnings Calculation rolls prior fiscal year P&L accounts into Retained Earnings (code 3900). Equity Transfer Dialog: if unbalanced, posts a plug entry to Opening Equity; if Opening Equity exists, transfers to permanent equity account (Owner Capital 3000 or Retained Earnings 3100/3200). Pinned accounts (Bank 1100, Retained Earnings 3900) always display. Category classification by account type then code prefix. Uses useTablePersistence cache for instant loading.',
    features: [
      'Auto-retained earnings: prior P&L entries rolled into code 3900',
      'Equity Transfer Dialog: plug entry or transfer to permanent equity account',
      'Pinned accounts: Bank (1100) and Retained Earnings (3900) always show',
      'Category: type first, then code prefix (1xxx=Assets, 2xxx=Liabilities, etc.)',
      'Account drilldown: click any row → ledger entries with running balance',
      'Cache: useTablePersistence with key per company/period/year/month',
    ],
  },
  {
    icon: BookOpen,
    name: 'General Ledger & Journal',
    tagline: 'Ledger tab with running balances and Journal tab with full audit trail.',
    description:
      'Two tabs: Ledger (account-level view) and Journal (transaction-level view). Ledger tab: month/year picker, account filters, table grouped by account with Opening Balance row (OB), running balance with Dr/Cr suffix based on normal balance side. Journal tab: search across description/reference/account, filters for status (posted/pending/reversed), source (auto-detected from transaction_type), transaction type, created by, balanced/unbalanced, attachments, amount range. Expandable rows showing journal lines. Status badges: posted (emerald), reversed (red), pending (amber). Export to Excel and PDF.',
    features: [
      'Ledger tab: grouped by account, opening balance row, running Dr/Cr balance',
      'Journal tab: search, status/source/type/user filters, expandable journal lines',
      'Source auto-detection: transaction_type capitalized or inferred from description',
      'Status badges: posted (emerald), reversed (red), pending (amber)',
      'Export: Excel (exportLedgerToExcel) and PDF (exportLedgerToPDF) with period label',
      'getNormalBalanceSide(): assets/expenses = Dr, liabilities/equity/revenue = Cr',
    ],
  },
  {
    icon: Wallet,
    name: 'Budget Management',
    tagline: 'Monthly budget vs actual vs variance with fiscal year alignment and real-time updates.',
    description:
      'Two tabs: Income Statement (emerald gradient) and Balance Sheet (slate gradient). 12 month columns aligned to fiscal year (March–February). Rows grouped by account type sections. View toggle: Budget / Actual / Variance. Single-month and full-year entry dialogs with pre-filled amounts. P&L actuals from transaction_entries (posted only), BS actuals from ledger_entries (cumulative). Real-time Supabase subscriptions on budgets and transactions tables auto-refresh on any change. Permission-gated: only admin and accountant can create/edit. PDF export: landscape A4 with section grouping and subtotals. Excel export with same structure.',
    features: [
      '12-month table aligned to fiscal year with Budget/Actual/Variance toggle',
      'Single-month and full-year entry dialogs with pre-filled amounts',
      'P&L actuals from transaction_entries, BS actuals from ledger_entries (cumulative)',
      'Real-time: Supabase subscriptions on budgets + transactions auto-refresh',
      'Permission-gated: only admin and accountant can create/edit budgets',
      'PDF (landscape A4) and Excel export with section grouping and subtotals',
    ],
  },
];

const hubModules = [
  { icon: FileBarChart, title: 'Balance Sheet', desc: 'Statement of Financial Position', cat: 'Financial Statements', color: 'from-emerald-400 to-emerald-600', image: '/balance sheet 1.png' },
  { icon: TrendingUp, title: 'Income Statement', desc: 'Profit & Loss Analysis', cat: 'Financial Statements', color: 'from-emerald-400 to-emerald-600', image: '/income statement.png' },
  { icon: Layers, title: 'Changes in Equity', desc: 'Analysis of Retained Earnings', cat: 'Financial Statements', color: 'from-emerald-400 to-emerald-600', image: '/changes in equity.png' },
  { icon: FileText, title: 'Notes', desc: 'Detailed IFRS Disclosures & Policies', cat: 'Financial Statements', color: 'from-emerald-400 to-emerald-600', image: '/depreciation policies .png' },
  { icon: Scale, title: 'Trial Balance', desc: 'Full GL Balance Summary', cat: 'Accounting Reports', color: 'from-slate-700 to-slate-900', image: '/trial balance .png' },
  { icon: BookOpen, title: 'General Ledger', desc: 'Detailed Account Transactions', cat: 'Accounting Reports', color: 'from-slate-700 to-slate-900', image: '/general ledger .png' },
  { icon: History, title: 'Journal History', desc: 'Audit Trail of All Entries', cat: 'Accounting Reports', color: 'from-slate-700 to-slate-900', image: '/view transaction report.png' },
  { icon: Calculator, title: 'Depreciation Schedule', desc: 'Asset Valuation & Write-offs', cat: 'Accounting Reports', color: 'from-slate-700 to-slate-900', image: '/depreciation schedule 4.png' },
  { icon: Wallet, title: 'Budget', desc: 'Financial Planning & Targets', cat: 'Planning & Disclosures', color: 'from-rose-400 to-rose-600', image: '/assets report graphs .png' },
  { icon: ScrollText, title: 'Audit Trail', desc: 'Full Activity Log & Change History', cat: 'Compliance & Audit', color: 'from-indigo-400 to-indigo-600', image: '/view transaction report.png' },
];

const ifrsNotes = [
  { num: '1', title: 'Accounting Policies', desc: 'Loaded from generated_accounting_policies table, editable, markdown bold support.' },
  { num: '2', title: 'Property, Plant & Equipment', desc: 'Per-asset breakdown: cost, accumulated depreciation, carrying value, 3-column layout.' },
  { num: '3', title: 'Inventory', desc: 'Asset accounts with "inventory" in name from trial balance.' },
  { num: '4', title: 'Trade Receivables', desc: 'Asset accounts with "trade receivable" or "accounts receivable", excluding VAT.' },
  { num: '5', title: 'Other Receivables', desc: 'Current assets not classified as trade receivables, inventory, PPE, cash or bank.' },
  { num: '6', title: 'Cash & Cash Equivalents', desc: 'Asset accounts with "cash" or "bank" per IAS 7, minus bank overdrafts.' },
  { num: '7', title: 'Trade Payables', desc: 'Liability accounts with "trade payable" or "accounts payable", excluding VAT and loans.' },
  { num: '8', title: 'Other Payables', desc: 'Liabilities not classified as trade payables, tax, or VAT.' },
  { num: '9', title: 'Revenue', desc: 'Revenue/income accounts from period trial balance.' },
  { num: '10', title: 'Cost of Sales', desc: 'COGS accounts (code 50xx or name includes "cost of"/"purchases").' },
  { num: '11', title: 'Operating Expenses', desc: 'Expense accounts excluding COGS, depreciation, and tax.' },
  { num: '12', title: 'Borrowings & Finance Costs', desc: 'Loans, borrowings, lease liabilities, overdrafts and related interest expense.' },
  { num: '13', title: 'Investments', desc: 'Financial assets held as investments (asset accounts with "investment" in name).' },
  { num: '14', title: 'Related Party Transactions', desc: 'Section 33: Directors Emoluments (KMP) + Directors Loan Accounts.' },
  { num: '15', title: 'Taxation', desc: 'Corporate income tax expense accounts only.' },
  { num: '16', title: 'Equity', desc: 'Equity accounts from as-of trial balance.' },
];

const accountingTables = [
  { table: 'chart_of_accounts', desc: 'Account definitions (code, name, type, active, normal_balance)' },
  { table: 'transactions', desc: 'Posted/approved transactions with company_id, date, type, status' },
  { table: 'transaction_entries', desc: 'Double-entry lines (account_id, debit, credit, description, status)' },
  { table: 'ledger_entries', desc: 'Posted ledger lines (flat: account_id, company_id, transaction_id)' },
  { table: 'fixed_assets', desc: 'Asset register (cost, accumulated_depreciation, asset_type, disposal)' },
  { table: 'invoices / invoice_items', desc: 'Sales data for COGS fallback calculation' },
  { table: 'budgets', desc: 'Budget records (account_id, month, year, budgeted_amount, actual)' },
  { table: 'generated_accounting_policies', desc: 'Stored accounting policy text per company/year' },
  { table: 'prior_year_adjustments', desc: 'PYA records with affected account and retained earnings' },
];

const tutorialSteps = [
  { num: '01', title: 'Open Hub', desc: 'Access the Financial Reporting Center' },
  { num: '02', title: 'Select Report', desc: 'Choose from 10 report modules' },
  { num: '03', title: 'Set Period', desc: 'Pick month, year or custom date range' },
  { num: '04', title: 'Compare', desc: 'Toggle comparative years side-by-side' },
  { num: '05', title: 'Drilldown', desc: 'Click any account for ledger detail' },
  { num: '06', title: 'Export', desc: 'Download as PDF or Excel' },
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

const REPORTING_DEMO_VIDEOS = [
  { url: 'https://youtu.be/7ElF4AOgpIw', title: 'Reporting demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/79n86L-6fNc', title: 'Reporting demo 2', desc: 'by Rigel Team' },
];

function ReportingVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Reporting demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function Reporting() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<typeof REPORTING_DEMO_VIDEOS[number] | null>(null);
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
            src="/MOQWE.jpg"
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
              <LayoutGrid className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Financial Reporting Center</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              IFRS-Compliant Statements, Trial Balance, Ledger &amp; Budget
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Generate, compare, and export full IFRS financial statements directly from your live trial balance. The IIV engine renders Balance Sheet, Income Statement, Notes to the AFS, and Changes in Equity — with monthly snapshots, comparative years, account drilldown, and one-click PDF/Excel export.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Open Reporting Hub <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white">
                View Tutorial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Reporting Hub — grid of all modules */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Reporting Hub</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Ten modules across four categories
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From IFRS statements to trial balance, ledger, budget and audit trail — all in one reporting center.
            </p>
          </div>
          <CardSlider>
            {hubModules.map((m) => (
              <div key={m.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={m.image} alt={m.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4 mb-2">{m.desc}</p>
                  <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wide">{m.cat}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Reporting demo videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Reporting module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to watch a short demo of reports and exports.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(REPORTING_DEMO_VIDEOS.length).padStart(2, '0')}
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
                  const i = Math.min(REPORTING_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
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
                setActiveVideoIndex(Math.max(0, Math.min(index, REPORTING_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {REPORTING_DEMO_VIDEOS.map((video, i) => (
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
              {REPORTING_DEMO_VIDEOS.map((_, i) => (
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
            <ReportingVideoPlayer src={playingVideo.url} />
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
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Core Modules</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Seven reporting modules in detail
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

      {/* IFRS Notes — 16 notes grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">IFRS Notes</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              16 numbered disclosure notes
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Every IFRS for SMEs disclosure requirement — from accounting policies to related party transactions.
            </p>
          </div>
          <CardSlider>
            {ifrsNotes.map((note) => (
              <div key={note.num} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src="/depreciation policies .png" alt={note.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{note.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{note.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Comparative & Multi-Month Modes */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Advanced Modes</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Comparative years & multi-month snapshots
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'Comparative Year Mode', desc: 'Toggle "Compare Years" switch with two year pickers. Renders side-by-side Year A vs Year B columns. Prior Year Adjustments fetched and applied to both affected account and retained earnings by opposite amounts — comparative balance sheet stays balanced.', features: ['Year A vs Year B side-by-side tables', 'All account codes merged — missing show zero', 'PYA adjusts account + retained earnings oppositely', 'renderTable() helper for consistent styled tables'], image: '/income statement.png' },
              { title: 'Multi-Month Snapshot Mode', desc: 'Select multiple months from a 12-month picker. Each selected month becomes a column in the report table. Per-variant loading state. Retained earnings snapshots include opening, profit, dividends, drawings, closing per month.', features: ['Each selected month becomes a report column', 'Per-variant loading state (MultiLoading)', 'Income statement: period-specific TB per month', 'Retained earnings: opening → profit → dividends → closing'], image: '/payroll graphs.png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-6 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <p className="text-xs text-white/80 leading-5 mb-3">{card.desc}</p>
                  <ul className="space-y-1.5">
                    {card.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[11px] text-white/80">
                        <CheckCircle2 className="h-3 w-3 text-white/60 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Account Drilldown & PPE Schedule */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Drilldown & Trace</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              From summary to source in one click
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'Account Drilldown', desc: 'Click any account line in Balance Sheet, Income Statement, Notes, Equity or Trial Balance to open a dialog with all ledger entries: date, reference, description, debit, credit, running balance with Dr/Cr suffix.', image: '/general ledger .png' },
              { title: 'PPE Movement Schedule', desc: 'Monthly table: opening cost, accumulated depreciation, NBV, additions, disposals, depreciation, closing. Fiscal year-aware with cache. Export to PDF (autoTable) and Excel.', image: '/depreciation schedule 4.png' },
              { title: 'Trace Dialog', desc: 'Click any balance in the Balance Sheet to see the resolved trial balance row (code, name, type, debits, credits, balance) and monthly breakdown showing the account\'s movement across each month.', image: '/trial balance .png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-6 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <p className="text-xs text-white/80 leading-5">{card.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Export System */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Export System</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              One-click PDF & Excel export
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'PDF Export', desc: 'jsPDF with autoTable. Header color #0070ad, alternating row colors, bold totals. Mode selector: Month, Compare Years, or Date Range. Per-variant export logic for Balance Sheet, Income Statement, IFRS Notes and Retained Earnings.', image: '/view transaction report.png' },
              { title: 'Excel Export', desc: 'XLSX.utils.json_to_sheet with formatted headers. Same SARS box structure for VAT, all 16 numbered notes for IFRS, monthly columns for budget. Landscape A4 for budget PDF with section grouping and subtotals.', image: '/sales by supplier .png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-6 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <p className="text-xs text-white/80 leading-5">{card.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Auto-Refresh & Real-Time */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Real-Time Sync</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Auto-refresh & in-memory cache
            </h2>
          </div>
          <CardSlider>
            {[
              { title: 'Supabase Realtime', desc: 'Subscribes to transactions, ledger_entries, fixed_assets and invoices. 1.2s debounce → background refresh. RefreshingBadge shows subtle indicator.', image: '/assets report graphs .png' },
              { title: 'In-Memory Cache', desc: 'Key: companyId:reportType:start:end. 5-min TTL for fresh data, always returns cached first for instant display. Background refresh updates silently.', image: '/general ledger .png' },
              { title: 'Unallocated Warning', desc: 'Amber alert if unallocated transactions exist. Emerald confirmation if all allocated. Displayed in all IIV statements and Trial Balance.', image: '/aging for debtors .png' },
              { title: 'Fiscal Year System', desc: 'useFiscalYear hook manages selected year, start month, date calculation. SA fiscal year: March–February. getFiscalYearDates() and getCalendarYearForFiscalPeriod() helpers.', image: '/payroll graphs.png' },
            ].map((card) => (
              <div key={card.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={card.image} alt={card.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-xs font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{card.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{card.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Data Architecture */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Data Architecture</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Supabase tables powering the reports
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Table</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Description</span>
            </div>
            {accountingTables.map((t) => (
              <div key={t.table} className="grid grid-cols-2 px-6 py-3 border-b border-slate-100 last:border-0">
                <span className="text-sm font-mono font-semibold text-emerald-600">{t.table}</span>
                <span className="text-sm text-slate-600">{t.desc}</span>
              </div>
            ))}
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
              6-step reporting guide
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Walks users through the full reporting workflow — from opening the hub to exporting statements.
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
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Generate IFRS statements from your live data
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Balance Sheet, Income Statement, Notes, Changes in Equity, Trial Balance, General Ledger and Budget — all from one reporting hub with comparative years, drilldown and PDF/Excel export.
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
