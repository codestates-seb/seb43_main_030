package com.kids.SEB_main_030.domain.community.dto;

import com.kids.SEB_main_030.domain.post.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class CommunityDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String name;
        private double ratedReviewsAvg;
        private String imageUrl;
        private String introduction;
    }
}
