package com.suraj.employee_workflow_system.dto;



import lombok.Data;

@Data
public class EmployeeSearchRequest {

    private String name;

    private String department;

    private int page = 0;

    private int size = 10;

    private String sortBy = "id";

    private String sortDirection = "asc";
}