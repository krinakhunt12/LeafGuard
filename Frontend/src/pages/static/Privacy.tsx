import React from 'react';
import { Lock, Database, Share2 } from 'lucide-react';
import { StaticPageLayout } from '../../components/StaticPageLayout';

const Privacy: React.FC = () => {
  return (
    <StaticPageLayout 
      title="Privacy" 
      highlight="Policy" 
      subtitle="How we protect your agricultural intelligence and field data."
    >
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-3 space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
                <Database className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Data Collection</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">
              We collect high-fidelity leaf imagery and geographical markers purely to provide precision diagnostic services. Our NeuralLesion™ engine processes this data locally where possible, or via encrypted cloud pipelines.
            </p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <ul className="space-y-4">
                {[
                  "Spectral data from uploaded imagery",
                  "Device-level diagnostic logs",
                  "Geographical coordinates for regional outbreak mapping",
                  "User-provided field observations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Security Protocols</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">
              Your data is secured using AES-256 encryption at rest and TLS 1.3 for all data in transit. We conduct bi-annual security audits to ensure your harvest data remains your own.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100">
                <Share2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Zero-Third-Party Sharing</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">
              LeafGuard does not sell or lease agricultural intelligence to third-party marketing firms. Data is only shared with verified expert agronomists when explicitly requested by the user through the Community Forum.
            </p>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Last Updated</h3>
              <p className="text-2xl font-black">Oct 2023</p>
              <div className="h-px bg-white/10 my-6" />
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Version 2.4.0 <br />
                Privacy Governance Framework
              </p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">Request Data</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
              You have the right to request a full export of your field data at any time.
            </p>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
              Contact Compliance
            </button>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Privacy;
