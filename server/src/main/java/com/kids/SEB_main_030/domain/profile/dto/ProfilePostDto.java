package com.kids.SEB_main_030.domain.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ProfilePostDto {
    @NotBlank
    private String name;
    @NotNull
    private boolean checkPerson;
    private String gender;
    private String breed;
    private String imageUrl;

}
