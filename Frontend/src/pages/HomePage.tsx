import { lazy, Suspense } from 'react';
import { HeroSkeleton, HowItWorksSkeleton, SectionSkeleton } from '../components/PageSkeleton';

const Hero = lazy(() => import('../components/Hero').then(module => ({ default: module.Hero })));
const HowItWorks = lazy(() => import('../components/HowItWorks').then(module => ({ default: module.HowItWorks })));
const AboutSection = lazy(() => import('../components/AboutSection').then(module => ({ default: module.AboutSection })));

export default function HomePage() {
    return (
        <div className="animate-fade-in">
            <Suspense fallback={<HeroSkeleton />}>
                <Hero />
            </Suspense>

            <Suspense fallback={<HowItWorksSkeleton />}>
                <HowItWorks />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <AboutSection />
            </Suspense>
        </div>
    );
}
