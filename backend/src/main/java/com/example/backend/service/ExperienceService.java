package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Experience;
import com.example.backend.entity.User;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.ExperienceRepository;
import com.example.backend.repository.UserRepository;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    public ExperienceService(
            ExperienceRepository experienceRepository,
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository) {

        this.experienceRepository = experienceRepository;
        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // GET CURRENT CANDIDATE PROFILE
    // =========================

    private CandidateProfile getCurrentCandidateProfile() {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return candidateProfileRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));
    }

    // =========================
    // GET MY EXPERIENCE
    // =========================

    public List<Experience> getMyExperience() {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        return experienceRepository
                .findByCandidateProfile(profile);
    }

    // =========================
    // ADD EXPERIENCE
    // =========================

    public Experience addExperience(
            Experience experience) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        experience.setCandidateProfile(profile);

        return experienceRepository.save(experience);
    }

    // =========================
    // UPDATE EXPERIENCE
    // =========================

    public Experience updateExperience(
            Long id,
            Experience updatedExperience) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Experience not found"));

        // Ownership check
        if (!experience.getCandidateProfile()
                .getId()
                .equals(profile.getId())) {

            throw new RuntimeException(
                    "You cannot update this experience");
        }

        experience.setJobTitle(
                updatedExperience.getJobTitle());

        experience.setCompany(
                updatedExperience.getCompany());

        experience.setStartDate(
                updatedExperience.getStartDate());

        experience.setEndDate(
                updatedExperience.getEndDate());

        experience.setDescription(
                updatedExperience.getDescription());

        return experienceRepository.save(experience);
    }

    // =========================
    // DELETE EXPERIENCE
    // =========================

    public void deleteExperience(Long id) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        Experience experience =
                experienceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Experience not found"));

        // Ownership check
        if (!experience.getCandidateProfile()
                .getId()
                .equals(profile.getId())) {

            throw new RuntimeException(
                    "You cannot delete this experience");
        }

        experienceRepository.delete(experience);
    }
}