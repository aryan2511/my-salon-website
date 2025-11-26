import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export interface Service {
    id: number;
    name: string;
    duration: string;
    price: number;
    description: string;
    isActive: boolean;
}

export interface Appointment {
    id?: number;
    customerName: string;
    mobile: string;
    appointmentDate: string; // YYYY-MM-DD
    appointmentTime: string; // HH:mm:ss
    service: Service;
    status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface QueueEntry {
    id?: number;
    customerName: string;
    mobile: string;
    type: 'WALK_IN' | 'APPOINTMENT';
    status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    joinedAt?: string;
    estimatedWaitTime?: number;
    service?: Service;
}

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getActiveServices = async (): Promise<Service[]> => {
    const response = await api.get<Service[]>('/services/active');
    return response.data;
};

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', appointment);
    return response.data;
};

export const getAppointmentsByDate = async (date: string): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>(`/appointments/date/${date}`);
    return response.data;
};

export const getWaitingQueue = async (): Promise<QueueEntry[]> => {
    const response = await api.get<QueueEntry[]>('/queue/waiting');
    return response.data;
};

export const joinQueue = async (entry: Omit<QueueEntry, 'id' | 'status' | 'joinedAt' | 'estimatedWaitTime'>): Promise<QueueEntry> => {
    const response = await api.post<QueueEntry>('/queue/join', entry);
    return response.data;
};

export const getWaitingCount = async (): Promise<{ waitingCount: number }> => {
    const response = await api.get<{ waitingCount: number }>('/queue/waiting-count');
    return response.data;
};
