package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.Education;
import com.example.backend.service.EducationService;

@RestController
@RequestMapping("/api/candidate/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    @GetMapping
    public List<Education> getMyEducation() {

        return educationService.getMyEducation();
    }

    @PostMapping
    public Education addEducation(
            @RequestBody Education education) {

        return educationService.addEducation(education);
    }

    @PutMapping("/{id}")
    public Education updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {

        return educationService.updateEducation(
                id,
                education
        );
    }

    @DeleteMapping("/{id}")
    public void deleteEducation(
            @PathVariable Long id) {

        educationService.deleteEducation(id);
    }
}