package com.salon.hairstylist.config;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.salon.hairstylist.model.Service;
import com.salon.hairstylist.model.Stylist;
import com.salon.hairstylist.repository.ServiceRepository;
import com.salon.hairstylist.repository.StylistRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ServiceRepository serviceRepository;
    private final StylistRepository stylistRepository;

    @Autowired
    public DataInitializer(ServiceRepository serviceRepository, StylistRepository stylistRepository) {
        this.serviceRepository = serviceRepository;
        this.stylistRepository = stylistRepository;
    }

    @Override
    public void run(String... args) {
        if (serviceRepository.count() == 0) {
            System.out.println("🌱 Seeding initial services...");

            serviceRepository.save(new Service(null, "Haircut & Styling", "45 mins", new BigDecimal("45.00"),
                    "Professional haircut with styling", true));
            serviceRepository.save(new Service(null, "Beard Trim", "30 mins", new BigDecimal("25.00"),
                    "Beard shaping and trim", true));
            serviceRepository.save(new Service(null, "Full Color", "2 hrs", new BigDecimal("120.00"),
                    "Complete hair coloring service", true));
            serviceRepository.save(new Service(null, "Facial Treatment", "60 mins", new BigDecimal("80.00"),
                    "Relaxing facial treatment", true));

            System.out.println("✅ Services seeded successfully!");
        }

        if (stylistRepository.count() == 0) {
            System.out.println("🌱 Seeding initial stylists...");

            stylistRepository.save(new Stylist(null, "Sarah Jenkins", "9876543210", "password123",
                    Stylist.StylistStatus.AVAILABLE,
                    "https://images.unsplash.com/photo-1595959183082-7bce70848679?auto=format&fit=crop&q=80&w=800",
                    "Color Specialist"));
            stylistRepository.save(new Stylist(null, "David Chen", "9876543211", "password123",
                    Stylist.StylistStatus.BUSY,
                    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
                    "Precision Cuts"));
            stylistRepository.save(new Stylist(null, "Elena Rodriguez", "9876543212", "password123",
                    Stylist.StylistStatus.AVAILABLE,
                    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
                    "Bridal & Events"));

            System.out.println("✅ Stylists seeded successfully!");
        }
    }
}