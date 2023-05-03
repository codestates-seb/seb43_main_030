package com.kids.SEB_main_030.profile.dto;

import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProfilePatchDto {
    private String name;
    private Profile.type type;
    private String gender;
    private String birth;
    private String breed;
    private String age;
    private String imageUrl;
}
