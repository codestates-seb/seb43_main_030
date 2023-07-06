package com.kids.SEB_main_030.domain.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"), USER("ROLE_USER"), OFFICIAL("ROLE_OFFICIAL"), WITHDRAWAL("ROLE_WITHDRAWAL");
    private final String key;
}
