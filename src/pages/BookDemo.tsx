import { CalendarDays, CheckCircle2, Clock, Mail, Phone, UserRound } from 'lucide-react';

export function BookDemo() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24 text-white">
        <div className="absolute inset-0 opacity-[0.08] hero-grid bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute right-[8%] top-12 h-[32rem] w-[32rem] rounded-full bg-[#00df5f] opacity-20 blur-2xl hero-orb" />
        <div className="absolute -left-24 bottom-10 h-[24rem] w-[24rem] rounded-full bg-blue-500 opacity-10 blur-3xl hero-orb-slow" />
        <div className="absolute left-1/3 top-0 h-full w-24 bg-white/10 blur-2xl hero-shimmer" />
        <div className="absolute right-20 bottom-20 h-32 w-32 rounded-[2rem] border border-emerald-300/20 bg-emerald-300/10 rotate-12 hero-drift" />
        <div className="absolute left-16 top-28 h-20 w-20 rounded-full border border-white/10 bg-white/5 hero-orb-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,163,123,0.34),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.14),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-[#70e1bf] mb-6">
                <CalendarDays className="h-4 w-4" /> Book a demo
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">See how Rigel Business can fit your company.</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300 mb-8">
                Request a guided demo for accounting, VAT, invoicing, purchases, inventory, payroll, reporting and multi-company management.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Understand the right plan for your business',
                  'See VAT, AFS, trial balance and ledger reports',
                  'Learn desktop, web and phone PWA options',
                  'Ask questions before signing up',
                ].map(item => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/10 p-4 border border-white/10">
                    <CheckCircle2 className="h-5 w-5 text-[#70e1bf] shrink-0" />
                    <p className="text-sm font-semibold leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 lg:p-8 text-slate-900 shadow-2xl shadow-black/40">
              <div className="mb-8">
                <h2 className="text-3xl font-black mb-2">Request your demo</h2>
                <p className="text-slate-500 leading-7">Fill in your details and the Rigel Business team will contact you.</p>
              </div>

              <form action="mailto:info@rigelbusiness.co.za" method="post" encType="text/plain" className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><UserRound className="h-4 w-4 text-[#1BA37B]" /> Full name</span>
                    <input name="Full name" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><Mail className="h-4 w-4 text-[#1BA37B]" /> Email address</span>
                    <input name="Email" type="email" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="you@company.co.za" />
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><Phone className="h-4 w-4 text-[#1BA37B]" /> Phone number</span>
                    <input name="Phone" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="+27..." />
                  </label>
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-black text-slate-700"><Clock className="h-4 w-4 text-[#1BA37B]" /> Preferred time</span>
                    <input name="Preferred time" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="Morning / Afternoon" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">Company name</span>
                  <input name="Company" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="Company name" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-black text-slate-700">What do you want to see?</span>
                  <textarea name="Demo request" rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#1BA37B] focus:ring-4 focus:ring-[#1BA37B]/10" placeholder="Example: VAT reports, invoices, payroll, inventory, multi-company setup..." />
                </label>

                <button type="submit" className="w-full rounded-xl bg-[#1BA37B] px-6 py-4 text-sm font-black text-white hover:bg-[#158a66] transition-colors">
                  Send demo request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
