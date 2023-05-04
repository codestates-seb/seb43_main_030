package com.kids.SEB_main_030.exception;

import lombok.Getter;

public enum CustomException {

    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_EXISTS(409, "이미 존재하는 회원입니다."),
    NO_PERMISSION(403, "동작을 수행할 수 없습니다."),
    PROFILE_NOT_FOUND(404,"프로필을 찾을 수 없습니다."),
    PROFILE_CANNOT_DELETE(405, "사용중인 프로필은 삭제할 수 없습니다."),
    PROFILE_CANNOT_ADD(405,"프로필을 더이상 추가할 수 없습니다."),
    KINDERGARTEN_NOT_FOUND(404,"유치원을 찾을 수 없습니다."),
    COMMUNITY_CATEGORY_BAD_REQUEST(400, "카테고리 값이 다릅니다."),
    POST_NOT_FOUND(404, "게시물을 찾을 수 없습니다."),
    NO_AUTHORITY(403, "본인이 작성한 게시물이 아닙니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    CustomException(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
