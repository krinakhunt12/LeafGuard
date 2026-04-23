import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <motion.img
                        src={slides[index].image}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
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
                <div className="container mx-auto px-6 lg:px-12">

                    <motion.div
                        key={index + "-text"}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-white"
                    >
                        <p className="uppercase tracking-widest text-sm text-primary mb-4">
                            {slides[index].subtitle}
                        </p>

                        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                            {slides[index].title}
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 mb-8">
                            {slides[index].desc}
                        </p>

                        <div className="flex gap-6 flex-wrap mt-4">
                            <Link to="/analyze">
                                <Button size="lg" className="rounded-2xl">
                                    Start Analysis <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>

                            <Link to="/how-it-works">
                                <Button variant="outline" size="lg" className="rounded-2xl">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === index ? "w-10 bg-primary" : "w-3 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};