package com.kids.SEB_main_030.domain.like.service;

import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.like.repository.LikeRepository;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostService postService;

    // 좋아요 갯수 카운트
    public int likeCnt(Post post) {
        return likeRepository.countByPost(post);
    }

    // 좋아요 여러 포스트에서 카운트
    public List<Integer> likes(List<Post> posts) {
        List<Integer> likes = new ArrayList<>();
        for (Post post : posts) {
            likes.add(likeCnt(post));
        }
        return likes;
    }

    public void likeToggle(Long postId) {
        Profile profile = postService.getProfile();
        Post post = postService.findPost(postId);
        int likeCnt = likeRepository.findByLikeCountByPostIdOrProfileId(profile, post);

        if (likeCnt > 0) {
            post.setLikeCount(post.getLikeCount() - 1);
            removeLike(profile, post);
        } else {
            post.setLikeCount(post.getLikeCount() + 1);
            saveLike(profile, post);
        }
    }

    private void saveLike(Profile profile, Post post) {
        Like like = new Like();
        like.setPost(post);
        like.setProfile(profile);
        likeRepository.save(like);
    }

    private void removeLike(Profile profile, Post post) {
        likeRepository.deleteLikeByPostIdOrProfileId(profile, post);
    }
}
