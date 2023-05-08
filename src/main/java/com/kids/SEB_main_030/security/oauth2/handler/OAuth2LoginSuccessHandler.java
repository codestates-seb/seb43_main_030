package com.kids.SEB_main_030.security.oauth2.handler;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.service.ProfileService;
import com.kids.SEB_main_030.security.oauth2.CustomOAuth2User;
import com.kids.SEB_main_030.user.entity.Role;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.repository.UserRepository;
import com.kids.SEB_main_030.user.service.UserService;
import com.kids.SEB_main_030.utils.RandomCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final RandomCreator randomCreator;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        if (oAuth2User.getRole().equals(Role.GUEST)){
            User user = userRepository.findByEmail(oAuth2User.getEmail()).orElseThrow(() -> new LogicException(CustomException.USER_NOT_FOUND));
            Profile profile = randomCreator.initProfile();
            profile.setUser(user);
            user.setCurrentProfileId(profile.getProfileId());
            user.setRole(Role.USER);
            userRepository.save(user);
            log.info(oAuth2User.getEmail(), oAuth2User.getAttributes());
        }
        response.sendRedirect("/hello-oauth2");
    }
}
