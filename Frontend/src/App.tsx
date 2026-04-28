import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Toaster } from 'react-hot-toast';
import { HeroSkeleton } from './components/PageSkeleton';
import { AuthProvider } from './context/AuthContext';
import { ErrorFallback } from './components/ErrorFallback';

// Lazy load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Analyze = lazy(() => import('./pages/Analyze'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Technology = lazy(() => import('./pages/Technology'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Forum = lazy(() => import('./pages/Forum'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Static Pages
const ApiDocsPage = lazy(() => import('./pages/static/ApiDocs'));
const PrivacyPage = lazy(() => import('./pages/static/Privacy'));
const TermsPage = lazy(() => import('./pages/static/Terms'));
const BlogPage = lazy(() => import('./pages/static/Blog'));

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
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            <Navbar />

            <main className="max-w-[2000px] mx-auto">
              <Suspense fallback={<HeroSkeleton />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/analyze" element={<Analyze />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/api-docs" element={<ApiDocsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
            <Chatbot />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
