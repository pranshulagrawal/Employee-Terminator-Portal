package com.natwest.project.spocservice.repository;

import com.natwest.project.spocservice.model.SPOC;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpocRepository extends MongoRepository<SPOC,String> {
}
