package com.kids.SEB_main_030.security.oauth2;

import com.kids.SEB_main_030.security.oauth2.userinfo.GoogleOAuth2UserInfo;
import com.kids.SEB_main_030.security.oauth2.userinfo.KakaoOAuth2UserInfo;
import com.kids.SEB_main_030.security.oauth2.userinfo.OAuth2UserInfo;
import com.kids.SEB_main_030.user.entity.Role;
import com.kids.SEB_main_030.user.entity.SocialType;
import com.kids.SEB_main_030.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.UUID;

/**
 * 각 소셜별로 받아오는 데이터가 다르므로 데이터를 처리하는 DTO 클래스
 */
@Getter
public class OAuthAttributes {
    private String nameAttributeKey;
    private OAuth2UserInfo oauth2UserInfo;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    public static OAuthAttributes of(SocialType socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {
        if (socialType == SocialType.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public User toEntity(SocialType socialType, OAuth2UserInfo oAuth2UserInfo){
        User user = new User();
        user.setSocialType(socialType);
        user.setSocialId(oAuth2UserInfo.getId());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setRole(Role.GUEST);
        return user;
    }
}
