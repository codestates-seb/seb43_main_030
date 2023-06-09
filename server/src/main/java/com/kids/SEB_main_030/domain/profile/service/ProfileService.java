package com.kids.SEB_main_030.domain.profile.service;

import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.repository.ProfileRepository;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@Slf4j
public class ProfileService {
    private final int maximumProfile = 4;
    private final ProfileRepository profileRepository;
    private final UserService userService;
    private final ImageService imageService;
    public ProfileService(ProfileRepository profileRepository, UserService userService, ImageService imageService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
        this.imageService = imageService;
    }

    public Profile createProfile(Profile profile, MultipartFile image){
        User findUser = userService.findVerifiedUser(userService.findSecurityContextHolderUserId());
        if (findUser.getProfiles().size() == maximumProfile){
            throw new LogicException(CustomException.PROFILE_CANNOT_ADD);
        }
        profile.setUser(findUser);
        if (profile.isCheckPerson()){
            profile.setType(Profile.type.PERSON);
        }else{
            profile.setType(Profile.type.DOG);
        }
        // 이미지 업로드 로직
        if (image != null) {
            String imageUrl = imageService.imageUpload(image, Image.Location.PROFILE.getLocation());
            profile.setImageUrl(imageUrl);
        } else {
            profile.setImageUrl(imageService.getDefaultProfileImage());
        }
        return profileRepository.save(profile);
    }

    public Profile updateProfile(Profile profile, long profileId, MultipartFile image){
        Profile findProfile = verifyProfile(profileId);
        if (findProfile.getUser().getUserId() != userService.findSecurityContextHolderUserId()){
            throw new LogicException(CustomException.NO_PERMISSION);
        }
        // 이미지 관련 로직
        if (image != null) {
            imageService.s3imageDelete(findProfile.getImageUrl());
            String imageUrl = imageService.imageUpload(image, Image.Location.PROFILE.getLocation());
            Optional.ofNullable(imageUrl).ifPresent(url -> findProfile.setImageUrl(url));
        }

        if (profile != null) {
            Optional.ofNullable(profile.getName()).ifPresent(name -> findProfile.setName(name));

    //        Optional.ofNullable(profile.getImageUrl()).ifPresent(url -> findProfile.setImageUrl(url));
            if (profile.isCheckPerson()){
                findProfile.setType(Profile.type.PERSON);
            } else if (!profile.isCheckPerson()) {
                findProfile.setType(Profile.type.DOG);
            }

            if (findProfile.getType().equals(Profile.type.DOG)) {
                Optional.ofNullable(profile.getBreed()).ifPresent(breed -> findProfile.setBreed(breed));
                Optional.ofNullable(profile.getGender()).ifPresent(gender -> findProfile.setGender(gender));
            }
        }

        return profileRepository.save(findProfile);
    }
    public Profile findProfile(long profileId){
        Profile profile = verifyProfile(profileId);
        checkProfileOwner(profile);
        return profile;
    }

    public Profile getCurrentProfile(){
        Long currentProfileId = userService.findCurrentProfileId();
        Profile profile = verifyProfile(currentProfileId);
        return profile;
    }

    public List<Profile> findProfiles(){
        Long userId = userService.findSecurityContextHolderUserId();
        return profileRepository.findByUser_UserId(userId);
    }

    public void deleteProfile(long profileId){
        Profile profile = verifyProfile(profileId);
        checkProfileOwner(profile); // 자신의 프로필인지
        if (profile.getUser().getCurrentProfileId() == profileId){ // 사용중인 프로필은 삭제 불가능
            throw new LogicException(CustomException.PROFILE_CANNOT_DELETE);
        }
        // s3 이미지 삭제 로직
        imageService.s3imageDelete(profile.getImageUrl());

        profileRepository.delete(profile);
    }

    public void selectProfile(long profileId){
        Profile profile = verifyProfile(profileId);
        checkProfileOwner(profile);
        profile.getUser().setCurrentProfileId(profileId);
    }
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
