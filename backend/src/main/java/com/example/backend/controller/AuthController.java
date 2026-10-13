package com.example.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.entity.Application;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.response.LoginResponse;
import com.example.backend.entity.User;
import com.example.backend.service.ApplicationService;
import com.example.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ApplicationService applicationService;
	private final AuthService authService;


    public AuthController(AuthService authService, ApplicationService applicationService) {
        this.authService = authService;
        this.applicationService = applicationService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
    
 // Candidate - Apply for a job
    @PostMapping
    public Application applyForJob(
            @RequestParam Long jobId,
            @RequestParam(required = false) String coverLetter) {

        return applicationService.applyForJob(jobId, coverLetter);
    }

}
