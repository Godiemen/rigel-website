import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Download } from './pages/Download';
import { Contact } from './pages/Contact';
import { RigelHub } from './pages/RigelHub';
import { BusinessResources } from './pages/BusinessResources';
import { Forum } from './pages/Forum';
import { LegalPage } from './pages/LegalPage';
import { BookDemo } from './pages/BookDemo';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/download" element={<Download />} />
            <Route path="/rigel-hub" element={<RigelHub />} />
            <Route path="/business-resources" element={<BusinessResources />} />
            <Route path="/forum" element={<Forum />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
