package com.kids.SEB_main_030.domain.profile.entity;

import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;
    @Enumerated(EnumType.STRING)
    private type type;
    @Column(nullable = false)
    private String name;
    private String gender;
    private String breed;
    private String imageUrl;
    private boolean checkPerson;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.REMOVE)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.REMOVE)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "profile", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    public Profile(Long profileId, Profile.type type, String name, String gender, String breed, boolean checkPerson) {
        this.profileId = profileId;
        this.type = type;
        this.name = name;
        this.gender = gender;
        this.breed = breed;
        this.checkPerson = checkPerson;
    }

    public enum type{
        PERSON("사람"),
        DOG("반려견");
        @Getter
        private String types;

        type(String types) {
            this.types = types;
        }
    }

}
