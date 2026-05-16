package com.suraj.employee_workflow_system.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.suraj.employee_workflow_system.dto.EmployeeRequestDto;
import com.suraj.employee_workflow_system.dto.EmployeeResponseDto;
import com.suraj.employee_workflow_system.dto.EmployeeSearchRequest;
import com.suraj.employee_workflow_system.entity.Employee;
import com.suraj.employee_workflow_system.service.EmployeeService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public EmployeeResponseDto createEmployee(
            @Valid @RequestBody EmployeeRequestDto requestDto) {
        return employeeService.createEmployee(requestDto);
    }

    @GetMapping("/{id}")
    public EmployeeResponseDto getEmployeeById(
            @PathVariable Long id) {
        System.out.println("Received request for employee ID: " + id);
        return employeeService.getEmployeeById(id);
    }

    @GetMapping
    public Page<EmployeeResponseDto> getAllEmployees(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "id") String sortBy) {

        return employeeService.getAllEmployees(
                page,
                size,
                sortBy);
    }

    @PutMapping("/{id}")
public EmployeeResponseDto updateEmployee(
        @PathVariable Long id,
        @Valid @RequestBody EmployeeRequestDto dto
) {

    return employeeService.updateEmployee(id, dto);
}

@DeleteMapping("/{id}")
public String deleteEmployee(
        @PathVariable Long id
) {

    employeeService.deleteEmployee(id);

    return "Employee deleted successfully";
}

    @PostMapping("/search")
    public Page<EmployeeResponseDto> searchEmployees(
            @RequestBody EmployeeSearchRequest request) {

        return employeeService.searchEmployees(request);
    }
}