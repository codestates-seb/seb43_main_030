package com.kids.SEB_main_030.domain.kindergarten;

import com.google.gson.Gson;
import com.kids.SEB_main_030.domain.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.domain.kindergarten.dto.KindergartenResponseDto;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.mapper.KindergartenMapper;
import com.kids.SEB_main_030.domain.kindergarten.service.KindergartenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@AutoConfigureMockMvc
public class KindergartenControllerTest {
    private static final Logger logger = LoggerFactory.getLogger(KindergartenControllerTest.class);
    private static final String KINDERGARTEN_DEFAULT_URL = "/api/kindergarten";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private KindergartenMapper mapper;
    @MockBean
    KindergartenService service;
    @Test
    @DisplayName("유치원 예시 데이터 넣기")
    public void testPostKindergarten() throws Exception {
        KindergartenPostDto kindergartenPostDto = new KindergartenPostDto();
        kindergartenPostDto.setName("유치원예시");
        kindergartenPostDto.setLongitude(123.123);
        kindergartenPostDto.setLatitude(123.123);

        Kindergarten kindergarten = new Kindergarten();
        kindergarten.setKindergartenId(1L);
        kindergarten.setName("유치원예시");
        kindergarten.setLongitude(123.123);
        kindergarten.setLatitude(123.123);


        given(mapper.kindergartenPostDtoToKindergarten(Mockito.any(KindergartenPostDto.class))).willReturn(new Kindergarten());
        given(service.createKindergarten(Mockito.any(Kindergarten.class))).willReturn(kindergarten);

        Gson gson = new Gson();
        String content = gson.toJson(kindergartenPostDto);
        // When
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .post(KINDERGARTEN_DEFAULT_URL)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        );

        actions.andExpect(status().isCreated());
    }
    @Test
    @DisplayName("유치원 상세 페이지 출력")
    public void testGetKindergarten() throws Exception {
        // Given
        long kindergartenId = 1L;

        Kindergarten kindergarten = new Kindergarten(1L,"유치원이름예시",123.123,123.123);
        KindergartenResponseDto responseDto = new KindergartenResponseDto();
        responseDto.setKindergartenId(1L);
        responseDto.setName("유치원이름예시");
        responseDto.setLatitude(123.123);
        responseDto.setLongitude(123.123);
        given(service.findKindergarten(kindergartenId)).willReturn(kindergarten);
        given(mapper.kindergartenToKindergartenResponseDto(kindergarten)).willReturn(responseDto);

        ResultActions actions = mockMvc.perform(
                get(KINDERGARTEN_DEFAULT_URL+"/"+kindergartenId)
                        .accept(MediaType.APPLICATION_JSON)

        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.kindergartenId").value(kindergartenId))
                .andExpect(jsonPath("$.data.name").value(kindergarten.getName()))
                .andExpect(jsonPath("$.data.latitude").value(kindergarten.getLatitude()))
                .andExpect(jsonPath("$.data.longitude").value(kindergarten.getLongitude()));
    }
    @Test
    @DisplayName("이름으로 유치원 데이터 찾기")
    public void testGetKindergartenByTitle()throws Exception{
        String nameKeyword = "유치원이름예시";
        Kindergarten kindergarten = new Kindergarten(1L,"유치원이름예시",123.123,123.123);
        Kindergarten kindergarten2 = new Kindergarten(2L,"유치원이름예시2",123.123,123.123);

        List<Kindergarten> kindergartens = Arrays.asList(kindergarten,kindergarten2);
        KindergartenResponseDto responseDto = new KindergartenResponseDto();
        responseDto.setKindergartenId(1L);
        responseDto.setName("유치원이름예시");
        responseDto.setLatitude(123.123);
        responseDto.setLongitude(123.123);
        KindergartenResponseDto responseDto1 = new KindergartenResponseDto();
        responseDto1.setKindergartenId(2L);
        responseDto1.setName("유치원이름예시2");
        responseDto1.setLatitude(123.123);
        responseDto1.setLongitude(123.123);
        List<KindergartenResponseDto> kindergartenResponseDtoList = Arrays.asList(responseDto,responseDto1);

        given(service.findKindergartensByTitle(nameKeyword)).willReturn(kindergartens);
        given(mapper.kindergartensToKindergartenResponseDtos(kindergartens)).willReturn(kindergartenResponseDtoList);

        ResultActions actions = mockMvc.perform(
                get(KINDERGARTEN_DEFAULT_URL+"/name/"+nameKeyword)
                        .accept(MediaType.APPLICATION_JSON)
        );

        actions.
                andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name"). value(kindergarten.getName()))
                .andExpect(jsonPath("$.[0].latitude"). value(kindergarten.getLatitude()))
                .andExpect(jsonPath("$.[0].longitude").value(kindergarten.getLongitude()));
    }
    @Test
    @DisplayName("카테고리로 유치원 데이터 찾기")
    public void testGetKindergartensByLocationCategory() throws Exception {
        int categoryId = 0;
        Kindergarten kindergarten = new Kindergarten(1L, "유치원1", 123.123, 123.123);
        Kindergarten kindergarten2 = new Kindergarten(2L, "유치원2", 456.456, 456.456);
        kindergarten.setLocations("서울시 강남구");
        kindergarten2.setLocations("서울시 마포구");
        List<Kindergarten> kindergartens = Arrays.asList(kindergarten, kindergarten2);
        KindergartenResponseDto responseDto = new KindergartenResponseDto();
        responseDto.setKindergartenId(1L);
        responseDto.setName("유치원1");
        responseDto.setLatitude(123.123);
        responseDto.setLongitude(123.123);
        responseDto.setLocations("서울시 강남구");
        KindergartenResponseDto responseDto2 = new KindergartenResponseDto();
        responseDto2.setKindergartenId(2L);
        responseDto2.setName("유치원2");
        responseDto2.setLatitude(456.456);
        responseDto2.setLongitude(456.456);
        responseDto2.setLocations("서울시 마포구");
        List<KindergartenResponseDto> kindergartenResponseDtoList = Arrays.asList(responseDto, responseDto2);

        given(service.findKindergartensByLocationCategory(categoryId)).willReturn(kindergartens);
        given(mapper.kindergartensToKindergartenResponseDtos(kindergartens)).willReturn(kindergartenResponseDtoList);

        mockMvc.perform(
                        get(KINDERGARTEN_DEFAULT_URL + "/loc/" + categoryId)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name"). value(kindergarten.getName()))
                .andExpect(jsonPath("$.[0].latitude"). value(kindergarten.getLatitude()))
                .andExpect(jsonPath("$.[0].longitude").value(kindergarten.getLongitude()));
    }

//    @Test
//    public void testPatchKindergartenImage() throws Exception{
//        long kindergartenId = 1L;
//        MockMultipartFile imageFile = new MockMultipartFile("images", "test.jpg", "image/jpeg", "image data".getBytes());
//        Kindergarten kindergarten = new Kindergarten(1L, "유치원1", 123.123, 123.123);
//        kindergarten.setImageUrl("test.jpg");
//        given(service.updateImage(imageFile,Mockito.anyLong())).willReturn(kindergarten);
//
//
//
//        ResultActions actions = mockMvc.perform(
//                MockMvcRequestBuilders
//                        .patch(KINDERGARTEN_DEFAULT_URL+"/{kinder-gartenId}",kindergartenId)
//                        .contentType(MediaType.MULTIPART_FORM_DATA)
//
//        );
//
//        actions.andExpect(status().isCreated());
//
//    }


}
