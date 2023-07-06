package com.kids.SEB_main_030.domain.post.dto;

import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MyPostResponseDto {
    private long postId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int views;
    private int likeCount;
    private String postImageUrl;

    public void setImages(List<ImageInPostResponseDto> images){
        if (images != null && !images.isEmpty()) {
            this.postImageUrl = images.get(0).getImageUrl();
        }
    }
}
