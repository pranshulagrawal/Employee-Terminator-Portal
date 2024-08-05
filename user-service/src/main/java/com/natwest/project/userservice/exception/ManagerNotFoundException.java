package com.natwest.project.userservice.exception;

public class ManagerNotFoundException extends RuntimeException {
    public ManagerNotFoundException(String id) {
        super("Could not find Manager with id: " + id);
    }
}
