package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.response.RecruiterDashboardResponse;
import com.example.backend.service.RecruiterDashboardService;

@RestController
@RequestMapping("/api/recruiter/dashboard")
public class RecruiterDashboardController {

    private final RecruiterDashboardService recruiterDashboardService;

    public RecruiterDashboardController(
            RecruiterDashboardService recruiterDashboardService) {
        this.recruiterDashboardService = recruiterDashboardService;
    }

    @GetMapping
    public RecruiterDashboardResponse getDashboard() {
        return recruiterDashboardService.getDashboard();
    }
}