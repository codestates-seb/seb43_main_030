package com.kids.SEB_main_030.post.controller;

import com.kids.SEB_main_030.post.service.LikeService;
import com.kids.SEB_main_030.utils.UriCreator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/api/post/{post-id}/like")
public class LikeController {

    private final static String LIKE_DEFAULT_URL = "/api/post/{post-id}/like";
    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    // 게시물 좋아요 기능
    @PostMapping
    public ResponseEntity postLike(@PathVariable("post-id") @Positive Long postId) {

        likeService.saveLike(postId);

        // 좋아요 누른 뒤 페이지로 리다이렉션할 URI 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(LIKE_DEFAULT_URL)
                .buildAndExpand(postId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 게시물 좋아요 취소 기능
    @DeleteMapping("/{like-id}")
    public ResponseEntity<?> deleteLike(@PathVariable("post-id") @Positive Long postId,
                                        @PathVariable("like-id") @Positive Long likeId) {
        likeService.removeLike(likeId);

        // 좋아요 해제 뒤 페이지로 리다이렉션할 URI 생성
        URI location = UriCreator.createUri(
                LIKE_DEFAULT_URL + "/{like-id}", postId, likeId);

        return ResponseEntity.ok().location(location).build();
    }
}
