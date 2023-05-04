package com.kids.SEB_main_030.post.controller;

import com.kids.SEB_main_030.dto.MultiResponseDto;
import com.kids.SEB_main_030.dto.SingleResponseDto;
import com.kids.SEB_main_030.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.post.dto.PostDto;
import com.kids.SEB_main_030.post.entity.Post;
import com.kids.SEB_main_030.post.mapper.PostMapper;
import com.kids.SEB_main_030.post.service.LikeService;
import com.kids.SEB_main_030.post.service.PostService;
import com.kids.SEB_main_030.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/kindergarten/{kindergarten-id}/post")
@Validated
public class PostController {

    private final static String POST_DEFAULT_URL = "/api/kindergarten/{kindergarten-id}/post";
    private final PostMapper postMapper;
    private final PostService postService;
    private final LikeService likeService;
    private final KindergartenService kindergartenService;

    public PostController(PostMapper postMapper,
                          PostService postService,
                          LikeService likeService,
                          KindergartenService kindergartenService) {
        this.postMapper = postMapper;
        this.postService = postService;
        this.likeService = likeService;
        this.kindergartenService = kindergartenService;
    }

    // 게시물 등록
    @PostMapping
    public ResponseEntity postPost(@PathVariable("kindergarten-id") @Positive Long kindergartenId,
                                   @Valid @RequestBody PostDto.Post requestBody) {
        Post post = postMapper.postPostDtoToPost(requestBody);
        post.setKindergarten(kindergartenService.findKindergarten(kindergartenId));
        Post postPost = postService.createPost(post);

        URI location = UriCreator.createUri(
                POST_DEFAULT_URL + "/{post-id}", kindergartenId, postPost.getPostId());
        return ResponseEntity.created(location).build();
    }

    // 게시물 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("kindergarten-id") @Positive Long kindergartenId,
                                    @PathVariable("post-id") @Positive Long postId,
                                    @Valid @RequestBody PostDto.Patch requestBody) {
        Post post = postMapper.postPatchDtoToPost(requestBody);
        post.setPostId(postId);
        post.setKindergarten(kindergartenService.findKindergarten(kindergartenId));
        Post updatePost = postService.updatePost(post);
        return new ResponseEntity(
                new SingleResponseDto(postMapper.postToPostResponseDto(updatePost)), HttpStatus.OK);
    }

    // 게시판 포스트 리스트 출력
    @GetMapping
    public ResponseEntity getPosts(@RequestParam int page,
                                   @RequestParam(required = false) String category,
                                   @RequestParam(required = false) String keyword) {
        Page<Post> pagePosts = postService.findPosts(page - 1, category, keyword);
        List<Post> posts = pagePosts.getContent();
        List<Integer> likes = likeService.likes(posts);

        return new ResponseEntity(new MultiResponseDto<>(
                postMapper.postsToPostCardViewResponseDtos(posts, likes), pagePosts), HttpStatus.OK);
    }

    // 게시물 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
