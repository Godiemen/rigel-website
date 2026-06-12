import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/download', label: 'Download' },
    { to: '/rigel-hub', label: 'Rigel Hub' },
    { to: '/business-resources', label: 'Resources' },
    { to: '/forum', label: 'Forum' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy-policy', label: 'Legal' },
    { to: '/book-demo', label: 'Book Demo' },
  ];

  return (
    <header className="sticky top-0 z-50">
    <nav className="bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={APP_ICON} alt="Rigel Business" className="h-9 w-9 rounded-xl object-cover shadow-sm" />
            <span className="font-black text-slate-900 text-lg tracking-tight">Rigel <span className="text-[#1BA37B]">Business</span></span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === l.to
                    ? 'text-[#1BA37B] bg-[#1BA37B]/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center justify-end gap-3">
            <a href={`${APP_URL}/login`} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </a>
            <a
              href={`${APP_URL}/signup`}
              className="h-9 px-5 rounded-lg bg-[#1BA37B] hover:bg-[#158a66] text-white text-sm font-bold transition-colors flex items-center"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden justify-self-end p-2 rounded-lg text-slate-600 hover:bg-slate-50">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                pathname === l.to ? 'text-[#1BA37B] bg-[#1BA37B]/10' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 mt-3">
            <a href={`${APP_URL}/login`} className="block text-center py-2.5 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50">Sign in</a>
            <a href={`${APP_URL}/signup`} className="block text-center py-2.5 rounded-lg text-sm font-bold bg-[#1BA37B] text-white hover:bg-[#158a66]">Get Started Free</a>
          </div>
        </div>
      )}
    </nav>
    </header>
  );
}
