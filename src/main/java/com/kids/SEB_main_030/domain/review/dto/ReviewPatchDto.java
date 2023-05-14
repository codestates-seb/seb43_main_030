package com.kids.SEB_main_030.domain.review.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewPatchDto {
    private String contents;
    private Double ratedReview;
    private List<Long> deleteImageIds = null;
}
