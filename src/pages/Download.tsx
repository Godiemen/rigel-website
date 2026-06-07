import { Monitor, Globe, Smartphone, Download as DownloadIcon, ArrowRight } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa.vercel.app';
const EXE_URL = 'https://github.com/Godiemen/rigel-business-releases/releases/download/v1.0.0/Rigel-Business_1.0.0_x64-setup.exe.exe';

export function Download() {
  return (
    <div>
      {/* Header */}
      <section
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/download-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute right-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">Choose your Rigel app</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight mb-6">
              Select how you want to use Rigel Business
            </h1>
            <p className="mx-auto max-w-2xl text-slate-300 text-lg leading-8 mb-10">
              Download the Windows desktop app, open Rigel instantly in your browser, or install the web app on your phone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={EXE_URL} className="h-14 px-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/30">
                <DownloadIcon className="h-5 w-5" /> Download for Windows
              </a>
              <a href={APP_URL} target="_blank" rel="noreferrer" className="h-14 px-9 rounded-xl border border-emerald-400 bg-transparent hover:bg-emerald-600/10 text-emerald-400 font-semibold flex items-center justify-center gap-2 transition-colors">
                Open Web App <ArrowRight className="h-5 w-5" />
              </a>
              <div className="h-14 px-9 rounded-xl border border-slate-600 bg-white/5 text-slate-400 font-semibold flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5" /> Mobile App · Coming Soon
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-400">
              Prefer mobile? Open the web app on your phone and add it to your home screen.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative min-h-[520px]">
              <div className="absolute left-4 right-12 top-0 transform -rotate-2">
                <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl shadow-black/25 border border-slate-200">
                  <div className="overflow-hidden rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      <span className="ml-3 text-xs text-slate-600">Rigel Business Desktop</span>
                    </div>
                    <img src="/desktop%20app.png" alt="Rigel Business desktop app screenshot" className="w-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-48 sm:w-56 transform rotate-3">
                <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-black/30 border border-slate-200">
                  <div className="relative overflow-hidden rounded-[2rem] bg-slate-50">
                    <div className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-black" />
                    <img src="/mobile%20app.png" alt="Rigel Business mobile PWA screenshot" className="w-full rounded-[1.75rem] object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Monitor, title: 'Windows desktop', desc: 'Download and install the native desktop app.' },
                { icon: Globe, title: 'Web app', desc: 'Open Rigel instantly from any modern browser.' },
                { icon: Smartphone, title: 'Mobile app', desc: 'Android and iOS apps are coming soon.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install guide */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Install on your phone right now</h2>
          <p className="text-slate-600 mb-10">You don't need to wait for the mobile app. Install the PWA in 3 steps:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Open in browser', desc: 'Go to biz-flow-sa.vercel.app in Chrome or Safari on your phone.' },
              { step: '2', title: 'Tap Share / Menu', desc: 'Tap the share button (Safari) or three-dot menu (Chrome).' },
              { step: '3', title: 'Add to Home Screen', desc: 'Tap "Add to Home Screen" — it installs like a native app.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-600 text-white font-semibold text-xl flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h4 className="font-semibold text-slate-900 mb-1">{s.title}</h4>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
