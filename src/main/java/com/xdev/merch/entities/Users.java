package com.xdev.merch.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Users.
 */
@Entity
@Table(name = "users")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "photo")
    private String photo;

    @Column(name = "zip")
    private String zip;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "fax")
    private String fax;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "remember_token")
    private String rememberToken;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @Column(name = "is_provider")
    private Boolean isProvider;

    @NotNull
    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "verification_link")
    private String verificationLink;

    @Column(name = "email_verified")
    private String emailVerified;

    @Column(name = "affilate_code")
    private String affilateCode;

    @NotNull
    @Column(name = "affilate_income", nullable = false)
    private Double affilateIncome;

    @Column(name = "shop_name")
    private String shopName;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "shop_number")
    private String shopNumber;

    @Column(name = "shop_address")
    private String shopAddress;

    @Column(name = "reg_number")
    private String regNumber;

    @Column(name = "shop_message")
    private String shopMessage;

    @Column(name = "shop_details")
    private String shopDetails;

    @Column(name = "shop_image")
    private String shopImage;

    @Column(name = "f_url")
    private String fUrl;

    @Column(name = "g_url")
    private String gUrl;

    @Column(name = "t_url")
    private String tUrl;

    @Column(name = "l_url")
    private String lUrl;

    @NotNull
    @Column(name = "is_vendor", nullable = false)
    private Boolean isVendor;

    @NotNull
    @Column(name = "f_check", nullable = false)
    private Boolean fCheck;

    @NotNull
    @Column(name = "g_check", nullable = false)
    private Boolean gCheck;

    @NotNull
    @Column(name = "t_check", nullable = false)
    private Boolean tCheck;

    @NotNull
    @Column(name = "l_check", nullable = false)
    private Boolean lCheck;

    @NotNull
    @Column(name = "mail_sent", nullable = false)
    private Boolean mailSent;

    @NotNull
    @Column(name = "shipping_cost", nullable = false)
    private Double shippingCost;

    @NotNull
    @Column(name = "current_balance", nullable = false)
    private Double currentBalance;

    @Column(name = "date")
    private LocalDate date;

    @NotNull
    @Column(name = "ban", nullable = false)
    private Boolean ban;

    @Column(name = "is_printer")
    private Boolean isPrinter;

    public Users() {}

    public Users(
        Long id,
        String name,
        String photo,
        String zip,
        String city,
        String country,
        String address,
        String phone,
        String fax,
        String email,
        String password,
        String rememberToken,
        LocalDate createdAt,
        LocalDate updatedAt,
        Boolean isProvider,
        Boolean status,
        String verificationLink,
        String emailVerified,
        String affilateCode,
        Double affilateIncome,
        String shopName,
        String ownerName,
        String shopNumber,
        String shopAddress,
        String regNumber,
        String shopMessage,
        String shopDetails,
        String shopImage,
        String fUrl,
        String gUrl,
        String tUrl,
        String lUrl,
        Boolean isVendor,
        Boolean fCheck,
        Boolean gCheck,
        Boolean tCheck,
        Boolean lCheck,
        Boolean mailSent,
        Double shippingCost,
        Double currentBalance,
        LocalDate date,
        Boolean ban,
        Boolean isPrinter
    ) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.zip = zip;
        this.city = city;
        this.country = country;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.email = email;
        this.password = password;
        this.rememberToken = rememberToken;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isProvider = isProvider;
        this.status = status;
        this.verificationLink = verificationLink;
        this.emailVerified = emailVerified;
        this.affilateCode = affilateCode;
        this.affilateIncome = affilateIncome;
        this.shopName = shopName;
        this.ownerName = ownerName;
        this.shopNumber = shopNumber;
        this.shopAddress = shopAddress;
        this.regNumber = regNumber;
        this.shopMessage = shopMessage;
        this.shopDetails = shopDetails;
        this.shopImage = shopImage;
        this.fUrl = fUrl;
        this.gUrl = gUrl;
        this.tUrl = tUrl;
        this.lUrl = lUrl;
        this.isVendor = isVendor;
        this.fCheck = fCheck;
        this.gCheck = gCheck;
        this.tCheck = tCheck;
        this.lCheck = lCheck;
        this.mailSent = mailSent;
        this.shippingCost = shippingCost;
        this.currentBalance = currentBalance;
        this.date = date;
        this.ban = ban;
        this.isPrinter = isPrinter;
    }

    public Users(Users users) {}

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Users id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Users name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return this.photo;
    }

    public Users photo(String photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getZip() {
        return this.zip;
    }

    public Users zip(String zip) {
        this.setZip(zip);
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return this.city;
    }

    public Users city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return this.country;
    }

    public Users country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return this.address;
    }

    public Users address(String address) {
        this.setAddress(address);
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return this.phone;
    }

    public Users phone(String phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return this.fax;
    }

    public Users fax(String fax) {
        this.setFax(fax);
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return this.email;
    }

    public Users email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public Users password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRememberToken() {
        return this.rememberToken;
    }

    public Users rememberToken(String rememberToken) {
        this.setRememberToken(rememberToken);
        return this;
    }

    public void setRememberToken(String rememberToken) {
        this.rememberToken = rememberToken;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public Users createdAt(LocalDate createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return this.updatedAt;
    }

    public Users updatedAt(LocalDate updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsProvider() {
        return this.isProvider;
    }

    public Users isProvider(Boolean isProvider) {
        this.setIsProvider(isProvider);
        return this;
    }

    public void setIsProvider(Boolean isProvider) {
        this.isProvider = isProvider;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Users status(Boolean status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getVerificationLink() {
        return this.verificationLink;
    }

    public Users verificationLink(String verificationLink) {
        this.setVerificationLink(verificationLink);
        return this;
    }

    public void setVerificationLink(String verificationLink) {
        this.verificationLink = verificationLink;
    }

    public String getEmailVerified() {
        return this.emailVerified;
    }

    public Users emailVerified(String emailVerified) {
        this.setEmailVerified(emailVerified);
        return this;
    }

    public void setEmailVerified(String emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getAffilateCode() {
        return this.affilateCode;
    }

    public Users affilateCode(String affilateCode) {
        this.setAffilateCode(affilateCode);
        return this;
    }

    public void setAffilateCode(String affilateCode) {
        this.affilateCode = affilateCode;
    }

    public Double getAffilateIncome() {
        return this.affilateIncome;
    }

    public Users affilateIncome(Double affilateIncome) {
        this.setAffilateIncome(affilateIncome);
        return this;
    }

    public void setAffilateIncome(Double affilateIncome) {
        this.affilateIncome = affilateIncome;
    }

    public String getShopName() {
        return this.shopName;
    }

    public Users shopName(String shopName) {
        this.setShopName(shopName);
        return this;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public Users ownerName(String ownerName) {
        this.setOwnerName(ownerName);
        return this;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getShopNumber() {
        return this.shopNumber;
    }

    public Users shopNumber(String shopNumber) {
        this.setShopNumber(shopNumber);
        return this;
    }

    public void setShopNumber(String shopNumber) {
        this.shopNumber = shopNumber;
    }

    public String getShopAddress() {
        return this.shopAddress;
    }

    public Users shopAddress(String shopAddress) {
        this.setShopAddress(shopAddress);
        return this;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

    public String getRegNumber() {
        return this.regNumber;
    }

    public Users regNumber(String regNumber) {
        this.setRegNumber(regNumber);
        return this;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public String getShopMessage() {
        return this.shopMessage;
    }

    public Users shopMessage(String shopMessage) {
        this.setShopMessage(shopMessage);
        return this;
    }

    public void setShopMessage(String shopMessage) {
        this.shopMessage = shopMessage;
    }

    public String getShopDetails() {
        return this.shopDetails;
    }

    public Users shopDetails(String shopDetails) {
        this.setShopDetails(shopDetails);
        return this;
    }

    public void setShopDetails(String shopDetails) {
        this.shopDetails = shopDetails;
    }

    public String getShopImage() {
        return this.shopImage;
    }

    public Users shopImage(String shopImage) {
        this.setShopImage(shopImage);
        return this;
    }

    public void setShopImage(String shopImage) {
        this.shopImage = shopImage;
    }

    public String getfUrl() {
        return this.fUrl;
    }

    public Users fUrl(String fUrl) {
        this.setfUrl(fUrl);
        return this;
    }

    public void setfUrl(String fUrl) {
        this.fUrl = fUrl;
    }

    public String getgUrl() {
        return this.gUrl;
    }

    public Users gUrl(String gUrl) {
        this.setgUrl(gUrl);
        return this;
    }

    public void setgUrl(String gUrl) {
        this.gUrl = gUrl;
    }

    public String gettUrl() {
        return this.tUrl;
    }

    public Users tUrl(String tUrl) {
        this.settUrl(tUrl);
        return this;
    }

    public void settUrl(String tUrl) {
        this.tUrl = tUrl;
    }

    public String getlUrl() {
        return this.lUrl;
    }

    public Users lUrl(String lUrl) {
        this.setlUrl(lUrl);
        return this;
    }

    public void setlUrl(String lUrl) {
        this.lUrl = lUrl;
    }

    public Boolean getIsVendor() {
        return this.isVendor;
    }

    public Users isVendor(Boolean isVendor) {
        this.setIsVendor(isVendor);
        return this;
    }

    public void setIsVendor(Boolean isVendor) {
        this.isVendor = isVendor;
    }

    public Boolean getfCheck() {
        return this.fCheck;
    }

    public Users fCheck(Boolean fCheck) {
        this.setfCheck(fCheck);
        return this;
    }

    public void setfCheck(Boolean fCheck) {
        this.fCheck = fCheck;
    }

    public Boolean getgCheck() {
        return this.gCheck;
    }

    public Users gCheck(Boolean gCheck) {
        this.setgCheck(gCheck);
        return this;
    }

    public void setgCheck(Boolean gCheck) {
        this.gCheck = gCheck;
    }

    public Boolean gettCheck() {
        return this.tCheck;
    }

    public Users tCheck(Boolean tCheck) {
        this.settCheck(tCheck);
        return this;
    }

    public void settCheck(Boolean tCheck) {
        this.tCheck = tCheck;
    }

    public Boolean getlCheck() {
        return this.lCheck;
    }

    public Users lCheck(Boolean lCheck) {
        this.setlCheck(lCheck);
        return this;
    }

    public void setlCheck(Boolean lCheck) {
        this.lCheck = lCheck;
    }

    public Boolean getMailSent() {
        return this.mailSent;
    }

    public Users mailSent(Boolean mailSent) {
        this.setMailSent(mailSent);
        return this;
    }

    public void setMailSent(Boolean mailSent) {
        this.mailSent = mailSent;
    }

    public Double getShippingCost() {
        return this.shippingCost;
    }

    public Users shippingCost(Double shippingCost) {
        this.setShippingCost(shippingCost);
        return this;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public Double getCurrentBalance() {
        return this.currentBalance;
    }

    public Users currentBalance(Double currentBalance) {
        this.setCurrentBalance(currentBalance);
        return this;
    }

    public void setCurrentBalance(Double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Users date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getBan() {
        return this.ban;
    }

    public Users ban(Boolean ban) {
        this.setBan(ban);
        return this;
    }

    public void setBan(Boolean ban) {
        this.ban = ban;
    }

    public Boolean getIsPrinter() {
        return this.isPrinter;
    }

    public Users isPrinter(Boolean isPrinter) {
        this.setIsPrinter(isPrinter);
        return this;
    }

    public void setIsPrinter(Boolean isPrinter) {
        this.isPrinter = isPrinter;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Users)) {
            return false;
        }
        return getId() != null && getId().equals(((Users) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Users{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", zip='" + getZip() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", address='" + getAddress() + "'" +
            ", phone='" + getPhone() + "'" +
            ", fax='" + getFax() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", rememberToken='" + getRememberToken() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", isProvider='" + getIsProvider() + "'" +
            ", status='" + getStatus() + "'" +
            ", verificationLink='" + getVerificationLink() + "'" +
            ", emailVerified='" + getEmailVerified() + "'" +
            ", affilateCode='" + getAffilateCode() + "'" +
            ", affilateIncome=" + getAffilateIncome() +
            ", shopName='" + getShopName() + "'" +
            ", ownerName='" + getOwnerName() + "'" +
            ", shopNumber='" + getShopNumber() + "'" +
            ", shopAddress='" + getShopAddress() + "'" +
            ", regNumber='" + getRegNumber() + "'" +
            ", shopMessage='" + getShopMessage() + "'" +
            ", shopDetails='" + getShopDetails() + "'" +
            ", shopImage='" + getShopImage() + "'" +
            ", fUrl='" + getfUrl() + "'" +
            ", gUrl='" + getgUrl() + "'" +
            ", tUrl='" + gettUrl() + "'" +
            ", lUrl='" + getlUrl() + "'" +
            ", isVendor='" + getIsVendor() + "'" +
            ", fCheck='" + getfCheck() + "'" +
            ", gCheck='" + getgCheck() + "'" +
            ", tCheck='" + gettCheck() + "'" +
            ", lCheck='" + getlCheck() + "'" +
            ", mailSent='" + getMailSent() + "'" +
            ", shippingCost=" + getShippingCost() +
            ", currentBalance=" + getCurrentBalance() +
            ", date='" + getDate() + "'" +
            ", ban='" + getBan() + "'" +
            ", isPrinter='" + getIsPrinter() + "'" +
            "}";
    }
}
