package com.kids.SEB_main_030.global.email.service;

import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.utils.RandomCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final RandomCreator randomCreator;
    private final UserRepository userRepository;
    private String authCode;

    // 메일 전송
    public String sendAuthMail(String email, String s) throws MessagingException, UnsupportedEncodingException {
        authCode = randomCreator.createAuthCode();
        MimeMessage message = null;
        if (s.equals("password")){
             message = createPasswordForm(email);
             userRepository.findByEmail(email).orElseThrow(() -> new LogicException(CustomException.USER_NOT_FOUND));
        }
        if (s.equals("auth")) {
            message = createMessageForm(email);
            userRepository.findByEmail(email).ifPresent(user -> {
                throw new LogicException(CustomException.USER_EXISTS);
            });
        }
        try{
            javaMailSender.send(message);
        } catch (MailException e){
            e.printStackTrace();
            throw new LogicException(CustomException.MAIL_SEND_FAIL);
        }

        return authCode;
    }

    private MimeMessage createMessageForm(String email) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        // 받는 사람 이메일 주소와 제목 설정
        helper.setTo(email);
        helper.setSubject("Perpett 회원가입 이메일 인증");

        // 본문 HTML 작성
        String htmlBody =
                "<html><body>" +
                        "<h1>Perpett 인증정보</h1>" +
                        "<p>안녕하세요 Perpett 입니다.</p>" +
                        "<p>저희 Perpett를 이용해주셔서 대단히 감사드립니다.</p>" +
                        "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요.</p>" +
                "<br><p><strong>CODE:</strong> " + authCode + "</p></body></html>";

        // 본문 HTML 추가
        helper.setText(htmlBody, true);

        // 보내는 사람 이메일 주소와 이름 설정
        helper.setFrom(new InternetAddress("Perpett@naver.com", "퍼펫트"));

        return message;
    }

    private MimeMessage createPasswordForm(String email) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        // 받는 사람 이메일 주소와 제목 설정
        helper.setTo(email);
        helper.setSubject("Perpett 비밀번호 찾기 이메일 인증");

        // 본문 HTML 작성
        String htmlBody =
                "<html><body>" +
                        "<h1>Perpett 인증정보</h1>" +
                        "<p>안녕하세요 Perpett 입니다.</p>" +
                        "<p>저희 Perpett를 이용해주셔서 대단히 감사드립니다.</p>" +
                        "<p>아래 코드를 사이트로 돌아가 입력해주세요.</p>" +
                        "<br><p><strong>CODE:</strong> " + authCode + "</p></body></html>";

        // 본문 HTML 추가
        helper.setText(htmlBody, true);
        // 보내는 사람 이메일 주소와 이름 설정
        helper.setFrom(new InternetAddress("Perpett@naver.com", "퍼펫트"));
        return message;
    }

}
