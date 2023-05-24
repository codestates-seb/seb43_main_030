package com.kids.SEB_main_030.domain.comment;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.comment.dto.CommentDto;
import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.comment.mapper.CommentMapper;
import com.kids.SEB_main_030.domain.comment.service.CommentService;
import com.kids.SEB_main_030.global.tokenizer.JwtTokenUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private CommentMapper commentMapper;
    @MockBean
    private CommentService commentService;

    @Test
    void postPostTest() throws Exception {
        // Mock dependencies
        long postId = 1L;
        CommentDto.Post commentDto = new CommentDto.Post("test");
        String accessToken = jwtTokenUtil.getAccessToken("test@email.com");
        Comment comment = new Comment();
        comment.setCommentId(1L);

        when(commentService.createComment(Mockito.any(Comment.class), Mockito.anyLong())).thenReturn(comment);
        String content = gson.toJson(commentDto);
        System.out.println(accessToken);
        // Perform the test
        mockMvc.perform(post("/api/post/{post-id}/comment", postId)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
//                .andExpect(header().string("Location", is(startsWith("/api/community/1/post"))))
    }

    @Test
    void getCommentTest() {

    }
}
