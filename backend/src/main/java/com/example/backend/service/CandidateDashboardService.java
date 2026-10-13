package com.example.backend.service;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.User;
import com.example.backend.repository.ApplicationRepository;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.EducationRepository;
import com.example.backend.repository.ExperienceRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CandidateDashboardService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;


    public CandidateDashboardService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            CandidateProfileRepository candidateProfileRepository,
            EducationRepository educationRepository,
            ExperienceRepository experienceRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.candidateProfileRepository = candidateProfileRepository;
        this.educationRepository = educationRepository;
        this.experienceRepository = experienceRepository;
    }


    // =====================================================
    // TOTAL APPLICATIONS
    // =====================================================

    public long getTotalApplications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return applicationRepository
                .findByCandidate(user)
                .size();
    }


    // =====================================================
    // PROFILE COMPLETION
    // =====================================================

    public int getProfileCompletion() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        CandidateProfile profile =
                candidateProfileRepository
                        .findByUser(user)
                        .orElse(null);


        // If candidate has no profile yet
        if (profile == null) {

            return 0;

        }


        int completedFields = 0;
        int totalFields = 9;


        // 1. Name
        if (user.getName() != null
                && !user.getName().isBlank()) {

            completedFields++;

        }


        // 2. Phone
        if (profile.getPhone() != null
                && !profile.getPhone().isBlank()) {

            completedFields++;

        }


        // 3. Location
        if (profile.getLocation() != null
                && !profile.getLocation().isBlank()) {

            completedFields++;

        }


        // 4. Professional Headline
        if (profile.getProfessionalHeadline() != null
                && !profile.getProfessionalHeadline().isBlank()) {

            completedFields++;

        }


        // 5. About Me
        if (profile.getAboutMe() != null
                && !profile.getAboutMe().isBlank()) {

            completedFields++;

        }


        // 6. Skills
        if (profile.getSkills() != null
                && !profile.getSkills().isBlank()) {

            completedFields++;

        }


        // 7. Resume
        if (profile.getResumeUrl() != null
                && !profile.getResumeUrl().isBlank()) {

            completedFields++;

        }


        // 8. Education
        if (!educationRepository
                .findByCandidateProfile(profile)
                .isEmpty()) {

            completedFields++;

        }


        // 9. Experience
        if (!experienceRepository
                .findByCandidateProfile(profile)
                .isEmpty()) {

            completedFields++;

        }


        return (completedFields * 100) / totalFields;
    }
}