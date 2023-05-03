package com.kids.SEB_main_030.kindergarten.controller;

import com.kids.SEB_main_030.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.kindergarten.mapper.KindergartenMapper;
import com.kids.SEB_main_030.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@Validated
@Slf4j
@Transactional
@RequestMapping("/api/kindergarten")
public class KindergartenController {
    private final static String KINDERGARTEN_DEFAULT_URL="/api/kindergarten";
    private final KindergartenService kindergartenService;
    private final KindergartenMapper kindergartenMapper;

    public KindergartenController(KindergartenService kindergartenService, KindergartenMapper kindergartenMapper) {
        this.kindergartenService = kindergartenService;
        this.kindergartenMapper = kindergartenMapper;
    }
    @PostMapping
    public ResponseEntity postKindergarten(@Valid @RequestBody KindergartenPostDto kindergartenPostDto)
    {
        Kindergarten kindergarten = kindergartenMapper.kindergartenPostDtoToKindergarten(kindergartenPostDto);
        Kindergarten createdKindergarten = kindergartenService.createKindergarten(kindergarten);
        URI location = UriCreator.createUri(KINDERGARTEN_DEFAULT_URL, createdKindergarten.getKindergartenId());

        return ResponseEntity.created(location).build();
    }
}
