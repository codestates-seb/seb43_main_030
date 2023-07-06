package com.kids.SEB_main_030.global.email.controller;

import com.kids.SEB_main_030.global.email.dto.EmailAuthRequestDto;
import com.kids.SEB_main_030.global.email.service.EmailService;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("api/login/mailConfirm")
    public String mailConfirm(@Valid @RequestBody EmailAuthRequestDto emailDto) throws MessagingException, UnsupportedEncodingException{
        String authCode = emailService.sendAuthMail(emailDto.getEmail(), "auth");
        return authCode;
    }

    @PostMapping("api/login/findPassword")
    public String findPassword(@Valid @RequestBody EmailAuthRequestDto emailDto) throws MessagingException, UnsupportedEncodingException{
        String authCode = emailService.sendAuthMail(emailDto.getEmail(), "password");
        return authCode;
    }
}
