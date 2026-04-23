import { Leaf, Menu, X, Github, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
                isScrolled ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3' : 'bg-white border-transparent py-4'
            }`}
        >
            <div className="max-w-5xl mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                        <Leaf className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">
                        LeafGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'How it Works', path: '/how-it-works' },
                        { name: 'Technology', path: '/technology' }
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                                isActive(item.path) 
                                    ? 'text-primary bg-primary/5' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    
                    <div className="w-px h-4 bg-slate-200 mx-4" />

                    <Link to="/analyze">
                        <Button size="sm" variant="primary" className="rounded-md">
                            Analyze Leaf
                        </Button>
                    </Link>
                </div>

                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 space-y-2 shadow-sm"
                    >
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'How it Works', path: '/how-it-works' },
                            { name: 'Technology', path: '/technology' },
                            { name: 'Analyze Leaf', path: '/analyze' }
                        ].map((item) => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                onClick={() => setIsOpen(false)} 
                                className={`block px-4 py-3 text-base font-medium rounded-md ${
                                    isActive(item.path) ? 'text-primary bg-primary/5' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
