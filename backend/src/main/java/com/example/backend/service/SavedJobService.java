package com.example.backend.service;

import com.example.backend.entity.Job;
import com.example.backend.entity.SavedJobs;
import com.example.backend.entity.User;
import com.example.backend.repository.JobRepository;
import com.example.backend.repository.SavedRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedJobService {

    private final SavedRepository savedRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public SavedJobService(
            SavedRepository savedRepository,
            UserRepository userRepository,
            JobRepository jobRepository) {

        this.savedRepository = savedRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public SavedJobs saveJob(Long jobId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (savedRepository
                .findByCandidateAndJob(candidate, job)
                .isPresent()) {

            throw new RuntimeException("Job already saved");
        }

        SavedJobs savedJob = new SavedJobs();

        savedJob.setCandidate(candidate);
        savedJob.setJob(job);

        return savedRepository.save(savedJob);
    }
    
    
    public List<SavedJobs> getMySavedJobs() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return savedRepository.findByCandidate(candidate);
    }
    
    public void removeSavedJob(Long jobId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User candidate = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository
                .findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        SavedJobs savedJob = savedRepository
                .findByCandidateAndJob(candidate, job)
                .orElseThrow(() ->
                        new RuntimeException("Job is not saved"));

        savedRepository.delete(savedJob);
    }
}