package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            // Disable CSRF for the JWT-based API
            .csrf(csrf -> csrf.disable())

            // Enable CORS configuration
            .cors(cors -> {})

            // Define endpoint authorization rules
            .authorizeHttpRequests(auth -> auth

                // Public authentication endpoints
                .requestMatchers(
                    "/api/auth/register",
                    "/api/auth/login"
                ).permitAll()

                // Candidate profile and resume endpoints
                .requestMatchers("/api/candidate/**")
                .hasRole("CANDIDATE")

                // Candidate submits a job application
                .requestMatchers(HttpMethod.POST, "/api/applications")
                .hasRole("CANDIDATE")

                // Recruiter views all applicants
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/recruiter"
                ).hasRole("RECRUITER")

                // Recruiter views applicants for a specific job
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/recruiter/**"
                ).hasRole("RECRUITER")

                // Recruiter updates application status
                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/applications/*/status"
                ).hasRole("RECRUITER")

                // Other recruiter endpoints
                .requestMatchers("/api/recruiter/**")
                .hasRole("RECRUITER")

                // All remaining endpoints require authentication
                .anyRequest().authenticated()
            )

            // Add JWT authentication filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
