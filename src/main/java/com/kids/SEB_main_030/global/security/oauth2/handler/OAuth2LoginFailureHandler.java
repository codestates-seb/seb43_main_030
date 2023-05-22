package com.kids.SEB_main_030.global.security.oauth2.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("로그인 실패! 로그를 확인해주세요.");
        response.sendRedirect("http://testqjzlt.s3-website.ap-northeast-2.amazonaws.com/");
        log.info("소셜 로그인에 실패했습니다. 에러 메시지 : {}", exception.getMessage());
    }
}
