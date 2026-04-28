import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';
import { Toaster } from 'react-hot-toast';
import { HeroSkeleton } from './PageSkeleton';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      
      <main className="max-w-[2000px] mx-auto">
        <Suspense fallback={<HeroSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};
