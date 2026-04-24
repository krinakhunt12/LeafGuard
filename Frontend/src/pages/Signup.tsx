import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully! Please log in.');
        navigate('/login');
      } else {
        toast.error(data.detail || 'Registration failed');
      }
    } catch (error) {
      toast.error('Connection failed. Please check your backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-zinc-500 rounded-3xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Join LeafGuard
            </h1>
            <p className="text-zinc-400">Start monitoring your plants today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full border border-zinc-800 bg-white rounded-xl py-3 pl-10 pr-4 placeholder:text-zinc-400 text-zinc-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-zinc-800 bg-white rounded-xl py-3 pl-10 pr-4 placeholder:text-zinc-400 text-zinc-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border border-zinc-800 bg-white rounded-xl py-3 pl-10 pr-4 placeholder:text-zinc-400 text-zinc-500 transition-all"
                  placeholder="Min. 8 characters"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 py-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Your data is secured with end-to-end encryption.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white hover:bg-primary-dark font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:text-primary-dark">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
