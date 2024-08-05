package com.natwest.project.userservice.repository;

import com.natwest.project.userservice.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<Employee, String> {


}
