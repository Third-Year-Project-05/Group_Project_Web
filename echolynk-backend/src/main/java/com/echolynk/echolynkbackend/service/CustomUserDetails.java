package com.echolynk.echolynkbackend.service;

import com.google.firebase.auth.UserRecord;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final UserRecord userRecord;

    public CustomUserDetails(UserRecord userRecord) {
        this.userRecord = userRecord;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // Or map roles if you have them
    }

    @Override
    public String getPassword() {
        // Firebase does not provide password
        return null;
    }

    @Override
    public String getUsername() {
        return userRecord.getEmail();
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

    public UserRecord getUserRecord() {
        return userRecord;
    }
}
