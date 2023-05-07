package com.kids.SEB_main_030.user.repository;

import com.kids.SEB_main_030.user.entity.SocialType;
import com.kids.SEB_main_030.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);
}
