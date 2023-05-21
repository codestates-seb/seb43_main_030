package com.kids.SEB_main_030.domain.profile.mapper;

import com.kids.SEB_main_030.domain.post.dto.MyPostResponseDto;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.profile.dto.*;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.review.dto.MyReviewResponseDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.response.ImageInPostResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    Profile profilePostToProfile(ProfilePostDto profilePostDto);
    Profile profilePatchToProfile(ProfilePatchDto profilePatchDto);
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.userId", target = "userId")
    PersonProfileResponseDto profileToPersonProfileDto(Profile profile);
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.userId", target = "userId")
    DogProfileResponseDto profileToDogProfileDto(Profile profile);
    @Mapping(source = "user.email", target = "email")
    List<PersonProfileResponseDto> profilesToReponseDtos(List<Profile> profiles);
    @Mapping(source = "user.email", target = "email")
    @Mapping(target = "postCount", expression = "java(profile.getPosts().size())")
    @Mapping(target = "reviewsCount", expression = "java(profile.getReviews().size())")
    @Mapping(target = "socialType", expression = "java(profile.getUser().getSocialType())")
    CurrentProfileResponseDto profileToCurrentProfileResponseDto(Profile profile);
    List<MyPostResponseDto> postsInMyPage(List<Post> posts);
    List<MyReviewResponseDto> reviewsInMyPage(List<Review> reviews);
    @Mapping(source = "imageUrl", target = "reviewImageUrl")
    MyReviewResponseDto reviewInMyPage(Review review);
}
