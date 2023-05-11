package com.kids.SEB_main_030.domain.like.controller;

import com.kids.SEB_main_030.domain.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/post/{post-id}/like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @RequestMapping
    public ResponseEntity like(@PathVariable("post-id") @Positive Long postId) {
        likeService.likeToggle(postId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
