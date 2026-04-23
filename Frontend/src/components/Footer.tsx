import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <Leaf className="text-white w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-slate-900 tracking-tight">
                                LeafGuard
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Leading the revolution in sustainable agriculture through AI-driven diagnostics and precision plant health monitoring.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:text-primary hover:border-primary transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link to="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
                            <li><Link to="/analyze" className="hover:text-slate-900 transition-colors">Analysis Tool</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-slate-900 transition-colors">Methodology</Link></li>
                            <li><Link to="/technology" className="hover:text-slate-900 transition-colors">Architecture</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Data Processing</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Compliance</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Research Updates</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Stay informed on plant pathology and neural architecture developments.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 bg-slate-50 border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button className="bg-slate-900 text-white px-3 rounded hover:bg-slate-800 transition-colors">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <p>© 2026 LeafGuard AI Systems. Developed by Krina.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-900 transition-colors">Service Status</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Infrastructure</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
