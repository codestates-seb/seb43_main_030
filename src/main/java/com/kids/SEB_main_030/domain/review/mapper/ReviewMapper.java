package com.kids.SEB_main_030.domain.review.mapper;

import com.kids.SEB_main_030.domain.review.dto.ReviewPatchDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPostDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewResponseDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.global.image.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "kindergartenId",target = "kindergarten.kindergartenId")
    @Mapping(source = "profileId",target = "profile.profileId")
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    default Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        Review review = new Review();
        if ( reviewPatchDto == null ) {
            return review;
        }
        review.setContents( reviewPatchDto.getContents() );
        review.setRatedReview( reviewPatchDto.getRatedReview() );

        return review;
    };
    List<ReviewResponseDto>reviewsToReviewResponseDtos(List<Review>review);

    @Mapping(source="kindergarten.name",target="kindergartenName")
    @Mapping(source="kindergarten.locations",target="kindergartenLocations")
    @Mapping(source="kindergarten.kindergartenId",target="kindergartenId")
    @Mapping(source="profile.name",target="profileName")
    @Mapping(target="images",expression = "java(mapImage(review.getImages()))")
    ReviewResponseDto reviewToReviewResponseDto(Review review);

    default List<Image>mapImage(List<Image>images){
        return images.stream()
                .map(image -> new Image(image.getImageId(), image.getImageUrl()))
                .collect(Collectors.toList());
    }

}
