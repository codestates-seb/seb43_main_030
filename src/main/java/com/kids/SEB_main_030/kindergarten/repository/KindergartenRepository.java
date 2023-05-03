package com.kids.SEB_main_030.kindergarten.repository;

import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KindergartenRepository extends JpaRepository<Kindergarten,Long> {
    Page<Kindergarten> findByLocationsContaining(String locations, PageRequest pageRequest);
}
