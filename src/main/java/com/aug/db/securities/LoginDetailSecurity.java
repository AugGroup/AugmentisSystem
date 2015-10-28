package com.aug.db.securities;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.aug.hrdb.entities.Login;

public class LoginDetailSecurity implements LoginDetail{
	
	public static final GrantedAuthority ADMIN_ROLE = new SimpleGrantedAuthority("ADMIN");
	private Login login;
	private Set<GrantedAuthority> grants;
	
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if (grants == null) {
            grants = new HashSet<GrantedAuthority>();
            if(login.getUsername().equals("admin")){
            	grants.add(ADMIN_ROLE);
            }
        }
		return grants;
	}

	public String getPassword() {
		return login.getPassword();
	}

	public String getUserName() {
		return login.getUsername();
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		return true;
	}
}
