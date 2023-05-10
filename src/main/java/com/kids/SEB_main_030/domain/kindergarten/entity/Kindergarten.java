package com.kids.SEB_main_030.domain.kindergarten.entity;

import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.domain.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Kindergarten {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long kindergartenId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Double longitude;
    private String snsUrl;
    private Double ratedReviewsAvg;
    private String locations;
    private String openHours;
    private String closeHours;
    private String phoneNumber;
    @Column(length = 1000)
    private String pagetoken;
    //구글에서 가져온 구글식 id;
    private String placeId;

    // Post 와 매핑 (유치원 데이터 삭제시 관련 게시물도 삭제)
    @OneToOne(mappedBy = "kindergarten", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Community community;

    @OneToMany(mappedBy = "kindergarten",cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    public void setCommunity(Community community) {
        this.community = community;
        if (community.getKindergarten() != this) {
            community.setKindergarten(this);
        }
    }
}
