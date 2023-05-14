package com.kids.SEB_main_030.domain.post.service;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.post.repository.PostRepository;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private static final int SIZE = 10;
    private final PostRepository postRepository;
    private final ProfileService profileService;
    private final UserService userService;
    private final CommunityService communityService;
    private final ImageService imageService;

    // 게시물 등록
    public Post createPost(Post post) {
        post.setProfile(getProfile());
        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        // 본인 인증
        identityVerify(post);
        Post findPost = findVerifiedPost(post.getPostId());
        Optional.ofNullable(post.getTitle()).ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent()).ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getCategory()).ifPresent(category -> findPost.setCategory(category));
        return postRepository.save(findPost);
    }

    public void deletePost(long postId) {
        Post findPost = findVerifiedPost(postId);
        // 본인 인증
        identityVerify(findPost);

        // s3에서 포스트 관련 이미지 삭제
        List<Image> images = imageService.findByPost(findPost);
        for (Image image : images) imageService.s3imageDelete(image.getImageUrl());

        postRepository.delete(findPost);
    }

    public Post findPost(Long postId) {
        Post verifiedPost = findVerifiedPost(postId);
        return verifiedPost;
    }

    public Post findPostIncrementViews(Long postId) {
        Post post = findVerifiedPost(postId);
        post.setViews(post.getViews() + 1);
        return postRepository.save(post);
    }

    public Page<Post> findPosts(Long communityId, int page, String category, String keyword) {
        if (category == null || category.isEmpty()) category = Post.Category.NOTIFICATION.toString();
        else category = categoryToEnum(category).toString();

        Community findCommunity = communityService.findCommunity(communityId);

        Page<Post> pagePosts;
        if (keyword == null || keyword.isEmpty()) {
            pagePosts = postRepository.findAllByCategory(
                    PageRequest.of(page, SIZE, Sort.by("created_at").descending()),
                    findCommunity, category.toUpperCase());
        } else {
            pagePosts = postRepository.findAllByCategoryAndKeyword(
                    PageRequest.of(page, SIZE, Sort.by("created_at").descending()),
                    findCommunity, category.toUpperCase(), keyword);
        }

        return pagePosts;
    }

    private Post findVerifiedPost(long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(() -> new LogicException(CustomException.POST_NOT_FOUND));
    }

    private Post.Category categoryToEnum(String category) {
        switch (category.toUpperCase()) {
            case "NOTIFICATION" : return Post.Category.NOTIFICATION;
            case "COMMUNITY" : return Post.Category.COMMUNITY;
            default: throw new LogicException(CustomException.COMMUNITY_CATEGORY_BAD_REQUEST);
        }
    }

    public Profile getProfile() {
        User user = userService.findVerifiedUser(userService.findSecurityContextHolderUserId());
        Long profileId = user.getCurrentProfileId();
        return profileService.findProfile(profileId);
    }

    private void identityVerify(Post post) {
        Long profileId = getProfile().getProfileId();
        Long postProfileId = findVerifiedPost(post.getPostId()).getProfile().getProfileId();
        if (profileId != postProfileId)
            throw new LogicException(CustomException.NO_AUTHORITY);
    }

    public List<Post> findNotificationPosts(long communityId) {
        Community findCommunity = communityService.findCommunity(communityId);
        return postRepository.findByCategoryAndCommunityId(findCommunity, Post.Category.NOTIFICATION.toString());
    }


}
