package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.CandidateProfile;
import com.example.backend.entity.Company;
import com.example.backend.entity.User;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long>{
	Optional<CandidateProfile> findByUser(User user);
}
