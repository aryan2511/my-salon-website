import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const servicesApi = {
  getAll: () => api.get('/services'),
  getActive: () => api.get('/services/active'),
  getById: (id) => api.get(`/services/${id}`),
  create: (service) => api.post('/services', service),
  update: (id, service) => api.put(`/services/${id}`, service),
  delete: (id) => api.delete(`/services/${id}`),
  toggle: (id) => api.patch(`/services/${id}/toggle`),
};

// Appointments API
export const appointmentsApi = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  getByDate: (date) => api.get(`/appointments/date/${date}`),
  getByDateRange: (startDate, endDate) => api.get('/appointments/date-range', {
    params: { startDate, endDate }
  }),
  getByStatus: (status) => api.get(`/appointments/status/${status}`),
  getByMobile: (mobile) => api.get(`/appointments/mobile/${mobile}`),
  getToday: () => api.get('/appointments/today'),
  getUpcoming: () => api.get('/appointments/upcoming'),
  create: (appointment) => api.post('/appointments', appointment),
  update: (id, appointment) => api.put(`/appointments/${id}`, appointment),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, null, {
    params: { status }
  }),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// Queue API
export const queueApi = {
  getAll: () => api.get('/queue'),
  getWaiting: () => api.get('/queue/waiting'),
  getById: (id) => api.get(`/queue/${id}`),
  getWaitingCount: () => api.get('/queue/waiting-count'),
  getToday: () => api.get('/queue/today'),
  join: (queueEntry) => api.post('/queue/join', queueEntry),
  updateStatus: (id, status) => api.patch(`/queue/${id}/status`, null, {
    params: { status }
  }),
  moveToNext: (id) => api.patch(`/queue/${id}/next`),
  complete: (id) => api.patch(`/queue/${id}/complete`),
  delete: (id) => api.delete(`/queue/${id}`),
};

// Stylist API
export const stylistApi = {
  getAll: () => api.get('/stylists'),
  login: (credentials) => api.post('/stylists/login', credentials),
  updateStatus: (id, status) => api.patch(`/stylists/${id}/status`, null, {
    params: { status }
  }),
};

export default api;