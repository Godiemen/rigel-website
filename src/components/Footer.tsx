import { Link } from 'react-router-dom';

const APP_URL = 'https://biz-flow-sa.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';
const COMPANY_LOGO = '/images%20(2).jpeg';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={APP_ICON} alt="Rigel Business" className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/10" />
              <span className="font-black text-white text-lg">Rigel Business</span>
            </div>
            <p className="text-sm leading-relaxed">
              Smart accounting & business management software built for South African businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/download" className="hover:text-white transition-colors">Download</Link></li>
              <li><a href={`${APP_URL}/signup`} className="hover:text-white transition-colors">Get Started</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-3 text-sm">
              <li><span>Invoicing & Sales</span></li>
              <li><span>Accounting & Ledger</span></li>
              <li><span>VAT & Tax Reports</span></li>
              <li><span>Multi-Company</span></li>
              <li><span>Desktop App</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href={`${APP_URL}/login`} className="hover:text-white transition-colors">Sign In</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link to="/popia-notice" className="hover:text-white transition-colors">POPIA Notice</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Rigel Business. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <img src={COMPANY_LOGO} alt="Company behind Rigel Business" className="h-8 w-8 rounded-full object-cover ring-1 ring-white/15" />
              <p>Created by the team behind Rigel</p>
            </div>
            <div className="flex items-center gap-2">
              <img src={APP_ICON} alt="Rigel Business app icon" className="h-7 w-7 rounded-lg object-cover ring-1 ring-white/10" />
              <p>Made in South Africa 🇿🇦</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
