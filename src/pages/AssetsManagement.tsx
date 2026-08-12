import { useState, useEffect, useRef, type ReactNode, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronLeft, ChevronRight, X, Play, ChevronDown, CheckCircle2,
  TrendingUp, ArrowLeftRight, FileText,
  ShieldCheck, AlertTriangle,
  Wallet, Building, Gem,
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

const ASSETS_DEMO_VIDEOS = [
  { url: 'https://youtu.be/McdNhTbbqJQ', title: 'Assets demo 1', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/-avE67UETxc', title: 'Assets demo 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/lgQTtgg5q7M', title: 'Assets demo 3', desc: 'by Rigel Team' },
];

function AssetsVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Assets demo video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

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

const assetCategories = [
  { title: 'Office equipment', desc: 'Computers, printers, and peripherals.', image: '/assets register .png' },
  { title: 'Furniture & fittings', desc: 'Desks, chairs, and fixtures.', image: '/assets manangement.png' },
  { title: 'Vehicles', desc: 'Cars, trucks, and delivery vehicles.', image: '/assets report graphs .png' },
  { title: 'Machinery', desc: 'Plant, tools, and production equipment.', image: '/add assets form .png' },
  { title: 'Buildings', desc: 'Property, offices, and warehouses.', image: '/assets register .png' },
  { title: 'Intangible assets', desc: 'Patents, software, and licences.', image: '/assets manangement.png' },
];

const whyItMatters = [
  { title: 'Accurate NBV', desc: 'Keep correct depreciation and net book values.', image: '/deprciation schedule.png' },
  { title: 'Compliant', desc: 'Stay aligned with accounting and tax rules.', image: '/depreciation policies .png' },
  { title: 'Disposals', desc: 'Correctly record sales, scrap and donations.', image: '/depreciation schedule 4.png' },
  { title: 'Impairment', desc: 'Recognise write-downs at the right time.', image: '/impairment calculator.png' },
  { title: 'Audit-ready', desc: 'Clean, traceable reports for your accountant.', image: '/assets report graphs .png' },
];

function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
}: {
  section: {
    icon: ComponentType<{ className?: string }>;
    name: string;
    tagline: string;
    description: string;
    features: string[];
  };
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

export function AssetsManagement() {
  const [playingVideo, setPlayingVideo] = useState<typeof ASSETS_DEMO_VIDEOS[number] | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
              <Building className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Fixed Assets</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Track, Depreciate, Dispose of, and Impair Assets
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Full control over fixed assets from purchase to disposal, with depreciation schedules, impairment, expected credit losses and inventory NRV write-downs.
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

      {/* Asset Categories */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Fixed Assets Register</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Every asset category in one register
            </h2>
          </div>
          <CardSlider>
            {assetCategories.map((item) => (
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

      {/* How Fixed Asset Journals Work */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Journals</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              How Fixed Asset Journals Work
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: Wallet,
                name: 'Asset Purchase Journal',
                tagline: 'Records the asset and payment source',
                description: 'When you record a new asset purchase, Rigel creates the asset on your balance sheet and records the payment source.',
                features: [
                  'Debit asset cost account — the asset is added to your books.',
                  'Credit bank, loan, equity or director loan payable — matching the funding source.',
                  'VAT input recorded where applicable.',
                  'Rigel creates the fixed asset account automatically if needed.',
                ],
              },
              {
                icon: TrendingUp,
                name: 'Asset Depreciation Journal',
                tagline: 'Spreads cost over useful life',
                description: 'Depreciation spreads the cost of an asset over its useful life. Each month-end run posts the correct period charge.',
                features: [
                  'Debit depreciation expense account.',
                  'Credit accumulated depreciation contra-asset account.',
                  'Net book value = cost - accumulated depreciation - impairment.',
                  'One journal per asset or a combined journal for all assets.',
                ],
              },
              {
                icon: ArrowLeftRight,
                name: 'Asset Disposal Journal (Sale)',
                tagline: 'Gain or loss on sale',
                description: 'When an asset is sold, Rigel compares the sale proceeds with the net book value to work out a gain or loss.',
                features: [
                  'Removes the asset from the balance sheet.',
                  'Derecognises accumulated depreciation.',
                  'Records proceeds as a receivable if not yet received.',
                  'Posts gain on sale or loss on sale as required.',
                ],
              },
              {
                icon: AlertTriangle,
                name: 'Asset Scrap Journal',
                tagline: 'Write off unusable assets',
                description: 'When an asset is no longer useful and is scrapped, Rigel derecognises it and records any scrap proceeds.',
                features: [
                  'Debit accumulated depreciation and loss on disposal.',
                  'Credit asset cost account.',
                  'Scrap proceeds recorded as a receivable if applicable.',
                  'Gain on scrapping posted if proceeds exceed net book value.',
                ],
              },
              {
                icon: ShieldCheck,
                name: 'Lost or Stolen Asset Journal',
                tagline: 'Insurance and write-offs',
                description: 'When an asset is lost or stolen, Rigel writes it off and lets you record any expected insurance claim.',
                features: [
                  'Debit insurance claim receivable for the expected payout.',
                  'Derecognise accumulated depreciation.',
                  'Post any uninsured net book value as a loss.',
                  'Remove the original asset cost from the books.',
                ],
              },
              {
                icon: Gem,
                name: 'Donated Asset Journal',
                tagline: 'Donations and tax tracking',
                description: 'When an asset is donated, the net book value is recorded as a donation expense and tax details are tracked.',
                features: [
                  'Debit donations expense and accumulated depreciation.',
                  'Credit asset cost account.',
                  'Derecognise any accumulated impairment.',
                  'Track Section 18A certificates, donee details and donations tax warnings.',
                ],
              },
              {
                icon: FileText,
                name: 'Why Automatic Journals Matter',
                tagline: 'No manual debits and credits',
                description: 'You do not need to know accounting debits and credits to record asset movements in Rigel.',
                features: [
                  'Posts the correct accounts automatically.',
                  'Creates missing gain/loss and donation accounts if needed.',
                  'Keeps fixed asset register, general ledger and trial balance in sync.',
                  'Makes disposals, scrap and donations audit-ready.',
                ],
              },
            ].map((sec, i) => (
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

      {/* Fixed Assets demo videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Watch the Fixed Assets module in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to watch a short fixed assets demo.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(ASSETS_DEMO_VIDEOS.length).padStart(2, '0')}
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
                  const i = Math.min(ASSETS_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
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
                setActiveVideoIndex(Math.max(0, Math.min(index, ASSETS_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {ASSETS_DEMO_VIDEOS.map((video, i) => (
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
              {ASSETS_DEMO_VIDEOS.map((_, i) => (
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
            <AssetsVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Why It Matters */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Why It Matters</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Keep the balance sheet accurate
            </h2>
          </div>
          <CardSlider>
            {whyItMatters.map((item) => (
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

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Manage assets with confidence
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Track, depreciate, dispose of, and impair fixed assets — all with automatic double-entry accounting and audit-ready reports.
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
