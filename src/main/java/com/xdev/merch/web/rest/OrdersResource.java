package com.xdev.merch.web.rest;

import com.xdev.merch.domain.Orders;
import com.xdev.merch.repository.OrdersRepository;
import com.xdev.merch.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.xdev.merch.domain.Orders}.
 */
@RestController
@RequestMapping("/api/orders")
@Transactional
public class OrdersResource {

    private final Logger log = LoggerFactory.getLogger(OrdersResource.class);

    private static final String ENTITY_NAME = "orders";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdersRepository ordersRepository;

    public OrdersResource(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    /**
     * {@code POST  /orders} : Create a new orders.
     *
     * @param orders the orders to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orders, or with status {@code 400 (Bad Request)} if the orders has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Orders> createOrders(@Valid @RequestBody Orders orders) throws URISyntaxException {
        log.debug("REST request to save Orders : {}", orders);
        if (orders.getId() != null) {
            throw new BadRequestAlertException("A new orders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Orders result = ordersRepository.save(orders);
        return ResponseEntity
            .created(new URI("/api/orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orders/:id} : Updates an existing orders.
     *
     * @param id the id of the orders to save.
     * @param orders the orders to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orders,
     * or with status {@code 400 (Bad Request)} if the orders is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orders couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrders(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Orders orders
    ) throws URISyntaxException {
        log.debug("REST request to update Orders : {}, {}", id, orders);
        if (orders.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orders.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ordersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Orders result = ordersRepository.save(orders);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, orders.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /orders/:id} : Partial updates given fields of an existing orders, field will ignore if it is null
     *
     * @param id the id of the orders to save.
     * @param orders the orders to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orders,
     * or with status {@code 400 (Bad Request)} if the orders is not valid,
     * or with status {@code 404 (Not Found)} if the orders is not found,
     * or with status {@code 500 (Internal Server Error)} if the orders couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Orders> partialUpdateOrders(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Orders orders
    ) throws URISyntaxException {
        log.debug("REST request to partial update Orders partially : {}, {}", id, orders);
        if (orders.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orders.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ordersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Orders> result = ordersRepository
            .findById(orders.getId())
            .map(existingOrders -> {
                if (orders.getUserId() != null) {
                    existingOrders.setUserId(orders.getUserId());
                }
                if (orders.getCart() != null) {
                    existingOrders.setCart(orders.getCart());
                }
                if (orders.getMethod() != null) {
                    existingOrders.setMethod(orders.getMethod());
                }
                if (orders.getShipping() != null) {
                    existingOrders.setShipping(orders.getShipping());
                }
                if (orders.getPickupLocation() != null) {
                    existingOrders.setPickupLocation(orders.getPickupLocation());
                }
                if (orders.getTotalQty() != null) {
                    existingOrders.setTotalQty(orders.getTotalQty());
                }
                if (orders.getPayAmount() != null) {
                    existingOrders.setPayAmount(orders.getPayAmount());
                }
                if (orders.getTxnid() != null) {
                    existingOrders.setTxnid(orders.getTxnid());
                }
                if (orders.getChargeId() != null) {
                    existingOrders.setChargeId(orders.getChargeId());
                }
                if (orders.getOrderNumber() != null) {
                    existingOrders.setOrderNumber(orders.getOrderNumber());
                }
                if (orders.getPaymentStatus() != null) {
                    existingOrders.setPaymentStatus(orders.getPaymentStatus());
                }
                if (orders.getCustomerEmail() != null) {
                    existingOrders.setCustomerEmail(orders.getCustomerEmail());
                }
                if (orders.getCustomerName() != null) {
                    existingOrders.setCustomerName(orders.getCustomerName());
                }
                if (orders.getCustomerCountry() != null) {
                    existingOrders.setCustomerCountry(orders.getCustomerCountry());
                }
                if (orders.getCustomerPhone() != null) {
                    existingOrders.setCustomerPhone(orders.getCustomerPhone());
                }
                if (orders.getCustomerAddress() != null) {
                    existingOrders.setCustomerAddress(orders.getCustomerAddress());
                }
                if (orders.getCustomerCity() != null) {
                    existingOrders.setCustomerCity(orders.getCustomerCity());
                }
                if (orders.getCustomerZip() != null) {
                    existingOrders.setCustomerZip(orders.getCustomerZip());
                }
                if (orders.getShippingName() != null) {
                    existingOrders.setShippingName(orders.getShippingName());
                }
                if (orders.getShippingCountry() != null) {
                    existingOrders.setShippingCountry(orders.getShippingCountry());
                }
                if (orders.getShippingEmail() != null) {
                    existingOrders.setShippingEmail(orders.getShippingEmail());
                }
                if (orders.getShippingPhone() != null) {
                    existingOrders.setShippingPhone(orders.getShippingPhone());
                }
                if (orders.getShippingAddress() != null) {
                    existingOrders.setShippingAddress(orders.getShippingAddress());
                }
                if (orders.getShippingCity() != null) {
                    existingOrders.setShippingCity(orders.getShippingCity());
                }
                if (orders.getShippingZip() != null) {
                    existingOrders.setShippingZip(orders.getShippingZip());
                }
                if (orders.getOrderNote() != null) {
                    existingOrders.setOrderNote(orders.getOrderNote());
                }
                if (orders.getCouponCode() != null) {
                    existingOrders.setCouponCode(orders.getCouponCode());
                }
                if (orders.getCouponDiscount() != null) {
                    existingOrders.setCouponDiscount(orders.getCouponDiscount());
                }
                if (orders.getStatus() != null) {
                    existingOrders.setStatus(orders.getStatus());
                }
                if (orders.getCreatedAt() != null) {
                    existingOrders.setCreatedAt(orders.getCreatedAt());
                }
                if (orders.getUpdatedAt() != null) {
                    existingOrders.setUpdatedAt(orders.getUpdatedAt());
                }
                if (orders.getAffilateUser() != null) {
                    existingOrders.setAffilateUser(orders.getAffilateUser());
                }
                if (orders.getAffilateCharge() != null) {
                    existingOrders.setAffilateCharge(orders.getAffilateCharge());
                }
                if (orders.getCurrencySign() != null) {
                    existingOrders.setCurrencySign(orders.getCurrencySign());
                }
                if (orders.getCurrencyValue() != null) {
                    existingOrders.setCurrencyValue(orders.getCurrencyValue());
                }
                if (orders.getShippingCost() != null) {
                    existingOrders.setShippingCost(orders.getShippingCost());
                }
                if (orders.getPackingCost() != null) {
                    existingOrders.setPackingCost(orders.getPackingCost());
                }
                if (orders.getTax() != null) {
                    existingOrders.setTax(orders.getTax());
                }
                if (orders.getDp() != null) {
                    existingOrders.setDp(orders.getDp());
                }
                if (orders.getPayId() != null) {
                    existingOrders.setPayId(orders.getPayId());
                }
                if (orders.getVendorShippingId() != null) {
                    existingOrders.setVendorShippingId(orders.getVendorShippingId());
                }
                if (orders.getVendorPackingId() != null) {
                    existingOrders.setVendorPackingId(orders.getVendorPackingId());
                }
                if (orders.getWholeDiscount() != null) {
                    existingOrders.setWholeDiscount(orders.getWholeDiscount());
                }

                return existingOrders;
            })
            .map(ordersRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, orders.getId().toString())
        );
    }

    /**
     * {@code GET  /orders} : get all the orders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orders in body.
     */
    @GetMapping("")
    public List<Orders> getAllOrders() {
        log.debug("REST request to get all Orders");
        return ordersRepository.findall();
    }

    /**
     * {@code GET  /orders/:id} : get the "id" orders.
     *
     * @param id the id of the orders to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orders, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrders(@PathVariable Long id) {
        log.debug("REST request to get Orders : {}", id);
        Optional<Orders> orders = ordersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orders);
    }

    /**
     * {@code DELETE  /orders/:id} : delete the "id" orders.
     *
     * @param id the id of the orders to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrders(@PathVariable Long id) {
        log.debug("REST request to delete Orders : {}", id);
        ordersRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
