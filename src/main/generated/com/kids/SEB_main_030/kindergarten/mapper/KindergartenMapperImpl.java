package com.kids.SEB_main_030.kindergarten.mapper;

import com.kids.SEB_main_030.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.kindergarten.dto.KindergartenResponseDto;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-08T15:46:41+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.15 (Oracle Corporation)"
)
@Component
public class KindergartenMapperImpl implements KindergartenMapper {

    @Override
    public Kindergarten kindergartenPostDtoToKindergarten(KindergartenPostDto kindergartenPostDto) {
        if ( kindergartenPostDto == null ) {
            return null;
        }

        Kindergarten kindergarten = new Kindergarten();

        kindergarten.setName( kindergartenPostDto.getName() );
        kindergarten.setLatitude( kindergartenPostDto.getLatitude() );
        kindergarten.setLongitude( kindergartenPostDto.getLongitude() );
        kindergarten.setSnsUrl( kindergartenPostDto.getSnsUrl() );
        kindergarten.setRatedReviewsAvg( kindergartenPostDto.getRatedReviewsAvg() );
        kindergarten.setLocations( kindergartenPostDto.getLocations() );
        kindergarten.setOpenHours( kindergartenPostDto.getOpenHours() );
        kindergarten.setCloseHours( kindergartenPostDto.getCloseHours() );
        kindergarten.setPhoneNumber( kindergartenPostDto.getPhoneNumber() );

        return kindergarten;
    }

    @Override
    public KindergartenResponseDto kindergartenToKindergartenResponseDto(Kindergarten kindergarten) {
        if ( kindergarten == null ) {
            return null;
        }

        KindergartenResponseDto kindergartenResponseDto = new KindergartenResponseDto();

        kindergartenResponseDto.setKindergartenId( kindergarten.getKindergartenId() );
        kindergartenResponseDto.setName( kindergarten.getName() );
        kindergartenResponseDto.setLatitude( kindergarten.getLatitude() );
        kindergartenResponseDto.setLongitude( kindergarten.getLongitude() );
        kindergartenResponseDto.setSnsUrl( kindergarten.getSnsUrl() );
        kindergartenResponseDto.setRatedReviewsAvg( kindergarten.getRatedReviewsAvg() );
        kindergartenResponseDto.setLocations( kindergarten.getLocations() );
        kindergartenResponseDto.setOpenHours( kindergarten.getOpenHours() );
        kindergartenResponseDto.setCloseHours( kindergarten.getCloseHours() );
        kindergartenResponseDto.setPhoneNumber( kindergarten.getPhoneNumber() );

        return kindergartenResponseDto;
    }

    @Override
    public List<KindergartenResponseDto> kindergartensToKindergartenResponseDtos(List<Kindergarten> kindergarten) {
        if ( kindergarten == null ) {
            return null;
        }

        List<KindergartenResponseDto> list = new ArrayList<KindergartenResponseDto>( kindergarten.size() );
        for ( Kindergarten kindergarten1 : kindergarten ) {
            list.add( kindergartenToKindergartenResponseDto( kindergarten1 ) );
        }

        return list;
    }
}
