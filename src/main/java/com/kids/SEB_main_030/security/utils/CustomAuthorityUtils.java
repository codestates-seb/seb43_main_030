package com.kids.SEB_main_030.security.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    @Value("${mail.address.admin}")
    private String adminMail;

    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");
    private final List<String> GUEST_STRING = List.of("GUEST");


    public List<String> createAuthorities(String email){
        if (email.equals(adminMail)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }

    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }

    public List<String> createGuestRoles(){
        return GUEST_STRING;
    }

}
