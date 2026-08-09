import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, CheckCircle2, X, Maximize2,
  Calculator, Users, FileText, CreditCard, BarChart3,
  ShieldCheck, Clock, LockKeyhole, Mail, Download,
  AlertTriangle, Landmark, RefreshCw,
  TrendingUp, GraduationCap,
  Wallet, Gift, MapPin, Calendar, Building2,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const screenshots = [
  { src: '/run payroll.png', title: 'Run payroll', desc: 'Create pay periods and process employees with live gross/net calculations.' },
  { src: '/payroll history .png', title: 'Payroll history', desc: 'Filter runs by status, date and type with pay status badges.' },
  { src: '/payroll graphs.png', title: 'Payroll dashboard', desc: 'Department spend breakdown with charts and KPIs.' },
  { src: '/payslip templete .png', title: 'Payslip template', desc: 'Branded payslip with earnings, deductions, statutory taxes and net pay.' },
];

type Section = {
  icon: typeof Calculator;
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

const sections: Section[] = [
  {
    icon: Calculator,
    name: 'Pay Run Lifecycle',
    tagline: 'Flexible period types, bulk processing, earnings/deductions and GL finalization.',
    description:
      'Create pay periods with flexible types — day, week (Monday–Sunday), fortnight, semimonthly, month or custom. Preview all eligible employees with calculated gross, net and PAYE before committing. Process individually or in bulk with live progress. Add ad-hoc earnings (bonuses, overtime) or deductions (loans, garnishee orders). Finalizing posts a complete double-entry journal and auto-creates a SARS tax period.',
    features: [
      'Flexible period types: day, week, fortnight, semimonthly, month, custom',
      'Create preview with all employees — gross, net, PAYE before committing',
      'Individual or bulk processing with live progress bar',
      'Ad-hoc earnings and deductions with reversal support',
      'Finalization posts complete double-entry journal to GL',
      'Auto-creates SARS tax period and tracks salary payment status',
    ],
  },
  {
    icon: Wallet,
    name: 'Tax Engine (SARS-Compliant)',
    tagline: 'Database-driven PAYE, UIF and SDL calculations with rebates and medical credits.',
    description:
      'All tax calculations are fully dynamic and driven by database tables — tax years, brackets, rebates, medical credits and statutory rates. PAYE uses SARS sliding scale with annualisation, primary/secondary/tertiary rebates (age from SA ID), and medical tax credits. UIF is 1% each (employee + employer) with monthly ceiling prorated by frequency. SDL is 1% with R500,000 exemption toggle and annual projection tracking.',
    features: [
      'Sliding scale PAYE from SARS tax brackets with base amounts and marginal rates',
      'Annualisation: monthly × 12, fortnightly × 26, weekly × 52, daily × 365',
      'Primary, secondary (65+), tertiary (75+) rebates from SA ID age',
      'Medical tax credits: main member, first dependent, additional dependents',
      'UIF: 1% each employee + employer, R17,712 monthly ceiling prorated',
      'SDL: 1% with R500,000 annual payroll exemption toggle',
    ],
  },
  {
    icon: Gift,
    name: 'Fringe Benefits (SARS 7th Schedule)',
    tagline: 'Company vehicles, housing, loans, assets, services and medical aid — fully automated.',
    description:
      'Fully automated fringe benefit calculation engine. Company vehicle: 3.5%/month (3.25% with maintenance plan) with logbook reduction. Housing: remuneration proxy, room factor (17–19), abatement. Low-interest loan: official rate minus actual rate times balance. Asset: 15%/annum. Service: cost to employer. Medical aid: employer contribution as taxable benefit. Each benefit has affects_paye and affects_uif flags with period eligibility checking.',
    features: [
      'Company vehicle: 3.5% determined value, logbook business use reduction',
      'Housing: room factor 17–19, abatement R95,750, monthly taxable value',
      'Low-interest loan: official rate (SARS repo + 1%, min 8.5%) vs actual',
      'Asset: 15% cost per annum, less employee contribution',
      'Service: cost to employer less employee contribution',
      'Medical aid: employer contribution taxable, MTC handled in tax engine',
    ],
  },
  {
    icon: Users,
    name: 'Employee Management',
    tagline: 'Full profiles with SA ID validation, banking, tax flags, contracts and portal access.',
    description:
      'Full employee directory with add/edit/terminate/reinstate. SA ID number auto-validates via Luhn algorithm and parses birth date, gender, citizenship and age. Pay configuration includes frequency, rate type, hourly/daily/salary rates. Banking details for CV file generation. Tax registration flags (PAYE, UIF, medical aid) control statutory deductions. Upload employment contracts. One-click portal account creation with email and temporary password.',
    features: [
      'SA ID validation via Luhn — auto-parses birth date, gender, citizenship, age',
      'Pay config: frequency, rate type, hourly/daily/salary, hours per day/week',
      'Banking details for CV bank file generation',
      'Tax registration flags: PAYE, UIF, medical aid (with member count)',
      'Employment contract upload and viewing per employee',
      'Terminate/reinstate — terminated staff excluded from future runs',
    ],
  },
  {
    icon: FileText,
    name: 'Payslips & CV Bank Files',
    tagline: 'Branded PDF payslips, email delivery, secure tokens and automatic CV generation.',
    description:
      'Generate professional PDF payslips individually or in bulk with company branding — logo, name, address, tax and VAT numbers. Customizable payslip color panel (header, sections, net pay, stamp). Email payslips directly to employees. Each finalized payslip gets a unique verifiable token (RBP-YYYY-XXXXXX) with SHA-256 hash for audit trail. CV bank file auto-generated on finalization with all bank details and net pay — emailed to admin and downloadable.',
    features: [
      'Individual and bulk PDF payslip generation with company branding',
      'Customizable payslip colors — header, sections, fringe benefits, net pay, stamp',
      'Email payslips directly to employee email addresses',
      'Verifiable payslip tokens (RBP-YYYY-XXXXXX) with SHA-256 hash',
      'Automatic CV bank file generation on finalization — CSV with totals row',
      'CV file emailed to admin and downloadable from any finalized run',
    ],
  },
  {
    icon: Landmark,
    name: 'SARS Reports & Compliance',
    tagline: 'EMP201 monthly declarations, IRP5 annual certificates and EMP501 reconciliation.',
    description:
      'Generate SARS-compliant reports directly from pay run data. EMP201 aggregates PAYE, UIF (employee + employer) and SDL for a selected month with SARS source codes (4101, 4141, 4142, 4102). IRP5 produces per-employee annual tax certificate data across a full tax year (March–February) with gross, fringe benefits, PAYE, UIF, SDL and net. Both export to PDF with green header branding and Excel. EMP501 annual reconciliation aggregates all pay run data.',
    features: [
      'EMP201: monthly PAYE, UIF, SDL aggregation with SARS source codes',
      'IRP5: per-employee annual tax certificate with all data points',
      'EMP501: annual reconciliation of all pay run data',
      'Employee and tax year filters on all reports',
      'PDF with green header branding and Excel export',
      'Provisional notice for SARS eFiling final certificates',
    ],
  },
  {
    icon: Calendar,
    name: 'Leave Management (BCEA)',
    tagline: 'BCEA-compliant leave types, balances, approvals, calendar and monthly accrual.',
    description:
      'Embedded leave management with BCEA-compliant leave types — Annual, Sick, Family Responsibility, Maternity, Unpaid and Study. View all employees leave balances in one dashboard. Approve or reject leave requests with pending count badge. Visual leave calendar showing approved leave across the company. Automatic monthly leave accrual calculation. Configure leave types and policies per company.',
    features: [
      'BCEA seed leave types: Annual, Sick, Family Responsibility, Maternity, Unpaid, Study',
      'Leave balances dashboard for all employees',
      'Pending approvals with count badge — approve or reject',
      'Visual leave calendar across the company',
      'Automatic monthly leave accrual calculation',
      'Configurable leave types and policies per company',
    ],
  },
  {
    icon: MapPin,
    name: 'Timesheets & GPS Geofencing',
    tagline: 'Clock-in/out with GPS geofencing, shift schedules and timesheet review.',
    description:
      'Review and approve employee timesheets with hours worked per day/week and overtime calculation. Track clock-in/clock-out events with history per employee — late arrivals and early departures flagged. GPS geofencing with configurable radius (50m–500m) and interactive Leaflet map. Shift schedules with start time, duration (4h–12h) and working days. Grace period for late clock-ins (0–30 min). Quick presets: 9–5, Retail, 24h Warehouse.',
    features: [
      'Timesheet review with hours, overtime and wage run integration',
      'Clock-in/out events with late arrival and early departure flags',
      'GPS geofencing: 50m–500m radius with interactive Leaflet map',
      'Shift schedules: start time, duration (4h/8h/9h/12h), working days',
      'Configurable late grace period (0, 5, 10, 15, 30 minutes)',
      'Quick presets: Standard 9–5, Retail Shift, 24h Warehouse',
    ],
  },
];

const benefits = [
  { icon: ShieldCheck, title: 'SARS-compliant', desc: 'PAYE, UIF and SDL calculations aligned to the latest SARS requirements.' },
  { icon: Clock, title: 'Save hours per cycle', desc: 'Automated calculations and journal postings cut payroll time from days to minutes.' },
  { icon: LockKeyhole, title: 'Secure & private', desc: 'Password-protected payslips and encrypted employee data with role-based access.' },
  { icon: Mail, title: 'Auto-delivery', desc: 'Payslips emailed to employees automatically after each pay run — no manual sending.' },
  { icon: BarChart3, title: 'Full visibility', desc: 'Cost-to-company breakdowns and payroll reports for better financial planning.' },
  { icon: Download, title: 'IRP5/EMP201 ready', desc: 'SARS-compliant reports generated directly from pay run data.' },
];

const reports = [
  { icon: FileText, title: 'EMP201 — Monthly Declaration', desc: 'PAYE, UIF and SDL aggregation with SARS source codes.' },
  { icon: FileText, title: 'IRP5 — Annual Tax Certificate', desc: 'Per-employee tax certificate across a full tax year.' },
  { icon: BarChart3, title: 'EMP501 — Annual Reconciliation', desc: 'Annual aggregation of all pay run data for SARS.' },
  { icon: Building2, title: 'Department Spend Report', desc: 'Gross, net and employer costs per department with charts.' },
  { icon: CreditCard, title: 'CV Bank File', desc: 'CSV bank upload file with all employee bank details and net pay.' },
  { icon: TrendingUp, title: 'Payroll History', desc: 'Filter runs by status, date and type with pay status badges.' },
];

const tutorialSteps = [
  { num: '01', title: 'Setup', desc: 'Configure tax years, brackets and statutory rates' },
  { num: '02', title: 'Employees', desc: 'Add employees with ID, banking and tax flags' },
  { num: '03', title: 'Allowances', desc: 'Assign recurring allowances and fringe benefits' },
  { num: '04', title: 'Pay Runs', desc: 'Create periods, process and finalize' },
  { num: '05', title: 'Payslips', desc: 'Generate branded PDFs and email to staff' },
  { num: '06', title: 'Reports', desc: 'EMP201, IRP5 and department spend' },
];

const accountingEntries = [
  { action: 'Pay Run Finalization', debit: 'Salary Expense + Allowances', credit: 'PAYE + UIF + SDL + Medical Aid + Deductions + Net Pay' },
  { action: 'SARS Withholding Payment', debit: 'PAYE Payable + UIF Payable + SDL Payable', credit: 'Bank / Cash' },
  { action: 'Fringe Benefit Posting', debit: 'Fringe Benefit Expense', credit: 'Relevant Payable Accounts' },
];

const moduleTabs = [
  { icon: Calculator, title: 'Salary Run', desc: 'Monthly/fortnightly pay cycles for salaried staff.' },
  { icon: Wallet, title: 'Wage Run', desc: 'Daily/weekly wage cycles for hourly workers.' },
  { icon: Users, title: 'Employees', desc: 'Full directory with add/edit/terminate and portal access.' },
  { icon: CreditCard, title: 'Allowances', desc: 'Recurring allowances with taxable flags and date ranges.' },
  { icon: Gift, title: 'Fringe Benefits', desc: 'SARS 7th Schedule engine — vehicles, housing, loans.' },
  { icon: Calendar, title: 'Leave', desc: 'BCEA-compliant leave types, balances and approvals.' },
  { icon: Clock, title: 'Timesheets', desc: 'Clock-in/out with GPS geofencing and shift settings.' },
];

function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
}: {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = section.icon;
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? 'border-emerald-300 bg-white shadow-md'
          : 'border-slate-200 bg-white hover:border-emerald-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 p-5 lg:p-6 text-left"
      >
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'bg-[#0F9D6C] text-white scale-110'
              : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base lg:text-lg font-bold text-slate-900"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            {section.name}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate hidden sm:block">
            {section.tagline}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-mono text-slate-300 transition-opacity ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 lg:px-6 pb-6 pl-[5rem] lg:pl-[5.5rem]">
            <p className="text-sm text-slate-600 leading-7 mb-4">
              {section.description}
            </p>
            <ul className="space-y-2.5">
              {section.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-6">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Payroll() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1);
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lightbox]);

  return (
    <div className="bg-white">
      {/* Hero — full-bleed image banner */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/vp9tD.jpg"
            alt="Rigel Business Payroll & Employee Portal"
            className="w-full h-full object-cover"
          />
          {/* White gradient scrim from left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          {/* Bottom fade into white */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0F9D6C] animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Payroll Management</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              SARS-Compliant Payroll, Automated
            </h1>
            <p className="text-lg text-slate-600 leading-8 mb-8 max-w-lg">
              Run salary and wage cycles, calculate PAYE/UIF/SDL automatically, manage fringe benefits, generate payslips, file EMP201 & IRP5 reports, and post to your general ledger — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white"
              >
                Start free trial <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <Link
                to="/book-demo"
                className="btn-pill inline-flex h-12 items-center border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 px-7 font-semibold text-slate-700"
              >
                Request a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clock-in showcase — staggered image collage */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-emerald-50/30 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-emerald-100/20 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — staggered images */}
            <div className="relative h-[420px] lg:h-[480px]">
              {/* Construction image — larger, top-left */}
              <div className="absolute top-0 left-0 w-[65%] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/Gemini_Generated_Image_c5hbowc5hbowc5hb.png"
                  alt="Construction workers on site"
                  className="w-full h-[280px] object-cover"
                />
              </div>
              {/* App image — smaller, bottom-right, overlapping */}
              <div className="absolute bottom-0 right-0 w-[55%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/Gemini_Generated_Image_54wy9954wy9954wy.png"
                  alt="Employee clocking in on the Rigel app"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              {/* Floating clock-in badge */}
              <div className="absolute top-[45%] right-[2%] bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-10">
                <div className="h-10 w-10 rounded-full bg-[#0F9D6C] text-white flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Clocked In</div>
                  <div className="text-xs text-emerald-600 font-medium">07:23 AM · On site</div>
                </div>
              </div>
            </div>

            {/* Right — copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
                <Clock className="h-3.5 w-3.5 text-[#0F9D6C]" />
                <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Clock In & Time Tracking</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                From the site to the payroll — clock in made simple
              </h2>
              <p className="text-base text-slate-600 leading-7 mb-6">
                Whether your team is on a construction site, in a warehouse, or at a desk — employees clock in and out directly from the Rigel app on any device. Hours flow automatically into payroll, so every pay run is accurate without manual timesheets.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'One-tap clock in and out from phone, tablet or desktop',
                  'Automatic hours calculation per employee per day',
                  'Real-time attendance dashboard for managers',
                  'Hours sync directly into payroll runs — no double capture',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${APP_URL}/signup`}
                className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-7 font-semibold text-white"
              >
                Try it free <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Module overview — tabbed interface */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Module Overview</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Seven tabs, complete payroll control
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From salary runs to fringe benefits, leave and timesheets — all in one integrated module.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moduleTabs.map((p, i) => (
              <div key={p.title} className="card-lift bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F9D6C] to-[#1BA37B]" />
                <div className="h-12 w-12 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-slate-300 absolute top-4 right-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                <p className="text-xs text-slate-500 leading-5">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots carousel */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Payroll management, screen by screen
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              From pay runs to history, dashboards and branded payslips — explore the actual Rigel Business payroll interface.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-4 lg:gap-6">
            <div className="relative group">
              <div
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg cursor-pointer"
                onClick={() => lightbox !== null && setLightboxOpen(true)}
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  {lightbox !== null && (
                    <img
                      src={screenshots[lightbox].src}
                      alt={screenshots[lightbox].title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute top-3 left-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4 text-slate-700" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/40 to-transparent p-6 lg:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1.5">
                        {lightbox !== null ? String(lightbox + 1).padStart(2, '0') : '01'} / {String(screenshots.length).padStart(2, '0')}
                      </p>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {lightbox !== null ? screenshots[lightbox].title : ''}
                      </h3>
                      <p className="text-sm text-slate-300 leading-6 max-w-md hidden sm:block">
                        {lightbox !== null ? screenshots[lightbox].desc : ''}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox! - 1); }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox! + 1); }}
                        className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-col gap-2 lg:gap-2.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[460px] pb-2 lg:pb-0">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.title}
                  onClick={() => setLightbox(i)}
                  className={`relative shrink-0 w-32 lg:w-full overflow-hidden rounded-xl border-2 transition-all duration-200 text-left ${
                    lightbox === i ? 'border-[#0F9D6C] shadow-md' : 'border-slate-200 hover:border-emerald-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={shot.src} alt={shot.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                    <p className="text-[10px] font-semibold text-white truncate">{shot.title}</p>
                  </div>
                  {lightbox === i && (
                    <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-[#0F9D6C] flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#0B1220]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightboxOpen(false)} className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <X className="h-5 w-5 text-slate-700" />
            </button>
            <button onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <ArrowRight className="h-5 w-5 text-slate-700 rotate-180" />
            </button>
            <button onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors">
              <ArrowRight className="h-5 w-5 text-slate-700" />
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 bg-slate-100 flex items-center justify-center min-h-[300px] lg:min-h-[600px] p-4">
                <img src={screenshots[lightbox].src} alt={screenshots[lightbox].title} className="max-h-[280px] lg:max-h-[560px] w-full object-contain" />
              </div>
              <div className="lg:w-80 p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{String(lightbox + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-slate-300">/ {String(screenshots.length).padStart(2, '0')}</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{screenshots[lightbox].title}</h3>
                <p className="text-sm text-slate-500 leading-7 mb-8">{screenshots[lightbox].desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {screenshots.map((_, i) => (
                    <button key={i} onClick={() => setLightbox(i)} className={`h-1.5 rounded-full transition-all duration-300 ${lightbox === i ? 'w-6 bg-[#0F9D6C]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLightbox(lightbox === 0 ? screenshots.length - 1 : lightbox - 1)} className="flex-1 h-11 rounded-lg border border-slate-200 hover:border-slate-300 text-sm font-semibold text-slate-600 flex items-center justify-center gap-1.5 transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Prev
                  </button>
                  <button onClick={() => setLightbox(lightbox === screenshots.length - 1 ? 0 : lightbox + 1)} className="flex-1 h-11 rounded-lg bg-[#0F9D6C] hover:bg-[#0B7A52] text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-colors">
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accordion */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {sections.map((sec, i) => (
              <AccordionItem
                key={sec.name}
                section={sec}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Why Rigel Business Payroll?</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Payroll that saves time and keeps you compliant
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="card-lift bg-white rounded-xl border border-slate-200 p-5">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center mb-3">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{b.title}</h3>
                <p className="text-xs text-slate-500 leading-5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Spend Dashboard */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Department Spend</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Payroll costs by department
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Gross', value: 'R 0', icon: TrendingUp, color: 'text-emerald-600' },
              { label: 'Total Net', value: 'R 0', icon: Wallet, color: 'text-blue-600' },
              { label: 'Employer Cost', value: 'R 0', icon: Building2, color: 'text-amber-600' },
              { label: 'Avg Salary', value: 'R 0', icon: BarChart3, color: 'text-purple-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="card-lift bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">ZAR</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{kpi.value}</p>
                <p className="text-xs text-slate-500">{kpi.label}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Gross by Department</h3>
              <div className="space-y-3">
                {[
                  { label: 'Operations', pct: 45, color: 'bg-emerald-500' },
                  { label: 'Sales', pct: 25, color: 'bg-blue-500' },
                  { label: 'Admin', pct: 20, color: 'bg-amber-500' },
                  { label: 'Management', pct: 10, color: 'bg-purple-500' },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">{bar.label}</span>
                      <span className="text-xs font-semibold text-slate-900">{bar.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Employer Cost Breakdown</h3>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-r-transparent border-b-transparent rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">85%</p>
                      <p className="text-[10px] text-slate-400">Net Pay</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-emerald-500" /><span className="text-xs text-slate-600">Net Pay</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="text-xs text-slate-600">UIF + SDL</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Self-Service Portal */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Employee Portal</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Self-service portal for every employee
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Users, title: 'One-Click Portal Creation', desc: 'Admin creates portal account from employee dropdown — sets email and temporary password, system creates auth user automatically.' },
              { icon: LockKeyhole, title: 'Portal Access Control', desc: 'Admin can block/unblock employees, remove portal access, and view portal link status at any time.' },
              { icon: FileText, title: 'Payslip Notifications', desc: 'When a pay run is paid, portal notifications are automatically created for each employee in the run.' },
              { icon: Calendar, title: 'Leave Workflow', desc: 'Employees apply for leave → admin approves/rejects → employee sees status update in portal instantly.' },
            ].map((item) => (
              <div key={item.title} className="card-lift bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
                <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Settings */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Tax Settings</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Admin-configurable, database-driven
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Calculator, title: 'PAYE Brackets', desc: 'View and configure tax brackets per tax year — lower limit, upper limit, rate, base amount.' },
              { icon: ShieldCheck, title: 'Rebates', desc: 'Primary, secondary (65+) and tertiary (75+) rebate amounts per tax year.' },
              { icon: Users, title: 'Medical Tax Credits', desc: 'Main member, first dependent and additional dependent credit amounts.' },
              { icon: Landmark, title: 'Statutory Rates', desc: 'UIF employee/employer rates, UIF ceiling, SDL rate, official interest rate.' },
              { icon: AlertTriangle, title: 'SDL Exemption', desc: 'Company-level toggle to exempt from SDL if annual payroll is R500,000 or less.' },
              { icon: RefreshCw, title: 'Update Without Code', desc: 'All values are database-driven — update SARS rates when new tax year tables are published.' },
            ].map((item) => (
              <div key={item.title} className="card-lift bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Suite */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Reports & Compliance</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              SARS-compliant reports from pay run data
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.map((r) => (
              <div key={r.title} className="card-lift bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <r.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{r.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accounting Integration */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Accounting Integration</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Automatic double-entry on every pay run
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Action</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Debit</span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Credit</span>
            </div>
            {accountingEntries.map((entry) => (
              <div key={entry.action} className="grid grid-cols-3 px-6 py-4 border-b border-slate-100 last:border-0">
                <span className="text-sm font-semibold text-slate-900">{entry.action}</span>
                <span className="text-sm text-emerald-600">{entry.debit}</span>
                <span className="text-sm text-blue-600">{entry.credit}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-slate-600">Financial year lock prevents posting to locked periods — admin must unlock or post to current/next month.</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-xs text-slate-600">SARS withholding payment posted as a separate transaction linked to the pay run period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tutorial */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Built-in Tutorial</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              6-step interactive guide
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Walks users through the full payroll workflow — from setup to reports.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tutorialSteps.map((step) => (
              <div key={step.num} className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden group hover:border-emerald-300 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0F9D6C] to-[#1BA37B] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-mono text-emerald-600 font-bold">{step.num}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{step.title}</h3>
                <p className="text-[11px] text-slate-500 leading-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Get started with payroll
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Run your next pay run in minutes with automated tax calculations, SARS-compliant submissions and self-service payslips for every employee.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${APP_URL}/signup`}
              className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white"
            >
              Start free trial <ArrowRight className="h-4 w-4 ml-2" />
            </a>
            <Link
              to="/book-demo"
              className="btn-pill inline-flex h-12 items-center border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-8 font-semibold text-slate-700"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
