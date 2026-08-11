import { useEffect, useState } from 'react';
import { ArrowRight, Building2, Globe, Loader2, LockKeyhole, MapPin, Search, Shield, Store, Truck } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';
const SUPPLIER_FEED_URL = import.meta.env.VITE_RIGEL_HUB_SUPPLIERS_URL || `${APP_URL}/api/public/rigel-hub/suppliers`;

type HubSupplier = {
  name: string;
  category: string;
  province: string;
  rating?: string | number;
  tags?: string[];
};

export function RigelHub() {
  const [hubSuppliers, setHubSuppliers] = useState<HubSupplier[]>([]);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);
  const [feedError, setFeedError] = useState(false);
  const hasSharedSuppliers = hubSuppliers.length > 0;

  useEffect(() => {
    let isMounted = true;

    async function loadSuppliers() {
      try {
        const response = await fetch(SUPPLIER_FEED_URL);
        if (!response.ok) return;

        const data = await response.json();
        const sharedSuppliers = Array.isArray(data) ? data : data.suppliers;

        if (isMounted && Array.isArray(sharedSuppliers)) {
          setHubSuppliers(sharedSuppliers);
        }
      } catch {
        if (isMounted) {
          setFeedError(true);
          setHubSuppliers([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingSuppliers(false);
        }
      }
    }

    loadSuppliers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#06110e] text-white py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(27,163,123,0.34),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.16),transparent_30%)] pointer-events-none" />
        <img src={APP_ICON} alt="" className="absolute right-12 top-12 h-56 w-56 rounded-full object-cover opacity-[0.06] rotate-12" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-black text-[#70e1bf] mb-6">
                <Globe className="h-4 w-4" /> Opt-in supplier discovery
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
                Discover trusted suppliers in the Rigel Hub.
              </h1>
              <p className="text-lg leading-8 text-slate-300 max-w-xl mb-9">
                A live supplier directory powered by Rigel businesses that agree to share supplier details from the app.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`${APP_URL}/signup`} className="h-12 px-7 rounded-full bg-[#00df5f] hover:bg-[#16c957] text-slate-950 font-black text-sm flex items-center gap-2 transition-colors">
                  Join Rigel Business <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#hub-preview" className="h-12 px-7 rounded-full border border-white/20 text-white font-black text-sm flex items-center hover:bg-white/10 transition-colors">
                  View live hub
                </a>
              </div>
            </div>

            <div className="relative" id="hub-preview">
              <div className="absolute -inset-8 rounded-[3rem] bg-[#1BA37B]/20 blur-3xl" />
              <div className="relative rounded-[2rem] bg-white p-5 text-slate-900 shadow-2xl shadow-black/40">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-[#1BA37B] text-white flex items-center justify-center">
                      <Store className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xl font-black">Rigel Hub</p>
                      <p className="text-xs font-bold text-slate-400">
                        {isLoadingSuppliers ? 'Checking the app feed...' : hasSharedSuppliers ? 'Live shared supplier network' : 'Waiting for shared suppliers'}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-[#1BA37B]">Opt-in only</span>
                </div>
                <div className="mb-5 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-400">Search suppliers, categories or province...</span>
                </div>
                {isLoadingSuppliers ? (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
                    <Loader2 className="mx-auto mb-4 h-7 w-7 animate-spin text-[#1BA37B]" />
                    <p className="font-black text-slate-900">Loading shared suppliers</p>
                    <p className="mt-2 text-sm text-slate-500">Reading approved suppliers from the Rigel app.</p>
                  </div>
                ) : hasSharedSuppliers ? (
                  <div className="grid gap-3">
                    {hubSuppliers.slice(0, 3).map((supplier) => (
                      <div key={supplier.name} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-black text-slate-900">{supplier.name}</p>
                            <p className="mt-1 text-xs font-bold text-slate-400">{supplier.category}</p>
                          </div>
                          <div className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-[#1BA37B]">
                            Live
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500"><MapPin className="h-3 w-3" /> {supplier.province}</span>
                          {(supplier.tags || []).map(tag => (
                            <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-[#1BA37B]">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <Store className="mx-auto mb-4 h-8 w-8 text-slate-400" />
                    <p className="font-black text-slate-900">{feedError ? 'Supplier feed is not available yet' : 'No suppliers shared yet'}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {feedError ? 'Deploy the app endpoint, then this hub will show live shared suppliers.' : 'When users switch on Rigel Hub sharing in the app, approved suppliers will appear here.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">How it works</p>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Built around consent, trust and useful business data</h2>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-8">Rigel Hub only shows supplier information when a business agrees inside the app. The website reads the shared supplier feed and avoids exposing private records.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Permission first', desc: 'Businesses choose whether supplier details can appear in the shared hub.' },
              { icon: Search, title: 'Search by need', desc: 'Find suppliers by category, province, service type or product focus.' },
              { icon: Truck, title: 'Better buying decisions', desc: 'See useful supplier context before creating purchases inside Rigel.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-7 shadow-sm border border-slate-100">
                <div className="mb-5 h-12 w-12 rounded-2xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Supplier directory</p>
              <h2 className="text-4xl font-black text-slate-900 mb-5">A searchable supplier network for Rigel users</h2>
              <p className="text-slate-500 text-lg leading-8 mb-6">The Hub can now display suppliers from your app feed. When a user agrees to share supplier details, that approved supplier can appear here for other businesses to discover.</p>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <div className="flex gap-3">
                  <LockKeyhole className="h-6 w-6 text-[#1BA37B] shrink-0" />
                  <p className="text-sm leading-7 text-slate-600"><span className="font-black text-slate-900">Privacy note:</span> supplier details should only appear here when the business gives permission inside the app.</p>
                </div>
              </div>
            </div>
            {hasSharedSuppliers ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {hubSuppliers.map((supplier) => (
                  <div key={supplier.name} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/70 transition-shadow">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-[#1BA37B]">Live</div>
                    </div>
                    <h3 className="font-black text-slate-900 mb-1">{supplier.name}</h3>
                    <p className="text-xs font-bold text-slate-400 mb-4">{supplier.category}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mb-4"><MapPin className="h-3.5 w-3.5" /> {supplier.province}</div>
                    <button className="w-full h-10 rounded-xl bg-[#1BA37B] text-white text-sm font-black">Shared through Rigel</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <Building2 className="mx-auto mb-4 h-10 w-10 text-slate-400" />
                <h3 className="text-xl font-black text-slate-900">Live supplier directory is empty</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                  Add a supplier in the Rigel app, switch on Hub sharing, and it will feed this website automatically after deployment.
                </p>
                <a href={`${APP_URL}/login`} className="mx-auto mt-6 h-11 w-fit px-6 rounded-full bg-[#1BA37B] text-white text-sm font-black flex items-center justify-center gap-2">
                  Open Rigel app <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
