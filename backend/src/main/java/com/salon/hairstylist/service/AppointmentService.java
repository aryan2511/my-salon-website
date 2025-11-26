package com.salon.hairstylist.service;

import com.salon.hairstylist.model.Appointment;
import com.salon.hairstylist.model.Service;
import com.salon.hairstylist.repository.AppointmentRepository;
import com.salon.hairstylist.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, ServiceRepository serviceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date);
    }

    public List<Appointment> getAppointmentsByDateRange(LocalDate startDate, LocalDate endDate) {
        return appointmentRepository.findByAppointmentDateBetween(startDate, endDate);
    }

    public List<Appointment> getAppointmentsByStatus(Appointment.AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }

    public List<Appointment> getAppointmentsByMobile(String mobile) {
        return appointmentRepository.findByMobile(mobile);
    }

    public Appointment createAppointment(Appointment appointment) {
        Service service = serviceRepository.findById(appointment.getService().getId())
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + appointment.getService().getId()));
        
        appointment.setService(service);
        appointment.setStatus(Appointment.AppointmentStatus.PENDING);
        
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appointment.setCustomerName(appointmentDetails.getCustomerName());
        appointment.setMobile(appointmentDetails.getMobile());
        appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        
        if (appointmentDetails.getService() != null) {
            Service service = serviceRepository.findById(appointmentDetails.getService().getId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            appointment.setService(service);
        }

        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointmentStatus(Long id, Appointment.AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getTodayAppointments() {
        return appointmentRepository.findByAppointmentDate(LocalDate.now());
    }

    public List<Appointment> getUpcomingAppointments() {
        return appointmentRepository.findByAppointmentDateBetween(
                LocalDate.now(), 
                LocalDate.now().plusDays(30)
        );
    }
}