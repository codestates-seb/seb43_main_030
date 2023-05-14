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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final KindergartenService kindergartenService;
    private final ProfileService profileService;
    private final UserService userService;
    private final ImageService imageService;

    public ReviewService(ReviewRepository reviewRepository, KindergartenService kindergartenService, ProfileService profileService, UserService userService, ImageService imageService) {
        this.reviewRepository = reviewRepository;
        this.kindergartenService = kindergartenService;
        this.profileService = profileService;
        this.userService = userService;
        this.imageService = imageService;
    }

    public Review createReview(Review review){
        Kindergarten kindergarten = kindergartenService.findVerifiedKindergarten(review.getKindergarten().getKindergartenId());
        review.setKindergarten(kindergarten);
        Profile profile = profileService.verifyProfile(review.getProfile().getProfileId());
        review.setProfile(profile);
        return reviewRepository.save(review);
    }
    public Review updateReview(Review review,Long reviewId){
        Review findReview = findVerifiedReview(reviewId);
        if(findReview.getProfile().getProfileId()== userService.findCurrentProfileId()){
            Optional.ofNullable(review.getContents()).ifPresent(contents->findReview.setContents(contents));
            Optional.ofNullable(review.getRatedReview()).ifPresent(ratedReview->findReview.setRatedReview(ratedReview));
        }else throw new LogicException(CustomException.NO_AUTHORITY);
        return reviewRepository.save(findReview);
    }
    public Review findReview(Long reviewId){
        return findVerifiedReview(reviewId);
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
            // s3에서 리뷰 관련 이미지 삭제
            List<Image> images = imageService.findByReview(findReview);
            for (Image image : images) imageService.s3imageDelete(image.getImageUrl());

            reviewRepository.delete(findReview);
        }else throw new LogicException(CustomException.NO_AUTHORITY);
    }

}
