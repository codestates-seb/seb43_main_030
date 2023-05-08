package com.kids.SEB_main_030.user.entity;

import com.kids.SEB_main_030.profile.entity.Profile;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(updatable = false, unique = true)
    private String email;
//    @Column(nullable = false)
    private String password;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    private String refreshToken; // 리프레시 토큰

    private long currentProfileId;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Profile> profiles = new ArrayList<>();
    public User(String email) {
        this.email = email;
    }
    public enum UserStatus{
        USER_ACTIVE("활동중"),
        USER_WITHDRAWAL("회원 탈퇴");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }
}
