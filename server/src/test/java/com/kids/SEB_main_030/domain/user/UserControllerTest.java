package com.kids.SEB_main_030.domain.user;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.user.dto.OAuthInitDto;
import com.kids.SEB_main_030.domain.user.dto.PasswordResetDto;
import com.kids.SEB_main_030.domain.user.dto.UserPatchDto;
import com.kids.SEB_main_030.domain.user.dto.UserPostDto;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.mapper.UserMapper;
import com.kids.SEB_main_030.domain.user.service.UserService;
import com.kids.SEB_main_030.global.tokenizer.JwtTokenUtil;
import org.junit.jupiter.api.BeforeEach;
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

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private Gson gson;
    @MockBean
    private UserService userService;
    @Autowired
    private UserMapper mapper;
    private final String DEFAULT_URL = "/api/users";

    @Test
    @DisplayName("유저 등록 테스트")
    void postUserTest() throws Exception {
        // given
        UserPostDto userPostDto = new UserPostDto("test@naver.com", "123123123", true);
        User user = mapper.userPostDtoToUser(userPostDto);
        user.setUserId(1L);
        given(userService.createUser(Mockito.any(User.class), Mockito.anyBoolean()))
                .willReturn(user);
        String content = gson.toJson(userPostDto);

        // when
        ResultActions actions = mockMvc.perform(
                post(DEFAULT_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith(DEFAULT_URL))));
    }

    @Test
    @DisplayName("유저 비밀번호 수정 테스트")
    void patchUserTest() throws Exception{
        // given
        UserPatchDto userPatchDto = new UserPatchDto("123123123","123","123");
        String accessToken = jwtTokenUtil.getAccessToken("test@naver.com");
        Mockito.doNothing().when(userService).modifyPassword(Mockito.any(UserPatchDto.class));

        // when
        ResultActions actions = mockMvc.perform(
                patch(DEFAULT_URL)
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(userPatchDto))
        );
        // then
        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("유저 회원탈퇴 테스트")
    void removeUserTest() throws Exception{
        // given
        String accessToken = jwtTokenUtil.getAccessToken("test@naver.com");
        Mockito.doNothing().when(userService).removeUser();

        // when
        ResultActions actions = mockMvc.perform(
                delete(DEFAULT_URL)
                        .header("Authorization", "Bearer " + accessToken));

        //then
        actions
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("OAuth 유저 정보입력")
    void oauthInitUserTest() throws Exception {
        OAuthInitDto oAuthInitDto = new OAuthInitDto("test@gmail.com", true);
        Mockito.doNothing().when(userService).oauthUserInit(oAuthInitDto);

        ResultActions actions = mockMvc.perform(
                patch(DEFAULT_URL + "/oauthInit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(oAuthInitDto))
        );

        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("비밀번호 초기화 테스트")
    void resetPasswordTest() throws Exception {
        PasswordResetDto passwordResetDto = new PasswordResetDto("test@naver.com", "123123123","123123123");
        Mockito.doNothing().when(userService).resetPassword(passwordResetDto);

        ResultActions actions = mockMvc.perform(
                patch(DEFAULT_URL + "/resetPassword")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(passwordResetDto))
        );

        actions
                .andExpect(status().isOk());
    }
}
