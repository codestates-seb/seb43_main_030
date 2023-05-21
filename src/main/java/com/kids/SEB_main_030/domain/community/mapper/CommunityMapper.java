package com.kids.SEB_main_030.domain.community.mapper;

import com.kids.SEB_main_030.domain.community.dto.CommunityDto;
import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

    @Mapping(target = "name", source = "community.kindergarten.name")
    @Mapping(target = "ratedReviewsCount", source = "community.kindergarten.ratedReviewsCount")
    @Mapping(target = "ratedReviewsAvg", source = "community.kindergarten.ratedReviewsAvg")
    @Mapping(target = "imageUrl", source = "community.kindergarten.imageUrl")
    CommunityDto.Response communityAndKindergartenToResponseDto(Community community);
}
