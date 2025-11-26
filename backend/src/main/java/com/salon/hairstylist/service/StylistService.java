package com.salon.hairstylist.service;

import com.salon.hairstylist.model.Stylist;
import com.salon.hairstylist.repository.StylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StylistService {

    @Autowired
    private StylistRepository stylistRepository;

    public List<Stylist> getAllStylists() {
        return stylistRepository.findAll();
    }

    public Optional<Stylist> login(String mobile, String password) {
        Optional<Stylist> stylist = stylistRepository.findByMobile(mobile);
        if (stylist.isPresent() && stylist.get().getPassword().equals(password)) {
            return stylist;
        }
        return Optional.empty();
    }

    public Stylist updateStatus(Long id, Stylist.StylistStatus status) {
        Stylist stylist = stylistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stylist not found"));
        stylist.setStatus(status);
        return stylistRepository.save(stylist);
    }
    
    public Stylist createStylist(Stylist stylist) {
        return stylistRepository.save(stylist);
    }
}
