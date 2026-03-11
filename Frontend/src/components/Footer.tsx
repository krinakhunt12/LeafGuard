import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {

    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-lg">
                                <Leaf className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900	">
                                LeafGuard
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Leading the revolution in sustainable agriculture through AI-driven plant health diagnostics.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-primary transition-colors shadow-sm">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-primary transition-colors shadow-sm">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://github.com" className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 hover:text-primary transition-colors shadow-sm">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/analyze" className="hover:text-primary transition-colors">Disease Analysis</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link to="/technology" className="hover:text-primary transition-colors">CNN Model</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Agricultural Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            Get the latest updates on plant disease research and AI breakthroughs.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
                    <p>© 2026 LeafGuard AI. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Cookies</a>
                        <a href="#" className="hover:text-primary transition-colors">Security</a>
                        <a href="#" className="hover:text-primary transition-colors">Compliance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
