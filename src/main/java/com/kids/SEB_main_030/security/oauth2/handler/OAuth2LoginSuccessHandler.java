package com.kids.SEB_main_030.security.oauth2.handler;

import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.security.filter.JwtVerificationFilter;
import com.kids.SEB_main_030.security.jwt.JwtTokenizer;
import com.kids.SEB_main_030.security.oauth2.CustomOAuth2User;
import com.kids.SEB_main_030.user.entity.Role;
import com.kids.SEB_main_030.user.entity.SocialType;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.repository.UserRepository;
import com.kids.SEB_main_030.utils.RandomCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.web.FilterChainProxy;

import javax.servlet.FilterChain;
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
    private final RandomCreator randomCreator;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User user = userRepository.findBySocialTypeAndSocialId(oAuth2User.getSocialType(), getSocialId(oAuth2User)).orElse(null);
        if (user.getRole().equals(Role.GUEST)){
            initUser(user);
            // ToDO 카카오 로그인은 이메일이 없으므로 추가정보 페이지로 redirect
        }

        String accessToken = "Bearer " + delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);
        response.setHeader("Authorization", accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    private void initUser(User user) {
        Profile profile = randomCreator.initProfile();
        profile.setUser(user);
        user.setCurrentProfileId(profile.getProfileId());
        user.setRole(Role.USER);
        userRepository.save(user);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getUserId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
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
