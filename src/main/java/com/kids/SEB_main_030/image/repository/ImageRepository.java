package com.kids.SEB_main_030.image.repository;

import com.kids.SEB_main_030.image.entity.Image;
import com.kids.SEB_main_030.post.dto.PostDto;
import com.kids.SEB_main_030.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByPost(Post post);

    // 게시물 대표사진(내림차순 맨위 사진)
    Image findTopByPostOrderByImageIdDesc(Post post);
}
