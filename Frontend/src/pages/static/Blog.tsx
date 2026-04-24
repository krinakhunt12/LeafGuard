import { Layout, ArrowRight } from 'lucide-react';
import StaticPageLayout from '../../components/StaticPageLayout';

const BlogPage = () => (
    <StaticPageLayout 
        title="Agricultural Blog" 
        subtitle="Insights on AI, sustainable farming, and plant pathology."
        icon={Layout}
    >
        <div className="grid md:grid-cols-2 gap-8">
            {[
                {
                    title: "The Future of AI in Sustainable Farming",
                    date: "April 20, 2026",
                    excerpt: "How deep learning is helping reduce pesticide use by identifying diseases early.",
                    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400"
                },
                {
                    title: "Common Tomato Blights and How to Spot Them",
                    date: "April 15, 2026",
                    excerpt: "A guide to early detection of late blight and early blight in tomato crops.",
                    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400"
                },
                {
                    title: "New Update: 99% Accuracy for Wheat Rust",
                    date: "April 10, 2026",
                    excerpt: "Our latest CNN model update brings significant improvements to cereal crop diagnostics.",
                    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
                }
            ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-100">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wider">{post.date}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        Read More <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            ))}
        </div>
    </StaticPageLayout>
);

export default BlogPage;
