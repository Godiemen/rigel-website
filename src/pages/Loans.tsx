import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2,
  Landmark, FileText, ArrowLeftRight,
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
  icon: typeof Landmark;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const moduleSections: AccordionSection[] = [
  {
    icon: Landmark,
    name: 'All Loan Types in One Register',
    tagline: 'Track every borrowing and lending arrangement your business enters into.',
    description:
      'Create a record for every loan the business is involved in — term loans, overdrafts, mortgages, vehicle finance, other borrowings, loans receivable, and director loans. Capture lender, institution, account number, collateral, principal, interest rate, term, monthly repayment, start date and current outstanding balance.',
    features: [
      'Term loans, overdrafts, mortgages and vehicle finance',
      'Loans receivable and director loans',
      'Full loan profile with principal, rate, term and balance',
      'Collateral and institution tracking',
    ],
  },
  {
    icon: FileText,
    name: 'Amortization & IFRS Split',
    tagline: 'Full repayment schedule with automatic current / non-current split.',
    description:
      'Rigel generates a full amortization schedule for each loan: opening balance, monthly repayment, interest portion, capital portion and closing balance. The schedule automatically separates the current and non-current portions, keeping the balance sheet IFRS-compliant as the loan is paid down.',
    features: [
      'Opening balance, repayment, interest, capital and closing',
      'Automatic current vs non-current split',
      'IFRS-compliant balance sheet presentation',
      'Updates as repayments are posted',
    ],
  },
  {
    icon: ArrowLeftRight,
    name: 'Repayments, Interest & Clearing',
    tagline: 'Record payments and accruals with the correct double-entry.',
    description:
      'Loan repayments are automatically split into interest expense or income and capital repayment. Post interest accruals, balloon payments and early settlements. The Loan Clearing Report tracks which loan proceeds have actually been received in the bank and which are still outstanding.',
    features: [
      'Repayments split into interest and capital',
      'Interest accruals and balloon payments',
      'Early settlements',
      'Loan clearing status report',
    ],
  },
];

const loanTypes = [
  { title: 'Term loans', desc: 'Bank or financial institution loans with a fixed repayment schedule.', image: '/creditors control.png' },
  { title: 'Overdrafts', desc: 'Revolving credit facilities linked to bank accounts.', image: '/creditors control 2.png' },
  { title: 'Mortgages', desc: 'Property-backed long-term finance and repayments.', image: '/creditors control advisor.png' },
  { title: 'Vehicle finance', desc: 'Asset-backed vehicle loans and balloon settlements.', image: '/assets register .png' },
  { title: 'Other borrowings', desc: 'Any other liability classified as a loan.', image: '/general ledger .png' },
  { title: 'Loans receivable', desc: 'Money the company has lent out to third parties.', image: '/debtors control .png' },
  { title: 'Director loans', desc: 'Both loans to and from company directors.', image: '/balance sheet 1.png' },
];

const accountingAccounts = [
  { title: 'Loans Payable — Short Term', desc: 'What the company owes within 12 months.', image: '/creditors control.png' },
  { title: 'Loans Payable — Long Term', desc: 'What the company owes after 12 months.', image: '/creditors control 2.png' },
  { title: 'Loans Receivable — Current', desc: 'Money owed to the company within 12 months.', image: '/debtors control .png' },
  { title: 'Loans Receivable — Non-Current', desc: 'Money owed to the company after 12 months.', image: '/aging for debtors .png' },
  { title: 'Current Portion of Long-Term Loans', desc: 'The part of a long-term loan due within the next year.', image: '/balance sheet 2.png' },
];

const journalPreviews = [
  { action: 'Take up new loan', debit: 'Bank / Cash', credit: 'Loan Payable' },
  { action: 'Monthly repayment', debit: 'Interest Expense', credit: 'Bank / Cash' },
  { action: 'Capital repayment', debit: 'Loans Payable', credit: 'Bank / Cash' },
  { action: 'Director loan to company', debit: 'Bank / Cash', credit: 'Loans Payable (Director)' },
  { action: 'Company loan to director', debit: 'Loans Receivable (Director)', credit: 'Bank / Cash' },
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
        isOpen ? 'border-emerald-300 shadow-lg shadow-emerald-100/50' : 'border-slate-200 hover:border-emerald-300'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className="relative h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-md overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
          <Icon className="h-6 w-6" />
          <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-mono font-bold transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">{section.tagline}</p>
          <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{section.name}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
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

export function Loans() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white">
      {/* Hero */}
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
              <Landmark className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Loans</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Track, Manage, and Repay Every Business Loan
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              A complete picture of all borrowing and lending activity — from term loans and overdrafts to director loans and notional interest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`${APP_URL}/signup`} className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white">
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Loan Register</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              All loan types in one place
            </h2>
          </div>
          <CardSlider>
            {loanTypes.map((item) => (
              <div key={item.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={item.image} alt={item.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Accounting Treatment */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Automatic Accounting</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Pre-configured GL accounts for every loan
            </h2>
          </div>
          <CardSlider>
            {accountingAccounts.map((item) => (
              <div key={item.title} className="snap-center shrink-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card">
                <img src={item.image} alt={item.title} className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                <div className="h-[45%] flex flex-col justify-center p-5 bg-[#0052CC]">
                  <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-white/80 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* Accordion — deeper detail */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Core Capabilities</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              How the Loans module works
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

      {/* Accounting Integration */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Integration</p>
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

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Manage every loan with confidence
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Track borrowing, lending, repayments, interest and reconciliations — all with automatic double-entry accounting. Start your 7-day free trial.
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
