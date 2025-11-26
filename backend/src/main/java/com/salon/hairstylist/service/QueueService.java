package com.salon.hairstylist.service;

import com.salon.hairstylist.model.QueueEntry;
import com.salon.hairstylist.model.Service;
import com.salon.hairstylist.repository.QueueRepository;
import com.salon.hairstylist.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class QueueService {

    private final QueueRepository queueRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public QueueService(QueueRepository queueRepository, ServiceRepository serviceRepository) {
        this.queueRepository = queueRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<QueueEntry> getAllQueueEntries() {
        return queueRepository.findAll();
    }

    public List<QueueEntry> getWaitingQueue() {
        return queueRepository.findByStatusOrderByJoinedAtAsc(QueueEntry.QueueStatus.WAITING);
    }

    public Optional<QueueEntry> getQueueEntryById(Long id) {
        return queueRepository.findById(id);
    }

    public long getWaitingCount() {
        return queueRepository.countByStatus(QueueEntry.QueueStatus.WAITING);
    }

    public QueueEntry joinQueue(QueueEntry queueEntry) {
        queueEntry.setJoinedAt(LocalDateTime.now());
        queueEntry.setStatus(QueueEntry.QueueStatus.WAITING);
        
        if (queueEntry.getService() != null && queueEntry.getService().getId() != null) {
            Service service = serviceRepository.findById(queueEntry.getService().getId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            queueEntry.setService(service);
        }
        
        long waitingCount = getWaitingCount();
        int estimatedWaitTime = (int) (waitingCount * 30);
        queueEntry.setEstimatedWaitTime(estimatedWaitTime);
        
        return queueRepository.save(queueEntry);
    }

    public QueueEntry updateQueueStatus(Long id, QueueEntry.QueueStatus status) {
        QueueEntry queueEntry = queueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Queue entry not found with id: " + id));
        
        queueEntry.setStatus(status);
        
        if (status == QueueEntry.QueueStatus.IN_PROGRESS) {
            queueEntry.setStartedAt(LocalDateTime.now());
        } else if (status == QueueEntry.QueueStatus.COMPLETED || status == QueueEntry.QueueStatus.CANCELLED) {
            queueEntry.setCompletedAt(LocalDateTime.now());
        }
        
        return queueRepository.save(queueEntry);
    }

    public void deleteQueueEntry(Long id) {
        queueRepository.deleteById(id);
    }

    public List<QueueEntry> getTodayQueue() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        return queueRepository.findByJoinedAtBetween(startOfDay, endOfDay);
    }

    public QueueEntry moveToNext(Long id) {
        return updateQueueStatus(id, QueueEntry.QueueStatus.IN_PROGRESS);
    }

    public QueueEntry completeService(Long id) {
        return updateQueueStatus(id, QueueEntry.QueueStatus.COMPLETED);
    }
}