package com.kids.SEB_main_030.domain.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfilePatchDto {
    private String name;
    private Boolean checkPerson;
    private String gender;
    private String breed;
    private String imageUrl;
}
