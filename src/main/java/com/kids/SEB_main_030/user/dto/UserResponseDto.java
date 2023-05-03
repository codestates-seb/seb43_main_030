package com.kids.SEB_main_030.user.dto;

import com.kids.SEB_main_030.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {
    private long userId;
    private String email;
    private long currentProfileId;
    private User.UserStatus userStatus;
}
