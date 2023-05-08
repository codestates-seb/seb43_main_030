package com.kids.SEB_main_030.post.mapper;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.post.dto.PostDto;
import com.kids.SEB_main_030.post.entity.Post;
import com.kids.SEB_main_030.profile.entity.Profile;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostDto.Response postToPostResponseDto(Post post);

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

    default PostDto.CardViewResponse postToPostCardViewResponseDto(Post post, int likes) {
        PostDto.CardViewResponse response = new PostDto.CardViewResponse();
        response.setPostId(post.getPostId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setViews(post.getViews());
        response.setLikes(likes);
        return response;
    }

    default PostDto.DetailPageResponse postToDetailPageResponse(Post post, int likes, Profile profile) {
        PostDto.DetailPageResponse detailPageResponse = new PostDto.DetailPageResponse();
        detailPageResponse.setPostId(post.getPostId());
        detailPageResponse.setTitle(post.getTitle());
        detailPageResponse.setContent(post.getContent());
        detailPageResponse.setCategory(post.getCategory().toString());
        detailPageResponse.setName(profile.getName());
        detailPageResponse.setLikes(likes);
        detailPageResponse.setCreatedAt(post.getCreatedAt());
        return detailPageResponse;
    }

    default Post postPatchDtoToPost(PostDto.Patch patch) {
        if ( patch == null ) {
            return null;
        }

        Post post = new Post();

        post.setPostId( patch.getPostId() );
        post.setTitle( patch.getTitle() );
        post.setContent( patch.getContent() );
        post.setCategory(categoryToEnum(patch.getCategory()));

        return post;
    };


    default List<PostDto.CardViewResponse> postsToPostCardViewResponseDtos(List<Post> posts, List<Integer> likes) {
        List<PostDto.CardViewResponse> responses = new ArrayList<>();
        for (int i = 0; i < posts.size(); i++)
            responses.add(postToPostCardViewResponseDto(posts.get(i), likes.get(i)));
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
