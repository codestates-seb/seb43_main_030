package com.kids.SEB_main_030.user.service;

import com.kids.SEB_main_030.security.utils.CustomAuthorityUtils;
import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(authorityUtils.createAuthorities(user.getEmail()));
        return userRepository.save(user);
    }

    private void verifyExistsEmail(String email){
        userRepository.findByEmail(email).ifPresent(e -> {
            throw new LogicException(CustomException.USER_EXISTS);
        });
    }

    public Long findSecurityContextHolderUserId() {
        Map principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (Long) principal.get("userId");
    }

}
