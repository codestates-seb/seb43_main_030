package com.kids.SEB_main_030.domain.review.controller;

import com.kids.SEB_main_030.domain.review.dto.ReviewPatchDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPostDto;
import com.kids.SEB_main_030.domain.review.mapper.ReviewMapper;
import com.kids.SEB_main_030.domain.review.repository.ReviewRepository;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.review.service.ReviewService;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.global.image.service.ImageService;
import com.kids.SEB_main_030.global.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/review")
@Validated
@RequiredArgsConstructor
public class ReviewController {
    private final static String REVIEW_DEFAULT_URL="/api/review";
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final UserService userService;


    @PostMapping("/{kindergarten-id}")
    public ResponseEntity postReview(@PathVariable("kindergarten-id") long kindergartenId,
                                     @Valid @RequestPart(name = "postDto") ReviewPostDto reviewPostDto,
                                     @RequestPart(required = false) MultipartFile image){
        Review review = reviewService.createReview(reviewMapper.reviewPostDtoToReview(reviewPostDto), image,kindergartenId);
        URI location = UriCreator.createUri(REVIEW_DEFAULT_URL, review.getReviewId());
        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id")@Positive long reviewId,
                                      @Valid @RequestPart(name = "patchDto", required = false) ReviewPatchDto reviewPatchDto,
                                      @RequestPart(required = false) MultipartFile image) throws Throwable {
        reviewService.updateReview(reviewMapper.reviewPatchDtoToReview(reviewPatchDto), reviewId, image);
        URI location = UriCreator.createUri(REVIEW_DEFAULT_URL, reviewId);
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
        return new ResponseEntity<>(reviewMapper.reviewsToReviewListResponseDtos(reviewList),HttpStatus.OK);
    }
    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id")@Positive long reviewId)
    {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
