package com.kids.SEB_main_030.global.exception;

import lombok.Getter;

public class LogicException extends RuntimeException{
    @Getter
    private CustomException customException;

    public LogicException(CustomException customException){
        super(customException.getMessage());
        this.customException = customException;
    }
}
