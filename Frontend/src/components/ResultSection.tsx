import { ShieldCheck, AlertTriangle, Thermometer, Droplets, Info, ExternalLink, Network, FileText } from 'lucide-react';
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
        <section className="py-16 md:py-24 px-4 bg-white pt-0">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid lg:grid-cols-12 gap-8"
                >
                    {/* Main Result Area */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        <div className={cn(
                            "p-4 rounded-md border flex items-center gap-3",
                            result.isHealthy 
                                ? "bg-primary/5 border-primary/20 text-primary-dark" 
                                : "bg-red-50 border-red-100 text-red-700"
                        )}>
                            {result.isHealthy ? (
                                <ShieldCheck className="w-5 h-5" />
                            ) : (
                                <AlertTriangle className="w-5 h-5" />
                            )}
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {result.isHealthy ? "Healthy Specimen Detected" : "Pathology Identified"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-end gap-4 justify-between">
                                <h3 className="text-4xl font-bold text-slate-900">{result.diseaseName}</h3>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence</div>
                                    <div className="text-2xl font-bold text-slate-900">{Math.round(result.confidence)}%</div>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.confidence}%` }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Diagnostic Summary</h4>
                            <p className="text-slate-600 leading-relaxed">
                                {result.description}
                            </p>
                        </div>

                        {!result.isHealthy && (
                            <div className="space-y-6 pt-4">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Intervention Protocols</h4>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {result.treatments.map((treatment, i) => (
                                        <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-md flex gap-4 items-start">
                                            <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xs font-bold text-slate-400">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm text-slate-600 leading-snug">{treatment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="bg-slate-900 text-white border-none p-2">
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Threat Level</h4>
                                    <div className={cn(
                                        "text-sm font-bold",
                                        result.isHealthy ? "text-primary-light" : "text-red-400"
                                    )}>
                                        {result.isHealthy ? "LOW RISK" : "CRITICAL - IMMEDIATE ACTION"}
                                    </div>
                                </div>
                                
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <Button variant="outline" className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-white rounded-md">
                                        <FileText className="w-4 h-4 mr-2" /> Download Report
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-white rounded-md">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Research Database
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-md space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center">
                                    <Network className="w-4 h-4 text-primary" />
                                </div>
                                <h4 className="font-bold text-slate-900">Expert Verification</h4>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Share this diagnosis with a certified agronomist for professional verification and localized chemical application plans.
                            </p>
                            <Button size="sm" variant="secondary" className="w-full border border-slate-200 shadow-none">
                                Contact Specialist
                            </Button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
