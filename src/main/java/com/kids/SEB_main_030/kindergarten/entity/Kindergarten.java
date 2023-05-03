package com.kids.SEB_main_030.kindergarten.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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
}
