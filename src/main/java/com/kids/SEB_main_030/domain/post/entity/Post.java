package com.kids.SEB_main_030.domain.post.entity;

import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.community.entity.Community;
import com.kids.SEB_main_030.global.audit.Auditable;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.profile.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(length = 45, nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    // erd 추가 해야됨
    @Column(nullable = false)
    private Integer views = 0;

    @Column(nullable = false)
    private boolean isModified = false;

    @Transient
    private List<Long> deleteImageIds;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Category category;

    @ManyToOne
    @JoinColumn(name = "profileId")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "communityId")
    private Community community;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    // Post 와 매핑 Post 삭제시 관련 Like 도 삭제
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

    private int likeCount;
    // Post 와 매핑 Post 삭제시 관련 Like 도 삭제
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Image> images = new ArrayList<>();
    
    public enum Category {
        NOTIFICATION("공지"),
        COMMUNITY("커뮤니티");

        @Getter
        private String category;

        Category(String category) {
            this.category = category;
        }

    }

}
