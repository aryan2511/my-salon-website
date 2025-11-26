package com.salon.hairstylist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.salon.hairstylist.model.Service;
import com.salon.hairstylist.repository.ServiceRepository;

@Component
public class ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<Service> getActiveServices() {
        return serviceRepository.findByIsActiveTrue();
    }

    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service serviceDetails) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));

        service.setName(serviceDetails.getName());
        service.setDuration(serviceDetails.getDuration());
        service.setPrice(serviceDetails.getPrice());
        service.setDescription(serviceDetails.getDescription());
        service.setIsActive(serviceDetails.getIsActive());

        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    public Service toggleServiceStatus(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        service.setIsActive(!service.getIsActive());
        return serviceRepository.save(service);
    }
}