package com.suraj.employee_workflow_system.service;

import com.suraj.employee_workflow_system.entity.RefreshToken;
import com.suraj.employee_workflow_system.entity.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(
            User user
    );

    RefreshToken verifyRefreshToken(
            String token
    );
}