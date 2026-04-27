import { Leaf, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-50 pt-24 pb-12 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">

                    {/* Brand & Mission */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="bg-primary/10 p-2.5 rounded-xl group-hover:rotate-12 transition-transform">
                                <Leaf className="text-primary w-5 h-5" />
                            </div>
                            <span className="text-xl font-black text-slate-900 font-display tracking-tight uppercase">LeafGuard</span>
                        </Link>
                        <p className="text-slate-400 text-base leading-relaxed max-w-sm font-medium italic">
                            "Revolutionizing global food security through high-fidelity spectral analysis and digital pathology."
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: <Twitter className="w-4 h-4" />, href: '#' },
                                { icon: <Linkedin className="w-4 h-4" />, href: '#' },
                                { icon: <Github className="w-4 h-4" />, href: 'https://github.com' },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
                        <div>
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-8 border-l-2 border-primary pl-4">Platform</h4>
                            <ul className="space-y-4">
                                {[
                                    { to: '/', l: 'Home' },
                                    { to: '/analyze', l: 'Disease Analysis' },
                                    { to: '/how-it-works', l: 'How it Works' },
                                    { to: '/technology', l: 'CNN Model' }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link to={item.to} className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 group">
                                            {item.l} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-8 border-l-2 border-primary pl-4">Resources</h4>
                            <ul className="space-y-4">
                                {[
                                    { to: '/api-docs', l: 'API Documentation' },
                                    { to: '/privacy', l: 'Privacy Policy' },
                                    { to: '/terms', l: 'Terms of Service' },
                                    { to: '/blog', l: 'Agricultural Blog' }
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link to={item.to} className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 group">
                                            {item.l} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-8">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-8 border-l-2 border-primary pl-4">Contact</h4>
                            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Direct Channel</p>
                                <a href="mailto:intelligence@leafguard.ai" className="text-sm font-black text-slate-900 hover:text-primary transition-colors">
                                    intel@leafguard.ai
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        © {currentYear} LeafGuard Precision Agriculture. Built for Sustainable Yields.
                    </p>
                    <div className="flex items-center gap-8">
                        {['Cookies', 'Security', 'Compliance'].map(l => (
                            <a key={l} href="#" className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-primary transition-colors">{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
