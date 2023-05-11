package com.kids.SEB_main_030.domain.community.mapper;

import com.kids.SEB_main_030.domain.community.dto.CommunityDto;
import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

    CommunityDto.Response communityAndKindergartenToResponseDto(Community community, Kindergarten kindergarten);
}
