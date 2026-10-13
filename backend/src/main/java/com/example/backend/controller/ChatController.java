package com.example.backend.controller;

import com.example.backend.dto.request.ChatRequest;
import com.example.backend.dto.response.ChatResponse;
import com.example.backend.entity.Job;
import com.example.backend.service.GeminiService;
import com.example.backend.service.JobService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private final GeminiService geminiService;
	private final JobService jobService;

	public ChatController(
	        GeminiService geminiService,
	        JobService jobService) {

	    this.geminiService = geminiService;
	    this.jobService = jobService;
	}

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String response;

        if (request.getTitle() != null && !request.getTitle().isBlank()
                && request.getLocation() != null && !request.getLocation().isBlank()) {

            List<Job> jobs = jobService.searchJobs(
                    request.getTitle(),
                    request.getLocation()
            );

            response = geminiService.generateJobResponse(
                    request.getMessage(),
                    jobs
            );

        } else {

            response = geminiService.generateResponse(
                    request.getMessage()
            );
        }

        return new ChatResponse(response);
    }
}