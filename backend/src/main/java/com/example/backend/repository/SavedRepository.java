package com.example.backend.repository;

import com.example.backend.entity.SavedJobs;
import com.example.backend.entity.User;
import com.example.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedRepository extends JpaRepository<SavedJobs, Long> {

    Optional<SavedJobs> findByCandidateAndJob(User candidate, Job job);

    List<SavedJobs> findByCandidate(User candidate);
}