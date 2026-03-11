import { motion } from 'framer-motion';
import { Camera, BrainCircuit, ClipboardCheck, Sprout, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-8 h-8" />,
            title: "Capture Image",
            description: "Take a clear, well-lit photo of the affected plant leaf using your smartphone or camera.",
            color: "bg-blue-500",
        },
        {
            icon: <BrainCircuit className="w-8 h-8" />,
            title: "AI Processing",
            description: "Our advanced Convolutional Neural Network analyzes pixels to identify disease markers.",
            color: "bg-primary",
        },
        {
            icon: <ClipboardCheck className="w-8 h-8" />,
            title: "Get Diagnosis",
            description: "Receive an instant report with the disease name, confidence score, and severity level.",
            color: "bg-orange-500",
        },
        {
            icon: <Sprout className="w-8 h-8" />,
            title: "Apply Treatment",
            description: "Follow the expert-recommended treatment plan to save your crop and prevent spread.",
            color: "bg-green-600",
        }
    ];

    return (
        <section id="how-it-works" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                        Simple Steps to <span className="text-gradient">Protect</span> Your Crops
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        Leveraging satellite-grade AI technology simplified for every farmer and gardener.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 ${step.color} rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900 font-black text-sm border-4 border-slate-50">
                                    {i + 1}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium px-4">
                                {step.description}
                            </p>

                            {i < steps.length - 1 && (
                                <div className="hidden lg:flex absolute -right-4 top-10 text-slate-200">
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Additional Content Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-slate-900 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                Why Trust Our <br /><span className="text-primary italic">Deep Learning</span> Engine?
                            </h3>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Our models are trained on over <span className="text-white font-bold">85,000+ certified images</span> of plant diseases.
                                We collaborate with plant pathologists to ensure that every diagnosis is backed by agricultural science.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "99.2% Accuracy on 38 distinct plant diseases",
                                    "Processed in local data centers for maximum speed",
                                    "Encrypted data handling to protect your farm data"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white font-bold">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                                            <ClipboardCheck className="w-3.5 h-3.5" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-video rounded-3xl overflow-hidden border-8 border-white/5">
                            <img
                                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200"
                                alt="Modern Farming"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
