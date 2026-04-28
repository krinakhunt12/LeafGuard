import { Leaf, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen]       = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { to: '/',              label: 'Home' },
        { to: '/how-it-works',  label: 'How it Works' },
        { to: '/technology',    label: 'Technology' },
        { to: '/forum',         label: 'Community' },
        ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ];

    const isHome = location.pathname === '/';
    const shouldShowSolid = isScrolled || !isHome;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            shouldShowSolid
                ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3'
                : 'bg-transparent py-5'
        }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-200 group-hover:scale-105 transform">
                        <Leaf className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 font-display tracking-tight">LeafGuard</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`text-sm font-medium transition-colors duration-200 relative group ${
                                isActive(to) ? 'text-primary' : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {label}
                            {/* Underline indicator */}
                            <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                                isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </Link>
                    ))}

                    <div className="h-5 w-px bg-slate-200 mx-1" />

                    <Link to="/analyze">
                        <Button size="sm">Analyze Leaf</Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-700">Hi, {user.fullName.split(' ')[0]}</span>
                            <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                            <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
                        </div>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isOpen ? 'close' : 'open'}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden bg-white border-b border-slate-100"
                    >
                        <div className="px-4 pb-5 pt-2 space-y-1">
                            {navLinks.map(({ to, label }, i) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04, duration: 0.25 }}
                                >
                                    <Link
                                        to={to}
                                        className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isActive(to)
                                                ? 'bg-primary/8 text-primary'
                                                : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="pt-3 grid grid-cols-2 gap-2.5 px-1">
                                {user ? (
                                    <Button variant="ghost" className="col-span-2 justify-start" onClick={logout}>
                                        Logout ({user.fullName})
                                    </Button>
                                ) : (
                                    <>
                                        <Link to="/login"><Button variant="ghost" className="w-full">Login</Button></Link>
                                        <Link to="/signup"><Button className="w-full">Sign Up</Button></Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
