package com.kids.SEB_main_030.profile.dto;

import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.Getter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class ProfilePostDto {
    @NotBlank
    private String name;
    @NotNull
    private boolean checkPerson;
    private String gender;
    private String breed;
    private String imageUrl;

}
