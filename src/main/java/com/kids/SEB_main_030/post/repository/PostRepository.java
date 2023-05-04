package com.kids.SEB_main_030.post.repository;

import com.kids.SEB_main_030.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.StringJoiner;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT * FROM POST WHERE category = :category", nativeQuery = true)
    Page<Post> findAllByCategory(Pageable pageable, String category);

    // 리스트 출력 쿼리
    @Query(value = "SELECT * FROM POST WHERE category = :category AND title LIKE %:keyword%", nativeQuery = true)
    Page<Post> findAllByCategoryAndKeyword(Pageable pageable, String category, String keyword);

}
