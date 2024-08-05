package com.natwest.project.userservice.exception;

public class HrNotFoundException extends RuntimeException{
    public HrNotFoundException(String id){
        super("Could not found HR with id: "+id);
    }
}
