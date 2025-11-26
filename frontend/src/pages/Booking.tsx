import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { toast } from 'react-toastify';
import { getActiveServices, createAppointment, type Service } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Booking: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        serviceId: 0,
        date: startOfToday(),
        time: '',
        customerName: '',
        mobile: '',
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getActiveServices();
                setServices(data);
            } catch (error) {
                toast.error('Failed to load services. Please try again later.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleServiceSelect = (serviceId: number) => {
        setFormData({ ...formData, serviceId });
        setStep(2);
    };

    const handleDateSelect = (date: Date) => {
        setFormData({ ...formData, date });
    };

    const handleTimeSelect = (time: string) => {
        setFormData({ ...formData, time });
        setStep(3);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const selectedService = services.find(s => s.id === formData.serviceId);
            if (!selectedService) throw new Error('Service not found');

            await createAppointment({
                customerName: formData.customerName,
                mobile: formData.mobile,
                appointmentDate: format(formData.date, 'yyyy-MM-dd'),
                appointmentTime: formData.time + ':00', // Backend expects HH:mm:ss
                service: selectedService,
            });

            toast.success('Appointment booked successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to book appointment. Please try again.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    // Generate next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));

    // Generate time slots (10 AM to 8 PM)
    const timeSlots = Array.from({ length: 20 }, (_, i) => {
        const hour = Math.floor(i / 2) + 10;
        const minute = i % 2 === 0 ? '00' : '30';
        return `${hour}:${minute}`;
    });

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${step >= s
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span>Service</span>
                    <span>Date & Time</span>
                    <span>Details</span>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-paper rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 min-h-[400px]">
                <AnimatePresence mode="wait" custom={step}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CalendarIcon className="w-6 h-6 text-primary" />
                                Select Service
                            </h2>
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => handleServiceSelect(service.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${formData.serviceId === service.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg">{service.name}</h3>
                                                <span className="font-bold text-primary">${service.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{service.description}</p>
                                            <div className="flex items-center text-xs text-gray-400 gap-1">
                                                <Clock className="w-3 h-3" />
                                                {service.duration}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-primary" />
                                Select Date & Time
                            </h2>

                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Select Date</h3>
                                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                    {dates.map((date) => (
                                        <button
                                            key={date.toISOString()}
                                            onClick={() => handleDateSelect(date)}
                                            className={`flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center border-2 transition-all ${isSameDay(formData.date, date)
                                                ? 'bg-primary text-white border-primary shadow-lg scale-105'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                                }`}
                                        >
                                            <span className="text-xs font-medium opacity-80">{format(date, 'EEE')}</span>
                                            <span className="text-xl font-bold">{format(date, 'd')}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Select Time</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${formData.time === time
                                                ? 'bg-primary text-white border-primary'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <User className="w-6 h-6 text-primary" />
                                Your Details
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Service</span>
                                        <span className="font-medium">{services.find(s => s.id === formData.serviceId)?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Date</span>
                                        <span className="font-medium">{format(formData.date, 'MMMM d, yyyy')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Time</span>
                                        <span className="font-medium">{formData.time}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center gap-2"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'Booking...' : 'Confirm Booking'}
                                        {!submitting && <ChevronRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Booking;
