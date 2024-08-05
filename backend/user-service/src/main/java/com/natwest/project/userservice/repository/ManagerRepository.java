package com.natwest.project.userservice.repository;

import com.natwest.project.userservice.model.Manager;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends MongoRepository<Manager, String> {

}
