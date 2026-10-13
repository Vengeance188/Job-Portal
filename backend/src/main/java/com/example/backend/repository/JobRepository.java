package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Company;
import com.example.backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
            String title,
            String location
    );

    List<Job> findByCompany(Company company);
}