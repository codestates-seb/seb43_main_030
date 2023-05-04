package com.kids.SEB_main_030.post.entity;

import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.Getter;
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
@EntityListeners(AuditingEntityListener.class)
public class Post {

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

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Category category;

    @ManyToOne
    @JoinColumn(name = "profileId")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "kindergartenId")
    private Kindergarten kindergarten;

    // Post 와 매핑 Post 삭제시 관련 Like 도 삭제
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

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
