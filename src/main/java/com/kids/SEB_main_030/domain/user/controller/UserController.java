package com.kids.SEB_main_030.domain.user.controller;

import com.kids.SEB_main_030.domain.user.dto.OAuthInitDto;
import com.kids.SEB_main_030.domain.user.dto.PasswordResetDto;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.domain.user.dto.UserPatchDto;
import com.kids.SEB_main_030.domain.user.dto.UserPostDto;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.mapper.UserMapper;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@Validated
@RequestMapping("/api/users")
@RestController
public class UserController {
    private final static String USER_DEFAULT_URL = "/api/users";
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto){
        User user = userService.createUser(mapper.userPostDtoToUser(userPostDto), userPostDto.isCheckOfficials());
        URI location = UriCreator.createUri(USER_DEFAULT_URL, user.getUserId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping
    public ResponseEntity patchUser(@Valid @RequestBody UserPatchDto userPatchDto){
        userService.modifyPassword(userPatchDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("/resetPassword")
    public ResponseEntity resetPassword(@Valid @RequestBody PasswordResetDto passwordResetDto){
        userService.resetPassword(passwordResetDto);
        return new ResponseEntity(HttpStatus.OK);
    }
    @DeleteMapping
    public ResponseEntity deleteUser(){
        userService.removeUser();
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/oauthInit")
    public ResponseEntity oauthInitUser(@Valid @RequestBody OAuthInitDto oAuthInitDto){
        userService.oauthUserInit(oAuthInitDto);
        return new ResponseEntity(HttpStatus.OK);
    }

}
