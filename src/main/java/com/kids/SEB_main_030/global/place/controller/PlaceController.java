package com.kids.SEB_main_030.global.place.controller;

import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.global.place.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@RestController
@Validated
@Slf4j
@Transactional
@RequestMapping("/api/place")
public class PlaceController {
    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        //map.parseResponse(map.getResponse());
        List<Kindergarten> mapList = new ArrayList<>();
        mapList.addAll(placeService.parseResponse(placeService.getResponse()));
        for (int i = 0; i < 3; i++) {
            System.out.println("Start doing something: " + LocalDateTime.now());
            try {
                System.out.println("Sleep 3s: "  + LocalDateTime.now());
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Done: "  + LocalDateTime.now());
            String nextList = placeService.nextResponse(mapList);
            mapList.addAll(placeService.parseResponse(nextList));
        }
        return ResponseEntity.ok(mapList);
    }
}
