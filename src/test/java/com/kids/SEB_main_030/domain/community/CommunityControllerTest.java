package com.kids.SEB_main_030.domain.community;

import com.kids.SEB_main_030.domain.community.dto.CommunityDto;
import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.mapper.CommunityMapper;
import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CommunityControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private CommunityService communityService;
    @MockBean
    private CommunityMapper communityMapper;

    @DisplayName("커뮤니티 유치원 정보 출력")
    @Test
    void getCommunityTest() throws Exception {
        // given
        long communityId = 1L;
        Kindergarten kindergarten = new Kindergarten();
        kindergarten.setName("test");
        kindergarten.setRatedReviewsCount(2);
        kindergarten.setRatedReviewsAvg(3.5);
        kindergarten.setImageUrl("imageUrl");
        Community community = new Community();
        community.setIntroduction("안녕하세요");
        CommunityDto.Response response = new CommunityDto.Response(
                "test", 2, 3.5, "imageUrl", "안녕하세요");

        given(communityService.findCommunity(communityId)).willReturn(new Community());
        given(communityMapper.communityAndKindergartenToResponseDto(Mockito.any(Community.class)))
                .willReturn(response);

        // when
        ResultActions actions =
                mockMvc.perform(get("/api/community/{community-id}", communityId)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value(kindergarten.getName()))
                .andExpect(jsonPath("$.data.ratedReviewsCount").value(kindergarten.getRatedReviewsCount()))
                .andExpect(jsonPath("$.data.ratedReviewsAvg").value(kindergarten.getRatedReviewsAvg()))
                .andExpect(jsonPath("$.data.imageUrl").value(kindergarten.getImageUrl()))
                .andExpect(jsonPath("$.data.introduction").value(community.getIntroduction()));
    }
}
