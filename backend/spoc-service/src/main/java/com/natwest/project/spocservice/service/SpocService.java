package com.natwest.project.spocservice.service;

import com.natwest.project.spocservice.model.SPOC;
import com.natwest.project.spocservice.repository.SpocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpocService {

    @Autowired
    private SpocRepository spocRepository;

    public List<SPOC> getAllSpocDetails() {
        return spocRepository.findAll();
    }

    public SPOC createSPOC(SPOC spoc) {
        return spocRepository.save(spoc);
    }

    public SPOC updateSPOC(String id, SPOC updatedSPOC) {
        SPOC spoc = spocRepository.findById(id).orElse(null);
        if (spoc != null) {
            spoc.setName(updatedSPOC.getName());
            spoc.setDepartment(updatedSPOC.getDepartment());
            spoc.setContactno(updatedSPOC.getContactno());
            spoc.setEmail(updatedSPOC.getEmail());
            return spocRepository.save(spoc);
        }
        return null;
    }

    public void deleteSPOC(String id) {
        spocRepository.deleteById(id);
    }
}
