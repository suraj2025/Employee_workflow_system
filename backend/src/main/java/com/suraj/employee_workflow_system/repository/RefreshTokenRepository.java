package com.suraj.employee_workflow_system.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.suraj.employee_workflow_system.entity.RefreshToken;
import com.suraj.employee_workflow_system.entity.User;

import java.util.Optional;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken>
    findByToken(String token);
    Optional<RefreshToken>
findByUser(User user);
}