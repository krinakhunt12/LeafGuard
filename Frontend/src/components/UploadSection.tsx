import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Search, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';

interface UploadSectionProps {
    onAnalyze: (file: File, previewUrl: string) => void;
    isPredicting: boolean;
}

export const UploadSection = ({ onAnalyze, isPredicting }: UploadSectionProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File too large. Max 5MB allowed.');
                return;
            }
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            toast.success('Image loaded successfully!');
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
        if (!selectedFile || !preview) { toast.error('Please select an image first.'); return; }
        onAnalyze(selectedFile, preview);
    };

    return (
        <section id="analyze" className="section-padding bg-[#f8faf8]">
            <div className="container mx-auto max-w-3xl px-4 md:px-0">

                {/* Header */}
                <div className="text-center mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-slate-500 font-medium text-xs uppercase tracking-widest">Analysis</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900">
                        Start Your <span className="text-gradient">Diagnosis</span>
                    </h2>
                    <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
                        Upload a clear photo of the affected plant leaf. Ensure good lighting and focus on visible symptoms.
                    </p>
                </div>

                <Card className="border border-slate-100">
                    {/* Card top bar */}
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <Upload className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 font-display">Upload Leaf Image</span>
                        <span className="ml-auto text-xs text-slate-400">PNG, JPG · max 5MB</span>
                    </div>

                    <CardContent className="p-6">
                        <AnimatePresence mode="wait">
                            {!preview ? (
                                <motion.div
                                    key="dropzone"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div
                                        {...getRootProps()}
                                        className={cn(
                                            "group border-2 border-dashed rounded-xl p-14 text-center cursor-pointer transition-all duration-200",
                                            isDragActive
                                                ? "border-primary bg-primary/5"
                                                : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                                        )}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/8 border border-primary/15 rounded-2xl group-hover:scale-105 transition-transform duration-200">
                                                <ImageIcon className="w-7 h-7 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-slate-700">
                                                    {isDragActive ? 'Drop your leaf here' : 'Drag & drop or click to browse'}
                                                </p>
                                                <p className="text-slate-400 text-sm mt-1">Supports PNG, JPG, JPEG</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="pointer-events-none border border-slate-200 bg-white text-slate-600">
                                                Browse Files
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-5"
                                >
                                    {/* Image preview */}
                                    <div className="relative rounded-xl overflow-hidden border border-slate-100 max-h-[360px]">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={clearSelection}
                                            className="absolute top-3 right-3 p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-100 transition-colors duration-150"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        {isPredicting && (
                                            <motion.div
                                                initial={{ top: '0%' }}
                                                animate={{ top: '100%' }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-0.5 bg-primary z-20"
                                            />
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            onClick={handleAnalyze}
                                            className="flex-1 gap-2"
                                            isLoading={isPredicting}
                                            size="lg"
                                        >
                                            {!isPredicting && <Search className="w-4 h-4" />}
                                            {isPredicting ? 'Analyzing…' : 'Run Analysis'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={clearSelection}
                                            className="sm:w-32 border border-slate-200 bg-white text-slate-600"
                                            disabled={isPredicting}
                                            size="lg"
                                        >
                                            Reset
                                        </Button>
                                    </div>

                                    {!isPredicting && (
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            Results will appear below after analysis completes
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
