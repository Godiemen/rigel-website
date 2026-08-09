import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, X, Maximize2,
  FileBarChart, TrendingUp, Layers, FileText, Scale,
  BookOpen, Wallet, Calculator, ScrollText, History,
  ShieldCheck, AlertTriangle, RefreshCw, Search,
  LayoutGrid, GraduationCap,
  Download, Eye, Zap,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/balance sheet 1.png', title: 'Balance Sheet', desc: 'Statement of Financial Position with non-current assets, current assets, equity and liabilities.' },
  { src: '/income statement.png', title: 'Income Statement', desc: 'Statement of Comprehensive Income with revenue, COGS, gross profit, operating expenses and net profit.' },
  { src: '/trial balance .png', title: 'Trial Balance', desc: 'Full GL balance summary with debit/credit columns, totals and balanced status badge.' },
  { src: '/general ledger .png', title: 'General Ledger', desc: 'Detailed account transactions with opening balance, running balance and Dr/Cr formatting.' },
  { src: '/changes in equity.png', title: 'Changes in Equity', desc: 'Analysis of Retained Earnings — opening, net profit, dividends, drawings, closing.' },
  { src: '/depreciation schedule 4.png', title: 'Depreciation Schedule', desc: 'PPE movement schedule with monthly cost, accumulated depreciation and closing NBV.' },
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

export function Reporting() {
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
      {/* Hero — dark slate gradient with emerald glow */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/MOQWE.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/85 to-[#0B1220]/90" />
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[10%] h-[400px] w-[400px] bg-[#1BA37B]/15 blur-[100px] rounded-full" />
            <div className="absolute bottom-[10%] right-[5%] h-[350px] w-[350px] bg-[#1BA37B]/10 blur-[90px] rounded-full" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 mb-6">
              <LayoutGrid className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Financial Reporting Center</span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              IFRS-Compliant Statements, Trial Balance, Ledger & Budget
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-8 max-w-xl mb-10">
              Generate, compare, and export full IFRS financial statements directly from your live trial balance. The IIV engine renders Balance Sheet, Income Statement, Notes to the AFS, and Changes in Equity — with monthly snapshots, comparative years, account drilldown, and one-click PDF/Excel export.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#1BA37B] hover:bg-[#158560] px-8 font-semibold text-white">
                Open Reporting Hub <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-white/25 hover:border-white/60 hover:bg-white/5 px-8 font-semibold text-white">
                View Tutorial
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hubModules.map((m, i) => (
              <div key={m.title} className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.color}`} />
                <div className="relative h-28 overflow-hidden bg-slate-100">
                  {m.image ? (
                    <img src={m.image} alt={m.title} className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                      <m.icon className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                </div>
                <div className="p-5 relative -mt-4">
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <m.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 absolute top-4 right-4">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4 mb-2">{m.desc}</p>
                  <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">{m.cat}</p>
                </div>
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
              Financial reporting, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From balance sheets to income statements, trial balance, general ledger and equity changes — explore the actual Rigel Business reporting interface.
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ifrsNotes.map((note) => (
              <div key={note.num} className="card-lift bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden group hover:border-emerald-300 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#1BA37B] to-[#0F9D6C] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-mono text-emerald-600 font-bold">Note {note.num}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{note.title}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{note.desc}</p>
              </div>
            ))}
          </div>
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Comparative Year Mode</h3>
              <p className="text-xs text-slate-500 leading-5 mb-3">Toggle "Compare Years" switch with two year pickers. Renders side-by-side Year A vs Year B columns. Prior Year Adjustments fetched and applied to both affected account and retained earnings by opposite amounts — comparative balance sheet stays balanced.</p>
              <ul className="space-y-1.5">
                {['Year A vs Year B side-by-side tables', 'All account codes merged — missing show zero', 'PYA adjusts account + retained earnings oppositely', 'renderTable() helper for consistent styled tables'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Multi-Month Snapshot Mode</h3>
              <p className="text-xs text-slate-500 leading-5 mb-3">Select multiple months from a 12-month picker. Each selected month becomes a column in the report table. Per-variant loading state. Retained earnings snapshots include opening, profit, dividends, drawings, closing per month.</p>
              <ul className="space-y-1.5">
                {['Each selected month becomes a report column', 'Per-variant loading state (MultiLoading)', 'Income statement: period-specific TB per month', 'Retained earnings: opening → profit → dividends → closing'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card-lift bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Account Drilldown</h3>
              <p className="text-xs text-slate-500 leading-5">Click any account line in Balance Sheet, Income Statement, Notes, Equity or Trial Balance to open a dialog with all ledger entries: date, reference, description, debit, credit, running balance with Dr/Cr suffix.</p>
            </div>
            <div className="card-lift bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Calculator className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>PPE Movement Schedule</h3>
              <p className="text-xs text-slate-500 leading-5">Monthly table: opening cost, accumulated depreciation, NBV, additions, disposals, depreciation, closing. Fiscal year-aware with cache. Export to PDF (autoTable) and Excel.</p>
            </div>
            <div className="card-lift bg-white rounded-2xl border border-slate-200 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Trace Dialog</h3>
              <p className="text-xs text-slate-500 leading-5">Click any balance in the Balance Sheet to see the resolved trial balance row (code, name, type, debits, credits, balance) and monthly breakdown showing the account's movement across each month.</p>
            </div>
          </div>
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>PDF Export</h3>
              </div>
              <p className="text-xs text-slate-500 leading-5">jsPDF with autoTable. Header color #0070ad, alternating row colors, bold totals. Mode selector: Month, Compare Years, or Date Range. Per-variant export logic for Balance Sheet, Income Statement, IFRS Notes and Retained Earnings.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Excel Export</h3>
              </div>
              <p className="text-xs text-slate-500 leading-5">XLSX.utils.json_to_sheet with formatted headers. Same SARS box structure for VAT, all 16 numbered notes for IFRS, monthly columns for budget. Landscape A4 for budget PDF with section grouping and subtotals.</p>
            </div>
          </div>
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Supabase Realtime</h3>
                <p className="text-[11px] text-slate-500 leading-4">Subscribes to transactions, ledger_entries, fixed_assets and invoices. 1.2s debounce → background refresh. RefreshingBadge shows subtle indicator.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
              <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>In-Memory Cache</h3>
                <p className="text-[11px] text-slate-500 leading-4">Key: companyId:reportType:start:end. 5-min TTL for fresh data, always returns cached first for instant display. Background refresh updates silently.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Unallocated Warning</h3>
                <p className="text-[11px] text-slate-500 leading-4">Amber alert if unallocated transactions exist. Emerald confirmation if all allocated. Displayed in all IIV statements and Trial Balance.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Fiscal Year System</h3>
                <p className="text-[11px] text-slate-500 leading-4">useFiscalYear hook manages selected year, start month, date calculation. SA fiscal year: March–February. getFiscalYearDates() and getCalendarYearForFiscalPeriod() helpers.</p>
              </div>
            </div>
          </div>
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
