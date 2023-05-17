package com.kids.SEB_main_030.domain.community.service;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.community.repository.CommunityRepository;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public Community findCommunity(long communityId) {
        return findVerifiedCommunity(communityId);
    }

    private Community findVerifiedCommunity(long communityId) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        return optionalCommunity.orElseThrow(() -> new LogicException(CustomException.COMMUNITY_NOT_FOUND));
    }

    public Community setDefaultCommunity(Kindergarten kindergarten) {
        Community community = new Community();
        String name = kindergarten.getName();
        community.setIntroduction("안녕하세요 " + name.substring(1, name.length() - 1) + " 입니다.");
        return community;
    }
}
