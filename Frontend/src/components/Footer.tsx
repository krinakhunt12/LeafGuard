import { Leaf, Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail('');
    };

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
                                { icon: <Twitter  className="w-3.5 h-3.5" />, href: '#' },
                                { icon: <Linkedin className="w-3.5 h-3.5" />, href: '#' },
                                { icon: <Github   className="w-3.5 h-3.5" />, href: 'https://github.com' },
                            ].map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                    className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 transition-colors duration-200"
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            {[
                                { to: '/',              label: 'Home' },
                                { to: '/analyze',       label: 'Disease Analysis' },
                                { to: '/how-it-works',  label: 'How it Works' },
                                { to: '/technology',    label: 'CNN Model' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="hover:text-primary transition-colors duration-150 group inline-flex items-center gap-1">
                                        {label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5 transition-all duration-150" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            {[
                                { to: '/insurance-portal', label: 'Insurance Portal' },
                                { to: '/api-docs', label: 'API Documentation' },
                                { to: '/privacy',  label: 'Privacy Policy' },
                                { to: '/terms',    label: 'Terms of Service' },
                                { to: '/blog',     label: 'Agricultural Blog' },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="hover:text-primary transition-colors duration-150 group inline-flex items-center gap-1">
                                        {label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5 transition-all duration-150" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-5 text-sm">Newsletter</h4>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            Get the latest updates on plant disease research and AI breakthroughs.
                        </p>
                        {subscribed ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 text-sm text-primary bg-primary/8 border border-primary/15 rounded-xl px-4 py-3"
                            >
                                <Leaf className="w-4 h-4 shrink-0" />
                                Thanks! You're subscribed.
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-dark transition-colors duration-200 active:scale-95"
                                >
                                    <Mail className="w-4 h-4" />
                                </button>
                            </form>
                        )}
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
