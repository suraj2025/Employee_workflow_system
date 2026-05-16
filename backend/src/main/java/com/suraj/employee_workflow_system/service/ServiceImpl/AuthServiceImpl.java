package com.suraj.employee_workflow_system.service.ServiceImpl;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.suraj.employee_workflow_system.dto.AuthResponseDto;
import com.suraj.employee_workflow_system.dto.LoginRequestDto;
import com.suraj.employee_workflow_system.dto.RefreshTokenRequestDto;
import com.suraj.employee_workflow_system.dto.RegisterRequestDto;
import com.suraj.employee_workflow_system.entity.RefreshToken;
import com.suraj.employee_workflow_system.entity.User;
import com.suraj.employee_workflow_system.repository.RefreshTokenRepository;
import com.suraj.employee_workflow_system.repository.UserRepository;
import com.suraj.employee_workflow_system.security.JwtUtil;
import com.suraj.employee_workflow_system.service.AuthService;
import com.suraj.employee_workflow_system.service.RefreshTokenService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl
                implements AuthService {

        private final UserRepository userRepository;

        private final PasswordEncoder passwordEncoder;
        private final RefreshTokenService refreshTokenService;
        private final JwtUtil jwtUtil;

        private final RefreshTokenRepository refreshTokenRepository;

        @Override
        public AuthResponseDto register(
                        RegisterRequestDto request) {

                User user = User.builder()

                                .name(request.getName())

                                .email(request.getEmail())

                                .password(
                                                passwordEncoder.encode(
                                                                request.getPassword()))

                                .role(request.getRole())

                                .build();

                userRepository.save(user);

                RefreshToken refreshToken = refreshTokenService
                                .createRefreshToken(user);

                String token = jwtUtil.generateToken(user.getEmail());

                return AuthResponseDto.builder()

                                .token(token)

                                .refreshToken(
                                                refreshToken.getToken())

                                .email(user.getEmail())

                                .role(user.getRole())

                                .build();
        }

        @Override
        public AuthResponseDto login(
                        LoginRequestDto request) {
                User user = userRepository.findByEmail(
                                request.getEmail())

                                .orElseThrow(() -> new RuntimeException(
                                                "Invalid email or password"));
                Optional<RefreshToken> existingToken = refreshTokenRepository
                                .findByUser(user);

                RefreshToken refreshToken = refreshTokenService
                                .createRefreshToken(user);

                boolean passwordMatches = passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword());

                if (!passwordMatches) {

                        throw new RuntimeException(
                                        "Invalid email or password");
                }

                if (

                existingToken.isPresent()

                                &&

                                !request.getForceLogin()

                ) {

                        return AuthResponseDto.builder()

                                        .alreadyLoggedIn(true)

                                        .message(
                                                        "User already logged in")

                                        .build();
                }

                String token = jwtUtil.generateToken(user.getEmail());

                return AuthResponseDto.builder()

                                .token(token)

                                .refreshToken(
                                                refreshToken.getToken())

                                .email(user.getEmail())

                                .role(user.getRole())

                                .build();
        }

        @Override
        public AuthResponseDto refreshToken(
                        RefreshTokenRequestDto request) {

                RefreshToken refreshToken = refreshTokenService
                                .verifyRefreshToken(
                                                request.getRefreshToken());

                User user = refreshToken.getUser();

                String newAccessToken = jwtUtil.generateToken(
                                user.getEmail());

                return AuthResponseDto.builder()

                                .token(newAccessToken)

                                .refreshToken(
                                                refreshToken.getToken())

                                .email(user.getEmail())

                                .role(user.getRole())

                                .build();
        }
}
