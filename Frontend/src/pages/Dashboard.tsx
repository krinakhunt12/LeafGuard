import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  History,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Activity,
  FileText
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

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FDFDFD]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Farmer <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Welcome back, {user?.full_name}. Monitor your crop's health journey.
            </p>
          </div>
          <button
            onClick={handleGenerateCertificate}
            disabled={isGenerating || history.length === 0}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
          >
            <FileText className="w-5 h-5" />
            {isGenerating ? 'Generating...' : 'Health Certificate'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Activity className="text-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Total Scans</p>
              <p className="text-2xl font-black text-slate-900">{history.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle2 className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Healthy Cases</p>
              <p className="text-2xl font-black text-slate-900">{healthyCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <AlertCircle className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Diseases Detected</p>
              <p className="text-2xl font-black text-slate-900">{diseasedCount}</p>
            </div>
          </div>
        </div>

        {/* History Table/List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="text-slate-900 w-5 h-5" />
              <h2 className="text-lg font-black text-slate-900">Diagnosis History</h2>
            </div>
            <Link to="/analyze" className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
              New Scan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {history.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Diagnosis</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Confidence</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900">{item.disease_name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px] mb-1">
                          <div
                            className="bg-primary h-1.5 rounded-full"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-500">{item.confidence}%</span>
                      </td>
                      <td className="px-6 py-4">
                        {item.is_healthy ? (
                          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                            Healthy
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                            Diseased
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-900 transition-colors">
                          <FileText className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <p className="text-slate-400 font-medium mb-4">No history found. Start your first analysis!</p>
                <Link to="/analyze">
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    Analyze Now
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
