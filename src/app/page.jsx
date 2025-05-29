"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./home.module.css";

const VideoScroll = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const scrolling = useRef(false);
  const rafId = useRef(null);

  // Initialize video and scroll container
  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      // Set container height based on sections
      containerRef.current.style.height = `500vh`; // 5 sections
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.play().catch(() => {}); // Auto-play with mute

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !videoDuration) return;

    const updateVideoTime = () => {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;

      // Calculate video time
      const videoTime = (scrollFraction * videoDuration * 2) % videoDuration;
      videoRef.current.currentTime = Math.min(videoTime, videoDuration);

      scrolling.current = false;
    };

    const handleScroll = () => {
      if (!scrolling.current) {
        scrolling.current = true;
        rafId.current = requestAnimationFrame(updateVideoTime);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [videoDuration]);

  return (
    <div className={styles.container} ref={containerRef}>
      <video
        ref={videoRef}
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2024/09/09/230471_tiny.mp4"
        muted
        playsInline
        loop
      />

      {/* Section 1: Hero */}
      <section className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>SOFT ROOTS</h1>
          <p className={styles.heroSubtitle}>Luxury Trucks Redefined</p>
          <div className={styles.scrollIndicator}>
            <span></span>
          </div>
        </div>
      </section>

      {/* Section 2: Values */}
      <section className={`${styles.section} ${styles.valuesSection}`}>
        <div className={styles.contentCard}>
          <h2>OUR VALUES</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>01</div>
              <h3>Heritage Craftsmanship</h3>
              <p>Traditional techniques meet modern engineering</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>02</div>
              <h3>Uncompromised Quality</h3>
              <p>Premium materials for lasting performance</p>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueIcon}>03</div>
              <h3>Innovative Design</h3>
              <p>Future-forward thinking in every detail</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Model */}
      <section className={`${styles.section} ${styles.modelSection}`}>
        <div className={styles.modelCard}>
          <div className={styles.modelInfo}>
            <span className={styles.modelBadge}>NEW RELEASE</span>
            <h2>PIONEER EDITION</h2>
            <p>Luxury redefined with cutting-edge technology</p>
            <ul className={styles.featureList}>
              <li>• 550HP Twin-Turbo Engine</li>
              <li>• Handcrafted Leather Interior</li>
              <li>• Smart Suspension System</li>
            </ul>
            <button className={styles.ctaButton}>EXPLORE FEATURES</button>
          </div>
          <div className={styles.modelVisual}>
            <div className={styles.circleBadge}>2024</div>
          </div>
        </div>
      </section>

      {/* Section 4: Technology */}
      <section className={`${styles.section} ${styles.techSection}`}>
        <div className={styles.techGrid}>
          <div className={styles.techCard}>
            <h3>
              ADVANCED
              <br />
              SUSPENSION
            </h3>
            <p>Smart adaptive system for any terrain</p>
          </div>
          <div className={styles.techCard}>
            <h3>
              ECO
              <br />
              POWER
            </h3>
            <p>Hybrid technology with zero compromise</p>
          </div>
          <div className={styles.techCard}>
            <h3>
              DIGITAL
              <br />
              COCKPIT
            </h3>
            <p>Immersive driver experience</p>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2>READY FOR THE NEXT LEVEL?</h2>
          <p>Schedule your exclusive test drive today</p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              BOOK CONSULTATION
            </button>
            <button className={`${styles.ctaButton} ${styles.secondary}`}>
              CALL: 1-800-SOFTROOTS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoScroll;
