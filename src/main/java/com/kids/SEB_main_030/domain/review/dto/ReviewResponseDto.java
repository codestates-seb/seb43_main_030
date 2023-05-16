package com.kids.SEB_main_030.domain.review.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponseDto {
    private Long reviewId;
    private String contents;
    private String imageUrl;
    private Double ratedReview;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String profileName;
    private String kindergartenName;
    private String kindergartenLocations;
    private Long kindergartenId;

}
