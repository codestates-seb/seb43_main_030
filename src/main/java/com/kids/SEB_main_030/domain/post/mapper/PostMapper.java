package com.kids.SEB_main_030.domain.post.mapper;

import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import org.mapstruct.*;

import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.global.image.entity.Image;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "category", expression = "java(categoryToEnum(post.getCategory()))")
    Post postPostDtoToPost(PostDto.Post post);

    default Post postPatchDtoToPost(PostDto.Patch patch) {
            Post post = new Post();
            if ( patch == null ) {
                return post;
            }
            if ( patch.getCategory() != null ) {
                post.setCategory( categoryToEnum( patch.getCategory() ) );
            }
            post.setTitle( patch.getTitle() );
            post.setContent( patch.getContent() );
            post.setDeleteImageIds(patch.getDeleteImageIds());
            return post;
    }

    @Mapping(target = "images", expression = "java(imagesToPostImageResponseDtos(post.getImages()))")
    PostDto.Response postToPostResponseDto(Post post);
    @Mapping(target = "postImageUrl", source = "postImageUrl")
    @Mapping(target = "likeCount", source = "post.likeCount")
    @Mapping(target = "profileImageUrl", source = "post.profile.imageUrl")
    @Mapping(target = "name", source = "post.profile.name")
    @Mapping(target = "modified", source = "post.modified")
    PostDto.CardViewResponse postToPostCardViewResponseDto(Post post, String postImageUrl);
    default List<PostDto.CardViewResponse> postsToPostCardViewResponseDtos(List<Post> posts, List<String> postImageUrls) {
        List<PostDto.CardViewResponse> cardViewResponses = new ArrayList<>();
        for (int i = 0; i < posts.size(); i++) {
            cardViewResponses.add(postToPostCardViewResponseDto(posts.get(i), postImageUrls.get(i)));
        }
        return cardViewResponses;
    }
    @Mapping(target = "images", expression = "java(imagesToPostImageResponseDtos(post.getImages()))")
    @Mapping(target = "profileId", source = "post.profile.profileId")
    @Mapping(target = "profileImageUrl", source = "post.profile.imageUrl")
    @Mapping(target = "name", source = "post.profile.name")
    @Mapping(target = "like", source = "isToLike")
    PostDto.DetailPageResponse postToDetailPageResponse(Post post, boolean isToLike);
    PostDto.getNotification postToGetNotification(Post post);
    List<PostDto.getNotification> postsToGetNotifications(List<Post> posts);
    List<PostDto.ImageResponse> imagesToPostImageResponseDtos(List<Image> images);
    PostDto.ImageResponse imageToPostImageResponseDto(Image image);
    default Post.Category categoryToEnum(String category) {
        switch (category.toUpperCase()) {
            case "NOTIFICATION" : return Post.Category.NOTIFICATION;
            case "COMMUNITY" : return Post.Category.COMMUNITY;
            // 카테고리 값이 null 이거나 위에 2개가 아닐시 예외처리 만들어야됨
            default: throw new LogicException(CustomException.COMMUNITY_CATEGORY_BAD_REQUEST);
        }
    }
}
