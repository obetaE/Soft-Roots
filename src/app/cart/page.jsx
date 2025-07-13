"use client";
import styles from "./cart.module.css";
import { useState } from "react";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Pioneer Edition Luxury Truck",
      price: 149999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "550HP Twin-Turbo Engine",
        "Handcrafted Leather Interior",
        "Smart Suspension System",
      ],
    },
    {
      id: 2,
      name: "Premium Off-Road Package",
      price: 12500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Enhanced suspension",
        "All-terrain tires",
        "Underbody protection",
      ],
    },
    {
      id: 3,
      name: "Luxury Interior Upgrade",
      price: 8500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Premium leather seats",
        "Custom wood trim",
        "Heated & ventilated seats",
      ],
    },
  ]);

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      cost: 0,
      days: "5-7 business days",
    },
    {
      id: "express",
      name: "Express Shipping",
      cost: 500,
      days: "2-3 business days",
    },
    {
      id: "premium",
      name: "Premium Delivery",
      cost: 1500,
      days: "1 business day",
    },
  ];

  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost =
    shippingOptions.find((opt) => opt.id === selectedShipping)?.cost || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax - discount;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SOFTROOTS10") {
      setDiscount(subtotal * 0.1); // 10% discount
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className={styles.container}>
      <video
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2024/09/09/230471_tiny.mp4"
        muted
        playsInline
        loop
        autoPlay
      />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>YOUR LUXURY CART</h1>
          <p className={styles.heroSubtitle}>
            Refined Selection Awaits Your Approval
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className={styles.cartSection}>
        <div className={styles.cartContainer}>
          {/* Cart Items */}
          <div className={styles.cartItems}>
            <h2 className={styles.sectionTitle}>Your Selected Items</h2>

            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <h3>Your cart is empty</h3>
                <p>Discover our luxury trucks and accessories</p>
                <Link href="/shop" className={styles.shopButton}>
                  BROWSE COLLECTION
                </Link>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div
                      className={styles.itemImage}
                      style={{ backgroundImage: `url(${item.image})` }}
                    />

                    <div className={styles.itemDetails}>
                      <div className={styles.itemHeader}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>

                      <ul className={styles.featureList}>
                        {item.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>

                      <div className={styles.itemFooter}>
                        <div className={styles.quantityControl}>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className={styles.quantity}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className={styles.price}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>

            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated Tax</span>
                <span>${tax.toLocaleString()}</span>
              </div>

              <div className={styles.shippingSection}>
                <h3>Shipping</h3>
                <div className={styles.shippingOptions}>
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`${styles.shippingOption} ${
                        selectedShipping === option.id ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedShipping(option.id)}
                    >
                      <div className={styles.optionRadio}>
                        <div className={styles.radioIndicator} />
                      </div>
                      <div className={styles.optionDetails}>
                        <div className={styles.optionName}>
                          {option.name}
                          <span className={styles.optionDays}>
                            {option.days}
                          </span>
                        </div>
                        <div className={styles.optionCost}>
                          {option.cost === 0 ? "FREE" : `$${option.cost}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.promoSection}>
                <h3>Promo Code</h3>
                <div className={styles.promoInputGroup}>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoInput}
                  />
                  <button
                    className={styles.applyButton}
                    onClick={applyPromoCode}
                  >
                    APPLY
                  </button>
                </div>
                {discount > 0 && (
                  <div className={styles.discountApplied}>
                    <span>Discount Applied</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <button className={styles.checkoutButton}>
                PROCEED TO CHECKOUT
              </button>

              <div className={styles.continueShopping}>
                <Link href="/shop">← Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>NEED PERSONAL ASSISTANCE?</h2>
          <p>Our luxury consultants are ready to help</p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              SCHEDULE CONSULTATION
            </button>
            <button className={`${styles.ctaButton} ${styles.secondary}`}>
              CALL NOW: 1-800-SOFTROOTS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
