import React from 'react';
import { CheckCircle, MapPin, ChevronRight, Users, Sparkles, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function Hero({ setView }) {
  const stats = [
    { icon: Award, label: 'Expert Stylists', value: '15+' },
    { icon: Users, label: 'Happy Clients', value: '5000+' },
    { icon: Clock, label: 'Years Experience', value: '10+' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div 
          animate={{ 
            y: [-20, 20, -20],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">Premium Hair Salon Experience</span>
          </motion.div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">
            <span className="text-gray-900">Your Style,</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Passion
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
            Experience luxury styling with India's top-rated salon. Book instantly, 
            skip the wait, and transform your look today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => setView('booking')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Appointment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>

            <motion.button
              onClick={() => setView('queue')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 border-2 border-indigo-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition flex items-center gap-2 shadow-xl"
            >
              <Users className="w-5 h-5" /> Check Queue
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - 3D Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable={true}
            glareMaxOpacity={0.3}
            scale={1.02}
            transitionSpeed={2000}
          >
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6 border-b pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="text-xs font-bold text-gray-400 text-center">{d}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, backgroundColor: '#6366f1' }}
                    className={`text-sm p-3 rounded-lg text-center cursor-pointer transition ${
                      i === 14 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-110 font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-16 top-1/3 bg-white p-4 rounded-2xl shadow-2xl border border-green-100 flex items-center gap-3"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Confirmed</div>
                  <div className="text-xs text-gray-500">Slot Reserved</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-12 bottom-20 bg-white p-4 rounded-2xl shadow-2xl border border-pink-100 flex items-center gap-3"
              >
                <div className="bg-pink-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-sm font-bold text-gray-800">Nearby</div>
              </motion.div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
}