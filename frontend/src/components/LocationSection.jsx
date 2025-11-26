import React from 'react';
import { Phone, Clock, MapPin as MapIcon } from 'lucide-react';

const GOOGLE_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d292.4870013688046!2d73.07765108489815!3d19.049094698014635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1763637311252!5m2!1sen!2sin";
export default function LocationSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 rounded-3xl overflow-hidden shadow-2xl bg-gray-900 text-white">
          <div className="p-10 md:w-1/3 flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">Visit Us</h3>
              <p className="text-gray-300">Shop no. 7, Building-Name,<br/>Sector-19, Kharghar</p>  {/* Sector-19, Kharghar,  */}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-400 w-5 h-5" />
                <span>+91-123456789</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-400 w-5 h-5" />
                <span>Tuesday-Sunday: 7am - 11pm</span>
              </div>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-900 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <MapIcon className="w-4 h-4" /> Get Directions
            </a>
          </div>
          <div className="md:w-2/3 h-80 md:h-auto bg-gray-800 relative">
            <iframe 
              src={GOOGLE_MAP_EMBED_URL}
              width="100%" 
              height="100%" 
              style={{border:0, filter: 'contrast(1.2) opacity(0.8)'}} 
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
}