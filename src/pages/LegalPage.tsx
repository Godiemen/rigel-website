import { AlertCircle, CheckCircle2, FileText, Mail, ShieldCheck } from 'lucide-react';

const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This Privacy Policy explains how Rigel Business may collect, use and protect personal information when users visit the website or use the platform.',
    sections: [
      ['Information we collect', 'We may collect account details, contact information, company information, billing information, support messages and usage information required to provide Rigel Business services.'],
      ['How information is used', 'Information is used to create accounts, provide business software features, process subscriptions, improve the platform, respond to support requests and protect the service from misuse.'],
      ['Data security', 'We aim to use reasonable technical and organisational safeguards to protect user information against unauthorised access, loss or misuse.'],
      ['Sharing information', 'We do not sell personal information. Information may be shared with trusted service providers only where required to operate the website, process payments, host data or provide support.'],
      ['User rights', 'Users may request access, correction or deletion of personal information where applicable under South African privacy law.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'These Terms & Conditions govern your use of Rigel Business software, website and related services. By creating an account or using the platform, you agree to these terms.',
    sections: [
      ['Acceptance of terms', 'By accessing or using Rigel Business, you confirm that you have read, understood and agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree, you must not use the platform.'],
      ['Eligibility', 'You must be at least 18 years old and have the legal capacity to enter into a binding agreement. If you use Rigel Business on behalf of a company, you confirm that you have the authority to bind that entity to these terms.'],
      ['Use of the service', 'Users must use Rigel Business lawfully and must not attempt to disrupt, misuse, reverse engineer, or gain unauthorised access to the platform. You may not use the service to store fraudulent data, process illegal transactions, or violate any South African or international law.'],
      ['Account responsibility', 'Users are responsible for keeping login details secure and for all activity that happens under their account. You must notify Rigel Business immediately if you suspect any unauthorised access or security breach.'],
      ['Business records', 'Users are responsible for the accuracy and completeness of all business, accounting, VAT, payroll and reporting information entered into the system. Rigel Business is a tool to help manage records but does not guarantee the correctness of user-entered data.'],
      ['Subscriptions and billing', 'Paid plans are billed monthly or annually according to the selected package. Access to paid features depends on successful subscription payment. Prices may change with reasonable notice. Unused portions of a paid period are not refundable unless required by law.'],
      ['Intellectual property', 'Rigel Business, its logo, design, software code and content are the intellectual property of Rigel Business and its licensors. You may not copy, modify, distribute or create derivative works without written permission.'],
      ['Data and backups', 'Rigel Business aims to maintain regular backups and high availability, but is not liable for data loss caused by factors outside its control. Users are encouraged to export critical records periodically.'],
      ['Limitation of liability', 'Rigel Business provides software tools and information only. Users should consult qualified professionals for accounting, tax, legal or compliance advice. Rigel Business is not liable for indirect, incidental or consequential damages arising from use of the platform.'],
      ['Termination', 'Rigel Business may suspend or terminate accounts that violate these terms. Users may cancel their subscription at any time. Upon termination, access to the platform and stored data may be removed after a reasonable grace period.'],
      ['Changes to terms', 'These Terms & Conditions may be updated periodically. Continued use of the platform after changes constitutes acceptance of the updated terms. Material changes will be communicated where possible.'],
      ['Governing law', 'These terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved in the appropriate South African courts.'],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'This Cookie Policy explains how cookies and similar technologies are used on the Rigel Business website and platform, what types of cookies we set, and how you can manage them.',
    sections: [
      ['What cookies are', 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, manage sessions securely and understand how the site is used so improvements can be made.'],
      ['Types of cookies we use', 'Essential cookies are required for core functionality like authentication and security. Preference cookies remember your settings such as language and theme. Analytics cookies help us understand visitor behaviour so we can improve the platform. Marketing cookies, if enabled, help measure the effectiveness of campaigns.'],
      ['Essential cookies', 'These cookies are necessary for the website to function. They enable login sessions, form security (CSRF tokens) and load balancing. Without these cookies, parts of the platform will not work.'],
      ['Analytics and performance', 'We may use analytics cookies to collect information about how visitors use the website — pages visited, time spent, error messages. This data is aggregated and anonymous, used only to improve user experience.'],
      ['Functional cookies', 'These cookies allow the website to remember choices you make such as your preferred language, region or dashboard layout. They provide enhanced and personalised features.'],
      ['Third-party services', 'Some cookies may be set by trusted third-party tools used for hosting, analytics, payments or support services. These third parties have their own privacy and cookie policies governing how they use the data collected.'],
      ['Managing cookies', 'You can control or delete cookies through your browser settings at any time. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Some features of Rigel Business may not function correctly if essential cookies are disabled.'],
      ['Cookie consent', 'When you first visit Rigel Business, a cookie banner appears asking for your consent to non-essential cookies. You can change your preference at any time by clearing your browser cookies and revisiting the site, or through your browser settings.'],
      ['Updates to this policy', 'This Cookie Policy may be updated as new features are introduced or regulations change. We encourage you to review this page periodically to stay informed about how cookies are used.'],
    ],
  },
  refunds: {
    title: 'Refund and Cancellation Policy',
    intro: 'This policy explains basic cancellation and refund expectations for Rigel Business subscriptions.',
    sections: [
      ['Cancellation', 'Users may cancel their subscription according to the account or billing process provided by Rigel Business. Cancellation normally stops future billing.'],
      ['Refunds', 'Refunds may be reviewed case by case. Fees already paid for an active billing period may not automatically be refundable unless required by law or approved by Rigel Business.'],
      ['Plan changes', 'If users upgrade or downgrade plans, billing and feature access may change based on the selected package.'],
      ['Contact for billing help', 'Users should contact Rigel Business support for billing questions, duplicate charges or subscription issues.'],
    ],
  },
  popia: {
    title: 'POPIA Notice',
    intro: 'This POPIA Notice explains Rigel Business’s intention to process personal information responsibly in line with South African privacy principles.',
    sections: [
      ['Purpose of processing', 'Personal information may be processed to provide the software, manage accounts, support users, process billing and maintain security.'],
      ['Business data', 'Users may store customer, supplier, employee, invoice, payroll and accounting records in the platform. Users remain responsible for ensuring they have the right to capture and manage this information.'],
      ['Protection of information', 'Rigel Business aims to apply reasonable safeguards to protect personal and business information against loss, misuse and unauthorised access.'],
      ['Access and correction', 'Users may request correction or access to personal information where applicable. Requests can be sent through official contact channels.'],
      ['Responsible use', 'Users should only upload information they are authorised to process and should follow applicable privacy and employment laws.'],
    ],
  },
};

const policyLinks = [
  { key: 'privacy', path: '/privacy-policy', label: 'Privacy' },
  { key: 'terms', path: '/terms-of-service', label: 'Terms' },
  { key: 'cookies', path: '/cookie-policy', label: 'Cookies' },
  { key: 'refunds', path: '/refund-policy', label: 'Refunds' },
  { key: 'popia', path: '/popia-notice', label: 'POPIA' },
] as const;

type LegalPageKey = keyof typeof legalPages;

export function LegalPage({ page }: { page: LegalPageKey }) {
  const content = legalPages[page];

  return (
    <div className="bg-white">
      <section
        className="relative overflow-hidden bg-slate-950 bg-cover bg-center py-20 text-white"
        style={{ backgroundImage: "url('/images%20(2).jpeg')" }}
      >
        <div className="absolute inset-0 backdrop-blur-md" />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,223,95,0.10),transparent_28%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.10] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-black text-[#70e1bf]">
            <ShieldCheck className="h-4 w-4" /> Straightforward legal information
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">{content.title}</h1>
          <p className="text-lg leading-8 text-slate-300 max-w-3xl">{content.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {policyLinks.map((item) => (
              <a
                key={item.key}
                href={item.path}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                  page === item.key ? 'bg-[#00df5f] text-slate-950' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm font-bold text-slate-500">Last updated: May 2026</p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {[
              ['Plain language', 'We try to explain policies in a way normal business owners can understand.'],
              ['SA focused', 'These pages are written with South African businesses and POPIA expectations in mind.'],
              ['Responsible use', 'Rigel is software, but professional tax, accounting and legal judgement still matters.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <CheckCircle2 className="mb-4 h-6 w-6 text-[#1BA37B]" />
                <h3 className="font-black text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6 mb-10">
            <div className="flex gap-4">
              <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm leading-7 text-amber-900">
                This page gives general information and does not replace professional legal advice. As Rigel Business grows, these policies should be reviewed with a qualified legal professional.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {content.sections.map(([heading, body], index) => (
              <section key={heading} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-2xl bg-[#1BA37B]/10 text-[#1BA37B] flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-slate-400">Section {index + 1}</p>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">{heading}</h2>
                    <p className="text-slate-600 leading-8">{body}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Need help understanding this policy?</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">If something is unclear, contact Rigel Business and we will explain it in plain language.</p>
              </div>
              <a href="mailto:support@rigelbusiness.co.za" className="h-12 px-6 rounded-full bg-[#00df5f] text-slate-950 font-black flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" /> Contact support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
