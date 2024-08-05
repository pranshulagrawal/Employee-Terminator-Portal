package com.natwest.project.userservice.controller;

import com.natwest.project.userservice.model.HR;
import com.natwest.project.userservice.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/hr")
public class HrController {

    @Autowired
    private HrService hrService;

    @PostMapping("/add")
    public HR createHr(@RequestBody HR hr){
        return hrService.createHr(hr);
    }

    @PutMapping("/updateActiveStatus/{id}")
    public HR updateActiveStatus(@PathVariable String id) {
        return hrService.updateActiveStatus(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HR> getHrById(@PathVariable String id) {
        HR hr = hrService.getHrById(id);
        return ResponseEntity.ok(hr);
    }

    @PutMapping("/changePassword/")
    public ResponseEntity<String> changePassword(
            @RequestBody Map<String, String> request
    ) {
        String employee_id = request.get("employee_id");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        boolean passwordChanged = hrService.changePassword(employee_id, oldPassword, newPassword);

        if (passwordChanged) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid old password");
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHr(@PathVariable String id) {
        hrService.deleteHr(id);
    }
}
