import { motion } from 'framer-motion';
import React from 'react';
import { Camera, BrainCircuit, ClipboardCheck, Sprout, ArrowDown, CheckCircle, Shield, Zap } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-6 h-6" />,
            title: "Leaf Imaging",
            description: "Submit a high-fidelity image of the leaf surface using our secure upload interface or real-time camera capture.",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            details: ["Macro focus", "Diffuse lighting", "Top surface view"]
        },
        {
            icon: <BrainCircuit className="w-6 h-6" />,
            title: "Neural Mapping",
            description: "Our proprietary CNN architecture identifies pathological markers across 512+ specialized feature maps.",
            color: "text-primary",
            bg: "bg-green-50",
            border: "border-green-100",
            details: ["Pattern recognition", "Lesion segmentation", "Texture analysis"]
        },
        {
            icon: <ClipboardCheck className="w-6 h-6" />,
            title: "Analysis Report",
            description: "Receive a comprehensive diagnostic summary with high-confidence classification and localized treatment plans.",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
            details: ["Confidence score", "Treatment guides", "Prevention tips"]
        },
        {
            icon: <Sprout className="w-6 h-6" />,
            title: "Growth Recovery",
            description: "Implement precision treatment protocols to restore plant health and maximize seasonal crop yield.",
            color: "text-teal-600",
            bg: "bg-teal-50",
            border: "border-teal-100",
            details: ["Yield protection", "Healthy harvest", "Soil recovery"]
        }
    ];

    return (
        <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full"
                    >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">The Scientific Process</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                        Precision <span className="text-gradient">Diagnostics</span>{" "}
                        <br />Built for Farmers
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                        A seamless bridge between cutting-edge laboratory pathology and on-field agricultural practice, delivering results in seconds.
                    </p>
                </div>

                {/* Vertical Process for Desktop, Grid for Mobile */}
                <div className="space-y-32 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block -translate-x-1/2" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Visual Side */}
                            <div className="flex-1 w-full">
                                <div className="relative group">
                                    <div className={`absolute -inset-4 rounded-[2.5rem] ${step.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <div className="relative bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100 p-8 md:p-12 overflow-hidden">
                                        <div className={`absolute top-0 right-0 p-10 font-black text-8xl text-slate-50/50 pointer-events-none select-none tracking-tighter`}>
                                            0{i + 1}
                                        </div>
                                        <div className={`w-16 h-16 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-8 border ${step.border} group-hover:scale-110 transition-transform duration-500`}>
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                            {step.description}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {step.details.map((detail, j) => (
                                                <span key={j} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
                                                    <CheckCircle className={`w-3 h-3 ${step.color}`} />
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separator / Timeline Marker (Desktop) */}
                            <div className="hidden lg:flex w-12 h-12 bg-white border-2 border-slate-100 rounded-full items-center justify-center relative z-10 shrink-0 shadow-sm">
                                <ArrowDown className="w-5 h-5 text-slate-300" />
                            </div>

                            {/* Info Side (Placeholder for visual balance on desktop) */}
                            <div className="flex-1 hidden lg:block">
                                <div className="p-12 border-2 border-dashed border-slate-50 rounded-[3rem] opacity-40">
                                   <div className="w-full h-40 bg-slate-50/50 rounded-2xl flex items-center justify-center">
                                      <Zap className={`w-12 h-12 ${step.color} opacity-20`} />
                                   </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 rounded-[3rem] bg-slate-950 border border-slate-800 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.18),_transparent_60%)]" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 p-10 lg:p-20 items-center">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                                    Global Impact <br />
                                    <span className="text-primary">Reliable Results</span>
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                    Trusted by thousands of farmers across 15+ countries to secure their harvest against unpredictable disease outbreaks.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    { icon: <Shield />, t: "Secure Data", d: "End-to-end encrypted image processing." },
                                    { icon: <Zap />, t: "Instant Scan", d: "Results in under 1 second." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                                            {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                                        </div>
                                        <div>
                                            <div className="text-white font-black text-xs uppercase tracking-widest">{item.t}</div>
                                            <div className="text-slate-500 text-xs mt-1 leading-relaxed">{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-full" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1599933310632-4f9640958700?auto=format&fit=crop&q=80&w=1200"
                                    alt="Precision Farming"
                                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
