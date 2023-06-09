package com.kids.SEB_main_030.global.image.entity;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.review.entity.Review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @Column
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    public enum Location {
        POST("/post/image"),
        KINDERGARTEN("/kindergarten/image"),
        REVIEW("/review/image"),
        PROFILE("/profile/image");

        @Getter
        private String location;

        Location(String location) {
            this.location = location;
        }
    }
    public Image(Long imageId, String imageUrl) {
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }
}
