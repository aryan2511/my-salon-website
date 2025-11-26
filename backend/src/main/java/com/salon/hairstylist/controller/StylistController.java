package com.salon.hairstylist.controller;

import com.salon.hairstylist.model.Stylist;
import com.salon.hairstylist.service.StylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stylists")
public class StylistController {

    @Autowired
    private StylistService stylistService;

    @GetMapping
    public List<Stylist> getAllStylists() {
        return stylistService.getAllStylists();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String mobile = credentials.get("mobile");
        String password = credentials.get("password");

        return stylistService.login(mobile, password)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Stylist> updateStatus(@PathVariable Long id, @RequestParam Stylist.StylistStatus status) {
        return ResponseEntity.ok(stylistService.updateStatus(id, status));
    }
}
