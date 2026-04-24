import { ShieldCheck, AlertTriangle, Thermometer, Droplets, Info, Download, Network } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
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
        const toastId = toast.loading('Generating PDF report…');
        try {
            await generatePdf(result, previewUrl);
            toast.success('Report downloaded!', { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error('Failed to generate PDF.', { id: toastId });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section className="section-padding bg-[#f8faf8] pt-0">
            <div className="container mx-auto max-w-5xl px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="grid lg:grid-cols-12 gap-6"
                >
                    {/* ── Main Result Card ── */}
                    <Card className="lg:col-span-8 border border-slate-100 overflow-hidden rounded-2xl">

                        {/* Status bar */}
                        <div className={cn(
                            "py-3 px-6 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2",
                            result.isHealthy ? "bg-primary" : "bg-red-500"
                        )}>
                            {result.isHealthy
                                ? <><ShieldCheck className="w-3.5 h-3.5" /> Healthy Leaf Detected</>
                                : <><AlertTriangle className="w-3.5 h-3.5" /> Disease Detected</>
                            }
                        </div>

                        {/* Header */}
                        <div className="p-7 pb-5 border-b border-slate-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold text-slate-900 font-display leading-tight">
                                        {result.diseaseName}
                                    </h3>
                                    <div className="flex items-center gap-2.5">
                                        <span className="px-2.5 py-1 bg-primary/8 text-primary text-xs font-semibold rounded-md">
                                            AI Diagnosis
                                        </span>
                                        <span className="text-slate-400 text-xs flex items-center gap-1">
                                            <Info className="w-3.5 h-3.5" /> Verified methodology
                                        </span>
                                    </div>
                                </div>

                                {/* Confidence ring */}
                                <div className="flex items-center gap-4 px-5 py-4 bg-slate-950 rounded-xl">
                                    <div className="relative w-16 h-16">
                                        <svg className="w-16 h-16 -rotate-90">
                                            <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5"
                                                fill="transparent" className="text-slate-800" />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 163.4 }}
                                                animate={{ strokeDashoffset: 163.4 * (1 - result.confidence / 100) }}
                                                transition={{ duration: 2, ease: "easeOut" }}
                                                cx="32" cy="32" r="26"
                                                stroke="currentColor" strokeWidth="5"
                                                fill="transparent"
                                                strokeDasharray={163.4}
                                                className="text-primary-light"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                                            {Math.round(result.confidence)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Confidence</div>
                                        <div className="text-sm font-semibold text-white">High Precision</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-7 space-y-7">
                            {/* Description */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                    </div>
                                    Biological Impact
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{result.description}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Treatments */}
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                                        Treatment Protocol
                                    </h4>
                                    <ul className="space-y-3">
                                        {result.treatments.map((t, i) => (
                                            <li key={i} className="flex gap-3 text-slate-600 text-sm">
                                                <div className="w-5 h-5 rounded-full border border-primary/25 bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                                                </div>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    {/* Hygiene tip */}
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <h4 className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1.5">
                                            <Droplets className="w-3.5 h-3.5" /> Hygiene Tip
                                        </h4>
                                        <p className="text-xs text-blue-600 leading-relaxed">
                                            Sanitize all tools with 70% isopropyl alcohol after handling infected vegetation.
                                        </p>
                                    </div>

                                    {/* ── Download PDF button ── */}
                                    <Button
                                        onClick={handleDownload}
                                        isLoading={isDownloading}
                                        variant="ghost"
                                        className="w-full border border-slate-200 bg-white text-slate-600 gap-2 text-xs hover:border-primary/30 hover:text-primary transition-colors"
                                        size="md"
                                    >
                                        {!isDownloading && <Download className="w-3.5 h-3.5" />}
                                        {isDownloading ? 'Generating PDF…' : 'Download Full Report (PDF)'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Threat card */}
                        <Card className="bg-slate-950 border-slate-800 text-white overflow-hidden">
                            <CardContent className="p-6">
                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Threat Assessment</div>
                                <div className="mb-6">
                                    {result.isHealthy ? (
                                        <span className="bg-primary/15 text-primary-light px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/20">
                                            LOW RISK
                                        </span>
                                    ) : (
                                        <span className="bg-red-500/15 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/20">
                                            CRITICAL
                                        </span>
                                    )}
                                </div>
                                {!result.isHealthy && (
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/8 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-yellow-500/15 p-1.5 rounded-lg">
                                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Time to Action</div>
                                                <div className="text-sm font-semibold text-white">48 Hours Optimal</div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            This pathogen can spread to adjacent crops via wind or water within days.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Specialist card */}
                        <Card className="border border-slate-100">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-primary/8 border border-primary/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Network className="w-5 h-5 text-primary" />
                                </div>
                                <h4 className="font-semibold text-slate-900 text-base mb-2 font-display">Need Expert Review?</h4>
                                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                                    Connect with a local agronomist for a physical inspection and localized treatment plan.
                                </p>
                                <Button
                                    size="sm"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2"
                                >
                                    Connect with Specialist
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
