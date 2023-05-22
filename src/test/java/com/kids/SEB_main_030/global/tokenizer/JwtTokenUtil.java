package com.kids.SEB_main_030.global.tokenizer;

import com.kids.SEB_main_030.domain.user.entity.Role;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.security.jwt.JwtTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenizer jwtTokenizer;

    public String getAccessToken(String email){
        User user = new User();
        user.setEmail(email);
        user.setRole(Role.USER);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(subject, subject, expiration, base64EncodedSecretKey);
        return accessToken;
    }
}
