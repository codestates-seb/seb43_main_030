package com.kids.SEB_main_030.kindergarten.mapper;

import com.kids.SEB_main_030.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface KindergartenMapper {
    Kindergarten kindergartenPostDtoToKindergarten(KindergartenPostDto kindergartenPostDto);
}
