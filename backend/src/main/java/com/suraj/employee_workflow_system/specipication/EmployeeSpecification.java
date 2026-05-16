package com.suraj.employee_workflow_system.specipication;

import org.springframework.data.jpa.domain.Specification;

import com.suraj.employee_workflow_system.entity.Employee;

public class EmployeeSpecification {

    public static Specification<Employee> hasName(String name) {

        return (root, query, cb) ->

                name == null || name.isEmpty()

                        ? null

                        : cb.like(
                                cb.lower(root.get("name")),
                                "%" + name.toLowerCase() + "%"
                        );
    }

    public static Specification<Employee> hasDepartment(
            String department
    ) {

        return (root, query, cb) ->

                department == null || department.isEmpty()

                        ? null

                        : cb.equal(
                                root.get("department"),
                                department
                        );
    }
}