package com.kids.SEB_main_030.user.service;

import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.repository.ProfileRepository;
import com.kids.SEB_main_030.profile.service.ProfileService;
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
import java.util.Optional;
import java.util.Random;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final String[] Adjectives = {"행복한", "희망찬", "성실한", "기쁨가득한", "즐기운", "상쾌한", "당당한", "똑똑한", "밝은"};
    private final String[] Nouns = {"주인", "집사", "오너", "캔디", "우두머리", "귀요미", "훈이", "짱구", "짱아", "신형만", "맹구", "철수"};

    public UserService(UserRepository userRepository, ProfileRepository profileRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(authorityUtils.createAuthorities(user.getEmail()));
        // 기본 프로필 생성 및 적용
        Profile profile = initProfile();
        profile.setUser(user);
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
    public Long findSecurityContextHolderUserId() {
        Map principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (Long) principal.get("userId");
    }

    private Profile initProfile(){
        Profile profile = new Profile();
        profile.setType(Profile.type.PERSON);
        profile.setName(initName());
        profile.setUsingProfile(true);

        return profileRepository.save(profile);
    }

    private String initName(){
        Random random = new Random();
        String adjective = Adjectives[random.nextInt(Adjectives.length)];
        String noun = Nouns[random.nextInt(Nouns.length)];
        int number = random.nextInt(1000);
        return String.format("%s%s%d", adjective, noun, number);
    }
}
