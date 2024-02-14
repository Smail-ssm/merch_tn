package com.xdev.merch.controllers;

import com.xdev.merch.controllers.errors.BadRequestAlertException;
import com.xdev.merch.entities.Admins;
import com.xdev.merch.repository.AdminsRepository;
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
 * REST controller for managing {@link com.xdev.merch.entities.Admins}.
 */
@RestController
@RequestMapping("/api/admins")
@Transactional
public class AdminsResource {

    private final Logger log = LoggerFactory.getLogger(AdminsResource.class);

    private static final String ENTITY_NAME = "admins";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AdminsRepository adminsRepository;

    public AdminsResource(AdminsRepository adminsRepository) {
        this.adminsRepository = adminsRepository;
    }

    /**
     * {@code POST  /admins} : Create a new admins.
     *
     * @param admins the admins to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new admins, or with status {@code 400 (Bad Request)} if the admins has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Admins> createAdmins(@Valid @RequestBody Admins admins) throws URISyntaxException {
        log.debug("REST request to save Admins : {}", admins);
        if (admins.getId() != null) {
            throw new BadRequestAlertException("A new admins cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Admins result = adminsRepository.save(admins);
        return ResponseEntity
            .created(new URI("/api/admins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /admins/:id} : Updates an existing admins.
     *
     * @param id the id of the admins to save.
     * @param admins the admins to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated admins,
     * or with status {@code 400 (Bad Request)} if the admins is not valid,
     * or with status {@code 500 (Internal Server Error)} if the admins couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Admins> updateAdmins(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Admins admins
    ) throws URISyntaxException {
        log.debug("REST request to update Admins : {}, {}", id, admins);
        if (admins.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, admins.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adminsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Admins result = adminsRepository.save(admins);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, admins.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /admins/:id} : Partial updates given fields of an existing admins, field will ignore if it is null
     *
     * @param id the id of the admins to save.
     * @param admins the admins to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated admins,
     * or with status {@code 400 (Bad Request)} if the admins is not valid,
     * or with status {@code 404 (Not Found)} if the admins is not found,
     * or with status {@code 500 (Internal Server Error)} if the admins couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Admins> partialUpdateAdmins(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Admins admins
    ) throws URISyntaxException {
        log.debug("REST request to partial update Admins partially : {}, {}", id, admins);
        if (admins.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, admins.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!adminsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Admins> result = adminsRepository
            .findById(admins.getId())
            .map(existingAdmins -> {
                if (admins.getName() != null) {
                    existingAdmins.setName(admins.getName());
                }
                if (admins.getEmail() != null) {
                    existingAdmins.setEmail(admins.getEmail());
                }
                if (admins.getPhone() != null) {
                    existingAdmins.setPhone(admins.getPhone());
                }
                if (admins.getRole() != null) {
                    existingAdmins.setRole(admins.getRole());
                }
                if (admins.getPhoto() != null) {
                    existingAdmins.setPhoto(admins.getPhoto());
                }
                if (admins.getPassword() != null) {
                    existingAdmins.setPassword(admins.getPassword());
                }
                if (admins.getStatus() != null) {
                    existingAdmins.setStatus(admins.getStatus());
                }
                if (admins.getRememberToken() != null) {
                    existingAdmins.setRememberToken(admins.getRememberToken());
                }
                if (admins.getCreatedat() != null) {
                    existingAdmins.setCreatedat(admins.getCreatedat());
                }
                if (admins.getUpdatedat() != null) {
                    existingAdmins.setUpdatedat(admins.getUpdatedat());
                }
                if (admins.getShopName() != null) {
                    existingAdmins.setShopName(admins.getShopName());
                }

                return existingAdmins;
            })
            .map(adminsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, admins.getId().toString())
        );
    }

    /**
     * {@code GET  /admins} : get all the admins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of admins in body.
     */
    @GetMapping("")
    public List<Admins> getAllAdmins() {
        log.debug("REST request to get all Admins");
        return adminsRepository.findAll();
    }

    /**
     * {@code GET  /admins/:id} : get the "id" admins.
     *
     * @param id the id of the admins to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the admins, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admins> getAdmins(@PathVariable Long id) {
        log.debug("REST request to get Admins : {}", id);
        Optional<Admins> admins = adminsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(admins);
    }

    /**
     * {@code DELETE  /admins/:id} : delete the "id" admins.
     *
     * @param id the id of the admins to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmins(@PathVariable Long id) {
        log.debug("REST request to delete Admins : {}", id);
        adminsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
