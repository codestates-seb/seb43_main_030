package com.kids.SEB_main_030.domain.kindergarten;

import com.kids.SEB_main_030.domain.kindergarten.mapper.KindergartenMapper;
import com.kids.SEB_main_030.domain.kindergarten.service.KindergartenService;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import com.google.gson.Gson;
@SpringBootTest
@AutoConfigureMockMvc
public class KindergartenControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private KindergartenMapper mapper;
    @MockBean
    KindergartenService service;


}
