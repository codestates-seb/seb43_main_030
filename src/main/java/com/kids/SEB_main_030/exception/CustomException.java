package com.kids.SEB_main_030.exception;

import lombok.Getter;

public enum CustomException {

    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_EXISTS(409, "이미 존재하는 회원입니다."),
    NO_PERMISSION(403, "동작을 수행할 수 없습니다."),
    PROFILE_NOT_FOUND(404,"프로필을 찾을 수 없습니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    CustomException(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
