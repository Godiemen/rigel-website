import { Monitor, Globe, Smartphone, Users, Download as DownloadIcon, ArrowRight } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';
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

      {/* Platform Cards */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-3">Choose your platform</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Select how you want to use Rigel Business</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Desktop Card */}
            <div className="bg-white border border-slate-200">
              <div className="aspect-[16/10] bg-slate-100">
                <img
                  src="/Screenshot%202026-06-11%20211808.png"
                  alt="Rigel Business desktop app"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <Monitor className="h-5 w-5 text-slate-900 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Windows desktop</h3>
                <p className="text-sm leading-6 text-slate-500 mb-4">Download and install the native desktop app for offline performance.</p>
                <a href={EXE_URL} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline">
                  Download <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Web App Card */}
            <div className="bg-white border border-slate-200">
              <div className="aspect-[16/10] bg-slate-100">
                <img
                  src="/Screenshot%202026-06-12%20084033.png"
                  alt="Rigel Business web app"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <Globe className="h-5 w-5 text-slate-900 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Web app</h3>
                <p className="text-sm leading-6 text-slate-500 mb-4">Open Rigel instantly from any modern browser — nothing to install.</p>
                <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline">
                  Open app <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Mobile App Card */}
            <div className="bg-white border border-slate-200">
              <div className="aspect-[16/10] bg-slate-100">
                <img
                  src="/Screenshot%202026-06-12%20090016.png"
                  alt="Rigel Business mobile app"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <Smartphone className="h-5 w-5 text-slate-900 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Mobile app</h3>
                <p className="text-sm leading-6 text-slate-500 mb-4">Android and iOS native apps are coming soon. Use PWA today.</p>
                <a href="#pwa" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Payroll Portal Card */}
            <div className="bg-white border border-slate-200">
              <div className="aspect-[16/10] bg-slate-100">
                <img
                  src="/Screenshot%202026-06-12%20085452.png"
                  alt="Rigel Business payroll portal"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <Users className="h-5 w-5 text-slate-900 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Payroll portal</h3>
                <p className="text-sm leading-6 text-slate-500 mb-4">Manage employee records, payslips, and SARS submissions from a dedicated portal.</p>
                <a href={`${APP_URL}/login`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline">
                  Access portal <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install guide */}
      <section id="pwa" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-emerald-400/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">Progressive Web App</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">Install on your phone right now</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">You don't need to wait for the mobile app. Install the PWA in 3 steps and get a native-like experience today.</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500/60 to-emerald-500/20" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Open in browser', desc: 'Go to biz-flow-sa-delta.vercel.app in Chrome or Safari on your phone.' },
                { step: '02', title: 'Tap Share / Menu', desc: 'Tap the share button (Safari) or three-dot menu (Chrome).' },
                { step: '03', title: 'Add to Home Screen', desc: 'Tap "Add to Home Screen" — it installs like a native app.' },
              ].map((s) => (
                <div key={s.step} className="relative text-center">
                  <div className="relative inline-flex h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-lg items-center justify-center mx-auto mb-5">
                    {s.step}
                  </div>
                  <h4 className="font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-slate-400 text-sm leading-6 max-w-xs mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
