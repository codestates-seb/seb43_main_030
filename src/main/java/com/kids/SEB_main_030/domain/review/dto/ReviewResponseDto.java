package com.kids.SEB_main_030.domain.review.dto;

import com.kids.SEB_main_030.global.image.entity.Image;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ReviewResponseDto {
    private Long reviewId;
    private String content;
    private String reviewImageUrl;
    private Double ratedReview;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String profileName;
    private String profileImageUrl;
    private String kindergartenName;
    private String kindergartenLocations;
    private Long kindergartenId;
    private String email;
    private double kindergartenRatedReview;
}
