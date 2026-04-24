import { motion } from 'framer-motion';
import { Camera, BrainCircuit, ClipboardCheck, Sprout } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-6 h-6" />,
            title: "Leaf Imaging",
            description: "Submit a high-fidelity image of the leaf surface using our secure upload interface.",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
        },
        {
            icon: <BrainCircuit className="w-6 h-6" />,
            title: "Neural Mapping",
            description: "Our proprietary CNN architecture identifies pathological markers across 512+ feature maps.",
            color: "text-primary",
            bg: "bg-green-50",
            border: "border-green-100",
        },
        {
            icon: <ClipboardCheck className="w-6 h-6" />,
            title: "Analysis Report",
            description: "Receive a comprehensive diagnostic summary with high-confidence classification.",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
        },
        {
            icon: <Sprout className="w-6 h-6" />,
            title: "Growth Recovery",
            description: "Implement precision treatment protocols to restore plant health and maximize yield.",
            color: "text-teal-600",
            bg: "bg-teal-50",
            border: "border-teal-100",
        }
    ];

    return (
        <section id="how-it-works" className="section-padding bg-white relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(22,163,74,0.04)_0%,_transparent_60%)]" />

            <div className="container mx-auto px-4 md:px-8 relative">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">Workflow</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Precision <span className="text-gradient">Diagnostics</span>{" "}
                        <br />Simplified
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        A seamless bridge between cutting-edge laboratory pathology and on-field agricultural practice.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group"
                        >
                            <div className={`p-6 rounded-2xl border ${step.border} bg-white hover:border-slate-200 transition-colors duration-200`}>
                                {/* Step number + icon */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-11 h-11 ${step.bg} ${step.color} rounded-xl flex items-center justify-center border ${step.border}`}>
                                        {step.icon}
                                    </div>
                                    <span className="text-2xl font-bold text-slate-100 font-display">0{i + 1}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-display">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Feature banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.18),_transparent_60%)]" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 lg:p-16 items-center">
                        <div className="space-y-8">
                            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight font-display">
                                Engineered for <br />
                                <span className="text-primary">Global Impact</span>
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { t: "Scientific Validation", d: "Validated against 85,000+ certified pathology samples." },
                                    { t: "Privacy First", d: "End-to-end encrypted image processing protocols." },
                                    { t: "Scalable Infrastructure", d: "Low-latency response across all geographical regions." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold text-sm">{item.t}</div>
                                            <div className="text-slate-400 text-sm mt-0.5">{item.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto lg:h-72">
                            <img
                                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200"
                                alt="Modern Farming"
                                className="w-full h-full object-cover grayscale-[30%]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
