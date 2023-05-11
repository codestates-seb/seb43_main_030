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

    @Mapping(source = "comment.createdAt", target = "createdAt")
    CommentDto.CardViewResponse commentAndProfileAndUserToCardViewResponseDto(
            Comment comment, Profile profile, User user);
    default List<CommentDto.CardViewResponse> commentsAndProfilesAndUsersToCardViewResponseDtos(
            List<Comment> comments, List<Profile> profiles, List<User> users) {
        List<CommentDto.CardViewResponse> cardViewResponses = new ArrayList<>();
        for (int i = 0; i < comments.size(); i++) {
            cardViewResponses.add(commentAndProfileAndUserToCardViewResponseDto(
                    comments.get(i), profiles.get(i), users.get(i)));
        }
        return cardViewResponses;
    }
}
