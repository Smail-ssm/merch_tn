package com.xdev.merch.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Products.
 */
@Entity
@Table(name = "products")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Products implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sku")
    private String sku;

    @Column(name = "product_type")
    private String productType;

    @Column(name = "affiliate_link")
    private String affiliateLink;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "subcategory_id")
    private Long subcategoryId;

    @Column(name = "childcategory_id")
    private Long childcategoryId;

    @Column(name = "attributes")
    private String attributes;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug")
    private String slug;

    @NotNull
    @Column(name = "photo", nullable = false)
    private String photo;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "file")
    private String file;

    @Column(name = "size")
    private String size;

    @Column(name = "size_qty")
    private String sizeQty;

    @Column(name = "size_price")
    private String sizePrice;

    @Column(name = "color")
    private String color;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "previous_price")
    private Double previousPrice;

    @Column(name = "details")
    private String details;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "policy")
    private String policy;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @NotNull
    @Column(name = "views", nullable = false)
    private Integer views;

    @Column(name = "tags")
    private String tags;

    @Column(name = "features")
    private String features;

    @Column(name = "colors")
    private String colors;

    @NotNull
    @Column(name = "product_condition", nullable = false)
    private Integer productCondition;

    @Column(name = "ship")
    private String ship;

    @NotNull
    @Column(name = "is_meta", nullable = false)
    private Boolean isMeta;

    @Column(name = "meta_tag")
    private String metaTag;

    @Column(name = "meta_description")
    private String metaDescription;

    @Column(name = "youtube")
    private String youtube;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "license")
    private String license;

    @Column(name = "license_qty")
    private String licenseQty;

    @Column(name = "link")
    private String link;

    @Column(name = "platform")
    private String platform;

    @Column(name = "region")
    private String region;

    @Column(name = "licence_type")
    private String licenceType;

    @Column(name = "measure")
    private String measure;

    @NotNull
    @Column(name = "featured", nullable = false)
    private Boolean featured;

    @NotNull
    @Column(name = "best", nullable = false)
    private Boolean best;

    @NotNull
    @Column(name = "top", nullable = false)
    private Boolean top;

    @NotNull
    @Column(name = "hot", nullable = false)
    private Boolean hot;

    @NotNull
    @Column(name = "latest", nullable = false)
    private Boolean latest;

    @NotNull
    @Column(name = "big", nullable = false)
    private Boolean big;

    @NotNull
    @Column(name = "trending", nullable = false)
    private Boolean trending;

    @NotNull
    @Column(name = "sale", nullable = false)
    private Boolean sale;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @NotNull
    @Column(name = "is_discount", nullable = false)
    private Boolean isDiscount;

    @Column(name = "discount_date")
    private String discountDate;

    @Column(name = "whole_sell_qty")
    private String wholeSellQty;

    @Column(name = "whole_sell_discount")
    private String wholeSellDiscount;

    @NotNull
    @Column(name = "is_catalog", nullable = false)
    private Boolean isCatalog;

    @Column(name = "catalog_id")
    private Long catalogId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Products id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSku() {
        return this.sku;
    }

    public Products sku(String sku) {
        this.setSku(sku);
        return this;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductType() {
        return this.productType;
    }

    public Products productType(String productType) {
        this.setProductType(productType);
        return this;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getAffiliateLink() {
        return this.affiliateLink;
    }

    public Products affiliateLink(String affiliateLink) {
        this.setAffiliateLink(affiliateLink);
        return this;
    }

    public void setAffiliateLink(String affiliateLink) {
        this.affiliateLink = affiliateLink;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Products userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCategoryId() {
        return this.categoryId;
    }

    public Products categoryId(Long categoryId) {
        this.setCategoryId(categoryId);
        return this;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getSubcategoryId() {
        return this.subcategoryId;
    }

    public Products subcategoryId(Long subcategoryId) {
        this.setSubcategoryId(subcategoryId);
        return this;
    }

    public void setSubcategoryId(Long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public Long getChildcategoryId() {
        return this.childcategoryId;
    }

    public Products childcategoryId(Long childcategoryId) {
        this.setChildcategoryId(childcategoryId);
        return this;
    }

    public void setChildcategoryId(Long childcategoryId) {
        this.childcategoryId = childcategoryId;
    }

    public String getAttributes() {
        return this.attributes;
    }

    public Products attributes(String attributes) {
        this.setAttributes(attributes);
        return this;
    }

    public void setAttributes(String attributes) {
        this.attributes = attributes;
    }

    public String getName() {
        return this.name;
    }

    public Products name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return this.slug;
    }

    public Products slug(String slug) {
        this.setSlug(slug);
        return this;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Products photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getThumbnail() {
        return this.thumbnail;
    }

    public Products thumbnail(String thumbnail) {
        this.setThumbnail(thumbnail);
        return this;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getFile() {
        return this.file;
    }

    public Products file(String file) {
        this.setFile(file);
        return this;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getSize() {
        return this.size;
    }

    public Products size(String size) {
        this.setSize(size);
        return this;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getSizeQty() {
        return this.sizeQty;
    }

    public Products sizeQty(String sizeQty) {
        this.setSizeQty(sizeQty);
        return this;
    }

    public void setSizeQty(String sizeQty) {
        this.sizeQty = sizeQty;
    }

    public String getSizePrice() {
        return this.sizePrice;
    }

    public Products sizePrice(String sizePrice) {
        this.setSizePrice(sizePrice);
        return this;
    }

    public void setSizePrice(String sizePrice) {
        this.sizePrice = sizePrice;
    }

    public String getColor() {
        return this.color;
    }

    public Products color(String color) {
        this.setColor(color);
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPrice() {
        return this.price;
    }

    public Products price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPreviousPrice() {
        return this.previousPrice;
    }

    public Products previousPrice(Double previousPrice) {
        this.setPreviousPrice(previousPrice);
        return this;
    }

    public void setPreviousPrice(Double previousPrice) {
        this.previousPrice = previousPrice;
    }

    public String getDetails() {
        return this.details;
    }

    public Products details(String details) {
        this.setDetails(details);
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getStock() {
        return this.stock;
    }

    public Products stock(Integer stock) {
        this.setStock(stock);
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getPolicy() {
        return this.policy;
    }

    public Products policy(String policy) {
        this.setPolicy(policy);
        return this;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public Integer getStatus() {
        return this.status;
    }

    public Products status(Integer status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getViews() {
        return this.views;
    }

    public Products views(Integer views) {
        this.setViews(views);
        return this;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public String getTags() {
        return this.tags;
    }

    public Products tags(String tags) {
        this.setTags(tags);
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getFeatures() {
        return this.features;
    }

    public Products features(String features) {
        this.setFeatures(features);
        return this;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getColors() {
        return this.colors;
    }

    public Products colors(String colors) {
        this.setColors(colors);
        return this;
    }

    public void setColors(String colors) {
        this.colors = colors;
    }

    public Integer getProductCondition() {
        return this.productCondition;
    }

    public Products productCondition(Integer productCondition) {
        this.setProductCondition(productCondition);
        return this;
    }

    public void setProductCondition(Integer productCondition) {
        this.productCondition = productCondition;
    }

    public String getShip() {
        return this.ship;
    }

    public Products ship(String ship) {
        this.setShip(ship);
        return this;
    }

    public void setShip(String ship) {
        this.ship = ship;
    }

    public Boolean getIsMeta() {
        return this.isMeta;
    }

    public Products isMeta(Boolean isMeta) {
        this.setIsMeta(isMeta);
        return this;
    }

    public void setIsMeta(Boolean isMeta) {
        this.isMeta = isMeta;
    }

    public String getMetaTag() {
        return this.metaTag;
    }

    public Products metaTag(String metaTag) {
        this.setMetaTag(metaTag);
        return this;
    }

    public void setMetaTag(String metaTag) {
        this.metaTag = metaTag;
    }

    public String getMetaDescription() {
        return this.metaDescription;
    }

    public Products metaDescription(String metaDescription) {
        this.setMetaDescription(metaDescription);
        return this;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public String getYoutube() {
        return this.youtube;
    }

    public Products youtube(String youtube) {
        this.setYoutube(youtube);
        return this;
    }

    public void setYoutube(String youtube) {
        this.youtube = youtube;
    }

    public String getType() {
        return this.type;
    }

    public Products type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLicense() {
        return this.license;
    }

    public Products license(String license) {
        this.setLicense(license);
        return this;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getLicenseQty() {
        return this.licenseQty;
    }

    public Products licenseQty(String licenseQty) {
        this.setLicenseQty(licenseQty);
        return this;
    }

    public void setLicenseQty(String licenseQty) {
        this.licenseQty = licenseQty;
    }

    public String getLink() {
        return this.link;
    }

    public Products link(String link) {
        this.setLink(link);
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPlatform() {
        return this.platform;
    }

    public Products platform(String platform) {
        this.setPlatform(platform);
        return this;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getRegion() {
        return this.region;
    }

    public Products region(String region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLicenceType() {
        return this.licenceType;
    }

    public Products licenceType(String licenceType) {
        this.setLicenceType(licenceType);
        return this;
    }

    public void setLicenceType(String licenceType) {
        this.licenceType = licenceType;
    }

    public String getMeasure() {
        return this.measure;
    }

    public Products measure(String measure) {
        this.setMeasure(measure);
        return this;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }

    public Boolean getFeatured() {
        return this.featured;
    }

    public Products featured(Boolean featured) {
        this.setFeatured(featured);
        return this;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Boolean getBest() {
        return this.best;
    }

    public Products best(Boolean best) {
        this.setBest(best);
        return this;
    }

    public void setBest(Boolean best) {
        this.best = best;
    }

    public Boolean getTop() {
        return this.top;
    }

    public Products top(Boolean top) {
        this.setTop(top);
        return this;
    }

    public void setTop(Boolean top) {
        this.top = top;
    }

    public Boolean getHot() {
        return this.hot;
    }

    public Products hot(Boolean hot) {
        this.setHot(hot);
        return this;
    }

    public void setHot(Boolean hot) {
        this.hot = hot;
    }

    public Boolean getLatest() {
        return this.latest;
    }

    public Products latest(Boolean latest) {
        this.setLatest(latest);
        return this;
    }

    public void setLatest(Boolean latest) {
        this.latest = latest;
    }

    public Boolean getBig() {
        return this.big;
    }

    public Products big(Boolean big) {
        this.setBig(big);
        return this;
    }

    public void setBig(Boolean big) {
        this.big = big;
    }

    public Boolean getTrending() {
        return this.trending;
    }

    public Products trending(Boolean trending) {
        this.setTrending(trending);
        return this;
    }

    public void setTrending(Boolean trending) {
        this.trending = trending;
    }

    public Boolean getSale() {
        return this.sale;
    }

    public Products sale(Boolean sale) {
        this.setSale(sale);
        return this;
    }

    public void setSale(Boolean sale) {
        this.sale = sale;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Products createdAt(Instant createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatedAt;
    }

    public Products updatedAt(Instant updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsDiscount() {
        return this.isDiscount;
    }

    public Products isDiscount(Boolean isDiscount) {
        this.setIsDiscount(isDiscount);
        return this;
    }

    public void setIsDiscount(Boolean isDiscount) {
        this.isDiscount = isDiscount;
    }

    public String getDiscountDate() {
        return this.discountDate;
    }

    public Products discountDate(String discountDate) {
        this.setDiscountDate(discountDate);
        return this;
    }

    public void setDiscountDate(String discountDate) {
        this.discountDate = discountDate;
    }

    public String getWholeSellQty() {
        return this.wholeSellQty;
    }

    public Products wholeSellQty(String wholeSellQty) {
        this.setWholeSellQty(wholeSellQty);
        return this;
    }

    public void setWholeSellQty(String wholeSellQty) {
        this.wholeSellQty = wholeSellQty;
    }

    public String getWholeSellDiscount() {
        return this.wholeSellDiscount;
    }

    public Products wholeSellDiscount(String wholeSellDiscount) {
        this.setWholeSellDiscount(wholeSellDiscount);
        return this;
    }

    public void setWholeSellDiscount(String wholeSellDiscount) {
        this.wholeSellDiscount = wholeSellDiscount;
    }

    public Boolean getIsCatalog() {
        return this.isCatalog;
    }

    public Products isCatalog(Boolean isCatalog) {
        this.setIsCatalog(isCatalog);
        return this;
    }

    public void setIsCatalog(Boolean isCatalog) {
        this.isCatalog = isCatalog;
    }

    public Long getCatalogId() {
        return this.catalogId;
    }

    public Products catalogId(Long catalogId) {
        this.setCatalogId(catalogId);
        return this;
    }

    public void setCatalogId(Long catalogId) {
        this.catalogId = catalogId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Products)) {
            return false;
        }
        return getId() != null && getId().equals(((Products) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Products{" +
            "id=" + getId() +
            ", sku='" + getSku() + "'" +
            ", productType='" + getProductType() + "'" +
            ", affiliateLink='" + getAffiliateLink() + "'" +
            ", userId=" + getUserId() +
            ", categoryId=" + getCategoryId() +
            ", subcategoryId=" + getSubcategoryId() +
            ", childcategoryId=" + getChildcategoryId() +
            ", attributes='" + getAttributes() + "'" +
            ", name='" + getName() + "'" +
            ", slug='" + getSlug() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", thumbnail='" + getThumbnail() + "'" +
            ", file='" + getFile() + "'" +
            ", size='" + getSize() + "'" +
            ", sizeQty='" + getSizeQty() + "'" +
            ", sizePrice='" + getSizePrice() + "'" +
            ", color='" + getColor() + "'" +
            ", price=" + getPrice() +
            ", previousPrice=" + getPreviousPrice() +
            ", details='" + getDetails() + "'" +
            ", stock=" + getStock() +
            ", policy='" + getPolicy() + "'" +
            ", status=" + getStatus() +
            ", views=" + getViews() +
            ", tags='" + getTags() + "'" +
            ", features='" + getFeatures() + "'" +
            ", colors='" + getColors() + "'" +
            ", productCondition=" + getProductCondition() +
            ", ship='" + getShip() + "'" +
            ", isMeta='" + getIsMeta() + "'" +
            ", metaTag='" + getMetaTag() + "'" +
            ", metaDescription='" + getMetaDescription() + "'" +
            ", youtube='" + getYoutube() + "'" +
            ", type='" + getType() + "'" +
            ", license='" + getLicense() + "'" +
            ", licenseQty='" + getLicenseQty() + "'" +
            ", link='" + getLink() + "'" +
            ", platform='" + getPlatform() + "'" +
            ", region='" + getRegion() + "'" +
            ", licenceType='" + getLicenceType() + "'" +
            ", measure='" + getMeasure() + "'" +
            ", featured='" + getFeatured() + "'" +
            ", best='" + getBest() + "'" +
            ", top='" + getTop() + "'" +
            ", hot='" + getHot() + "'" +
            ", latest='" + getLatest() + "'" +
            ", big='" + getBig() + "'" +
            ", trending='" + getTrending() + "'" +
            ", sale='" + getSale() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", isDiscount='" + getIsDiscount() + "'" +
            ", discountDate='" + getDiscountDate() + "'" +
            ", wholeSellQty='" + getWholeSellQty() + "'" +
            ", wholeSellDiscount='" + getWholeSellDiscount() + "'" +
            ", isCatalog='" + getIsCatalog() + "'" +
            ", catalogId=" + getCatalogId() +
            "}";
    }
}
