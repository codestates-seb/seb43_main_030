package com.kids.SEB_main_030.image.entity;

import com.kids.SEB_main_030.post.entity.Post;
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
        USER("/user/image"),
        PROFILE("/profile/image");

        @Getter
        private String location;
        Location(String location) {
            this.location = location;
        }
    }
}
