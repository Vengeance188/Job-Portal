package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.service.CandidateProfileService;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {

    private final CandidateProfileService candidateProfileService;

    public CandidateController(
            CandidateProfileService candidateProfileService) {

        this.candidateProfileService = candidateProfileService;
    }

    @GetMapping("/profile")
    public CandidateProfile getProfile() {

        return candidateProfileService.getMyProfile();
    }

    @PutMapping("/profile")
    public CandidateProfile updateProfile(
            @RequestBody CandidateProfile profile,
            @RequestParam String name) {

        return candidateProfileService.updateMyProfile(
                profile,
                name
        );
    }
}