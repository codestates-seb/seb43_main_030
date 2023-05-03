package com.kids.SEB_main_030.profile.service;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.repository.ProfileRepository;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserService userService;

    public ProfileService(ProfileRepository profileRepository, UserService userService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
    }

    public Profile createProfile(Profile profile){
        User findUser = userService.findVerifiedUser(userService.findSecurityContextHolderUserId());
        profile.setUser(findUser);
        profile.setUsingProfile(false);

        return profileRepository.save(profile);
    }

    public Profile findProfile(long profileId){
        Profile profile = verifyProfile(profileId);
        checkProfileOwner(profile);
        return profile;
    }

//    public List<Profile> findProfiles(){
//        Long userId = userService.findSecurityContextHolderUserId();
//        return profileRepository.findByUserId(userId);
//    }
    public void checkProfileOwner(Profile profile){
        // 로그인 유저의 프로필 정보인지 한번 더 검증
        if (profile.getUser().getUserId() != userService.findSecurityContextHolderUserId()){
            throw new LogicException(CustomException.NO_PERMISSION);
        }
    }

    public Profile verifyProfile(long profileId){
        return profileRepository.findById(profileId).orElseThrow(
                () -> new LogicException(CustomException.PROFILE_NOT_FOUND)
        );
    }
}
