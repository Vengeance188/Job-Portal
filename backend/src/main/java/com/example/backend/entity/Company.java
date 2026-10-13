package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Company {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
	    
	    @OneToOne
	    private User recruiter;
	
}
