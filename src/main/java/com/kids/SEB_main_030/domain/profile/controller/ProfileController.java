package com.kids.SEB_main_030.domain.profile.controller;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.profile.dto.PersonProfileResponseDto;
import com.kids.SEB_main_030.domain.profile.dto.ProfilePatchDto;
import com.kids.SEB_main_030.domain.profile.mapper.ProfileMapper;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.domain.profile.dto.ProfilePostDto;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.repository.ImageRepository;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import com.kids.SEB_main_030.global.image.service.ImageService;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Validated
@RequiredArgsConstructor
@RequestMapping("/api/users/profile")
@RestController
public class ProfileController {
    private final static String PROFILE_DEFAULT_URL = "/api/users/profile";
    private final ProfileService profileService;
    private final ProfileMapper mapper;


    @PostMapping
    public ResponseEntity postProfile(@Valid @RequestPart ProfilePostDto postDto,
                                      @RequestPart(required = false) MultipartFile image){
        Profile profile = profileService.createProfile(mapper.profilePostToProfile(postDto), image);
        URI uri = UriCreator.createUri(PROFILE_DEFAULT_URL, profile.getProfileId());
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{profile-id}")
    public ResponseEntity getProfile(@Positive @PathVariable("profile-id") long profileId){
        Profile profile = profileService.findProfile(profileId);
        if (profile.getType().equals(Profile.type.PERSON)){
            PersonProfileResponseDto personProfileResponseDto = mapper.profileToPersonProfileDto(profile);
            return new ResponseEntity(new SingleResponseDto<>(personProfileResponseDto),HttpStatus.OK);
        }
        return new ResponseEntity(new SingleResponseDto<>(mapper.profileToDogProfileDto(profile)),HttpStatus.OK);
    }

    @GetMapping("/currentProfile")
    public ResponseEntity getCurrentProfile(){
        Profile profile = profileService.getCurrentProfile();
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.profileToCurrentProfileResponseDto(profile)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProfiles(){
        List<Profile> profiles = profileService.findProfiles();
        return new ResponseEntity<>(mapper.profilesToReponseDtos(profiles), HttpStatus.OK);
    }

    @DeleteMapping("/{profile-id}")
    public ResponseEntity deleteProfile(@PathVariable("profile-id") long profileId){
        profileService.deleteProfile(profileId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{profile-id}")
    public ResponseEntity patchProfile(@Valid @RequestPart(required = false) ProfilePatchDto patchDto,
                                       @RequestPart(required = false) MultipartFile image,
                                       @PathVariable("profile-id") long profileId){
        Profile profile = mapper.profilePatchToProfile(patchDto);
        Profile result = profileService.updateProfile(profile, profileId, image);
        if (result.getType().equals(Profile.type.PERSON)){
            return new ResponseEntity(new SingleResponseDto<>(mapper.profileToPersonProfileDto(result)),HttpStatus.OK);
        }
        return new ResponseEntity(new SingleResponseDto<>(mapper.profileToDogProfileDto(result)),HttpStatus.OK);
    }

    @PostMapping("/{profile-id}")
    public ResponseEntity selectProfile(@Positive @PathVariable("profile-id") long profileId){
        profileService.selectProfile(profileId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
