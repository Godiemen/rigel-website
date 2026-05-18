import { ArrowRight, CheckCircle2, MessageCircle, MessagesSquare, Search, Sparkles, UserRound } from 'lucide-react';

const topics = [
  { title: 'VAT setup and VAT201 reporting', replies: 18, tag: 'VAT', author: 'stella-lumen' },
  { title: 'How to read the trial balance report', replies: 12, tag: 'Accounting', author: 'Rigel Support' },
  { title: 'Best way to track supplier payments', replies: 9, tag: 'Purchases', author: 'Community' },
  { title: 'Installing Rigel Business as a phone PWA', replies: 15, tag: 'Download', author: 'Rigel Support' },
];

const categories = ['Accounting help', 'VAT & SARS', 'Sales', 'Purchases', 'Payroll', 'Inventory'];

export function Forum() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24 text-white">
        <div className="absolute right-[8%] top-12 h-[34rem] w-[34rem] rounded-full bg-[#00df5f] opacity-20 blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,163,123,0.32),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.14),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-[#70e1bf] mb-6">
                <MessagesSquare className="h-4 w-4" /> Rigel Forum
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">Ask questions. Share answers. Grow with Rigel.</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300 mb-8">
                A community space for Rigel Business users to discuss VAT, accounting, sales, purchases, payroll, inventory and app setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="h-12 px-6 rounded-xl bg-[#1BA37B] hover:bg-[#158a66] text-white font-black flex items-center justify-center gap-2 transition-colors">
                  Start a discussion <ArrowRight className="h-5 w-5" />
                </button>
                <button className="h-12 px-6 rounded-xl border border-white/10 bg-white/10 text-white font-black hover:bg-white/15 transition-colors">
                  Browse topics
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-[#1BA37B]/20 blur-3xl" />
              <div className="relative rounded-[2rem] bg-white p-5 text-slate-900 shadow-2xl shadow-black/40">
                <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-400">Search forum questions...</span>
                </div>
                <div className="space-y-3">
                  {topics.map(topic => (
                    <div key={topic.title} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-[#1BA37B]/30 transition-colors">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1BA37B]">{topic.tag}</span>
                        <span className="text-xs font-black text-slate-400">{topic.replies} replies</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">{topic.title}</h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <UserRound className="h-3.5 w-3.5" /> {topic.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Community categories</p>
            <h2 className="text-4xl font-black text-slate-900">Find help by business area</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <div key={category} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/70 transition-shadow">
                <div className="mb-5 h-12 w-12 rounded-2xl bg-[#1BA37B]/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-[#1BA37B]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{category}</h3>
                <p className="text-sm leading-7 text-slate-500">Ask practical questions, learn from other users and find helpful Rigel Business tips.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-950 p-8 lg:p-12 text-white shadow-2xl shadow-slate-200/80">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#70e1bf] text-sm font-black mb-4">
                  <Sparkles className="h-4 w-4" /> Forum preview
                </div>
                <h2 className="text-3xl font-black mb-4">A full community forum is coming soon.</h2>
                <p className="text-slate-400 leading-8 max-w-2xl">
                  This page is ready as a polished preview. Later it can connect to real user posts, comments, votes, accepted answers and notifications inside Rigel Business.
                </p>
              </div>
              <div className="space-y-3 min-w-[220px]">
                {['Questions and answers', 'Accepted solutions', 'Rigel support replies'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-[#70e1bf]" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
