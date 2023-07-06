package com.kids.SEB_main_030.domain.comment.mapper;

import com.kids.SEB_main_030.domain.comment.dto.CommentDto;
import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentDto.Post post);
    Comment commentPatchDtoToComment(CommentDto.Patch patch);
    CommentDto.PatchResponse commentToPatchResponseDto(Comment comment);

    @Mapping(target = "name", source = "comment.profile.name")
    @Mapping(target = "imageUrl", source = "comment.profile.imageUrl")
    @Mapping(target = "email", source = "comment.profile.user.email")
    CommentDto.CardViewResponse commentAndProfileAndUserToCardViewResponseDto(
            Comment comment);
    default List<CommentDto.CardViewResponse> commentsAndProfilesAndUsersToCardViewResponseDtos(List<Comment> comments) {
        List<CommentDto.CardViewResponse> cardViewResponses = new ArrayList<>();
        for (int i = 0; i < comments.size(); i++) {
            cardViewResponses.add(commentAndProfileAndUserToCardViewResponseDto(comments.get(i)));
        }
        return cardViewResponses;
    }
}
