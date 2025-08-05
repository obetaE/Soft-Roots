"use client";
import styles from "./shop.module.css";
import { useState } from "react";
import Link from "next/link";

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Trucks", "Accessories", "Merchandise"];

  const products = [
    {
      id: 1,
      name: "Pioneer Edition Luxury Truck",
      price: 149999,
      category: "Trucks",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Our flagship luxury truck with handcrafted interior and advanced technology",
      features: [
        "550HP Twin-Turbo Engine",
        "Handcrafted Leather Interior",
        "Smart Suspension System",
      ],
      specs: {
        engine: "4.0L V8 Twin-Turbo",
        horsepower: "550 HP",
        torque: "650 lb-ft",
        transmission: "10-Speed Automatic",
        seating: "5",
        towing: "12,500 lbs",
      },
    },
    {
      id: 2,
      name: "Adventurer Edition",
      price: 129999,
      category: "Trucks",
      image:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Designed for the explorer who demands luxury and capability",
      features: [
        "All-Terrain Package",
        "Extended Range Fuel Tank",
        "Heavy-Duty Suspension",
      ],
      specs: {
        engine: "3.5L V6 Twin-Turbo",
        horsepower: "450 HP",
        torque: "510 lb-ft",
        transmission: "10-Speed Automatic",
        seating: "5",
        towing: "11,000 lbs",
      },
    },
    {
      id: 3,
      name: "Premium Off-Road Package",
      price: 12500,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Enhance your truck's capabilities with our premium off-road package",
      features: [
        "Enhanced suspension",
        "All-terrain tires",
        "Underbody protection",
      ],
    },
    {
      id: 4,
      name: "Luxury Interior Upgrade",
      price: 8500,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description:
        "Upgrade your cabin with premium materials and comfort features",
      features: [
        "Premium leather seats",
        "Custom wood trim",
        "Heated & ventilated seats",
      ],
    },
    {
      id: 5,
      name: "Carbon Fiber Running Boards",
      price: 3200,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Lightweight and durable running boards for easy access",
      features: [
        "Carbon fiber construction",
        "Anti-slip surface",
        "Integrated lighting",
      ],
    },
    {
      id: 6,
      name: "Soft Roots Signature Jacket",
      price: 299,
      category: "Merchandise",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Premium jacket featuring Soft Roots branding",
      features: ["Waterproof", "Insulated", "Multiple pockets"],
    },
    {
      id: 7,
      name: "Limited Edition Truck Model",
      price: 199,
      category: "Merchandise",
      image:
        "https://images.unsplash.com/photo-1670069247956-1a6dfee5338e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJpZyUyMGNhcnN8ZW58MHx8MHx8fDA%3D",
      description: "1:18 scale die-cast model of the Pioneer Edition",
      features: [
        "Premium packaging",
        "Display stand",
        "Certificate of authenticity",
      ],
    },
    {
      id: 8,
      name: "Soft Roots Leather Keychain",
      price: 89,
      category: "Merchandise",
      image:
        "https://images.unsplash.com/photo-1584735175097-719d848f8449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Handcrafted leather keychain with metal emblem",
      features: ["Genuine leather", "Solid metal emblem", "Lifetime warranty"],
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

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
          <h1 className={styles.heroTitle}>SOFT ROOTS COLLECTION</h1>
          <p className={styles.heroSubtitle}>
            Luxury Trucks and Premium Accessories
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className={styles.shopSection}>
        <div className={styles.shopContainer}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Categories</h2>
              <ul className={styles.categoryList}>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`${styles.categoryItem} ${
                      activeCategory === category ? styles.active : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Filter By Price</h2>
              <div className={styles.priceFilter}>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  className={styles.priceSlider}
                />
                <div className={styles.priceRange}>
                  <span>$0</span>
                  <span>$200,000</span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarTitle}>Best Sellers</h2>
              <ul className={styles.bestSellers}>
                {products.slice(0, 3).map((product) => (
                  <li key={product.id} className={styles.bestSellerItem}>
                    <div
                      className={styles.bestSellerImage}
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div>
                      <h3 className={styles.bestSellerTitle}>{product.name}</h3>
                      <span className={styles.bestSellerPrice}>
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div
                  className={styles.productImage}
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>
                    {product.category}
                  </span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>

                  {product.features && (
                    <ul className={styles.featureList}>
                      {product.features.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {product.specs && (
                    <div className={styles.specsGrid}>
                      <div className={styles.specItem}>
                        <span>Engine</span>
                        <strong>{product.specs.engine}</strong>
                      </div>
                      <div className={styles.specItem}>
                        <span>Horsepower</span>
                        <strong>{product.specs.horsepower}</strong>
                      </div>
                      <div className={styles.specItem}>
                        <span>Torque</span>
                        <strong>{product.specs.torque}</strong>
                      </div>
                      <div className={styles.specItem}>
                        <span>Seating</span>
                        <strong>{product.specs.seating}</strong>
                      </div>
                    </div>
                  )}

                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>
                      ${product.price.toLocaleString()}
                    </span>
                    <button className={styles.addToCartButton}>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default ShopPage;
