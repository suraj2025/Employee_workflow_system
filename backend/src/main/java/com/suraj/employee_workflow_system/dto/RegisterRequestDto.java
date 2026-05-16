package com.suraj.employee_workflow_system.dto;


import lombok.Data;

@Data
public class RegisterRequestDto {

    private String name;

    private String email;

    private String password;

    private String role;
}
