package com.xdev.merch.service;

import com.xdev.merch.entities.Users;
import com.xdev.merch.repository.UsersRepository;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Users> findUsersByEmail(String username) {
        return usersRepository.findUsersByEmail(username);
    }
}
