package com.kids.SEB_main_030.domain.like;

import com.kids.SEB_main_030.domain.community.dto.CommunityDto;
import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.mapper.CommunityMapper;
import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.like.service.LikeService;
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
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LikeControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private LikeService likeService;

    @DisplayName("좋아요 등록 및 삭제")
    @Test
    void likeTest() throws Exception {
        // given
        long postId = 1L;
        doNothing().when(likeService).likeToggle(postId);
        // when
        ResultActions actions = mockMvc.perform(
                get("/api/post/{post-id}/like", postId));
        // then
        actions.andExpect(status().isOk());
    }
}
