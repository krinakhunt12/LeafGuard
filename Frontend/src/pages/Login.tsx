import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { API_BASE_URL } from '../api';

const Login: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName: '' }),
      });
      const data = await response.json();
      if (response.ok) {
        const userRes  = await fetch(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
        const userData = await userRes.json();
        login(data.access_token, userData);
        toast.success(`Welcome back, ${userData.fullName}!`);
        navigate('/analyze');
      } else {
        toast.error(data.detail || 'Invalid credentials');
      }
    } catch {
      toast.error('Connection failed. Please check your backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y:  0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 animate-pulse-ring">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to continue protecting your crops</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-primary hover:text-primary-dark transition-colors font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Create one for free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
