package com.natwest.project.spocservice.exception;

public class SpocNotFoundException extends RuntimeException{
    public SpocNotFoundException(String id){
        super("Could not find Spoc with id: "+ id);
    }
}
