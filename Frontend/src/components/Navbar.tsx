import { Leaf, Menu, X, Github, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3'
                : 'bg-transparent py-5'
        }`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                        <Leaf className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 font-display tracking-tight">
                        LeafGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/how-it-works', label: 'How it Works' },
                        { to: '/technology', label: 'Technology' },
                        ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`text-sm font-medium transition-colors duration-200 ${
                                isActive(to)
                                    ? 'text-primary'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}

                    <div className="h-5 w-px bg-slate-200 mx-1" />

                    <Link to="/analyze">
                        <Button size="sm" className="gap-1.5">
                            Analyze Leaf
                        </Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">Hi, {user.full_name.split(' ')[0]}</span>
                            <Button variant="ghost" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-5 space-y-1 animate-fade-in">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/how-it-works', label: 'How it Works' },
                        { to: '/analyze', label: 'Analyze Leaf' },
                        { to: '/technology', label: 'Technology' },
                        ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive(to)
                                    ? 'bg-primary/8 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="pt-3 flex items-center gap-3 px-1">
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center gap-2 text-sm text-slate-500 px-3 py-2 rounded-lg hover:bg-slate-50"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            {isDark ? 'Light' : 'Dark'} Mode
                        </button>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="gap-1.5">
                                <Github className="w-4 h-4" /> GitHub
                            </Button>
                        </a>
                    </div>
                    {!user && (
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full">Login</Button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)}>
                                <Button className="w-full">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                    {user && (
                        <div className="pt-4">
                            <Button variant="ghost" className="w-full justify-start" onClick={() => { logout(); setIsOpen(false); }}>
                                Logout ({user.full_name})
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
