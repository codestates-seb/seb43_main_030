package com.kids.SEB_main_030.global.exception;

import lombok.Getter;

public enum CustomException {

    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_EXISTS(409, "이미 존재하는 회원입니다."),
    NO_PERMISSION(403, "동작을 수행할 수 없습니다."),
    MAIL_SEND_FAIL(403, "이메일 전송에 실패했습니다."),
    PROFILE_NOT_FOUND(404,"프로필을 찾을 수 없습니다."),
    PROFILE_CANNOT_DELETE(405, "사용중인 프로필은 삭제할 수 없습니다."),
    PROFILE_CANNOT_ADD(405,"프로필을 더이상 추가할 수 없습니다."),
    CURRENT_NOT_MATCH(401, "현재 비밀번호와 틀립니다."),
    INPUT_NOT_EQUALS(400, "입력 정보가 다릅니다."),
    KINDERGARTEN_NOT_FOUND(404,"유치원을 찾을 수 없습니다."),
    COMMUNITY_CATEGORY_BAD_REQUEST(400, "카테고리 값이 다릅니다."),
    POST_NOT_FOUND(404, "게시물을 찾을 수 없습니다."),
    NO_AUTHORITY(403, "본인이 작성한 게시물이 아닙니다."),
    NOTIFICATION_NOT_AUTHORITY(403, "공지 작성 권한이 없습니다."),
    REVIEW_NOT_FOUND(404,"리뷰를 찾을 수 없습니다."),
    COMMUNITY_NOT_FOUND(404, "커뮤니티를 찾을 수 없습니다."),
    IMAGE_UPLOAD_ERROR(500, "이미지 등록에 실패했습니다."),
    IMAGE_NOT_FOUND(404, "이미지를 찾을 수 없습니다."),
    IMAGE_EXTENSION_WRONG(400, "이미지 확장자가 아닙니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    ALL_TOKEN_EXPIRED(401, "모든 토큰이 만료되었습니다.\n 다시 로그인해주세요.");
    @Getter
    private int status;

    @Getter
    private String message;

    CustomException(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
