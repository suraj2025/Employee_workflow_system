package com.suraj.employee_workflow_system.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.suraj.employee_workflow_system.entity.User;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
