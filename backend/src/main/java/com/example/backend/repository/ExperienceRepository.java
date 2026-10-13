package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Experience;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {

    List<Experience> findByCandidateProfile(
            CandidateProfile candidateProfile);
}