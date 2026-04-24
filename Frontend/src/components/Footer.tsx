import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-5">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Leaf className="text-primary w-4 h-4" />
                            </div>
                            <span className="text-base font-bold text-slate-900 font-display">LeafGuard</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Leading the revolution in sustainable agriculture through AI-driven plant health diagnostics.
                        </p>
                        <div className="flex items-center gap-2">
                            {[
                                { icon: <Twitter className="w-3.5 h-3.5" />, href: '#' },
                                { icon: <Linkedin className="w-3.5 h-3.5" />, href: '#' },
                                { icon: <Github className="w-3.5 h-3.5" />, href: 'https://github.com' },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-colors duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/" className="hover:text-primary transition-colors duration-150">Home</Link></li>
                            <li><Link to="/analyze" className="hover:text-primary transition-colors duration-150">Disease Analysis</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-primary transition-colors duration-150">How it Works</Link></li>
                            <li><Link to="/technology" className="hover:text-primary transition-colors duration-150">CNN Model</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/api-docs" className="hover:text-primary transition-colors duration-150">API Documentation</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors duration-150">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary transition-colors duration-150">Terms of Service</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors duration-150">Agricultural Blog</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Newsletter</h4>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            Get the latest updates on plant disease research and AI breakthroughs.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                            />
                            <button className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
                    <p>© 2026 LeafGuard AI. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        {['Cookies', 'Security', 'Compliance'].map(l => (
                            <a key={l} href="#" className="hover:text-primary transition-colors duration-150">{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
