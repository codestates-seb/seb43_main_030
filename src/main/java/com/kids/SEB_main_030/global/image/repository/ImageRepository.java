package com.kids.SEB_main_030.global.image.repository;

import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByPost(Post post);

    // 게시물 대표사진(내림차순 맨위 사진)
    Image findTopByPostOrderByImageIdDesc(Post post);
}
