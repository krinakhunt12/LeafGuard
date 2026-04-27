import React from 'react';
import { motion } from 'framer-motion';

interface StaticPageLayoutProps {
  title: string;
  highlight?: string;
  subtitle: string;
  children: React.ReactNode;
}

export const StaticPageLayout: React.FC<StaticPageLayoutProps> = ({ title, highlight, subtitle, children }) => (
    <div className="pt-32 pb-40 min-h-screen bg-[#FDFDFD] overflow-hidden relative selection:bg-primary/20 selection:text-primary">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
                      Corporate Transparency
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                        {title} {highlight && <span className="text-primary">{highlight}</span>}
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed italic">
                        {subtitle}
                    </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    </div>
);
