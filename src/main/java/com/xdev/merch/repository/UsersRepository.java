package com.xdev.merch.repository;

import com.xdev.merch.domain.Users;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Users entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    @Query("SELECT u.id, u.login, u, u.name, u.email, u.act, u.createdAt, u.updatedAt, u.status FROM Users u ")
    List<Users> findUserDetailsById(@Param("userId") Long userId);
}
