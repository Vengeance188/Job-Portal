package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Education;
import com.example.backend.entity.User;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.EducationRepository;
import com.example.backend.repository.UserRepository;

@Service
public class EducationService {

    private final EducationRepository educationRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    public EducationService(
            EducationRepository educationRepository,
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository) {

        this.educationRepository = educationRepository;
        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
    }

    private CandidateProfile getCurrentCandidateProfile() {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return candidateProfileRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Candidate profile not found"));
    }

    public List<Education> getMyEducation() {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        return educationRepository
                .findByCandidateProfile(profile);
    }

    public Education addEducation(Education education) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        education.setCandidateProfile(profile);

        return educationRepository.save(education);
    }

    public Education updateEducation(
            Long id,
            Education updatedEducation) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Education not found"));

        if (!education.getCandidateProfile()
                .getId()
                .equals(profile.getId())) {

            throw new RuntimeException(
                    "You cannot update this education");
        }

        education.setDegree(
                updatedEducation.getDegree());

        education.setFieldOfStudy(
                updatedEducation.getFieldOfStudy());

        education.setInstitution(
                updatedEducation.getInstitution());

        education.setGraduationYear(
                updatedEducation.getGraduationYear());

        return educationRepository.save(education);
    }

    public void deleteEducation(Long id) {

        CandidateProfile profile =
                getCurrentCandidateProfile();

        Education education =
                educationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Education not found"));

        if (!education.getCandidateProfile()
                .getId()
                .equals(profile.getId())) {

            throw new RuntimeException(
                    "You cannot delete this education");
        }

        educationRepository.delete(education);
    }
}