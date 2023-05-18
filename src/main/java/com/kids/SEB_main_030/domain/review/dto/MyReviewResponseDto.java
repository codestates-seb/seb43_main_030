package com.kids.SEB_main_030.domain.review.dto;

import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MyReviewResponseDto {
    private long reviewId;
    private String content;
    private double ratedReview;
    private long reviewImageId;
    private String reviewImageUrl;
}
