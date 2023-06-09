package com.kids.SEB_main_030.domain.comment.controller;

import com.kids.SEB_main_030.domain.comment.dto.CommentDto;
import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.comment.mapper.CommentMapper;
import com.kids.SEB_main_030.domain.comment.service.CommentService;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/post/{post-id}/comment")
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final static String COMMENT_DEFAULT_URL = "/api/post/{post-id}/comment";
    private final CommentMapper commentMapper;
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postComment(@PathVariable("post-id") @Positive long postId,
                                      @Valid @RequestBody CommentDto.Post requestBody) {
        Comment createComment = commentService.createComment(commentMapper.commentPostDtoToComment(requestBody), postId);
        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL + "/{comment-id}", postId, createComment.getCommentId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("post-id") @Positive long postId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody) {
        Comment updateComment = commentService.updateComment(commentMapper.commentPatchDtoToComment(requestBody), postId, commentId);
        return new ResponseEntity(
                new SingleResponseDto(commentMapper.commentToPatchResponseDto(updateComment)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComment(@PathVariable("post-id") @Positive long postId) {
        List<Comment> findComments = commentService.findComments(postId);
        return new ResponseEntity(new SingleResponseDto(
                commentMapper.commentsAndProfilesAndUsersToCardViewResponseDtos(findComments)), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
