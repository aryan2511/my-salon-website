package com.salon.hairstylist.repository;

import com.salon.hairstylist.model.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StylistRepository extends JpaRepository<Stylist, Long> {
    Optional<Stylist> findByMobile(String mobile);
}
