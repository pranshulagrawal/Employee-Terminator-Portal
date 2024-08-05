package com.natwest.project.userservice.service;

import com.natwest.project.userservice.exception.HrNotFoundException;
import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.model.HR;
import com.natwest.project.userservice.repository.HrRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HrService {

    @Autowired
    private HrRepository hrRepository;

    public HR createHr(HR hr) {
        return hrRepository.save(hr);
    }

    public HR updateActiveStatus(String id) {
        HR hr = hrRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HR not found with id: " + id));
        hr.setActive(false);
        return hrRepository.save(hr);
    }

    public HR getHrById(String id) {
        return hrRepository.findById(id)
                .orElseThrow(() -> new HrNotFoundException("HR not exist with id :" + id));
    }

    public boolean changePassword(String employee_id, String oldPassword, String newPassword) {
        HR emp = getHrById(employee_id);

        if (emp.getPassword().equals(oldPassword)) {
            emp.setPassword(newPassword);
            hrRepository.save(emp);
            return true;
        } else {
            return false;
        }
    }

    public void deleteHr(String id) {
        hrRepository.deleteById(id);
    }
}
