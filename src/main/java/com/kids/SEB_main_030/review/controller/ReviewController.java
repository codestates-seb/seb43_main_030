package com.kids.SEB_main_030.review.controller;

import com.kids.SEB_main_030.dto.SingleResponseDto;
import com.kids.SEB_main_030.profile.service.ProfileService;
import com.kids.SEB_main_030.review.dto.ReviewPatchDto;
import com.kids.SEB_main_030.review.dto.ReviewPostDto;
import com.kids.SEB_main_030.review.entity.Review;
import com.kids.SEB_main_030.review.mapper.ReviewMapper;
import com.kids.SEB_main_030.review.service.ReviewService;
import com.kids.SEB_main_030.user.service.UserService;
import com.kids.SEB_main_030.utils.UriCreator;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/review")
@Validated
public class ReviewController {
    private final static String REVIEW_DEFAULT_URL="/api/review";
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final UserService userService;

    public ReviewController(ReviewService reviewService, ReviewMapper reviewMapper, UserService userService) {
        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
        this.userService = userService;
    }

    @PostMapping("/{kindergarten-id}")
    public ResponseEntity postReview(@PathVariable("kindergarten-id") long kindergartenId,
                                     @Valid @RequestBody ReviewPostDto reviewPostDto){
        reviewPostDto.setKindergartenId(kindergartenId);
        reviewPostDto.setProfileId(userService.findCurrentProfileId());

        Review review = reviewService.createReview(reviewMapper.reviewPostDtoToReview(reviewPostDto));
        URI location = UriCreator.createUri(REVIEW_DEFAULT_URL, review.getReviewId());
        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id")@Positive long reviewId,
                                      @Valid @RequestBody ReviewPatchDto reviewPatchDto){
        Review review = reviewService.updateReview(reviewMapper.reviewPatchDtoToReview(reviewPatchDto),reviewId);
        URI location = UriCreator.createUri(REVIEW_DEFAULT_URL, review.getReviewId());
        return ResponseEntity.created(location).build();
    }
    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") @Positive long reviewId){
        Review findReview = reviewService.findReview(reviewId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(reviewMapper.reviewToReviewResponseDto(findReview)),HttpStatus.OK);
    }
    @GetMapping("/kindergarten/{kindergarten-id}")
    public ResponseEntity getReviews(@PathVariable("kindergarten-id")long kindergartenId){
        List<Review>reviewList=reviewService.findReviews(kindergartenId);
        return new ResponseEntity<>(reviewMapper.reviewsToReviewResponseDtos(reviewList),HttpStatus.OK);
    }
}
