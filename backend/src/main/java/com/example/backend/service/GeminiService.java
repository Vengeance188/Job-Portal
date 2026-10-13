package com.example.backend.service;

import com.example.backend.entity.Job;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    private static final String PORTAL_CONTEXT = """
            You are the AI assistant for a Job Portal.

            Your job is to help users understand how this Job Portal works.

            The Job Portal has two types of users:
            1. Candidate
            2. Recruiter

            Candidate features:
            - Browse and search for jobs
            - View job details
            - Apply for jobs
            - Save jobs
            - View their applications
            - Manage their profile
            - Add education
            - Add work experience
            - Upload their resume

            Application statuses:
            - APPLIED
            - SHORTLISTED
            - REJECTED
            - HIRED

            The candidate can search jobs using search, location,
            job type, experience and salary-related filters.

            The candidate can save a job and later view saved jobs.

            The candidate can apply for a job by providing a resume
            and cover letter.

            The candidate can update their profile information,
            education, experience and resume.

            Important instructions:
            - Answer questions about this Job Portal using the information
              provided above.
            - Do not invent features that are not mentioned.
            - If a user asks about information that requires access to
              their personal account or database, explain that they need
              to log in or use the appropriate portal page.
            - You can still answer general questions about Java,
              Spring Boot, React, SQL, careers and technology using
              your general knowledge.
            - Keep answers clear and beginner-friendly.
            """;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String generateResponse(String message) {

        String prompt = PORTAL_CONTEXT
                + "\n\nUser question:\n"
                + message;

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.8-flash",
                        prompt,
                        null
                );

        return response.text();
    }
    
    public String generateJobResponse(String userMessage, List<Job> jobs) {

        StringBuilder jobData = new StringBuilder();

        for (Job job : jobs) {

            jobData.append("""
                    
                    Job ID: %d
                    Title: %s
                    Location: %s
                    Job Type: %s
                    Experience: %s
                    Salary: %s
                    Skills: %s
                    Company: %s
                    """.formatted(
                    job.getId(),
                    job.getTitle(),
                    job.getLocation(),
                    job.getJobType(),
                    job.getExperience(),
                    job.getSalary(),
                    job.getSkills(),
                    job.getCompany() != null
                            ? job.getCompany().getName()
                            : "Not specified"
            ));
        }

        String prompt = """
                You are the AI assistant for a Job Portal.

                The user is looking for jobs.

                Below are the actual jobs retrieved from the Job Portal database.

                %s

                User question:
                %s

                Instructions:
                - Answer using the job data provided above.
                - Do not invent jobs or job details.
                - If no jobs are found, clearly tell the user that
                  no matching jobs were found.
                - Keep the answer concise and easy to understand.
                - Mention the job title, company, location, salary and
                  other useful details when available.
                """.formatted(jobData, userMessage);

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.8-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}