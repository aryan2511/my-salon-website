import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import QueueView from './components/QueueView';
import LocationSection from './components/LocationSection';
import { servicesApi } from './services/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Sparkles, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StylistShowcase from './components/StylistShowcase';
import ServicesList from './components/ServicesList';
import StylistDashboard from './components/StylistDashboard';

function App() {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (view === 'home') {
      fetchServices();
    }
  }, [view]);

  const fetchServices = async () => {
    try {
      const response = await servicesApi.getActive();
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen">
      <Navbar
        view={view}
        setView={setView}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {view === 'home' && (
        <>
          <Hero setView={setView} />
          {/* Services Preview - Enhanced */}
          <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-indigo-600">Premium Services</span>
                </div>
                <h2 className="text-5xl font-black mb-4">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Our Signature Services
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Experience luxury styling with our expert team and premium products
                </p>
              </motion.div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                    onClick={() => setView('booking')}
                  >
                    <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {/* Service Image or Icon */}
                      {service.imageUrl ? (
                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                          <motion.img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white">{service.name}</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center rounded-t-xl">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/20 backdrop-blur-sm p-6 rounded-full"
                          >
                            <Star className="w-12 h-12 text-white" />
                          </motion.div>
                        </div>
                      )}

                      {/* Service Details */}
                      <div className="p-6 space-y-4">
                        {!service.imageUrl && (
                          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{service.duration}</span>
                          </div>
                          <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ₹{service.price}
                          </div>
                        </div>

                        {service.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:shadow-lg transition"
                        >
                          Book Now
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </motion.button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button
                  label="View All Services"
                  icon="pi pi-arrow-right"
                  className="p-button-outlined p-button-lg"
                  onClick={() => setView('services')}
                />
              </motion.div>
            </div>
          </section>

          <StylistShowcase />
          <LocationSection />
        </>
      )}

      {view === 'booking' && <BookingForm setView={setView} />}

      {view === 'queue' && <QueueView />}

      {view === 'services' && <ServicesList setView={setView} />}

      {view === 'stylist-dashboard' && <StylistDashboard />}

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; 2025 Made with ❤ by Aryan
        </div>
      </footer>
    </div>
  );
}

export default App;
