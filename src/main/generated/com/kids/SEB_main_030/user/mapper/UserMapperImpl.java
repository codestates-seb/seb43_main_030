package com.kids.SEB_main_030.user.mapper;

import com.kids.SEB_main_030.user.dto.UserPostDto;
import com.kids.SEB_main_030.user.dto.UserResponseDto;
import com.kids.SEB_main_030.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-08T15:46:42+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(UserPostDto userPostDto) {
        if ( userPostDto == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( userPostDto.getEmail() );
        user.setPassword( userPostDto.getPassword() );

        return user;
    }

    @Override
    public UserResponseDto userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto userResponseDto = new UserResponseDto();

        if ( user.getUserId() != null ) {
            userResponseDto.setUserId( user.getUserId() );
        }
        userResponseDto.setEmail( user.getEmail() );
        userResponseDto.setCurrentProfileId( user.getCurrentProfileId() );
        userResponseDto.setUserStatus( user.getUserStatus() );

        return userResponseDto;
    }
}
