import { ShieldCheck, AlertTriangle, Thermometer, Droplets, Download, Network, Share2, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { generatePdf } from '../lib/generatePdf';
import toast from 'react-hot-toast';

interface ResultData {
    diseaseName: string;
    confidence: number;
    description: string;
    treatments: string[];
    isHealthy: boolean;
}

interface ResultSectionProps {
    result: ResultData | null;
    previewUrl?: string | null;
}

export const ResultSection = ({ result, previewUrl }: ResultSectionProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    if (!result) return null;

    const handleDownload = async () => {
        setIsDownloading(true);
        const toastId = toast.loading('Generating Scientific Report…');
        try {
            await generatePdf(result, previewUrl);
            toast.success('Report exported successfully!', { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error('Failed to generate report.', { id: toastId });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto"
        >
            {/* ── Main Result Card ── */}
            <Card className="lg:col-span-8 border border-slate-100 shadow-2xl shadow-slate-100/50 overflow-hidden rounded-[3rem] bg-white">

                {/* Status bar */}
                <div className={cn(
                    "py-4 px-8 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3",
                    result.isHealthy ? "bg-primary shadow-[0_4px_20px_rgba(22,163,74,0.3)]" : "bg-red-500 shadow-[0_4px_20px_rgba(239,68,68,0.3)]"
                )}>
                    {result.isHealthy
                        ? <><ShieldCheck className="w-4 h-4" /> Diagnosis: Optimal Health</>
                        : <><AlertTriangle className="w-4 h-4" /> Diagnosis: Pathological Presence</>
                    }
                </div>

                {/* Header */}
                <div className="p-10 md:p-14 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                                    Official Diagnostic
                                </span>
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                {result.diseaseName}
                            </h3>
                        </div>

                        {/* Confidence Ring (Refined) */}
                        <div className="flex items-center gap-5 px-6 py-5 bg-slate-50 rounded-3xl border border-slate-100">
                            <div className="relative w-16 h-16">
                                <svg className="w-16 h-16 -rotate-90">
                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4"
                                        fill="transparent" className="text-slate-200" />
                                    <motion.circle
                                        initial={{ strokeDashoffset: 175.9 }}
                                        animate={{ strokeDashoffset: 175.9 * (1 - result.confidence / 100) }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        cx="32" cy="32" r="28"
                                        stroke="currentColor" strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={175.9}
                                        className="text-primary"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">
                                    {Math.round(result.confidence)}%
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Reliability</div>
                                <div className="text-xs font-black text-slate-900 uppercase tracking-tight">High Precision</div>
                            </div>
                        </div>
                    </div>
                </div>

                <CardContent className="p-10 md:p-14 space-y-12">
                    {/* Description */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scientific Overview</h4>
                        </div>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium italic border-l-4 border-slate-50 pl-8">{result.description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-12">
                        {/* Treatments */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Thermometer className="w-4 h-4 text-orange-500" />
                                Remediation Protocol
                            </h4>
                            <div className="space-y-5">
                                {result.treatments.map((t, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                            <span className="text-[10px] font-black text-slate-400 group-hover:text-primary">{i + 1}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed pt-1.5">{t}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Hygiene Tip (Card Style) */}
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
                                <div className="relative z-10 space-y-4">
                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Droplets className="w-4 h-4" /> Field Protocol
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                        Ensure all specialized equipment is sanitized using pharmaceutical-grade reagents after contact with analyzed vegetation.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="w-full bg-white border border-slate-100 p-5 rounded-[1.5rem] flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-primary/20 hover:text-primary hover:bg-slate-50 transition-all shadow-sm"
                            >
                                {isDownloading ? (
                                    <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                {isDownloading ? 'Processing Export' : 'Export Scientific Report'}
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-4 space-y-8">
                {/* Threat card */}
                <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 relative overflow-hidden">
                    <div className="relative z-10 space-y-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Index</span>
                            {result.isHealthy ? (
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/20">LOW</span>
                            ) : (
                                <span className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">CRITICAL</span>
                            )}
                        </div>

                        {!result.isHealthy && (
                            <div className="space-y-6">
                                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Response Window</div>
                                        <div className="text-sm font-black text-slate-900">48 Hours Optimal</div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    This pathogen exhibits rapid colonization behavior. Immediate quarantine of the affected plot is recommended.
                                </p>
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-100">
                           <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                              <Share2 className="w-4 h-4" /> Share with Expert
                           </button>
                        </div>
                    </div>
                </div>

                {/* Network card */}
                <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <Network className="w-20 h-20" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h4 className="text-lg font-black uppercase tracking-tight">Expert Network</h4>
                        <p className="text-white/80 text-xs leading-relaxed font-medium">
                            Need a second opinion? Connect with our global network of verified agronomists for an in-depth audit.
                        </p>
                        <button className="w-full py-4 bg-white text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Connect Now
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
