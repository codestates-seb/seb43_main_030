package com.kids.SEB_main_030.global.scheduler.controller;

import com.kids.SEB_main_030.global.scheduler.service.SchedulerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@Slf4j
@Transactional
@RequiredArgsConstructor
@RequestMapping("/api/scheduler")
public class SchedulerController {
    private final SchedulerService schedulerService;

    @GetMapping
    public ResponseEntity serviceOn() throws Exception {
        schedulerService.mainService();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
