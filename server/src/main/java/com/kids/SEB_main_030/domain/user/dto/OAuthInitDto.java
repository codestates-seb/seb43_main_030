package com.kids.SEB_main_030.domain.user.dto;

import com.kids.SEB_main_030.domain.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class OAuthInitDto {
    private String email;
    @NotNull
    private boolean checkOfficials;
}
