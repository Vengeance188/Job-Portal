package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Company;
import com.example.backend.entity.User;

public interface CompanyRepository extends JpaRepository<Company,Long> {

	Optional<Company> findByRecruiter(User recruiter);
	
}
