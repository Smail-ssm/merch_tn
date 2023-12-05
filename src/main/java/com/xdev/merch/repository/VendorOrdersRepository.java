package com.xdev.merch.repository;

import com.xdev.merch.domain.VendorOrders;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VendorOrders entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendorOrdersRepository extends JpaRepository<VendorOrders, Long> {}
