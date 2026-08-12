import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, LogIn, Search,
  BarChart3, Landmark, PieChart, Wallet,
  ShoppingCart, Package, Users, ChevronDown,
  ArrowRight, LayoutGrid, BookOpen, Building2, Lightbulb, Newspaper,
  CornerDownLeft, ArrowUp, ArrowDown,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';
const APP_ICON = '/Screenshot%202026-02-25%20154513.png';

type SearchResult = {
  to: string;
  label: string;
  desc: string;
  icon: typeof BarChart3;
  category: 'Pages' | 'Features' | 'Blog' | 'Other';
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const servicesTimeout = useRef<number | null>(null);
  const blogTimeout = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    { to: '/loans', label: 'Loans', icon: Landmark, desc: 'Loan lifecycle, amortisation and IFRS split.' },
    { to: '/assets', label: 'Fixed Assets', icon: Building2, desc: 'Depreciation, disposals, impairment and NRV.' },
    { to: '/banking', label: 'Banking', icon: Landmark, desc: 'Bank accounts, reconciliation and cash flow.' },
    { to: '/sales', label: 'Sales & Invoicing', icon: Wallet, desc: 'Quotes, orders, invoices and magic links.' },
    { to: '/purchase', label: 'Purchase & Payables', icon: ShoppingCart, desc: 'POs, supplier invoices and receipts.' },
    { to: '/inventory', label: 'Inventory & Stock', icon: Package, desc: 'Multi-warehouse stock and reorder alerts.' },
    { to: '/payroll', label: 'Payroll & HR', icon: Users, desc: 'Compliant payroll, payslips and SARS.' },
  ];

  const blogCategories = [
    { to: '/blog/small-business', label: 'Small Business', icon: Building2, desc: 'Tips and strategies for growing SA businesses.' },
    { to: '/blog/guide', label: 'Guide', icon: Lightbulb, desc: 'Step-by-step guides on accounting, VAT and payroll.' },
    { to: '/blog/company', label: 'Company', icon: Newspaper, desc: 'The story of Rigel — from Excel to a full platform.' },
  ];

  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/download', label: 'Download' },
    { to: '/contact', label: 'Contact' },
  ];

  const showServices = () => {
    if (servicesTimeout.current) window.clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };

  const hideServices = () => {
    servicesTimeout.current = window.setTimeout(() => setServicesOpen(false), 120);
  };

  const showBlog = () => {
    if (blogTimeout.current) window.clearTimeout(blogTimeout.current);
    setBlogOpen(true);
  };

  const hideBlog = () => {
    blogTimeout.current = window.setTimeout(() => setBlogOpen(false), 120);
  };

  const toggleMobileServices = () => setMobileServicesOpen((s: boolean) => !s);
  const toggleMobileBlog = () => setMobileBlogOpen((s: boolean) => !s);

  const allSearchableItems: SearchResult[] = useMemo(() => [
    ...serviceModules.map(m => ({ ...m, category: 'Features' as const, icon: m.icon, desc: m.desc })),
    ...blogCategories.map(b => ({ ...b, category: 'Blog' as const, icon: b.icon, desc: b.desc })),
    { to: '/', label: 'Home', desc: 'Rigel Business homepage', icon: LayoutGrid, category: 'Pages' as const },
    { to: '/services', label: 'All Services', desc: 'Overview of all Rigel features', icon: LayoutGrid, category: 'Pages' as const },
    { to: '/pricing', label: 'Pricing', desc: 'Plans and pricing for Rigel Business', icon: Wallet, category: 'Pages' as const },
    { to: '/download', label: 'Download', desc: 'Download the Rigel desktop app', icon: ArrowRight, category: 'Pages' as const },
    { to: '/contact', label: 'Contact', desc: 'Get in touch with the Rigel team', icon: Users, category: 'Pages' as const },
    { to: '/book-demo', label: 'Book a Demo', desc: 'Schedule a live demo with our team', icon: ArrowRight, category: 'Pages' as const },
    { to: '/blog', label: 'Blog', desc: 'All articles and insights', icon: BookOpen, category: 'Blog' as const },
    { to: '/rigel-hub', label: 'Rigel Hub', desc: 'Community hub and resources', icon: Building2, category: 'Other' as const },
  ], []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return allSearchableItems;
    const q = searchQuery.toLowerCase();
    return allSearchableItems.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [searchQuery, allSearchableItems]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    searchResults.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [searchResults]);

  const flatResults = useMemo(() => {
    return Object.values(groupedResults).flat();
  }, [groupedResults]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setSearchQuery('');
      setActiveIndex(0);
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatResults[activeIndex];
      if (item) {
        navigate(item.to);
        setSearchOpen(false);
      }
    }
  };

  useEffect(() => {
    if (searchResultsRef.current) {
      const el = searchResultsRef.current.querySelector(`[data-idx="${activeIndex}"]`);
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

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
              <img src={APP_ICON} alt="Rigel Business" className={`object-cover rounded-full transition-all duration-300 ${scrolled ? 'h-8 w-8' : 'h-9 w-9'}`} />
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
                  Features <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[680px]"
                    onMouseEnter={showServices}
                    onMouseLeave={hideServices}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <LayoutGrid className="h-4 w-4 text-slate-700" />
                          </div>
                          <span className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Our Services</span>
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          View all <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {serviceModules.map((m) => (
                          <Link
                            key={m.to}
                            to={m.to}
                            onClick={() => setServicesOpen(false)}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${pathname === m.to ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'}`}
                          >
                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                              <m.icon className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.label}</p>
                              <p className="text-xs text-slate-500 leading-5 mt-0.5">{m.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="relative block rounded-xl overflow-hidden aspect-[2.8/1]"
                      >
                        <img
                          src="/Gemini_Generated_Image_st6xx8st6xx8st6x.png"
                          alt="Rigel Services"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
                        <div className="absolute inset-0 flex items-center px-5">
                          <div className="max-w-[55%]">
                            <p className="text-white font-bold text-base" style={{ fontFamily: "'Inter Tight', sans-serif" }}>All-in-one business platform</p>
                            <p className="text-slate-200 text-xs mt-1 leading-5">Accounting, VAT, payroll, inventory and more in one place.</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Blog dropdown */}
              <div
                className="relative"
                onMouseEnter={showBlog}
                onMouseLeave={hideBlog}
              >
                <button
                  type="button"
                  onClick={() => setBlogOpen((s: boolean) => !s)}
                  className={`nav-link inline-flex items-center gap-1 text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-slate-900 active' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Blog <ChevronDown className={`h-3.5 w-3.5 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
                </button>

                {blogOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[640px]"
                    onMouseEnter={showBlog}
                    onMouseLeave={hideBlog}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 overflow-hidden">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-slate-700" />
                          </div>
                          <span className="font-semibold text-slate-900 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Rigel Blog</span>
                        </div>
                        <Link
                          to="/blog"
                          onClick={() => setBlogOpen(false)}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          View all <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          ...blogCategories,
                          { to: '/blog', label: 'All articles', icon: BookOpen, desc: 'Browse every article from all categories.' },
                        ].map((b) => (
                          <Link
                            key={b.to}
                            to={b.to}
                            onClick={() => setBlogOpen(false)}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${pathname === b.to ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'}`}
                          >
                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                              <b.icon className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{b.label}</p>
                              <p className="text-xs text-slate-500 leading-5 mt-0.5">{b.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        to="/blog"
                        onClick={() => setBlogOpen(false)}
                        className="relative block rounded-xl overflow-hidden aspect-[2.8/1]"
                      >
                        <img
                          src="/Gemini_Generated_Image_xefbhfxefbhfxefb.png"
                          alt="Rigel Blog"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
                        <div className="absolute inset-0 flex items-center px-5">
                          <div className="max-w-[55%]">
                            <p className="text-white font-bold text-base" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Insights for South African businesses</p>
                            <p className="text-slate-200 text-xs mt-1 leading-5">Practical guides, small business tips and the Rigel story.</p>
                          </div>
                        </div>
                      </Link>
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
              <button
                onClick={() => setSearchOpen(true)}
                className="h-9 px-3 flex items-center gap-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <Search className="h-4 w-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-400">Search</span>
                <kbd className="hidden 2xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-400">⌘K</kbd>
              </button>
              <a href={`${APP_URL}/login`} className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                <LogIn className="h-3.5 w-3.5" /> Login
              </a>
              <a
                href="https://biz-flow-sauyi.vercel.app/careers"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Career
              </a>
              <Link
                to="/book-demo"
                className="btn-pill h-10 px-5 bg-[#0F9D6C] hover:bg-[#0B7A52] text-white text-sm font-semibold flex items-center transition-colors"
              >
                Book Demo
              </Link>
            </div>

            {/* Mobile search + toggle */}
            <div className="xl:hidden flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="p-2 text-slate-600 hover:text-slate-900">
                <Search className="h-5 w-5" />
              </button>
              <button onClick={() => setOpen(!open)} className="p-2 text-slate-600 hover:text-slate-900">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
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
                <span>Features</span>
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

            <div>
              <button
                type="button"
                onClick={toggleMobileBlog}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-[#0F9D6C]' : 'text-slate-700 hover:text-slate-900'}`}
              >
                <span>Blog</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileBlogOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileBlogOpen && (
                <div className="pl-4 pr-2 pb-2 space-y-1">
                  <Link
                    to="/blog"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${pathname === '/blog' ? 'bg-emerald-50 text-[#0F9D6C]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <BookOpen className="h-4 w-4 text-emerald-600 shrink-0" />
                    All articles
                  </Link>
                  {blogCategories.map((b) => (
                    <Link
                      key={b.to}
                      to={b.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${pathname === b.to ? 'bg-emerald-50 text-[#0F9D6C]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      <b.icon className="h-4 w-4 text-emerald-600 shrink-0" />
                      {b.label}
                    </Link>
                  ))}
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
              <a
                href="https://biz-flow-sauyi.vercel.app/careers"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Career
              </a>
              <Link to="/book-demo" onClick={() => setOpen(false)} className="mx-4 h-10 bg-[#0F9D6C] text-white text-sm font-semibold flex items-center justify-center rounded-full">
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Advanced Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search pages, features, blog..."
                className="flex-1 text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="shrink-0 px-2 py-1 rounded-md border border-slate-200 text-[10px] font-mono text-slate-400 hover:bg-slate-50"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            {flatResults.length > 0 ? (
              <div ref={searchResultsRef} className="max-h-[50vh] overflow-y-auto p-2">
                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{category}</p>
                    {items.map((item) => {
                      const flatIdx = flatResults.indexOf(item);
                      const isActive = flatIdx === activeIndex;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setSearchOpen(false)}
                          data-idx={flatIdx}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                        >
                          <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#0F9D6C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${isActive ? 'text-[#0F9D6C]' : 'text-slate-900'}`} style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.label}</p>
                            <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                          </div>
                          {isActive && (
                            <CornerDownLeft className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No results found for "{searchQuery}"</p>
              </div>
            )}

            {/* Footer hints */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> select</span>
              </div>
              <span className="text-[11px] text-slate-400">{flatResults.length} results</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
