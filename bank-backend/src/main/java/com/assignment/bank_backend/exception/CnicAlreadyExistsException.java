package com.assignment.bank_backend.exception;

public class CnicAlreadyExistsException extends RuntimeException{
    public CnicAlreadyExistsException(String message) {
        super(message);
    }}