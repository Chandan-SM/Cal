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

    @GetMapping
    public List<CalEventDetails> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public CalEventDetails createEntry(@RequestBody CalEventDetails eventDetail) {
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
