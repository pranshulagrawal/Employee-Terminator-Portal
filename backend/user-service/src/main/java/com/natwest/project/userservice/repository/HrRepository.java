package com.natwest.project.userservice.repository;

import com.natwest.project.userservice.model.HR;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HrRepository extends MongoRepository<HR, String> {

}
