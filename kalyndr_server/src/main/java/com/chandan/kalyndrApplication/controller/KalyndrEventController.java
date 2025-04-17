package com.chandan.kalyndrApplication.controller;

import org.springframework.web.bind.annotation.*;

import com.chandan.kalyndrApplication.entity.KalyndrEventDetails;
import com.chandan.kalyndrApplication.repository.KalyndrEventRepository;

import java.util.List;

@RestController
@RequestMapping("/calendar")
@CrossOrigin(origins = "*")
public class KalyndrEventController {

    private final KalyndrEventRepository repository;

    public KalyndrEventController(KalyndrEventRepository repository) {
        this.repository = repository;
    }

    // Get all events (you might want to keep this for admin purposes)
    @GetMapping
    public List<KalyndrEventDetails> getAll() {
        return repository.findAll();
    }
    
    // New endpoint to get events by userId
    @GetMapping("/user/{userId}")
    public List<KalyndrEventDetails> getEventsByUserId(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }

    @PostMapping
    public KalyndrEventDetails createEntry(@RequestBody KalyndrEventDetails eventDetail) {
        // userId should be set in the request body from frontend
        return repository.save(eventDetail);
    }

    @GetMapping("/id/{id}")
    public KalyndrEventDetails getCalEntryById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/id/{id}")
    public void deleteCalEntryById(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/id/{id}")
    public KalyndrEventDetails updateCalEntryById(@PathVariable Long id, @RequestBody KalyndrEventDetails updated) {
        updated.setId(id);
        return repository.save(updated);
    }
}