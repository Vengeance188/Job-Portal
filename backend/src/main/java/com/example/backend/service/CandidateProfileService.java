package com.example.backend.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.User;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.UserRepository;

@Service
public class CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    public CandidateProfileService(
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository) {

        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
    }

    public CandidateProfile getMyProfile() {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return candidateProfileRepository.findByUser(user)
                .orElseGet(() -> {

                    CandidateProfile profile = new CandidateProfile();

                    profile.setUser(user);

                    return candidateProfileRepository.save(profile);
                });
    }

    public CandidateProfile updateMyProfile(
            CandidateProfile updatedProfile,
            String name) {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update User details
        user.setName(name);

        userRepository.save(user);

        // Find CandidateProfile
        CandidateProfile profile =
                candidateProfileRepository.findByUser(user)
                        .orElseGet(() -> {

                            CandidateProfile newProfile =
                                    new CandidateProfile();

                            newProfile.setUser(user);

                            return newProfile;
                        });

        // Update CandidateProfile details
        profile.setUser(user);

        profile.setPhone(updatedProfile.getPhone());

        profile.setLocation(updatedProfile.getLocation());

        profile.setProfessionalHeadline(
                updatedProfile.getProfessionalHeadline());

        profile.setAboutMe(
                updatedProfile.getAboutMe());

        profile.setSkills(
                updatedProfile.getSkills());

        profile.setResumeUrl(
                updatedProfile.getResumeUrl());

        return candidateProfileRepository.save(profile);
    }
}