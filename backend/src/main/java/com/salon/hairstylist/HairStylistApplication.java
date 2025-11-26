package com.salon.hairstylist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HairStylistApplication {

    public static void main(String[] args) {
        SpringApplication.run(HairStylistApplication.class, args);
        System.out.println("🚀 Hair Stylist Queue & Booking System is running on http://localhost:8080");
    }
}
