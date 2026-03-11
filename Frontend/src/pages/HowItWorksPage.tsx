import { lazy, Suspense } from 'react';
import { HowItWorksSkeleton } from '../components/PageSkeleton';

const HowItWorks = lazy(() => import('../components/HowItWorks').then(module => ({ default: module.HowItWorks })));

export default function HowItWorksPage() {
    return (
        <div className="pt-24 animate-fade-in bg-white min-h-screen">
            <Suspense fallback={<HowItWorksSkeleton />}>
                <HowItWorks />
            </Suspense>
        </div>
    );
}
