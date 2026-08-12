import { Monitor, Globe, Smartphone, Users, Download as DownloadIcon, ArrowRight, CheckCircle2, Wifi, WifiOff, Shield, Zap } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-two.vercel.app';
const EXE_URL = 'https://github.com/Godiemen/rigel-business-releases/releases/download/v1.0.0/Rigel-Business_1.0.0_x64-setup.exe.exe';

export function Download() {
  return (
    <div className="bg-white">
      {/* Hero — split layout with image showcase */}
      <section className="relative overflow-hidden">
        {/* Background image full-bleed */}
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_bgff3ubgff3ubgff.png"
            alt="Rigel Business platform"
            className="w-full h-full object-cover"
          />
          {/* White gradient scrim from left for text legibility */}
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          {/* Bottom fade into white */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D6C] animate-pulse" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Choose your Rigel app</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Select how you want to use Rigel Business
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Download the Windows desktop app, open Rigel instantly in your browser, or install the web app on your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={EXE_URL}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white"
              >
                <DownloadIcon className="h-5 w-5" /> Download for Windows
              </a>
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-pill inline-flex h-12 items-center border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 px-7 font-semibold text-white"
              >
                Open Web App <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500">
              <Smartphone className="h-4 w-4" /> Mobile app coming soon — use PWA today
            </div>
          </div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Choose your platform</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Available on every device
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Desktop Card */}
            <div className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src="/Screenshot%202026-06-11%20211808.png"
                  alt="Rigel Business desktop app"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Monitor className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Windows desktop</h3>
                <p className="text-sm leading-6 text-slate-500 mb-3">Download and install the native desktop app for offline performance.</p>
                <a href={EXE_URL} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Download <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Web App Card */}
            <div className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src="/Screenshot%202026-06-12%20084033.png"
                  alt="Rigel Business web app"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Web app</h3>
                <p className="text-sm leading-6 text-slate-500 mb-3">Open Rigel instantly from any modern browser — nothing to install.</p>
                <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Open app <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Mobile App Card */}
            <div className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src="/Screenshot%202026-06-12%20090016.png"
                  alt="Rigel Business mobile app"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Mobile app</h3>
                <p className="text-sm leading-6 text-slate-500 mb-3">Android and iOS native apps are coming soon. Use PWA today.</p>
                <a href="#pwa" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Payroll Portal Card */}
            <div className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src="/Screenshot%202026-06-12%20085452.png"
                  alt="Rigel Business payroll portal"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Payroll portal</h3>
                <p className="text-sm leading-6 text-slate-500 mb-3">Manage employee records, payslips, and SARS submissions from a dedicated portal.</p>
                <a href={`${APP_URL}/login`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Access portal <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights + System requirements combined */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Why download</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Built for the way South African businesses work
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: WifiOff, title: 'Works offline', desc: 'Desktop app runs without internet. Syncs when you reconnect.' },
              { icon: Shield, title: 'Bank-grade security', desc: '256-bit encryption with daily encrypted off-site backups.' },
              { icon: Zap, title: 'Fast & native', desc: 'Native Windows performance with instant load times.' },
              { icon: Wifi, title: 'Cloud sync', desc: 'Switch between desktop and web seamlessly. Data stays in sync.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                <div className="h-12 w-12 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                <p className="text-xs text-slate-500 leading-5">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide" style={{ fontFamily: "'Inter Tight', sans-serif" }}>System requirements</h3>
              <ul className="space-y-2">
                {['Windows 10 or later (64-bit)', '4 GB RAM minimum', '500 MB free disk space', 'Internet for cloud sync'].map(req => (
                  <li key={req} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide" style={{ fontFamily: "'Inter Tight', sans-serif" }}>What's included</h3>
              <ul className="space-y-2">
                {['Full accounting & VAT modules', 'Inventory & payroll management', 'Financial reporting & AFS', 'Multi-company support', 'Free updates for life'].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install guide */}
      <section id="pwa" className="mesh-bg py-16 lg:py-24 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Progressive Web App</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Install on your phone right now
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto leading-7">
              Don't wait for the mobile app. Install the PWA in 3 steps and get a native-like experience today.
            </p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-9 left-[16%] right-[16%] h-px border-t border-dashed border-emerald-500/25" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Open in browser', desc: 'Go to biz-flow-sa-two.vercel.app in Chrome or Safari on your phone.' },
                { step: '02', title: 'Tap Share / Menu', desc: 'Tap the share button (Safari) or three-dot menu (Chrome).' },
                { step: '03', title: 'Add to Home Screen', desc: 'Tap "Add to Home Screen" — it installs like a native app.' },
              ].map((s) => (
                <div key={s.step} className="relative text-center">
                  <div className="relative inline-flex h-18 w-18 rounded-full bg-[#0F9D6C] text-white font-bold text-lg items-center justify-center mx-auto mb-4" style={{ width: '4.5rem', height: '4.5rem', boxShadow: '0 0 30px rgba(15, 157, 108, 0.3)' }}>
                    {s.step}
                  </div>
                  <h4 className="font-bold text-white mb-1.5 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.title}</h4>
                  <p className="text-slate-400 text-xs leading-5 max-w-xs mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
            >
              Open web app <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
