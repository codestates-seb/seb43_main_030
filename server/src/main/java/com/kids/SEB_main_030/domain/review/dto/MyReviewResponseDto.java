package com.kids.SEB_main_030.domain.review.dto;

import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MyReviewResponseDto {
    private long reviewId;
    private String content;
    private double ratedReview;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String reviewImageUrl;
    private String kindergartenName;
    private String kindergartenLocations;
    private String kindergartenImageUrl;
    private double kindergartenRatedReviewsAvg;
    private int kindergartenRatedReviewsCount;

}
