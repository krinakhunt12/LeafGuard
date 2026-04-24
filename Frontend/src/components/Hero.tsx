import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=1600",
        subtitle: "AI Crop Monitoring",
        title: "Detect Crop Diseases Instantly",
        desc: "Identify plant diseases early with AI-powered scanning and protect your harvest."
    },
    {
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1600",
        subtitle: "Smart Farming",
        title: "Increase Yield with Precision",
        desc: "Leverage real-time insights to improve crop health and maximize productivity."
    },
    {
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1600",
        subtitle: "Field Intelligence",
        title: "Empower Modern Agriculture",
        desc: "Make data-driven decisions with intelligent crop analysis and monitoring."
    }
];

export const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex(p => (p + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div key={index} className="absolute inset-0">
                    <motion.img
                        src={slides[index].image}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                    />
                    {/* Refined gradient overlay — not flat black */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Slim progress bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/15 z-20">
                <motion.div
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-primary"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        key={index + "-text"}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl text-white"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1 h-4 bg-primary rounded-full" />
                            <p className="uppercase tracking-[0.2em] text-xs text-primary font-semibold">
                                {slides[index].subtitle}
                            </p>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5 font-display">
                            {slides[index].title}
                        </h1>

                        <p className="text-base md:text-lg text-white/75 mb-9 leading-relaxed font-normal">
                            {slides[index].desc}
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <Link to="/analyze">
                                <Button size="lg">
                                    Start Analysis <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/how-it-works">
                                <Button variant="outline" size="lg">
                                    Learn More <ChevronRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === index ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};
