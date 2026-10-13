package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.entity.Company;
import com.example.backend.entity.Job;
import com.example.backend.entity.User;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.UserRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            CompanyRepository companyRepository) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    // ==========================================
    // Create Job
    // ==========================================
    public Job createJob(Job job) {

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

        job.setCompany(company);

        return jobRepository.save(job);
    }

    // ==========================================
    // Get Job By ID
    // ==========================================
    public Job getJobById(Long id) {

        return jobRepository.findById(id)
                .orElse(null);
    }

    // ==========================================
    // Get All Jobs
    // ==========================================
    public List<Job> getAllJobs() {

        return jobRepository.findAll();
    }

    // ==========================================
    // Get Jobs Of Logged-in Recruiter
    // ==========================================
    public List<Job> getMyJobs() {

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

        return jobRepository.findByCompany(company);
    }

    // ==========================================
    // Search Jobs
    // ==========================================
    public List<Job> searchJobs(
            String title,
            String location) {

        return jobRepository
                .findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
                        title,
                        location
                );
    }

    // ==========================================
    // Update Job
    // ==========================================
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository
                .findById(id)
                .orElse(null);

        if (existingJob == null) {
            return null;
        }

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

        // Security check
        if (!existingJob.getCompany().getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You cannot update this job"
            );
        }

        existingJob.setTitle(job.getTitle());
        existingJob.setDescription(job.getDescription());
        existingJob.setLocation(job.getLocation());
        existingJob.setJobType(job.getJobType());
        existingJob.setExperience(job.getExperience());
        existingJob.setSalary(job.getSalary());
        existingJob.setSkills(job.getSkills());
        existingJob.setVacancies(job.getVacancies());

        /*
         * We don't change postedDate here.
         * Original posting date should remain unchanged.
         */

        return jobRepository.save(existingJob);
    }

    // ==========================================
    // Delete Job
    // ==========================================
    public void deleteJob(Long id) {

        Job existingJob = jobRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

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

        // Security check
        if (!existingJob.getCompany().getId()
                .equals(company.getId())) {

            throw new RuntimeException(
                    "You cannot delete this job"
            );
        }

        jobRepository.delete(existingJob);
    }
}