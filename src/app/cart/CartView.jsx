"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MAX_QUANTITY, useCart } from "@/components/cart/useCart";
import { formatPrice } from "@/libs/products";
import ui from "@/components/ui/ui.module.css";
import styles from "./cart.module.css";

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Shipping", cost: 0, days: "5–7 business days" },
  { id: "express", name: "Express Shipping", cost: 500, days: "2–3 business days" },
  { id: "premium", name: "Premium Delivery", cost: 1500, days: "1 business day" },
];

const PROMO_CODES = { SOFTROOTS10: 0.1 };
const TAX_RATE = 0.08;

const roundCents = (value) => Math.round(value * 100) / 100;
const money = (value) => formatPrice(value, { cents: true });

export default function CartView() {
  const { ready, items, count, subtotal, setQuantity, removeItem } = useCart();
  const [shippingId, setShippingId] = useState("standard");
  const [promoInput, setPromoInput] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [showCheckoutNotice, setShowCheckoutNotice] = useState(false);

  if (!ready) {
    return (
      <div className={`${ui.container} ${styles.loading}`} aria-busy="true">
        <p>Loading your cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${ui.container} ${styles.emptyWrap}`}>
        <div className={`${ui.card} ${styles.empty}`}>
          <h2>Your cart is empty</h2>
          <p>Discover our luxury trucks and accessories</p>
          <Link href="/shop" className={`${ui.btn} ${ui.btnPrimary}`}>
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  const shipping = SHIPPING_OPTIONS.find((option) => option.id === shippingId);
  const discountRate = appliedCode ? PROMO_CODES[appliedCode] : 0;
  const discount = roundCents(subtotal * discountRate);
  const tax = roundCents((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + shipping.cost + tax;

  const applyPromo = (event) => {
    event.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Enter a promo code.");
    } else if (!Object.hasOwn(PROMO_CODES, code)) {
      setPromoError("That promo code isn’t valid.");
    } else {
      setAppliedCode(code);
      setPromoError("");
      setPromoInput("");
    }
  };

  return (
    <div className={`${ui.container} ${styles.layout}`}>
      <div>
        <h2 className={ui.sectionTitle}>
          Your Selected Items <span className={styles.itemCount}>({count})</span>
        </h2>
        <ul className={styles.itemList}>
          {items.map((item) => (
            <li key={item.id} className={`${ui.card} ${styles.item}`}>
              <div className={styles.itemImage}>
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill sizes="(min-width: 641px) 200px, 100vw" />
                ) : (
                  <span
                    className={styles.buildSwatch}
                    style={{ "--paint": item.swatch.paint, "--accent": item.swatch.accent }}
                    aria-hidden="true"
                  >
                    <span>Custom Build</span>
                  </span>
                )}
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <div>
                    <span className={ui.tag}>{item.category}</span>
                    <h3 className={styles.itemName}>
                      {item.href ? <Link href={item.href}>{item.name}</Link> : item.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>

                <ul className={`${ui.featureList} ${styles.features}`}>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className={styles.itemFooter}>
                  <div className={styles.quantity} role="group" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <output className={styles.quantityValue} aria-live="polite">
                      {item.quantity}
                    </output>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= MAX_QUANTITY}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className={styles.summary} aria-labelledby="summary-title">
        <h2 id="summary-title" className={ui.sectionTitle}>
          Order Summary
        </h2>
        <div className={`${ui.card} ${styles.summaryCard}`}>
          <dl>
            <div className={styles.row}>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className={`${styles.row} ${styles.discountRow}`}>
                <dt>Discount ({appliedCode})</dt>
                <dd>−{money(discount)}</dd>
              </div>
            )}
            <div className={styles.row}>
              <dt>Shipping</dt>
              <dd>{shipping.cost === 0 ? "Free" : money(shipping.cost)}</dd>
            </div>
            <div className={styles.row}>
              <dt>Estimated Tax (8%)</dt>
              <dd>{money(tax)}</dd>
            </div>
          </dl>

          <fieldset className={styles.shipping}>
            <legend className={styles.subheading}>Shipping</legend>
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`${styles.shippingOption} ${shippingId === option.id ? styles.selected : ""}`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={shippingId === option.id}
                  onChange={() => setShippingId(option.id)}
                  className={styles.radio}
                />
                <span className={styles.optionDetails}>
                  <span className={styles.optionName}>{option.name}</span>
                  <span className={styles.optionDays}>{option.days}</span>
                </span>
                <span className={styles.optionCost}>{option.cost === 0 ? "Free" : formatPrice(option.cost)}</span>
              </label>
            ))}
          </fieldset>

          <form className={styles.promo} onSubmit={applyPromo} noValidate>
            <label htmlFor="promo-code" className={styles.subheading}>
              Promo Code
            </label>
            <div className={styles.promoRow}>
              <input
                id="promo-code"
                type="text"
                value={promoInput}
                onChange={(event) => {
                  setPromoInput(event.target.value);
                  setPromoError("");
                }}
                placeholder="Try SOFTROOTS10"
                autoComplete="off"
                maxLength={30}
                className={ui.input}
                aria-invalid={Boolean(promoError)}
                aria-describedby="promo-status"
              />
              <button type="submit" className={`${ui.btn} ${ui.btnOutline}`}>
                Apply
              </button>
            </div>
            <p id="promo-status" role="status" className={promoError ? styles.promoError : styles.promoSuccess}>
              {promoError || (appliedCode ? `${appliedCode} applied: ${discountRate * 100}% off your subtotal.` : "")}
            </p>
          </form>

          <div className={`${styles.row} ${styles.totalRow}`}>
            <span>Total</span>
            <span>{money(total)}</span>
          </div>

          <button
            type="button"
            className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}
            onClick={() => setShowCheckoutNotice(true)}
          >
            Proceed to Checkout
          </button>
          <div role="status">
            {showCheckoutNotice && (
              <p className={`${ui.alert} ${styles.notice}`}>
                Online checkout is coming soon. <Link href="/contact">Contact a consultant</Link> to complete
                your order.
              </p>
            )}
          </div>

          <Link href="/shop" className={styles.continue}>
            ← Continue Shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
