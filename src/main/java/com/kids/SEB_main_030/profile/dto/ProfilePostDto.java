package com.kids.SEB_main_030.profile.dto;

import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;

@Getter
public class ProfilePostDto {
    @NotBlank
    private String name;
    @NotBlank
    private Profile.type type;
    private String gender;
    private String birth;
    private String breed;
    private String age;
    private String imageUrl;

}
