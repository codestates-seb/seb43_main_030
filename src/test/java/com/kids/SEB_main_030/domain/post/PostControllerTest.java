package com.kids.SEB_main_030.domain.post;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.like.service.LikeService;
import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.post.mapper.PostMapper;
import com.kids.SEB_main_030.domain.post.service.PostService;
import com.kids.SEB_main_030.global.dto.MultiResponseDto;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.global.utils.UriCreator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.FileInputStream;
import java.net.URI;
import java.time.LocalDateTime;
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
public class PostControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private PostMapper postMapper;
    @MockBean
    private PostService postService;
    @MockBean
    private LikeService likeService;


    @DisplayName("게시물 등록")
    @Test
    void postPostTest() throws Exception {
        long communityId = 1L;
        PostDto.Post postDto = new PostDto.Post("test", "test", "COMMUNITY");
        Post post = new Post();
        post.setPostId(1L);

        given(postMapper.postPostDtoToPost(Mockito.any(PostDto.Post.class))).willReturn(new Post());
        given(postService.createPost(Mockito.any(Post.class), Mockito.anyList(), Mockito.anyLong())).willReturn(post);

        MockPart contentMock = new MockPart("postDto", gson.toJson(postDto).getBytes());
        contentMock.getHeaders().set("Content-Type", "application/json");

        MockMultipartFile imageFile = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
        mockMvc.perform(multipart("/api/community/{community-id}/post", communityId)
                        .file(imageFile)
                        .part(contentMock)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/community/1/post"))));
    }

    @DisplayName("게시물 수정")
    @Test
    void patchPostTest() throws Exception {
        // given
        long communityId = 1L;
        long postId = 1L;
        PostDto.Patch patchDto = new PostDto.Patch("test", "test", "COMMUNITY", List.of(0L));
        PostDto.ImageResponse imageResponse1 = new PostDto.ImageResponse(1L, "imageUrl1");
        PostDto.ImageResponse imageResponse2 = new PostDto.ImageResponse(2L, "imageUrl2");
        PostDto.Response responseDto = new PostDto.Response(
                1L, "test", "test", 0, List.of(imageResponse1, imageResponse2));

        given(postMapper.postPatchDtoToPost(Mockito.any(PostDto.Patch.class))).willReturn(new Post());
        given(postService.updatePost(
                Mockito.any(Post.class), Mockito.anyList(), Mockito.anyLong(), Mockito.anyLong()))
                .willReturn(responseDto);

        MockMultipartFile imageFile1 = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
        MockMultipartFile imageFile2 = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
        MockPart mockContent = new MockPart("patchDto", gson.toJson(patchDto).getBytes());
        mockContent.getHeaders().set("Content-Type", "application/json");

        URI location = UriCreator.createUri("/api/community/{community-id}/post/{post-id}", communityId, postId);

        // then
        ResultActions actions =
                mockMvc.perform(multipart(HttpMethod.PATCH, location)
                        .file(imageFile1).file(imageFile2)
                        .part(mockContent)
                        .contentType(MediaType.MULTIPART_FORM_DATA));

        // when
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value(patchDto.getTitle()))
                .andExpect(jsonPath("$.data.content").value(patchDto.getContent()));
    }

    @DisplayName("게시판 상세 페이지 출력")
    @Test
    void getPostTest() throws Exception {
        // given
        long communityId = 1L;
        long postId = 1L;
        boolean isLike = true;
        Post post = new Post(1L, "test", "test", 0, false, Post.Category.NOTIFICATION, 0);
        PostDto.DetailPageResponse detailPageResponse = new PostDto.DetailPageResponse(
                1L, "test", "test", "NOTIFICATION", new ArrayList<>(), 1L,
                "profileImageUrl", "test", LocalDateTime.now(), 0, 0, false,
                false, "test@gmail.com");

        given(postService.findPostIncrementViews(Mockito.anyLong())).willReturn(new Post());
        given(likeService.isToLike(Mockito.any(Post.class))).willReturn(isLike);
        given(postMapper.postToDetailPageResponse(Mockito.any(Post.class), Mockito.anyBoolean()))
                .willReturn(detailPageResponse);

        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/api/community/{community-id}/post/{post-id}", communityId, postId)
                                .accept(MediaType.APPLICATION_JSON)
                );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.postId").value(post.getPostId()))
                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
                .andExpect(jsonPath("$.data.content").value(post.getContent()))
                .andExpect(jsonPath("$.data.category").value(post.getCategory().toString()))
                .andExpect(jsonPath("$.data.modifiedAt").value(post.getModifiedAt()))
                .andExpect(jsonPath("$.data.views").value(post.getViews()))
                .andExpect(jsonPath("$.data.modified").value(post.isModified()));
    }

    @DisplayName("게시판 게시물 리스트 출력")
    @Test
    void getPostsTest() throws Exception {
        // given
        long communityId = 1L;
        Post post1 = new Post(1L, "test1", "test1", 1, false, Post.Category.NOTIFICATION, 1);
        Post post2 = new Post(2L, "test2", "test2", 2, true, Post.Category.COMMUNITY, 2);
        PostDto.CardViewResponse cardViewResponse1 = new PostDto.CardViewResponse(
                1L, "test1", "test1", "postImageUrl1", 0, 0, 1L, "profileImageUrl1",
                "test1", LocalDateTime.now(), false);
        PostDto.CardViewResponse cardViewResponse2 = new PostDto.CardViewResponse(
                2L, "test2", "test2", "postImageUrl2", 0, 0, 2L, "profileImageUrl2",
                "test2", LocalDateTime.now(), false);
        List<PostDto.CardViewResponse> cardViewResponses = List.of(cardViewResponse1, cardViewResponse2);
        Page<Post> postPage = new PageImpl<>(List.of(post1, post2),
                PageRequest.of(0, 10,
                        Sort.by("postId").descending()), 2);

        given(postService.findCardViewResponse(Mockito.anyLong(), Mockito.anyInt(), Mockito.anyString(), Mockito.anyString()))
                .willReturn(new MultiResponseDto(cardViewResponses, postPage));

        MultiValueMap<String, String> queryParam = new LinkedMultiValueMap();
        queryParam.add("page", "1");
        queryParam.add("category", "NOTIFICATION");
        queryParam.add("keyword", "test");

        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/api/community/{community-id}/post", communityId)
                                .accept(MediaType.APPLICATION_JSON)
                                .params(queryParam)
                );
        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].postId").value(cardViewResponse1.getPostId()))
                .andExpect(jsonPath("$.data[0].title").value(cardViewResponse1.getTitle()))
                .andExpect(jsonPath("$.data[0].content").value(cardViewResponse1.getContent()))
                .andExpect(jsonPath("$.data[0].postImageUrl").value(cardViewResponse1.getPostImageUrl()))
                .andExpect(jsonPath("$.data[0].views").value(cardViewResponse1.getViews()))
                .andExpect(jsonPath("$.data[1].likeCount").value(cardViewResponse2.getLikeCount()))
                .andExpect(jsonPath("$.data[1].profileId").value(cardViewResponse2.getProfileId()))
                .andExpect(jsonPath("$.data[1].profileImageUrl").value(cardViewResponse2.getProfileImageUrl()))
                .andExpect(jsonPath("$.data[1].name").value(cardViewResponse2.getName()))
                .andExpect(jsonPath("$.data[1].modified").value(cardViewResponse2.isModified()))
                .andExpect(jsonPath("$.pageInfo.totalElements").value(postPage.getTotalElements()))
                .andExpect(jsonPath("$.pageInfo.totalPages").value(postPage.getTotalPages()));
    }

    @DisplayName("게시물 삭제")
    @Test
    void deletePostTest() throws Exception {
        // given
        long postId = 1L;
        doNothing().when(postService).deletePost(postId);
        // when
        ResultActions actions = mockMvc.perform(
                delete("/api/community/1/post/{post-id}", postId));
        // then
        actions.andExpect(status().isNoContent());
    }

    @DisplayName("유치원 상세 페이지 공지글 조회(최대 2개)")
    @Test
    void getNotificationPostsTest() throws Exception {
        long communityId = 1L;
        PostDto.getNotification getNotification1 = new PostDto.getNotification(
                1L, "test1", "test1", "createdAt");
        PostDto.getNotification getNotification2 = new PostDto.getNotification(
                2L, "test2", "test2", "createdAt");
        List<PostDto.getNotification> getNotifications = List.of(getNotification1, getNotification2);

        given(postService.findNotificationPosts(Mockito.anyLong())).willReturn(
                new SingleResponseDto(getNotifications));

        // when
        ResultActions actions =
                mockMvc.perform(
                        get("/api/community/{community-id}/post/notification", communityId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].postId").value(getNotification1.getPostId()))
                .andExpect(jsonPath("$.data[1].postId").value(getNotification2.getPostId()))
                .andExpect(jsonPath("$.data[0].title").value(getNotification1.getTitle()))
                .andExpect(jsonPath("$.data[1].title").value(getNotification2.getTitle()))
                .andExpect(jsonPath("$.data[0].content").value(getNotification1.getContent()))
                .andExpect(jsonPath("$.data[1].content").value(getNotification2.getContent()))
                .andExpect(jsonPath("$.data[0].createdAt").value(getNotification1.getCreatedAt()))
                .andExpect(jsonPath("$.data[1].createdAt").value(getNotification2.getCreatedAt()));
    }

    private MockMultipartFile createMockMultipartFile() throws Exception{
        MockMultipartFile image = new MockMultipartFile("image",
                "test.png",
                "image/png",
                new FileInputStream("T:\\123.png"));
        return image;
    }
}
