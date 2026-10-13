package com.example.backend.dto.request;

import lombok.Data;

@Data
public class CompanyRequest {

    private String name;
    private String industry;
    private String size;
    private Integer foundedYear;
    private String about;
    private String email;
    private String phone;
    private String website;
    private String location;
    private String linkedin;
    private String github;
}