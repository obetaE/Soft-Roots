"use client";
import { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import styles from "./shop.module.css";

const ShopPage = () => {
  const videoRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [color, setColor] = useState("#1a1a1a");
  const [rimStyle, setRimStyle] = useState("standard");
  const splineRef = useRef();

  // Product data
  const products = [
    {
      id: 1,
      name: "Heritage Classic",
      price: "$189,000",
      category: "luxury",
      features: ["550HP Engine", "Handcrafted Interior", "Smart Suspension"],
      image: "/truck-1.png"
    },
    {
      id: 2,
      name: "Modern Pioneer",
      price: "$225,000",
      category: "performance",
      features: ["Hybrid Power", "All-Terrain Capability", "Digital Cockpit"],
      image: "/truck-2.png"
    },
    {
      id: 3,
      name: "Executive Edition",
      price: "$295,000",
      category: "luxury",
      features: ["V8 Engine", "Executive Package", "Night Vision"],
      image: "/truck-3.png"
    },
    {
      id: 4,
      name: "Adventure Pro",
      price: "$210,000",
      category: "offroad",
      features: ["4x4 System", "Heavy Duty Suspension", "Winch System"],
      image: "/truck-4.png"
    },
    {
      id: 5,
      name: "Urban Cruiser",
      price: "$175,000",
      category: "urban",
      features: ["Compact Design", "Eco Mode", "Smart Parking"],
      image: "/truck-5.png"
    },
    {
      id: 6,
      name: "Eco Voyager",
      price: "$199,000",
      category: "eco",
      features: ["Electric Powertrain", "Solar Roof", "Regenerative Braking"],
      image: "/truck-6.png"
    }
  ];

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const numericPrice = item.price.replace(/[^\d.]/g, '');
    return sum + parseFloat(numericPrice);
  }, 0);
  
  const formattedTotal = cartTotal.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Handle Spline events
  function onLoad(spline) {
    splineRef.current = spline;
    updateCarColor();
  }

  function updateCarColor() {
    if (splineRef.current) {
      splineRef.current.setVariable('BodyColor', color);
      splineRef.current.setVariable('RimType', rimStyle);
    }
  }

  // Update car when color changes
  useEffect(() => {
    updateCarColor();
  }, [color, rimStyle]);

  return (
    <div className={styles.container}>
      <video
        ref={videoRef}
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2024/09/09/230471_tiny.mp4"
        muted
        playsInline
        loop
        autoPlay
      />

      {/* Section 1: Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>PREMIUM TRUCK COLLECTION</h1>
          <p className={styles.heroSubtitle}>Where Luxury Meets Performance</p>
        </div>
      </section>

      {/* Section 2: Categories */}
      <section className={styles.categoriesSection}>
        <div className={styles.categoriesContainer}>
          <h2 className={styles.sectionTitle}>EXPLORE OUR RANGE</h2>
          <p className={styles.sectionSubtitle}>Select a category to view models</p>
          
          <div className={styles.categoryGrid}>
            <button
              className={`${styles.categoryCard} ${
                selectedCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              <div className={styles.categoryIcon}>ALL</div>
              <h3>All Models</h3>
            </button>
            <button
              className={`${styles.categoryCard} ${
                selectedCategory === "luxury" ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("luxury")}
            >
              <div className={styles.categoryIcon}>LX</div>
              <h3>Luxury Series</h3>
            </button>
            <button
              className={`${styles.categoryCard} ${
                selectedCategory === "performance" ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("performance")}
            >
              <div className={styles.categoryIcon}>PR</div>
              <h3>Performance</h3>
            </button>
            <button
              className={`${styles.categoryCard} ${
                selectedCategory === "offroad" ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory("offroad")}
            >
              <div className={styles.categoryIcon}>OR</div>
              <h3>Off-Road</h3>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Product Carousel */}
      {selectedCategory && (
        <section className={styles.productsSection}>
          <div className={styles.productsContainer}>
            <div className={styles.carouselHeader}>
              <h2 className={styles.sectionTitle}>FEATURED MODELS</h2>
              <p className={styles.sectionSubtitle}>
                {selectedCategory === "all" 
                  ? "All Models" 
                  : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + " Series"}
              </p>
            </div>
            
            <div className={styles.carousel}>
              <button 
                className={styles.carouselArrow}
                onClick={() => setCurrentProductIndex(
                  currentProductIndex === 0 
                    ? filteredProducts.length - 1 
                    : currentProductIndex - 1
                )}
              >
                &lt;
              </button>
              
              <div className={styles.carouselContent}>
                {filteredProducts.length > 0 && (
                  <div className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img 
                        src={filteredProducts[currentProductIndex].image} 
                        alt={filteredProducts[currentProductIndex].name} 
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>
                        {filteredProducts[currentProductIndex].name}
                      </h3>
                      <div className={styles.productPrice}>
                        {filteredProducts[currentProductIndex].price}
                      </div>
                      <ul className={styles.productFeatures}>
                        {filteredProducts[currentProductIndex].features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className={styles.productActions}>
                        <button 
                          className={styles.cartButton}
                          onClick={() => addToCart(filteredProducts[currentProductIndex])}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                className={styles.carouselArrow}
                onClick={() => setCurrentProductIndex(
                  currentProductIndex === filteredProducts.length - 1 
                    ? 0 
                    : currentProductIndex + 1
                )}
              >
                &gt;
              </button>
            </div>
            
            <div className={styles.carouselIndicators}>
              {filteredProducts.map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentProductIndex ? styles.activeIndicator : ""
                  }`}
                  onClick={() => setCurrentProductIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Customization */}
      <section className={styles.customizationSection}>
        <div className={styles.customizationContainer}>
          <h2 className={styles.sectionTitle}>CUSTOMIZE YOUR TRUCK</h2>
          <p className={styles.sectionSubtitle}>
            Create a vehicle that's uniquely yours
          </p>
          
          <div className={styles.customizationArea}>
            <div className={styles.splineContainer}>
              <Spline
                scene="https://prod.spline.design/5T3RcH6t-0y0d9aF/scene.splinecode"
                onLoad={onLoad}
              />
            </div>
            
            <div className={styles.customizationOptions}>
              <div className={styles.optionGroup}>
                <h3>Exterior Color</h3>
                <div className={styles.colorOptions}>
                  <div
                    className={`${styles.colorOption} ${color === "#1a1a1a" ? styles.selected : ""}`}
                    style={{ backgroundColor: "#1a1a1a" }}
                    onClick={() => setColor("#1a1a1a")}
                  />
                  <div
                    className={`${styles.colorOption} ${color === "#FFD700" ? styles.selected : ""}`}
                    style={{ backgroundColor: "#FFD700" }}
                    onClick={() => setColor("#FFD700")}
                  />
                  <div
                    className={`${styles.colorOption} ${color === "#2E4057" ? styles.selected : ""}`}
                    style={{ backgroundColor: "#2E4057" }}
                    onClick={() => setColor("#2E4057")}
                  />
                  <div
                    className={`${styles.colorOption} ${color === "#8B0000" ? styles.selected : ""}`}
                    style={{ backgroundColor: "#8B0000" }}
                    onClick={() => setColor("#8B0000")}
                  />
                </div>
              </div>
              
              <div className={styles.optionGroup}>
                <h3>Wheel Style</h3>
                <div className={styles.wheelOptions}>
                  <button 
                    className={`${styles.wheelOption} ${rimStyle === "standard" ? styles.selectedWheel : ""}`}
                    onClick={() => setRimStyle("standard")}
                  >
                    Standard
                  </button>
                  <button 
                    className={`${styles.wheelOption} ${rimStyle === "sport" ? styles.selectedWheel : ""}`}
                    onClick={() => setRimStyle("sport")}
                  >
                    Sport
                  </button>
                  <button 
                    className={`${styles.wheelOption} ${rimStyle === "offroad" ? styles.selectedWheel : ""}`}
                    onClick={() => setRimStyle("offroad")}
                  >
                    Off-Road
                  </button>
                </div>
              </div>
              
              <button className={styles.customizeButton}>
                SAVE CONFIGURATION
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.cartSummary}>
            <h2>YOUR SELECTION</h2>
            <div className={styles.cartItems}>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
                    <div className={styles.cartItemName}>{item.name}</div>
                    <div className={styles.cartItemPrice}>{item.price}</div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyCart}>Your cart is empty</p>
              )}
            </div>
            {cart.length > 0 && (
              <div className={styles.cartTotal}>
                <span>TOTAL:</span>
                <span>{formattedTotal}</span>
              </div>
            )}
          </div>

          <div className={styles.ctaContent}>
            <h2>READY TO OWN EXCEPTIONAL?</h2>
            <p>Schedule your consultation today</p>
            <div className={styles.ctaButtons}>
              <button className={`${styles.ctaButton} ${styles.primary}`}>
                REQUEST QUOTE
              </button>
              <button className={`${styles.ctaButton} ${styles.secondary}`}>
                {cart.length > 0 ? "PROCEED TO CHECKOUT" : "VIEW CART"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;