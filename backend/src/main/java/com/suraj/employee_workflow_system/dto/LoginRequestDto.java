package com.suraj.employee_workflow_system.dto;



import lombok.Data;

@Data
public class LoginRequestDto {

    private String email;
    private Boolean forceLogin = false;
    private String password;
}
