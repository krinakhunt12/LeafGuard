import { lazy, Suspense } from 'react';
import { SectionSkeleton } from '../components/PageSkeleton';

const AboutSection = lazy(() => import('../components/AboutSection').then(module => ({ default: module.AboutSection })));

export default function Technology() {
    return (
        <div className="pt-24 animate-fade-in bg-white min-h-screen">
            <Suspense fallback={<SectionSkeleton />}>
                <AboutSection />
            </Suspense>

            {/* Extended technology content */}
            <div className="section-padding bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Dataset Diversity</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Our training set includes images from over 15 different climatic zones ensuring robust performance globally.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Model Architecture</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Using a modified ResNet-50 backbone with custom attention layers for precision lesion detection.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">Edge Optimization</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Quantized model weights allow for near-instant inference even on unstable network conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
