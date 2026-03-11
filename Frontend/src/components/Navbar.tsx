import { Leaf, Menu, X, Github, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                        <Leaf className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light font-display">
                        LeafGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/how-it-works"
                        className={`text-sm font-bold transition-colors ${isActive('/how-it-works') ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                    >
                        How it Works
                    </Link>
                    <Link
                        to="/analyze"
                        className={`text-sm font-bold transition-colors font-display px-4 py-2 rounded-xl border transition-all ${isActive('/analyze')
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                            : 'bg-primary/5 text-primary border-primary/10 hover:bg-primary/10'}`}
                    >
                        Analyze Leaf
                    </Link>
                    <Link
                        to="/technology"
                        className={`text-sm font-bold transition-colors ${isActive('/technology') ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
                    >
                        Technology
                    </Link>
                    <div className="h-6 w-px bg-slate-200"></div>

                    <button
                        onClick={toggleDarkMode}
                        className="p-2 text-slate-500 hover:text-primary transition-colors"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Github className="w-4 h-4" />
                            Github
                        </Button>
                    </a>
                </div>

                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-4 space-y-4 shadow-lg animate-fade-in">
                    <Link to="/" onClick={() => setIsOpen(false)} className={`block text-lg font-bold py-2 ${isActive('/') ? 'text-primary' : 'text-slate-600'}`}>Home</Link>
                    <Link to="/how-it-works" onClick={() => setIsOpen(false)} className={`block text-lg font-bold py-2 ${isActive('/how-it-works') ? 'text-primary' : 'text-slate-600'}`}>How it Works</Link>
                    <Link to="/analyze" onClick={() => setIsOpen(false)} className={`block text-lg font-bold py-2 ${isActive('/analyze') ? 'text-primary' : 'text-slate-600'}`}>Analyze Leaf</Link>
                    <Link to="/technology" onClick={() => setIsOpen(false)} className={`block text-lg font-bold py-2 ${isActive('/technology') ? 'text-primary' : 'text-slate-600'}`}>Technology</Link>

                    <div className="pt-4 flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center gap-2 text-slate-600"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            <span>{isDark ? 'Light' : 'Dark'} Mode</span>
                        </button>
                    </div>
                    <Button className="w-full gap-2">
                        <Github className="w-4 h-4" />
                        Github
                    </Button>
                </div>
            )}
        </nav>
    );
};

