package com.kids.SEB_main_030.kindergarten.entity;

import com.kids.SEB_main_030.post.entity.Like;
import com.kids.SEB_main_030.post.entity.Post;
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
    @Column(nullable = false,unique = true)
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

    // Post 와 매핑 (유치원 데이터 삭제시 관련 게시물도 삭제)
    @OneToMany(mappedBy = "kindergarten", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();
}
