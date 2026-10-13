package com.example.backend.dto.response;

import java.time.LocalDateTime;

import com.example.backend.enums.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicantResponse {

    private Long applicationId;

    private String candidateName;

    private String candidateEmail;

    private String jobTitle;

    private String location;

    private LocalDateTime appliedDate;

    private String resumeUrl;

    private String coverLetter;

    private ApplicationStatus status;
}