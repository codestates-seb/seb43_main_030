package com.kids.SEB_main_030.profile.mapper;

import com.kids.SEB_main_030.profile.dto.DogProfileResponseDto;
import com.kids.SEB_main_030.profile.dto.PersonProfileResponseDto;
import com.kids.SEB_main_030.profile.dto.ProfilePatchDto;
import com.kids.SEB_main_030.profile.dto.ProfilePostDto;
import com.kids.SEB_main_030.profile.entity.Profile;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-08T15:46:43+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public Profile profilePostToProfile(ProfilePostDto profilePostDto) {
        if ( profilePostDto == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setName( profilePostDto.getName() );
        profile.setGender( profilePostDto.getGender() );
        profile.setBreed( profilePostDto.getBreed() );
        profile.setImageUrl( profilePostDto.getImageUrl() );
        profile.setCheckPerson( profilePostDto.isCheckPerson() );

        return profile;
    }

    @Override
    public Profile profilePatchToProfile(ProfilePatchDto profilePatchDto) {
        if ( profilePatchDto == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setName( profilePatchDto.getName() );
        profile.setGender( profilePatchDto.getGender() );
        profile.setBreed( profilePatchDto.getBreed() );
        profile.setImageUrl( profilePatchDto.getImageUrl() );
        if ( profilePatchDto.getCheckPerson() != null ) {
            profile.setCheckPerson( profilePatchDto.getCheckPerson() );
        }

        return profile;
    }

    @Override
    public PersonProfileResponseDto profileToPersonProfileDto(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        PersonProfileResponseDto personProfileResponseDto = new PersonProfileResponseDto();

        if ( profile.getProfileId() != null ) {
            personProfileResponseDto.setProfileId( profile.getProfileId() );
        }
        personProfileResponseDto.setName( profile.getName() );
        personProfileResponseDto.setImageUrl( profile.getImageUrl() );

        return personProfileResponseDto;
    }

    @Override
    public DogProfileResponseDto profileToDogProfileDto(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        DogProfileResponseDto dogProfileResponseDto = new DogProfileResponseDto();

        if ( profile.getProfileId() != null ) {
            dogProfileResponseDto.setProfileId( profile.getProfileId() );
        }
        dogProfileResponseDto.setName( profile.getName() );
        dogProfileResponseDto.setGender( profile.getGender() );
        dogProfileResponseDto.setBreed( profile.getBreed() );
        dogProfileResponseDto.setImageUrl( profile.getImageUrl() );

        return dogProfileResponseDto;
    }

    @Override
    public List<PersonProfileResponseDto> profilesToReponseDtos(List<Profile> profiles) {
        if ( profiles == null ) {
            return null;
        }

        List<PersonProfileResponseDto> list = new ArrayList<PersonProfileResponseDto>( profiles.size() );
        for ( Profile profile : profiles ) {
            list.add( profileToPersonProfileDto( profile ) );
        }

        return list;
    }
}
