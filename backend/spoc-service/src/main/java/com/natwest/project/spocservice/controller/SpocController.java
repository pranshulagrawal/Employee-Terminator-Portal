package com.natwest.project.spocservice.controller;

import com.natwest.project.spocservice.model.SPOC;
import com.natwest.project.spocservice.service.SpocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/spoc")
public class SpocController {

    @Autowired
    private SpocService spocService;

    @GetMapping("/all")
    public List<SPOC> getAllSpocDetails(){
        return spocService.getAllSpocDetails();
    }

    @PostMapping("/add")
    public SPOC createSPOC(@RequestBody SPOC spoc){
        return spocService.createSPOC(spoc);
    }

    @PutMapping("/update/{id}")
    public SPOC updateSPOC(@PathVariable String id, @RequestBody SPOC updatedSPOC) {
        return spocService.updateSPOC(id, updatedSPOC);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSPOC(@PathVariable String id) {
        spocService.deleteSPOC(id);
    }
}
