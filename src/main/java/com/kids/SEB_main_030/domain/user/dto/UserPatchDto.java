package com.kids.SEB_main_030.domain.user.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class UserPatchDto {
    @NotBlank
    private String curPassword;
    @NotBlank
    private String password1;
    @NotBlank
    private String password2;
}
