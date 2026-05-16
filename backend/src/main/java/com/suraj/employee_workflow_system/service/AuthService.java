package com.suraj.employee_workflow_system.service;

import com.suraj.employee_workflow_system.dto.AuthResponseDto;
import com.suraj.employee_workflow_system.dto.LoginRequestDto;
import com.suraj.employee_workflow_system.dto.RefreshTokenRequestDto;
import com.suraj.employee_workflow_system.dto.RegisterRequestDto;

public interface AuthService {

    AuthResponseDto login(
            LoginRequestDto request);

    AuthResponseDto register(
            RegisterRequestDto request);

    AuthResponseDto refreshToken(
            RefreshTokenRequestDto request);
}