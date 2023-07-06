package com.kids.SEB_main_030.domain.profile;

import com.google.gson.Gson;

import com.kids.SEB_main_030.domain.profile.dto.*;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import com.kids.SEB_main_030.domain.profile.mapper.ProfileMapper;
import com.kids.SEB_main_030.domain.profile.service.ProfileService;
import com.kids.SEB_main_030.global.utils.UriCreator;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.matchers.StartsWith;
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
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest
@AutoConfigureMockMvc
public class ProfileControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private ProfileMapper mapper;
    @MockBean
    private ProfileService profileService;
    private final String DEFAULT_URL = "/api/users/profile";
    @Test
    @DisplayName("프로필 등록하기")
    void postProfileTest() throws Exception {
        // given
        long profileId = 1L;
        ProfilePostDto postDto = new ProfilePostDto("test", true, "male",
                "진돗개", null);
        Profile profile = new Profile();
        profile.setProfileId(profileId);
        given(mapper.profilePostToProfile(Mockito.any(ProfilePostDto.class))).willReturn(profile);
        given(profileService.createProfile(Mockito.any(Profile.class), Mockito.any(MultipartFile.class))).willReturn(profile);
        MockPart content = new MockPart("postDto", gson.toJson(postDto).getBytes());
        content.getHeaders().set("Content-Type", "application/json");
        MockMultipartFile imageFile = new MockMultipartFile("image", "test.jpg", "image/jpeg", "image data".getBytes());

        // when
        ResultActions actions = mockMvc.perform(
                multipart(DEFAULT_URL)
                        .file(imageFile)
                        .part(content)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith(DEFAULT_URL))));
    }
    @Test
    @DisplayName("프로필 수정하기")
    void patchProfileTest() throws Exception{
        // given
        long profileId = 1L;
        ProfilePatchDto patchDto = new ProfilePatchDto("test", false, "male", "믹스견", null);
        DogProfileResponseDto responseDto = new DogProfileResponseDto(1L, 1L, "test", "male", "믹스견", null, "test@naver.com");
        given(mapper.profilePatchToProfile(Mockito.any(ProfilePatchDto.class))).willReturn(new Profile());
        given(profileService.updateProfile(Mockito.any(Profile.class), Mockito.anyLong(), Mockito.any(MultipartFile.class))).willReturn(new Profile());
        given(mapper.profileToDogProfileDto(Mockito.any(Profile.class))).willReturn(responseDto);

        MockPart patchContent = new MockPart("patchDto", gson.toJson(patchDto).getBytes());
        patchContent.getHeaders().set("Content-Type", "application/json");
        MockMultipartFile imageFile = new MockMultipartFile("image", "test.jpg", "image/jpeg", "image data".getBytes());
        URI uri = UriCreator.createUri(DEFAULT_URL, profileId);

        // when
        ResultActions actions = mockMvc.perform(
                multipart(HttpMethod.PATCH, uri)
                        .file(imageFile)
                        .part(patchContent)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value(patchDto.getName()))
                .andExpect(jsonPath("$.data.breed").value(patchDto.getBreed()))
                .andExpect(jsonPath("$.data.profileId").value(profileId));
    }

    @Test
    @DisplayName("프로필 삭제하기")
    void deleteProfileTest() throws Exception{
        // given
        long profileId = 1L;
        doNothing().when(profileService).deleteProfile(profileId);

        // when
        ResultActions actions = mockMvc.perform(
                delete(DEFAULT_URL + "/" + profileId)
        );

        // then
        actions
                .andExpect(status().isNoContent());
    }
    @Test
    @DisplayName("특정 프로필 조회하기")
    void getDogProfileTest() throws Exception{
        long profileId = 1L;
        Profile profile = new Profile(1L, Profile.type.DOG, "test", "male", "진돗개", false);
        DogProfileResponseDto responseDto = new DogProfileResponseDto(1L, 1L, "test", "male", "진돗개", null, "test@naver.com");
        given(profileService.findProfile(profileId)).willReturn(profile);
        given(mapper.profileToDogProfileDto(Mockito.any(Profile.class))).willReturn(responseDto);

        ResultActions actions = mockMvc.perform(
                get(DEFAULT_URL + "/" + profileId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.profileId").value(profile.getProfileId()))
                .andExpect(jsonPath("$.data.name").value(profile.getName()))
                .andExpect(jsonPath("$.data.breed").value(profile.getBreed()));


    }
    @Test
    @DisplayName("프로필 목록 조회하기")
    void getProfilesTest() throws Exception{
        Profile profile1 = new Profile(1L, Profile.type.DOG, "test1", "male", "진돗개", false);
        Profile profile2 = new Profile(2L, Profile.type.DOG, "test2", "male", "믹스견", false);
        List<Profile> profiles = Arrays.asList(profile1, profile2);
        PersonProfileResponseDto responseDto1 = new PersonProfileResponseDto(1L,1L,"test1", "test1@naver.com");
        PersonProfileResponseDto responseDto2 = new PersonProfileResponseDto(2L,2L,"test2", "test2@naver.com");
        List<PersonProfileResponseDto> responses = Arrays.asList(responseDto1, responseDto2);

        given(profileService.findProfiles()).willReturn(profiles);
        given(mapper.profilesToReponseDtos(Mockito.any(List.class))).willReturn(responses);

        ResultActions actions = mockMvc.perform(
                get(DEFAULT_URL)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[*].name", hasItem(profile1.getName())))
                .andExpect(jsonPath("$.[*].profileId", hasItem(2)));


    }
    @Test
    @DisplayName("현재 프로필 조회하기")
    void getCurrentProfileTest() throws Exception{
        long profileId = 1L;
        Profile profile = new Profile(1L, Profile.type.DOG, "test", "male", "진돗개", true);
        CurrentProfileResponseDto responseDto = new CurrentProfileResponseDto(profileId, "test@naver.com", "test", "진돗개", 0, 0, null);

        given(profileService.getCurrentProfile()).willReturn(profile);
        given(mapper.profileToCurrentProfileResponseDto(Mockito.any(Profile.class))).willReturn(responseDto);

        ResultActions actions = mockMvc.perform(
                get(DEFAULT_URL + "/currentProfile")
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.profileId").value(profile.getProfileId()))
                .andExpect(jsonPath("$.data.name").value(profile.getName()))
                .andExpect(jsonPath("$.data.breed").value(profile.getBreed()));
    }
    @Test
    @DisplayName("프로필 선택하기")
    void selectProfileTest() throws Exception{
        long profileId = 1L; // 선택할 프로필 ID
        doNothing().when(profileService).selectProfile(profileId);

        ResultActions actions = mockMvc.perform(
                post(DEFAULT_URL + "/{profile-id}", profileId)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.andExpect(status().isNoContent());
    }
}
