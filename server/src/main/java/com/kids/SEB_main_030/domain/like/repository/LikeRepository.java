package com.kids.SEB_main_030.domain.like.repository;

import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface LikeRepository extends JpaRepository<Like, Long> {

    int countByPost(Post post);

    @Query(value = "SELECT COUNT(1) FROM likes WHERE profile_id = :profile AND post_id = :post", nativeQuery = true)
    int findByLikeCountByPostIdOrProfileId(Profile profile, Post post);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE profile_id = :profile AND post_id = :post", nativeQuery = true)
    void deleteLikeByPostIdOrProfileId(Profile profile, Post post);

}
