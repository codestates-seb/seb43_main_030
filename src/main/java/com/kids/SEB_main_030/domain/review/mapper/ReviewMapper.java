package com.kids.SEB_main_030.domain.review.mapper;

import com.kids.SEB_main_030.domain.review.dto.ReviewListResponseDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPatchDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPostDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewResponseDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.user.entity.User;
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
        review.setContent( reviewPatchDto.getContent() );
        review.setRatedReview( reviewPatchDto.getRatedReview() );

        return review;
    };
    List<ReviewResponseDto>reviewsToReviewResponseDtos(List<Review>review);

    @Mapping(source="kindergarten.name",target="kindergartenName")
    @Mapping(source="kindergarten.locations",target="kindergartenLocations")
    @Mapping(source="kindergarten.kindergartenId",target="kindergartenId")
    @Mapping(source="profile.name",target="profileName")
    @Mapping(source = "profile.imageUrl",target = "profileImageUrl")
    @Mapping(target="reviewImageUrl",source = "imageUrl")
    @Mapping(target="email",expression = "java(review.getProfile().getUser().getEmail())")
    @Mapping(target = "kindergartenRatedReview", source = "kindergarten.ratedReviewsAvg")
    @Mapping(source = "kindergarten.imageUrl",target = "kindergartenImageUrl")
    ReviewResponseDto reviewToReviewResponseDto(Review review);

    default List<Image>mapImage(List<Image>images){
        return images.stream()
                .map(image -> new Image(image.getImageId(), image.getImageUrl()))
                .collect(Collectors.toList());
    }
    @Mapping(source="kindergarten.name",target="kindergartenName")
    @Mapping(source="kindergarten.locations",target="kindergartenLocations")
    @Mapping(source="kindergarten.kindergartenId",target="kindergartenId")
    @Mapping(source="profile.name",target="profileName")
    @Mapping(source = "profile.imageUrl",target = "profileImageUrl")
    @Mapping(target="reviewImageUrl",source = "imageUrl")
    @Mapping(target="email",expression = "java(review.getProfile().getUser().getEmail())")
    @Mapping(source = "kindergarten.imageUrl",target = "kindergartenImageUrl")
    ReviewListResponseDto reviewToReviewListResponseDto (Review review);
    List<ReviewListResponseDto>reviewsToReviewListResponseDtos(List<Review>review);

    default String mapReviewImageUrl(List<Image>images){
        return images.stream().findFirst().map(Image::getImageUrl).orElse(null);
    }
}
