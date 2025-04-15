package com.chandan.calApplication.controller;

import com.chandan.calApplication.entity.CalEventDetails;
import com.chandan.calApplication.repository.CalEventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/calendar")
@CrossOrigin(origins = "*")
public class CalEventController {

    private final CalEventRepository repository;

    public CalEventController(CalEventRepository repository) {
        this.repository = repository;
    }

    // Get all events (you might want to keep this for admin purposes)
    @GetMapping
    public List<CalEventDetails> getAll() {
        return repository.findAll();
    }
    
    // New endpoint to get events by userId
    @GetMapping("/user/{userId}")
    public List<CalEventDetails> getEventsByUserId(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }

    @PostMapping
    public CalEventDetails createEntry(@RequestBody CalEventDetails eventDetail) {
        // userId should be set in the request body from frontend
        return repository.save(eventDetail);
    }

    @GetMapping("/id/{id}")
    public CalEventDetails getCalEntryById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @DeleteMapping("/id/{id}")
    public void deleteCalEntryById(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/id/{id}")
    public CalEventDetails updateCalEntryById(@PathVariable Long id, @RequestBody CalEventDetails updated) {
        updated.setId(id);
        return repository.save(updated);
    }
}