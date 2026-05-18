import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2, Clock, FileText, Search, Sparkles, Star, UserRound } from 'lucide-react';

const articles = [
  {
    title: 'How to prepare your business for VAT season in South Africa',
    category: 'VAT & SARS',
    author: 'stella-lumen',
    date: '12 Mar 2026',
    read: '6 min read',
    featured: true,
    image: '/2017.10.18-6854438.webp',
    desc: 'A practical checklist for keeping tax invoices, input VAT, output VAT and VAT201 reporting clean before submission time.',
    content: [
      {
        heading: 'What VAT means for a growing business',
        body: 'Value-Added Tax, commonly called VAT, is a tax charged on the supply of goods and services. In South Africa, VAT is an important part of business compliance because registered vendors must charge output VAT on taxable sales and may claim input VAT on qualifying business purchases. Good VAT management helps a business avoid last-minute pressure, inaccurate submissions and cash flow surprises.',
      },
      {
        heading: 'Why VAT should not be treated as extra income',
        body: 'One of the biggest mistakes small businesses make is treating VAT collected from customers as available cash. Output VAT belongs to SARS until it is offset against valid input VAT or paid over during the VAT period. Separating VAT in your reporting gives you a clearer view of your true revenue, actual expenses and future payment obligations.',
      },
      {
        heading: 'The documents that matter',
        body: 'VAT accuracy depends on reliable source documents. Businesses should keep proper tax invoices, credit notes, supplier invoices, proof of payment and supporting records. A missing or incorrect supplier tax invoice can create problems when claiming input VAT, while incomplete sales documents can affect output VAT reporting.',
      },
      {
        heading: 'Input VAT, output VAT and the VAT201 return',
        body: 'Output VAT is VAT charged on your sales. Input VAT is VAT paid on qualifying business expenses. The difference between the two is used to determine whether you owe SARS or have a VAT credit. The VAT201 return summarises these totals, which is why clean transaction capture throughout the month is easier than trying to rebuild the numbers at submission time.',
      },
      {
        heading: 'How Rigel Business helps',
        body: 'Rigel Business is designed to keep VAT connected to daily transactions. Sales invoices, supplier bills, credit notes and purchase records can all support VAT reporting. This helps business owners review VAT totals, understand what makes up the VAT balance, and prepare more confidently for period-end reporting.',
      },
    ],
    checklist: [
      'Keep tax invoices for every VAT-related sale and purchase.',
      'Review VAT codes before closing the VAT period.',
      'Separate business expenses from personal spending.',
      'Reconcile supplier invoices and customer credit notes.',
      'Monitor VAT payable before the submission deadline.',
    ],
  },
  {
    title: 'Understanding trial balance, general ledger and AFS reports',
    category: 'Accounting',
    author: 'Rigel Editorial',
    date: '18 Mar 2026',
    read: '8 min read',
    featured: true,
    image: '/The-importance-of-effective-financial-management-in-todays-businesses-1024x570.jpg',
    desc: 'Learn how the trial balance, general ledger and annual financial statements connect inside a growing business.',
    content: [
      {
        heading: 'Why financial reports matter',
        body: 'A business needs more than bank balances to understand performance. Proper accounting reports show what the business owns, what it owes, what it earned and what it spent. The trial balance, general ledger and annual financial statements each play a different role, but together they give owners a reliable picture of financial health.',
      },
      {
        heading: 'The role of the trial balance',
        body: 'A trial balance lists all ledger account balances at a specific point in time. It helps confirm that total debits and total credits are aligned before preparing more detailed reports. While a balanced trial balance does not guarantee that every transaction is correct, it is an important control for identifying posting errors and unusual balances.',
      },
      {
        heading: 'The general ledger as your transaction history',
        body: 'The general ledger is the detailed record behind the numbers. It shows the movement in each account, including sales, purchases, VAT, bank, assets, liabilities and expenses. When a figure in a report looks unusual, the general ledger helps you trace exactly where it came from.',
      },
      {
        heading: 'Annual financial statements',
        body: 'Annual financial statements summarise the performance and position of a business over a financial year. They normally include reports such as the statement of financial position and statement of profit or loss. Clean monthly records make it easier to prepare these statements accurately and professionally.',
      },
    ],
    checklist: [
      'Review the trial balance before month-end reporting.',
      'Investigate unusual ledger account balances.',
      'Keep sales, purchases, VAT and bank entries up to date.',
      'Use consistent account categories for clean reporting.',
      'Prepare reports regularly instead of only at year-end.',
    ],
  },
  {
    title: 'Better purchase management: from supplier invoice to payment',
    category: 'Purchases',
    author: 'stella-lumen',
    date: '22 Mar 2026',
    read: '5 min read',
    featured: false,
    image: '/images%20(1).jpeg',
    desc: 'Simple ways to track suppliers, purchase orders, bills, due dates and payment status without spreadsheet confusion.',
    content: [
      {
        heading: 'Why purchase management matters',
        body: 'Purchases affect cash flow, supplier relationships, VAT claims and stock availability. When supplier bills are not tracked properly, a business can miss due dates, duplicate payments, lose input VAT records or struggle to understand what it owes.',
      },
      {
        heading: 'From supplier invoice to payment',
        body: 'A strong purchase process starts when a supplier invoice or purchase order is captured. The business should record the supplier, invoice date, due date, VAT, line items and payment status. This creates visibility over outstanding amounts and helps the finance team plan payments.',
      },
      {
        heading: 'Supplier records and accountability',
        body: 'Keeping supplier details in one place makes reconciliation easier. Contact information, payment terms, invoice history and outstanding balances help owners see which suppliers are critical and which accounts need attention.',
      },
      {
        heading: 'How better purchases support reporting',
        body: 'Clean purchase records support expense reporting, VAT input claims and cash flow planning. They also help the business identify cost trends and negotiate better with suppliers.',
      },
    ],
    checklist: [
      'Capture supplier invoices as soon as they arrive.',
      'Track due dates and payment status.',
      'Keep supplier VAT numbers and invoice records.',
      'Match payments to the correct supplier bills.',
      'Review outstanding supplier balances weekly.',
    ],
  },
  {
    title: 'How small businesses can improve cash flow visibility',
    category: 'Finance',
    author: 'Rigel Editorial',
    date: '29 Mar 2026',
    read: '7 min read',
    featured: false,
    image: '/7-differences-between-book-keeping-and-accounting-1.jpeg.webp',
    desc: 'Cash flow habits that help you spot overdue invoices, upcoming supplier payments and month-end pressure early.',
    content: [
      {
        heading: 'Cash flow is the movement of money',
        body: 'Profit and cash flow are not the same. A business can make sales and still struggle if customers pay late or supplier payments arrive before customer receipts. Cash flow visibility helps owners understand what money is available today and what obligations are coming soon.',
      },
      {
        heading: 'Know what customers owe you',
        body: 'Outstanding invoices should be reviewed regularly. Ageing reports help identify which customers are overdue, which invoices need follow-up and how much cash is expected. This is especially important for businesses that sell on credit.',
      },
      {
        heading: 'Plan supplier payments before they become urgent',
        body: 'Cash flow improves when supplier payments are planned. Knowing which bills are due this week, next week and next month helps the business avoid pressure and protect important supplier relationships.',
      },
      {
        heading: 'Use reports to make better decisions',
        body: 'Accurate sales, purchase and bank records help owners decide when to buy stock, hire staff, pay suppliers or follow up customers. Better cash flow visibility creates confidence and reduces guesswork.',
      },
    ],
    checklist: [
      'Review overdue customer invoices every week.',
      'Track supplier bills by due date.',
      'Separate VAT obligations from available cash.',
      'Monitor bank balances against upcoming payments.',
      'Use reports before making major spending decisions.',
    ],
  },
  {
    title: 'Inventory basics: stock value, margins and low-stock control',
    category: 'Inventory',
    author: 'stella-lumen',
    date: '04 Apr 2026',
    read: '6 min read',
    featured: false,
    image: '/images.jpeg',
    desc: 'A beginner-friendly guide to understanding stock movement, cost of sales and product profitability.',
    content: [
      {
        heading: 'Inventory is money sitting on shelves',
        body: 'Stock is one of the most important assets for product-based businesses. Too much stock can lock up cash, while too little stock can lead to lost sales. Good inventory control helps a business balance availability, cost and profitability.',
      },
      {
        heading: 'Understand stock movement',
        body: 'Stock movement includes purchases, sales, returns, adjustments and transfers. Recording these movements properly helps the business know what is available, what was sold and what needs to be reordered.',
      },
      {
        heading: 'Cost of sales and margins',
        body: 'Inventory affects profit through cost of sales. When products are sold, the cost of those products must be measured against the selling price to calculate margin. Without accurate stock costs, profitability reports can be misleading.',
      },
      {
        heading: 'Low-stock control',
        body: 'Low-stock alerts and reorder levels help businesses avoid running out of important products. Reviewing fast-moving and slow-moving items also helps owners make better buying decisions.',
      },
    ],
    checklist: [
      'Keep product costs and selling prices updated.',
      'Record stock purchases and sales accurately.',
      'Monitor low-stock and fast-moving items.',
      'Review slow-moving inventory before buying more.',
      'Compare product margins regularly.',
    ],
  },
  {
    title: 'Payroll records every South African business should keep',
    category: 'Payroll',
    author: 'Rigel Editorial',
    date: '10 Apr 2026',
    read: '5 min read',
    featured: false,
    image: '/Common-Payroll-Errors-Rosclar.webp',
    desc: 'Important employee, payslip and deduction records to keep organised as your team grows.',
    content: [
      {
        heading: 'Payroll needs accuracy and consistency',
        body: 'Payroll is more than paying employees. It involves salaries, wages, deductions, leave, benefits, payslips and compliance records. Mistakes can affect staff trust, reporting accuracy and business administration.',
      },
      {
        heading: 'Keep complete employee records',
        body: 'Every employee should have accurate personal, employment and payment information. This includes start dates, pay rates, banking details, tax information, leave balances and contract details where applicable.',
      },
      {
        heading: 'Payslips and deductions',
        body: 'Payslips should clearly show earnings, deductions and net pay. Deductions must be recorded carefully so that employees understand how their pay was calculated and the business can support payroll reporting.',
      },
      {
        heading: 'Payroll reporting as the team grows',
        body: 'As a business adds more employees, payroll records become more important. Organised records make it easier to review labour costs, prepare summaries and keep management informed.',
      },
    ],
    checklist: [
      'Keep employee details accurate and updated.',
      'Review pay rates before processing payroll.',
      'Store payslips and deduction records safely.',
      'Track leave and employee changes.',
      'Review payroll summaries every pay period.',
    ],
  },
];

