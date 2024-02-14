package com.xdev.merch.repository;

import com.xdev.merch.entities.Products;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Products entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    List<Products> findAllByUserId(Long userId);
}
