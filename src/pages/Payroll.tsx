import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, X, Play,
  Calculator, Users, FileText, CreditCard, BarChart3,
  ShieldCheck, Clock, LockKeyhole, Mail, Download,
  AlertTriangle, Landmark, RefreshCw,
  TrendingUp, GraduationCap,
  Wallet, Gift, MapPin, Calendar, Building2,
  Briefcase, UserPlus, Search, Columns, Star,
} from 'lucide-react';

const APP_URL = 'https://biz-flow-sa-delta.vercel.app';

const avatarGradients = [
  'from-emerald-400 to-teal-600',
  'from-blue-400 to-indigo-600',
  'from-amber-400 to-orange-600',
  'from-purple-400 to-pink-600',
  'from-cyan-400 to-blue-600',
  'from-rose-400 to-red-600',
  'from-lime-400 to-green-600',
  'from-violet-400 to-purple-600',
  'from-sky-400 to-cyan-600',
  'from-fuchsia-400 to-pink-600',
];

function CardAvatar({ icon: Icon, index, label }: { icon: typeof Calculator; index: number; label?: string }) {
  const gradient = avatarGradients[index % avatarGradients.length];
  return (
    <div className={`relative h-20 bg-gradient-to-br ${gradient} overflow-hidden rounded-t-xl`}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }} />
      <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/10" />
      <div className="absolute -left-3 -bottom-6 h-14 w-14 rounded-full bg-white/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-9 w-9 text-white drop-shadow-sm" />
      </div>
      <span className="absolute top-2 right-2.5 text-[10px] font-mono font-bold text-white/60">
        {label ?? String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

const PAYROLL_DEMO_VIDEOS = [
  { url: 'https://youtu.be/VF_xy9tNYbs', title: 'payroll -rigel', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/nUVTI9piFd0', title: 'payroll 2', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/QNEycsQ8Cu8', title: 'time sheet and clock in rigel', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/Uo7k2u5Vvlg', title: 'rigel payslip', desc: 'by Rigel Team' },
  { url: 'https://youtu.be/n30WPsWEqXI', title: 'hiriring module', desc: 'by Rigel Team' },
];

function getYouTubeEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}?rel=0&modestbranding=1&playsinline=1`;
    }
    const v = u.searchParams.get('v');
    if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&playsinline=1`;
  } catch {}
  return `https://www.youtube.com/embed/${url}?rel=0&modestbranding=1&playsinline=1`;
}

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    return u.searchParams.get('v') ?? url;
  } catch {
    return url;
  }
}

function getYouTubeThumb(url: string) {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}

