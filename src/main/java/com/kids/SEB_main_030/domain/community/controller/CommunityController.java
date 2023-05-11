package com.kids.SEB_main_030.domain.community.controller;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.mapper.CommunityMapper;
import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/community/{community-id}")
@RequiredArgsConstructor
@Validated
public class CommunityController {

    private final CommunityMapper communityMapper;
    private final CommunityService communityService;
    private final KindergartenService kindergartenService;

    // 커뮤니티 게시판 유치원 정보 출력
    @GetMapping
    public ResponseEntity getCommunity(@PathVariable("community-id") @Positive long communityId) {
        Community findCommunity = communityService.findCommunity(communityId);
        Kindergarten findKindergarten = kindergartenService.findVerifiedKindergarten(findCommunity.getCommunityId());
        return new ResponseEntity<>(
                new SingleResponseDto(communityMapper.communityAndKindergartenToResponseDto(findCommunity, findKindergarten)),
                HttpStatus.OK);
    }
}
