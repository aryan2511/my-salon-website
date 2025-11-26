package com.salon.hairstylist.repository;

import com.salon.hairstylist.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByAppointmentDate(LocalDate date);
    
    List<Appointment> findByAppointmentDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<Appointment> findByStatus(Appointment.AppointmentStatus status);
    
    List<Appointment> findByCustomerNameContainingIgnoreCase(String name);
    
    List<Appointment> findByMobile(String mobile);
    
    List<Appointment> findByAppointmentDateAndStatus(LocalDate date, Appointment.AppointmentStatus status);
}