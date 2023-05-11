package com.kids.SEB_main_030.domain.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"), USER("ROLE_USER"), TEACHER("ROLE_TEACHER");
    private final String key;
}
