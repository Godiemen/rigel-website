import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, CheckCircle2, Clock,
  FileText, Star, UserRound, Building2, Lightbulb, Newspaper,
} from 'lucide-react';

type Article = {
  title: string;
  category: string;
  author: string;
  date: string;
  read: string;
  featured: boolean;
  image: string;
  desc: string;
  content: { heading: string; body: string }[];
  checklist: string[];
};

type BlogCategory = {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof FileText;
  accent: string;
  heroImage: string;
  articles: Article[];
};

const blogCategories: Record<string, BlogCategory> = {
  'small-business': {
    slug: 'small-business',
    title: 'Small Business',
    tagline: 'Practical tips, strategies and stories to help South African small businesses grow, manage cash flow and stay compliant.',
    icon: Building2,
    accent: '#0F9D6C',
    heroImage: '/Gemini_Generated_Image_xefbhfxefbhfxefb.png',
    articles: [
      {
        title: 'How small businesses can improve cash flow visibility',
        category: 'Finance',
        author: 'Rigel Editorial',
        date: '29 Mar 2026',
        read: '7 min read',
        featured: true,
        image: '/7-differences-between-book-keeping-and-accounting-1.jpeg.webp',
        desc: 'Cash flow habits that help you spot overdue invoices, upcoming supplier payments and month-end pressure early.',
        content: [
          { heading: 'Cash flow is the movement of money', body: 'Profit and cash flow are not the same. A business can make sales and still struggle if customers pay late or supplier payments arrive before customer receipts. Cash flow visibility helps owners understand what money is available today and what obligations are coming soon.' },
          { heading: 'Know what customers owe you', body: 'Outstanding invoices should be reviewed regularly. Ageing reports help identify which customers are overdue, which invoices need follow-up and how much cash is expected. This is especially important for businesses that sell on credit.' },
          { heading: 'Plan supplier payments before they become urgent', body: 'Cash flow improves when supplier payments are planned. Knowing which bills are due this week, next week and next month helps the business avoid pressure and protect important supplier relationships.' },
          { heading: 'Use reports to make better decisions', body: 'Accurate sales, purchase and bank records help owners decide when to buy stock, hire staff, pay suppliers or follow up customers. Better cash flow visibility creates confidence and reduces guesswork.' },
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
        title: 'Better purchase management: from supplier invoice to payment',
        category: 'Purchases',
        author: 'stella-lumen',
        date: '22 Mar 2026',
        read: '5 min read',
        featured: false,
        image: '/images%20(1).jpeg',
        desc: 'Simple ways to track suppliers, purchase orders, bills, due dates and payment status without spreadsheet confusion.',
        content: [
          { heading: 'Why purchase management matters', body: 'Purchases affect cash flow, supplier relationships, VAT claims and stock availability. When supplier bills are not tracked properly, a business can miss due dates, duplicate payments, lose input VAT records or struggle to understand what it owes.' },
          { heading: 'From supplier invoice to payment', body: 'A strong purchase process starts when a supplier invoice or purchase order is captured. The business should record the supplier, invoice date, due date, VAT, line items and payment status. This creates visibility over outstanding amounts and helps the finance team plan payments.' },
          { heading: 'Supplier records and accountability', body: 'Keeping supplier details in one place makes reconciliation easier. Contact information, payment terms, invoice history and outstanding balances help owners see which suppliers are critical and which accounts need attention.' },
          { heading: 'How better purchases support reporting', body: 'Clean purchase records support expense reporting, VAT input claims and cash flow planning. They also help the business identify cost trends and negotiate better with suppliers.' },
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
        title: 'Inventory basics: stock value, margins and low-stock control',
        category: 'Inventory',
        author: 'stella-lumen',
        date: '04 Apr 2026',
        read: '6 min read',
        featured: false,
        image: '/images.jpeg',
        desc: 'A beginner-friendly guide to understanding stock movement, cost of sales and product profitability.',
        content: [
          { heading: 'Inventory is money sitting on shelves', body: 'Stock is one of the most important assets for product-based businesses. Too much stock can lock up cash, while too little stock can lead to lost sales. Good inventory control helps a business balance availability, cost and profitability.' },
          { heading: 'Understand stock movement', body: 'Stock movement includes purchases, sales, returns, adjustments and transfers. Recording these movements properly helps the business know what is available, what was sold and what needs to be reordered.' },
          { heading: 'Cost of sales and margins', body: 'Inventory affects profit through cost of sales. When products are sold, the cost of those products must be measured against the selling price to calculate margin. Without accurate stock costs, profitability reports can be misleading.' },
          { heading: 'Low-stock control', body: 'Low-stock alerts and reorder levels help businesses avoid running out of important products. Reviewing fast-moving and slow-moving items also helps owners make better buying decisions.' },
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
        title: '5 signs your small business has outgrown spreadsheets',
        category: 'Growth',
        author: 'Rigel Editorial',
        date: '15 May 2026',
        read: '4 min read',
        featured: false,
        image: '/Gemini_Generated_Image_h639jwh639jwh639.png',
        desc: 'Spreadsheets are great for starting out, but these signs mean it is time to switch to proper business software.',
        content: [
          { heading: 'You spend more time fixing errors than analysing', body: 'When spreadsheet formulas break, cells get overwritten and versions multiply, you lose trust in your own numbers. If reconciling data takes hours every month, your business has outgrown the tool.' },
          { heading: 'VAT returns are stressful and last-minute', body: 'If you are scrambling to find tax invoices and calculate output vs input VAT at submission time, you need a system that tracks VAT automatically on every transaction.' },
          { heading: 'You cannot see who owes you money', body: 'Without a proper debtor ageing report, overdue invoices slip through the cracks. A business software platform shows outstanding balances and due dates at a glance.' },
          { heading: 'Your team needs access at the same time', body: 'Spreadsheets do not support multiple users well. When two people edit the same file, data gets lost. Cloud-based business software lets your whole team work together safely.' },
          { heading: 'You are managing multiple businesses', body: 'If you run more than one company, spreadsheets become unmanageable. Multi-company software lets you switch between entities without logging out.' },
        ],
        checklist: [
          'Track time spent fixing spreadsheet errors monthly.',
          'Review VAT preparation time as a key indicator.',
          'Monitor overdue customer invoices weekly.',
          'Evaluate team collaboration needs regularly.',
          'Consider multi-company requirements before they become urgent.',
        ],
      },
      {
        title: 'Choosing the right accounting software for your South African business',
        category: 'Software',
        author: 'Rigel Editorial',
        date: '20 May 2026',
        read: '6 min read',
        featured: false,
        image: '/Gemini_Generated_Image_c5hbowc5hbowc5hb.png',
        desc: 'What to look for in accounting software — from VAT compliance and payroll to multi-company support and reporting.',
        content: [
          { heading: 'Start with your business needs', body: 'Before choosing software, list your must-haves: VAT management, payroll, inventory, multi-company, reporting. A tool that covers most of these in one platform will save you time and money compared to stitching multiple apps together.' },
          { heading: 'VAT and SARS compliance', body: 'South African businesses need software that handles 15% VAT, VAT201 returns, zero-rated and exempt supplies, and period-based closing. Look for built-in VAT boxes and SARS-format reports.' },
          { heading: 'Payroll and employee tax', body: 'If you have employees, your software should handle PAYE, UIF, SDL, payslips and IRP5 generation. Manual payroll calculations are error-prone and time-consuming.' },
          { heading: 'Reporting that makes sense', body: 'Good software gives you a trial balance, general ledger, income statement and balance sheet without manual work. Annual financial statements should be a click away, not a week-long project.' },
          { heading: 'Scalability and support', body: 'Choose a platform that grows with your business. Multi-company support, user permissions and local South African support are important for long-term success.' },
        ],
        checklist: [
          'List your must-have features before evaluating software.',
          'Verify SARS compliance and VAT201 support.',
          'Check payroll and employee tax capabilities.',
          'Review reporting and AFS generation features.',
          'Confirm local support and scalability options.',
        ],
      },
      {
        title: 'Why separating business and personal finances matters',
        category: 'Finance',
        author: 'stella-lumen',
        date: '01 Jun 2026',
        read: '4 min read',
        featured: false,
        image: '/Gemini_Generated_Image_54wy9954wy9954wy.png',
        desc: 'Mixing business and personal money creates tax problems, reporting errors and unnecessary stress. Here is why separation is essential.',
        content: [
          { heading: 'Clean records make tax easier', body: 'When business and personal transactions are mixed, identifying deductible expenses becomes a nightmare. Separating them means every business transaction is captured correctly, and personal spending does not distort your financial reports.' },
          { heading: 'VAT accuracy depends on it', body: 'VAT input claims can only be made on business expenses. If personal and business purchases are mixed, you risk claiming VAT incorrectly — which can lead to SARS penalties and interest.' },
          { heading: 'Better financial visibility', body: 'Separate accounts give you a true picture of business performance. You can see exactly what the business earns, spends and owes without filtering out personal transactions.' },
          { heading: 'Professionalism and credibility', body: 'Separate business banking and accounting signals professionalism to suppliers, customers, banks and SARS. It makes loan applications, audits and due diligence processes smoother.' },
        ],
        checklist: [
          'Open a separate business bank account.',
          'Use business cards for all business purchases.',
          'Record personal contributions as owner drawings or loans.',
          'Review business-only transactions for VAT claims.',
          'Reconcile business accounts monthly.',
        ],
      },
    ],
  },
  'guide': {
    slug: 'guide',
    title: 'Guide',
    tagline: 'Step-by-step guides on accounting, VAT, payroll, inventory and reporting — written for business owners, not accountants.',
    icon: Lightbulb,
    accent: '#2563EB',
    heroImage: '/The-importance-of-effective-financial-management-in-todays-businesses-1024x570.jpg',
    articles: [
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
          { heading: 'What VAT means for a growing business', body: 'Value-Added Tax, commonly called VAT, is a tax charged on the supply of goods and services. In South Africa, VAT is an important part of business compliance because registered vendors must charge output VAT on taxable sales and may claim input VAT on qualifying business purchases. Good VAT management helps a business avoid last-minute pressure, inaccurate submissions and cash flow surprises.' },
          { heading: 'Why VAT should not be treated as extra income', body: 'One of the biggest mistakes small businesses make is treating VAT collected from customers as available cash. Output VAT belongs to SARS until it is offset against valid input VAT or paid over during the VAT period. Separating VAT in your reporting gives you a clearer view of your true revenue, actual expenses and future payment obligations.' },
          { heading: 'The documents that matter', body: 'VAT accuracy depends on reliable source documents. Businesses should keep proper tax invoices, credit notes, supplier invoices, proof of payment and supporting records. A missing or incorrect supplier tax invoice can create problems when claiming input VAT, while incomplete sales documents can affect output VAT reporting.' },
          { heading: 'Input VAT, output VAT and the VAT201 return', body: 'Output VAT is VAT charged on your sales. Input VAT is VAT paid on qualifying business expenses. The difference between the two is used to determine whether you owe SARS or have a VAT credit. The VAT201 return summarises these totals, which is why clean transaction capture throughout the month is easier than trying to rebuild the numbers at submission time.' },
          { heading: 'How Rigel Business helps', body: 'Rigel Business is designed to keep VAT connected to daily transactions. Sales invoices, supplier bills, credit notes and purchase records can all support VAT reporting. This helps business owners review VAT totals, understand what makes up the VAT balance, and prepare more confidently for period-end reporting.' },
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
          { heading: 'Why financial reports matter', body: 'A business needs more than bank balances to understand performance. Proper accounting reports show what the business owns, what it owes, what it earned and what it spent. The trial balance, general ledger and annual financial statements each play a different role, but together they give owners a reliable picture of financial health.' },
          { heading: 'The role of the trial balance', body: 'A trial balance lists all ledger account balances at a specific point in time. It helps confirm that total debits and total credits are aligned before preparing more detailed reports. While a balanced trial balance does not guarantee that every transaction is correct, it is an important control for identifying posting errors and unusual balances.' },
          { heading: 'The general ledger as your transaction history', body: 'The general ledger is the detailed record behind the numbers. It shows the movement in each account, including sales, purchases, VAT, bank, assets, liabilities and expenses. When a figure in a report looks unusual, the general ledger helps you trace exactly where it came from.' },
          { heading: 'Annual financial statements', body: 'Annual financial statements summarise the performance and position of a business over a financial year. They normally include reports such as the statement of financial position and statement of profit or loss. Clean monthly records make it easier to prepare these statements accurately and professionally.' },
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
        title: 'Payroll records every South African business should keep',
        category: 'Payroll',
        author: 'Rigel Editorial',
        date: '10 Apr 2026',
        read: '5 min read',
        featured: false,
        image: '/Common-Payroll-Errors-Rosclar.webp',
        desc: 'Important employee, payslip and deduction records to keep organised as your team grows.',
        content: [
          { heading: 'Payroll needs accuracy and consistency', body: 'Payroll is more than paying employees. It involves salaries, wages, deductions, leave, benefits, payslips and compliance records. Mistakes can affect staff trust, reporting accuracy and business administration.' },
          { heading: 'Keep complete employee records', body: 'Every employee should have accurate personal, employment and payment information. This includes start dates, pay rates, banking details, tax information, leave balances and contract details where applicable.' },
          { heading: 'Payslips and deductions', body: 'Payslips should clearly show earnings, deductions and net pay. Deductions must be recorded carefully so that employees understand how their pay was calculated and the business can support payroll reporting.' },
          { heading: 'Payroll reporting as the team grows', body: 'As a business adds more employees, payroll records become more important. Organised records make it easier to review labour costs, prepare summaries and keep management informed.' },
        ],
        checklist: [
          'Keep employee details accurate and updated.',
          'Review pay rates before processing payroll.',
          'Store payslips and deduction records safely.',
          'Track leave and employee changes.',
          'Review payroll summaries every pay period.',
        ],
      },
      {
        title: 'A beginner\'s guide to bank reconciliation',
        category: 'Accounting',
        author: 'stella-lumen',
        date: '25 May 2026',
        read: '5 min read',
        featured: false,
        image: '/Gemini_Generated_Image_7elprd7elprd7elp.png',
        desc: 'What bank reconciliation is, why it matters and how to do it without stress every month.',
        content: [
          { heading: 'What is bank reconciliation?', body: 'Bank reconciliation is the process of matching your accounting records to your bank statement. It confirms that every transaction in your books has a corresponding bank entry, and vice versa. This helps catch missing transactions, duplicate entries and bank errors.' },
          { heading: 'Why it matters', body: 'Without regular reconciliation, your cash balance in the accounting system may not match reality. This leads to incorrect reports, missed payments, overdrafts and poor financial decisions. Monthly reconciliation keeps your books trustworthy.' },
          { heading: 'How to reconcile step by step', body: 'Start by comparing your bank statement to your accounting records. Match each transaction one by one. Flag any unmatched items. Investigate differences — they could be bank fees, interest, missing entries or timing differences. Once everything matches, your books are reconciled.' },
          { heading: 'How Rigel Business helps', body: 'Rigel Business supports bank reconciliation by linking transactions to bank accounts, showing matched and unmatched items, and letting you match or create entries directly from the reconciliation screen.' },
        ],
        checklist: [
          'Reconcile bank accounts at least once a month.',
          'Match every transaction to a bank statement entry.',
          'Investigate unmatched items immediately.',
          'Record bank fees and interest during reconciliation.',
          'Confirm the reconciled balance matches the bank statement.',
        ],
      },
      {
        title: 'How to set up your chart of accounts',
        category: 'Accounting',
        author: 'Rigel Editorial',
        date: '05 Jun 2026',
        read: '6 min read',
        featured: false,
        image: '/Gemini_Generated_Image_bgff3ubgff3ubgff.png',
        desc: 'A well-structured chart of accounts is the foundation of clean reporting. Here is how to set one up properly.',
        content: [
          { heading: 'What is a chart of accounts?', body: 'A chart of accounts is a list of all the accounts used by a business to record transactions. It includes assets, liabilities, equity, income, expenses and VAT accounts. Each account has a number and a name that makes reporting clear and consistent.' },
          { heading: 'Keep it simple and logical', body: 'Start with standard categories: assets (1000s), liabilities (2000s), equity (3000s), income (4000s), expenses (5000s). Add sub-accounts only when needed. Too many accounts create confusion; too few hide important detail.' },
          { heading: 'Separate VAT control accounts', body: 'Create dedicated accounts for output VAT, input VAT and VAT payable. This makes VAT201 preparation much easier and ensures VAT balances are always visible on the trial balance.' },
          { heading: 'Review and adjust over time', body: 'As your business grows, you may need new accounts for new income streams or expense categories. Review your chart of accounts annually and adjust as needed — but avoid frequent changes that make year-on-year comparisons difficult.' },
        ],
        checklist: [
          'Use standard numbering ranges for each account type.',
          'Create separate VAT control accounts.',
          'Keep account names clear and consistent.',
          'Avoid creating too many sub-accounts.',
          'Review the chart of accounts annually.',
        ],
      },
      {
        title: 'Provisional tax explained: IRP6 for South African companies',
        category: 'Tax',
        author: 'stella-lumen',
        date: '12 Jun 2026',
        read: '7 min read',
        featured: false,
        image: '/Gemini_Generated_Image_u5wb3gu5wb3gu5wb.png',
        desc: 'What provisional tax is, when it is due and how to calculate your IRP6 without stress.',
        content: [
          { heading: 'What is provisional tax?', body: 'Provisional tax is a system where companies pay tax in two installments during the tax year, rather than waiting until year-end. It helps SARS collect tax revenue steadily and helps businesses spread their tax payments.' },
          { heading: 'When are the two periods?', body: 'Period 1 covers the first six months of the tax year and is due by 31 August. Period 2 covers the full tax year and is due by 28 February (or the last day of the financial year). Each period requires an IRP6 return.' },
          { heading: 'How to calculate provisional tax', body: 'Start with your accounting profit, add back non-deductible expenses (like depreciation), subtract capital allowances and assessed losses, then apply the 27% CIT rate. The result is your estimated tax liability for the period.' },
          { heading: 'Avoiding under-estimation penalties', body: 'SARS may charge penalties if your provisional tax is significantly lower than your final tax liability. To avoid this, estimate conservatively and use your previous year\'s actual tax as a baseline where possible.' },
        ],
        checklist: [
          'Know your Period 1 (31 Aug) and Period 2 (28 Feb) deadlines.',
          'Calculate taxable income from posted ledger entries.',
          'Apply add-backs and capital allowances correctly.',
          'Use the 27% CIT rate for companies.',
          'Keep records of provisional tax payments for year-end offset.',
        ],
      },
    ],
  },
  'company': {
    slug: 'company',
    title: 'Company',
    tagline: 'The story of Rigel Business — how we moved from Excel spreadsheets to a full business management platform.',
    icon: Newspaper,
    accent: '#1BA37B',
    heroImage: '/Gemini_Generated_Image_st6xx8st6xx8st6x.png',
    articles: [
      {
        title: 'From Excel to Rigel: why we built a business management platform',
        category: 'Our Story',
        author: 'Rigel Team',
        date: '01 Jun 2026',
        read: '5 min read',
        featured: true,
        image: '/Gemini_Generated_Image_st6xx8st6xx8st6x.png',
        desc: 'Rigel Business started as a set of Excel spreadsheets. Here is why we decided to build a proper software platform instead.',
        content: [
          { heading: 'The problem with spreadsheets', body: 'For years, we managed our business finances using Excel spreadsheets. Sales invoices, supplier bills, VAT calculations, payroll and inventory were all tracked in separate files. It worked at first, but as the business grew, the spreadsheets became harder to maintain. Formulas broke, versions multiplied, and reconciling data took hours every month.' },
          { heading: 'The tipping point', body: 'The moment we realised something had to change was during VAT season. We spent three days manually calculating output VAT, input VAT and preparing the VAT201 return from scattered spreadsheet data. One wrong formula nearly caused a SARS submission error. That was when we decided to build a proper system.' },
          { heading: 'Building Rigel Business', body: 'We started building Rigel Business to solve our own problems first. The goal was simple: replace the spreadsheets with a system that tracks every transaction, calculates VAT automatically, manages payroll, handles inventory and produces SARS-compliant reports — all in one place.' },
          { heading: 'Designed for South Africa', body: 'Because we built this for our own South African business, every feature is designed around local requirements: 15% VAT, SARS VAT201 returns, PAYE/UIF/SDL, provisional tax (IRP6), corporate tax (CIT) and POPIA compliance. No international software adapted for South Africa — this was built here, for here.' },
        ],
        checklist: [
          'Identify which spreadsheet processes take the most time.',
          'List the errors and risks in your current spreadsheet workflow.',
          'Evaluate whether your business has outgrown spreadsheets.',
          'Consider what features you need in a proper business platform.',
          'Try Rigel Business free for 7 days to see the difference.',
        ],
      },
      {
        title: 'What Rigel Business does differently from Excel',
        category: 'Our Story',
        author: 'Rigel Team',
        date: '15 May 2026',
        read: '4 min read',
        featured: false,
        image: '/Gemini_Generated_Image_h5kk1uh5kk1uh5kk.png',
        desc: 'A practical comparison of managing your business in Excel vs using Rigel Business.',
        content: [
          { heading: 'Automatic double-entry accounting', body: 'In Excel, every journal entry must be typed manually. One mistake and your trial balance does not balance. Rigel Business handles double-entry automatically — every invoice, purchase, payment and receipt creates the correct debit and credit behind the scenes.' },
          { heading: 'VAT that tracks itself', body: 'With spreadsheets, VAT is a manual calculation on top of everything else. Rigel Business calculates output VAT on every sale and input VAT on every purchase automatically. When VAT season arrives, the numbers are already there.' },
          { heading: 'Real-time reports', body: 'Excel reports require manual consolidation. Rigel Business generates trial balance, general ledger, income statement and balance sheet in real time from posted transactions. No rebuilding, no formula errors, no version conflicts.' },
          { heading: 'One source of truth', body: 'Spreadsheets live on different computers and get emailed around. Rigel Business keeps everything in one cloud-based system. Your team sees the same data, and every change is tracked with an audit trail.' },
        ],
        checklist: [
          'Compare time spent on manual Excel data entry vs automation.',
          'Review how often spreadsheet formula errors occur.',
          'Check if your VAT calculations are manual or automated.',
          'Evaluate how long it takes to produce financial reports.',
          'Consider whether multiple users need access to the same data.',
        ],
      },
      {
        title: 'The modules we built first — and why',
        category: 'Product Journey',
        author: 'Rigel Team',
        date: '20 Jun 2026',
        read: '4 min read',
        featured: false,
        image: '/PL2ri.jpg',
        desc: 'When moving from Excel to software, we had to decide what to build first. Here is the order we chose and why.',
        content: [
          { heading: 'Sales and invoicing came first', body: 'The biggest pain point in our Excel system was invoicing. Creating invoices, tracking who paid and following up on overdue accounts was entirely manual. We built the sales module first so every invoice, quote and sales order would be tracked automatically with customer balances and ageing.' },
          { heading: 'Then purchases and payables', body: 'Supplier invoices were the next problem. We needed to track what we owed, when bills were due and what VAT we could claim. The purchase module captures supplier invoices, purchase orders and payment status in one place.' },
          { heading: 'Accounting and reporting', body: 'Once sales and purchases were in the system, we needed the general ledger and trial balance to connect everything. This module automatically posts double-entry transactions and produces the financial reports we used to build manually in Excel.' },
          { heading: 'VAT, payroll, inventory and banking', body: 'With the core accounting engine in place, we added VAT management (the original pain point), payroll for employee tax compliance, inventory for stock control and banking for reconciliation. Each module replaced a separate set of spreadsheets.' },
        ],
        checklist: [
          'Identify your biggest spreadsheet pain point first.',
          'Prioritise the module that saves the most time immediately.',
          'Ensure sales and purchases are captured before reporting.',
          'Add VAT management once transactions are flowing.',
          'Build out payroll, inventory and banking as needed.',
        ],
      },
      {
        title: 'Why we are building Rigel Business in the open',
        category: 'Our Story',
        author: 'Rigel Team',
        date: '28 Jun 2026',
        read: '3 min read',
        featured: false,
        image: '/Gemini_Generated_Image_z543rdz543rdz543.png',
        desc: 'We are a new platform built by people who actually run a business. Here is our approach to building and improving Rigel.',
        content: [
          { heading: 'We use Rigel ourselves', body: 'Rigel Business is not built in a vacuum. We use it every day to manage our own accounting, VAT, payroll and inventory. When something does not work well, we feel it first hand. That means every improvement is driven by real use, not assumptions.' },
          { heading: 'Feedback shapes the roadmap', body: 'As a new platform, we are still growing. We listen to every user who tries Rigel Business. Feature requests, bug reports and suggestions all feed into what we build next. If you use Rigel and wish it did something better, tell us.' },
          { heading: 'Honest about what is new', body: 'Rigel Business is a young system. Some features are mature and others are still evolving. We will not pretend everything is perfect. What we can promise is that we are actively building, improving and adding capabilities based on real business needs.' },
          { heading: 'Get in touch', body: 'If you have feedback, a feature request or just want to share your experience moving from Excel to Rigel, reach out through our contact page. We read every message.' },
        ],
        checklist: [
          'Try Rigel Business with your own data during the free trial.',
          'Send feedback through the contact page.',
          'Report any issues or missing features you find.',
          'Share your experience moving from spreadsheets to software.',
          'Book a demo if you want a guided walkthrough.',
        ],
      },
    ],
  },
};

type BlogCategoryPageProps = {
  category: string;
};

export function BlogCategoryPage({ category }: BlogCategoryPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const cat = blogCategories[category];

  if (!cat) return null;

  if (selectedArticle) {
    return (
      <div className="bg-white">
        {/* Article hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={cat.heroImage} alt={cat.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
          <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <button onClick={() => setSelectedArticle(null)} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to {cat.title}
            </button>
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <span className="rounded-full bg-white/10 px-3 py-1 text-emerald-300 border border-white/20">{selectedArticle.category}</span>
              <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {selectedArticle.author}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {selectedArticle.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedArticle.read}</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{selectedArticle.title}</h1>
          </div>
        </section>

        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedArticle.image ? (
              <img src={selectedArticle.image} alt={selectedArticle.title} className="mb-10 h-[28rem] w-full rounded-2xl object-cover shadow-xl" />
            ) : (
              <div className="mb-10 h-80 rounded-2xl bg-slate-900 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-emerald-400/70" />
                <div className="absolute left-8 bottom-8">
                  <FileText className="mb-4 h-10 w-10 text-emerald-400" />
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">{selectedArticle.category}</p>
                </div>
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <p className="text-xl leading-9 text-slate-600 font-medium">{selectedArticle.desc}</p>
            </div>

            <div className="my-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{selectedArticle.category} checklist</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {selectedArticle.checklist.map(item => (
                  <div key={item} className="flex gap-3 rounded-xl bg-white p-4 border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <p className="text-sm font-medium leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              {selectedArticle.content.map(section => (
                <section key={section.heading}>
                  <h2 className="mb-4 text-2xl lg:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{section.heading}</h2>
                  <p className="text-lg leading-9 text-slate-600">{section.body}</p>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-white border border-slate-700">
              <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Professional note</h2>
              <p className="leading-8 text-slate-300">
                Tax and accounting rules can vary depending on your business activity and registration status. Use accounting software to keep records organised, but always confirm complex treatment with a qualified accountant or tax practitioner.
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  const Icon = cat.icon;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={cat.heroImage} alt={cat.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1220]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B1220] to-transparent" />
        </div>
        <div className="absolute inset-x-0 -bottom-1 h-24 sm:h-32 bg-white z-10 pointer-events-none" style={{ clipPath: 'polygon(0 40%, 100% 70%, 100% 100%, 0 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Blog
              </Link>
              <span className="text-slate-400">/</span>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                <Icon className="h-3.5 w-3.5" style={{ color: cat.accent }} />
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: cat.accent }}>{cat.title}</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {cat.title} blog
            </h1>
            <p className="text-lg text-slate-200 leading-8 max-w-lg mb-8">
              {cat.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold text-emerald-600 mb-2 tracking-wide">Latest articles</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{cat.title} articles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.articles.map(article => (
              <article key={article.title} className="card-lift group overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {article.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={article.image} alt={article.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-emerald-400/70" />
                    <div className="absolute left-6 bottom-6 right-6">
                      <div className="mb-4 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-emerald-400" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">{article.category}</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 border border-emerald-100">{article.category}</span>
                    {article.featured && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                  </div>
                  <h3 className="mb-3 text-lg font-bold leading-tight text-slate-900 group-hover:text-emerald-600 transition-colors" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{article.title}</h3>
                  <p className="mb-5 text-sm leading-7 text-slate-600">{article.desc}</p>
                  <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><UserRound className="h-3.5 w-3.5" /> {article.author}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {article.read}</span>
                  </div>
                  <button onClick={() => setSelectedArticle(article)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Read article <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
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
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 tracking-tight" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Explore more on the Rigel Blog</h2>
          <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-7">
            Check out our other blog categories for more insights, guides and company news.
          </p>
          <Link to="/blog" className="btn-pill inline-flex h-12 items-center bg-[#0F9D6C] hover:bg-[#0B7A52] px-8 font-semibold text-white">
            Back to blog <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
