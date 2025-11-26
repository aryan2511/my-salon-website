package com.salon.hairstylist.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.salon.hairstylist.model.QueueEntry;
import com.salon.hairstylist.service.QueueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/queue")
public class QueueController {

    private final QueueService queueService;

    @Autowired
    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    @GetMapping
    public ResponseEntity<List<QueueEntry>> getAllQueueEntries() {
        return ResponseEntity.ok(queueService.getAllQueueEntries());
    }

    @GetMapping("/waiting")
    public ResponseEntity<List<QueueEntry>> getWaitingQueue() {
        return ResponseEntity.ok(queueService.getWaitingQueue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueueEntry> getQueueEntryById(@PathVariable Long id) {
        return queueService.getQueueEntryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/waiting-count")
    public ResponseEntity<Map<String, Long>> getWaitingCount() {
        long count = queueService.getWaitingCount();
        return ResponseEntity.ok(Map.of("waitingCount", count));
    }

    @GetMapping("/today")
    public ResponseEntity<List<QueueEntry>> getTodayQueue() {
        return ResponseEntity.ok(queueService.getTodayQueue());
    }

    @PostMapping("/join")
    public ResponseEntity<QueueEntry> joinQueue(@Valid @RequestBody QueueEntry queueEntry) {
        try {
            QueueEntry createdEntry = queueService.joinQueue(queueEntry);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<QueueEntry> updateQueueStatus(
            @PathVariable Long id,
            @RequestParam QueueEntry.QueueStatus status) {
        try {
            QueueEntry updatedEntry = queueService.updateQueueStatus(id, status);
            return ResponseEntity.ok(updatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/next")
    public ResponseEntity<QueueEntry> moveToNext(@PathVariable Long id) {
        try {
            QueueEntry updatedEntry = queueService.moveToNext(id);
            return ResponseEntity.ok(updatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<QueueEntry> completeService(@PathVariable Long id) {
        try {
            QueueEntry updatedEntry = queueService.completeService(id);
            return ResponseEntity.ok(updatedEntry);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQueueEntry(@PathVariable Long id) {
        queueService.deleteQueueEntry(id);
        return ResponseEntity.noContent().build();
    }
}