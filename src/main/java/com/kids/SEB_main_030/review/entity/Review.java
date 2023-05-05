package com.kids.SEB_main_030.review.entity;

import com.kids.SEB_main_030.audit.Auditable;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

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
