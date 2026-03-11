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
        <section id="analyze" className="section-padding bg-slate-50">
            <div className="container mx-auto max-w-4xl px-4 md:px-0">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900">
                        Start Your <span className="text-primary italic">Analysis</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Upload a clear photo of the affected plant leaf for the most accurate diagnosis.
                        Ensure good lighting and focus on the symptoms.
                    </p>
                </div>

                <Card className="p-0 border-none shadow-2xl">
                    <CardHeader className="text-center py-10 bg-gradient-to-r from-primary/10 to-primary-light/10">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white p-3 rounded-2xl shadow-sm">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Upload Leaf Image</h3>
                    </CardHeader>

                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            {!preview ? (
                                <div
                                    {...getRootProps()}
                                    className={cn(
                                        "relative group border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer",
                                        isDragActive
                                            ? "border-primary bg-primary/5"
                                            : "border-slate-200 hover:border-primary hover:bg-slate-50"
                                    )}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                <ImageIcon className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-slate-700">
                                                    {isDragActive ? 'Drop your leaf here' : 'Click to upload or drag & drop'}
                                                </p>
                                                <p className="text-slate-400 mt-1">PNG, JPG or JPEG up to 5MB</p>
                                            </div>
                                            <Button variant="outline" className="pointer-events-none">
                                                Select Image
                                            </Button>
                                        </div>
                                    </motion.div>
                                </div>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white max-h-[400px]">
                                        <img src={preview || ''} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={clearSelection}
                                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-white transition-colors shadow-lg"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        {/* Scanner line animation when predicting */}
                                        {isPredicting && (
                                            <motion.div
                                                initial={{ top: '0%' }}
                                                animate={{ top: '100%' }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_#16a34a] z-20"
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            onClick={handleAnalyze}
                                            className="flex-1 gap-3 py-6"
                                            isLoading={isPredicting}
                                            size="xl"
                                        >
                                            {!isPredicting && <Search className="w-6 h-6" />}
                                            {isPredicting ? 'Sequencing Data...' : 'Start Neural Analysis'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={clearSelection}
                                            className="sm:w-40 py-6"
                                            disabled={isPredicting}
                                            size="xl"
                                        >
                                            Reset
                                        </Button>
                                    </div>


                                    {!isPredicting && (
                                        <div className="flex items-center gap-2 justify-center text-sm text-slate-500">
                                            <AlertCircle className="w-4 h-4" />
                                            Wait for analysis to see detailed results
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
