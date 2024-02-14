package com.xdev.merch.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @NotNull
    @Column(name = "cart", nullable = false)
    private String cart;

    @Column(name = "method")
    private String method;

    @Column(name = "shipping")
    private String shipping;

    @Column(name = "pickup_location")
    private String pickupLocation;

    @NotNull
    @Column(name = "total_qty")
    private String totalQty;

    @NotNull
    @Column(name = "pay_amount", nullable = false)
    private Double payAmount;

    @Column(name = "txnid")
    private String txnid;

    @Column(name = "charge_id")
    private String chargeId;

    @NotNull
    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @NotNull
    @Column(name = "payment_status", nullable = false)
    private String paymentStatus;

    @NotNull
    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

    @NotNull
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @NotNull
    @Column(name = "customer_country", nullable = false)
    private String customerCountry;

    @NotNull
    @Column(name = "customer_phone", nullable = false)
    private String customerPhone;

    @Column(name = "customer_address")
    private String customerAddress;

    @Column(name = "customer_city")
    private String customerCity;

    @Column(name = "customer_zip")
    private String customerZip;

    @Column(name = "shipping_name")
    private String shippingName;

    @Column(name = "shipping_country")
    private String shippingCountry;

    @Column(name = "shipping_email")
    private String shippingEmail;

    @Column(name = "shipping_phone")
    private String shippingPhone;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "shipping_city")
    private String shippingCity;

    @Column(name = "shipping_zip")
    private String shippingZip;

    @Column(name = "order_note")
    private String orderNote;

    @Column(name = "coupon_code")
    private String couponCode;

    @Column(name = "coupon_discount")
    private String couponDiscount;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "affilate_user")
    private String affilateUser;

    @Column(name = "affilate_charge")
    private String affilateCharge;

    @NotNull
    @Column(name = "currency_sign", nullable = false)
    private String currencySign;

    @NotNull
    @Column(name = "currency_value", nullable = false)
    private Double currencyValue;

    @NotNull
    @Column(name = "shipping_cost", nullable = false)
    private Double shippingCost;

    @NotNull
    @Column(name = "packing_cost", nullable = false)
    private Double packingCost;

    @NotNull
    @Column(name = "tax", nullable = false)
    private Double tax;

    @NotNull
    @Column(name = "dp", nullable = false)
    private Boolean dp;

    @Column(name = "pay_id")
    private String payId;

    @NotNull
    @Column(name = "vendor_shipping_id", nullable = false)
    private Long vendorShippingId;

    @NotNull
    @Column(name = "vendor_packing_id", nullable = false)
    private Long vendorPackingId;

    @NotNull
    @Column(name = "whole_discount", nullable = false)
    private Double wholeDiscount;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Orders id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Orders userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCart() {
        return this.cart;
    }

    public Orders cart(String cart) {
        this.setCart(cart);
        return this;
    }

    public void setCart(String cart) {
        this.cart = cart;
    }

    public String getMethod() {
        return this.method;
    }

    public Orders method(String method) {
        this.setMethod(method);
        return this;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getShipping() {
        return this.shipping;
    }

    public Orders shipping(String shipping) {
        this.setShipping(shipping);
        return this;
    }

    public void setShipping(String shipping) {
        this.shipping = shipping;
    }

    public String getPickupLocation() {
        return this.pickupLocation;
    }

    public Orders pickupLocation(String pickupLocation) {
        this.setPickupLocation(pickupLocation);
        return this;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getTotalQty() {
        return this.totalQty;
    }

    public Orders totalQty(String totalQty) {
        this.setTotalQty(totalQty);
        return this;
    }

    public void setTotalQty(String totalQty) {
        this.totalQty = totalQty;
    }

    public Double getPayAmount() {
        return this.payAmount;
    }

    public Orders payAmount(Double payAmount) {
        this.setPayAmount(payAmount);
        return this;
    }

    public void setPayAmount(Double payAmount) {
        this.payAmount = payAmount;
    }

    public String getTxnid() {
        return this.txnid;
    }

    public Orders txnid(String txnid) {
        this.setTxnid(txnid);
        return this;
    }

    public void setTxnid(String txnid) {
        this.txnid = txnid;
    }

    public String getChargeId() {
        return this.chargeId;
    }

    public Orders chargeId(String chargeId) {
        this.setChargeId(chargeId);
        return this;
    }

    public void setChargeId(String chargeId) {
        this.chargeId = chargeId;
    }

    public String getOrderNumber() {
        return this.orderNumber;
    }

    public Orders orderNumber(String orderNumber) {
        this.setOrderNumber(orderNumber);
        return this;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getPaymentStatus() {
        return this.paymentStatus;
    }

    public Orders paymentStatus(String paymentStatus) {
        this.setPaymentStatus(paymentStatus);
        return this;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getCustomerEmail() {
        return this.customerEmail;
    }

    public Orders customerEmail(String customerEmail) {
        this.setCustomerEmail(customerEmail);
        return this;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerName() {
        return this.customerName;
    }

    public Orders customerName(String customerName) {
        this.setCustomerName(customerName);
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCountry() {
        return this.customerCountry;
    }

    public Orders customerCountry(String customerCountry) {
        this.setCustomerCountry(customerCountry);
        return this;
    }

    public void setCustomerCountry(String customerCountry) {
        this.customerCountry = customerCountry;
    }

    public String getCustomerPhone() {
        return this.customerPhone;
    }

    public Orders customerPhone(String customerPhone) {
        this.setCustomerPhone(customerPhone);
        return this;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return this.customerAddress;
    }

    public Orders customerAddress(String customerAddress) {
        this.setCustomerAddress(customerAddress);
        return this;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getCustomerCity() {
        return this.customerCity;
    }

    public Orders customerCity(String customerCity) {
        this.setCustomerCity(customerCity);
        return this;
    }

    public void setCustomerCity(String customerCity) {
        this.customerCity = customerCity;
    }

    public String getCustomerZip() {
        return this.customerZip;
    }

    public Orders customerZip(String customerZip) {
        this.setCustomerZip(customerZip);
        return this;
    }

    public void setCustomerZip(String customerZip) {
        this.customerZip = customerZip;
    }

    public String getShippingName() {
        return this.shippingName;
    }

    public Orders shippingName(String shippingName) {
        this.setShippingName(shippingName);
        return this;
    }

    public void setShippingName(String shippingName) {
        this.shippingName = shippingName;
    }

    public String getShippingCountry() {
        return this.shippingCountry;
    }

    public Orders shippingCountry(String shippingCountry) {
        this.setShippingCountry(shippingCountry);
        return this;
    }

    public void setShippingCountry(String shippingCountry) {
        this.shippingCountry = shippingCountry;
    }

    public String getShippingEmail() {
        return this.shippingEmail;
    }

    public Orders shippingEmail(String shippingEmail) {
        this.setShippingEmail(shippingEmail);
        return this;
    }

    public void setShippingEmail(String shippingEmail) {
        this.shippingEmail = shippingEmail;
    }

    public String getShippingPhone() {
        return this.shippingPhone;
    }

    public Orders shippingPhone(String shippingPhone) {
        this.setShippingPhone(shippingPhone);
        return this;
    }

    public void setShippingPhone(String shippingPhone) {
        this.shippingPhone = shippingPhone;
    }

    public String getShippingAddress() {
        return this.shippingAddress;
    }

    public Orders shippingAddress(String shippingAddress) {
        this.setShippingAddress(shippingAddress);
        return this;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getShippingCity() {
        return this.shippingCity;
    }

    public Orders shippingCity(String shippingCity) {
        this.setShippingCity(shippingCity);
        return this;
    }

    public void setShippingCity(String shippingCity) {
        this.shippingCity = shippingCity;
    }

    public String getShippingZip() {
        return this.shippingZip;
    }

    public Orders shippingZip(String shippingZip) {
        this.setShippingZip(shippingZip);
        return this;
    }

    public void setShippingZip(String shippingZip) {
        this.shippingZip = shippingZip;
    }

    public String getOrderNote() {
        return this.orderNote;
    }

    public Orders orderNote(String orderNote) {
        this.setOrderNote(orderNote);
        return this;
    }

    public void setOrderNote(String orderNote) {
        this.orderNote = orderNote;
    }

    public String getCouponCode() {
        return this.couponCode;
    }

    public Orders couponCode(String couponCode) {
        this.setCouponCode(couponCode);
        return this;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public String getCouponDiscount() {
        return this.couponDiscount;
    }

    public Orders couponDiscount(String couponDiscount) {
        this.setCouponDiscount(couponDiscount);
        return this;
    }

    public void setCouponDiscount(String couponDiscount) {
        this.couponDiscount = couponDiscount;
    }

    public String getStatus() {
        return this.status;
    }

    public Orders status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public Orders createdAt(Instant createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatedAt;
    }

    public Orders updatedAt(Instant updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getAffilateUser() {
        return this.affilateUser;
    }

    public Orders affilateUser(String affilateUser) {
        this.setAffilateUser(affilateUser);
        return this;
    }

    public void setAffilateUser(String affilateUser) {
        this.affilateUser = affilateUser;
    }

    public String getAffilateCharge() {
        return this.affilateCharge;
    }

    public Orders affilateCharge(String affilateCharge) {
        this.setAffilateCharge(affilateCharge);
        return this;
    }

    public void setAffilateCharge(String affilateCharge) {
        this.affilateCharge = affilateCharge;
    }

    public String getCurrencySign() {
        return this.currencySign;
    }

    public Orders currencySign(String currencySign) {
        this.setCurrencySign(currencySign);
        return this;
    }

    public void setCurrencySign(String currencySign) {
        this.currencySign = currencySign;
    }

    public Double getCurrencyValue() {
        return this.currencyValue;
    }

    public Orders currencyValue(Double currencyValue) {
        this.setCurrencyValue(currencyValue);
        return this;
    }

    public void setCurrencyValue(Double currencyValue) {
        this.currencyValue = currencyValue;
    }

    public Double getShippingCost() {
        return this.shippingCost;
    }

    public Orders shippingCost(Double shippingCost) {
        this.setShippingCost(shippingCost);
        return this;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    public Double getPackingCost() {
        return this.packingCost;
    }

    public Orders packingCost(Double packingCost) {
        this.setPackingCost(packingCost);
        return this;
    }

    public void setPackingCost(Double packingCost) {
        this.packingCost = packingCost;
    }

    public Double getTax() {
        return this.tax;
    }

    public Orders tax(Double tax) {
        this.setTax(tax);
        return this;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Boolean getDp() {
        return this.dp;
    }

    public Orders dp(Boolean dp) {
        this.setDp(dp);
        return this;
    }

    public void setDp(Boolean dp) {
        this.dp = dp;
    }

    public String getPayId() {
        return this.payId;
    }

    public Orders payId(String payId) {
        this.setPayId(payId);
        return this;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public Long getVendorShippingId() {
        return this.vendorShippingId;
    }

    public Orders vendorShippingId(Long vendorShippingId) {
        this.setVendorShippingId(vendorShippingId);
        return this;
    }

    public void setVendorShippingId(Long vendorShippingId) {
        this.vendorShippingId = vendorShippingId;
    }

    public Long getVendorPackingId() {
        return this.vendorPackingId;
    }

    public Orders vendorPackingId(Long vendorPackingId) {
        this.setVendorPackingId(vendorPackingId);
        return this;
    }

    public void setVendorPackingId(Long vendorPackingId) {
        this.vendorPackingId = vendorPackingId;
    }

    public Double getWholeDiscount() {
        return this.wholeDiscount;
    }

    public Orders wholeDiscount(Double wholeDiscount) {
        this.setWholeDiscount(wholeDiscount);
        return this;
    }

    public void setWholeDiscount(Double wholeDiscount) {
        this.wholeDiscount = wholeDiscount;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Orders)) {
            return false;
        }
        return getId() != null && getId().equals(((Orders) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Orders{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", cart='" + getCart() + "'" +
            ", method='" + getMethod() + "'" +
            ", shipping='" + getShipping() + "'" +
            ", pickupLocation='" + getPickupLocation() + "'" +
            ", totalQty='" + getTotalQty() + "'" +
            ", payAmount=" + getPayAmount() +
            ", txnid='" + getTxnid() + "'" +
            ", chargeId='" + getChargeId() + "'" +
            ", orderNumber='" + getOrderNumber() + "'" +
            ", paymentStatus='" + getPaymentStatus() + "'" +
            ", customerEmail='" + getCustomerEmail() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", customerCountry='" + getCustomerCountry() + "'" +
            ", customerPhone='" + getCustomerPhone() + "'" +
            ", customerAddress='" + getCustomerAddress() + "'" +
            ", customerCity='" + getCustomerCity() + "'" +
            ", customerZip='" + getCustomerZip() + "'" +
            ", shippingName='" + getShippingName() + "'" +
            ", shippingCountry='" + getShippingCountry() + "'" +
            ", shippingEmail='" + getShippingEmail() + "'" +
            ", shippingPhone='" + getShippingPhone() + "'" +
            ", shippingAddress='" + getShippingAddress() + "'" +
            ", shippingCity='" + getShippingCity() + "'" +
            ", shippingZip='" + getShippingZip() + "'" +
            ", orderNote='" + getOrderNote() + "'" +
            ", couponCode='" + getCouponCode() + "'" +
            ", couponDiscount='" + getCouponDiscount() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", affilateUser='" + getAffilateUser() + "'" +
            ", affilateCharge='" + getAffilateCharge() + "'" +
            ", currencySign='" + getCurrencySign() + "'" +
            ", currencyValue=" + getCurrencyValue() +
            ", shippingCost=" + getShippingCost() +
            ", packingCost=" + getPackingCost() +
            ", tax=" + getTax() +
            ", dp='" + getDp() + "'" +
            ", payId='" + getPayId() + "'" +
            ", vendorShippingId=" + getVendorShippingId() +
            ", vendorPackingId=" + getVendorPackingId() +
            ", wholeDiscount=" + getWholeDiscount() +
            "}";
    }
}
