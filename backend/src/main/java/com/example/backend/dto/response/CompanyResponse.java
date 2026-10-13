package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompanyResponse {

    private Long id;
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