package com.salon.hairstylist.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "stylists")
public class Stylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Mobile number is required")
    @Column(nullable = false, unique = true)
    private String mobile;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password; // Storing plain/hashed for simplicity as requested

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StylistStatus status = StylistStatus.AVAILABLE;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "specialty")
    private String specialty;

    public enum StylistStatus {
        AVAILABLE,
        BUSY,
        OFF_DUTY
    }

    // Constructors
    public Stylist() {
    }

    public Stylist(Long id, String name, String mobile, String password, StylistStatus status, String imageUrl,
            String specialty) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.password = password;
        this.status = status;
        this.imageUrl = imageUrl;
        this.specialty = specialty;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public StylistStatus getStatus() {
        return status;
    }

    public void setStatus(StylistStatus status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    @Override
    public String toString() {
        return "Stylist{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mobile='" + mobile + '\'' +
                ", status=" + status +
                ", specialty='" + specialty + '\'' +
                '}';
    }
}
