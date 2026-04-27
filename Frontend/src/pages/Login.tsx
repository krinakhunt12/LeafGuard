import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: '' })
      });

      const data = await response.json();

      if (response.ok) {
        const userRes = await fetch('http://127.0.0.1:8000/users/me', {
          headers: { 'Authorization': `Bearer ${data.access_token}` }
        });
        const userData = await userRes.json();

        login(data.access_token, userData);
        toast.success(`Welcome back, ${userData.full_name}!`);
        navigate('/analyze');
      } else {
        toast.error(data.detail || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Connection failed. Please check your backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white selection:bg-primary/20 selection:text-primary">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      
      {/* Floating Sparkles for Luxury Feel */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 text-primary/20 pointer-events-none"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Logo / Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="bg-primary/10 p-2.5 rounded-2xl">
            <Leaf className="text-primary w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-display tracking-tight uppercase">
            LeafGuard
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-slate-100 rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50">
            
            <div className="mb-12">
              <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                Secure <span className="text-primary">Login</span>
              </h1>
              <p className="text-slate-400 font-medium italic">Enter your credentials to access your field intelligence dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Protocol</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 placeholder:text-slate-300 text-slate-700 font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                      placeholder="farmer@leafguard.ai"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3 ml-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
                    <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Reset</a>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 placeholder:text-slate-300 text-slate-700 font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify Identity
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Enterprise Grade Security
              </div>
              <p className="text-slate-400 text-sm font-medium">
                New to the platform?{' '}
                <Link to="/signup" className="text-primary font-black uppercase tracking-widest text-[11px] hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
