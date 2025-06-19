import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LoginPopup } from './components/Auth/LoginPopup';
import { SignupPopup } from './components/Auth/SignupPopup';
import { SearchPopup } from './components/Search/SearchPopup';
import { Dashboard } from './components/Dashboard/Dashboard';
import { NotificationToasts } from './components/NotificationToasts';

export default function App() {
  const [popup, setPopup] = useState<null | 'login' | 'signup' | 'search'>(null);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ek-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-ek-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ek-bg-main text-ek-text-main">
      <Header onOpenPopup={setPopup} />
      
      <main className="min-h-[calc(100vh-4rem)]">
        <Dashboard />
      </main>
      
      <Footer />

      {/* Popups */}
      <AnimatePresence>
        {popup === 'login' && <LoginPopup onClose={() => setPopup(null)} />}
        {popup === 'signup' && <SignupPopup onClose={() => setPopup(null)} />}
        {popup === 'search' && <SearchPopup onClose={() => setPopup(null)} />}
      </AnimatePresence>

      <NotificationToasts />
    </div>
  );
}