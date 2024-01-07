package com.xdev.merch.web.rest;

import com.xdev.merch.domain.Users;
import com.xdev.merch.repository.UsersRepository;
import com.xdev.merch.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.annotations.ParameterObject;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.xdev.merch.domain.Users}.
 */
@RestController
@RequestMapping("/api/users")
@Transactional
public class UsersResource {

    private static final String ENTITY_NAME = "users";
    private final Logger log = LoggerFactory.getLogger(UsersResource.class);
    private final UsersRepository usersRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public UsersResource(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * {@code POST  /users} : Create a new users.
     *
     * @param users the users to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new users, or with status {@code 400 (Bad Request)} if the users has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Users> createUsers(@Valid @RequestBody Users users) throws URISyntaxException {
        log.debug("REST request to save Users : {}", users);
        if (users.getId() != null) {
            throw new BadRequestAlertException("A new users cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Users result = usersRepository.save(users);
        return ResponseEntity
            .created(new URI("/api/users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /users/:id} : Updates an existing users.
     *
     * @param id    the id of the users to save.
     * @param users the users to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated users,
     * or with status {@code 400 (Bad Request)} if the users is not valid,
     * or with status {@code 500 (Internal Server Error)} if the users couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUsers(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Users users)
        throws URISyntaxException {
        log.debug("REST request to update Users : {}, {}", id, users);
        if (users.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, users.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Users result = usersRepository.save(users);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, users.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /users/:id} : Partial updates given fields of an existing users, field will ignore if it is null
     *
     * @param id    the id of the users to save.
     * @param users the users to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated users,
     * or with status {@code 400 (Bad Request)} if the users is not valid,
     * or with status {@code 404 (Not Found)} if the users is not found,
     * or with status {@code 500 (Internal Server Error)} if the users couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Users> partialUpdateUsers(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Users users
    ) throws URISyntaxException {
        log.debug("REST request to partial update Users partially : {}, {}", id, users);
        if (users.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, users.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usersRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Users> result = usersRepository
            .findById(users.getId())
            .map(existingUsers -> {
                if (users.getName() != null) {
                    existingUsers.setName(users.getName());
                }
                if (users.getPhoto() != null) {
                    existingUsers.setPhoto(users.getPhoto());
                }
                if (users.getZip() != null) {
                    existingUsers.setZip(users.getZip());
                }
                if (users.getCity() != null) {
                    existingUsers.setCity(users.getCity());
                }
                if (users.getCountry() != null) {
                    existingUsers.setCountry(users.getCountry());
                }
                if (users.getAddress() != null) {
                    existingUsers.setAddress(users.getAddress());
                }
                if (users.getPhone() != null) {
                    existingUsers.setPhone(users.getPhone());
                }
                if (users.getFax() != null) {
                    existingUsers.setFax(users.getFax());
                }
                if (users.getEmail() != null) {
                    existingUsers.setEmail(users.getEmail());
                }
                if (users.getPassword() != null) {
                    existingUsers.setPassword(users.getPassword());
                }
                if (users.getRememberToken() != null) {
                    existingUsers.setRememberToken(users.getRememberToken());
                }
                if (users.getCreatedAt() != null) {
                    existingUsers.setCreatedAt(users.getCreatedAt());
                }
                if (users.getUpdatedAt() != null) {
                    existingUsers.setUpdatedAt(users.getUpdatedAt());
                }
                if (users.getIsProvider() != null) {
                    existingUsers.setIsProvider(users.getIsProvider());
                }
                if (users.getStatus() != null) {
                    existingUsers.setStatus(users.getStatus());
                }
                if (users.getVerificationLink() != null) {
                    existingUsers.setVerificationLink(users.getVerificationLink());
                }
                if (users.getEmailVerified() != null) {
                    existingUsers.setEmailVerified(users.getEmailVerified());
                }
                if (users.getAffilateCode() != null) {
                    existingUsers.setAffilateCode(users.getAffilateCode());
                }
                if (users.getAffilateIncome() != null) {
                    existingUsers.setAffilateIncome(users.getAffilateIncome());
                }
                if (users.getShopName() != null) {
                    existingUsers.setShopName(users.getShopName());
                }
                if (users.getOwnerName() != null) {
                    existingUsers.setOwnerName(users.getOwnerName());
                }
                if (users.getShopNumber() != null) {
                    existingUsers.setShopNumber(users.getShopNumber());
                }
                if (users.getShopAddress() != null) {
                    existingUsers.setShopAddress(users.getShopAddress());
                }
                if (users.getRegNumber() != null) {
                    existingUsers.setRegNumber(users.getRegNumber());
                }
                if (users.getShopMessage() != null) {
                    existingUsers.setShopMessage(users.getShopMessage());
                }
                if (users.getShopDetails() != null) {
                    existingUsers.setShopDetails(users.getShopDetails());
                }
                if (users.getShopImage() != null) {
                    existingUsers.setShopImage(users.getShopImage());
                }
                if (users.getfUrl() != null) {
                    existingUsers.setfUrl(users.getfUrl());
                }
                if (users.getgUrl() != null) {
                    existingUsers.setgUrl(users.getgUrl());
                }
                if (users.gettUrl() != null) {
                    existingUsers.settUrl(users.gettUrl());
                }
                if (users.getlUrl() != null) {
                    existingUsers.setlUrl(users.getlUrl());
                }
                if (users.getIsVendor() != null) {
                    existingUsers.setIsVendor(users.getIsVendor());
                }
                if (users.getfCheck() != null) {
                    existingUsers.setfCheck(users.getfCheck());
                }
                if (users.getgCheck() != null) {
                    existingUsers.setgCheck(users.getgCheck());
                }
                if (users.gettCheck() != null) {
                    existingUsers.settCheck(users.gettCheck());
                }
                if (users.getlCheck() != null) {
                    existingUsers.setlCheck(users.getlCheck());
                }
                if (users.getMailSent() != null) {
                    existingUsers.setMailSent(users.getMailSent());
                }
                if (users.getShippingCost() != null) {
                    existingUsers.setShippingCost(users.getShippingCost());
                }
                if (users.getCurrentBalance() != null) {
                    existingUsers.setCurrentBalance(users.getCurrentBalance());
                }
                if (users.getDate() != null) {
                    existingUsers.setDate(users.getDate());
                }
                if (users.getBan() != null) {
                    existingUsers.setBan(users.getBan());
                }
                if (users.getIsPrinter() != null) {
                    existingUsers.setIsPrinter(users.getIsPrinter());
                }

                return existingUsers;
            })
            .map(usersRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, users.getId().toString())
        );
    }

    /**
     * {@code GET  /users} : get all the users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of users in body.
     */
    //    @GetMapping("/all")
    //    public ResponseEntity<List<Users>> getAllUsers(@ParameterObject Pageable pageable) {
    //        log.debug("REST request to get all User names");
    //
    //
    //        final Page<Users> page = usersRepository.getAllUsers(pageable);
    //        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
    //        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    //    }

    /**
     * {@code GET  /users/:id} : get the "id" users.
     *
     * @param id the id of the users to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the users, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUsers(@PathVariable Long id) {
        log.debug("REST request to get Users : {}", id);
        Optional<Users> users = usersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(users);
    }

    /**
     * {@code DELETE  /users/:id} : delete the "id" users.
     *
     * @param id the id of the users to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable Long id) {
        log.debug("REST request to delete Users : {}", id);
        usersRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @PostMapping("/mercher/login")
    public ResponseEntity<Users> loginUser(@RequestBody Map<String, String> credentials) {
        log.debug("REST request to login Users : {}", credentials);
        final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<Users> user = usersRepository.findUsersByEmail(username);

        if (user.isPresent() && bCryptPasswordEncoder.matches(password, user.get().getPassword())) {
            // Passwords match, user is authenticated
            return ResponseEntity.ok(user.get());
        } else {
            // Passwords don't match or user not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
