package com.suraj.employee_workflow_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponseDto {

    private Long id;

    private String employeeCode;

    private String name;

    private String email;

    private String department;

    private String designation;

    private Double salary;
}