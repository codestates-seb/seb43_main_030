package com.kids.SEB_main_030.kindergarten.mapper;

import com.kids.SEB_main_030.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.kindergarten.dto.KindergartenResponseDto;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface KindergartenMapper {
    Kindergarten kindergartenPostDtoToKindergarten(KindergartenPostDto kindergartenPostDto);
    KindergartenResponseDto kindergartenToKindergartenResponseDto(Kindergarten kindergarten);
    List<KindergartenResponseDto> kindergartensToKindergartenResponseDtos(List<Kindergarten> kindergarten);
}
