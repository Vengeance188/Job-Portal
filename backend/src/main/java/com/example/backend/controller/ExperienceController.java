package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Experience;
import com.example.backend.service.ExperienceService;

@RestController
@RequestMapping("/api/candidate/experience")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    // =========================
    // GET MY EXPERIENCE
    // =========================

    @GetMapping
    public List<Experience> getMyExperience() {

        return experienceService.getMyExperience();
    }

    // =========================
    // ADD EXPERIENCE
    // =========================

    @PostMapping
    public Experience addExperience(
            @RequestBody Experience experience) {

        return experienceService.addExperience(
                experience);
    }

    // =========================
    // UPDATE EXPERIENCE
    // =========================

    @PutMapping("/{id}")
    public Experience updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        return experienceService.updateExperience(
                id,
                experience);
    }

    // =========================
    // DELETE EXPERIENCE
    // =========================

    @DeleteMapping("/{id}")
    public void deleteExperience(
            @PathVariable Long id) {

        experienceService.deleteExperience(id);
    }
}