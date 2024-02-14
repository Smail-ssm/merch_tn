package com.xdev.merch.repository;

import com.xdev.merch.entities.Admins;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Admins entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdminsRepository extends JpaRepository<Admins, Long> {}
