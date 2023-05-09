package com.kids.SEB_main_030.domain.user.mapper;

import com.kids.SEB_main_030.domain.user.dto.UserPostDto;
import com.kids.SEB_main_030.domain.user.dto.UserResponseDto;
import com.kids.SEB_main_030.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostDtoToUser(UserPostDto userPostDto);
    UserResponseDto userToUserResponse(User user);
}
