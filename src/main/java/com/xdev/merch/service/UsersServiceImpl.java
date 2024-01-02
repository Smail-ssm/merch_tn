package com.xdev.merch.service;

// UsersServiceImpl.java
import com.xdev.merch.domain.Users;
import com.xdev.merch.repository.UsersRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;

    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    //    @Override
    //    public Optional<Users> findByUsernameAndPassword(String username, String password) {
    //        return usersRepository.findByName(username, password);
    //    }
}
