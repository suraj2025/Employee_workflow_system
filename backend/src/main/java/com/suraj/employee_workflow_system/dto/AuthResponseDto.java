package com.suraj.employee_workflow_system.dto;



import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDto {

    private String token;

    private String email;

    private String role;
    private String refreshToken;
    private Boolean alreadyLoggedIn;
    private String message;
}
