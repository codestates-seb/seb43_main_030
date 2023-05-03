package com.kids.SEB_main_030.email.controller;

import com.kids.SEB_main_030.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    private final JavaMailSender javaMailSender;

    public EmailController(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @PostMapping("/api/mail/send")
    public ResponseEntity send(){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo("net1645@naver.com");
        simpleMailMessage.setSubject("스프링으로 보내는 이메일 타이틀!");
        simpleMailMessage.setText("스프링으로 보내는 이메일 내용! \n" +
                "이런식으로 메일 내용이 전달됩니다!! \n" +
                "모두 스프링으로 메일을 전달해보세요!!!");

        // 이메일 발신
        javaMailSender.send(simpleMailMessage);

        // 결과 반환
        return ResponseEntity.ok(true);
    }
}
