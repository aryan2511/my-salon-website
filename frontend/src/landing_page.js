import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, Users, Scissors, Star, Menu, X, ChevronRight, Map as MapIcon } from 'lucide-react';

// --- MOCK DATA & CONFIGURATION ---
// In a real Spring Boot app, these would come from your API
const SERVICES = [
  { id: 1, name: 'Haircut & Styling', duration: '45 mins', price: '$45' },
  { id: 2, name: 'Beard Trim', duration: '30 mins', price: '$25' },
  { id: 3, name: 'Full Color', duration: '2 hrs', price: '$120' },
  { id: 4, name: 'Facial Treatment', duration: '60 mins', price: '$80' },
];

// Google Maps Embed URL (Placeholder - replace with your specific location embed link)
const GOOGLE_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622647437976!5m2!1sen!2sus";

export default function SalonApp() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState('home'); // 'home', 'booking', 'queue'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    date: '',
    time: '',
    serviceId: ''
  });
  
  // Queue State
  const [queue, setQueue] = useState([
    { id: 101, name: 'Sarah J.', type: 'appointment', time: '10:00 AM', status: 'In Chair' },
    { id: 102, name: 'Mike R.', type: 'walk-in', time: 'Waiting (15m)', status: 'Waiting' },
    { id: 103, name: 'Jessica T.', type: 'appointment', time: '10:30 AM', status: 'Next' },
  ]);

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to Spring Boot Backend
    // fetch('/api/appointments', { method: 'POST', body: JSON.stringify(formData) ... })
    
    alert(`Appointment Request Sent!\nName: ${formData.name}\nMobile: ${formData.mobile}\nTime: ${formData.date} ${formData.time}`);
    setFormData({ name: '', mobile: '', date: '', time: '', serviceId: '' });
    setView('home');
  };

  const handleJoinQueue = (e) => {
    e.preventDefault();
    // TODO: Connect to Spring Boot Backend
    // fetch('/api/queue/join', { method: 'POST', body: JSON.stringify({ name: formData.name, mobile: formData.mobile, type: 'walk-in' }) ... })

    const newEntry = {
      id: Date.now(),
      name: formData.name,
      type: 'walk-in',
      time: 'Just now',
      status: 'Waiting'
    };
    setQueue([...queue, newEntry]);
    alert("You've been added to the queue!");
    setFormData({ ...formData, name: '', mobile: '' }); // Clear only personal info
  };

  // --- COMPONENTS ---

  const Navbar = () => (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="bg-indigo-600 p-2 rounded-lg">
          <Scissors className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-indigo-900">LuxeSalon</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <button onClick={() => setView('home')} className={`hover:text-indigo-600 transition ${view === 'home' ? 'text-indigo-600' : ''}`}>Home</button>
        <button onClick={() => setView('booking')} className={`hover:text-indigo-600 transition ${view === 'booking' ? 'text-indigo-600' : ''}`}>Book Now</button>
        <button onClick={() => setView('queue')} className={`hover:text-indigo-600 transition ${view === 'queue' ? 'text-indigo-600' : ''}`}>Live Queue</button>
        <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
      </div>

      <div className="hidden md:block">
        <button 
          onClick={() => setView('booking')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold transition shadow-lg shadow-indigo-200"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="text-gray-700" /> : <Menu className="text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col p-4 gap-4 md:hidden animate-in slide-in-from-top-5">
          <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-left py-2 border-b">Home</button>
          <button onClick={() => { setView('booking'); setIsMenuOpen(false); }} className="text-left py-2 border-b">Book Appointment</button>
          <button onClick={() => { setView('queue'); setIsMenuOpen(false); }} className="text-left py-2 border-b">Live Queue</button>
          <button onClick={() => { setView('booking'); setIsMenuOpen(false); }} className="bg-indigo-600 text-white py-2 rounded-lg">Sign Up</button>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-950 leading-tight">
            Appointment <br />
            <span className="text-indigo-600">Booking</span> Made <br />
            Simple.
          </h1>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Experience the easiest way to manage your style. Book online, join our smart queue, or visit us today.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setView('booking')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition transform duration-200 flex items-center gap-2"
            >
              Book Now <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('queue')}
              className="bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition flex items-center gap-2"
            >
              Check Queue <Users className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Illustration Area - Mimicking the uploaded image style using CSS/Icons */}
        <div className="relative hidden md:block">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-indigo-50 relative z-10">
            {/* Header of the mock interface */}
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono">August 2025</div>
            </div>
            
            {/* Calendar Grid Mock */}
            <div className="grid grid-cols-7 gap-2 mb-6 text-center">
              {/* Fixed key issue by using index */}
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-xs font-bold text-gray-400">{d}</div>
              ))}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`text-sm p-2 rounded-lg ${i === 14 ? 'bg-indigo-500 text-white shadow-lg scale-110' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {i+1}
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute -left-12 top-1/2 bg-white p-4 rounded-xl shadow-xl border border-purple-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-800">Confirmed</div>
                <div className="text-xs text-gray-500">Your slot is reserved</div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-12 bg-white p-4 rounded-xl shadow-xl border border-pink-100 flex items-center gap-3 animate-pulse">
               <div className="bg-pink-100 p-2 rounded-full">
                <MapPin className="w-6 h-6 text-pink-500" />
              </div>
               <div className="text-xs font-bold text-gray-800">5km Away</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingForm = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center items-start">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white">Book Appointment</h2>
          <p className="text-indigo-100 mt-2">Select a time that works for you</p>
        </div>
        
        <form onSubmit={handleBookingSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                required
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <select 
              name="serviceId"
              value={formData.serviceId}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
            >
              <option value="">Select a Service</option>
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );

  const QueueView = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Queue Status</h2>
          <p className="text-gray-600">See who is ahead of you or join the waiting list instantly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Join Queue Card */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-indigo-500 h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Walk-in Check-in</h3>
            <p className="text-sm text-gray-500 mb-6">No appointment? No problem. Add yourself to the list.</p>
            <form onSubmit={handleJoinQueue} className="space-y-4">
              <input 
                required
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
              <input 
                required
                type="tel" 
                name="mobile"
                placeholder="Mobile Number" 
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Join Queue
              </button>
            </form>
          </div>

          {/* The Queue List */}
          <div className="md:col-span-2 space-y-4">
            {queue.map((customer, index) => (
              <div key={customer.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-indigo-400">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{customer.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded-full ${customer.type === 'appointment' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {customer.type === 'appointment' ? 'Booked Online' : 'Walk-in'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{customer.time}</div>
                  <div className="text-xs text-indigo-500 font-medium">{customer.status}</div>
                </div>
              </div>
            ))}
            
            <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-500 text-sm border border-dashed border-gray-300">
              End of Queue
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationSection = () => (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 rounded-3xl overflow-hidden shadow-2xl bg-gray-900 text-white">
          <div className="p-10 md:w-1/3 flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Fashion Avenue,<br/>New York, NY 10018</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-400 w-5 h-5" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-400 w-5 h-5" />
                <span>Mon-Sat: 9am - 8pm</span>
              </div>
            </div>
            <button className="bg-white text-gray-900 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <MapIcon className="w-4 h-4" /> Get Directions
            </button>
          </div>
          <div className="md:w-2/3 h-80 md:h-auto bg-gray-800 relative">
            <iframe 
              src={GOOGLE_MAP_EMBED_URL}
              width="100%" 
              height="100%" 
              style={{border:0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)'}} 
              allowFullScreen="" 
              loading="lazy"
              title="Shop Location"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-indigo-900/10"></div>
          </div>
        </div>
      </div>
    </section>
  );

  // --- MAIN RENDER ---
  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen">
      <Navbar />

      {view === 'home' && (
        <>
          <Hero />
          {/* Services Preview */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Services</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {SERVICES.map((service) => (
                  <div key={service.id} className="p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition duration-300 group cursor-pointer" onClick={() => setView('booking')}>
                    <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 transition">
                      <Star className="w-6 h-6 text-indigo-600 group-hover:text-white transition" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-500 text-sm">{service.duration}</p>
                    <p className="text-indigo-600 font-bold mt-2">{service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <LocationSection />
        </>
      )}

      {view === 'booking' && <BookingForm />}
      
      {view === 'queue' && <QueueView />}

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          &copy; 2025 LuxeSalon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}