package com.example.backend.entity;

import java.time.LocalDateTime;

import com.example.backend.enums.ApplicationStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime appliedDate;

    private String resumeUrl;

    private String coverLetter;

    private ApplicationStatus status;

    @ManyToOne
    private User candidate;

    @ManyToOne
    private Job job;
}