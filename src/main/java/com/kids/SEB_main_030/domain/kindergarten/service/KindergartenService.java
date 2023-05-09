package com.kids.SEB_main_030.domain.kindergarten.service;

import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.repository.KindergartenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
    public Kindergarten findKindergarten(long kindergartenId){
        return findVerifiedKindergarten(kindergartenId);
    }
    public Page<Kindergarten>findKindergartens(int page,int size){
        Page<Kindergarten> kindergartenPage = kindergartenRepository.findAll(PageRequest.of(page, size,
                Sort.by("KindergartenId").descending()));
        return kindergartenPage;
    }
    public Page<Kindergarten>findKindergartensByLocation(String locationFilter,int page,int size ){
        Page<Kindergarten> kindergartenPage = kindergartenRepository.findByLocationsContaining(locationFilter,PageRequest.of(page, size));
        return kindergartenPage;
    }
    public Kindergarten findVerifiedKindergarten(long kindergartenId){
        Optional<Kindergarten> kindergartenOptional = kindergartenRepository.findById(kindergartenId);
        Kindergarten findKindergarten = kindergartenOptional.orElseThrow(()->
                new LogicException(CustomException.KINDERGARTEN_NOT_FOUND));
        return findKindergarten;
    }
}
