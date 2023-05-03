package com.kids.SEB_main_030.profile.controller;

import com.kids.SEB_main_030.dto.MultiResponseDto;
import com.kids.SEB_main_030.dto.SingleResponseDto;
import com.kids.SEB_main_030.profile.dto.ProfilePatchDto;
import com.kids.SEB_main_030.profile.dto.ProfilePostDto;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.mapper.ProfileMapper;
import com.kids.SEB_main_030.profile.service.ProfileService;
import com.kids.SEB_main_030.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@Slf4j
@Validated
@RequestMapping("/api/users/profile")
@RestController
public class ProfileController {
    private final static String PROFILE_DEFAULT_URL = "/api/users/profile";
    private final ProfileService profileService;
    private final ProfileMapper mapper;

    public ProfileController(ProfileService profileService, ProfileMapper mapper) {
        this.profileService = profileService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postProfile(@Valid @RequestBody ProfilePostDto postDto){
        Profile profile = profileService.createProfile(mapper.profilePostToProfile(postDto));
        URI uri = UriCreator.createUri(PROFILE_DEFAULT_URL, profile.getProfileId());
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{profile-id}")
    public ResponseEntity getProfile(@PathVariable("profile-id") long profileId){
        Profile profile = profileService.findProfile(profileId);
        if (profile.getType().equals(Profile.type.PERSON)){
            return new ResponseEntity(new SingleResponseDto<>(mapper.profileToPersonProfileDto(profile)),HttpStatus.OK);
        }
        return new ResponseEntity(new SingleResponseDto<>(mapper.profileToDogProfileDto(profile)),HttpStatus.OK);
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
    public ResponseEntity patchProfile(@Valid @RequestBody ProfilePatchDto patchDto,
                                       @PathVariable("profile-id") long profileId){
        Profile profile = mapper.profilePatchToProfile(patchDto);
        Profile result = profileService.updateProfile(profile, profileId);
        if (result.getType().equals(Profile.type.PERSON)){
            return new ResponseEntity(new SingleResponseDto<>(mapper.profileToPersonProfileDto(result)),HttpStatus.OK);
        }
        return new ResponseEntity(new SingleResponseDto<>(mapper.profileToDogProfileDto(result)),HttpStatus.OK);
    }
}
