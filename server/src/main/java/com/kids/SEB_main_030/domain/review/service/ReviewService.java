package com.kids.SEB_main_030.domain.review.service;

import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.review.repository.ReviewRepository;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final KindergartenService kindergartenService;
    private final ProfileService profileService;
    private final UserService userService;
    private final ImageService imageService;

    public Review createReview(Review review, MultipartFile image,long kindergartenId){
        Kindergarten kindergarten = kindergartenService.findVerifiedKindergarten(kindergartenId);
        review.setKindergarten(kindergarten);
        review.getProfile().setProfileId(userService.findCurrentProfileId());
        Profile profile = profileService.verifyProfile(review.getProfile().getProfileId());
        review.setProfile(profile);
        // 이미지 업로드 로직
        if (image != null) {
            String imageUrl = imageService.imageUpload(image, Image.Location.REVIEW.getLocation());
            review.setImageUrl(imageUrl);
            System.out.println("=".repeat(30) + imageUrl);
        }

        Review saveReview =reviewRepository.save(review);
        kindergarten.setRatedReviewsAvg(kindergartenService.findReviewAvg(kindergarten));
        kindergarten.setRatedReviewsCount(kindergartenService.findReviewCnt(kindergarten));
        return saveReview;
    }
    public Review updateReview(Review review,Long reviewId, MultipartFile image){
        Review findReview = findVerifiedReview(reviewId);
        if(findReview.getProfile().getProfileId()== userService.findCurrentProfileId()){
            Optional.ofNullable(review.getContent()).ifPresent(content->findReview.setContent(content));
            Optional.ofNullable(review.getRatedReview()).ifPresent(ratedReview->findReview.setRatedReview(ratedReview));
            // 이미지 관련 로직
            if (image != null) {
                if (findReview.getImageUrl() != null) imageService.s3imageDelete(findReview.getImageUrl());
                String imageUrl = imageService.imageUpload(image, Image.Location.REVIEW.getLocation());
                Optional.ofNullable(imageUrl).ifPresent(url -> findReview.setImageUrl(url));
            }
        }else throw new LogicException(CustomException.NO_AUTHORITY);
        return reviewRepository.save(findReview);
    }
    public Review findReview(Long reviewId){
        Review findReview = findVerifiedReview(reviewId);
        return findReview;
    }
    public List<Review> findReviews(Long kindergartenId){
        List<Review> reviewList = reviewRepository.findByKindergarten_KindergartenId(kindergartenId);
        return reviewList;
    }

    public Review findVerifiedReview(Long reviewId){
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        Review findReview = reviewOptional.orElseThrow(()->
                new LogicException(CustomException.REVIEW_NOT_FOUND));
        return findReview;
    }
    public void deleteReview(long reviewId){
        Review findReview = findVerifiedReview(reviewId);
        if(findReview.getProfile().getProfileId()== userService.findCurrentProfileId()){
            // s3 이미지 삭제 로직
            if (findReview.getImageUrl() != null){
                imageService.s3imageDelete(findReview.getImageUrl());
            }
            reviewRepository.delete(findReview);
        }else throw new LogicException(CustomException.NO_AUTHORITY);
    }

}
