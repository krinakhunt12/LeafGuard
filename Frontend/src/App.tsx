import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { HeroSkeleton } from './components/PageSkeleton';

// Lazy load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AnalyzePage = lazy(() => import('./pages/AnalyzePage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />

        <main className="max-w-[2000px] mx-auto">

          <Suspense fallback={<HeroSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
