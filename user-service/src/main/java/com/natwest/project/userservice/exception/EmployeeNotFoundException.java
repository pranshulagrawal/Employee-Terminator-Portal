package com.natwest.project.userservice.exception;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(String id){
        super("Could not find Employee with id: "+id);
    }
}
