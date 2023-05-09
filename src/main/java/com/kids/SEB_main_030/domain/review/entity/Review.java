package com.kids.SEB_main_030.domain.review.entity;

import com.kids.SEB_main_030.global.audit.Auditable;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @Column(nullable = false)
    private String contents;
    @Column(nullable = false)
    private Double ratedReview;
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();
//    @Column(nullable = false)
//    private LocalDateTime modifiedAt = LocalDateTime.now();
//    @ManyToOne
//    @JoinColumn(name = "userId")
//    private User user;
    @ManyToOne
    @JoinColumn(name = "KINDERGARTEN_ID")
    private Kindergarten kindergarten;
    @ManyToOne
    @JoinColumn(name ="PROFILE_ID")
    private Profile profile;

    //private List<Image> imageList;
}
