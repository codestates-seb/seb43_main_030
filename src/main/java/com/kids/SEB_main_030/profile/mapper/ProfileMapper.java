package com.kids.SEB_main_030.profile.mapper;

import com.kids.SEB_main_030.profile.dto.DogProfileResponseDto;
import com.kids.SEB_main_030.profile.dto.PersonProfileResponseDto;
import com.kids.SEB_main_030.profile.dto.ProfilePatchDto;
import com.kids.SEB_main_030.profile.dto.ProfilePostDto;
import com.kids.SEB_main_030.profile.entity.Profile;
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
}
