import { Code } from 'lucide-react';
import StaticPageLayout from '../../components/StaticPageLayout';

const ApiDocsPage = () => (
    <StaticPageLayout 
        title="API Documentation" 
        subtitle="Integrate LeafGuard AI diagnostics into your own agricultural applications."
        icon={Code}
    >
        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
                The LeafGuard API provides developers with access to our advanced plant disease detection models. 
                Our RESTful API allows you to upload leaf images and receive detailed analysis results in JSON format.
            </p>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Authentication</h2>
            <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm">
                <p># Request with API Key</p>
                <p>curl -X POST https://api.leafguard.ai/v1/predict \</p>
                <p>  -H "Authorization: Bearer YOUR_API_KEY" \</p>
                <p>  -F "file=@leaf.jpg"</p>
            </div>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Endpoints</h2>
            <div className="grid gap-4">
                {[
                    { method: 'POST', path: '/v1/predict', desc: 'Predict disease from a leaf image' },
                    { method: 'GET', path: '/v1/diseases', desc: 'Get list of supported diseases' },
                    { method: 'GET', path: '/v1/usage', desc: 'Check your current API usage' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">{item.method}</span>
                        <code className="text-slate-700 font-bold">{item.path}</code>
                        <span className="text-slate-500 text-sm ml-auto">{item.desc}</span>
                    </div>
                ))}
            </div>
        </section>
    </StaticPageLayout>
);

export default ApiDocsPage;
