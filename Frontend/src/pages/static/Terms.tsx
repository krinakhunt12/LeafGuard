import React from 'react';
import { Gavel, Scale, FileCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { StaticPageLayout } from '../../components/StaticPageLayout';

const Terms: React.FC = () => {
  return (
    <StaticPageLayout 
      title="Terms of" 
      highlight="Service" 
      subtitle="The legal framework governing the use of the LeafGuard agricultural platform."
    >
      <div className="space-y-16">
        <div className="grid md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-primary">
                <FileCheck className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Acceptance of Terms</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              By accessing LeafGuard, you agree to be bound by these Terms of Service and all applicable agricultural regulations. If you disagree with any part of these terms, you may not access our diagnostic services.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-primary">
                <Scale className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">User Responsibilities</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Users are responsible for ensuring the accuracy of uploaded imagery. LeafGuard provides AI-based diagnostics which should be cross-referenced with local agricultural authorities for critical crop decisions.
            </p>
          </section>
        </div>

        <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Gavel className="w-40 h-40" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Diagnostic Accuracy Disclaimer</h2>
            <p className="text-slate-500 leading-relaxed font-medium mb-8">
              While our NeuralLesion™ engine operates with high precision, we provide our diagnostic services on an "as-is" basis. LeafGuard is not liable for crop loss resulting from unpredictable environmental factors or regional variations in disease markers.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-100">
               <AlertTriangle className="w-3 h-3" /> Limitation of Liability
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Intellectual Property</h2>
          <p className="text-slate-500 leading-relaxed font-medium">
            The LeafGuard brand, NeuralLesion™ model architecture, and all localized diagnostic datasets are the exclusive property of LeafGuard. Users retain ownership of their original field imagery but grant LeafGuard a license to use it for model optimization.
          </p>
        </section>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Questions regarding these terms?</p>
           <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
             <HelpCircle className="w-4 h-4" /> Contact Legal Department
           </button>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Terms;
