import { Cpu, Network, Search, Zap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

export const AboutSection = () => {
    const steps = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Data Acquisition",
            desc: "Hyper-spectral imagery is processed through our proprietary optimization pipeline."
        },
        {
            icon: <Network className="w-6 h-6" />,
            title: "Feature Synthesis",
            desc: "Advanced convolutional layers extract morphological markers invisible to human sight."
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Neural Verification",
            desc: "Cross-referenced against 50,000+ validated pathology samples in real-time."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Actionable Insights",
            desc: "Instant diagnostic reports with precision treatment protocols for immediate recovery."
        }
    ];

    return (
        <section id="about" className="section-padding bg-slate-950 text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-0"></div>
            
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 relative z-10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
                                alt="AI Neural Network"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent"></div>
                            
                            {/* Inner Floating Element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="p-10 bg-slate-950/60 backdrop-blur-3xl rounded-full border border-white/10 animate-pulse-slow shadow-2xl">
                                    <Cpu className="w-20 h-20 text-primary" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Status Tags */}
                        <div className="absolute -bottom-6 -right-6 glass-dark p-6 rounded-3xl border border-white/10 shadow-premium animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Status</div>
                                    <div className="font-bold text-white">Production Ready</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-black text-xs uppercase tracking-[0.2em] border border-primary/20">
                                The Science Behind LeafGuard
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black font-display leading-tight">
                                Intelligence <br />
                                <span className="text-gradient italic">for the Earth</span>
                            </h2>
                            <p className="text-slate-400 text-xl leading-relaxed font-medium">
                                We've engineered a bespoke neural architecture specifically optimized for agricultural pathology, delivering clinical-grade precision in the field.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {steps.map((step, i) => (
                                <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 group">
                                    <CardContent className="p-8">
                                        <div className="bg-primary/20 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                            <div className="text-primary">{step.icon}</div>
                                        </div>
                                        <h4 className="font-bold text-xl text-white mb-3">{step.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="pt-8 flex flex-wrap items-center gap-12">
                            {[
                                { val: "50+", label: "Crops" },
                                { val: "98.2%", label: "Accuracy" },
                                { val: "24/7", label: "Runtime" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-4xl font-black text-white">{stat.val}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

