package com.kids.SEB_main_030.post.mapper;

import com.kids.SEB_main_030.post.dto.PostDto;
import com.kids.SEB_main_030.post.entity.Post;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-08T15:46:43+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class PostMapperImpl implements PostMapper {

    @Override
    public PostDto.Response postToPostResponseDto(Post post) {
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

        return response;
    }
}
