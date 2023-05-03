package com.kids.SEB_main_030.profile.repository;

import com.kids.SEB_main_030.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
