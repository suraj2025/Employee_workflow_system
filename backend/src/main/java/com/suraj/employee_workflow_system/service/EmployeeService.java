package com.suraj.employee_workflow_system.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.suraj.employee_workflow_system.dto.EmployeeRequestDto;
import com.suraj.employee_workflow_system.dto.EmployeeResponseDto;
import com.suraj.employee_workflow_system.dto.EmployeeSearchRequest;
import com.suraj.employee_workflow_system.entity.Employee;

public interface EmployeeService {

    EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto);

    Page<EmployeeResponseDto> getAllEmployees(
            int page,
            int size,
            String sortBy);

    Page<EmployeeResponseDto> searchEmployees(
            EmployeeSearchRequest request);

    EmployeeResponseDto getEmployeeById(Long id);

    EmployeeResponseDto updateEmployee(
            Long id,
            EmployeeRequestDto dto);

    void deleteEmployee(Long id);
}