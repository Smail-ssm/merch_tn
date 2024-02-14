package com.xdev.merch.repository;

import com.xdev.merch.entities.Orders;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Orders entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    //    @Query("SELECT o.id, o.orderNumber, o.totalQty, o.payAmount, o.paymentStatus, o.customerName FROM Orders o WHERE o.id = :orderId")
    //    List<Object[]> findOrderDetailsById(@Param("orderId") Long orderId);
    //
    //    @Query("SELECT o.id, o.orderNumber,  o.payAmount, o.paymentStatus, o.customerName FROM Orders o")
    //    List<Orders> findall();
    List<Orders> findAll();
}
