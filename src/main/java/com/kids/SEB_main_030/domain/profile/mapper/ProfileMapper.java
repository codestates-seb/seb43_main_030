package com.kids.SEB_main_030.domain.profile.mapper;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.profile.dto.*;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    Profile profilePostToProfile(ProfilePostDto profilePostDto);
    Profile profilePatchToProfile(ProfilePatchDto profilePatchDto);
    @Mapping(source = "user.email", target = "email")
    PersonProfileResponseDto profileToPersonProfileDto(Profile profile);
    @Mapping(source = "user.email", target = "email")
    DogProfileResponseDto profileToDogProfileDto(Profile profile);
    @Mapping(source = "user.email", target = "email")
    List<PersonProfileResponseDto> profilesToReponseDtos(List<Profile> profiles);
    List<MyPostResponseDto> postsInMyPage(List<Post> posts);
}
