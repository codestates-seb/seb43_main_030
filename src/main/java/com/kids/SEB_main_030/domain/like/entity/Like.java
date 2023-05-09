package com.kids.SEB_main_030.domain.like.entity;

import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "LIKES")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "profileId")
    private Profile profile;
}
