package com.natwest.project.userservice.controller;

import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/all")
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployees();
    }

    @PostMapping("/add")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/updateActiveStatus/{id}")
    public Employee updateActiveStatus(@PathVariable String id) {
        return employeeService.updateActiveStatus(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/changePassword/")
    public ResponseEntity<String> changePassword(
            @RequestBody Map<String, String> request
    ) {
        String employee_id = request.get("employee_id");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        boolean passwordChanged = employeeService.changePassword(employee_id, oldPassword, newPassword);

        if (passwordChanged) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid old password");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEmployee(@PathVariable String id) {
        employeeService.deleteEmployee(id);
    }
}
