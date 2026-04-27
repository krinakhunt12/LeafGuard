import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight,BookOpen, Clock } from 'lucide-react';
import { StaticPageLayout } from '../../components/StaticPageLayout';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Sustainable Management of Late Blight in Potato Crops",
      excerpt: "Exploring the integration of AI-driven early detection systems with organic copper-based treatment protocols.",
      author: "Dr. Ananya Sharma",
      date: "Oct 24, 2023",
      category: "Disease Control",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Future of Precision Agriculture in South Asia",
      excerpt: "How mobile-first neural mapping is bridging the gap between small-scale farmers and advanced pathology.",
      author: "Rajesh Patel",
      date: "Oct 18, 2023",
      category: "AgriTech",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Soil Health: The First Line of Defense Against Fungi",
      excerpt: "Understanding the correlation between nutrient density and plant immune response to airborne spores.",
      author: "Krina Khunt",
      date: "Oct 12, 2023",
      category: "Soil Science",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <StaticPageLayout 
      title="Agricultural" 
      highlight="Insights" 
      subtitle="Expert perspectives on plant pathology, precision farming, and sustainable yields."
    >
      <div className="space-y-20">
        {/* Featured Post (Luxury Banner Style) */}
        <div className="group relative rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 cursor-pointer">
           <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=1200" 
                   alt="Featured" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">Featured Insight</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">15 min read</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary transition-colors">
                    Maximizing Harvest Resilience in the Era of Climate Volatility
                 </h2>
                 <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium italic">
                    "A data-driven approach to crop security is no longer an option—it's a necessity for modern food systems."
                 </p>
                 <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs">LG</div>
                    <div>
                       <p className="text-xs font-black text-slate-900">LeafGuard Editorial</p>
                       <p className="text-[10px] text-slate-400 font-bold">Scientific Research Lead</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 pb-12 border-b border-slate-100">
           {['All Updates', 'Pathology', 'Farming Tech', 'Yield Reports', 'Case Studies'].map((cat, i) => (
             <button key={i} className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-[2.5rem] overflow-hidden mb-8 border border-slate-100 shadow-sm aspect-video">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-primary uppercase tracking-widest">{post.category}</span>
                   <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {post.readTime}
                   </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100" />
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{post.author}</span>
                   </div>
                   <button className="text-primary hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup (Luxury Style) */}
        <div className="bg-slate-950 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(22,163,74,0.15),_transparent_70%)]" />
           <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black text-primary uppercase tracking-widest border border-white/10">
                <BookOpen className="w-3 h-3" /> Weekly Agri-Intel
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Get the latest Field <br />Intelligence in your inbox
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all font-medium"
                 />
                 <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    Subscribe
                 </button>
              </div>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                 Join 5,000+ modern farmers worldwide.
              </p>
           </div>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default Blog;
