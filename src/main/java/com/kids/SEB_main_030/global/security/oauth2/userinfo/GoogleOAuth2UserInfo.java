package com.kids.SEB_main_030.global.security.oauth2.userinfo;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class GoogleOAuth2UserInfo extends OAuth2UserInfo{
    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {

        return (String) attributes.get("sub");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
