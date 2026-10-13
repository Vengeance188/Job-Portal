package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobTitle;

    private String company;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 2000)
    private String description;

    @ManyToOne
    private CandidateProfile candidateProfile;
}