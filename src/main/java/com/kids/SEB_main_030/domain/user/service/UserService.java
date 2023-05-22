package com.kids.SEB_main_030.domain.user.service;

import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.repository.ProfileRepository;
import com.kids.SEB_main_030.domain.user.dto.OAuthInitDto;
import com.kids.SEB_main_030.domain.user.dto.PasswordResetDto;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.user.dto.UserPatchDto;
import com.kids.SEB_main_030.domain.user.entity.Role;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import com.kids.SEB_main_030.global.utils.RandomCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {
    @Value("${url.image.profile}")
    private String defaultProfileImage;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RandomCreator randomCreator;

    public User createUser(User user,boolean checkOfficials){
        verifyExistsEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (checkOfficials){
            user.setRole(Role.OFFICIAL);
        }else {
            user.setRole(Role.USER);
        }

        // 기본 프로필 생성 및 적용
        Profile profile = randomCreator.initProfile();
        profile.setUser(user);
        profile.setImageUrl(defaultProfileImage);
        user.setCurrentProfileId(profile.getProfileId());

        return userRepository.save(user);
    }

    public void removeUser(){
        Long userId = findSecurityContextHolderUserId();
        User findUser = findVerifiedUser(userId);
        findUser.setRole(Role.WITHDRAWAL);
    }
    public void modifyPassword(UserPatchDto patchDto){
        long userId = findSecurityContextHolderUserId();
        User findUser = findVerifiedUser(userId);
        // 현재 비밀번호와 다르거나 비밀번호 확인란이 다른 경우
        if (!passwordEncoder.matches(patchDto.getCurPassword(), findUser.getPassword())) {
            throw new LogicException(CustomException.CURRENT_NOT_MATCH);
        }

        if (!patchDto.getPassword1().equals(patchDto.getPassword2())){
            throw new LogicException(CustomException.INPUT_NOT_EQUALS);
        }
        findUser.setPassword(passwordEncoder.encode(patchDto.getPassword1()));
    }

    public void resetPassword(PasswordResetDto passwordResetDto){
        if (!passwordResetDto.getPassword1().equals(passwordResetDto.getPassword2())){
            throw new LogicException(CustomException.INPUT_NOT_EQUALS);
        }
        User user = findUserByEmail(passwordResetDto.getEmail());
        user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword1()));
    }

    public User oauthUserInit(OAuthInitDto oAuthInitDto){
        Long userId = findSecurityContextHolderUserId();
        User user = findVerifiedUser(userId);
        Optional.ofNullable(oAuthInitDto.getEmail()).ifPresent(email -> user.setEmail(email));
        if (oAuthInitDto.isCheckOfficials()){
            user.setRole(Role.OFFICIAL);
        }else {
            user.setRole(Role.USER);
        }

        Profile profile = randomCreator.initProfile();
        profile.setUser(user);
        profile.setImageUrl(defaultProfileImage);
        user.setCurrentProfileId(profile.getProfileId());
        return userRepository.save(user);
    }
    private void verifyExistsEmail(String email){
        userRepository.findByEmail(email).ifPresent(e -> {
            throw new LogicException(CustomException.USER_EXISTS);
        });
    }
    public User findVerifiedUser(long userId){
        Optional<User> findUser = userRepository.findById(userId);
        User user = findUser.orElseThrow(() -> new LogicException(CustomException.USER_NOT_FOUND));
        return user;
    }

    public User findUserByEmail(String email){
        Optional<User> findUser = userRepository.findByEmail(email);
        User user = findUser.orElseThrow(() -> new LogicException(CustomException.USER_NOT_FOUND));
        return user;
    }
    public Long findSecurityContextHolderUserId() {
        Map principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (Long) principal.get("userId");
    }
    public String findSecurityContextHolderRole(){
        Map principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return  (String) principal.get("role");
    }
    public Long findCurrentProfileId(){
        Long userId = findSecurityContextHolderUserId();
        User user = findVerifiedUser(userId);
        return user.getCurrentProfileId();
    }




}
