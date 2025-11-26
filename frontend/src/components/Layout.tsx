import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Scissors } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/book', label: 'Book Appointment' },
        { path: '/queue', label: 'Live Queue' },
    ];

    return (
        <div className="min-h-screen bg-light-paper dark:bg-dark-paper text-light-text dark:text-dark-text transition-colors duration-300 font-sans">
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-dark/70 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                <Scissors className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Luxe Salon
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path
                                            ? 'text-primary'
                                            : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {item.label}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
