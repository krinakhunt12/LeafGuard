import { FileText } from 'lucide-react';
import StaticPageLayout from '../../components/StaticPageLayout';

const TermsPage = () => (
    <StaticPageLayout 
        title="Terms of Service" 
        subtitle="The legal agreement between you and LeafGuard AI."
        icon={FileText}
    >
        <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-6">
                By accessing or using LeafGuard, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
            <p className="text-slate-600 mb-6">
                Permission is granted to use LeafGuard for personal or commercial agricultural diagnostic purposes. This is the grant of a license, not a transfer of title.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer</h2>
            <p className="text-slate-600 mb-6">
                LeafGuard AI diagnostics are provided for informational purposes only. While highly accurate, results should be verified with local agricultural experts for critical crop management decisions.
            </p>
        </div>
    </StaticPageLayout>
);

export default TermsPage;
