package com.salon.hairstylist.repository;

import com.salon.hairstylist.model.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QueueRepository extends JpaRepository<QueueEntry, Long> {
    
    List<QueueEntry> findByStatus(QueueEntry.QueueStatus status);
    
    List<QueueEntry> findByStatusOrderByJoinedAtAsc(QueueEntry.QueueStatus status);
    
    List<QueueEntry> findByJoinedAtBetween(LocalDateTime start, LocalDateTime end);
    
    List<QueueEntry> findByMobile(String mobile);
    
    long countByStatus(QueueEntry.QueueStatus status);
}