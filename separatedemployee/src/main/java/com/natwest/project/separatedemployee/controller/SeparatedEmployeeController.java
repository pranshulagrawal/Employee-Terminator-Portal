package com.natwest.project.separatedemployee.controller;

import com.natwest.project.separatedemployee.model.DepartmentClearance;
import com.natwest.project.separatedemployee.model.SeparatedEmployee;
import com.natwest.project.separatedemployee.service.SeparatedEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/separated")
public class SeparatedEmployeeController {

    @Autowired
    private SeparatedEmployeeService separatedEmployeeService;

    @PutMapping("/update/{employee_id}")
    public ResponseEntity<SeparatedEmployee> updateDepartmentClearances(
            @PathVariable String employee_id,
            @RequestBody List<DepartmentClearance> updatedClearances
    ) {
        return separatedEmployeeService.updateDepartmentClearances(employee_id, updatedClearances);
    }

    @PostMapping("/add")
    public SeparatedEmployee fileSeparation(@RequestBody SeparatedEmployee employee){
        return separatedEmployeeService.fileSeparation(employee);
    }

    @GetMapping("/all")
    public List<SeparatedEmployee> getAllSeparatedEmployees() {
        return separatedEmployeeService.getAllSeparatedEmployees();
    }
}
