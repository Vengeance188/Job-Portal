package com.example.backend.dto.response;

import java.util.List;

import com.example.backend.entity.Application;
import com.example.backend.entity.Job;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecruiterDashboardResponse {

    private String recruiterName;

    private long activeJobs;

    private long totalApplicants;

    private long hired;

    private List<Application> recentApplicants;

    private List<Job> recentJobs;
}