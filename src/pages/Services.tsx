import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

type Module = {
  name: string;
  tagline: string;
  to: string;
  image: string;
};

const modules: Module[] = [
  {
    name: 'Accounting & Reporting',
    tagline: 'Financial statements, trial balance and real-time reporting from one ledger.',
    to: '/reporting',
    image: '/MOQWE.jpg',
  },
  {
    name: 'VAT Management',
    tagline: 'Track VAT periods, review transactions and generate SARS-ready VAT201 reports.',
    to: '/tax',
    image: '/Gemini_Generated_Image_f1imttf1imttf1im.png',
  },
  {
    name: 'Investments',
    tagline: 'Track fixed deposits, shares and investment income alongside your books.',
    to: '/investments',
    image: '/Gemini_Generated_Image_h5kk1uh5kk1uh5kk.png',
  },
  {
    name: 'Banking',
    tagline: 'Reconcile bank accounts and match transactions to your records.',
    to: '/banking',
    image: '/tRPrb.jpg',
  },
  {
    name: 'Sales & Invoicing',
    tagline: 'Turn quotes into orders, tax invoices and paid receipts without losing the trail.',
    to: '/sales',
    image: '/3QRJb.jpg',
  },
  {
    name: 'Purchase & Payables',
    tagline: 'Control supplier orders, goods received and accounts payable from request to payment.',
    to: '/purchase',
    image: '/Gemini_Generated_Image_cq6dxlcq6dxlcq6d.png',
  },
  {
    name: 'Inventory & Stock',
    tagline: 'Track stock across warehouses with reorder alerts and turnover analysis.',
    to: '/inventory',
    image: '/PL2ri.jpg',
  },
  {
    name: 'Payroll & HR',
    tagline: 'Run SARS-compliant payroll, payslips and employee records.',
    to: '/payroll',
    image: '/vp9tD.jpg',
  },
];

function ModuleCard({ module }: { module: Module }) {
  return (
    <Link
      to={module.to}
      className="snap-center shrink-0 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card"
    >
      <img
        src={module.image}
        alt={module.name}
        className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
      />
      <div className="h-[45%] flex flex-col justify-between p-6 bg-[#0052CC]">
        <div>
          <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{module.name}</h3>
          <p className="text-sm text-white/80 leading-6 line-clamp-3">{module.tagline}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-2 group-hover/card:translate-x-1 transition-transform">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const target = activeIndex * (card.offsetWidth + 24) + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex]);

  const scroll = (dir: number) => {
    setActiveIndex(current => {
      const next = current + dir;
      return Math.max(0, Math.min(next, modules.length - 1));
    });
  };

  return (
    <div className="bg-white">
      {/* Hero — split layout with image showcase */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_st6xx8st6xx8st6x.png"
            alt="Financial management for modern businesses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D6C] animate-pulse" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">
                Platform modules
              </span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Services
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Every module in Rigel Business is built to connect your transactions, compliance and reporting in one place. Explore what each module does and how it works for your South African SME.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white"
              >
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link
                to="/book-demo"
                className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module cards */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {modules.map((mod) => (
                <ModuleCard key={mod.name} module={mod} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-12 w-12 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-12 w-12 rounded-full bg-white shadow-lg border border-slate-200 items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            {modules.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
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
