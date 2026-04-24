import { Shield } from 'lucide-react';
import StaticPageLayout from '../../components/StaticPageLayout';

const PrivacyPage = () => (
    <StaticPageLayout 
        title="Privacy Policy" 
        subtitle="How we handle your data and protect your privacy at LeafGuard."
        icon={Shield}
    >
        <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-6">
                We collect images of plant leaves that you upload for analysis. These images are processed by our AI models to provide diagnostics. 
                We also collect basic usage analytics to improve our service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Data</h2>
            <p className="text-slate-600 mb-6">
                The images you upload are used primarily for real-time analysis. We may use anonymized images to further train and improve our disease detection algorithms, helping farmers worldwide.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
            <p className="text-slate-600 mb-6">
                We implement industry-standard security measures to protect your data. Your uploads are encrypted during transmission and stored securely if you choose to save your results.
            </p>
        </div>
    </StaticPageLayout>
);

export default PrivacyPage;
