package com.natwest.project.userservice.service;

import com.natwest.project.userservice.exception.ManagerNotFoundException;
import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.model.Manager;
import com.natwest.project.userservice.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    @Autowired
    private ManagerRepository managerRepository;

    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    public Manager createManager(Manager manager) {
        return managerRepository.save(manager);
    }

    public Manager updateActiveStatus(String id) {
        Manager manager = managerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manager not found with id: " + id));
        manager.setActive(false);
        return managerRepository.save(manager);
    }

    public Manager getManagerById(String id) {
        return managerRepository.findById(id)
                .orElseThrow(() -> new ManagerNotFoundException("Manager not exist with id :" + id));
    }

    public boolean changePassword(String employee_id, String oldPassword, String newPassword) {
        Manager emp = getManagerById(employee_id);

        if (emp.getPassword().equals(oldPassword)) {
            emp.setPassword(newPassword);
            managerRepository.save(emp);
            return true;
        } else {
            return false;
        }
    }

    public void deleteManager(String id) {
        managerRepository.deleteById(id);
    }
}
