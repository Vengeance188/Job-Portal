package com.example.backend.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.response.RecruiterDashboardResponse;
import com.example.backend.entity.Application;
import com.example.backend.entity.Company;
import com.example.backend.entity.Job;
import com.example.backend.entity.User;
import com.example.backend.enums.ApplicationStatus;
import com.example.backend.repository.ApplicationRepository;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.UserRepository;

@Service
public class RecruiterDashboardService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterDashboardService(
            UserRepository userRepository,
            CompanyRepository companyRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository) {

        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public RecruiterDashboardResponse getDashboard() {

        // 1. Get logged-in recruiter's email
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // 2. Find recruiter
        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        // 3. Find recruiter's company
        Company company = companyRepository
        	    .findByRecruiter(recruiter)
        	    .orElse(null);

        	if (company == null) {
        	    return new RecruiterDashboardResponse(
        	        recruiter.getName(),
        	        0L,
        	        0L,
        	        0L,
        	        List.of(),
        	        List.of()
        	    );
        	}

        // 4. Find all jobs belonging to this company
        List<Job> jobs = jobRepository.findByCompany(company);

        // 5. Find all applications received for this company's jobs
        List<Application> applications =
                applicationRepository.findByJobCompany(company);

        // 6. Count active jobs
        long activeJobs = jobs.size();

        // 7. Count total applicants
        long totalApplicants = applications.size();

        // 8. Count hired candidates
        long hired = applications.stream()
                .filter(application ->
                        application.getStatus() == ApplicationStatus.HIRED)
                .count();

        // 9. Get recent applicants
        List<Application> recentApplicants = applications.stream()
                .sorted(Comparator.comparing(
                        Application::getAppliedDate,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(3)
                .toList();

        // 10. Get recent jobs
        List<Job> recentJobs = jobs.stream()
                .sorted(Comparator.comparing(
                        Job::getPostedDate,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(3)
                .toList();

        // 11. Return dashboard response
        return new RecruiterDashboardResponse(
                recruiter.getName(),
                activeJobs,
                totalApplicants,
                hired,
                recentApplicants,
                recentJobs
        );
    }
}