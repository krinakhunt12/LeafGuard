import { motion } from 'framer-motion';
import { Camera, BrainCircuit, ClipboardCheck, Sprout } from 'lucide-react';

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Camera className="w-6 h-6 text-slate-600" />,
            title: "1. Capture Image",
            description: "Take a clear, well-lit photo of the affected plant leaf surface."
        },
        {
            icon: <BrainCircuit className="w-6 h-6 text-slate-600" />,
            title: "2. Process Data",
            description: "Our neural networks analyze the pixel data for pathological markers."
        },
        {
            icon: <ClipboardCheck className="w-6 h-6 text-slate-600" />,
            title: "3. Receive Diagnosis",
            description: "Get a detailed report with disease classification and confidence scores."
        },
        {
            icon: <Sprout className="w-6 h-6 text-slate-600" />,
            title: "4. Implementation",
            description: "Apply precision treatment protocols to restore plant health."
        }
    ];

    return (
        <section id="how-it-works" className="py-16 md:py-24 px-4 bg-slate-50 border-b border-slate-100">
            <div className="max-w-5xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Operational Workflow</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900">
                        A seamless path to recovery.
                    </h3>
                    <p className="text-lg text-slate-500">
                        Our diagnostics pipeline is designed for simplicity and speed, ensuring you get the information you need when it matters most.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-12">
                    {steps.map((step, i) => (
                        <div key={i} className="space-y-6">
                            <div className="w-12 h-12 rounded-md bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                {step.icon}
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Technical Detail (Minimal) */}
                <div className="mt-24 p-12 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-4">
                        <h4 className="text-2xl font-bold text-slate-900">Scientifically Validated Results</h4>
                        <p className="text-slate-600">
                            Our platform is not just a tool; it's a bridge between agricultural science and on-field implementation. Every diagnostic model is cross-verified by pathology experts.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-3 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">99.2% Test Accuracy</div>
                            <div className="px-3 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">Low-Latency Inference</div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-md overflow-hidden grayscale">
                        <img
                            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200"
                            alt="Validated Science"
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
