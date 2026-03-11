import { Skeleton } from "./ui/Skeleton";

export const HeroSkeleton = () => (
    <div className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <Skeleton className="h-10 w-48 rounded-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full lg:w-[120%]" />
                        <Skeleton className="h-16 w-[80%]" />
                    </div>
                    <Skeleton className="h-20 w-[60%]" />
                    <div className="flex gap-5">
                        <Skeleton className="h-16 w-48" />
                        <Skeleton className="h-16 w-40" />
                    </div>
                    <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
                <div className="hidden lg:block relative">
                    <Skeleton className="aspect-video w-full rounded-[3rem]" />
                </div>
            </div>
        </div>
    </div>
);

export const UploadSkeleton = () => (
    <div className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4 md:px-0">
            <div className="text-center mb-12 space-y-4">
                <Skeleton className="h-12 w-64 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="rounded-[2.5rem] bg-white shadow-xl p-0 overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-12">
                    <Skeleton className="h-64 w-full rounded-3xl" />
                </div>
            </div>
        </div>
    </div>
);

export const SectionSkeleton = () => (
    <div className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <Skeleton className="aspect-square w-full rounded-3xl" />
                <div className="space-y-8">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Skeleton className="h-32 w-full rouned-2xl" />
                        <Skeleton className="h-32 w-full rouned-2xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const ResultSkeleton = () => (
    <div className="section-padding bg-[#fcfdfa] pt-10">
        <div className="container mx-auto max-w-6xl px-4 md:px-0">
            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />
                </div>
                <div className="lg:col-span-4 space-y-8">
                    <Skeleton className="h-64 w-full rounded-[2.5rem]" />
                    <Skeleton className="h-64 w-full rounded-[2.5rem]" />
                </div>
            </div>
        </div>
    </div>
);
export const HowItWorksSkeleton = () => (
    <div className="section-padding bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <Skeleton className="h-16 w-96 mx-auto mb-20" />
            <div className="grid lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex flex-col items-center gap-6">
                        <Skeleton className="h-20 w-20 rounded-3xl" />
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-[400px] w-full rounded-[3rem] mt-32" />
        </div>
    </div>
);
