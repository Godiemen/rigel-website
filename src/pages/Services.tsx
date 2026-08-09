import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown,
  BarChart3, PieChart, ShoppingCart,
  Users, Landmark, Package, Calculator,
  Wallet, CheckCircle2,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

type Module = {
  icon: typeof BarChart3;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const modules: Module[] = [
  {
    icon: BarChart3,
    name: 'Accounting & Reporting',
    tagline: 'Financial statements, trial balance and real-time reporting from one ledger.',
    description:
      'Rigel brings every journal, transaction and balance into a single general ledger. Generate trial balance, income statement, balance sheet and full Annual Financial Statements without exporting to spreadsheets. Reports update live as transactions are captured, so your books are always current and audit-ready.',
    features: [
      'Live general ledger and trial balance',
      'Income statement and balance sheet on demand',
      'Full Annual Financial Statements (AFS) export',
      'Comparative and custom date-range reporting',
      'PDF and Excel export for accountants',
    ],
  },
  {
    icon: Calculator,
    name: 'VAT Management',
    tagline: 'Track VAT periods, review transactions and generate SARS-ready VAT201 reports.',
    description:
      'Manage output and input tax across every transaction with VAT periods that match your filing cycle. Rigel locks submitted periods, keeps a complete audit trail and generates VAT201 reports aligned with SARS requirements so filing becomes a one-click task.',
    features: [
      'VAT period tracking with open, filed and locked states',
      'Input and output tax review per transaction',
      'One-click SARS-aligned VAT201 generation',
      'Historical VAT filing archive',
      'Audit trail for every VAT-relevant entry',
    ],
  },
  {
    icon: PieChart,
    name: 'Investments',
    tagline: 'Track fixed deposits, shares and investment income alongside your books.',
    description:
      'Record and monitor all your business investments in one place. Rigel tracks fixed deposits, listed shares and other interest-bearing instruments, then posts interest, dividends and revaluations to the correct ledger accounts automatically during month-end.',
    features: [
      'Fixed deposit and share registers',
      'Automatic interest and dividend accruals',
      'Investment income and revaluation journals',
      'Reconciliation with bank and brokerage accounts',
      'Investment reports for board and tax packs',
    ],
  },
  {
    icon: Landmark,
    name: 'Banking',
    tagline: 'Reconcile bank accounts and match transactions to your records.',
    description:
      'Connect bank accounts or import statements to match payments and receipts against invoices, bills and customer receipts. Rigel flags unmatched items, tracks uncleared deposits and keeps your cash book perfectly aligned with the bank.',
    features: [
      'Bank statement import via CSV and OFX',
      'Auto-matching of payments to invoices and bills',
      'Multi-bank and multi-currency accounts',
      'Reconciliation reports with variance highlighting',
      'Uncleared deposits and petty cash tracking',
    ],
  },
  {
    icon: Wallet,
    name: 'Sales & Invoicing',
    tagline: 'Turn quotes into orders, tax invoices and paid receipts without losing the trail.',
    description:
      'Create quotes, sales orders and tax invoices with your branding and banking details. Send magic links so customers approve quotes and pay online, then track outstanding balances with automated reminders and a full accounts receivable view.',
    features: [
      'Quotes, sales orders and tax invoices',
      'Customer magic links for approval and payment',
      'Automated payment reminder emails',
      'Customer statements and aging reports',
      'Receipt allocation to open invoices',
    ],
  },
  {
    icon: ShoppingCart,
    name: 'Purchase & Payables',
    tagline: 'Control supplier orders, goods received and accounts payable from request to payment.',
    description:
      'Raise purchase orders, match them to supplier invoices and goods received notes, then track what you owe before cash leaves the business. Rigel links procurement to stock, cost of sales and creditors control for complete buying visibility.',
    features: [
      'Purchase order creation and approval status',
      'Goods received note matching',
      'Supplier invoice and debit note processing',
      'Creditors control and payable ageing',
      'Payment allocation and cash-flow planning',
    ],
  },
  {
    icon: Package,
    name: 'Inventory & Stock',
    tagline: 'Track stock across warehouses with reorder alerts and turnover analysis.',
    description:
      'Monitor stock levels in real time across multiple warehouses, set reorder points and analyse supplier and product performance. Rigel connects every goods received and dispatch note to the general ledger so your stock and cost of sales stay accurate.',
    features: [
      'Multi-warehouse stock tracking',
      'Automatic reorder alerts at minimum levels',
      'Stock valuation using FIFO, LIFO or weighted average',
      'Goods received and dispatch postings',
      'Supplier and product turnover analysis',
    ],
  },
  {
    icon: Users,
    name: 'Payroll & HR',
    tagline: 'Run SARS-compliant payroll, payslips and employee records.',
    description:
      'Calculate salaries, PAYE, UIF and SDL aligned to South African payroll rules. Generate digital payslips with year-to-date totals, submit EMP201 returns and manage employee leave and master records from one module.',
    features: [
      'SARS-compliant PAYE, UIF and SDL calculations',
      'Auto-generated EMP201 returns',
      'Digital payslips with YTD totals',
      'Leave management and employee master records',
      'Bulk payroll runs with bank export files',
    ],
  },
];

function AccordionItem({
  module,
  isOpen,
  onToggle,
  index,
}: {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = module.icon;
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
            {module.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate hidden sm:block">
            {module.tagline}
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
              {module.description}
            </p>
            <ul className="space-y-2.5">
              {module.features.map((feature) => (
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

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* Hero — full-width image banner */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_st6xx8st6xx8st6x.png"
            alt="Financial management for modern businesses"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/90 via-[#0B1220]/70 to-[#0B1220]/40" />
          {/* Subtle emerald tint at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F9D6C]/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
                Platform modules
              </span>
            </div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Services
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 leading-8 max-w-xl">
              Every module in Rigel Business is built to connect your transactions, compliance and reporting in one place. Explore what each module does and how it works for your South African SME.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
              >
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link
                to="/book-demo"
                className="btn-pill inline-flex h-12 items-center border border-white/25 hover:border-white/60 hover:bg-white/5 px-8 font-semibold text-white"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade into white */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Accordion */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {modules.map((mod, i) => (
              <AccordionItem
                key={mod.name}
                module={mod}
                index={i}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-slate-600 mb-6 text-lg">
              Ready to put these modules to work?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
              >
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link
                to="/book-demo"
                className="btn-pill inline-flex h-12 items-center border border-slate-300 hover:border-slate-400 hover:bg-slate-50 px-8 font-semibold text-slate-700"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
