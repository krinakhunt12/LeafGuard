import { ShieldCheck, AlertTriangle, Thermometer, Droplets, Info, ExternalLink, Network } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

interface ResultData {
    diseaseName: string;
    confidence: number;
    description: string;
    treatments: string[];
    isHealthy: boolean;
}

interface ResultSectionProps {
    result: ResultData | null;
}

export const ResultSection = ({ result }: ResultSectionProps) => {
    if (!result) return null;

    return (
        <section className="section-padding bg-[#fcfdfa] pt-0">
            <div className="container mx-auto max-w-6xl px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid lg:grid-cols-12 gap-10"
                >
                    {/* Main Result Card */}
                    <Card className="lg:col-span-8 shadow-2xl border-none overflow-hidden rounded-[2.5rem] glass">
                        <div className={cn(
                            "py-4 px-8 text-white text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-inner",
                            result.isHealthy ? "bg-primary" : "bg-red-600"
                        )}>
                            {result.isHealthy ? (
                                <><ShieldCheck className="w-4 h-4" /> Healthy Leaf Detected</>
                            ) : (
                                <><AlertTriangle className="w-4 h-4" /> Infection Detected</>
                            )}
                        </div>

                        <CardHeader className="p-10 pb-6 border-b border-slate-100/50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="space-y-2">
                                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                        {result.diseaseName}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 bg-primary/10 rounded-lg text-primary text-xs font-black">AI DIAGNOSIS</div>
                                        <div className="text-slate-400 text-sm font-medium flex items-center gap-1.5">
                                            <Info className="w-4 h-4" /> Verified Methodology
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-900 rounded-3xl flex items-center gap-6 shadow-2xl shadow-slate-900/20">
                                    <div className="relative w-20 h-20">
                                        <svg className="w-20 h-20 -rotate-90">
                                            <circle
                                                cx="40" cy="40" r="34"
                                                stroke="currentColor" strokeWidth="6"
                                                fill="transparent" className="text-slate-800"
                                            />
                                            <motion.circle
                                                initial={{ strokeDashoffset: 213.6 }}
                                                animate={{ strokeDashoffset: 213.6 * (1 - result.confidence / 100) }}
                                                transition={{ duration: 2, ease: "easeOut" }}
                                                cx="40" cy="40" r="34"
                                                stroke="currentColor" strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={213.6}
                                                className="text-primary-light"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
                                            {Math.round(result.confidence)}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence Score</div>
                                        <div className="font-bold text-white text-lg leading-tight">High Precision</div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-10 space-y-12">
                            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-200/50">
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    </div>
                                    Biological Impact
                                </h4>
                                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                    {result.description}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Thermometer className="w-5 h-5 text-orange-500" />
                                        Intervention Protocol
                                    </h4>
                                    <ul className="space-y-4">
                                        {result.treatments.map((treatment, i) => (
                                            <li key={i} className="flex gap-4 text-slate-600 font-medium group">
                                                <div className="w-6 h-6 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-primary transition-colors">
                                                    <span className="text-[10px] font-black text-primary">{i + 1}</span>
                                                </div>
                                                <span className="text-base group-hover:text-slate-900 transition-colors">{treatment}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50 group hover:bg-blue-50 transition-colors">
                                        <h4 className="font-black text-blue-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Droplets className="w-5 h-5 text-blue-500" />
                                            Hygiene Tip
                                        </h4>
                                        <p className="text-sm text-blue-700 leading-relaxed font-bold">
                                            Sanitize all tools with 70% isopropyl alcohol after handling infected vegetation to stop the spread.
                                        </p>
                                    </div>
                                    <Button variant="outline" className="w-full py-6 rounded-2xl gap-3 text-sm font-black uppercase tracking-widest">
                                        Download Detailed Report <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar Stats/Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="bg-slate-900 text-white border-none rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/40">
                            <CardContent className="p-10">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Threat Assessment</div>
                                <div className="flex items-center gap-4 mb-10">
                                    {result.isHealthy ? (
                                        <div className="bg-primary/20 text-primary-light px-6 py-2 rounded-2xl text-xs font-black border border-primary/30 uppercase tracking-widest">
                                            LOW RISK
                                        </div>
                                    ) : (
                                        <div className="bg-red-500/20 text-red-400 px-6 py-2 rounded-2xl text-xs font-black border border-red-500/30 uppercase tracking-widest">
                                            CRITICAL
                                        </div>
                                    )}
                                </div>
                                {!result.isHealthy && (
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-yellow-500/20 p-2 rounded-xl">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time to Action</div>
                                                <div className="font-bold text-lg text-white">48 Hours Optimal</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                            This pathogen can spread to adjacent crops via wind or water droplets within days.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-white shadow-xl shadow-slate-200/50 rounded-[2.5rem]">
                            <CardContent className="p-10 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Network className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="font-black text-slate-900 text-xl mb-3 leading-tight">Expert Review?</h4>
                                <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">
                                    Send this diagnosis to a local agronomist for a physical inspection and localized plan.
                                </p>
                                <Button className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 border-none shadow-none font-black text-xs uppercase tracking-[0.1em]">
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
