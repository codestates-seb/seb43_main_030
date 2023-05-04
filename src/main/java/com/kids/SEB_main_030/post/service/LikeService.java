package com.kids.SEB_main_030.post.service;

import com.kids.SEB_main_030.post.entity.Like;
import com.kids.SEB_main_030.post.entity.Post;
import com.kids.SEB_main_030.post.repository.LikeRepository;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostService postService;
    private final UserService userService;



    public LikeService(LikeRepository likeRepository,
                       PostService postService,
                       UserService userService) {
        this.likeRepository = likeRepository;
        this.postService = postService;
        this.userService = userService;
    }

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

    public void saveLike(Long postId) {
        Post post = postService.findVerifiedPost(postId);
        Profile profile = postService.getProfileByUserId();
        Like like = new Like();
        like.setPost(post);
        like.setProfile(profile);

        likeRepository.save(like);
    }

    public void removeLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
