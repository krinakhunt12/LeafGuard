import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=1800",
    subtitle: "AI-Powered Diagnostics",
    title: "Precision Agriculture for Modern Farmers",
    desc: "Detect plant diseases in seconds using high-fidelity neural networks. Protect your harvest with science-backed insights."
  },
  {
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1800",
    subtitle: "Instant Analysis",
    title: "Protect Your Crops with Confidence",
    desc: "Our model identifies over 38 distinct plant diseases with clinical precision. Simple, fast, and accessible from anywhere."
  }
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-white border-b border-slate-100">
      
      {/* Visual Side (Structured Grid) */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slides[index].image}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </AnimatePresence>
          {/* Professional Overlay (Gradient for Readability) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        </div>
      </div>

      {/* Content Side */}
      <div className="relative z-20 h-full max-w-5xl mx-auto px-4 md:px-6 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            key={index + "-content"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-xs uppercase">
              <span className="w-6 h-[2px] bg-primary" />
              {slides[index].subtitle}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              {slides[index].title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              {slides[index].desc}
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link to="/analyze">
                <Button size="xl" className="px-10 rounded-md">
                  Analyze Leaf <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="text-slate-600 hover:text-primary font-semibold flex items-center gap-2 transition-colors">
                How it works
              </Link>
            </div>

            <div className="pt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                98.2% Detection Accuracy
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                38+ Plant Species
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators (Minimal) */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1 transition-all duration-500 rounded-full ${
              i === index ? "h-12 bg-primary" : "h-4 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

    </section>
  );
};