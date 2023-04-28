package com.kids.SEB_main_030.exception;

import lombok.Getter;

public class LogicException extends RuntimeException{
    @Getter
    private CustomException customException;

    public LogicException(CustomException customException){
        super(customException.getMessage());
        this.customException = customException;
    }
}
