package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Education;

public interface EducationRepository extends JpaRepository<Education, Long>  {
	List<Education> findByCandidateProfile(
            CandidateProfile candidateProfile);
}
