package com.kids.SEB_main_030.domain.profile.dto;

import com.kids.SEB_main_030.domain.user.entity.SocialType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CurrentProfileResponseDto {
    private long profileId;
    private String imageUrl;
    private String email;
    private String name;
    private int postCount;
    private int reviewsCount;
    private SocialType socialType;
}
