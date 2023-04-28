package com.kids.SEB_main_030.exception;

import lombok.Getter;

public enum CustomException {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    CustomException(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
