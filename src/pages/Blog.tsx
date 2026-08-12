import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Newspaper, Building2, Lightbulb,
} from 'lucide-react';

const categories = [
  {
    slug: 'small-business',
    icon: Building2,
    title: 'Small Business',
    desc: 'Practical tips, strategies and stories to help South African small businesses grow, manage cash flow and stay compliant.',
    accent: '#0F9D6C',
    posts: 6,
    image: '/Gemini_Generated_Image_xefbhfxefbhfxefb.png',
  },
  {
    slug: 'guide',
    icon: Lightbulb,
    title: 'Guide',
    desc: 'Step-by-step guides on accounting, VAT, payroll, inventory and reporting — written for business owners, not accountants.',
    accent: '#2563EB',
    posts: 6,
    image: '/The-importance-of-effective-financial-management-in-todays-businesses-1024x570.jpg',
  },
  {
    slug: 'company',
    icon: Newspaper,
    title: 'Company',
    desc: 'The story of Rigel Business — how we moved from Excel spreadsheets to a full business management platform.',
    accent: '#1BA37B',
    posts: 4,
    image: '/Gemini_Generated_Image_st6xx8st6xx8st6x.png',
  },
];

export function Blog() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Gemini_Generated_Image_xefbhfxefbhfxefb.png"
            alt="Rigel Business blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <BookOpen className="h-3.5 w-3.5 text-[#0F9D6C]" />
              <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">Rigel Blog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Insights, guides and stories for South African businesses
            </h1>
            <p className="text-lg text-slate-200 leading-8 mb-8 max-w-lg">
              Explore practical advice for small businesses, step-by-step guides and company news from the Rigel Business team.
            </p>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Explore by category</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Three blogs, one place
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/blog/${cat.slug}`}
                className="card-lift group overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img src={cat.image} alt={cat.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <cat.icon className="h-5 w-5" style={{ color: cat.accent }} />
                    </div>
                    <span className="text-white font-bold text-lg" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{cat.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 leading-7 mb-4">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{cat.posts} articles</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                      Read blog <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-14 w-14 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>More articles coming soon</h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            We're building a full library for South African businesses. Stay tuned for new articles every week.
          </p>
          <Link to="/book-demo" className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white">
            Book a demo <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
