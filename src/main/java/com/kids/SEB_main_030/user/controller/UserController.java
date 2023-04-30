package com.kids.SEB_main_030.user.controller;

import com.kids.SEB_main_030.user.dto.UserPostDto;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.mapper.UserMapper;
import com.kids.SEB_main_030.user.service.UserService;
import com.kids.SEB_main_030.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@Slf4j
@Validated
@RequestMapping("/api/users")
@RestController
public class UserController {
    private final static String USER_DEFAULT_URL = "/users";
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping("/join")
    public ResponseEntity postUser(@Valid @RequestBody UserPostDto userPostDto){
        User user = userService.createUser(mapper.userPostDtoToUser(userPostDto));
        URI location = UriCreator.createUri(USER_DEFAULT_URL, user.getUserId());
        return ResponseEntity.created(location).build();
    }
}
