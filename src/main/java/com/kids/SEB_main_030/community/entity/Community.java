package com.kids.SEB_main_030.community.entity;

import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;

    @Column
    private String introduction;

    @OneToOne
    @JoinColumn(name = "kindergartenId")
    private Kindergarten kindergarten;

    @OneToMany(mappedBy = "community")
    private List<Post> posts;
}
