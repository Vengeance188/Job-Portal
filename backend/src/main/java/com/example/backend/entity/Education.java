package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String degree;

    private String fieldOfStudy;

    private String institution;

    private Integer graduationYear;

    @ManyToOne
    private CandidateProfile candidateProfile;
}