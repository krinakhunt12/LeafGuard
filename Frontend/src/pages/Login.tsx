import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
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
        body: JSON.stringify({ email, password, full_name: '' }) // full_name ignored by login but required by schema for now
      });

      const data = await response.json();

      if (response.ok) {
        // Fetch user data after successful login
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">

      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-zinc-500 rounded-3xl p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-400">Sign in to continue protecting your crops</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
              <div className="relative bg-white">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-800 bg-white rounded-xl py-3 pl-10 pr-4 placeholder:text-zinc-400 text-zinc-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-300">Password</label>
                <a href="#" className="text-primary text-sm hover:text-primary-dark">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-zinc-800 bg-white rounded-xl py-3 pl-10 pr-4 placeholder:text-zinc-400 text-zinc-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white hover:bg-primary font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:text-primary-dark">
                Create one for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
