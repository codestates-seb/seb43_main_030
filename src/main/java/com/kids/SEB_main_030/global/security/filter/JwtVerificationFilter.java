package com.kids.SEB_main_030.global.security.filter;

import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import com.kids.SEB_main_030.global.security.jwt.JwtTokenizer;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException e1) {
            request.setAttribute("exception", e1);
        } catch (ExpiredJwtException e2) {
            String refreshToken = request.getHeader("Refresh");
            // accessToken이 만료되었지만 refresh 토큰이 유효한 경우
            if (verifyRefreshToken(refreshToken)){
                String accessToken = createNewAccessToken(refreshToken);
                response.setHeader("Authorization", "Bearer " + accessToken);
                response.getWriter().write("Bearer " + accessToken);
                response.setStatus(201);
                return;
            } else { // refresh 토큰까지 만료된 경우
                response.getWriter().write("모든 토큰이 만료되었습니다. \n다시 로그인 해주세요.");
                response.setStatus(401);
                return;
            }

        } catch (Exception e3) {
            request.setAttribute("exception", e3);
        }

        filterChain.doFilter(request, response);
    }

    private String createNewAccessToken(String refreshToken) {
        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String subject = jwtTokenizer.getClaims(refreshToken, key).getBody().getSubject();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String accessToken = jwtTokenizer.generateAccessToken(subject, subject, expiration, key);
        return accessToken;
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();
    }

    private boolean verifyRefreshToken(String token){
        String key = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.validateToken(token, key);
    }
    private void setAuthenticationToContext(Map<String, Object> claims){
        String email = (String) claims.get("email");
        Long userId = Long.valueOf(String.valueOf(claims.get("userId")));
        String role = (String) claims.get("role");
        Map<String, Object> map = new HashMap<>();
        map.put("email", email);
        map.put("userId", userId);
        map.put("role", role);

        Authentication authentication = new UsernamePasswordAuthenticationToken(map, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }
}

