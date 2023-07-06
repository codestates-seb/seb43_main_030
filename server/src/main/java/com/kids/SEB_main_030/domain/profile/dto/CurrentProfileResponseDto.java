package com.kids.SEB_main_030.domain.profile.dto;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.domain.review.dto.MyReviewResponseDto;
import com.kids.SEB_main_030.domain.user.entity.SocialType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CurrentProfileResponseDto {
    private long profileId;
    private String imageUrl;
    private String email;
    private String name;
    private String breed;
    private int postCount;
    private int reviewsCount;
    private SocialType socialType;
    private List<MyPostResponseDto> posts;
    private List<MyReviewResponseDto> reviews;

    public CurrentProfileResponseDto(long profileId,  String email, String name, String breed, int postCount, int reviewsCount, SocialType socialType) {
        this.profileId = profileId;
        this.email = email;
        this.name = name;
        this.breed = breed;
        this.postCount = postCount;
        this.reviewsCount = reviewsCount;
        this.socialType = socialType;
    }
}
