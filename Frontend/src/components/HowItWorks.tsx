import { motion } from 'framer-motion';
import { Camera, BrainCircuit, ClipboardCheck, Sprout } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-8 h-8" />,
            title: "Leaf Imaging",
            description: "Submit a high-fidelity image of the leaf surface using our secure upload interface.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            icon: <BrainCircuit className="w-8 h-8" />,
            title: "Neural Mapping",
            description: "Our proprietary CNN architecture identifies pathological markers across 512+ feature maps.",
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            icon: <ClipboardCheck className="w-8 h-8" />,
            title: "Analysis Report",
            description: "Receive a comprehensive diagnostic summary with high-confidence classification.",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            icon: <Sprout className="w-8 h-8" />,
            title: "Growth Recovery",
            description: "Implement precision treatment protocols to restore plant health and maximize yield.",
            color: "text-green-600",
            bg: "bg-green-600/10",
        }
    ];

    return (
        <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">
                        Workflow Protocol
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter">
                        Precision <span className="text-gradient">Diagnostics</span> <br /> Simplified
                    </h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        A seamless bridge between cutting-edge laboratory pathology and on-field agricultural practice.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
                    {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col group">
                            <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm`}>
                                {step.icon}
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
                                    0{i + 1}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 mb-4 font-display">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-10 lg:p-24 rounded-[4rem] bg-slate-950 relative overflow-hidden group shadow-premium"
                >
                    <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h3 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                                Engineered for <br />
                                <span className="text-primary italic">Global Impact</span>
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { t: "Scientific Validation", d: "Validated against 85,000+ certified pathology samples." },
                                    { t: "Privacy First", d: "End-to-end encrypted image processing protocols." },
                                    { t: "Scalable Infrastructure", d: "Low-latency response across all geographical regions." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">{item.t}</div>
                                            <div className="text-slate-400 font-medium text-sm mt-1">{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200"
                                alt="Modern Farming"
                                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

