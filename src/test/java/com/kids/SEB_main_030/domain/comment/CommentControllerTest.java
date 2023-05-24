package com.kids.SEB_main_030.domain.comment;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.comment.dto.CommentDto;
import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.comment.mapper.CommentMapper;
import com.kids.SEB_main_030.domain.comment.service.CommentService;
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

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private CommentMapper commentMapper;
    @MockBean
    private CommentService commentService;

    @DisplayName("댓글 등록")
    @Test
    void postCommentTest() throws Exception {
        // then
        long postId = 1L;
        CommentDto.Post commentDto = new CommentDto.Post("test");
        Comment comment = new Comment();
        comment.setCommentId(1L);

        given(commentMapper.commentPostDtoToComment(Mockito.any(CommentDto.Post.class))).willReturn(new Comment());
        given(commentService.createComment(Mockito.any(Comment.class), Mockito.anyLong())).willReturn(comment);
        String content = gson.toJson(commentDto);

        // when
        ResultActions actions =
                mockMvc.perform(post("/api/post/{post-id}/comment", postId)
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/post/1/comment"))));
    }

    @DisplayName("댓글 수정")
    @Test
    void patchCommentTest() throws Exception {
        // then
        long postId = 1L;
        long commentId = 1L;
        CommentDto.Patch commentDto = new CommentDto.Patch("testPatch");
        Comment comment = new Comment();
        comment.setCommentId(1L);
        CommentDto.PatchResponse response = new CommentDto.PatchResponse(1L, "testPatch");

        given(commentMapper.commentPatchDtoToComment(Mockito.any(CommentDto.Patch.class))).willReturn(new Comment());
        given(commentService.updateComment(Mockito.any(Comment.class), Mockito.anyLong(), Mockito.anyLong())).willReturn(new Comment());
        given(commentMapper.commentToPatchResponseDto(Mockito.any(Comment.class))).willReturn(response);
        String content = gson.toJson(commentDto);

        // when
        ResultActions actions =
                mockMvc.perform(patch("/api/post/{post-id}/comment/{comment-id}", postId, commentId)
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").value(commentDto.getContent()));
    }

    @DisplayName("댓글 리스트 출력")
    @Test
    void getCommentTest() throws Exception {
        // then
        long postId = 1L;
        Comment comment1 = new Comment(1L, "test1", false);
        Comment comment2 = new Comment(2L, "test2", true);
        CommentDto.CardViewResponse cardViewResponse1 = new CommentDto.CardViewResponse(
                "test1", "imageUrl1", "test1@gmail.com",
                1L, "test1", "time", false);
        CommentDto.CardViewResponse cardViewResponse2 = new CommentDto.CardViewResponse(
                "test2", "imageUrl2", "test2@gmail.com",
                2L, "test2", "time", true);
        List<CommentDto.CardViewResponse> response = List.of(cardViewResponse1, cardViewResponse2);

        given(commentService.findComments(Mockito.anyLong())).willReturn(new ArrayList<>());
        given(commentMapper.commentsAndProfilesAndUsersToCardViewResponseDtos(Mockito.anyList()))
                .willReturn(response);

        // when
        ResultActions actions =
                mockMvc.perform(get("/api/post/{post-id}/comment", postId)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].commentId").value(comment1.getCommentId()))
                .andExpect(jsonPath("$.data[0].content").value(comment1.getContent()))
                .andExpect(jsonPath("$.data[1].modified").value(comment2.isModified()));
    }

    @DisplayName("댓글 삭제")
    @Test
    void deleteCommentTest() throws Exception {
        // given
        long commentId = 1L;
        doNothing().when(commentService).deleteComment(commentId);
        // when
        ResultActions actions = mockMvc.perform(
                delete("/api/post/1/comment/{comment-id}", commentId));
        // then
        actions.andExpect(status().isNoContent());
    }
}
