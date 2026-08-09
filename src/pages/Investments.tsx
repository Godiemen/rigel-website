import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, Landmark, PieChart,
  TrendingUp, Wallet, Calendar, RefreshCw,
  ShieldCheck, Download, BarChart3,
  Coins, Percent, ArrowLeftRight,
  GraduationCap, BookOpen,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220]/90 via-[#0B1F1A]/85 to-[#0B1220]/90" />
          <div className="absolute inset-0">
            <div className="absolute top-[10%] left-[5%] h-[400px] w-[400px] bg-[#1BA37B]/15 blur-[100px] rounded-full" />
            <div className="absolute bottom-[5%] right-[10%] h-[350px] w-[350px] bg-[#1BA37B]/10 blur-[90px] rounded-full" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <PieChart className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Investment Management</span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Track Fixed Deposits & Share Portfolios
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-10">
              Manage the full investment lifecycle — from acquisition and interest accrual through disposal, reconciliation and month-end processing — with automatic double-entry accounting.
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

      {/* Module Tabs Overview */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Five tabs, one investment command center
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {moduleTabs.map((m, i) => (
              <div key={m.title} className="card-lift bg-white rounded-2xl border border-slate-200 p-5 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.color}`} />
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-300 absolute top-4 right-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.title}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{m.desc}</p>
              </div>
            ))}
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {addMenu.map((item, i) => (
              <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 hover:border-emerald-300 transition-colors">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  {String(i + 1).padStart(2, '0')}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Investment Value', icon: Wallet, desc: 'Sum of market values / book values across all positions.' },
              { label: 'Total Unrealized Gain', icon: TrendingUp, desc: 'Sum of unrealized_gain across positions.' },
              { label: 'Dividends YTD', icon: Coins, desc: 'Dividend transactions in current fiscal year.' },
              { label: 'Interest YTD', icon: Percent, desc: 'Interest transactions in current fiscal year.' },
            ].map((k) => (
              <div key={k.label} className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <k.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{k.label}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{k.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Principal by Institution</h3>
              <p className="text-xs text-slate-500 leading-5">Recharts pie chart showing FD exposure concentration across banks and institutions.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Maturity Profile</h3>
              <p className="text-xs text-slate-500 leading-5">Recharts bar chart showing principal maturities grouped by month over the fiscal year.</p>
            </div>
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accountingPrinciples.map((p) => (
              <div key={p.title} className="card-lift bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-4">{p.desc}</p>
                  </div>
                </div>
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
              6-step investment guide
            </h2>
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
