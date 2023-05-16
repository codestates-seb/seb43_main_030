package com.kids.SEB_main_030.global.config;


import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import com.kids.SEB_main_030.global.security.filter.JwtAuthenticationFilter;
import com.kids.SEB_main_030.global.security.filter.JwtVerificationFilter;
import com.kids.SEB_main_030.global.security.handler.UserAccessDeniedHandler;
import com.kids.SEB_main_030.global.security.handler.UserAuthenticationEntryPoint;
import com.kids.SEB_main_030.global.security.handler.UserAuthenticationFailureHandler;
import com.kids.SEB_main_030.global.security.handler.UserAuthenticationSuccessHandler;
import com.kids.SEB_main_030.global.security.jwt.JwtTokenizer;
import com.kids.SEB_main_030.global.security.oauth2.handler.OAuth2LoginSuccessHandler;
import com.kids.SEB_main_030.global.security.oauth2.handler.OAuth2LoginFailureHandler;
import com.kids.SEB_main_030.global.security.oauth2.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                // cors 설정에서 withDefaults 일 경우 corsConfigurationSource라는 이름으로 등록된 Bean을 이용
                .cors().configurationSource(corsConfigurationSource())
                .and()
                // 세션 생성 X
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer());

        http
                .authorizeHttpRequests().anyRequest().permitAll();

        http
                .oauth2Login()
//                .authorizationEndpoint()
//                .baseUri("/login/oauth2/authorize")
//                .and()
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint()
                .userService(customOAuth2UserService);



        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:8080");
        configuration.addAllowedOrigin("http://ec2-15-165-204-114.ap-northeast-2.compute.amazonaws.com");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*, Authorization, Refresh");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // 구현한 JwtAuthenticationFilter를 등록하는 클래스
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    // 로그인 인증에 성공한 후 JWT가 Authorization 헤더에 포함되어 있을 경우 동작
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}

