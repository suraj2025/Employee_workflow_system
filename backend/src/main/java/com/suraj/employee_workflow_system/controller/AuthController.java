package com.suraj.employee_workflow_system.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import com.suraj.employee_workflow_system.dto.AuthResponseDto;
import com.suraj.employee_workflow_system.dto.LoginRequestDto;
import com.suraj.employee_workflow_system.dto.RefreshTokenRequestDto;
import com.suraj.employee_workflow_system.dto.RegisterRequestDto;
import com.suraj.employee_workflow_system.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponseDto register(
            @RequestBody RegisterRequestDto request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponseDto login(
            @RequestBody LoginRequestDto request) {

        return authService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponseDto refreshToken(
            @RequestBody RefreshTokenRequestDto request) {

        return authService.refreshToken(
                request);
    }
}