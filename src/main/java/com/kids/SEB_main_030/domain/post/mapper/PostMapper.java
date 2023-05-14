package com.kids.SEB_main_030.domain.post.mapper;

import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.global.image.entity.Image;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostDto.getNotification postToGetNotification(Post post);

    List<PostDto.getNotification> postsToGetNotifications(List<Post> posts);

    default PostDto.Response postToPostResponseDto(Post post, List<Image> images) {
        if ( post == null ) {
            return null;
        }
        PostDto.Response response = new PostDto.Response();

        if ( post.getPostId() != null ) {
            response.setPostId( post.getPostId() );
        }
        response.setTitle( post.getTitle() );
        response.setContent( post.getContent() );
        response.setViews( post.getViews() );

        response.setImages(imagesToPostImageDtos(images));
        return response;
    }

    default Post postPostDtoToPost(PostDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Post post1 = new Post();

        post1.setTitle( post.getTitle() );
        post1.setContent( post.getContent() );
        post1.setCategory(categoryToEnum(post.getCategory()));

        return post1;
    };

    default PostDto.CardViewResponse postToPostCardViewResponseDto(Post post, int likes, String imageUrl) {
        PostDto.CardViewResponse response = new PostDto.CardViewResponse();
        response.setPostId(post.getPostId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setViews(post.getViews());
        response.setLikes(likes);
        response.setImageUrl(imageUrl);
        return response;
    }

    default PostDto.DetailPageResponse postToDetailPageResponse(Post post, int likes, Profile profile, List<Image> images, String profileImageUrl) {
        PostDto.DetailPageResponse detailPageResponse = new PostDto.DetailPageResponse();
        detailPageResponse.setPostId(post.getPostId());
        detailPageResponse.setTitle(post.getTitle());
        detailPageResponse.setContent(post.getContent());
        detailPageResponse.setCategory(post.getCategory().toString());
        detailPageResponse.setName(profile.getName());
        detailPageResponse.setLikes(likes);
        detailPageResponse.setCreatedAt(post.getCreatedAt());
        detailPageResponse.setImages(imagesToPostImageDtos(images));
        detailPageResponse.setProfileImageUrl(profileImageUrl);
        return detailPageResponse;
    }

    default List<PostDto.Image> imagesToPostImageDtos(List<Image> images) {
        if (images == null || images.isEmpty()) {
            return null;
        }
        List<PostDto.Image> imageDtos = new ArrayList<>();
        for (Image image : images) {
            imageDtos.add(imageToPostImageDto(image));
        }

        return imageDtos;
    }

    default PostDto.Image imageToPostImageDto(Image image) {
        if (image == null) {
            return null;
        }
        PostDto.Image imageDto = new PostDto.Image();
        imageDto.setImageId(image.getImageId());
        imageDto.setImageUrl(image.getImageUrl());
        return imageDto;
    }

    default Post postPatchDtoToPost(PostDto.Patch patch) {
        Post post = new Post();
        if ( patch == null ) {
            return post;
        }

        post.setTitle( patch.getTitle() );
        post.setContent( patch.getContent() );
        if (patch.getCategory() != null)
            post.setCategory(categoryToEnum(patch.getCategory()));

        return post;
    };


    default List<PostDto.CardViewResponse> postsToPostCardViewResponseDtos(List<Post> posts, List<Integer> likes, List<String> imageUrls) {
        List<PostDto.CardViewResponse> responses = new ArrayList<>();
        for (int i = 0; i < posts.size(); i++)
            responses.add(postToPostCardViewResponseDto(posts.get(i), likes.get(i), imageUrls.get(i)));
        return responses;
    };


    private Post.Category categoryToEnum(String category) {
        switch (category.toUpperCase()) {
            case "NOTIFICATION" : return Post.Category.NOTIFICATION;
            case "COMMUNITY" : return Post.Category.COMMUNITY;
            // 카테고리 값이 null 이거나 위에 2개가 아닐시 예외처리 만들어야됨
            default: throw new LogicException(CustomException.COMMUNITY_CATEGORY_BAD_REQUEST);
        }
    }
}
