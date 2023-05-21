package com.kids.SEB_main_030.global.security.oauth2.handler;

import com.kids.SEB_main_030.global.security.jwt.JwtTokenizer;
import com.kids.SEB_main_030.global.security.oauth2.CustomOAuth2User;
import com.kids.SEB_main_030.domain.user.entity.Role;
import com.kids.SEB_main_030.domain.user.entity.SocialType;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User user = userRepository.findBySocialTypeAndSocialId(oAuth2User.getSocialType(), getSocialId(oAuth2User)).orElse(null);
        String accessToken = "Bearer " + delegateAccessToken(user);
        log.info("access Token : " + accessToken);

        if (user.getRole().equals(Role.GUEST)){
            getRedirectStrategy().sendRedirect(request, response, createInitURI(accessToken, user.getEmail()).toString());
            return;
        }


        String refreshToken = delegateRefreshToken(user);
        log.info("refresh Token : " + refreshToken);
        getRedirectStrategy().sendRedirect(request, response, createURI(accessToken, refreshToken).toString());
    }
    private URI createURI(String accessToken, String refresh) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", accessToken);
        queryParams.add("Refresh", refresh);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("testqjzlt.s3-website.ap-northeast-2.amazonaws.com/oauthlogin")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private URI createInitURI(String accessToken, String email) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", accessToken);
        queryParams.add("email", email);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("testqjzlt.s3-website.ap-northeast-2.amazonaws.com/oauthrole")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
    private String delegateAccessToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(subject, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        return refreshToken;
    }

    private String getSocialId(CustomOAuth2User oAuth2User){
        if (oAuth2User.getSocialType().equals(SocialType.KAKAO)){
            return String.valueOf(oAuth2User.getAttributes().get("id"));
        }
        return (String) oAuth2User.getAttributes().get("sub");
    }
}
