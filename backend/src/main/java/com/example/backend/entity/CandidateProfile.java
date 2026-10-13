package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private String location;

    private String professionalHeadline;

    @Column(length = 2000)
    private String aboutMe;

    @Column(length = 1000)
    private String skills;

    private String resumeUrl;

    @OneToOne
    private User user;
}