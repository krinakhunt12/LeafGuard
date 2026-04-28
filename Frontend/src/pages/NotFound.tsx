import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-400 mb-8 border border-slate-200">
          <FileQuestion size={40} />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">404</h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Page not found</h2>
        <p className="text-slate-600 mb-10 leading-relaxed max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 transition-all gap-2"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-all gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
