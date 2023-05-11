package com.kids.SEB_main_030.domain.comment.service;

import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.comment.repository.CommentRepository;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostService postService;
    private final ProfileService profileService;
    private final UserService userService;

    public Comment createComment(Comment comment) {
        comment.setProfile(postService.getProfile());
        return commentRepository.save(comment);
    }
    public Comment updateComment(Comment comment) {
        identityVerify(comment);
        Comment findComment = findVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        return commentRepository.save(findComment);
    }

    public List<Comment> findComments(long postId) {
        Post findPost = postService.findPost(postId);
        return commentRepository.findByPost(findPost);
    }

    public List<Profile> findProfilesByComments(List<Comment> comments) {
         return comments.stream()
                .map(comment -> profileService.verifyProfile(comment.getProfile().getProfileId()))
                .collect(Collectors.toList());
    }

    public List<User> findUsersByProfiles(List<Profile> profiles) {
        return profiles.stream()
                .map(profile -> userService.findVerifiedUser(profile.getUser().getUserId()))
                .collect(Collectors.toList());
    }

    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        identityVerify(findComment);
        commentRepository.delete(findComment);
    }

    private Comment findVerifiedComment(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new LogicException(CustomException.COMMENT_NOT_FOUND));
    }

    private void identityVerify(Comment comment) {
        Long profileId = postService.getProfile().getProfileId();
        Long postProfileId = findVerifiedComment(comment.getCommentId()).getProfile().getProfileId();
        if (profileId != postProfileId)
            throw new LogicException(CustomException.NO_AUTHORITY);
    }

}
