import React, { useState, useEffect } from 'react';
import { User, Phone, Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { servicesApi, appointmentsApi } from '../services/api';

export default function BookingForm({ setView }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = React.useRef(null);
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    appointmentDate: null,
    appointmentTime: '',
    service: { id: '' }
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesApi.getActive();
      setServices(response.data.map(s => ({
        label: `${s.name} - ₹${s.price} (${s.duration})`,
        value: s.id,
        ...s
      })));
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load services' });
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        customerName: formData.customerName,
        mobile: formData.mobile,
        appointmentDate: formData.appointmentDate.toISOString().split('T')[0],
        appointmentTime: formData.appointmentTime,
        service: { id: formData.service.id }
      };

      await appointmentsApi.create(appointmentData);
      
      toast.current.show({ 
        severity: 'success', 
        summary: 'Success', 
        detail: '✨ Appointment booked successfully!',
        life: 3000 
      });
      
      setTimeout(() => setView('home'), 2000);
      
      setFormData({
        customerName: '',
        mobile: '',
        appointmentDate: null,
        appointmentTime: '',
        service: { id: '' }
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Failed to book appointment. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24 px-6 flex justify-center items-start">
      <Toast ref={toast} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"
            />
            
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-white" />
              <h2 className="text-4xl font-black text-white mb-2"> Book Your Appointment</h2>
              <p className="text-indigo-100"> Choose your perfect time slot</p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Name</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon bg-indigo-50">
                  <User className="w-5 h-5 text-indigo-600" />
                </span>
                <InputText
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder=" Enter your name"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Mobile Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700"> Mobile Number</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon bg-indigo-50">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </span>
                <InputText
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder=" +91 98765 43210"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Date & Time Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700"> Select Date</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon bg-indigo-50">
                    <CalendarIcon className="w-5 h-5 text-indigo-600" />
                  </span>
                  <Calendar
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.value })}
                    minDate={new Date()}
                    dateFormat="dd/mm/yy"
                    placeholder=" Pick a date"
                    className="w-full"
                    showIcon
                    required
                  />
                </div>
              </div>

              {/* Time Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Select Time</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon bg-indigo-50">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </span>
                  <Dropdown
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({ ...formData, appointmentTime: e.value })}
                    options={timeSlots.map(time => ({ label: time, value: time }))}
                    placeholder=" Select time"
                    className="w-full"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Choose Service</label>
              <Dropdown
                value={formData.service.id}
                onChange={(e) => setFormData({ ...formData, service: { id: e.value } })}
                options={services}
                placeholder=" Select a service"
                className="w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                label={loading ? 'Booking...' : 'Confirm Booking'}
                icon="pi pi-check"
                loading={loading}
                className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-500 border-0 text-lg font-bold font-color-white text-white shadow-xl"
              />
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}