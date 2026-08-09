import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, LogIn, Search,
  BarChart3, Landmark, PieChart, Wallet,
  ShoppingCart, Package, Users, ChevronDown,
  ArrowRight, LayoutGrid
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesTimeout = useRef<number | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const serviceModules = [
    { to: '/reporting', label: 'Accounting & Reporting', icon: BarChart3, desc: 'Trial balance, general ledger and full AFS.' },
    { to: '/tax', label: 'VAT Management', icon: Landmark, desc: 'VAT periods, returns and SARS-ready reports.' },
    { to: '/investments', label: 'Investments', icon: PieChart, desc: 'Fixed deposits, shares and month-end processing.' },
    { to: '/banking', label: 'Banking', icon: Landmark, desc: 'Bank accounts, reconciliation and cash flow.' },
    { to: '/sales', label: 'Sales & Invoicing', icon: Wallet, desc: 'Quotes, orders, invoices and magic links.' },
    { to: '/purchase', label: 'Purchase & Payables', icon: ShoppingCart, desc: 'POs, supplier invoices and receipts.' },
    { to: '/inventory', label: 'Inventory & Stock', icon: Package, desc: 'Multi-warehouse stock and reorder alerts.' },
    { to: '/payroll', label: 'Payroll & HR', icon: Users, desc: 'Compliant payroll, payslips and SARS.' },
  ];

  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/download', label: 'Download' },
    { to: '/business-resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' },
  ];

  const showServices = () => {
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };

  const hideServices = () => {
    servicesTimeout.current = window.setTimeout(() => setServicesOpen(false), 120);
  };

  const toggleMobileServices = () => setMobileServicesOpen((s: boolean) => !s);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'header-frosted shadow-sm'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <img src={APP_ICON} alt="Rigel Business" className={`object-cover transition-all duration-300 ${scrolled ? 'h-8 w-8' : 'h-9 w-9'}`} />
              <span className="font-bold text-slate-900 text-sm tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Rigel Business
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center gap-6">
              <Link
                to="/"
                className={`nav-link text-sm font-medium transition-colors ${pathname === '/' ? 'text-slate-900 active' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Home
              </Link>

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={showServices}
                onMouseLeave={hideServices}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((s: boolean) => !s)}
                  className={`nav-link inline-flex items-center gap-1 text-sm font-medium transition-colors ${pathname.startsWith('/services') || serviceModules.some(m => pathname.startsWith(m.to)) ? 'text-slate-900 active' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Services <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[680px]"
                    onMouseEnter={showServices}
                    onMouseLeave={hideServices}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <LayoutGrid className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Our Services</span>
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          View all <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {serviceModules.map((m) => (
                          <Link
                            key={m.to}
                            to={m.to}
                            onClick={() => setServicesOpen(false)}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${pathname === m.to ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'}`}
                          >
                            <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                              <m.icon className="h-[18px] w-[18px] text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.label}</p>
                              <p className="text-xs text-slate-500 leading-5 mt-0.5">{m.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 -mx-6 -mb-6 px-6 py-4 bg-gradient-to-r from-emerald-600 to-[#0F9D6C] flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>All-in-one business platform</p>
                          <p className="text-xs text-emerald-100 leading-5">Accounting, VAT, payroll, inventory and more in one place.</p>
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-emerald-50"
                        >
                          Read more <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {baseLinks.filter(l => l.to !== '/').map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nav-link text-sm font-medium transition-colors ${pathname === l.to ? 'text-slate-900 active' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right utilities */}
            <div className="hidden xl:flex items-center gap-4">
              <button className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all">
                <Search className="h-4 w-4 text-slate-500" />
              </button>
              <a href={`${APP_URL}/login`} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <LogIn className="h-3.5 w-3.5" /> Login
              </a>
              <Link
                to="/book-demo"
                className="btn-pill h-10 px-5 bg-[#0F9D6C] hover:bg-[#0B7A52] text-white text-sm font-semibold flex items-center transition-colors"
              >
                Book Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="xl:hidden p-2 text-slate-600 hover:text-slate-900">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === '/' ? 'text-[#0F9D6C]' : 'text-slate-700 hover:text-slate-900'}`}
            >
              Home
            </Link>

            <div>
              <button
                type="button"
                onClick={toggleMobileServices}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${serviceModules.some(m => pathname === m.to) || pathname.startsWith('/services') ? 'text-[#0F9D6C]' : 'text-slate-700 hover:text-slate-900'}`}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pr-2 pb-2 space-y-1">
                  {serviceModules.map((m) => (
                    <Link
                      key={m.to}
                      to={m.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${pathname === m.to ? 'bg-emerald-50 text-[#0F9D6C]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      <m.icon className="h-4 w-4 text-emerald-600 shrink-0" />
                      {m.label}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 rounded-lg"
                  >
                    <LayoutGrid className="h-4 w-4 shrink-0" />
                    View all services <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>

            {baseLinks.filter(l => l.to !== '/').map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === l.to ? 'text-[#0F9D6C]' : 'text-slate-700 hover:text-slate-900'}`}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-3 flex flex-col gap-2 border-t border-slate-200 mt-3">
              <a href={`${APP_URL}/login`} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900">
                <LogIn className="h-4 w-4" /> Login
              </a>
              <Link to="/book-demo" onClick={() => setOpen(false)} className="mx-4 h-10 bg-[#0F9D6C] text-white text-sm font-semibold flex items-center justify-center rounded-full">
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
