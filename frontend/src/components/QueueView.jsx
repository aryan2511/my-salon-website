import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Users, Clock, TrendingUp, Zap, Scissors } from 'lucide-react';
import { queueApi, servicesApi, stylistApi } from '../services/api';

export default function QueueView() {
  const [queue, setQueue] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const toast = React.useRef(null);
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    service: { id: '' }
  });

  useEffect(() => {
    fetchQueue();
    fetchServices();
    fetchStylists();
    const interval = setInterval(() => {
      setRefreshing(true);
      fetchQueue().finally(() => setRefreshing(false));
      fetchStylists();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    try {
      const response = await queueApi.getWaiting();
      setQueue(response.data);
    } catch (error) {
      console.error('Error fetching queue:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await servicesApi.getActive();
      setServices(response.data.map(s => ({ label: s.name, value: s.id })));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchStylists = async () => {
    try {
      const response = await stylistApi.getAll();
      setStylists(response.data);
    } catch (error) {
      console.error('Error fetching stylists:', error);
    }
  };

  const handleJoinQueue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const queueData = {
        customerName: formData.customerName,
        mobile: formData.mobile,
        type: 'WALK_IN',
        service: formData.service.id ? { id: formData.service.id } : null
      };

      await queueApi.join(queueData);

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: '🎉 You\'ve been added to the queue!',
        life: 3000
      });

      setFormData({ customerName: '', mobile: '', service: { id: '' } });
      fetchQueue();
    } catch (error) {
      console.error('Error joining queue:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to join queue. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusSeverity = (status) => {
    switch (status) {
      case 'WAITING': return 'info';
      case 'IN_PROGRESS': return 'success';
      case 'COMPLETED': return 'secondary';
      default: return 'warning';
    }
  };

  const formatTime = (joinedAt) => {
    const date = new Date(joinedAt);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-24 px-6">
      <Toast ref={toast} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-4">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">Live Queue Updates</span>
            {refreshing && <ProgressSpinner style={{ width: '16px', height: '16px' }} />}
          </div>

          <h2 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Live Queue Status
            </span>
          </h2>
          <p className="text-xl text-gray-600">Join the queue or see your position in real-time</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-2">People Waiting</p>
                  <h3 className="text-4xl font-black">{queue.length}</h3>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-2">Avg Wait Time</p>
                  <h3 className="text-4xl font-black">{queue.length > 0 ? Math.round(queue[0]?.estimatedWaitTime || 30) : 0}m</h3>
                </div>
                <Clock className="w-12 h-12 text-purple-200" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm mb-2">Status</p>
                  <h3 className="text-2xl font-black">{queue.length === 0 ? 'No Wait!' : 'Active'}</h3>
                </div>
                <TrendingUp className="w-12 h-12 text-pink-200" />
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Join Queue Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-xl border-0 h-full">
              <div className="border-l-4 border-indigo-600 pl-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Walk-in Check-in</h3>
                <p className="text-gray-600 mt-1">No appointment? Join the queue!</p>
              </div>

              <form onSubmit={handleJoinQueue} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                  <InputText
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                  <InputText
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Service (Optional)</label>
                  <Dropdown
                    value={formData.service.id}
                    onChange={(e) => setFormData({ ...formData, service: { id: e.value } })}
                    options={[{ label: 'Select Service', value: '' }, ...services]}
                    placeholder="Choose a service"
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  label={loading ? 'Joining...' : 'Join Queue'}
                  icon="pi pi-plus"
                  loading={loading}
                  className="w-full p-4 bg-gradient-to-r from-blue-400 to-purple-500 border-0 text-lg font-bold font-color-white text-white shadow-xl"
                />
              </form>
            </Card>
          </motion.div>

          {/* Queue List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {queue.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="text-center py-16 shadow-xl border-0">
                    <Users className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Queue is Empty</h3>
                    <p className="text-gray-600">Be the first to join!</p>
                  </Card>
                </motion.div>
              ) : (
                <>
                  {queue.map((customer, index) => (
                    <motion.div
                      key={customer.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="shadow-lg border-l-4 border-indigo-500 hover:shadow-2xl transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Badge value={index + 1} size="xlarge" severity="info" className="text-2xl font-black" />
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{customer.customerName}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Tag
                                  value={customer.type === 'APPOINTMENT' ? 'Booked Online' : 'Walk-in'}
                                  severity={customer.type === 'APPOINTMENT' ? 'warning' : 'info'}
                                />
                                {customer.service && (
                                  <span className="text-sm text-gray-600">• {customer.service.name}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 mb-2">{formatTime(customer.joinedAt)}</div>
                            <Tag value={customer.status} severity={getStatusSeverity(customer.status)} />
                            {customer.estimatedWaitTime > 0 && (
                              <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                ~{customer.estimatedWaitTime}m wait
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300"
                  >
                    <p className="text-gray-500 font-medium">End of Queue</p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Stylist Status Panel (Right Side) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <Scissors className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-xl font-bold text-gray-900">Stylist Status</h3>
                </div>

                <div className="space-y-4">
                  {stylists.map((stylist) => (
                    <div key={stylist.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={stylist.imageUrl || "https://via.placeholder.com/40"}
                            alt={stylist.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${stylist.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{stylist.name}</div>
                          <div className="text-xs text-gray-500">{stylist.specialty}</div>
                        </div>
                      </div>
                      <Tag
                        value={stylist.status}
                        severity={stylist.status === 'AVAILABLE' ? 'success' : 'danger'}
                        className="text-xs"
                      />
                    </div>
                  ))}
                  {stylists.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      No stylists available
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}