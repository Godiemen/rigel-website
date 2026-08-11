import { useState, useEffect, useRef, type ReactNode, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play,
  ShoppingCart, Users, FileText, CreditCard, BarChart3,
  Calculator, AlertTriangle, Landmark, RefreshCw, Upload, ClipboardList,
  TrendingUp, ShieldCheck,
  Zap, ArrowLeftRight, GraduationCap,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';



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

const PURCHASE_DEMO_VIDEOS = [
  { url: 'https://youtu.be/seiiD01ce8g', title: 'Purchase demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/hXLepZIo6v0', title: 'Purchase demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/jrP8vDXKDfM', title: 'Purchase demo 3', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/GyD2Y7n6uAA', title: 'Purchase demo 4', desc: 'by Rigel Team' },
];

function PurchaseVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Purchase demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

const reports = [
  { icon: BarChart3, title: 'Creditors Control Report', desc: 'Detailed creditors ageing with supplier breakdown.' },
  { icon: TrendingUp, title: 'AP Dashboard', desc: 'Full AP analytics with interactive charts and KPIs.' },
  { icon: FileText, title: 'Accounts Payable Report', desc: 'AP summary and working papers for accountants.' },
  { icon: ClipboardList, title: 'Creditors Control Working Paper', desc: 'Reconciliation working paper for audit trails.' },
  { icon: Users, title: 'Creditors Per Supplier Report', desc: 'Per-supplier outstanding balances and history.' },
  { icon: CreditCard, title: 'Payment Report', desc: 'History of all supplier payments with allocations.' },
  { icon: TrendingUp, title: 'AP Cash Flow Forecast', desc: 'Projected AP cash outflows by period.' },
  { icon: Users, title: 'Supplier List Report', desc: 'All suppliers and their current balances.' },
  { icon: ShoppingCart, title: 'Purchases by Item Report', desc: 'Purchase history analysis by inventory item.' },
  { icon: Users, title: 'Purchase by Supplier Report', desc: 'Spending analysis per supplier with trends.' },
  { icon: ArrowLeftRight, title: 'Return Report', desc: 'Summary of returns and debit notes processed.' },
  { icon: FileText, title: 'Supplier Statement', desc: 'Printable supplier account statement with transaction history.' },
];

const tutorialSteps = [
  { num: '01', title: 'Overview', desc: 'Introduction to the Purchase module' },
  { num: '02', title: 'Suppliers', desc: 'Create and manage supplier profiles' },
  { num: '03', title: 'Purchase Orders', desc: 'Raise and track POs' },
  { num: '04', title: 'Supplier Invoices', desc: 'Capture and manage bills' },
  { num: '05', title: 'Create Invoice', desc: 'Step-by-step bill creation' },
  { num: '06', title: 'Payments', desc: 'Process supplier payments' },
  { num: '07', title: 'Returns & Credits', desc: 'Handle debit notes and returns' },
  { num: '08', title: 'Import CSV', desc: 'Bulk import suppliers and POs' },
  { num: '09', title: 'Reconciliation', desc: 'Match supplier statements' },
  { num: '10', title: 'Reports', desc: 'Generate AP and creditors reports' },
  { num: '11', title: 'Complete', desc: 'You are ready to manage purchases' },
];

const accountingEntries = [
  { action: 'Supplier Invoice', debit: 'Expense (or Inventory)', credit: 'Accounts Payable' },
  { action: 'Supplier Payment', debit: 'Accounts Payable', credit: 'Bank / Cash' },
  { action: 'Debit Note / Return', debit: 'Accounts Payable', credit: 'Expense / Inventory' },
  { action: 'Director Paid Settlement', debit: 'Accounts Payable', credit: 'Director Loan Payable' },
];

export function Purchase() {
  const [playingVideo, setPlayingVideo] = useState<typeof PURCHASE_DEMO_VIDEOS[number] | null>(null);
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
            src="/Gemini_Generated_Image_cq6dxlcq6dxlcq6d.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <ShoppingCart className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Purchase Management</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Your procurement command centre
            </h1>
            <p className="text-lg text-slate-600 leading-8 mb-8 max-w-lg">
              Manage suppliers, purchase orders, supplier invoices, payments, returns and full accounts payable — all in one integrated module built for South African businesses.
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

      {/* Module overview — 4 pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Four pillars of procurement
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Everything from supplier onboarding to payment — integrated with your general ledger.
            </p>
          </div>
          <CardSlider>
            {[
              { icon: Users, title: 'Suppliers', desc: 'Profiles, tax numbers, payment terms and opening balances.' },
              { icon: FileText, title: 'Purchase Orders', desc: 'Raise POs, track status, convert to supplier invoices.' },
              { icon: ShoppingCart, title: 'Supplier Invoices', desc: 'Capture bills with VAT, auto double-entry to GL.' },
              { icon: ArrowLeftRight, title: 'Adjustments', desc: 'Debit notes, returns, credit notes and refunds.' },
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

      {/* Purchase demo videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Purchase module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to watch a short demo of procurement, supplier bills and payments.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(PURCHASE_DEMO_VIDEOS.length).padStart(2, '0')}
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
                  const i = Math.min(PURCHASE_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
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
                setActiveVideoIndex(Math.max(0, Math.min(index, PURCHASE_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {PURCHASE_DEMO_VIDEOS.map((video, i) => (
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
              {PURCHASE_DEMO_VIDEOS.map((_, i) => (
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
            <PurchaseVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* AP Dashboard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">AP Dashboard</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Real-time accounts payable at a glance
            </h2>
          </div>
          <CardSlider className="mb-8">
            {[
              { label: 'Unpaid Bills', value: 'R 0', icon: FileText, color: 'text-amber-600' },
              { label: 'Overdue Bills', value: 'R 0', icon: AlertTriangle, color: 'text-red-600' },
              { label: 'Paid Bills', value: 'R 0', icon: CheckCircle2, color: 'text-emerald-600' },
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
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AP Ageing Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Current (0-30)', pct: 45, color: 'bg-emerald-500' },
                  { label: '31-60 days', pct: 25, color: 'bg-amber-500' },
                  { label: '61-90 days', pct: 18, color: 'bg-orange-500' },
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
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Paid vs Unpaid</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-r-transparent border-b-transparent rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">65%</p>
                      <p className="text-[10px] text-slate-400">Paid</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-xs text-slate-600">Paid</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="text-xs text-slate-600">Unpaid</span></div>
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
              Intelligent alerts that prioritise action
            </h2>
          </div>
          <CardSlider>
            {[
              { icon: FileText, title: 'Pending Bills', desc: 'Bills awaiting approval or payment.', color: 'amber' },
              { icon: AlertTriangle, title: 'Unpaid Invoices', desc: 'Overdue supplier invoices need attention.', color: 'red' },
              { icon: Users, title: 'Unpaid Suppliers', desc: 'Suppliers with outstanding balances.', color: 'orange' },
              { icon: ClipboardList, title: 'Pending POs', desc: 'Purchase orders not yet processed.', color: 'blue' },
              { icon: Calculator, title: 'Depreciation Reminders', desc: 'Assets due for depreciation posting.', color: 'purple' },
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
            <div className="h-12 w-12 rounded-full bg-[#1BA37B] text-white flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>AI-Powered Insights</h3>
              <p className="text-sm text-slate-600 leading-6">Smart messages prioritise your actions — telling you exactly which bills to pay, which suppliers to follow up with, and when cash outflow is projected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Payments & Banking */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Payments & Banking</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Integrated supplier payments
            </h2>
          </div>
          <CardSlider>
            {[
              { icon: CreditCard, title: 'Process Payments', desc: 'Pay suppliers directly from the Purchase module with automatic bank/cash allocation.' },
              { icon: Landmark, title: 'Banking Integration', desc: 'Allocate bank and cash transactions to supplier bills from the Banking module.' },
              { icon: Users, title: 'Director Paid', desc: 'When a director pays personally, the system creates a settlement: Debit AP / Credit Director Loan Payable.' },
              { icon: RefreshCw, title: 'Refunds & Advances', desc: 'Track supplier deposits, advance payments and allocate refunds from Banking receipts.' },
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
              12 reports for complete AP visibility
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

      {/* Supplier Reconciliation + Recurring Bills + CSV Import + Bill Management */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CardSlider>
            {/* Reconciliation */}
            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={ClipboardList} index={0} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Supplier Reconciliation</h3>
                <ul className="space-y-2">
                  {['Match supplier statements against system records', 'Identify discrepancies between balances and remittance', 'Reconciliation working paper for audit trails'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recurring Bills */}
            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={RefreshCw} index={1} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Recurring Bills</h3>
                <ul className="space-y-2">
                  {['Set up recurring supplier bills — monthly, quarterly, annually', 'Auto-generation of bills on schedule', 'Edit or pause recurring templates anytime'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CSV Import */}
            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={Upload} index={2} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>CSV Import</h3>
                <ul className="space-y-2">
                  {['Bulk import suppliers from CSV', 'Bulk import purchase orders from CSV', 'Template download and validation'].map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-6">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bill Management */}
            <div className="shrink-0 snap-start w-[85%] sm:w-[55%] lg:w-[40%] bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <CardAvatar icon={FileText} index={3} />
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Bill Management</h3>
                <ul className="space-y-2">
                  {['Full lifecycle: Pending → Approved → Paid → Cancelled/Returned', 'Approval workflow and bulk actions (approve, pay, cancel)', 'Bill ageing and due date tracking'].map(f => (
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
              Walks users through the entire Purchase module — from overview to completion.
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
            Take control of your procurement
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Manage suppliers, raise POs, track bills and pay on time — all with automatic double-entry accounting. Start your 7-day free trial.
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
