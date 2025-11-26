import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Users, Clock, CheckCircle, Play, Power, Coffee, Lock, User } from 'lucide-react';
import { queueApi, stylistApi } from '../services/api';

export default function StylistDashboard() {
    const [queue, setQueue] = useState([]);
    const [stylist, setStylist] = useState(null); // Logged in stylist
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ mobile: '', password: '' });
    const toast = useRef(null);

    useEffect(() => {
        if (stylist) {
            fetchQueue();
            const interval = setInterval(fetchQueue, 10000);
            return () => clearInterval(interval);
        }
    }, [stylist]);

    const fetchQueue = async () => {
        try {
            const response = await queueApi.getWaiting();
            setQueue(response.data);
        } catch (error) {
            console.error('Error fetching queue:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await stylistApi.login(loginForm);
            setStylist(response.data);
            toast.current.show({ severity: 'success', summary: 'Welcome', detail: `Hello, ${response.data.name}!` });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials' });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.value ? 'AVAILABLE' : 'BUSY';
        try {
            const response = await stylistApi.updateStatus(stylist.id, newStatus);
            setStylist(response.data);
            toast.current.show({
                severity: newStatus === 'AVAILABLE' ? 'success' : 'warn',
                summary: 'Status Updated',
                detail: `You are now ${newStatus.toLowerCase()}`
            });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update status' });
        }
    };

    const handleNextCustomer = async (customer) => {
        try {
            setLoading(true);
            await queueApi.moveToNext(customer.id);
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Called ${customer.customerName}` });
            fetchQueue();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update queue' });
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteCustomer = async (customer) => {
        try {
            setLoading(true);
            await queueApi.complete(customer.id);
            toast.current.show({ severity: 'success', summary: 'Completed', detail: `Finished service for ${customer.customerName}` });
            fetchQueue();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to complete service' });
        } finally {
            setLoading(false);
        }
    };

    const confirmComplete = (customer) => {
        confirmDialog({
            message: `Are you sure you want to complete the service for ${customer.customerName}?`,
            header: 'Complete Service',
            icon: 'pi pi-check-circle',
            acceptClassName: 'p-button-success',
            accept: () => handleCompleteCustomer(customer)
        });
    };

    if (!stylist) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
                <Toast ref={toast} />
                <Card className="w-full max-w-md shadow-2xl border-0">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900">Stylist Login</h2>
                        <p className="text-gray-600">Access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <User className="w-4 h-4" />
                                </span>
                                <InputText
                                    value={loginForm.mobile}
                                    onChange={(e) => setLoginForm({ ...loginForm, mobile: e.target.value })}
                                    placeholder=" Enter mobile number"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2"> Password</label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <Lock className="w-4 h-4" />
                                </span>
                                <Password
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    placeholder="Enter password"
                                    feedback={false}
                                    toggleMask
                                    className="w-full"
                                    inputClassName="w-full"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            label={loading ? 'Logging in...' : 'Login'}
                            loading={loading}
                            className="w-full p-3 bg-gradient-to-r from-blue-400 to-purple-500 hover:bg-indigo-700 border-0 font-bold"
                        /> {/* bg-gradient-to-r from-blue-400 to-purple-500 */}
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24 px-6">
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="max-w-6xl mx-auto">
                {/* Header & Status */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome, {stylist.name}</h1>
                        <p className="text-gray-600">Manage your queue and availability</p>
                    </div>

                    <Card className={`border-0 shadow-lg transition-colors duration-500 ${stylist.status === 'AVAILABLE' ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-center gap-6 px-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Your Status</span>
                                <div className="flex items-center gap-2">
                                    {stylist.status === 'AVAILABLE' ? (
                                        <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            Available
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-500 font-bold text-xl">
                                            <Coffee className="w-5 h-5" />
                                            Busy / Break
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="h-12 w-px bg-gray-200"></div>
                            <InputSwitch
                                checked={stylist.status === 'AVAILABLE'}
                                onChange={handleStatusChange}
                                className="scale-125"
                            />
                        </div>
                    </Card>
                </div>

                {/* Queue Management */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Current Customer (Active) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Users className="w-6 h-6 text-indigo-600" />
                            Waiting Queue
                        </h2>

                        <AnimatePresence>
                            {queue.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Coffee className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Customers Waiting</h3>
                                    <p className="text-gray-500">Enjoy your break!</p>
                                </motion.div>
                            ) : (
                                queue.map((customer, index) => (
                                    <motion.div
                                        key={customer.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className={`border-0 shadow-md ${index === 0 ? 'border-l-4 border-indigo-600 ring-2 ring-indigo-50' : ''}`}>
                                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                                <div className="flex items-center gap-6 flex-1">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900">{customer.customerName}</h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <Tag value={customer.type} severity={customer.type === 'APPOINTMENT' ? 'warning' : 'info'} />
                                                            {customer.service && (
                                                                <span className="text-gray-600 text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                                                                    {customer.service.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="text-right mr-4">
                                                        <div className="text-sm text-gray-500">Waited</div>
                                                        <div className="font-bold text-gray-900">
                                                            {Math.floor((new Date() - new Date(customer.joinedAt)) / 60000)}m
                                                        </div>
                                                    </div>

                                                    {index === 0 ? (
                                                        <div className="flex gap-2">
                                                            {customer.status === 'WAITING' && (
                                                                <Button
                                                                    label="Call"
                                                                    icon="pi pi-megaphone"
                                                                    className="p-button-help"
                                                                    onClick={() => handleNextCustomer(customer)}
                                                                    loading={loading}
                                                                />
                                                            )}
                                                            {customer.status === 'IN_PROGRESS' && (
                                                                <Button
                                                                    label="Complete"
                                                                    icon="pi pi-check"
                                                                    severity="success"
                                                                    onClick={() => confirmComplete(customer)}
                                                                    loading={loading}
                                                                />
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            icon="pi pi-arrow-up"
                                                            className="p-button-text p-button-secondary"
                                                            tooltip="Move to Top"
                                                            onClick={() => handleNextCustomer(customer)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stats / Quick Actions */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
                            <h3 className="font-bold text-indigo-100 mb-4">Today's Summary</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="text-3xl font-black mb-1">{queue.length}</div>
                                    <div className="text-indigo-200 text-sm">Waiting</div>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                    <div className="text-3xl font-black mb-1">--</div>
                                    <div className="text-indigo-200 text-sm">Completed</div>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Button
                                    label="Add Walk-in"
                                    icon="pi pi-plus"
                                    className="w-full p-button-outlined"
                                />
                                <Button
                                    label="Logout"
                                    icon="pi pi-sign-out"
                                    className="w-full p-button-outlined p-button-danger"
                                    onClick={() => setStylist(null)}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
