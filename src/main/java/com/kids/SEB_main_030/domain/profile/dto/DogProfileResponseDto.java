package com.kids.SEB_main_030.domain.profile.dto;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.domain.review.dto.MyReviewResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DogProfileResponseDto {
    private long userId;
    private long profileId;
    private String name;
    private String gender;
    private String breed;
    private String imageUrl;
    private String email;
    private List<MyPostResponseDto> posts;
    private List<MyReviewResponseDto> reviews;
}
