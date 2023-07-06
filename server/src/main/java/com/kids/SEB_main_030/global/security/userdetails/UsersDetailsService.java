package com.kids.SEB_main_030.global.security.userdetails;

import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.domain.user.entity.Role;
import com.kids.SEB_main_030.domain.user.entity.User;
import com.kids.SEB_main_030.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UsersDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new LogicException(CustomException.USER_NOT_FOUND));
        return new UsersDetails(user);
    }

    private final class UsersDetails extends User implements UserDetails{
        UsersDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRole(user.getRole());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            List<GrantedAuthority> authorities = new ArrayList<>();
            if (getRole() == Role.USER) {
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            } else if (getRole() == Role.GUEST) {
                authorities.add(new SimpleGrantedAuthority("ROLE_GUEST"));
            } else if (getRole() == Role.OFFICIAL) {
                authorities.add(new SimpleGrantedAuthority("ROLE_OFFICIAL"));
            } else if (getRole() == Role.WITHDRAWAL) {
                throw new AccessDeniedException("탈퇴한 회원입니다.");
            }
            return authorities;
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}

