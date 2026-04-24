import React from 'react';

interface StaticPageLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const StaticPageLayout: React.FC<StaticPageLayoutProps> = ({ title, subtitle, icon: Icon, children }) => (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 animate-fade-in">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default StaticPageLayout;
