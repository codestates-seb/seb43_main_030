package com.kids.SEB_main_030.domain.kindergarten;
import com.google.gson.Gson;

import com.kids.SEB_main_030.domain.review.dto.ReviewListResponseDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPatchDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewPostDto;
import com.kids.SEB_main_030.domain.review.dto.ReviewResponseDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.review.mapper.ReviewMapper;
import com.kids.SEB_main_030.domain.review.service.ReviewService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.net.URI;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest
@AutoConfigureMockMvc
public class ReviewControllerTest {
    private static final String REVIEW_DEFAULT_URL = "/api/review";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ReviewMapper mapper;
    @MockBean
    private ReviewService service;

    @Test
    @DisplayName("게시물 등록")
    public void testPostReview()throws Exception{
        long kindergartenId = 1L;
        ReviewPostDto postDto = new ReviewPostDto();
        postDto.setKindergartenId(kindergartenId);
        postDto.setRatedReview(4.5);
        postDto.setContent("예시 내용");
        Review review = new Review();
        review.setRatedReview(4.5);
        review.setReviewId(1L);
        review.setContent("예시 내용");


        MockMultipartFile imageFile = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
        MockPart contentMock = new MockPart("postDto", gson.toJson(postDto).getBytes());
        contentMock.getHeaders().set("Content-Type", "application/json");

        given(mapper.reviewPostDtoToReview(Mockito.any(ReviewPostDto.class))).willReturn(new Review());
        given(service.createReview(Mockito.any(Review.class),Mockito.any(),Mockito.anyLong())).willReturn(review);

        ResultActions actions =mockMvc.perform(multipart(REVIEW_DEFAULT_URL+"/{kindergarten-id}",kindergartenId)
                .file(imageFile)
                .part(contentMock)
                .contentType(MediaType.MULTIPART_FORM_DATA));

        actions
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("게시물 수정")
    public void testPatchReview()throws Exception{
        long reviewId = 1L;
        ReviewPatchDto patchDto = new ReviewPatchDto();
        patchDto.setRatedReview(4.5);
        patchDto.setContent("예시 내용");
        Review review = new Review();
        review.setRatedReview(4.5);
        review.setReviewId(1L);
        review.setContent("예시 내용");


        MockMultipartFile imageFile = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
        MockPart contentMock = new MockPart("patchDto", gson.toJson(patchDto).getBytes());
        contentMock.getHeaders().set("Content-Type", "application/json");

        given(mapper.reviewPatchDtoToReview(Mockito.any(ReviewPatchDto.class))).willReturn(new Review());
        given(service.updateReview(Mockito.any(Review.class),Mockito.anyLong(),Mockito.any())).willReturn(review);
        URI location = new URI(REVIEW_DEFAULT_URL+"/"+reviewId);
        ResultActions actions =mockMvc.perform(multipart(HttpMethod.PATCH,location)
                .file(imageFile)
                .part(contentMock)
                .contentType(MediaType.MULTIPART_FORM_DATA));

        actions
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("리뷰 상세")
    public void testGetReview() throws Exception{
        long reviewId = 1L;
        Review review = new Review();
        review.setReviewId(reviewId);
        review.setContent("테스트 컨텐트");
        review.setRatedReview(4.5);
        ReviewResponseDto response = new ReviewResponseDto();
        response.setReviewId(reviewId);
        response.setContent("테스트 컨텐트");
        response.setRatedReview(4.5);

        given(service.findReview(reviewId)).willReturn(review);
        given(mapper.reviewToReviewResponseDto(review)).willReturn(response);

        ResultActions actions = mockMvc.perform(
                get(REVIEW_DEFAULT_URL+"/"+reviewId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.reviewId").value(reviewId))
                .andExpect(jsonPath("$.data.content").value(review.getContent()))
                .andExpect(jsonPath("$.data.ratedReview").value(review.getRatedReview()));
    }
    @Test
    @DisplayName("리뷰 리스트 출력")
    public void testGetReviews() throws Exception{
        long kindergartenId = 1L;
        Review review = new Review();
        review.setReviewId(1L);
        review.setContent("테스트 컨텐트");
        review.setRatedReview(4.5);
        ReviewListResponseDto response = new ReviewListResponseDto();
        response.setReviewId(1L);
        response.setContent("테스트 컨텐트");
        response.setRatedReview(4.5);
        Review review2 = new Review();
        review2.setReviewId(2L);
        review2.setContent("테스트 컨텐트2");
        review2.setRatedReview(4.5);
        ReviewListResponseDto response2 = new ReviewListResponseDto();
        response2.setReviewId(2L);
        response2.setContent("테스트 컨텐트2");
        response2.setRatedReview(4.5);
        List<Review>reviewList= Arrays.asList(review,review2);
        List<ReviewListResponseDto>responseDtos = Arrays.asList(response,response2);

        given(service.findReviews(kindergartenId)).willReturn(reviewList);
        given(mapper.reviewsToReviewListResponseDtos(reviewList)).willReturn(responseDtos);

        ResultActions actions = mockMvc.perform(
                get(REVIEW_DEFAULT_URL+"/kindergarten/"+kindergartenId)
                        .accept(MediaType.APPLICATION_JSON)
        );
        actions.
                andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].reviewId"). value(review.getReviewId()))
                .andExpect(jsonPath("$.[0].content"). value(review.getContent()))
                .andExpect(jsonPath("$.[0].ratedReview").value(review.getRatedReview()))
                .andExpect(jsonPath("$.[1].reviewId"). value(review2.getReviewId()))
                .andExpect(jsonPath("$.[1].content"). value(review2.getContent()))
                .andExpect(jsonPath("$.[1].ratedReview").value(review2.getRatedReview()));
    }

    @Test
    @DisplayName("리뷰삭제")
    public void testDeleteReview()throws Exception{
        long reviewId = 1L;
        doNothing().when(service).deleteReview(reviewId);
        ResultActions actions = mockMvc.perform(delete(REVIEW_DEFAULT_URL+"/"+reviewId));
        actions.andExpect(status().isNoContent());
    }

}
