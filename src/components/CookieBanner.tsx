import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CONSENT_KEY = 'rigel_cookie_consent';

type Consent = 'accepted' | 'rejected' | null;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent;
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg animate-[slideUp_0.3s_ease-out]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Your choice regarding cookies on this site
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Some of these cookies are essential, while others help us to improve our services
              and your experience by providing insights into how the site is being used.
              <a
                href="/cookie-policy"
                className="ml-1 text-[#1BA37B] font-semibold hover:underline"
              >
                Read cookie policy
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleAccept}
              className="h-10 px-5 rounded-lg bg-[#1BA37B] hover:bg-[#158a66] text-white font-semibold text-sm transition-colors"
            >
              Accept all
            </button>
            <button
              onClick={handleReject}
              className="h-10 px-5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors"
            >
              Reject optional
            </button>
            <button
              onClick={handleClose}
              className="lg:ml-1 p-2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
