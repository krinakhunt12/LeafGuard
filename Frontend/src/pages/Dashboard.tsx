import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  History,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Activity,
  FileText,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResultSkeleton } from '../components/PageSkeleton';
import { generateHealthCertificate } from '../lib/generateHealthCertificate';
import toast from 'react-hot-toast';

interface Diagnosis {
  id: number;
  disease_name: string;
  confidence: number;
  description: string;
  treatments: string[];
  is_healthy: boolean;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [history, setHistory] = useState<Diagnosis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCertificate = async () => {
    if (history.length === 0) {
      toast.error('No diagnosis history available to generate a certificate.');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('Preparing health certificate...');
    try {
      await generateHealthCertificate(history, user);
      toast.success('Certificate generated successfully!', { id: toastId });
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      toast.error('Failed to generate certificate. Please try again.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://127.0.0.1:8000/diagnoses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-4">
        <ResultSkeleton />
      </div>
    );
  }

  const healthyCount = history.filter(d => d.is_healthy).length;
  const diseasedCount = history.length - healthyCount;
  const healthIndex = history.length > 0 ? Math.round((healthyCount / history.length) * 100) : 0;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FDFDFD]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Portal</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-900">Farmer Dashboard</span>
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                 <TrendingUp className="w-6 h-6" />
               </div>
               <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-none">
                 Field <span className="text-primary">Insights</span>
               </h1>
            </div>
            <p className="text-slate-500 font-medium italic">
              Monitoring health metrics for <span className="text-slate-900 font-bold">Farmer {user?.full_name}</span>.
            </p>
          </div>
          
          <div className="flex gap-3">
             <button
              onClick={handleGenerateCertificate}
              disabled={isGenerating || history.length === 0}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-200 group"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              )}
              Export Health Certificate
            </button>
            <Link to="/analyze">
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/20 transition-all group">
                <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                New Scan
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Activity />, label: "Total Analysis", value: history.length, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
            { icon: <CheckCircle2 />, label: "Healthy Crops", value: healthyCount, color: "bg-green-50 text-green-600", border: "border-green-100" },
            { icon: <AlertCircle />, label: "Diseased Found", value: diseasedCount, color: "bg-red-50 text-red-600", border: "border-red-100" },
            { icon: <TrendingUp />, label: "Health Index", value: `${healthIndex}%`, color: "bg-primary/5 text-primary", border: "border-primary/10" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white p-6 rounded-[2rem] border ${stat.border} shadow-sm flex flex-col justify-between h-40 hover:shadow-md transition-shadow`}
            >
              <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center border ${stat.border}`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Section: History & Trends */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* History List (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-900" />
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h2>
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.05) }}
                    className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.is_healthy ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {item.is_healthy ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 leading-tight mb-1">{item.disease_name}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.created_at).toLocaleDateString()}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full" />
                          <span className="text-primary">{item.confidence}% Confidence</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="hidden md:block w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.confidence}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full ${item.is_healthy ? 'bg-green-500' : 'bg-red-500'}`} 
                        />
                      </div>
                      <button className="p-2.5 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-slate-100">
                  <p className="text-slate-400 font-bold mb-4">No diagnosis history found.</p>
                  <Link to="/analyze">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl transition-all">
                      Start First Analysis
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions / Tips (Right) */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-black mb-4 relative z-10">Field Tip 🌿</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10 italic">
                "Maintaining consistent soil moisture levels can reduce the risk of Early Blight in Tomato crops during the fruiting phase."
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2">
                Read Agronomy Blog <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">Ecosystem Quick Links</h3>
              <div className="space-y-4">
                {[
                  { to: "/forum", label: "Ask the Expert", desc: "Consult verified agronomists" },
                  { to: "/technology", label: "How we Analyze", desc: "Learn about NeuralLesion™" },
                  { to: "/how-it-works", label: "Guidebook", desc: "Maximizing crop yield" }
                ].map((link, i) => (
                  <Link key={i} to={link.to} className="block group">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-50 group-hover:border-primary/20 group-hover:bg-white transition-all">
                      <div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{link.label}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{link.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper icon
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
  </svg>
);

export default Dashboard;
