package com.natwest.project.userservice.service;

import com.natwest.project.userservice.exception.EmployeeNotFoundException;
import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateActiveStatus(String id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        emp.setActive(false);
        return employeeRepository.save(emp);
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not exist with id :" + id));
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }

    public boolean changePassword(String employee_id, String oldPassword, String newPassword) {
        Employee emp = getEmployeeById(employee_id);

        if (emp.getPassword().equals(oldPassword)) {
            emp.setPassword(newPassword);
            employeeRepository.save(emp);
            return true;
        } else {
            return false;
        }
    }
}
