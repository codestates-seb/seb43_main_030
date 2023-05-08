package com.kids.SEB_main_030.security.userdetails;

import com.kids.SEB_main_030.security.utils.CustomAuthorityUtils;
import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;
import com.kids.SEB_main_030.user.entity.Role;
import com.kids.SEB_main_030.user.entity.User;
import com.kids.SEB_main_030.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

