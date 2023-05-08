package com.kids.SEB_main_030.email.controller;

import com.kids.SEB_main_030.email.dto.EmailAuthRequestDto;
import com.kids.SEB_main_030.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
        String authCode = emailService.sendEmail(emailDto.getEmail());
        return authCode;
    }

}
