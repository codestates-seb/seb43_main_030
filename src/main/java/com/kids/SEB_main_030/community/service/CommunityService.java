package com.kids.SEB_main_030.community.service;

import com.kids.SEB_main_030.community.entity.Community;
import com.kids.SEB_main_030.community.repository.CommunityRepository;
import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public Community findCommunity(long communityId) {
        return findVerifiedCommunity(communityId);
    }

    private Community findVerifiedCommunity(long communityId) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        return optionalCommunity.orElseThrow(() -> new LogicException(CustomException.COMMUNITY_NOT_FOUND));
    }
}
