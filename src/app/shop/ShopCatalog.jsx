"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { MAX_QUANTITY, useCart } from "@/components/cart/useCart";
import { formatPrice, productCategories, products } from "@/libs/products";
import ui from "@/components/ui/ui.module.css";
import styles from "./shop.module.css";

const PRICE_CEILING = Math.ceil(Math.max(...products.map((product) => product.price)) / 10000) * 10000;

const SORTS = {
  featured: { label: "Featured", compare: () => 0 },
  "price-asc": { label: "Price: Low to High", compare: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: High to Low", compare: (a, b) => b.price - a.price },
};

const bestSellers = products.filter((product) => product.bestSeller);

export default function ShopCatalog() {
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING);
  const [sort, setSort] = useState("featured");
  const [justAdded, setJustAdded] = useState(null);
  const addedTimer = useRef(0);
  const { addItem, getQuantity, ready } = useCart();

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const visibleProducts = useMemo(
    () =>
      products
        .filter((product) => (category === "All" || product.category === category) && product.price <= maxPrice)
        .sort(SORTS[sort].compare),
    [category, maxPrice, sort]
  );

  const handleAdd = (product) => {
    addItem(product.id);
    setJustAdded(product);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(null), 2000);
  };

  const resetFilters = () => {
    setCategory("All");
    setMaxPrice(PRICE_CEILING);
    setSort("featured");
  };

  return (
    <div className={`${ui.container} ${styles.layout}`}>
      <aside className={styles.sidebar} aria-label="Filters">
        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>Categories</h2>
          <div className={styles.categoryList} role="group" aria-label="Filter by category">
            {productCategories.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={category === option}
                className={`${styles.categoryButton} ${category === option ? styles.active : ""}`}
                onClick={() => setCategory(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>
            <label htmlFor="max-price">Filter by Price</label>
          </h2>
          <input
            id="max-price"
            type="range"
            min={0}
            max={PRICE_CEILING}
            step={500}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            aria-valuetext={`Up to ${formatPrice(maxPrice)}`}
            className={styles.priceSlider}
          />
          <div className={styles.priceRange}>
            <span>{formatPrice(0)}</span>
            <span>Up to {formatPrice(maxPrice)}</span>
          </div>
        </div>

        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>Best Sellers</h2>
          <ul className={styles.bestSellers}>
            {bestSellers.map((product) => (
              <li key={product.id} className={styles.bestSellerItem}>
                <Image src={product.image} alt="" width={72} height={72} className={styles.bestSellerImage} />
                <div>
                  <h3 className={styles.bestSellerTitle}>{product.name}</h3>
                  <span className={styles.bestSellerPrice}>{formatPrice(product.price)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className={styles.results}>
        <div className={styles.toolbar}>
          <p className={styles.resultCount} aria-live="polite">
            {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
          </p>
          <div className={styles.sort}>
            <label htmlFor="sort" className={styles.sortLabel}>
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className={`${ui.input} ${styles.sortSelect}`}
            >
              {Object.entries(SORTS).map(([value, option]) => (
                <option key={value} value={value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className={`${ui.card} ${styles.empty}`}>
            <h2>No products match these filters</h2>
            <p>Try a different category or raise the price limit.</p>
            <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          <ul className={styles.productGrid}>
            {visibleProducts.map((product) => {
              const inCart = ready ? getQuantity(product.id) : 0;
              const atLimit = inCart >= MAX_QUANTITY;
              return (
                <li key={product.id} className={`${ui.card} ${styles.productCard}`}>
                  <div className={styles.productImage}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1400px) 480px, (min-width: 1025px) 40vw, (min-width: 769px) 50vw, 100vw"
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={`${ui.tag} ${styles.category}`}>{product.category}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDescription}>{product.description}</p>

                    <ul className={`${ui.featureList} ${styles.features}`}>
                      {product.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    {product.specs && (
                      <dl className={styles.specsGrid}>
                        {Object.entries(product.specs).map(([label, value]) => (
                          <div key={label} className={styles.specItem}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                      <button
                        type="button"
                        className={`${ui.btn} ${ui.btnPrimary} ${styles.addButton}`}
                        onClick={() => handleAdd(product)}
                        disabled={atLimit}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        {atLimit ? "Max Quantity" : justAdded?.id === product.id ? "Added ✓" : "Add to Cart"}
                      </button>
                    </div>

                    {product.buildUrl && (
                      <p className={styles.customize}>
                        <Link href={product.buildUrl}>Customize this truck in 3D →</Link>
                      </p>
                    )}

                    {inCart > 0 && (
                      <p className={styles.inCart}>
                        {inCart} in your cart · <Link href="/cart">View cart</Link>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="visually-hidden" role="status">
          {justAdded ? `${justAdded.name} added to cart` : ""}
        </p>
      </div>
    </div>
  );
}
