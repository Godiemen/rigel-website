import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileText,
  Users, Star, Building2,
  Receipt, ShoppingCart,
  BarChart3,
  Wallet, Landmark, Package,
  ShieldCheck, Clock, ChevronDown,
  PieChart, ChevronLeft, ChevronRight, Play
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-two.vercel.app';

function getYouTubeId(url: string) {
  try {
    return url.split('youtu.be/')[1]?.split('?')[0] ?? '';
  } catch {
    return '';
  }
}

function getYouTubeThumb(url: string) {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

const ALL_DEMO_VIDEOS = [
  { url: 'https://youtu.be/95Qn83PR3G4', title: 'Sales demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/qra2AII4r1Q', title: 'Sales demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/YJsZN2XwN8c', title: 'Sales demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/xgYsgYLwyHA', title: 'Sales demo 4', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/9ykroNunh8M', title: 'Sales demo 5', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/XSTp3kfM5qg', title: 'Sales demo 6', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/seiiD01ce8g', title: 'Purchase demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/hXLepZIo6v0', title: 'Purchase demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/jrP8vDXKDfM', title: 'Purchase demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/GyD2Y7n6uAA', title: 'Purchase demo 4', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/VF_xy9tNYbs', title: 'Payroll demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/nUVTI9piFd0', title: 'Payroll demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/QNEycsQ8Cu8', title: 'Payroll demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/Uo7k2u5Vvlg', title: 'Payroll demo 4', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/n30WPsWEqXI', title: 'Payroll demo 5', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/-ZhhQA__D40', title: 'Banking demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/Mf9envrYqvk', title: 'Banking demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/Z4w-v6xg0Do', title: 'VAT demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/byaPMh_0mF4', title: 'Inventory demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/vNRrculPKYA', title: 'Inventory demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/k_Kmzq3fhpg', title: 'Inventory demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/7ElF4AOgpIw', title: 'Reporting demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/79n86L-6fNc', title: 'Reporting demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/Ueamy35tjBM', title: 'Investments demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/GSD8DNM7lqE', title: 'Investments demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/HBGaPYna51A', title: 'Investments demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/ppK_9EF9miI', title: 'Loans demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/IEbpGB9GaKE', title: 'Loans demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/McdNhTbbqJQ', title: 'Assets demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/-avE67UETxc', title: 'Assets demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/lgQTtgg5q7M', title: 'Assets demo 3', desc: 'by Rigel Team' },
];

const testimonials = [
  { text: 'Rigel replaced our spreadsheets completely. VAT returns now take minutes instead of hours.', metric: '90% faster VAT filing' },
  { text: 'Multi-company support lets us manage all client books from one dashboard without switching logins.', metric: '14 clients in one dashboard' },
  { text: 'The desktop app runs smoothly even on slow internet. Stock control and invoicing never stop.', metric: 'Zero downtime since 2024' },
  { text: 'Bank reconciliation used to take a full day. Now it is done before lunch.', metric: '50% faster reconciliations' },
  { text: 'We no longer lose supplier invoices. Everything is captured and linked to the purchase order.', metric: '100% invoice traceability' },
  { text: 'Payroll processing that used to be stressful is now completed in under an hour.', metric: 'Payslips in 60 minutes' },
  { text: 'Stock levels update automatically when we process a sale. We finally trust our inventory counts.', metric: 'Real-time stock control' },
  { text: 'Our accountant can log in and see exactly what she needs without us sending spreadsheets.', metric: 'Seamless accountant access' },
  { text: 'The VAT201 report is ready the moment we close the period. SARS submissions are painless.', metric: 'One-click VAT201' },
  { text: 'Quotes are converted to invoices with one click. We get paid faster and look more professional.', metric: 'Faster quote-to-cash' },
  { text: 'We track debtors and low-stock items from the same screen, every morning.', metric: 'One dashboard' },
  { text: 'The audit trail gives us confidence that nothing can be changed without a record.', metric: 'Full audit trail' },
  { text: 'Moving from Excel to Rigel took less than a day. The onboarding was simple and well guided.', metric: '1-day onboarding' },
];

const SLIDESHOW_INTERVAL_MS = 4000;

export function Home() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [videosPaused, setVideosPaused] = useState(false);
  const videoSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videosPaused) return;
    const interval = window.setInterval(() => {
      setActiveVideoIndex(current => (current + 1) % ALL_DEMO_VIDEOS.length);
    }, SLIDESHOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [videosPaused]);

  useEffect(() => {
    const el = videoSliderRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const target = activeVideoIndex * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeVideoIndex]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  useEffect(() => {
    const el = sliderRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const target = activeSolutionIndex * (card.offsetWidth + 24) + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeSolutionIndex]);

  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [testimonialsPaused, setTestimonialsPaused] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    if (testimonialsPaused) return;
    const interval = window.setInterval(() => {
      setActiveTestimonialIndex(current => (current + 1) % testimonials.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [testimonialsPaused]);

  useEffect(() => {
    const el = testimonialsRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const target = activeTestimonialIndex * (card.offsetWidth + 24) + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeTestimonialIndex]);

  const trustRef = useRef<HTMLDivElement>(null);
  const [trustPaused, setTrustPaused] = useState(false);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  useEffect(() => {
    if (trustPaused) return;
    const interval = window.setInterval(() => {
      setActiveTrustIndex(current => (current + 1) % 4);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [trustPaused]);

  useEffect(() => {
    const el = trustRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const target = activeTrustIndex * (card.offsetWidth + 24) + card.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeTrustIndex]);

  return (
    <div className="bg-white">
      {/* Hero — editorial fintech with gradient mesh */}
      <section className="relative overflow-hidden text-white">
        {/* Background image overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/home-banner.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1220] to-transparent" />
          <div className="absolute inset-x-0 -bottom-1 h-32 sm:h-40 bg-slate-50" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            {/* Left column — text */}
            <div className="reveal reveal-visible max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D6C] animate-pulse" />
                <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">
                  Accounting &amp; ERP Software · South Africa
                </span>
              </div>
              <h1
                className="text-[2.5rem] sm:text-5xl lg:text-[4rem] font-bold leading-[1.02] tracking-[-0.02em] mb-6 text-white"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Run your entire business on one connected platform
              </h1>
              <p className="text-lg text-slate-200 max-w-lg mb-10 leading-8">
                From first invoice to annual financial statements — Rigel Business brings accounting, VAT, payroll, inventory and reporting together so your team works faster and makes better decisions.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-12">
                <a
                  href={`${APP_URL}/signup`}
                  className="btn-pill h-12 px-7 bg-[#0F9D6C] hover:bg-[#0B7A52] text-white font-semibold text-sm flex items-center gap-2"
                >
                  Start free trial <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/book-demo"
                  className="btn-pill h-12 px-7 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 text-white font-semibold text-sm flex items-center gap-2"
                >
                  Book a demo
                </Link>
              </div>
              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />)}
                  </div>
                  <span className="text-sm text-slate-200">Rated by SA businesses</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <ShieldCheck className="h-4 w-4 text-[#0F9D6C]" /> SARS-compliant VAT201
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Clock className="h-4 w-4 text-[#0F9D6C]" /> Cancel anytime
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions grid — staggered cards with gradient icons */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Solutions</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Everything your business needs, in one system
            </h2>
            <p className="text-slate-600 text-lg leading-8">
              From day-to-day transactions to year-end financial statements, Rigel connects every part of your operation.
            </p>
          </div>

          {/* Auto-sliding square cards */}
          <div
            className="relative group/slider"
          >
            <div
              ref={sliderRef}
              id="solutions-slider"
              className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {[
                { icon: BarChart3, title: 'Accounting & Reporting', desc: 'Trial balance, general ledger and full AFS.', accent: '#0F9D6C', tag: 'AFS-ready', image: '/MOQWE.jpg', link: '/reporting' },
                { icon: Landmark, title: 'VAT Management', desc: 'VAT periods, returns and SARS-ready reports.', accent: '#2563EB', tag: 'SARS', image: '/Gemini_Generated_Image_f1imttf1imttf1im.png', link: '/tax' },
                { icon: PieChart, title: 'Investments', desc: 'Fixed deposits, shares and month-end processing.', accent: '#1BA37B', tag: 'FD & Shares', image: '/Gemini_Generated_Image_h5kk1uh5kk1uh5kk.png', link: '/investments' },
                { icon: Landmark, title: 'Loans', desc: 'Loan lifecycle, amortisation and IFRS split.', accent: '#2563EB', tag: 'Borrowing', image: '/MOQWE.jpg', link: '/loans' },
                { icon: Landmark, title: 'Banking', desc: 'Bank accounts, reconciliation and cash flow.', accent: '#2563EB', tag: 'Auto-match', image: '/tRPrb.jpg', link: '/banking' },
                { icon: Wallet, title: 'Sales & Invoicing', desc: 'Quotes, orders, invoices and magic links.', accent: '#0F9D6C', tag: 'Magic links', image: '/3QRJb.jpg', link: '/sales' },
                { icon: ShoppingCart, title: 'Purchase & Payables', desc: 'POs, supplier invoices and receipts.', accent: '#2563EB', tag: 'PO tracking', image: '/Gemini_Generated_Image_cq6dxlcq6dxlcq6d.png', link: '/purchase' },
                { icon: Package, title: 'Inventory & Stock', desc: 'Multi-warehouse stock and reorder alerts.', accent: '#0F9D6C', tag: 'Multi-warehouse', image: '/PL2ri.jpg', link: '/inventory' },
                { icon: Users, title: 'Payroll & HR', desc: 'Compliant payroll, payslips and SARS.', accent: '#2563EB', tag: 'Payslips', image: '/vp9tD.jpg', link: '/payroll' },
              ].map((item, i) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className={`snap-center shrink-0 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col hover:-translate-y-1.5 group/card ${i === activeSolutionIndex ? 'scale-105 shadow-2xl z-10' : 'scale-90 opacity-60 blur-[1px] hover:opacity-100 hover:blur-0 hover:scale-95'}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[55%] w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  />
                  <div className="h-[45%] flex flex-col justify-between p-6 bg-[#0052CC]">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                      <p className="text-sm text-white/80 leading-6 line-clamp-3">{item.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-2 group-hover/card:translate-x-1 transition-transform">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 to-transparent hidden sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 to-transparent hidden sm:block" />

            {/* Arrow buttons */}
            <button
              type="button"
              onClick={() => setActiveSolutionIndex(i => (i - 1 + 9) % 9)}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors hidden sm:flex"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setActiveSolutionIndex(i => (i + 1) % 9)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors hidden sm:flex"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSolutionIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === activeSolutionIndex ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — dashed path with glowing circles */}
      <section className="py-20 lg:py-28 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">How it works</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Get started in minutes, not weeks
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Dashed connecting path */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-emerald-200" />
            {[
              { step: '01', icon: Users, title: 'Create your account', desc: 'Sign up free and add your company details in under 5 minutes.' },
              { step: '02', icon: Receipt, title: 'Capture transactions', desc: 'Record invoices, bills, payments and receipts as they happen.' },
              { step: '03', icon: BarChart3, title: 'Run reports', desc: 'Generate trial balance, AFS and VAT201 with one click.' },
              { step: '04', icon: ShieldCheck, title: 'Stay compliant', desc: 'Close VAT periods, submit SARS returns and keep audit trails.' },
            ].map(item => (
              <div key={item.step} className="text-center relative">
                <div className="relative inline-flex mb-6">
                  <div className="h-[72px] w-[72px] rounded-full bg-white text-emerald-600 flex items-center justify-center relative z-10" style={{ boxShadow: '0 0 0 4px rgba(15, 157, 108, 0.1), 0 0 24px rgba(15, 157, 108, 0.15)' }}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 h-7 w-7 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center z-20" style={{ boxShadow: '0 4px 12px rgba(15, 157, 108, 0.3)' }}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                <p className="text-sm text-slate-500 leading-6 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rigel vs the alternatives */}
      <section className="pt-32 pb-32 lg:pt-40 lg:pb-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/home-bg.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1220]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-transparent to-[#0B1220]/80" />
        </div>
        <div className="absolute left-0 right-0 top-0 h-24 sm:h-32 lg:h-40 bg-white pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 10%)' }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ring-rotate absolute top-[15%] right-[10%] h-32 w-32 border border-emerald-500/15 rounded-full" />
          <div className="ring-rotate-reverse absolute bottom-[20%] left-[8%] h-24 w-24 border border-slate-500/10 rounded-full" />
          <div className="dot-bounce absolute top-[25%] left-[15%] h-1.5 w-1.5 bg-emerald-400/40 rounded-full" />
          <div className="dot-bounce absolute bottom-[30%] right-[20%] h-1.5 w-1.5 bg-slate-300/20 rounded-full" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-400 mb-3 tracking-wide">Why switch</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-white mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Rigel vs spreadsheets and stitched-together apps
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-8">
              Most businesses juggle spreadsheets, a separate accounting app, a payroll tool, a bank feed and an inventory tracker. Rigel replaces all of them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Spreadsheets</h3>
              </div>
              <ul className="space-y-4">
                {['Manual data entry and formulas', 'No audit trail or version control', 'VAT calculated by hand', 'Reports take hours to build', 'One person at a time', 'No backup or sync'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-slate-600 text-xs">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-300" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Separate systems</h3>
              </div>
              <ul className="space-y-4">
                {['Accounting, payroll and stock apps never talk', 'Double-captured data across tools', 'Monthly reconciliations between systems', 'Extra subscriptions for every module', 'Limited SA tax and VAT support', 'Fragmented reporting'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="h-5 w-5 rounded-full border border-slate-600 flex items-center justify-center shrink-0 text-slate-600 text-xs">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 relative" style={{ boxShadow: '0 0 0 1px rgba(15, 157, 108, 0.3), 0 0 40px rgba(15, 157, 108, 0.15)' }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F9D6C] rounded-t-2xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-[#0F9D6C] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Rigel Business</h3>
              </div>
              <ul className="space-y-4">
                {['One platform for every department', 'Automatic double-entry bookkeeping', 'Full audit trail on every transaction', 'VAT201, EMP201 and AFS in one click', 'SARS-compliant payroll built in', 'Cloud sync + offline desktop app'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All-in-one banner */}
          <div className="mt-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-900/30 to-slate-800/50 p-8 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#0F9D6C]/20 blur-3xl rounded-full" />
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Why run four tools when one does it all?</h3>
            <p className="text-slate-300 max-w-2xl mx-auto mb-6 leading-7">
              Rigel combines accounting, VAT, banking, sales, purchases, inventory, investments, payroll and full IFRS reporting in a single connected system. No integrations. No exports. No double capture.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: BarChart3, label: 'Accounting & Reporting' },
                { icon: Landmark, label: 'VAT' },
                { icon: Landmark, label: 'Banking' },
                { icon: Wallet, label: 'Sales' },
                { icon: ShoppingCart, label: 'Purchases' },
                { icon: Package, label: 'Inventory' },
                { icon: PieChart, label: 'Investments' },
                { icon: Users, label: 'Payroll' },
              ].map(m => (
                <div key={m.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-emerald-500/20 text-xs text-slate-200">
                  <m.icon className="h-3.5 w-3.5 text-emerald-400" />
                  {m.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute left-0 right-0 -bottom-1 h-24 sm:h-32 lg:h-40 bg-white" style={{ clipPath: 'polygon(0 90%, 100% 10%, 100% 100%, 0 100%)' }} />
      </section>

      {/* Buy & Sell — combined advanced section with tabbed viewer */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/4 h-72 w-72 bg-blue-100/30 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 h-72 w-72 bg-emerald-100/40 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Procurement & Sales</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              From supplier invoice to customer payment — one connected flow
            </h2>
            <p className="text-slate-600 text-lg leading-8 max-w-2xl mx-auto">
              Rigel links every purchase order, supplier bill, customer quote, sales invoice and payment receipt so your buying and selling stay in sync with your accounts.
            </p>
          </div>

          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setVideosPaused(true)}
            onMouseLeave={() => setVideosPaused(false)}
          >
            <div className="absolute -top-12 right-0 flex items-center gap-3 z-10">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(ALL_DEMO_VIDEOS.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setActiveVideoIndex(i => (i - 1 + ALL_DEMO_VIDEOS.length) % ALL_DEMO_VIDEOS.length)}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveVideoIndex(i => (i + 1) % ALL_DEMO_VIDEOS.length)}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div
              ref={videoSliderRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {ALL_DEMO_VIDEOS.map((video, i) => (
                <button
                  key={video.url}
                  onClick={() => setActiveVideoIndex(i)}
                  className={`group text-left shrink-0 snap-center w-[85%] sm:w-[60%] lg:w-[40%] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${i === activeVideoIndex ? 'ring-2 ring-emerald-500 scale-[1.07] shadow-2xl z-10' : 'opacity-70 scale-95 hover:opacity-100 hover:scale-100 hover:shadow-xl'}`}
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
              {ALL_DEMO_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVideoIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === activeVideoIndex ? 'w-6 bg-[#1BA37B]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
              >
                Try it free <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — auto-sliding anonymous reviews */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">Customer reviews</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              What teams say about Rigel
            </h2>
            <p className="text-slate-600 text-lg leading-8">
              Real businesses across South Africa use Rigel to run accounting, VAT, payroll and inventory from one dashboard.
            </p>
          </div>

          <div
            ref={testimonialsRef}
            onMouseEnter={() => setTestimonialsPaused(true)}
            onMouseLeave={() => setTestimonialsPaused(false)}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {testimonials.map((t, i) => (
              <div key={i} className={`snap-center shrink-0 w-[280px] sm:w-[340px] card-lift group bg-slate-50 rounded-2xl border border-slate-200 p-7 transition-all duration-700 ease-out ${i === activeTestimonialIndex ? 'scale-110 shadow-2xl z-10 bg-white' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-100'}`}>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />)}
                </div>
                <p className="text-slate-700 text-base leading-8 mb-6">“{t.text}”</p>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1.5 uppercase tracking-wide">
                  {t.metric}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-slate-200">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />)}
            </div>
            <span className="text-sm text-slate-600 font-medium">Rated by SA businesses</span>
          </div>
        </div>
      </section>

      {/* Trust badges — picture cards with focused middle slide */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={trustRef}
            onMouseEnter={() => setTrustPaused(true)}
            onMouseLeave={() => setTrustPaused(false)}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {[
              { title: 'Audit trail', desc: 'Every transaction records who, what and when. Full traceability for auditors and SARS reviews.', image: '/audit-trail.jpg' },
              { title: 'Multi-company', desc: 'Switch between entities without logging out. Manage holding companies and subsidiaries in one place.', image: '/multi-company.jpg' },
              { title: 'Financial year', desc: 'Lock closed periods to prevent changes. Keep current and historical data clean and accurate.', image: '/financial-year.jpg' },
              { title: 'Document templates', desc: 'Customise invoices, quotes and statements with your logo, colours and banking details.', image: '/document-templates.jpg' },
            ].map((item, i) => (
              <div key={item.title} className={`snap-center shrink-0 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-700 ease-out flex flex-col ${i === activeTrustIndex ? 'scale-105 shadow-2xl z-10' : 'scale-95 opacity-70 hover:opacity-100 hover:scale-100'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[55%] w-full object-cover"
                />
                <div className="h-[45%] flex flex-col justify-between p-6 bg-[#0052CC]">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                    <p className="text-sm text-white/80 leading-6 line-clamp-3">{item.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white mt-2">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTrustIndex(i)}
                className={`h-2 rounded-full transition-all ${i === activeTrustIndex ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — chevron accordion */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-emerald-600 mb-3 tracking-wide">FAQ</p>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Questions, answered
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Is Rigel SARS-compliant?', a: 'Yes. Rigel generates VAT201 reports aligned to SARS requirements, tracks fiscal periods and supports ZAR currency by default.' },
              { q: 'Can I manage multiple companies?', a: 'Yes. Rigel supports multiple companies from a single dashboard. Switch between entities without logging out.' },
              { q: 'Do I need an internet connection?', a: 'The desktop app works offline. Your data syncs automatically when you reconnect to the internet.' },
              { q: 'Is there a free trial?', a: 'Yes. Start free with no credit card required. Cancel anytime with no setup or hidden fees.' },
              { q: 'Can my accountant access my books?', a: 'Yes. Invite your accountant with view or edit access. They can manage multiple clients from one login.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-200 transition-colors">
                <summary className="flex items-center justify-between cursor-pointer p-5 list-none">
                  <span className="text-base font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{faq.q}</span>
                  <ChevronDown className="faq-chevron h-5 w-5 text-emerald-600 shrink-0 ml-4" />
                </summary>
                <div className="faq-answer px-5 text-sm text-slate-600 leading-7">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — gradient mesh bookend */}
      <section className="mesh-bg py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute left-0 right-0 -top-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }} />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#0F9D6C] to-transparent" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="mesh-drift absolute top-[20%] left-[8%] h-[300px] w-[300px] bg-[#0F9D6C]/10 blur-[80px] rounded-full" />
          <div className="mesh-drift absolute bottom-[25%] right-[12%] h-[250px] w-[250px] bg-[#1BA37B]/8 blur-[70px] rounded-full" style={{ animationDelay: '5s' }} />
          <div className="ring-rotate absolute top-[20%] left-[8%] h-32 w-32 border border-emerald-500/15 rounded-full" />
          <div className="ring-rotate-reverse absolute bottom-[25%] right-[12%] h-24 w-24 border border-slate-500/10 rounded-full" />
          <div className="dot-bounce absolute top-[40%] left-[15%] h-1.5 w-1.5 bg-emerald-400/40 rounded-full" />
          <div className="dot-bounce absolute top-[60%] right-[20%] h-1.5 w-1.5 bg-slate-300/20 rounded-full" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-[2.5rem] font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Ready to take control of your business flow?
              </h2>
              <p className="text-slate-400 text-lg leading-8 mb-10">
                Try Rigel Business free and manage your invoices, VAT, inventory and reports from one connected dashboard. No credit card required.
              </p>
              <div className="flex flex-wrap items-center gap-4">
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
            <div className="hidden lg:block">
              <div className="glass-chip rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <span className="text-white font-semibold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Why businesses choose Rigel</span>
                </div>
                <div className="space-y-4 mb-6">
                  {['No setup fees or hidden costs', 'Works on desktop, web and mobile', 'SARS-compliant VAT201 filing', 'Multi-company from one dashboard'].map(benefit => (
                    <div key={benefit} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <img
                  src="/overview.png"
                  alt="Rigel dashboard preview"
                  className="w-full rounded-xl border border-white/10 shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers at Rigel */}
      <section className="py-16 lg:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0B1220] overflow-hidden shadow-xl flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 w-full h-64 lg:h-auto">
              <img
                src="/7f312e71b7b87b5da8826c9484050d98.jpg"
                alt="Careers at Rigel Business"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 w-full p-8 lg:p-12 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-400 tracking-wide uppercase mb-4">
                We are hiring
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Build your career with Rigel
              </h2>
              <p className="text-slate-300 leading-7 mb-6">
                Looking for your next opportunity? Explore open roles, post jobs and connect with teams shaping the future of business software in South Africa.
              </p>
              <a
                href="https://biz-flow-sa-two.vercel.app/careers"
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
              >
                View careers <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
