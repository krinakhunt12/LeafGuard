import { motion } from 'framer-motion';
import { Leaf, Cpu, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const stats = [
    { value: '97.4%', label: 'Detection Accuracy' },
    { value: '38+',   label: 'Disease Classes' },
    { value: '85K+',  label: 'Training Samples' },
    { value: '<2s',   label: 'Inference Time' },
];

const features = [
    { icon: <Leaf className="w-5 h-5" />, title: 'Plant Pathology AI',  desc: 'Trained on real-world samples from labs across 15 climatic zones.' },
    { icon: <Cpu  className="w-5 h-5" />, title: 'ResNet-50 Backbone',  desc: 'Custom attention layers pinpoint lesions with sub-pixel precision.' },
    { icon: <Globe className="w-5 h-5"/>, title: 'Edge-Optimized',      desc: 'Quantized weights deliver fast inference even on slow connections.' },
];

export const AboutSection = () => (
    <section className="section-padding bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left — image with stats overlay */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl overflow-hidden border border-slate-100 aspect-[4/3] hover-lift"
                >
                    <img
                        src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1200"
                        alt="Agricultural technology"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

                    {/* Stats row */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/92 backdrop-blur-sm border-t border-white/50">
                        <div className="grid grid-cols-4 divide-x divide-slate-200">
                            {stats.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="text-center px-3"
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.07 }}
                                >
                                    <div className="text-lg font-bold text-slate-900 font-display leading-tight">{s.value}</div>
                                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right — content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">About LeafGuard</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight font-display">
                            Science-backed<br />
                            <span className="text-gradient">Plant Intelligence</span>
                        </h2>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            LeafGuard combines convolutional neural networks with real-world agronomic expertise to deliver
                            actionable disease diagnostics — helping farmers detect problems early and protect their harvest.
                        </p>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                                className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-primary/20 hover:bg-primary/[0.03] transition-colors duration-200 group cursor-default"
                            >
                                <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-200">
                                    {f.icon}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 mb-0.5">{f.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/analyze">
                        <Button size="md" className="gap-2 mt-1">
                            Try It Now <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);
