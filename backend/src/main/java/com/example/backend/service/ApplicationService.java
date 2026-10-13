package com.example.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.response.ApplicantResponse;
import com.example.backend.entity.Application;
import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Company;
import com.example.backend.entity.Job;
import com.example.backend.entity.User;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.repository.ApplicationRepository;
import com.example.backend.repository.CandidateProfileRepository;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.UserRepository;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final CandidateProfileRepository candidateProfileRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository,
            CompanyRepository companyRepository,
            CandidateProfileRepository candidateProfileRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.candidateProfileRepository = candidateProfileRepository;
    }

    // =====================================================
    // Candidate applies for a job
    // =====================================================

    public Application applyForJob(
            Long jobId,
            String coverLetter) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        CandidateProfile candidateProfile =
                candidateProfileRepository.findByUser(candidate)
                        .orElseThrow(() ->
                                new RuntimeException("Candidate profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        Application application = new Application();

        application.setCandidate(candidate);
        application.setJob(job);

        // Get resume from candidate profile
        application.setResumeUrl(candidateProfile.getResumeUrl());

        application.setCoverLetter(coverLetter);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.APPLIED);

        return applicationRepository.save(application);
    }

    // =====================================================
    // Candidate - My Applications
    // =====================================================

    public List<Application> getMyApplications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found"));

        return applicationRepository.findByCandidate(candidate);
    }

    // =====================================================
    // Recruiter - Get Applicants
    // =====================================================

    public List<ApplicantResponse> getRecruiterApplicants() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        List<Application> applications =
                applicationRepository.findByJobCompany(company);

        return applications.stream()
                .map(application -> {

                	String resumeUrl = application.getResumeUrl();

                    return new ApplicantResponse(
                            application.getId(),
                            application.getCandidate().getName(),
                            application.getCandidate().getEmail(),
                            application.getJob().getTitle(),
                            application.getJob().getLocation(),
                            application.getAppliedDate(),
                            resumeUrl,
                            application.getCoverLetter(),
                            application.getStatus()
                    );
                })
                .toList();
    }

    // =====================================================
    // Recruiter - Update Application Status
    // =====================================================

    public ApplicantResponse updateApplicationStatus(
            Long applicationId,
            ApplicationStatus newStatus) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        // Security check:
        // Make sure this application belongs
        // to a job posted by this recruiter.

        if (!application.getJob()
                .getCompany()
                .getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You cannot update this application");
        }

        application.setStatus(newStatus);

        Application savedApplication =
                applicationRepository.save(application);

        // Get latest resume from candidate profile
        String resumeUrl = savedApplication.getResumeUrl();

        return new ApplicantResponse(
                savedApplication.getId(),
                savedApplication.getCandidate().getName(),
                savedApplication.getCandidate().getEmail(),
                savedApplication.getJob().getTitle(),
                savedApplication.getJob().getLocation(),
                savedApplication.getAppliedDate(),
                resumeUrl,
                savedApplication.getCoverLetter(),
                savedApplication.getStatus()
        );
    }

    // =====================================================
    // Recruiter - Get Applicants For Specific Job
    // =====================================================

    public List<ApplicantResponse> getApplicantsByJob(Long jobId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseThrow(() ->
                        new RuntimeException("Company not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        // Security check:
        // Make sure this job belongs to the logged-in recruiter.

        if (!job.getCompany()
                .getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You cannot view applicants for this job");
        }

        List<Application> applications =
                applicationRepository.findByJobId(jobId);

        return applications.stream()
                .map(application -> {

                	String resumeUrl = application.getResumeUrl();

                    return new ApplicantResponse(
                            application.getId(),
                            application.getCandidate().getName(),
                            application.getCandidate().getEmail(),
                            application.getJob().getTitle(),
                            application.getJob().getLocation(),
                            application.getAppliedDate(),
                            resumeUrl,
                            application.getCoverLetter(),
                            application.getStatus()
                    );
                })
                .toList();
    }
}