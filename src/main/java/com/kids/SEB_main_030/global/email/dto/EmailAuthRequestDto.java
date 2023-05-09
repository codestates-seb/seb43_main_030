package com.kids.SEB_main_030.global.email.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class EmailAuthRequestDto {

    @NotEmpty(message = "이메일을 입력해주세요")
    public String email;
}
