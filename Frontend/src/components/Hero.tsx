import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Leaf } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-b from-primary/5 via-white to-white">
            {/* Background shapes - scaled for bigger screens */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-primary/5 rounded-full blur-[120px] opacity-60 z-0"></div>
            <div className="absolute bottom-10 left-10 w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] bg-primary-light/10 rounded-full blur-[100px] opacity-40 z-0 animate-pulse"></div>

            <div className="container mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6 md:space-y-10 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary-dark font-black text-[10px] md:text-xs uppercase tracking-[0.2em] border border-primary/20 mx-auto lg:mx-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Revolutionary Neural Diagnostics
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black leading-[1.05] font-display text-slate-900 tracking-tight">
                            Smart <span className="text-gradient">Agriculture</span> Refined by AI
                        </h1>

                        <p className="text-base md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Protect your crop investment with LeafGuard's high-precision modeling.
                            Detect 38+ diseases instantly with scientific-grade accuracy.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                            <Link to="/analyze" className="w-full sm:w-auto">
                                <Button size="xl" className="w-full gap-3 text-lg px-10 py-7 shadow-2xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                                    Start Analysis <ArrowRight className="w-6 h-6" />
                                </Button>
                            </Link>
                            <Link to="/how-it-works" className="w-full sm:w-auto">
                                <Button variant="ghost" size="xl" className="w-full text-lg px-10 py-7 hover:bg-slate-100/50">
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 pt-12 border-t border-slate-100 max-w-2xl mx-auto lg:mx-0">
                            {[
                                { icon: <Zap className="w-5 h-5" />, val: "1.2s", label: "Latency" },
                                { icon: <ShieldCheck className="w-5 h-5" />, val: "99.2%", label: "Precision" },
                                { icon: <BarChart3 className="w-5 h-5" />, val: "38+", label: "Diseases" },
                            ].map((stat, i) => (
                                <div key={i} className={`space-y-1 ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                                    <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-black">
                                        {stat.icon}
                                        <span className="text-xl md:text-2xl">{stat.val}</span>
                                    </div>
                                    <p className="text-[10px] items-center justify-center lg:justify-start font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-[650px] mx-auto lg:ml-auto"
                    >
                        <div className="relative z-10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-[8px] md:border-[16px] border-white ring-1 ring-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1530836361253-efad5cb2f6de?auto=format&fit=crop&q=80&w=1200"
                                alt="AI scanning plant leaf"
                                className="w-full h-auto aspect-[4/3] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Floating UI element - Hidden on Small Mobile, Refined for Others */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 glass p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 border-white/50"
                            >
                                <div className="bg-primary/20 p-2 md:p-4 rounded-xl md:rounded-3xl">
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Leaf className="text-white w-4 h-4 md:w-6 md:h-6" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-0.5 md:mb-1">Analysis Active</div>
                                    <div className="font-bold text-base md:text-xl text-slate-900 leading-tight truncate">Healthy Tomato Plant</div>
                                </div>
                                <div className="bg-primary/10 text-primary border border-primary/20 px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-2xl font-black text-xs md:text-base">
                                    99.4%
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative background elements */}
                        <div className="absolute -top-12 -right-12 w-48 md:w-80 h-48 md:h-80 bg-primary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse -z-10"></div>
                        <div className="absolute -bottom-12 -left-12 w-60 md:w-96 h-60 md:h-96 bg-primary-light/10 rounded-full blur-[100px] md:blur-[140px] -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>

    );
};
