package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDashboardResponse {

    private long totalApplications;

    private long savedJobs;

    private int profileCompletion;
}