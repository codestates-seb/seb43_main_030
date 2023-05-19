package com.kids.SEB_main_030.domain.profile.entity;

import com.kids.SEB_main_030.domain.comment.entity.Comment;
import com.kids.SEB_main_030.domain.like.entity.Like;
import com.kids.SEB_main_030.domain.post.entity.Post;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.domain.user.entity.User;
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

    @OneToMany(mappedBy = "profile")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "profile")
    private List<Comment> comments = new ArrayList<>();

    public enum type{
        PERSON("사람"),
        DOG("반려견");
        @Getter
        private String types;

        type(String types) {
            this.types = types;
        }
    }

//    public List<Post> getPostsFromMyPage(){
//        return posts.stream().map(
//                post -> {
//                    Post p = new Post();
//                    p.setPostId(post.getPostId());
//                    p.setTitle(post.getTitle());
//                    p.setContent(post.getContent());
//                    p.setViews(post.getViews());
//                    p.setCreatedAt(post.getCreatedAt());
//                    p.setCategory(post.getCategory());
//                    p.setLikeCount(post.getLikes().size());
//
//                    return p;
//                }).collect(Collectors.toList());
//    }
//
//    public List<Review> getReviewsFromMyPage(){
//        return reviews.stream().map(
//                review -> {
//                    Review r = new Review();
//                    r.setReviewId(review.getReviewId());
//                    r.setContents(review.getContents());
//                    r.setRatedReview(review.getRatedReview());
//
//                    return r;
//                }).collect(Collectors.toList());
//    }
}
