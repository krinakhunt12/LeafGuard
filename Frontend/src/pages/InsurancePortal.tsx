import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, Calendar, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVerifyCertificate } from '../api';

const InsurancePortal: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: result, isLoading: loading, error } = useVerifyCertificate(activeId);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) setActiveId(searchId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-semibold text-xs uppercase tracking-wider">Insurance Verification Portal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
              Secure <span className="text-blue-600">Verification</span> Service
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Verify AI-generated Health Certificates and historical crop data to qualify for agricultural insurance premiums.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
            <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter Certificate ID (e.g. LG-000001)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !searchId}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                Verify Certificate
              </button>
            </form>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {(error as any).message}
              </motion.div>
            )}
          </div>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                {/* Result Header */}
                <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Verification Status</div>
                      <div className="text-xl font-bold text-emerald-900 tracking-tight">{result.status}</div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-emerald-600/70 font-medium">Verified On</div>
                    <div className="text-sm font-semibold text-emerald-800">
                      {new Date(result.verificationTimestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Result Body */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium uppercase mb-0.5">Certificate ID</div>
                          <div className="text-base font-bold text-slate-900">{result.certificateId}</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium uppercase mb-0.5">Issued To</div>
                          <div className="text-base font-bold text-slate-900">{result.issuedTo}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium uppercase mb-0.5">Issue Date</div>
                          <div className="text-base font-bold text-slate-900">
                            {new Date(result.issueDate).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium uppercase mb-0.5">Health Status</div>
                          <div className={`text-base font-bold ${result.data.isHealthy ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {result.data.isHealthy ? 'Healthy / No Pathogens' : `Infected: ${result.data.diseaseName}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Diagnosis Metadata</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">AI Confidence</div>
                        <div className="text-lg font-bold text-slate-900">{result.data.confidence}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Actionable Tips</div>
                        <div className="text-lg font-bold text-slate-900">{result.data.treatmentsRecommended} Items</div>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <div className="text-xs text-slate-500 mb-1">Security Seal</div>
                        <div className="text-sm font-bold text-blue-600">LG-VERIFIED-HASH</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center italic mt-6">
                    {result.providerNote}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Information Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Verified Data</h3>
              <p className="text-sm text-slate-500">Every certificate is backed by multi-layer AI verification and time-stamped history.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Seamless Claims</h3>
              <p className="text-sm text-slate-500">Fast-track insurance claims by providing verifiable digital proof of crop care.</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Lower Premiums</h3>
              <p className="text-sm text-slate-500">Diligent farmers who maintain high health scores qualify for premium discounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePortal;
