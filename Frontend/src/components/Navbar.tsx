import { Leaf, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    // Transparent navbar on home page top
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // const toggleDarkMode = () => {
    //     setIsDark(!isDark);
    //     document.documentElement.classList.toggle('dark');
    // };

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/how-it-works', label: 'How it Works' },
        { to: '/technology', label: 'Technology' },
        { to: '/forum', label: 'Community' },
        ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    ];

    const navBg = isHomePage 
        ? (isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-6')
        : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm';

    const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-slate-900';
    const subTextColor = isHomePage && !isScrolled ? 'text-white/70' : 'text-slate-500';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${navBg}`}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group relative z-10">
                    <motion.div 
                        whileHover={{ rotate: 15 }}
                        className={`p-2 rounded-xl transition-colors duration-300 ${isHomePage && !isScrolled ? 'bg-white/20' : 'bg-primary/10'}`}
                    >
                        <Leaf className={`${isHomePage && !isScrolled ? 'text-white' : 'text-primary'} w-6 h-6`} />
                    </motion.div>
                    <span className={`text-xl font-black font-display tracking-tight transition-colors duration-300 ${textColor}`}>
                        LeafGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-1">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-xl relative group ${
                                    isActive(to)
                                        ? (isHomePage && !isScrolled ? 'text-white' : 'text-primary')
                                        : (isHomePage && !isScrolled ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                                }`}
                            >
                                {label}
                                {isActive(to) && (
                                    <motion.div 
                                        layoutId="navUnderline"
                                        className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${isHomePage && !isScrolled ? 'bg-white' : 'bg-primary'}`} 
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className={`h-6 w-px ${isHomePage && !isScrolled ? 'bg-white/20' : 'bg-slate-200'} mx-2`} />

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${subTextColor}`}>Farmer</span>
                                    <span className={`text-sm font-bold ${textColor}`}>{user.full_name.split(' ')[0]}</span>
                                </div>
                                <Button 
                                    variant={isHomePage && !isScrolled ? "outline" : "ghost"} 
                                    size="sm" 
                                    onClick={logout}
                                    className={isHomePage && !isScrolled ? "border-white/20 text-white hover:bg-white/10" : ""}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <span className={`text-xs font-black uppercase tracking-widest transition-colors ${textColor} hover:opacity-70`}>Login</span>
                                </Link>
                                <Link to="/signup">
                                    <Button size="sm" className="rounded-xl px-6 bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    className={`md:hidden p-2 rounded-xl transition-colors ${isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 space-y-2">
                            {navLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                                        isActive(to)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                            
                            <div className="pt-6 grid grid-cols-2 gap-4">
                                {!user ? (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                                            <Button variant="ghost" className="w-full rounded-2xl uppercase text-[10px] font-black tracking-widest">Login</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full">
                                            <Button className="w-full rounded-2xl uppercase text-[10px] font-black tracking-widest">Sign Up</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Button 
                                        variant="ghost" 
                                        className="w-full col-span-2 rounded-2xl uppercase text-[10px] font-black tracking-widest justify-between" 
                                        onClick={() => { logout(); setIsOpen(false); }}
                                    >
                                        Logout <span className="text-slate-400 font-medium">({user.full_name})</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
