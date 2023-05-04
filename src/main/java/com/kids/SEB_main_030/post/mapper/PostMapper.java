package com.kids.SEB_main_030.post.mapper;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.post.dto.PostDto;
import com.kids.SEB_main_030.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

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

    Post postPatchDtoToPost(PostDto.Patch patch);

    PostDto.Response postToPostResponseDto(Post post);

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
