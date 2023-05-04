package com.kids.SEB_main_030.profile.entity;

import com.kids.SEB_main_030.post.entity.Like;
import com.kids.SEB_main_030.post.entity.Post;
import com.kids.SEB_main_030.user.entity.User;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @OneToMany(mappedBy = "profile")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<Like> likes = new ArrayList<>();

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
