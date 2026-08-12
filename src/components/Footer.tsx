import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Star, ArrowRight, Mail } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-two.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';
const COMPANY_LOGO = '/images%20(2).jpeg';

export function Footer() {
  return (
    <footer className="relative bg-[#0B1220] text-slate-400 overflow-hidden">
      <img
        src="/7-differences-between-book-keeping-and-accounting-1.jpeg.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#0B1220]/85 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 sm:h-36 bg-[#0052CC] pointer-events-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 pb-12 border-b border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            SARS-compliant
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Clock className="h-5 w-5 text-emerald-400" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />)}
            </div>
            Rated by SA businesses
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand + Newsletter */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={APP_ICON} alt="Rigel Business" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10" />
              <span className="font-black text-white text-lg">Rigel Business</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Smart accounting & business management software built for South African businesses.
            </p>
            <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 p-1 pr-1.5 max-w-xs">
              <Mail className="h-4 w-4 text-slate-500 ml-2.5 shrink-0" />
              <input
                type="email"
                placeholder="Get product updates"
                className="bg-transparent text-sm text-slate-300 placeholder:text-slate-500 outline-none flex-1 min-w-0"
              />
              <button className="h-8 w-8 rounded-full bg-[#0F9D6C] hover:bg-[#0B7A52] flex items-center justify-center transition-colors shrink-0">
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
              <li><Link to="/download" className="hover:text-emerald-400 transition-colors">Download</Link></li>
              <li><a href={`${APP_URL}/signup`} className="hover:text-emerald-400 transition-colors">Get Started</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-emerald-400 transition-colors cursor-default">Invoicing & Sales</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-default">Accounting & Ledger</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-default">VAT & Tax Reports</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-default">Multi-Company</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-default">Desktop App</span></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
              <li><a href={`${APP_URL}/login`} className="hover:text-emerald-400 transition-colors">Sign In</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-emerald-400 transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">Refund Policy</Link></li>
              <li><Link to="/popia-notice" className="hover:text-emerald-400 transition-colors">POPIA Notice</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Rigel Business. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img src={COMPANY_LOGO} alt="Company behind Rigel Business" className="h-8 w-8 rounded-full object-cover ring-1 ring-white/15" />
              <p>Created by the team behind Rigel</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={APP_ICON} alt="Rigel Business app icon" className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10" />
              <p>Made in South Africa 🇿🇦</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