const categories = ['VAT & SARS', 'Accounting', 'Purchases', 'Finance', 'Inventory', 'Payroll'];

export function BusinessResources() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null);

  if (selectedArticle) {
    const hasFullArticle = selectedArticle.content.length > 0;

    return (
      <div className="bg-white">
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
          <div className="absolute right-[8%] top-8 h-[28rem] w-[28rem] rounded-full bg-[#00df5f] opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSelectedArticle(null)} className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#70e1bf]">
              <ArrowLeft className="h-4 w-4" /> Back to resources
            </button>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-slate-400">
              <span className="rounded-full bg-[#1BA37B]/20 px-3 py-1 text-[#70e1bf]">{selectedArticle.category}</span>
              <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {selectedArticle.author}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {selectedArticle.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedArticle.read}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">{selectedArticle.title}</h1>
          </div>
        </section>

        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedArticle.image ? (
              <img src={selectedArticle.image} alt={selectedArticle.title} className="mb-10 h-[28rem] w-full rounded-[2rem] object-cover shadow-2xl shadow-slate-200/80" />
            ) : (
              <div className="mb-10 h-80 rounded-[2rem] bg-slate-950 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#00df5f] opacity-70" />
                <div className="absolute left-8 bottom-8">
                  <FileText className="mb-4 h-10 w-10 text-[#70e1bf]" />
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#70e1bf]">{selectedArticle.category}</p>
                </div>
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <p className="text-xl leading-9 text-slate-600 font-medium">{selectedArticle.desc}</p>
            </div>

            {hasFullArticle ? (
              <>
                <div className="my-10 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
                  <h2 className="mb-4 text-xl font-black text-slate-900">{selectedArticle.category} checklist</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedArticle.checklist.map(item => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-white p-4">
                        <CheckCircle2 className="h-5 w-5 text-[#1BA37B] shrink-0" />
                        <p className="text-sm font-semibold leading-6 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  {selectedArticle.content.map(section => (
                    <section key={section.heading}>
                      <h2 className="mb-4 text-3xl font-black text-slate-900">{section.heading}</h2>
                      <p className="text-lg leading-9 text-slate-600">{section.body}</p>
                    </section>
                  ))}
                </div>

                <div className="mt-12 rounded-[2rem] bg-slate-950 p-8 text-white">
                  <h2 className="mb-4 text-2xl font-black">Professional note</h2>
                  <p className="leading-8 text-slate-300">
                    VAT rules can vary depending on your business activity and registration status. Use accounting software to keep records organised, but always confirm complex VAT treatment with a qualified accountant or tax practitioner.
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-10 rounded-[2rem] bg-slate-50 p-8 text-center">
                <h2 className="mb-3 text-2xl font-black text-slate-900">Full article coming soon</h2>
                <p className="text-slate-500 leading-8">This article page is ready. The full professional guide will be added to the resources library soon.</p>
              </div>
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#06110e] py-20 lg:py-24 text-white">
        <div className="absolute right-[8%] top-10 h-[30rem] w-[30rem] rounded-full bg-[#00df5f] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,163,123,0.34),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.14),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-black text-[#70e1bf] mb-6">
                <BookOpen className="h-4 w-4" /> Business Resources
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">Articles to help you run a smarter business.</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300 mb-8">
                Practical guides for VAT, accounting reports, sales, purchases, payroll, inventory and everyday business decisions in South Africa.
              </p>
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 4).map(category => (
                  <span key={category} className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-200">{category}</span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-[#1BA37B]/20 blur-3xl" />
              <div className="relative rounded-[2rem] bg-white p-5 text-slate-900 shadow-2xl shadow-black/40">
                <div className="mb-5 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                  <Search className="h-5 w-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-400">Search VAT, reports, stock, payroll...</span>
                </div>
                <div className="overflow-hidden rounded-3xl bg-slate-950 text-white">
                  <img src={articles[0].image} alt={articles[0].title} className="h-48 w-full object-cover" />
                  <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-[#1BA37B]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#70e1bf]">Featured</span>
                    <Sparkles className="h-5 w-5 text-[#70e1bf]" />
                  </div>
                  <h2 className="text-2xl font-black leading-tight mb-3">{articles[0].title}</h2>
                  <p className="text-sm leading-7 text-slate-300 mb-5">{articles[0].desc}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {articles[0].author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {articles[0].read}</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#1BA37B] mb-3">Latest articles</p>
              <h2 className="text-4xl font-black text-slate-900">Business knowledge library</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button key={category} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 hover:border-[#1BA37B] hover:text-[#1BA37B] transition-colors">
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <article key={article.title} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/80 transition-shadow">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
                ) : (
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#00df5f] opacity-70" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <div className="mb-4 h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-[#70e1bf]" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#70e1bf]">{article.category}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1BA37B]">{article.category}</span>
                    {article.featured && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                  </div>
                  <h3 className="mb-3 text-xl font-black leading-tight text-slate-900 group-hover:text-[#1BA37B] transition-colors">{article.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-slate-500">{article.desc}</p>
                  <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {article.author}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.read}</span>
                  </div>
                  <button onClick={() => setSelectedArticle(article)} className="inline-flex items-center gap-2 text-sm font-black text-[#1BA37B]">
                    Read article <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[2rem] bg-slate-950 px-6 py-14 text-white shadow-2xl shadow-slate-200/80">
            <FileText className="mx-auto mb-5 h-10 w-10 text-[#70e1bf]" />
            <h2 className="text-3xl font-black mb-4">More guides are coming soon</h2>
            <p className="mx-auto max-w-2xl text-slate-400 leading-8">
              This resource hub will grow into a full library for South African businesses using Rigel Business to manage accounting, VAT, stock, payroll and reporting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
