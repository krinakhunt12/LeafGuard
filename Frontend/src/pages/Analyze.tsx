import { useState, lazy, Suspense } from 'react';
import { UploadSkeleton, ResultSkeleton } from '../components/PageSkeleton';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Camera, Lightbulb, ShieldCheck, Microscope, Zap, BookOpen } from 'lucide-react';

const UploadSection = lazy(() => import('../components/UploadSection').then(module => ({ default: module.UploadSection })));
const ResultSection = lazy(() => import('../components/ResultSection').then(module => ({ default: module.ResultSection })));

interface ResultData {
    diseaseName: string;
    confidence: number;
    description: string;
    treatments: string[];
    isHealthy: boolean;
}

export default function Analyze() {
    const { token } = useAuth();
    const [isPredicting, setIsPredicting] = useState(false);
    const [result, setResult] = useState<ResultData | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleAnalyze = async (file: File, imgPreviewUrl: string) => {
        setIsPredicting(true);
        setResult(null);
        setPreviewUrl(imgPreviewUrl);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to analyze leaf');
            }

            const data: ResultData = await response.json();
            setResult(data);
            toast.success('Analysis complete!');

            setTimeout(() => {
                const resultElement = document.getElementById('result-anchor');
                if (resultElement) {
                    resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } catch (error: any) {
            console.error('Error analyzing leaf:', error);
            toast.error(error.message || 'Something went wrong. Please check if the backend is running.');
        } finally {
            setIsPredicting(false);
        }
    };

    return (
        <div className="pt-28 pb-32 min-h-screen bg-white relative overflow-hidden selection:bg-primary/20 selection:text-primary">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Page Header */}
                <div className="max-w-5xl mx-auto mb-20 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20"
                    >
                        <Microscope className="w-3 h-3" /> Digital Pathology
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase">
                        Precision <span className="text-primary">Analysis</span> Studio
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed italic">
                        Deploy our high-fidelity NeuralLesion™ engine to diagnose crop health with enterprise-grade precision.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
                    {/* Left: Tips & Metadata */}
                    <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
                        <div className="space-y-8">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-2 border-primary pl-4">Optimization Protocol</h3>
                            <div className="space-y-8">
                                {[
                                    { icon: <Camera />, t: "Optical Clarity", d: "Ensure the leaf fills at least 70% of the frame for optimal feature extraction." },
                                    { icon: <Lightbulb />, t: "Diffuse Lighting", d: "Avoid harsh shadows or direct sunlight; overcast natural light provides best results." },
                                    { icon: <ShieldCheck />, t: "Surface Hygiene", d: "Remove dirt or moisture from the leaf surface before capturing the image." }
                                ].map((tip, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="flex gap-5"
                                    >
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100 shrink-0">
                                            {tip.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">{tip.t}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.d}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <Zap className="w-8 h-8 text-primary mb-6" />
                                <h3 className="text-lg font-black uppercase tracking-tight mb-4">Neural Mapping</h3>
                                <p className="text-slate-400 text-xs leading-relaxed font-medium mb-6">
                                    Our model identifies pathological patterns across 512+ specialized feature maps to ensure 98.4% diagnostic accuracy.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/10 border-2 border-slate-950" />)}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">1.2M Samples Trained</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Upload Area */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <Suspense fallback={<UploadSkeleton />}>
                            <UploadSection
                                onAnalyze={handleAnalyze}
                                isPredicting={isPredicting}
                            />
                        </Suspense>
                    </div>
                </div>

                {/* Results Section */}
                <div id="result-anchor" className="scroll-mt-32 mt-32">
                    <Suspense fallback={<ResultSkeleton />}>
                        {isPredicting && (
                            <div className="max-w-5xl mx-auto py-20 text-center">
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Processing Spectral Data...</span>
                                </div>
                            </div>
                        )}
                        <ResultSection result={result} previewUrl={previewUrl} />
                    </Suspense>
                </div>

                {/* Resources Quick Link */}
                {!result && !isPredicting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-40 pt-20 border-t border-slate-100 flex flex-col items-center"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <BookOpen className="w-4 h-4 text-slate-300" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Scientific Resources</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">Need more intelligence?</h3>
                        <div className="flex gap-6">
                            <button className="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-white hover:border-primary/20 hover:text-primary transition-all">Documentation</button>
                            <button className="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-white hover:border-primary/20 hover:text-primary transition-all">Research Papers</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
