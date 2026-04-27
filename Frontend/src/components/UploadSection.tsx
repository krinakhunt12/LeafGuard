import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Search, Image as ImageIcon } from 'lucide-react';
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
        <Card className="border border-slate-100 shadow-2xl shadow-slate-100/50 rounded-[2.5rem] overflow-hidden bg-white">
            {/* Card top bar */}
            <div className="flex items-center gap-4 px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                <div className="bg-primary/10 p-2 rounded-xl">
                    <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source Input</span>
                    <span className="block text-sm font-black text-slate-900 uppercase tracking-tight">Spectral Data Acquisition</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ready</span>
                </div>
            </div>

            <CardContent className="p-10">
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
                                    "group border-2 border-dashed rounded-[2rem] p-20 text-center cursor-pointer transition-all duration-300",
                                    isDragActive
                                        ? "border-primary bg-primary/5"
                                        : "border-slate-100 hover:border-primary/40 hover:bg-slate-50/50"
                                )}
                            >
                                <input {...getInputProps()} />
                                <div className="space-y-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-slate-100 shadow-sm rounded-3xl group-hover:scale-110 transition-transform duration-300">
                                        <ImageIcon className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-900 uppercase tracking-tight">
                                            {isDragActive ? 'Release to Scan' : 'Acquire Leaf Image'}
                                        </p>
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">HEIC, PNG, JPG (Max 5MB)</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all pointer-events-none">
                                        Browse Workspace
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {/* Image preview */}
                            <div className="relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl max-h-[450px] group/preview">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105" />
                                <button
                                    onClick={clearSelection}
                                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:shadow-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                {isPredicting && (
                                    <>
                                        <motion.div
                                            initial={{ top: '0%' }}
                                            animate={{ top: '100%' }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(22,163,74,0.8)] z-20"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin" />
                                                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Mapping Neural Pathways</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isPredicting}
                                    className="flex-1 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isPredicting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-4 h-4" />
                                            Initialize Analysis
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={clearSelection}
                                    disabled={isPredicting}
                                    className="sm:w-40 bg-slate-50 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-white hover:border-slate-200 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};
