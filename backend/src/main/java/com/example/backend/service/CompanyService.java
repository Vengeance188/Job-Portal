
package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.request.CompanyRequest;
import com.example.backend.dto.response.CompanyResponse;
import com.example.backend.entity.Company;
import com.example.backend.entity.User;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.UserRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyService(
            CompanyRepository companyRepository,
            UserRepository userRepository) {

        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    // Create a company for the logged-in recruiter
    public Company createCompany(Company company) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        company.setRecruiter(recruiter);

        return companyRepository.save(company);
    }

    // Get company by ID
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    // Get all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Update company by ID
    public Company updateCompany(Long id, Company company) {

        Company existingCompany = companyRepository
                .findById(id)
                .orElse(null);

        if (existingCompany == null) {
            return null;
        }

        existingCompany.setName(company.getName());
        existingCompany.setIndustry(company.getIndustry());
        existingCompany.setSize(company.getSize());
        existingCompany.setFoundedYear(company.getFoundedYear());
        existingCompany.setAbout(company.getAbout());
        existingCompany.setEmail(company.getEmail());
        existingCompany.setPhone(company.getPhone());
        existingCompany.setWebsite(company.getWebsite());
        existingCompany.setLocation(company.getLocation());
        existingCompany.setLinkedin(company.getLinkedin());
        existingCompany.setGithub(company.getGithub());

        return companyRepository.save(existingCompany);
    }

    // Delete company by ID
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }

    // Get the logged-in recruiter's company
    // If no company exists yet, return an empty response
    public CompanyResponse getMyCompany() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElse(null);

        if (company == null) {
            return new CompanyResponse(
                    null, null, null, null, null, null,
                    null, null, null, null, null, null
            );
        }

        return convertToResponse(company);
    }

    // Create or update the logged-in recruiter's company
    public CompanyResponse updateMyCompany(CompanyRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User recruiter = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        // Reuse the existing company or create a new one
        Company company = companyRepository
                .findByRecruiter(recruiter)
                .orElseGet(() -> {
                    Company newCompany = new Company();
                    newCompany.setRecruiter(recruiter);
                    return newCompany;
                });

        company.setName(request.getName());
        company.setIndustry(request.getIndustry());
        company.setSize(request.getSize());
        company.setFoundedYear(request.getFoundedYear());
        company.setAbout(request.getAbout());
        company.setEmail(request.getEmail());
        company.setPhone(request.getPhone());
        company.setWebsite(request.getWebsite());
        company.setLocation(request.getLocation());
        company.setLinkedin(request.getLinkedin());
        company.setGithub(request.getGithub());

        Company savedCompany = companyRepository.save(company);

        return convertToResponse(savedCompany);
    }

    // Convert Company entity into CompanyResponse
    private CompanyResponse convertToResponse(Company company) {

        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getIndustry(),
                company.getSize(),
                company.getFoundedYear(),
                company.getAbout(),
                company.getEmail(),
                company.getPhone(),
                company.getWebsite(),
                company.getLocation(),
                company.getLinkedin(),
                company.getGithub()
        );
    }
}
