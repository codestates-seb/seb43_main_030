package com.kids.SEB_main_030.review.service;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.service.ProfileService;
import com.kids.SEB_main_030.review.entity.Review;
import com.kids.SEB_main_030.review.repository.ReviewRepository;
import com.kids.SEB_main_030.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final KindergartenService kindergartenService;
    private final ProfileService profileService;
    private final UserService userService;

    public ReviewService(ReviewRepository reviewRepository, KindergartenService kindergartenService, ProfileService profileService, UserService userService) {
        this.reviewRepository = reviewRepository;
        this.kindergartenService = kindergartenService;
        this.profileService = profileService;
        this.userService = userService;
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

}
