import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Download } from './pages/Download';
import { Contact } from './pages/Contact';
import { RigelHub } from './pages/RigelHub';
import { Blog } from './pages/Blog';
import { BlogCategoryPage } from './pages/BlogCategoryPage';
import { LegalPage } from './pages/LegalPage';
import { BookDemo } from './pages/BookDemo';
import { Services } from './pages/Services';
import { Payroll } from './pages/Payroll';
import { Sales } from './pages/Sales';
import { Purchase } from './pages/Purchase';
import { Inventory } from './pages/Inventory';
import { Tax } from './pages/Tax';
import { Reporting } from './pages/Reporting';
import { Investments } from './pages/Investments';
import { Banking } from './pages/Banking';
import { Loans } from './pages/Loans';
import { AssetsManagement } from './pages/AssetsManagement';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/tax" element={<Tax />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/assets" element={<AssetsManagement />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/download" element={<Download />} />
            <Route path="/rigel-hub" element={<RigelHub />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/small-business" element={<BlogCategoryPage category="small-business" />} />
            <Route path="/blog/guide" element={<BlogCategoryPage category="guide" />} />
            <Route path="/blog/company" element={<BlogCategoryPage category="company" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
            <Route path="/terms-of-service" element={<LegalPage page="terms" />} />
            <Route path="/cookie-policy" element={<LegalPage page="cookies" />} />
            <Route path="/refund-policy" element={<LegalPage page="refunds" />} />
            <Route path="/popia-notice" element={<LegalPage page="popia" />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
