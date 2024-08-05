package com.natwest.project.separatedemployee.repository;

import com.natwest.project.separatedemployee.model.SeparatedEmployee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SeparatedEmployeeRepository extends MongoRepository<SeparatedEmployee,String> {
    Optional<SeparatedEmployee> findById(String id);
}
