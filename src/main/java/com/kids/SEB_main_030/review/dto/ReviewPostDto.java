package com.kids.SEB_main_030.review.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
@Getter
@Setter
public class ReviewPostDto {
    private Long profileId;
    private Long kindergartenId;
    @Column(nullable = false)
    private String contents;
    @Column(nullable = false)
    private Double ratedReview;
}
