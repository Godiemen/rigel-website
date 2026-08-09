import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, Landmark, Building2,
  CreditCard, ArrowLeftRight, FileText, Search, RefreshCw,
  BarChart3, GraduationCap,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

type AccordionSection = {
  icon: typeof Landmark;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const saBanks = [
  'ABSA', 'FNB', 'Standard Bank', 'Nedbank', 'Capitec', 'Investec',
  'Discovery', 'TymeBank', 'African Bank', 'Bidvest', 'Sasfin', 'Mercantile',
];

const bankTabs = [
  { icon: Building2, title: 'Bank Accounts', desc: 'Add, edit and manage bank accounts with linked GL accounts.', color: 'from-emerald-400 to-emerald-600' },
  { icon: CreditCard, title: 'Credit Cards', desc: 'Track credit cards as liability accounts with opening balances.', color: 'from-emerald-400 to-emerald-600' },
  { icon: ArrowLeftRight, title: 'Transfers', desc: 'Transfer funds between bank accounts with automatic GL postings.', color: 'from-slate-700 to-slate-900' },
  { icon: FileText, title: 'Statements', desc: 'View transaction history, ledger rows and inferred direction.', color: 'from-slate-700 to-slate-900' },
  { icon: Search, title: 'Reconciliation', desc: 'Match statement lines to system transactions and resolve exceptions.', color: 'from-indigo-400 to-indigo-600' },
  { icon: BarChart3, title: 'Cash Flow', desc: 'Direct cash flow statement from bank transactions by category.', color: 'from-rose-400 to-rose-600' },
];

const allocationTypes = [
  'Income & expense with VAT',
  'Supplier payments (multi-bill, settlement discounts)',
  'Customer receipts (multi-invoice, discount allowed)',
  'Customer & supplier refunds',
  'Bank transfers',
  'Tax: PAYE/UIF/SDL, VAT, provisional, income, donation',
  'VAT refunds',
  'Director remuneration & loan repayments',
  'Loan receipts, repayments and interest',
  'Investment clearing & proceeds',
  'Share allotment clearing',
  'Dividend payments',
  'Employee salary payments',
  'Equity contributions & drawings',
  'Cash donations with S18A tracking',
  'Asset disposal proceeds',
];

const cashFlowCategories = [
  'Customer receipts', 'Other income', 'Interest & dividends', 'Refunds',
  'Asset disposal proceeds', 'Loan proceeds', 'Investment proceeds',
  'Share issue proceeds', 'Capital contributions', 'Drawings',
  'Opening balance', 'Supplier payments', 'Salaries & wages',
  'Bank charges', 'Finance costs', 'Tax/VAT payments', 'Loan repayments',
  'Transfers', 'Asset purchases', 'Investment purchases', 'Dividend payments',
  'Operating expenses', 'Other',
];

const accordionSections: AccordionSection[] = [
  {
    icon: Building2,
    name: 'Bank & Credit Card Management',
    tagline: 'Add, link, transfer and track all South African bank accounts and cards.',
    description:
      'Create bank accounts for all major SA banks (ABSA, FNB, Standard Bank, Nedbank, Capitec, Investec, Discovery, TymeBank, African Bank, Bidvest, Sasfin, Mercantile). Each bank account auto-creates a dedicated GL asset account "Bank - {name}". Credit cards are tracked as liability accounts "Credit Card Payable - {name}". Duplicate detection by name + account number, bulk delete, deactivation, search/filter, pagination, detail view and Excel/CSV import. Real-time balances from ledger movements (debit - credit) with opening balance fallback.',
    features: [
      'Supports 12 major SA banks',
      'Auto-creates dedicated GL asset/liability accounts',
      'Duplicate detection by name + account number',
      'Bulk delete, deactivate, search and paginate',
      'Bank transfers: Dr destination bank / Cr source bank',
      'Inflow/outflow summaries per account',
    ],
  },
  {
    icon: ArrowLeftRight,
    name: 'Bank Transactions & Allocation',
    tagline: 'Import, allocate and post bank transactions with intelligent suggestions.',
    description:
      'Import CSV bank statements with SA date parsing (dd/MM/yyyy, yyyy-MM-dd, dd-MM-yyyy), fiscal year validation and duplicate detection. Smart allocation engine with auto-account suggestions, confidence scoring, duplicate warnings, VAT detection and AI assistance. Allocate to income/expense, supplier payments, customer receipts, refunds, bank transfers, tax payments, director transactions, loans, investments, salaries, equity, donations and asset disposals. Bank rules map description patterns to target accounts. Bulk allocation, split transactions, edits and attachments (up to 5 files, 1MB max). All postings hit transactions, transaction_entries and ledger_entries with balanced journals and tax period resolution.',
    features: [
      'CSV import with SA date formats and FY validation',
      'Smart allocation with confidence scoring and VAT detection',
      '16 allocation types including tax, loans, salaries, donations',
      'Bank rules: pattern matching → target account + VAT rate',
      'Bulk allocation and split transactions',
      'Attachments stored in Supabase Storage',
    ],
  },
  {
    icon: Search,
    name: 'Bank Reconciliation',
    tagline: 'Match statement lines to system transactions and finalize to R 0.00.',
    description:
      'Unified side-by-side table with matched pairs, unmatched items and exception detection. Auto-matching uses Dice coefficient string similarity, exact amount and date proximity (within 3 days). One-click Auto-match for high-confidence pairs. Manual matching lets users pair statement lines with system transactions. Summary shows opening balance, cleared deposits, cleared payments, cleared balance, statement balance and difference. Lifecycle: Draft → In Progress → Completed. CSV statement import with fiscal year bucketing and outside-FY warnings. Export reconciled reports.',
    features: [
      'Auto-matching: Dice similarity + exact amount + 3-day date proximity',
      'High/medium confidence match suggestions',
      'All / Matched / Unmatched / Exceptions tabs',
      'Reconciliation summary: opening, cleared, statement, difference',
      'Finalize when difference = R 0.00',
      'CSV statement import with FY bucketing',
    ],
  },
  {
    icon: BarChart3,
    name: 'Cash Flow Statement',
    tagline: 'Direct cash flow from bank transactions, not derived from the balance sheet.',
    description:
      'Categorizes every bank transaction as inflow or outflow by type, description and GL contra-account. Covers customer receipts, other income, interest/dividends, refunds, asset disposal, loan/investment proceeds, capital contributions, drawings, supplier payments, salaries, bank charges, finance costs, tax/VAT payments, loan repayments, transfers, asset/investment purchases, dividend payments and operating expenses. Filter by bank, category, date range and financial year. Category detail drill-down and PDF/Excel export.',
    features: [
      'Direct method from bank transactions',
      '22 categories using transaction type and contra-account mapping',
      'Inflow/outflow classification per transaction',
      'Filter by bank, category, date range and FY',
      'Drill-down dialog per category',
      'PDF and Excel export',
    ],
  },
  {
    icon: RefreshCw,
    name: 'Mono Open Banking',
    tagline: 'Automated transaction sync with live balances.',
    description:
      'Integrate with the Mono API for automated bank transaction syncing. Incremental sync from last sync date, live balance fetching, duplicate detection (Mono ID + fuzzy fallback) and progress tracking. Keeps bank data up to date without manual CSV imports.',
    features: [
      'Incremental sync from last sync date',
      'Live balance fetching',
      'Duplicate detection: Mono ID + fuzzy fallback',
      'Progress tracking during sync',
      'Reduces manual CSV import work',
    ],
  },
];

const systemAccounts = [
  { account: 'Bank - {name}', desc: 'Dedicated GL asset account per bank account.' },
  { account: 'Credit Card Payable - {name}', desc: 'Liability account per credit card.' },
  { account: 'VAT Input / Output', desc: 'Tax accounts for VAT on bank transactions.' },
  { account: 'Supplier Prepayment', desc: 'Overpayments to suppliers.' },
  { account: 'Income Received in Advance', desc: 'Customer overpayments.' },
  { account: 'Investment Clearing', desc: 'Investment buy/sell clearing.' },
  { account: 'Share Allotment Clearing', desc: 'Share issue proceeds clearing.' },
  { account: 'Dividend Payable', desc: 'Dividend payment liability.' },
  { account: 'Owner\'s Capital / Drawings', desc: 'Equity contributions and drawings.' },
  { account: 'Loan Clearing', desc: 'Loan receipt/repayment clearing.' },
  { account: 'Disposal Proceeds Receivable', desc: 'Asset disposal proceeds.' },
];

const journalPreviews = [
  { action: 'Bank Transfer', debit: 'Destination Bank', credit: 'Source Bank' },
  { action: 'Supplier Payment', debit: 'Accounts Payable / Prepayment', credit: 'Bank' },
  { action: 'Customer Receipt', debit: 'Bank', credit: 'Accounts Receivable / Income in Advance' },
  { action: 'Tax Payment', debit: 'PAYE/UIF/SDL or VAT Payable', credit: 'Bank' },
  { action: 'Investment Proceeds', debit: 'Bank', credit: 'Investment Clearing' },
  { action: 'Loan Receipt', debit: 'Bank', credit: 'Loan Clearing / Loan Payable' },
  { action: 'Salary Payment', debit: 'PAYE/UIF/SDL + Net Wages Payable', credit: 'Bank' },
];

const tutorialSteps = [
  { num: '01', title: 'Add Bank', desc: 'Link your SA bank account' },
  { num: '02', title: 'Import', desc: 'Upload CSV statement or sync via Mono' },
  { num: '03', title: 'Allocate', desc: 'Categorize and post transactions' },
  { num: '04', title: 'Reconcile', desc: 'Match statement to system' },
  { num: '05', title: 'Cash Flow', desc: 'Review direct cash flow report' },
  { num: '06', title: 'Export', desc: 'Download statements and reports' },
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

export function Banking() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/tRPrb.jpg"
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
                <Landmark className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Banking</span>
              </div>
              <h1
                className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Banking, Reconciliation & Cash Flow
              </h1>
              <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl mb-10">
                Manage South African bank accounts, credit cards, transactions, automated allocation, bank reconciliation and a direct cash flow statement — all with automatic double-entry accounting.
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

      {/* Bank Tabs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Six pillars of banking management
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bankTabs.map((m, i) => (
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

      {/* SA Banks */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Supported Institutions</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              12 major South African banks
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {saBanks.map((b) => (
              <span key={b} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Allocation Types */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Smart Allocation</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              16 allocation types
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allocationTypes.map((t, i) => (
              <div key={t} className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 hover:border-emerald-300 transition-colors">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[11px] text-slate-600 leading-4">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Core Workflows</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              How the banking module works
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

      {/* System Accounts */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">System Accounts</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Canonical GL account resolution
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {systemAccounts.map((a) => (
              <div key={a.account} className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="text-xs font-bold text-emerald-600 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{a.account}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{a.desc}</p>
              </div>
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
              Automatic double-entry for bank actions
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

      {/* Cash Flow Categories */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Cash Flow Categories</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              22 direct cash flow categories
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {cashFlowCategories.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600">
                {c}
              </span>
            ))}
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
              6-step banking guide
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
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Take control of your banking
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Connect South African bank accounts, import statements, automate allocation, reconcile and generate a direct cash flow statement — all in one place.
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
