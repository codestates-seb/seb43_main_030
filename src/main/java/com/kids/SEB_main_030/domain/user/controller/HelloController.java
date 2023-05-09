package com.kids.SEB_main_030.domain.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {
    @GetMapping("/hello-oauth2")
    public String home() {
        return "hello-oauth2";
    }
}
