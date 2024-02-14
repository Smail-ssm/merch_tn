package com.xdev.merch.controllers;

import com.xdev.merch.controllers.errors.BadRequestAlertException;
import com.xdev.merch.entities.VendorOrders;
import com.xdev.merch.repository.VendorOrdersRepository;
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
 * REST controller for managing {@link com.xdev.merch.entities.VendorOrders}.
 */
@RestController
@RequestMapping("/api/vendor-orders")
@Transactional
public class VendorOrdersResource {

    private final Logger log = LoggerFactory.getLogger(VendorOrdersResource.class);

    private static final String ENTITY_NAME = "vendorOrders";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VendorOrdersRepository vendorOrdersRepository;

    public VendorOrdersResource(VendorOrdersRepository vendorOrdersRepository) {
        this.vendorOrdersRepository = vendorOrdersRepository;
    }

    /**
     * {@code POST  /vendor-orders} : Create a new vendorOrders.
     *
     * @param vendorOrders the vendorOrders to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vendorOrders, or with status {@code 400 (Bad Request)} if the vendorOrders has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<VendorOrders> createVendorOrders(@Valid @RequestBody VendorOrders vendorOrders) throws URISyntaxException {
        log.debug("REST request to save VendorOrders : {}", vendorOrders);
        if (vendorOrders.getId() != null) {
            throw new BadRequestAlertException("A new vendorOrders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VendorOrders result = vendorOrdersRepository.save(vendorOrders);
        return ResponseEntity
            .created(new URI("/api/vendor-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vendor-orders/:id} : Updates an existing vendorOrders.
     *
     * @param id the id of the vendorOrders to save.
     * @param vendorOrders the vendorOrders to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendorOrders,
     * or with status {@code 400 (Bad Request)} if the vendorOrders is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vendorOrders couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<VendorOrders> updateVendorOrders(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VendorOrders vendorOrders
    ) throws URISyntaxException {
        log.debug("REST request to update VendorOrders : {}, {}", id, vendorOrders);
        if (vendorOrders.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vendorOrders.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vendorOrdersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VendorOrders result = vendorOrdersRepository.save(vendorOrders);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendorOrders.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /vendor-orders/:id} : Partial updates given fields of an existing vendorOrders, field will ignore if it is null
     *
     * @param id the id of the vendorOrders to save.
     * @param vendorOrders the vendorOrders to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendorOrders,
     * or with status {@code 400 (Bad Request)} if the vendorOrders is not valid,
     * or with status {@code 404 (Not Found)} if the vendorOrders is not found,
     * or with status {@code 500 (Internal Server Error)} if the vendorOrders couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VendorOrders> partialUpdateVendorOrders(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VendorOrders vendorOrders
    ) throws URISyntaxException {
        log.debug("REST request to partial update VendorOrders partially : {}, {}", id, vendorOrders);
        if (vendorOrders.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vendorOrders.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vendorOrdersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VendorOrders> result = vendorOrdersRepository
            .findById(vendorOrders.getId())
            .map(existingVendorOrders -> {
                if (vendorOrders.getUserId() != null) {
                    existingVendorOrders.setUserId(vendorOrders.getUserId());
                }
                if (vendorOrders.getOrderId() != null) {
                    existingVendorOrders.setOrderId(vendorOrders.getOrderId());
                }
                if (vendorOrders.getQty() != null) {
                    existingVendorOrders.setQty(vendorOrders.getQty());
                }
                if (vendorOrders.getPrice() != null) {
                    existingVendorOrders.setPrice(vendorOrders.getPrice());
                }
                if (vendorOrders.getOrderNumber() != null) {
                    existingVendorOrders.setOrderNumber(vendorOrders.getOrderNumber());
                }
                if (vendorOrders.getStatus() != null) {
                    existingVendorOrders.setStatus(vendorOrders.getStatus());
                }

                return existingVendorOrders;
            })
            .map(vendorOrdersRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendorOrders.getId().toString())
        );
    }

    /**
     * {@code GET  /vendor-orders} : get all the vendorOrders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vendorOrders in body.
     */
    @GetMapping("")
    public List<VendorOrders> getAllVendorOrders() {
        log.debug("REST request to get all VendorOrders");
        return vendorOrdersRepository.findAll();
    }

    /**
     * {@code GET  /vendor-orders/:id} : get the "id" vendorOrders.
     *
     * @param id the id of the vendorOrders to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vendorOrders, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VendorOrders> getVendorOrders(@PathVariable Long id) {
        log.debug("REST request to get VendorOrders : {}", id);
        Optional<VendorOrders> vendorOrders = vendorOrdersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vendorOrders);
    }

    /**
     * {@code DELETE  /vendor-orders/:id} : delete the "id" vendorOrders.
     *
     * @param id the id of the vendorOrders to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendorOrders(@PathVariable Long id) {
        log.debug("REST request to delete VendorOrders : {}", id);
        vendorOrdersRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
