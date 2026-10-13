package com.example.backend.controller;

import com.example.backend.entity.SavedJobs;
import com.example.backend.service.SavedJobService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate/saved-jobs")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @PostMapping("/{jobId}")
    public SavedJobs saveJob(@PathVariable Long jobId) {
        return savedJobService.saveJob(jobId);
    }
    
    @GetMapping
    public List<SavedJobs> getMySavedJobs() {
        return savedJobService.getMySavedJobs();
    }
    
    @DeleteMapping("/{jobId}")
    public void removeSavedJob(@PathVariable Long jobId) {
        savedJobService.removeSavedJob(jobId);
    }
}