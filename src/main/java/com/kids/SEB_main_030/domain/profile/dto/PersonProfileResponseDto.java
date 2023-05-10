package com.kids.SEB_main_030.domain.profile.dto;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.global.image.entity.Image;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PersonProfileResponseDto {
    private long profileId;
    private String name;
    private String imageUrl;
    private String email;
    private List<MyPostResponseDto> posts;

}
