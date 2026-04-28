import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Account created! Please log in.');
        navigate('/login');
      } else {
        toast.error(data.detail || 'Registration failed');
      }
    } catch {
      toast.error('Connection failed. Please check your backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (
    id: keyof typeof formData,
    label: string,
    icon: React.ReactNode,
    type: string,
    placeholder: string,
    delay: string
  ) => (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: parseFloat(delay), ease: [0.16, 1, 0.3, 1] }}
      className="space-y-1.5"
    >
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</span>
        <input
          type={type}
          value={formData[id]}
          onChange={e => setFormData({ ...formData, [id]: e.target.value })}
          placeholder={placeholder}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200"
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-emerald-200/25 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y:  0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 animate-pulse-ring">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Join LeafGuard</h1>
            <p className="text-slate-500 text-sm mt-1">Start monitoring your plants today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {field('full_name', 'Full name', <User className="w-4 h-4" />, 'text', 'John Doe', '0.05')}
            {field('email', 'Email address', <Mail className="w-4 h-4" />, 'email', 'name@example.com', '0.1')}
            {field('password', 'Password', <Lock className="w-4 h-4" />, 'password', 'Min. 8 characters', '0.15')}

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
              Your data is secured with end-to-end encryption.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark active:scale-[0.98] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
