package com.kids.SEB_main_030.domain.post.repository;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT * FROM POST WHERE community_id = :community AND category = :category", nativeQuery = true)
    Page<Post> findAllByCategory(Pageable pageable, Community community, String category);

    // 리스트 출력 쿼리
    @Query(value = "SELECT * FROM POST WHERE community_id = :community AND category = :category AND title LIKE %:keyword%", nativeQuery = true)
    Page<Post> findAllByCategoryAndKeyword(Pageable pageable, Community community, String category, String keyword);

}
