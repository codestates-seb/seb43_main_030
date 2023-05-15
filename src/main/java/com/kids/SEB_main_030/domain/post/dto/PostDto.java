package com.kids.SEB_main_030.domain.post.dto;

import com.kids.SEB_main_030.global.image.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private String title;
        @NotBlank
        private String content;
        @NotBlank
        private String category;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private String title;
        private String content;
        private String category = null;
        private List<Long> deleteImageIds = null;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long postId;
        private String title;
        private String content;
        private Integer views;
        private List<Image> images;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CardViewResponse {
        // 유효성 추가하기
        private long postId;
        private String title;
        private String content;
        private String postImageUrl;
        private Integer views;
        private int likes;
        private String profileImageUrl;
        private String name;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DetailPageResponse {
        // 유효성 추가하기
        private long postId;
        private String title;
        private String content;
        private String category;
        private List<Image> images;
        private long profileId;
        private String profileImageUrl;
        private String name;
        private LocalDateTime createdAt;
        private int views;
        private int likes;
        private boolean isLike;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Image {
        private Long imageId;
        private String imageUrl;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getNotification {
        private long postId;
        private String title;
        private String content;
        private String createdAt;
    }
}
