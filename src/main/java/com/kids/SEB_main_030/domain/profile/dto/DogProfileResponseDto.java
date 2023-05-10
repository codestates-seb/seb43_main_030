package com.kids.SEB_main_030.domain.profile.dto;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DogProfileResponseDto {
    private long profileId;
    private String name;
    private String gender;
    private String breed;
    private String imageUrl;
    private String email;
    private List<MyPostResponseDto> posts;
}
