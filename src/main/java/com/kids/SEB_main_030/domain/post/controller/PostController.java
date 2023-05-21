package com.kids.SEB_main_030.domain.post.controller;

import com.kids.SEB_main_030.domain.like.service.LikeService;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.post.mapper.PostMapper;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/community/{community-id}/post")
@RequiredArgsConstructor
@Transactional
@Validated
@Slf4j
public class PostController {
    private final static String POST_DEFAULT_URL = "/api/community/{community-id}/post";
    private final PostMapper postMapper;
    private final PostService postService;
    private final LikeService likeService;

    // 게시물 등록
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPost(@PathVariable("community-id") @Positive Long communityId,
                                   @Valid @RequestPart(name = "postDto") PostDto.Post requestBody,
                                   @RequestPart(required = false) List<MultipartFile> images) {
        Post postPost = postService.createPost(postMapper.postPostDtoToPost(requestBody), images, communityId);
        URI location = UriCreator.createUri(POST_DEFAULT_URL + "/{post-id}", communityId, postPost.getPostId());
        return ResponseEntity.created(location).build();
    }

    // 게시물 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("community-id") @Positive Long communityId,
                                    @PathVariable("post-id") @Positive Long postId,
                                    @Valid @RequestPart(name = "patchDto", required = false) PostDto.Patch requestBody,
                                    @RequestPart(required = false) List<MultipartFile> images) {
        return new ResponseEntity(new SingleResponseDto(
                postService.updatePost(postMapper.postPatchDtoToPost(requestBody), images, communityId, postId)), HttpStatus.OK);
    }

    // 게시판 상세 페이지 출력
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive Long postId) {
        Post post = postService.findPostIncrementViews(postId);
        return new ResponseEntity(new SingleResponseDto(
                        postMapper.postToDetailPageResponse(post, likeService.isToLike(post))), HttpStatus.OK);
    }

    // 게시판 게시물 리스트 출력
    @GetMapping
    public ResponseEntity getPosts(@PathVariable("community-id") @Positive Long communityId,
                                   @RequestParam int page,
                                   @RequestParam(required = false) String category,
                                   @RequestParam(required = false) String keyword) {
        return new ResponseEntity(
                postService.findCardViewResponse(communityId, page - 1, category, keyword), HttpStatus.OK);
    }

    // 게시물 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 유치원 상세 페이지 공지글 조회(최대2개)
    @GetMapping("/notification")
    public ResponseEntity getNotificationPosts(@PathVariable("community-id") @Positive long communityId) {
        return new ResponseEntity(postService.findNotificationPosts(communityId), HttpStatus.OK);
    }


}
