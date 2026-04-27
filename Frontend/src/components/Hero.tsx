import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=1600",
        subtitle: "AI Crop Monitoring",
        title: "Detect Crop Diseases Instantly",
        desc: "Identify plant diseases early with AI-powered scanning and protect your seasonal harvest with 98.4% accuracy."
    },
    {
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1600",
        subtitle: "Smart Farming",
        title: "Increase Yield with Precision",
        desc: "Leverage real-time neural mapping to improve crop health and maximize your farm's productivity."
    },
    {
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1600",
        subtitle: "Field Intelligence",
        title: "Empower Modern Agriculture",
        desc: "Make data-driven decisions with intelligent crop analysis and professional diagnostic history."
    }
];

export const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex(p => (p + 1) % slides.length), 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-slate-900">

            {/* Background Slides */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={index} 
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <motion.img
                        src={slides[index].image}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                    />
                    {/* Refined gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Slim progress bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-20">
                <motion.div
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-primary"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Left Side: Text */}
                        <motion.div
                            key={index + "-text"}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl text-white"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <p className="uppercase tracking-[0.3em] text-[10px] text-primary font-black">
                                    {slides[index].subtitle}
                                </p>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 font-display tracking-tight">
                                {slides[index].title.split(' ').map((word, i) => (
                                    <span key={i} className={word === 'Instantly' || word === 'Precision' || word === 'Agriculture' ? 'text-primary' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed font-medium">
                                {slides[index].desc}
                            </p>

                            <div className="flex gap-4 flex-wrap">
                                <Link to="/analyze">
                                    <Button size="lg" className="rounded-2xl px-8 bg-primary hover:bg-primary-dark shadow-2xl shadow-primary/40 font-black uppercase tracking-widest text-xs group">
                                        Launch Analysis <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/how-it-works">
                                    <Button variant="outline" size="lg" className="rounded-2xl px-8 border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-xs">
                                        Explore Engine
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-16 flex items-center gap-8 border-t border-white/10 pt-8">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Secure Labs</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50">98% Accuracy</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Floating UI Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                            <div className="relative bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                                            <Activity className="w-6 h-6 animate-pulse" />
                                        </div>
                                        <div className="text-white">
                                            <div className="text-xs font-black uppercase tracking-widest">NeuralLesion™</div>
                                            <div className="text-[10px] text-white/40 font-bold">Active Engine v4.2</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest">Live</div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { l: "Processing Layers", v: "152 Layers", p: "90%" },
                                        { l: "Feature Extraction", v: "Active", p: "65%" },
                                        { l: "Diagnosis Confidence", v: "High", p: "98%" }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-white/50">{item.l}</span>
                                                <span className="text-primary">{item.v}</span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: item.p }}
                                                    transition={{ duration: 2, delay: 1 + (i * 0.2) }}
                                                    className="h-full bg-primary" 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">
                                        Analyzing "Wheat_Rust.jpg"...
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Second floating card */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</div>
                                        <div className="text-sm font-black text-slate-900">Crop Protected</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === index ? "w-12 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
