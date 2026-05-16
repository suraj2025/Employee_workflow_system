package com.suraj.employee_workflow_system.service.ServiceImpl;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.suraj.employee_workflow_system.entity.RefreshToken;
import com.suraj.employee_workflow_system.entity.User;
import com.suraj.employee_workflow_system.repository.RefreshTokenRepository;
import com.suraj.employee_workflow_system.service.RefreshTokenService;

import java.time.LocalDateTime;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl
                implements RefreshTokenService {

        private final RefreshTokenRepository refreshTokenRepository;

        @Override
        public RefreshToken createRefreshToken(
                        User user) {

                RefreshToken refreshToken = refreshTokenRepository
                                .findByUser(user)
                                .orElse(
                                                RefreshToken.builder()
                                                                .user(user)
                                                                .build());

                refreshToken.setToken(
                                UUID.randomUUID().toString());

                refreshToken.setExpiryDate(
                                LocalDateTime.now().plusDays(7));

                return refreshTokenRepository.save(
                                refreshToken);
        }

        @Override
        public RefreshToken verifyRefreshToken(
                        String token) {

                RefreshToken refreshToken = refreshTokenRepository
                                .findByToken(token)

                                .orElseThrow(() -> new RuntimeException(
                                                "Invalid refresh token"));

                if (refreshToken.getExpiryDate()
                                .isBefore(
                                                LocalDateTime.now())) {

                        throw new RuntimeException(
                                        "Refresh token expired");
                }

                return refreshToken;
        }
}