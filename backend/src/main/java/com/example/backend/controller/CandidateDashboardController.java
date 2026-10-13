package com.example.backend.controller;

import com.example.backend.service.CandidateDashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/candidate/dashboard")
public class CandidateDashboardController {

    private final CandidateDashboardService dashboardService;

    public CandidateDashboardController(
            CandidateDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/applications")
    public long getTotalApplications() {
        return dashboardService.getTotalApplications();
    }
    
    @GetMapping("/profile-completion")
    public int getProfileCompletion() {

        return dashboardService.getProfileCompletion();
    }
}