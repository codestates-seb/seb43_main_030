package com.kids.SEB_main_030.domain.user.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class UserPostDto {
    @NotBlank(message = "이메일을 입력하세요.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;
    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password;
    @NotNull
    private boolean checkOfficials;
}
