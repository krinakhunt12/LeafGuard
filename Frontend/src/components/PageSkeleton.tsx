import { Skeleton } from "./ui/Skeleton";

export const HeroSkeleton = () => (
    <div className="relative h-screen w-full bg-slate-100 animate-pulse" />
);

export const UploadSkeleton = () => (
    <div className="section-padding bg-[#f8faf8]">
        <div className="container mx-auto max-w-3xl px-4">
            <div className="text-center mb-10 space-y-3">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="p-6">
                    <Skeleton className="h-56 w-full rounded-xl" />
                </div>
            </div>
        </div>
    </div>
);

export const SectionSkeleton = () => (
    <div className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-56" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Skeleton className="h-28 w-full rounded-xl" />
                        <Skeleton className="h-28 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const ResultSkeleton = () => (
    <div className="section-padding bg-[#f8faf8] pt-0">
        <div className="container mx-auto max-w-5xl px-4">
            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                </div>
                <div className="lg:col-span-4 space-y-5">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    </div>
);

export const HowItWorksSkeleton = () => (
    <div className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <Skeleton className="h-10 w-72 mx-auto mb-16" />
            <div className="grid lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-44 w-full rounded-2xl" />
                ))}
            </div>
            <Skeleton className="h-72 w-full rounded-2xl mt-12" />
        </div>
    </div>
);
