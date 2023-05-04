package com.kids.SEB_main_030.post.repository;

import com.kids.SEB_main_030.post.entity.Like;
import com.kids.SEB_main_030.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    int countByPost(Post post);
}
