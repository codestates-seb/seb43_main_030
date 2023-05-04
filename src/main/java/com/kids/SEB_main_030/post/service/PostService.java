package com.kids.SEB_main_030.post.service;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.post.controller.PostController;
import com.kids.SEB_main_030.post.entity.Post;
import com.kids.SEB_main_030.post.repository.PostRepository;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.service.ProfileService;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {

    private static final int SIZE = 10;
    private final PostRepository postRepository;
    private final ProfileService profileService;
    private final UserService userService;

    public PostService(PostRepository postRepository,
                       ProfileService profileService,
                       UserService userService) {
        this.postRepository = postRepository;
        this.profileService = profileService;
        this.userService = userService;
    }

    // 게시물 등록
    public Post createPost(Post post) {
        post.setProfile(getProfileByUserId());
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
        postRepository.delete(findPost);
    }

    public Page<Post> findPosts(int page, String category, String keyword) {
        if (category == null || category.isEmpty()) category = Post.Category.NOTIFICATION.toString();
        else category = categoryToEnum(category).toString();

        Page<Post> pagePosts;
        if (keyword == null || keyword.isEmpty()) {
            pagePosts = postRepository.findAllByCategory(
                    PageRequest.of(page, SIZE, Sort.by("created_at").descending()),
                    category.toUpperCase());
        } else {
            pagePosts = postRepository.findAllByCategoryAndKeyword(
                    PageRequest.of(page, SIZE, Sort.by("created_at").descending()),
                    category.toUpperCase(),
                    keyword);
        }

        return pagePosts;
    }

    public Post findVerifiedPost(long postId) {
        Optional<Post> optionalQuestion = postRepository.findById(postId);
        return optionalQuestion.orElseThrow(() -> new LogicException(CustomException.POST_NOT_FOUND));
    }

    private Post.Category categoryToEnum(String category) {
        switch (category.toUpperCase()) {
            case "NOTIFICATION" : return Post.Category.NOTIFICATION;
            case "COMMUNITY" : return Post.Category.COMMUNITY;
            // 카테고리 값이 null 이거나 위에 2개가 아닐시 예외처리 만들어야됨
            default: throw new LogicException(CustomException.COMMUNITY_CATEGORY_BAD_REQUEST);
        }
    }

    public Profile getProfileByUserId() {
        User user = userService.findVerifiedUser(userService.findSecurityContextHolderUserId());
        Long profileId = user.getCurrentProfileId();
        return profileService.findProfile(profileId);
    }

    private void identityVerify(Post post) {
        Long profileId = getProfileByUserId().getProfileId();
        Long postProfileId = findVerifiedPost(post.getPostId()).getProfile().getProfileId();
        if (profileId != postProfileId)
            throw new LogicException(CustomException.NO_AUTHORITY);
    }



}
