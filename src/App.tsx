import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ActivitiesPage } from './components/pages/ActivitiesPage';
import { ShopPage } from './components/pages/ShopPage';
import { MediaPage } from './components/pages/MediaPage';
import { ContactPage } from './components/pages/ContactPage';
import { SponsorPage } from './components/pages/SponsorPage';

export type PageType = 'home' | 'about' | 'activities' | 'shop' | 'media' | 'contact' | 'sponsor';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'shop':
        return <ShopPage />;
      case 'media':
        return <MediaPage />;
      case 'contact':
        return <ContactPage />;
      case 'sponsor':
        return <SponsorPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
