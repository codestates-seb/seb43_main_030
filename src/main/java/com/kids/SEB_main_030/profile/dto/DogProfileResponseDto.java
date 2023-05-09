package com.kids.SEB_main_030.profile.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DogProfileResponseDto {
    private long profileId;
    private String name;
    private String gender;
    private String breed;
    private String imageUrl;
    private String email;
}