function PayrollVideoPlayer({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
      <iframe
        src={getYouTubeEmbedUrl(src)}
        title="Payroll demo video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

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
  {
    icon: Briefcase,
    name: 'Hiring Module',
    tagline: 'Full recruitment from job posting to offer and employee conversion.',
    description:
      'Manage the entire recruitment process without a separate HR system. Create job postings with public apply links, customize application forms, track candidates through a drag-and-drop pipeline, screen CVs automatically, schedule interviews, complete scorecards, send branded offer letters and convert accepted candidates directly into employee records.',
    features: [
      'Job postings with public shareable application links',
      'Customizable application forms with required and custom questions',
      'Candidate list with CV, contact details and application source',
      'Kanban pipeline: Applied, Screening, Interview, Offer, Hired, Rejected',
      'Automatic CV scoring against job requirements',
      'Interview scheduling with email invitations and calendar links',
      'Scorecards with competency ratings and overall hire recommendations',
      'Branded offer letter PDFs with contract terms and e-signing',
      'One-step convert to employee for payroll onboarding',
      'Professional rejection handling with optional email',
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

const hiringModules = [
  {
    icon: Briefcase,
    title: 'Job Postings',
    desc: 'Create and manage job adverts for open positions. Add title, department, location, employment type, status, closing date, salary range and full description. Open postings generate a public shareable application link.',
    bullets: ['Title, department and work location', 'Employment type and status', 'Closing date and salary range', 'Public apply link for LinkedIn, job boards, WhatsApp'],
  },
  {
    icon: FileText,
    title: 'Customizable Application Forms',
    desc: 'Choose what every candidate must fill in. Standard fields are included, with optional and custom question types available.',
    bullets: ['Standard and optional fields', 'Custom questions: short text, long text, dropdown, date, number, URL', 'Mark questions as required'],
  },
  {
    icon: UserPlus,
    title: 'Candidates',
    desc: 'The central list of applicants. View CVs, contact details, source and applied role. Add walk-ins or referrals manually.',
    bullets: ['Full applicant list', 'CV and contact details', 'Manual candidate entry', 'Application source tracking'],
  },
  {
    icon: Columns,
    title: 'Recruitment Pipeline',
    desc: 'Drag-and-drop Kanban board with six columns giving a clear visual view of every applicant.',
    bullets: ['Applied → Screening → Interview', 'Offer → Hired → Rejected', 'Drag-and-drop or dropdown stage changes'],
  },
  {
    icon: Search,
    title: 'CV Screening',
    desc: 'The system compares uploaded CVs against job requirements and gives a matching score, so you can quickly spot top applicants.',
  },
  {
    icon: Calendar,
    title: 'Interview Scheduling',
    desc: 'Schedule one or more interview stages with date, time, interviewer, attendance type and meeting details. Email invitations with calendar links are sent automatically.',
    bullets: ['In-person, video call or phone', 'Interviewer from employee list', 'Assessment with questions, duration and test link'],
  },
  {
    icon: Star,
    title: 'Scorecards & Ratings',
    desc: 'After each interview, the team rates competencies and gets an overall recommendation with a star ranking.',
    bullets: ['Technical skills, communication, cultural fit', 'Strong Hire / Hire / Lean Hire', 'No Hire / Strong No Hire', 'Quick star ratings'],
  },
  {
    icon: Mail,
    title: 'Offers',
    desc: 'Generate professional, branded offer letter PDFs with salary, start date, terms and signing method.',
    bullets: ['Custom contract body and attachments', 'Online or in-office signing', 'Statuses: draft, sent, accepted, declined, expired'],
  },
  {
    icon: RefreshCw,
    title: 'Convert to Employee',
    desc: 'Accepted candidates convert to employee records in one step, linking directly into payroll with bank, tax and PAYE/UIF details.',
    bullets: ['ID, department, position, start date', 'Salary, bank and tax details', 'PAYE and UIF registration'],
  },
  {
    icon: X,
    title: 'Rejection Handling',
    desc: 'Decline candidates with a reason and an optional polite rejection email, keeping communication professional and consistent.',
  },
];

export function Payroll() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<typeof PAYROLL_DEMO_VIDEOS[number] | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const hiringSliderRef = useRef<HTMLDivElement>(null);
  const [hiringPaused, setHiringPaused] = useState(false);
  const moduleSliderRef = useRef<HTMLDivElement>(null);
  const [modulePaused, setModulePaused] = useState(false);
  const benefitsSliderRef = useRef<HTMLDivElement>(null);
  const [benefitsPaused, setBenefitsPaused] = useState(false);
  const kpiSliderRef = useRef<HTMLDivElement>(null);
  const [kpiPaused, setKpiPaused] = useState(false);
  const portalSliderRef = useRef<HTMLDivElement>(null);
  const [portalPaused, setPortalPaused] = useState(false);
  const taxSliderRef = useRef<HTMLDivElement>(null);
  const [taxPaused, setTaxPaused] = useState(false);
  const reportsSliderRef = useRef<HTMLDivElement>(null);
  const [reportsPaused, setReportsPaused] = useState(false);
  const tutorialSliderRef = useRef<HTMLDivElement>(null);
  const [tutorialPaused, setTutorialPaused] = useState(false);
  const videoSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hiringPaused) return;
    const interval = window.setInterval(() => {
      const el = hiringSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 340) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => window.clearInterval(interval);
  }, [hiringPaused]);

  useEffect(() => {
    if (modulePaused) return;
    const interval = window.setInterval(() => {
      const el = moduleSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 300) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4500);

    return () => window.clearInterval(interval);
  }, [modulePaused]);

  useEffect(() => {
    if (benefitsPaused) return;
    const interval = window.setInterval(() => {
      const el = benefitsSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 300) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [benefitsPaused]);

  const slideByCard = (ref: React.RefObject<HTMLDivElement | null>, dir: 1 | -1, fallback = 300) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? fallback) + 16;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  useEffect(() => {
    if (kpiPaused) return;
    const interval = window.setInterval(() => {
      const el = kpiSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 260) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [kpiPaused]);

  useEffect(() => {
    if (portalPaused) return;
    const interval = window.setInterval(() => {
      const el = portalSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 300) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [portalPaused]);

  useEffect(() => {
    if (taxPaused) return;
    const interval = window.setInterval(() => {
      const el = taxSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 300) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [taxPaused]);

  useEffect(() => {
    if (reportsPaused) return;
    const interval = window.setInterval(() => {
      const el = reportsSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 300) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [reportsPaused]);

  useEffect(() => {
    if (tutorialPaused) return;
    const interval = window.setInterval(() => {
      const el = tutorialSliderRef.current;
      if (!el) return;
      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = (card?.offsetWidth ?? 200) + 16;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [tutorialPaused]);

  useEffect(() => {
    if (!playingVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlayingVideo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playingVideo]);

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
              <div className="absolute top-0 left-0 w-[65%] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:z-30 transition-all duration-500 ease-out">
                <img
                  src="/Gemini_Generated_Image_c5hbowc5hbowc5hb.png"
                  alt="Construction workers on site"
                  className="w-full h-[280px] object-cover"
                />
              </div>
              {/* App image — smaller, bottom-right, overlapping */}
              <div className="absolute bottom-0 right-0 w-[55%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white hover:-translate-y-2 hover:scale-105 hover:z-30 transition-all duration-500 ease-out">
                <img
                  src="/Gemini_Generated_Image_54wy9954wy9954wy.png"
                  alt="Employee clocking in on the Rigel app"
                  className="w-full h-[220px] object-cover"
                />
              </div>
              {/* Hiring image — bottom-left, completing the collage */}
              <div className="absolute bottom-0 left-0 w-[45%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10 hover:-translate-y-2 hover:scale-105 hover:z-30 transition-all duration-500 ease-out">
                <img
                  src="/7f312e71b7b87b5da8826c9484050d98.jpg"
                  alt="Hiring and onboarding with Rigel"
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
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  const el = moduleSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 300) + 16;
                  el.scrollBy({ left: -step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Previous module"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = moduleSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 300) + 16;
                  el.scrollBy({ left: step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Next module"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={moduleSliderRef}
            onMouseEnter={() => setModulePaused(true)}
            onMouseLeave={() => setModulePaused(false)}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {moduleTabs.map((p, i) => (
              <div key={p.title} className="snap-start shrink-0 w-[260px] sm:w-[300px] card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={p.icon} index={i} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payroll videos */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">See it in action</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Payroll management, in action
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Click a thumbnail to open the YouTube walkthrough in a dialog.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-3">
              <span className="text-sm font-mono text-slate-500">
                {String(activeVideoIndex + 1).padStart(2, '0')} / {String(PAYROLL_DEMO_VIDEOS.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => {
                  const el = videoSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  if (!card) return;
                  const i = Math.max(0, activeVideoIndex - 1);
                  const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                  el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const el = videoSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  if (!card) return;
                  const i = Math.min(PAYROLL_DEMO_VIDEOS.length - 1, activeVideoIndex + 1);
                  const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                  el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div
              ref={videoSliderRef}
              onScroll={() => {
                const el = videoSliderRef.current;
                if (!el) return;
                const card = el.firstElementChild as HTMLElement | null;
                if (!card) return;
                const center = el.scrollLeft + el.clientWidth / 2;
                const index = Math.round((center - card.offsetWidth / 2) / (card.offsetWidth + 16));
                setActiveVideoIndex(Math.max(0, Math.min(index, PAYROLL_DEMO_VIDEOS.length - 1)));
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              {PAYROLL_DEMO_VIDEOS.map((video, i) => (
                <button
                  key={video.url}
                  onClick={() => setPlayingVideo(video)}
                  className={`group text-left shrink-0 snap-center w-[85%] sm:w-[60%] lg:w-[45%] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500 ${i === activeVideoIndex ? 'ring-2 ring-emerald-500 scale-[1.07] shadow-2xl z-10' : 'opacity-70 scale-95 hover:opacity-100 hover:scale-100 hover:shadow-xl'}`}
                >
                  <div className="relative aspect-video">
                    <img
                      src={getYouTubeThumb(video.url)}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/95 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Play className="h-7 w-7 text-[#0F9D6C] ml-1" fill="#0F9D6C" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{video.title}</h3>
                    {video.desc && <p className="text-sm text-slate-500 mt-1">{video.desc}</p>}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {PAYROLL_DEMO_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = videoSliderRef.current;
                    if (!el) return;
                    const card = el.firstElementChild as HTMLElement | null;
                    if (!card) return;
                    const target = i * (card.offsetWidth + 16) + card.offsetWidth / 2 - el.clientWidth / 2;
                    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeVideoIndex ? 'w-8 bg-[#0F9D6C]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payroll video dialog */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[100] bg-[#0B1220]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute -top-10 right-0 h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <PayrollVideoPlayer src={playingVideo.url} />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{playingVideo.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{playingVideo.desc}</p>
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
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  const el = benefitsSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 300) + 16;
                  el.scrollBy({ left: -step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Previous benefit"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = benefitsSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 300) + 16;
                  el.scrollBy({ left: step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Next benefit"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={benefitsSliderRef}
            onMouseEnter={() => setBenefitsPaused(true)}
            onMouseLeave={() => setBenefitsPaused(false)}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {benefits.map((b) => (
              <div key={b.title} className="snap-start shrink-0 w-[260px] sm:w-[300px] card-lift bg-white rounded-xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={b.icon} index={benefits.indexOf(b)} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-5">{b.desc}</p>
                </div>
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <button type="button" onClick={() => slideByCard(kpiSliderRef, -1, 260)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => slideByCard(kpiSliderRef, 1, 260)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div ref={kpiSliderRef} onMouseEnter={() => setKpiPaused(true)} onMouseLeave={() => setKpiPaused(false)} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8">
            {[
              { label: 'Total Gross', value: 'R 0', icon: TrendingUp, color: 'text-emerald-600' },
              { label: 'Total Net', value: 'R 0', icon: Wallet, color: 'text-blue-600' },
              { label: 'Employer Cost', value: 'R 0', icon: Building2, color: 'text-amber-600' },
              { label: 'Avg Salary', value: 'R 0', icon: BarChart3, color: 'text-purple-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="snap-start shrink-0 w-[260px] card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={kpi.icon} index={['Total Gross','Total Net','Employer Cost','Avg Salary'].indexOf(kpi.label)} label="ZAR" />
                <div className="p-5">
                  <p className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{kpi.value}</p>
                  <p className="text-xs text-slate-500">{kpi.label}</p>
                </div>
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <button type="button" onClick={() => slideByCard(portalSliderRef, -1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => slideByCard(portalSliderRef, 1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div ref={portalSliderRef} onMouseEnter={() => setPortalPaused(true)} onMouseLeave={() => setPortalPaused(false)} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[
              { icon: Users, title: 'One-Click Portal Creation', desc: 'Admin creates portal account from employee dropdown — sets email and temporary password, system creates auth user automatically.' },
              { icon: LockKeyhole, title: 'Portal Access Control', desc: 'Admin can block/unblock employees, remove portal access, and view portal link status at any time.' },
              { icon: FileText, title: 'Payslip Notifications', desc: 'When a pay run is paid, portal notifications are automatically created for each employee in the run.' },
              { icon: Calendar, title: 'Leave Workflow', desc: 'Employees apply for leave → admin approves/rejects → employee sees status update in portal instantly.' },
            ].map((item) => (
              <div key={item.title} className="snap-start shrink-0 w-[280px] sm:w-[340px] card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={item.icon} index={['One-Click Portal Creation','Portal Access Control','Payslip Notifications','Leave Workflow'].indexOf(item.title)} />
                <div className="p-5">
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <button type="button" onClick={() => slideByCard(taxSliderRef, -1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => slideByCard(taxSliderRef, 1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div ref={taxSliderRef} onMouseEnter={() => setTaxPaused(true)} onMouseLeave={() => setTaxPaused(false)} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {[
              { icon: Calculator, title: 'PAYE Brackets', desc: 'View and configure tax brackets per tax year — lower limit, upper limit, rate, base amount.' },
              { icon: ShieldCheck, title: 'Rebates', desc: 'Primary, secondary (65+) and tertiary (75+) rebate amounts per tax year.' },
              { icon: Users, title: 'Medical Tax Credits', desc: 'Main member, first dependent and additional dependent credit amounts.' },
              { icon: Landmark, title: 'Statutory Rates', desc: 'UIF employee/employer rates, UIF ceiling, SDL rate, official interest rate.' },
              { icon: AlertTriangle, title: 'SDL Exemption', desc: 'Company-level toggle to exempt from SDL if annual payroll is R500,000 or less.' },
              { icon: RefreshCw, title: 'Update Without Code', desc: 'All values are database-driven — update SARS rates when new tax year tables are published.' },
            ].map((item) => (
              <div key={item.title} className="snap-start shrink-0 w-[260px] sm:w-[300px] card-lift bg-white rounded-xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={item.icon} index={['PAYE Brackets','Rebates','Medical Tax Credits','Statutory Rates','SDL Exemption','Update Without Code'].indexOf(item.title)} />
                <div className="p-4">
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <button type="button" onClick={() => slideByCard(reportsSliderRef, -1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => slideByCard(reportsSliderRef, 1, 300)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div ref={reportsSliderRef} onMouseEnter={() => setReportsPaused(true)} onMouseLeave={() => setReportsPaused(false)} className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {reports.map((r) => (
              <div key={r.title} className="snap-start shrink-0 w-[260px] sm:w-[300px] card-lift bg-white rounded-xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={r.icon} index={reports.indexOf(r)} />
                <div className="p-4">
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <button type="button" onClick={() => slideByCard(tutorialSliderRef, -1, 200)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => slideByCard(tutorialSliderRef, 1, 200)} className="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div ref={tutorialSliderRef} onMouseEnter={() => setTutorialPaused(true)} onMouseLeave={() => setTutorialPaused(false)} className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {tutorialSteps.map((step) => (
              <div key={step.num} className="snap-start shrink-0 w-[160px] sm:w-[200px] bg-white rounded-xl border border-slate-200 overflow-hidden group hover:border-emerald-300 transition-colors">
                <CardAvatar icon={GraduationCap} index={tutorialSteps.indexOf(step)} label={step.num} />
                <div className="p-4 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0F9D6C] to-[#1BA37B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-sm font-bold text-slate-900 mt-1 mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{step.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Module */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Recruitment</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Hiring module — from job advert to offer
            </h2>
            <p className="text-slate-600 text-base mt-3 max-w-2xl mx-auto leading-7">
              Manage the full recruitment process inside Rigel, alongside payroll and employee records. No separate HR system needed.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  const el = hiringSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 340) + 16;
                  el.scrollBy({ left: -step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Previous hiring feature"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = hiringSliderRef.current;
                  if (!el) return;
                  const card = el.firstElementChild as HTMLElement | null;
                  const step = (card?.offsetWidth ?? 340) + 16;
                  el.scrollBy({ left: step, behavior: 'smooth' });
                }}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center transition-colors"
                aria-label="Next hiring feature"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            ref={hiringSliderRef}
            onMouseEnter={() => setHiringPaused(true)}
            onMouseLeave={() => setHiringPaused(false)}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {hiringModules.map((m) => (
              <div key={m.title} className="snap-start shrink-0 w-[280px] sm:w-[340px] card-lift bg-white rounded-xl border border-slate-200 overflow-hidden">
                <CardAvatar icon={m.icon} index={hiringModules.indexOf(m)} />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-5 mb-3">{m.desc}</p>
                {m.bullets && (
                  <ul className="space-y-1.5">
                    {m.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2 text-[11px] text-slate-500 leading-4">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="h-10 w-10 rounded-full icon-gradient text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>What makes it useful</h3>
              <p className="text-xs text-slate-600 leading-5">
                All recruiting data stays in one place alongside payroll, employee records, and company data. Public application links let candidates apply without logging in, while scorecards make hiring decisions more objective and accepted candidates convert directly to employees.
              </p>
            </div>
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
