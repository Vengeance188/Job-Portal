package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Application;
import com.example.backend.entity.Company;
import com.example.backend.entity.Job;
import com.example.backend.entity.User;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Candidate's applications
    List<Application> findByCandidate(User candidate);

    // Applications received for jobs belonging to a company
    List<Application> findByJobCompany(Company company);

    long countByJob(Job job);
    List<Application> findByJobId(Long jobId);
}