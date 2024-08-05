package com.natwest.project.separatedemployee.service;

import com.natwest.project.separatedemployee.model.DepartmentClearance;
import com.natwest.project.separatedemployee.model.SeparatedEmployee;
import com.natwest.project.separatedemployee.repository.SeparatedEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeparatedEmployeeService {

    @Autowired
    private SeparatedEmployeeRepository separatedEmployeeRepository;

    public ResponseEntity<SeparatedEmployee> updateDepartmentClearances(String employee_id, List<DepartmentClearance> updatedClearances) {
        Optional<SeparatedEmployee> optionalEmployee = separatedEmployeeRepository.findById(employee_id);

        if (optionalEmployee.isPresent()) {
            SeparatedEmployee employee = optionalEmployee.get();
            employee.setDepartmentClearancesList(updatedClearances);
            SeparatedEmployee updatedEmployee = separatedEmployeeRepository.save(employee);
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public SeparatedEmployee fileSeparation(SeparatedEmployee employee) {
        return separatedEmployeeRepository.save(employee);
    }

    public List<SeparatedEmployee> getAllSeparatedEmployees() {
        return separatedEmployeeRepository.findAll();
    }
}
