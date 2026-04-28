import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Analyze = lazy(() => import('./pages/Analyze'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Technology = lazy(() => import('./pages/Technology'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Forum = lazy(() => import('./pages/Forum'));
const InsurancePortal = lazy(() => import('./pages/InsurancePortal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Static Pages
const ApiDocsPage = lazy(() => import('./pages/static/ApiDocs'));
const PrivacyPage = lazy(() => import('./pages/static/Privacy'));
const TermsPage = lazy(() => import('./pages/static/Terms'));
const BlogPage = lazy(() => import('./pages/static/Blog'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'analyze',
        element: <Analyze />,
      },
      {
        path: 'how-it-works',
        element: <HowItWorks />,
      },
      {
        path: 'technology',
        element: <Technology />,
      },
      {
        path: 'api-docs',
        element: <ApiDocsPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'forum',
        element: <Forum />,
      },
      {
        path: 'insurance-portal',
        element: <InsurancePortal />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
