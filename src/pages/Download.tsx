import { Monitor, Globe, Smartphone, Download as DownloadIcon, ArrowRight } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa.vercel.app';
const EXE_URL = 'https://github.com/Godiemen/rigel-business-releases/releases/download/v1.0.0/Rigel-Business_1.0.0_x64-setup.exe.exe';

export function Download() {
  return (
    <div>
      {/* Header */}
      <section
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/c5249ea983aad75a18f77e78a01d98299dd27701.webp')" }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#062033] to-[#071f1a]" />
        <div className="hero-grid absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div className="hero-soft-pulse absolute left-[10%] top-16 h-64 w-64 rounded-full bg-[#00df5f] opacity-20 blur-3xl" />
        <div className="hero-orb-slow absolute right-[12%] bottom-14 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-[#70e1bf]">Choose your Rigel app</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight mb-6">
              Select how you want to use Rigel Business
            </h1>
            <p className="mx-auto max-w-2xl text-slate-300 text-lg leading-8 mb-10">
              Download the Windows desktop app, open Rigel instantly in your browser, or install the web app on your phone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={EXE_URL} className="h-14 px-9 rounded-none bg-[#00df5f] hover:bg-[#16c957] text-slate-950 font-black flex items-center justify-center gap-2 transition-colors shadow-xl shadow-emerald-500/20">
                <DownloadIcon className="h-5 w-5" /> Download for Windows
              </a>
              <a href={APP_URL} target="_blank" rel="noreferrer" className="h-14 px-9 rounded-none border border-[#00df5f] bg-transparent hover:bg-[#00df5f]/10 text-[#00df5f] font-black flex items-center justify-center gap-2 transition-colors">
                Open Web App <ArrowRight className="h-5 w-5" />
              </a>
              <div className="h-14 px-9 rounded-none border border-white/20 bg-white/5 text-slate-400 font-black flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5" /> Mobile App · Coming Soon
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-400">
              Prefer mobile? Open the web app on your phone and add it to your home screen.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative min-h-[520px]">
              <div className="hero-device-float absolute left-0 right-8 top-4">
                <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-black/40 ring-1 ring-white/70">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white">
                    <div className="flex items-center gap-2 border-b border-slate-100 bg-white px-5 py-3">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-amber-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-3 text-xs font-bold text-slate-500">Rigel Business Desktop</span>
                    </div>
                    <div className="relative bg-white">
                      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none" />
                      <img src="/desktop%20app.png" alt="Rigel Business desktop app screenshot" className="relative z-0 w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-device-float absolute bottom-0 right-0 w-48 sm:w-56 rounded-[2.8rem] bg-white p-2.5 shadow-2xl shadow-black/60 ring-1 ring-white/70 [animation-delay:-3s]">
                <div className="relative overflow-hidden rounded-[2.25rem] bg-white p-1.5">
                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-white" />
                  <div className="absolute inset-x-8 top-3 z-20 h-1 rounded-full bg-slate-200" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/18 via-transparent to-transparent pointer-events-none" />
                  <img src="/mobile%20app.png" alt="Rigel Business mobile PWA screenshot" className="relative z-0 w-full rounded-[1.85rem] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-100">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Monitor, title: 'Windows desktop', desc: 'Download and install the native desktop app.' },
                { icon: Globe, title: 'Web app', desc: 'Open Rigel instantly from any modern browser.' },
                { icon: Smartphone, title: 'Mobile app', desc: 'Android and iOS apps are coming soon.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="mb-4 h-11 w-11 rounded-xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install guide */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Install on your phone right now</h2>
          <p className="text-slate-500 mb-10">You don't need to wait for the mobile app. Install the PWA in 3 steps:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Open in browser', desc: 'Go to biz-flow-sa.vercel.app in Chrome or Safari on your phone.' },
              { step: '2', title: 'Tap Share / Menu', desc: 'Tap the share button (Safari) or three-dot menu (Chrome).' },
              { step: '3', title: 'Add to Home Screen', desc: 'Tap "Add to Home Screen" — it installs like a native app.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-[#1BA37B] text-white font-black text-xl flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h4 className="font-bold text-slate-900 mb-1">{s.title}</h4>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
