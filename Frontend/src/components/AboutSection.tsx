import { Cpu, Network, Search, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { motion } from 'framer-motion';

export const AboutSection = () => {
    const features = [
        {
            icon: <Search className="w-5 h-5 text-primary" />,
            title: "Pathology Detection",
            desc: "Automated identification of plant diseases through high-resolution image analysis."
        },
        {
            icon: <Network className="w-5 h-5 text-primary" />,
            title: "Neural Architectures",
            desc: "Bespoke CNN models trained on 85,000+ certified agricultural pathology samples."
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-primary" />,
            title: "Data Reliability",
            desc: "Rigorous verification protocols ensure diagnostic accuracy across various lighting and environments."
        },
        {
            icon: <Zap className="w-5 h-5 text-primary" />,
            title: "Real-time Response",
            desc: "Optimized inference engines deliver results in under 1.2 seconds for on-field utility."
        }
    ];

    return (
        <section id="about" className="py-16 md:py-24 px-4 bg-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em]">The Technology</h2>
                            <h3 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                                Bridging the gap between pathology and productivity.
                            </h3>
                            <p className="text-lg text-slate-600 max-w-xl">
                                LeafGuard leverages deep learning to provide farmers with clinical-grade diagnostic tools directly in their hands.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {features.map((feature, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="w-10 h-10 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-bold text-slate-900">{feature.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                            <img
                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
                                alt="Agricultural Technology"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay for depth */}
                            <div className="absolute inset-0 bg-slate-900/5" />
                        </div>
                        
                        {/* Status Label (Minimal) */}
                        <div className="absolute -bottom-6 -left-6 bg-white border border-slate-200 p-6 rounded-lg shadow-sm max-w-[200px]">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
                            </div>
                            <div className="text-sm font-bold text-slate-900">Optimized for Field Deployment</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};