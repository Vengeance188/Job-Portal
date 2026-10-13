package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Job;
import com.example.backend.service.JobService;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // =========================
    // Create Job
    // =========================
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    // =========================
    // Get Job by ID
    // =========================
    @GetMapping("/{id:\\d+}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // =========================
    // Get All Jobs
    // =========================
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // =========================
    // Get Logged-in Recruiter's Jobs
    // =========================
    @GetMapping("/my-jobs")
    public List<Job> getMyJobs() {
        return jobService.getMyJobs();
    }

    // =========================
    // Update Job
    // =========================
    @PutMapping("/{id:\\d+}")
    public Job updateJob(
            @PathVariable Long id,
            @RequestBody Job job) {

        return jobService.updateJob(id, job);
    }

    // =========================
    // Delete Job
    // =========================
    @DeleteMapping("/{id:\\d+}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }

    // =========================
    // Search Jobs
    // =========================
    @GetMapping("/search")
    public List<Job> searchJobs(
            @RequestParam String title,
            @RequestParam String location) {

        return jobService.searchJobs(title, location);
    }
}