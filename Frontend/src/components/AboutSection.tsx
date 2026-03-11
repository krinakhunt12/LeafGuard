import { Cpu, Network, Search, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { motion } from 'framer-motion';

export const AboutSection = () => {
    const steps = [
        {
            icon: <Search className="w-6 h-6" />,
            title: "Image Acquisition",
            desc: "High-resolution images of plant leaves are processed through our optimization pipeline."
        },
        {
            icon: <Network className="w-6 h-6" />,
            title: "Feature Extraction",
            desc: "Our CNN model identifies complex patterns, lesions, and discoloration invisible to the eye."
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Neural Analysis",
            desc: "Deep layer neurons compare features against a database of 50,000+ certified samples."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Diagnosis",
            desc: "The system delivers a precise diagnosis with confidence score and treatment plans."
        }
    ];

    return (
        <section id="about" className="section-padding bg-slate-900 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white/5 relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200"
                                alt="AI Neural Network"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-8 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
                                    <Cpu className="w-16 h-16 text-primary animate-pulse" />
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[120px] -z-10"></div>
                    </motion.div>

                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold font-display">Powered by <span className="text-primary italic">Deep Learning</span></h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                LeafGuard uses a state-of-the-art Convolutional Neural Network (CNN) trained on diverse agricultural datasets from across the globe.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                                        <CardContent className="p-6">
                                            <div className="bg-primary/20 p-3 rounded-xl w-fit mb-4">
                                                <div className="text-primary">{step.icon}</div>
                                            </div>
                                            <h4 className="font-bold text-white mb-2">{step.title}</h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex items-center gap-8">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">50+</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Crop Types</span>
                            </div>
                            <div className="h-10 w-px bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">98.2%</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Precision</span>
                            </div>
                            <div className="h-10 w-px bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">24/7</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Availability</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
