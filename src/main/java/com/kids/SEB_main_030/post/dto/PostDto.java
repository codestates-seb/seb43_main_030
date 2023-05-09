package com.kids.SEB_main_030.post.dto;

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

        private long postId;
        private String title;
        private String content;
        private String category;
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
        private String imageUrl;
        private Integer views;
        private int likes;

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
        private List<String> postImageUrls;
        private String profileImageUrl;
        private String name;
        private LocalDateTime createdAt;
        private int likes;

    }
}
