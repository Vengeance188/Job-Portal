
package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.response.ApplicantResponse;
import com.example.backend.entity.Application;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Candidate - Apply for a job
    @PostMapping
    public Application applyForJob(
            @RequestParam Long jobId,
            @RequestParam(required = false) String coverLetter) {

        return applicationService.applyForJob(jobId, coverLetter);
    }

    // Recruiter - Get all applicants
    @GetMapping("/recruiter")
    public List<ApplicantResponse> getRecruiterApplicants() {
        return applicationService.getRecruiterApplicants();
    }

    // Recruiter - Get applicants for a specific job
    @GetMapping("/recruiter/job/{jobId}")
    public List<ApplicantResponse> getApplicantsByJob(
            @PathVariable Long jobId) {

        return applicationService.getApplicantsByJob(jobId);
    }

    // Recruiter - Update application status
    @PutMapping("/{id}/status")
    public ApplicantResponse updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {

        return applicationService.updateApplicationStatus(id, status);
    }
}
