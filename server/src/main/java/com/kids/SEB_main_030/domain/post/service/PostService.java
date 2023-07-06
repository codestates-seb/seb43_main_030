package com.kids.SEB_main_030.domain.post.service;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.post.mapper.PostMapper;
import com.kids.SEB_main_030.global.dto.MultiResponseDto;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
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
import org.springframework.web.multipart.MultipartFile;

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
    private final PostMapper postMapper;

    // 게시물 등록
    public Post createPost(Post post, List<MultipartFile> images, long communityId) {
        post.setProfile(getProfile());
        if (post.getCategory() == Post.Category.NOTIFICATION)
            if (!userService.findSecurityContextHolderRole().equals("OFFICIAL"))
                throw new LogicException(CustomException.NOTIFICATION_NOT_AUTHORITY);
        post.setCommunity(communityService.findCommunity(communityId));
        if (images != null) imageService.imagesUpload(images, post, Image.Location.POST.getLocation());
        return postRepository.save(post);
    }

    public PostDto.Response updatePost(Post post, List<MultipartFile> images, long communityId, long postId) {
        post.setPostId(postId);
        // 본인 인증
        identityVerify(post);

        if (post.getCategory() == Post.Category.NOTIFICATION)
            if (!userService.findSecurityContextHolderRole().equals("OFFICIAL"))
                throw new LogicException(CustomException.NOTIFICATION_NOT_AUTHORITY);

        Post findPost = findVerifiedPost(post.getPostId());
        Optional.ofNullable(post.getTitle()).ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent()).ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getCategory()).ifPresent(category -> findPost.setCategory(category));
//        findPost.setCommunity(communityService.findCommunity(communityId));
        findPost.setModified(true);

        if (images != null) imageService.imagesUpload(images, findPost, Image.Location.POST.getLocation());
        if (post.getDeleteImageIds() != null) {
            List<Image> findImages = imageService.findImagesByImageIds(post.getDeleteImageIds());
            imageService.imagesDelete(findImages);
        }
        return postMapper.postToPostResponseDto(postRepository.save(findPost));
    }

    // 게시판 상세 페이지 출력


    // 게시판 게시물 리스트 출력
    public MultiResponseDto findCardViewResponse (long communityId, int page, String category, String keyword) {
        Page<Post> pagePosts = findPosts(communityId, page, category, keyword);
        List<Post> posts = pagePosts.getContent();
        return new MultiResponseDto(
                postMapper.postsToPostCardViewResponseDtos(posts, imageService.findTopImages(posts)), pagePosts);
    }

    public void deletePost(long postId) {
        Post findPost = findVerifiedPost(postId);

        identityVerify(findPost);

        List<Image> images = imageService.findByPost(findPost);
        for (Image image : images) imageService.s3imageDelete(image.getImageUrl());

        postRepository.delete(findPost);
    }

    public SingleResponseDto findNotificationPosts(long communityId) {
        return new SingleResponseDto(postMapper.postsToGetNotifications(
                postRepository.findByCategoryAndCommunityId(
                        communityService.findCommunity(communityId), Post.Category.NOTIFICATION.toString())));
    }

    public Post findPost(Long postId) {
        Post verifiedPost = findVerifiedPost(postId);
        return verifiedPost;
    }

    public Profile getProfile() {
        User user = userService.findVerifiedUser(userService.findSecurityContextHolderUserId());
        Long profileId = user.getCurrentProfileId();
        return profileService.findProfile(profileId);
    }

    public Post findPostIncrementViews(Long postId) {
        Post post = findVerifiedPost(postId);
        post.setViews(post.getViews() + 1);
        return postRepository.save(post);
    }

    private Page<Post> findPosts(Long communityId, int page, String category, String keyword) {
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


    private void identityVerify(Post post) {
        Long profileId = getProfile().getProfileId();
        Long postProfileId = findVerifiedPost(post.getPostId()).getProfile().getProfileId();
        if (profileId != postProfileId)
            throw new LogicException(CustomException.NO_AUTHORITY);
    }



}
