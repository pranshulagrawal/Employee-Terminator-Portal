package com.natwest.project.userservice.controller;

import com.natwest.project.userservice.model.Manager;
import com.natwest.project.userservice.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @GetMapping("/all")
    public List<Manager> getAllManagerDetails(){
        return managerService.getAllManagers();
    }

    @PostMapping("/add")
    public Manager createManager(@RequestBody Manager manager) {
        return managerService.createManager(manager);
    }

    @PutMapping("/updateActiveStatus/{id}")
    public Manager updateActiveStatus(@PathVariable String id) {
        return managerService.updateActiveStatus(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable String id) {
        Manager manager = managerService.getManagerById(id);
        return ResponseEntity.ok(manager);
    }

    @PutMapping("/changePassword/")
    public ResponseEntity<String> changePassword(
            @RequestBody Map<String, String> request
    ) {
        String employee_id = request.get("employee_id");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        boolean passwordChanged = managerService.changePassword(employee_id, oldPassword, newPassword);

        if (passwordChanged) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid old password");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteManager(@PathVariable String id) {
        managerService.deleteManager(id);
    }
}
