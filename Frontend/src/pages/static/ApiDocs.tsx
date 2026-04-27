import React from 'react';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { StaticPageLayout } from '../../components/StaticPageLayout';

const ApiDocs: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `curl -X POST "http://api.leafguard.ai/predict" \\
     -H "Authorization: Bearer YOUR_TOKEN" \\
     -F "file=@leaf_sample.jpg"`;

  return (
    <StaticPageLayout 
      title="Developer" 
      highlight="API" 
      subtitle="Integrate our NeuralLesion™ engine directly into your agricultural software stack."
    >
      <div className="space-y-16">
        {/* Overview Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Terminal />, t: "RESTful Interface", d: "Standard JSON over HTTP for maximum compatibility." },
            { icon: <Cpu />, t: "Edge Ready", d: "Optimized for low-bandwidth field devices." },
            { icon: <ShieldCheck />, t: "Secure Access", d: "OAuth2 and JWT based authentication." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-primary/20 transition-all">
              <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{item.t}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.d}</p>
            </div>
          ))}
        </div>

        {/* Documentation Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-3">
             <div className="w-8 h-px bg-primary/30" />
             <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Endpoint Reference</h2>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">Post</span>
                <code className="text-white/70 text-xs font-mono">/predict</code>
              </div>
              <button 
                onClick={() => handleCopy(codeExample)}
                className="text-white/40 hover:text-white transition-colors p-2"
              >
                {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-10 font-mono text-sm leading-relaxed overflow-x-auto text-primary/80">
              <pre>{codeExample}</pre>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Core Headers
              </h3>
              <div className="space-y-4">
                {[
                  { k: "Authorization", v: "Bearer <token>", d: "JWT authentication token" },
                  { k: "Content-Type", v: "multipart/form-data", d: "Required for image transmission" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <div className="text-xs font-black text-slate-900">{item.k}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.v}</div>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium italic">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10">
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">Interactive Docs</h3>
               <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                 Explore our full OpenAPI schema and test endpoints in real-time using our Swagger UI instance.
               </p>
               <a 
                 href="http://127.0.0.1:8000/docs" 
                 target="_blank" 
                 className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-colors"
               >
                 Go to Swagger Interface <ExternalLink className="w-3 h-3" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default ApiDocs;
