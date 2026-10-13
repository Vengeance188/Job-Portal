
package com.example.backend.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.User;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.UserRepository;

@Service
public class ResumeService {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    private final Cloudinary cloudinary;
    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    public ResumeService(
            Cloudinary cloudinary,
            CandidateProfileRepository candidateProfileRepository,
            UserRepository userRepository) {

        this.cloudinary = cloudinary;
        this.candidateProfileRepository = candidateProfileRepository;
        this.userRepository = userRepository;
    }

    public String uploadResume(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a resume.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Resume must be 5 MB or smaller.");
        }

        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException(
                    "Only PDF resumes are allowed.");
        }

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getName())) {
            throw new IllegalStateException(
                    "Please log in before uploading a resume.");
        }

        try {
            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() ->
                            new IllegalArgumentException("User not found."));

            CandidateProfile profile =
                    candidateProfileRepository.findByUser(user)
                            .orElseThrow(() ->
                                    new IllegalArgumentException(
                                            "Candidate profile not found."));

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                            "resource_type", "raw",
                            "folder", "job-portal/resumes",
                            "public_id", "candidate_" + user.getId()
                                    + "_resume.pdf",
                            "overwrite", true
                    )
            );

            Object secureUrl = result.get("secure_url");

            if (secureUrl == null) {
                throw new IllegalStateException(
                        "Cloudinary did not return a resume URL.");
            }

            String resumeUrl = secureUrl.toString();

            profile.setResumeUrl(resumeUrl);
            candidateProfileRepository.save(profile);

            return resumeUrl;

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to upload resume. Please try again.", e);
        }
    }
}
