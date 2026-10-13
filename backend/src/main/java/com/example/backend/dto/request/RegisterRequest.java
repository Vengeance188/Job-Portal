package com.example.backend.dto.request;

import com.example.backend.enums.Role;

import lombok.Data;

@Data
public class RegisterRequest {
	
	  private String name;
	    private String email;
	    private String password;
	    private Role role;

}
