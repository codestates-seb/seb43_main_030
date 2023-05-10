package com.kids.SEB_main_030.domain.post.controller;

import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.post.mapper.PostMapper;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.global.dto.MultiResponseDto;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.service.ImageService;
import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.like.service.LikeService;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
public class PostController {
    private final static String POST_DEFAULT_URL = "/api/community/{community-id}/post";
    private final PostMapper postMapper;
    private final PostService postService;
    private final LikeService likeService;
    private final CommunityService communityService;
    private final ImageService imageService;

    // 게시물 등록
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPost(@PathVariable("community-id") @Positive Long communityId,
                                   @Valid @RequestPart PostDto.Post requestBody,
                                   @RequestPart(required = false) List<MultipartFile> images) {
        Post post = postMapper.postPostDtoToPost(requestBody);
        post.setCommunity(communityService.findCommunity(communityId));
        Post postPost = postService.createPost(post);
        // image 업로드 로직(post)
        if (images != null)
            imageService.imagesUpload(images, postPost, Image.Location.POST.getLocation());
        URI location = UriCreator.createUri(
                POST_DEFAULT_URL + "/{post-id}", communityId, postPost.getPostId());
        return ResponseEntity.created(location).build();
    }

    // 게시물 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("community-id") @Positive Long communityId,
                                    @PathVariable("post-id") @Positive Long postId,
                                    @Valid @RequestPart PostDto.Patch requestBody,
                                    @RequestPart(required = false) List<MultipartFile> images,
                                    @RequestPart(required = false) List<Integer> deleteImageIds) {
        Post post = postMapper.postPatchDtoToPost(requestBody);
        post.setPostId(postId);
        post.setCommunity(communityService.findCommunity(communityId));

        Post updatePost = postService.updatePost(post);
        return new ResponseEntity(
                new SingleResponseDto(postMapper.postToPostResponseDto(updatePost)), HttpStatus.OK);
    }

    // 게시판 상세 페이지 출력
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive Long postId) {
        Post post = postService.findPostIncrementViews(postId);
        int likes = likeService.likeCnt(post);
        Profile profile = post.getProfile();
        List<String> postImageUrls = imageService.findImageUrlsByPostId(post);
        String profileImageUrl = imageService.findTopImage(post).getImageUrl(); // 예시임 profileService 에 이미지 관련로직 생기면 바꿔야함
        return new ResponseEntity(
                new SingleResponseDto(postMapper.postToDetailPageResponse(post, likes, profile, postImageUrls, profileImageUrl)),
                HttpStatus.OK);
    }

    // 게시판 게시물 리스트 출력
    @GetMapping
    public ResponseEntity getPosts(@PathVariable("community-id") @Positive Long communityId,
                                   @RequestParam int page,
                                   @RequestParam(required = false) String category,
                                   @RequestParam(required = false) String keyword) {
        Page<Post> pagePosts = postService.findPosts(communityId, page - 1, category, keyword);
        List<Post> posts = pagePosts.getContent();
        List<Integer> likes = likeService.likes(posts);
        List<String> imageUrls = imageService.findTopImages(posts);

        return new ResponseEntity(new MultiResponseDto<>(
                postMapper.postsToPostCardViewResponseDtos(posts, likes, imageUrls), pagePosts), HttpStatus.OK);
    }

    // 게시물 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
