package com.kids.SEB_main_030.kindergarten.service;

import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.kindergarten.repository.KindergartenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class KindergartenService {
    private final KindergartenRepository kindergartenRepository;

    public KindergartenService(KindergartenRepository kindergartenRepository) {
        this.kindergartenRepository = kindergartenRepository;
    }
    public Kindergarten createKindergarten(Kindergarten kindergarten){
        Kindergarten savedKindergarten = kindergartenRepository.save(kindergarten);
        return savedKindergarten;
    }
}
