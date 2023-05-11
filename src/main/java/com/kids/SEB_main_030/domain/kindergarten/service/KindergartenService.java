package com.kids.SEB_main_030.domain.kindergarten.service;

import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.review.repository.ReviewRepository;
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

import java.util.*;

@Service
@Slf4j
@Transactional
public class KindergartenService {
    private final KindergartenRepository kindergartenRepository;
    private final ReviewRepository reviewRepository;

    public KindergartenService(KindergartenRepository kindergartenRepository, ReviewRepository reviewRepository) {
        this.kindergartenRepository = kindergartenRepository;
        this.reviewRepository = reviewRepository;
    }

    public Kindergarten createKindergarten(Kindergarten kindergarten) {
        Kindergarten savedKindergarten = kindergartenRepository.save(kindergarten);
        return savedKindergarten;
    }

    public Kindergarten findKindergarten(long kindergartenId) {
        Kindergarten kindergarten = findVerifiedKindergarten(kindergartenId);
        Double reviewAvg = findReviewAvg(kindergarten);
        kindergarten.setRatedReviewsAvg(reviewAvg);
        kindergarten.setRatedReviewsCount(findReviewCnt(kindergarten));
        return kindergarten;
    }
    public List<Kindergarten> findKindergartensByTitle(String titleKeyword){
        List<Kindergarten> kindergartens = kindergartenRepository.findByNameContaining(titleKeyword);
        findReviewAvgs(kindergartens);
        findReviewcnts(kindergartens);
        return kindergartens;
    }
    public Page<Kindergarten> findKindergartens(int page, int size) {
        Page<Kindergarten> kindergartenPage = kindergartenRepository.findAll(PageRequest.of(page, size,
                Sort.by("KindergartenId").descending()));
        return kindergartenPage;
    }

    public Page<Kindergarten> findKindergartensByLocation(String locationFilter, int page, int size) {
        Page<Kindergarten> kindergartenPage = kindergartenRepository.findByLocationsContaining(locationFilter, PageRequest.of(page, size));
        return kindergartenPage;
    }

    public List<Kindergarten> findKindergartensByLocationCategory(int categoryNum) {
        List<String> Location1 = List.of("강서", "구로", "양천", "Gangseo", "Guro", "Yangcheon");
        List<String> Location2 = List.of("관악", "금천", "동작", "영등포", "Gwanak", "Geumcheon", "Dongjak", "Yeongdeungpo");
        List<String> Location3 = List.of("강남", "강동", "서초", "송파", "Gangnam", "Gangdong", "Seocho", "Songpa");
        List<String> Location4 = List.of("마포", "은평", "서대문", "Mapo", "Eunpyeong", "Seodaemun");
        List<String> Location5 = List.of("강북", "노원", "도봉", "성북", "Gangbuk", "Nowon", "Dobong", "Seongbuk");
        List<String> Location6 = List.of("용산", "성동", "종로", "중구", "Yongsan", "Seongdong", "Jongno", "Jung-gu");
        List<String> Location7 = List.of("광진", "동대문", "중랑", "Gwangjin", "Dongdaemun", "Jungnang");
        Map<Integer, List<String>> category = new HashMap<>();
        category.put(1, Location1);
        category.put(2, Location2);
        category.put(3, Location3);
        category.put(4, Location4);
        category.put(5, Location5);
        category.put(6, Location6);
        category.put(7, Location7);
        List<Kindergarten> kindergartens = new ArrayList<>();
        if(categoryNum==0)
        {
            List<Kindergarten>kinderRepo= kindergartenRepository.findAll();
            findReviewAvgs(kinderRepo);
            findReviewcnts(kinderRepo);
            return kinderRepo;
        }
        List<String> select = category.get(Integer.valueOf(categoryNum));
        for (int i = 0; i < select.size(); i++) {
            List<Kindergarten>findKindergartens = kindergartenRepository.findByLocationsContaining(select.get(i));
            kindergartens.addAll(findKindergartens);
        }
        findReviewAvgs(kindergartens);
        findReviewcnts(kindergartens);
        return kindergartens;
    }
    private void findReviewcnts(List<Kindergarten> kindergartens) {
        for (int i = 0; i < kindergartens.size(); i++) {
            kindergartens.get(i).setRatedReviewsCount(findReviewCnt(kindergartens.get(i)));
        }
    }


    public Integer findReviewCnt(Kindergarten kindergarten){
        List<Review> reviews = reviewRepository.findByKindergarten_KindergartenId(kindergarten.getKindergartenId());
        return reviews.size();
    }
    public Double findReviewAvg(Kindergarten kindergarten){
        List<Review> reviews = reviewRepository.findByKindergarten_KindergartenId(kindergarten.getKindergartenId());
        if(reviews.size()==0)
        {
            return 0.0;
        }
        Double total=0.0;
        for (int i = 0; i < reviews.size(); i++) {
            total=total+reviews.get(i).getRatedReview();
        }
        return total/reviews.size();
    }

    private void findReviewAvgs(List<Kindergarten> kindergartens) {
        for (int i = 0; i < kindergartens.size(); i++) {
            kindergartens.get(i).setRatedReviewsAvg(findReviewAvg(kindergartens.get(i)));
        }
    }


    public Kindergarten findVerifiedKindergarten(long kindergartenId) {
        Optional<Kindergarten> kindergartenOptional = kindergartenRepository.findById(kindergartenId);
        Kindergarten findKindergarten = kindergartenOptional.orElseThrow(() ->
                new LogicException(CustomException.KINDERGARTEN_NOT_FOUND));
        return findKindergarten;
    }

}
