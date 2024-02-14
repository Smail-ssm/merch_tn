package com.xdev.merch.controllers;

import com.xdev.merch.controllers.errors.BadRequestAlertException;
import com.xdev.merch.entities.Products;
import com.xdev.merch.repository.ProductsRepository;
import com.xdev.merch.service.GoogleDriveService;
import com.xdev.merch.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.xdev.merch.entities.Products}.
 */
@RestController
@RequestMapping(value = "/api/products")
@Transactional
public class ProductsResource {

    private static final String ENTITY_NAME = "products";
    private final Logger log = LoggerFactory.getLogger(ProductsResource.class);
    private final ProductsRepository productsRepository;

    @Autowired
    ProductService productService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public ProductsResource(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    /**
     * {@code POST  /products} : Create a new products.
     *
     * @param products the products to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new products, or with status {@code 400 (Bad Request)} if the products has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Products> createProducts(@Valid @RequestBody Products products) throws URISyntaxException {
        log.debug("REST request to save Products : {}", products);
        if (products.getId() != null) {
            throw new BadRequestAlertException("A new products cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Products result = productsRepository.save(products);
        return ResponseEntity
            .created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping(value = "/upload/{fileName}")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable String fileName) {
        // Check if the file is empty
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        try {
            byte[] bytes = file.getBytes();
            String link = uploadToGoogleDrive(bytes, file.getOriginalFilename());
            return ResponseEntity.ok(link);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file");
        }
    }

    private String uploadToGoogleDrive(byte[] fileBytes, String fileName) {
        String fileLink = "";
        try {
            ResourceLoader resourceLoader = new DefaultResourceLoader();
            GoogleDriveService driveService = new GoogleDriveService(resourceLoader);
            // Upload file bytes to Google Drive
            String fileId = driveService.uploadFile(fileBytes, fileName);

            if (fileId != null) {
                // Generate a shareable link
                fileLink = driveService.generateShareableLink(fileId);
            } else {}
        } catch (IOException e) {}
        return fileLink;
    }

    /**
     * {@code PUT  /products/:id} : Updates an existing products.
     *
     * @param id       the id of the products to save.
     * @param products the products to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated products,
     * or with status {@code 400 (Bad Request)} if the products is not valid,
     * or with status {@code 500 (Internal Server Error)} if the products couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProducts(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Products products
    ) throws URISyntaxException {
        log.debug("REST request to update Products : {}, {}", id, products);
        if (products.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, products.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Products result = productsRepository.save(products);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, products.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /products/:id} : Partial updates given fields of an existing products, field will ignore if it is null
     *
     * @param id       the id of the products to save.
     * @param products the products to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated products,
     * or with status {@code 400 (Bad Request)} if the products is not valid,
     * or with status {@code 404 (Not Found)} if the products is not found,
     * or with status {@code 500 (Internal Server Error)} if the products couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Products> partialUpdateProducts(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Products products
    ) throws URISyntaxException {
        log.debug("REST request to partial update Products partially : {}, {}", id, products);
        if (products.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, products.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Products> result = productsRepository
            .findById(products.getId())
            .map(existingProducts -> {
                if (products.getSku() != null) {
                    existingProducts.setSku(products.getSku());
                }
                if (products.getProductType() != null) {
                    existingProducts.setProductType(products.getProductType());
                }
                if (products.getAffiliateLink() != null) {
                    existingProducts.setAffiliateLink(products.getAffiliateLink());
                }
                if (products.getUserId() != null) {
                    existingProducts.setUserId(products.getUserId());
                }
                if (products.getCategoryId() != null) {
                    existingProducts.setCategoryId(products.getCategoryId());
                }
                if (products.getSubcategoryId() != null) {
                    existingProducts.setSubcategoryId(products.getSubcategoryId());
                }
                if (products.getChildcategoryId() != null) {
                    existingProducts.setChildcategoryId(products.getChildcategoryId());
                }
                if (products.getAttributes() != null) {
                    existingProducts.setAttributes(products.getAttributes());
                }
                if (products.getName() != null) {
                    existingProducts.setName(products.getName());
                }
                if (products.getSlug() != null) {
                    existingProducts.setSlug(products.getSlug());
                }
                if (products.getPhoto() != null) {
                    existingProducts.setPhoto(products.getPhoto());
                }
                if (products.getThumbnail() != null) {
                    existingProducts.setThumbnail(products.getThumbnail());
                }
                if (products.getFile() != null) {
                    existingProducts.setFile(products.getFile());
                }
                if (products.getSize() != null) {
                    existingProducts.setSize(products.getSize());
                }
                if (products.getSizeQty() != null) {
                    existingProducts.setSizeQty(products.getSizeQty());
                }
                if (products.getSizePrice() != null) {
                    existingProducts.setSizePrice(products.getSizePrice());
                }
                if (products.getColor() != null) {
                    existingProducts.setColor(products.getColor());
                }
                if (products.getPrice() != null) {
                    existingProducts.setPrice(products.getPrice());
                }
                if (products.getPreviousPrice() != null) {
                    existingProducts.setPreviousPrice(products.getPreviousPrice());
                }
                if (products.getDetails() != null) {
                    existingProducts.setDetails(products.getDetails());
                }
                if (products.getStock() != null) {
                    existingProducts.setStock(products.getStock());
                }
                if (products.getPolicy() != null) {
                    existingProducts.setPolicy(products.getPolicy());
                }
                if (products.getStatus() != null) {
                    existingProducts.setStatus(products.getStatus());
                }
                if (products.getViews() != null) {
                    existingProducts.setViews(products.getViews());
                }
                if (products.getTags() != null) {
                    existingProducts.setTags(products.getTags());
                }
                if (products.getFeatures() != null) {
                    existingProducts.setFeatures(products.getFeatures());
                }
                if (products.getColors() != null) {
                    existingProducts.setColors(products.getColors());
                }
                if (products.getProductCondition() != null) {
                    existingProducts.setProductCondition(products.getProductCondition());
                }
                if (products.getShip() != null) {
                    existingProducts.setShip(products.getShip());
                }
                if (products.getIsMeta() != null) {
                    existingProducts.setIsMeta(products.getIsMeta());
                }
                if (products.getMetaTag() != null) {
                    existingProducts.setMetaTag(products.getMetaTag());
                }
                if (products.getMetaDescription() != null) {
                    existingProducts.setMetaDescription(products.getMetaDescription());
                }
                if (products.getYoutube() != null) {
                    existingProducts.setYoutube(products.getYoutube());
                }
                if (products.getType() != null) {
                    existingProducts.setType(products.getType());
                }
                if (products.getLicense() != null) {
                    existingProducts.setLicense(products.getLicense());
                }
                if (products.getLicenseQty() != null) {
                    existingProducts.setLicenseQty(products.getLicenseQty());
                }
                if (products.getLink() != null) {
                    existingProducts.setLink(products.getLink());
                }
                if (products.getPlatform() != null) {
                    existingProducts.setPlatform(products.getPlatform());
                }
                if (products.getRegion() != null) {
                    existingProducts.setRegion(products.getRegion());
                }
                if (products.getLicenceType() != null) {
                    existingProducts.setLicenceType(products.getLicenceType());
                }
                if (products.getMeasure() != null) {
                    existingProducts.setMeasure(products.getMeasure());
                }
                if (products.getFeatured() != null) {
                    existingProducts.setFeatured(products.getFeatured());
                }
                if (products.getBest() != null) {
                    existingProducts.setBest(products.getBest());
                }
                if (products.getTop() != null) {
                    existingProducts.setTop(products.getTop());
                }
                if (products.getHot() != null) {
                    existingProducts.setHot(products.getHot());
                }
                if (products.getLatest() != null) {
                    existingProducts.setLatest(products.getLatest());
                }
                if (products.getBig() != null) {
                    existingProducts.setBig(products.getBig());
                }
                if (products.getTrending() != null) {
                    existingProducts.setTrending(products.getTrending());
                }
                if (products.getSale() != null) {
                    existingProducts.setSale(products.getSale());
                }
                if (products.getCreatedAt() != null) {
                    existingProducts.setCreatedAt(products.getCreatedAt());
                }
                if (products.getUpdatedAt() != null) {
                    existingProducts.setUpdatedAt(products.getUpdatedAt());
                }
                if (products.getIsDiscount() != null) {
                    existingProducts.setIsDiscount(products.getIsDiscount());
                }
                if (products.getDiscountDate() != null) {
                    existingProducts.setDiscountDate(products.getDiscountDate());
                }
                if (products.getWholeSellQty() != null) {
                    existingProducts.setWholeSellQty(products.getWholeSellQty());
                }
                if (products.getWholeSellDiscount() != null) {
                    existingProducts.setWholeSellDiscount(products.getWholeSellDiscount());
                }
                if (products.getIsCatalog() != null) {
                    existingProducts.setIsCatalog(products.getIsCatalog());
                }
                if (products.getCatalogId() != null) {
                    existingProducts.setCatalogId(products.getCatalogId());
                }

                return existingProducts;
            })
            .map(productsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, products.getId().toString())
        );
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("")
    public List<Products> getAllProducts() {
        log.debug("REST request to get all Products");
        return productService.findAll();
    }

    /**
     * {@code GET  /products/:id} : get the "id" products.
     *
     * @param id the id of the products to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the products, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Products> getProducts(@PathVariable Long id) {
        log.debug("REST request to get Products : {}", id);
        Optional<Products> products = productsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(products);
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" products.
     *
     * @param id the id of the products to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducts(@PathVariable Long id) {
        log.debug("REST request to delete Products : {}", id);
        productsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/user/{userId}")
    public List<Products> getAllProductsByUserId(@PathVariable("userId") Long userId) {
        return productService.getAllProductsByUserId(userId);
    }
}
