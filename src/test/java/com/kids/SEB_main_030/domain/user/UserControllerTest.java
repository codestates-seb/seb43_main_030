package com.kids.SEB_main_030.domain.user;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.user.dto.UserPostDto;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.mapper.UserMapper;
import com.kids.SEB_main_030.domain.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private UserService userService;
    @Autowired
    private UserMapper mapper;
    private final String DEFAULT_URL = "/api/users";

    @Test
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
}
