package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.request.CompanyRequest;
import com.example.backend.dto.response.CompanyResponse;
import com.example.backend.entity.Company;
import com.example.backend.service.CompanyService;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Create Company
    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.createCompany(company);
    }

    // Get Company by ID
    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    // Get All Companies
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // Update Company by ID
    @PutMapping("/{id}")
    public Company updateCompany(
            @PathVariable Long id,
            @RequestBody Company company) {

        return companyService.updateCompany(id, company);
    }

    // Delete Company
    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }

    // Get logged-in recruiter's company
    @GetMapping("/my-company")
    public CompanyResponse getMyCompany() {
        return companyService.getMyCompany();
    }

    // Update logged-in recruiter's company
    @PutMapping("/my-company")
    public CompanyResponse updateMyCompany(
            @RequestBody CompanyRequest request) {

        return companyService.updateMyCompany(request);
    }
}