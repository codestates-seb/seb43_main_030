package com.kids.SEB_main_030.profile.dto;

import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class ProfilePatchDto {
    private String name;
    private Boolean checkPerson;
    private String gender;
    private String breed;
    private String imageUrl;
}
