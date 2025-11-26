import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Clock, UserPlus, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { getWaitingQueue, joinQueue, getActiveServices, type QueueEntry, type Service } from '../services/api';

const Queue: React.FC = () => {
    const [queue, setQueue] = useState<QueueEntry[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        customerName: '',
        mobile: '',
        serviceId: 0,
    });

    const fetchData = async () => {
        try {
            const [queueData, servicesData] = await Promise.all([
                getWaitingQueue(),
                getActiveServices()
            ]);
            setQueue(queueData);
            setServices(servicesData);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load queue data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Poll every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleJoinQueue = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const selectedService = services.find(s => s.id === formData.serviceId);

            await joinQueue({
                customerName: formData.customerName,
                mobile: formData.mobile,
                type: 'WALK_IN',
                service: selectedService,
            });

            toast.success('Joined queue successfully!');
            setShowJoinForm(false);
            setFormData({ customerName: '', mobile: '', serviceId: 0 });
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Failed to join queue');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Live Queue</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Current waiting list and estimated times
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${refreshing ? 'animate-spin' : ''}`}
                        title="Refresh Queue"
                    >
                        <RefreshCw className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => setShowJoinForm(!showJoinForm)}
                        className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full font-bold shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        {showJoinForm ? 'Cancel' : 'Join Queue'}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showJoinForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white dark:bg-dark-paper p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 mb-8">
                            <h2 className="text-xl font-bold mb-4">Join the Queue</h2>
                            <form onSubmit={handleJoinQueue} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                                />
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none"
                                />
                                <select
                                    value={formData.serviceId}
                                    onChange={(e) => setFormData({ ...formData, serviceId: Number(e.target.value) })}
                                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none md:col-span-2"
                                >
                                    <option value={0}>Select Service (Optional)</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} ({s.duration})</option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="md:col-span-2 py-3 bg-secondary hover:bg-secondary-hover text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-70"
                                >
                                    {submitting ? 'Joining...' : 'Confirm & Join'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {queue.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-dark-paper rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">The queue is currently empty.</p>
                        </div>
                    ) : (
                        queue.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-dark-paper p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{entry.customerName}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                                                {entry.type === 'WALK_IN' ? 'Walk-in' : 'Appointment'}
                                            </span>
                                            {entry.service && (
                                                <span>• {entry.service.name}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-secondary font-bold">
                                        <Clock className="w-4 h-4" />
                                        {entry.estimatedWaitTime || 15} min
                                    </div>
                                    <p className="text-xs text-gray-400">Estimated Wait</p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Queue;
