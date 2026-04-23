import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

interface UploadSectionProps {
    onAnalyze: (file: File) => void;
    isPredicting: boolean;
}

export const UploadSection = ({ onAnalyze, isPredicting }: UploadSectionProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size too large. Max 5MB allowed.');
                return;
            }
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            toast.success('Image uploaded successfully!');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: false,
    });

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
    };

    const handleAnalyze = () => {
        if (!selectedFile) {
            toast.error('Please select an image first.');
            return;
        }
        onAnalyze(selectedFile);
    };

    return (
        <section id="analyze" className="py-16 md:py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    <div className="lg:w-1/3 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Diagnosis Tool</h2>
                            <h3 className="text-4xl font-bold text-slate-900 leading-tight">Start Your Analysis</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Upload a clear photo of the plant leaf surface for a clinical-grade diagnostic report. 
                                Focus on areas with visible symptoms for best results.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
                            <h4 className="font-bold text-slate-900 text-sm">Best Practices:</h4>
                            <ul className="space-y-3">
                                {[
                                    "Ensure natural daylight",
                                    "Focus on the lesion or spot",
                                    "Avoid multiple leaves in one shot",
                                    "Max resolution (5MB)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <Card className="shadow-sm border-slate-200">
                            <CardContent className="p-8">
                                <AnimatePresence mode="wait">
                                    {!preview ? (
                                        <div
                                            {...getRootProps()}
                                            className={cn(
                                                "relative group border border-dashed rounded-lg p-16 text-center transition-all cursor-pointer",
                                                isDragActive
                                                    ? "border-primary bg-primary/5"
                                                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                                            )}
                                        >
                                            <input {...getInputProps()} />
                                            <div className="space-y-4">
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-50 border border-slate-200 rounded-md group-hover:scale-110 transition-transform">
                                                    <Upload className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold text-slate-700">
                                                        {isDragActive ? 'Drop image here' : 'Select a leaf image to upload'}
                                                    </p>
                                                    <p className="text-slate-400 text-xs mt-1">PNG or JPG up to 5MB</p>
                                                </div>
                                                <Button variant="outline" className="mt-4">
                                                    Browse Files
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.div
                                            key="preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-8"
                                        >
                                            <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-50">
                                                <img src={preview || ''} alt="Preview" className="w-full h-full object-contain" />
                                                <button
                                                    onClick={clearSelection}
                                                    className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-md text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                {isPredicting && (
                                                    <motion.div
                                                        initial={{ top: '0%' }}
                                                        animate={{ top: '100%' }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="absolute left-0 right-0 h-[2px] bg-primary z-20"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={handleAnalyze}
                                                    className="flex-1 py-4"
                                                    isLoading={isPredicting}
                                                    size="lg"
                                                >
                                                    {!isPredicting && <Search className="w-4 h-4 mr-2" />}
                                                    {isPredicting ? 'Analyzing...' : 'Run Neural Diagnostic'}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={clearSelection}
                                                    className="px-8"
                                                    disabled={isPredicting}
                                                    size="lg"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>

                                            {!isPredicting && (
                                                <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
                                                    <AlertCircle className="w-4 h-4" />
                                                    Results will be generated based on the visible leaf pathology.
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
};
