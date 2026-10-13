package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SavedJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User candidate;

    @ManyToOne
    private Job job;
}