package com.kids.SEB_main_030.review.repository;

import com.kids.SEB_main_030.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review>findByKindergarten_KindergartenId(Long kindergartenId);
}
