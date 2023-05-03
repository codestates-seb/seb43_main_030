package com.kids.SEB_main_030.profile.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonProfileResponseDto {
    private long profileId;
    private String name;
    private String imageUrl;
}
