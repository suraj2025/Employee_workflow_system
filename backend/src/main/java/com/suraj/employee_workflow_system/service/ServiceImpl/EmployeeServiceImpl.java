package com.suraj.employee_workflow_system.service.ServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.suraj.employee_workflow_system.dto.EmployeeRequestDto;
import com.suraj.employee_workflow_system.dto.EmployeeResponseDto;
import com.suraj.employee_workflow_system.dto.EmployeeSearchRequest;
import com.suraj.employee_workflow_system.entity.Employee;
import com.suraj.employee_workflow_system.exception.ResourceNotFoundException;
import com.suraj.employee_workflow_system.repository.EmployeeRepository;
import com.suraj.employee_workflow_system.service.EmployeeService;
import com.suraj.employee_workflow_system.specipication.EmployeeSpecification;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeResponseDto createEmployee(EmployeeRequestDto dto) {
        log.info("Creating employee with email: {}", dto.getEmail());
        Employee employee = Employee.builder()
                .employeeCode(dto.getEmployeeCode())
                .name(dto.getName())
                .email(dto.getEmail())
                .department(dto.getDepartment())
                .designation(dto.getDesignation())
                .salary(dto.getSalary())
                .build();

        Employee savedEmployee = employeeRepository.save(employee);
        log.info("Employee created successfully with ID: {}", savedEmployee.getId());
        return EmployeeResponseDto.builder()
                .id(savedEmployee.getId())
                .employeeCode(savedEmployee.getEmployeeCode())
                .name(savedEmployee.getName())
                .email(savedEmployee.getEmail())
                .department(savedEmployee.getDepartment())
                .designation(savedEmployee.getDesignation())
                .salary(savedEmployee.getSalary())
                .build();
    }

    @Override
    public EmployeeResponseDto getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with ID: " + id));

        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .build();
    }

    @Override
public EmployeeResponseDto updateEmployee(
        Long id,
        EmployeeRequestDto dto
) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Employee not found"
                    )
            );

    employee.setEmployeeCode(dto.getEmployeeCode());
    employee.setName(dto.getName());
    employee.setEmail(dto.getEmail());
    employee.setDepartment(dto.getDepartment());
    employee.setDesignation(dto.getDesignation());
    employee.setSalary(dto.getSalary());

    Employee updatedEmployee =
            employeeRepository.save(employee);

    return EmployeeResponseDto.builder()
            .id(updatedEmployee.getId())
            .employeeCode(updatedEmployee.getEmployeeCode())
            .name(updatedEmployee.getName())
            .email(updatedEmployee.getEmail())
            .department(updatedEmployee.getDepartment())
            .designation(updatedEmployee.getDesignation())
            .salary(updatedEmployee.getSalary())
            .build();
}

@Override
public void deleteEmployee(Long id) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Employee not found"
                    )
            );

    employeeRepository.delete(employee);
}

    @Override
    public Page<EmployeeResponseDto> getAllEmployees(
            int page,
            int size,
            String sortBy) {

        log.info("Fetching employees with pagination");

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending());

        Page<Employee> employeePage = employeeRepository.findAll(pageable);

        return employeePage.map(employee -> EmployeeResponseDto.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .build());
    }

    @Override
    public Page<EmployeeResponseDto> searchEmployees(
            EmployeeSearchRequest request) {

        log.info("Searching employees");

        Sort sort = request.getSortDirection()
                .equalsIgnoreCase("desc")

                        ? Sort.by(request.getSortBy()).descending()

                        : Sort.by(request.getSortBy()).ascending();

        Pageable pageable = PageRequest.of(
                request.getPage(),
                request.getSize(),
                sort);

        Specification<Employee> specification = Specification
                .where(
                        EmployeeSpecification.hasName(
                                request.getName()))
                .and(
                        EmployeeSpecification.hasDepartment(
                                request.getDepartment()));

        Page<Employee> employees = employeeRepository.findAll(
                specification,
                pageable);

        return employees.map(employee -> EmployeeResponseDto.builder()
                .id(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .salary(employee.getSalary())
                .build());
    }
}