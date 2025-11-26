import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        Style Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Confidence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        Experience premium hair styling with our expert stylists. Book your appointment seamlessly or join our live queue.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/book"
                            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <Calendar className="w-5 h-5" />
                            Book Appointment
                        </Link>
                        <Link
                            to="/queue"
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-full font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <Users className="w-5 h-5" />
                            Join Live Queue
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white dark:bg-dark-paper shadow-xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors group">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Easy Booking</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Schedule your visit in seconds. Choose your favorite stylist and preferred time slot with our intuitive booking system.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white dark:bg-dark-paper shadow-xl border border-gray-100 dark:border-gray-800 hover:border-secondary/50 transition-colors group">
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                        <Users className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Smart Queue</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Walk-in? No problem. Join our virtual queue and track your estimated wait time live from your phone.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white dark:bg-dark-paper shadow-xl border border-gray-100 dark:border-gray-800 hover:border-purple-500/50 transition-colors group">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <Clock className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Real-time Updates</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Stay informed with instant notifications about your appointment status and queue position.
                    </p>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Home;
