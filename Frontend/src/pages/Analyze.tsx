import { useState, lazy, Suspense } from 'react';
import { UploadSkeleton, ResultSkeleton } from '../components/PageSkeleton';
import { toast } from 'react-hot-toast';
import { usePredict } from '../api';

const UploadSection = lazy(() => import('../components/UploadSection').then(module => ({ default: module.UploadSection })));
const ResultSection = lazy(() => import('../components/ResultSection').then(module => ({ default: module.ResultSection })));

export default function Analyze() {
    const { mutate: predict, isPending: isPredicting, data: result } = usePredict();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleAnalyze = async (file: File, imgPreviewUrl: string) => {
        setPreviewUrl(imgPreviewUrl);

        const formData = new FormData();
        formData.append('file', file);
        
        predict(formData, {
            onSuccess: () => {
                toast.success('Analysis complete!');
                setTimeout(() => {
                    const resultElement = document.getElementById('result-anchor');
                    if (resultElement) {
                        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            },
            onError: (error: any) => {
                console.error('Error analyzing leaf:', error);
                toast.error(error.message || 'Something went wrong. Please check if the backend is running.');
            }
        });
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-50 animate-fade-in">
            <div className="container mx-auto px-4 md:px-6 mb-16">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                        Leaf <span className="text-gradient">Analysis</span> Studio
                    </h1>
                    <p className="text-lg text-slate-500 font-medium">
                        Upload your high-resolution leaf image for a professional-grade AI diagnosis.
                    </p>
                </div>
            </div>

            <Suspense fallback={<UploadSkeleton />}>
                <UploadSection
                    onAnalyze={handleAnalyze}
                    isPredicting={isPredicting}
                />
            </Suspense>

            <div id="result-anchor" className="scroll-mt-24 min-h-[400px]">
                <Suspense fallback={<ResultSkeleton />}>
                    {isPredicting && <ResultSkeleton />}
                    <ResultSection result={result} previewUrl={previewUrl} />
                </Suspense>
            </div>
        </div>
    );
}
