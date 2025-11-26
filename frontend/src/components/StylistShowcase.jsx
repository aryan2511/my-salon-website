import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'primereact/card';
import { Instagram, Twitter, Scissors, Star } from 'lucide-react';

const STYLISTS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Master Stylist",
        specialty: "Color Specialist",
        image: "https://images.unsplash.com/photo-1595959183082-7bce70848679?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 128
    },
    {
        id: 2,
        name: "David Chen",
        role: "Senior Stylist",
        specialty: "Precision Cuts",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        reviews: 95
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Creative Director",
        specialty: "Bridal & Events",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
        rating: 5.0,
        reviews: 210
    },
    {
        id: 4,
        name: "Marcus Johnson",
        role: "Barber Specialist",
        specialty: "Men's Grooming",
        image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 156
    }
];

export default function StylistShowcase() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full mb-4">
                        <Scissors className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-600">Meet The Team</span>
                    </div>
                    <h2 className="text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Expert Stylists
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Talented professionals dedicated to making you look and feel your best
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STYLISTS.map((stylist, index) => (
                        <motion.div
                            key={stylist.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="h-full border-0 shadow-xl overflow-hidden group relative">
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden">
                                    <motion.img
                                        src={stylist.image}
                                        alt={stylist.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Social Overlay */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-pink-600 transition-colors">
                                            <Instagram className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-400 transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold">{stylist.rating}</span>
                                            <span className="text-white/60 text-sm">({stylist.reviews})</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">{stylist.name}</h3>
                                        <p className="text-indigo-200 font-medium">{stylist.role}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-4 bg-white">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-gray-500">Specialty</span>
                                        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                            {stylist.specialty}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
