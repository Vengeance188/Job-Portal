package com.example.backend.dto.request;

import lombok.Data;

@Data
public class ChatRequest {

    private String message;

    private String title;

    private String location;
}