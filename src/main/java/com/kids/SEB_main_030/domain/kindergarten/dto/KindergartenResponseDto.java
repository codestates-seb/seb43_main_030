package com.kids.SEB_main_030.domain.kindergarten.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KindergartenResponseDto {
    private Long kindergartenId;
    private String name;
    private Double latitude;
    private Double longitude;
    private String snsUrl;
    private Double ratedReviewsAvg;
    private Integer ratedReviewsCount;
    private String locations;
    private String openHours;
    private String closeHours;
    private String phoneNumber;
    private String imageUrl;
    private String kinderIntro;
}
