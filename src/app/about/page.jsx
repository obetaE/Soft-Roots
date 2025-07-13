"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./about.module.css";

const AboutPage = () => {
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
      containerRef.current.style.height = "500vh"; // 5 sections
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
          <h1 className={styles.heroTitle}>OUR STORY</h1>
          <p className={styles.heroSubtitle}>The journey of Soft Roots</p>
          <div className={styles.scrollIndicator}>
            <span></span>
          </div>
        </div>
      </section>

      {/* Section 2: History */}
      <section className={`${styles.section} ${styles.historySection}`}>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.year}>2010</div>
            <h3 className={styles.timelineTitle}>Founding Vision</h3>
            <p>
              Soft Roots was founded in a small Detroit garage with a vision to
              revolutionize luxury trucks
            </p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.year}>2015</div>
            <h3 className={styles.timelineTitle}>First Prototype</h3>
            <p>
              Our first hybrid luxury truck prototype set new industry standards
            </p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.year}>2020</div>
            <h3 className={styles.timelineTitle}>Global Recognition</h3>
            <p>
              Awarded "Most Innovative Truck Manufacturer" at the Global Auto
              Expo
            </p>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.year}>2023</div>
            <h3 className={styles.timelineTitle}>Sustainable Future</h3>
            <p>
              Launched our fully electric luxury truck line with zero emissions
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Leadership */}
      <section className={`${styles.section} ${styles.leadershipSection}`}>
        <div className={styles.leadershipGrid}>
          <div className={styles.leaderCard}>
            <div className={styles.leaderImage}></div>
            <h3>Michael Reynolds</h3>
            <p>Founder & CEO</p>
            <div className={styles.socialLinks}>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
            </div>
          </div>
          <div className={styles.leaderCard}>
            <div className={styles.leaderImage}></div>
            <h3>Sarah Johnson</h3>
            <p>Chief Engineer</p>
            <div className={styles.socialLinks}>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
            </div>
          </div>
          <div className={styles.leaderCard}>
            <div className={styles.leaderImage}></div>
            <h3>David Chen</h3>
            <p>Design Director</p>
            <div className={styles.socialLinks}>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
              <span className={styles.socialIcon}></span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Innovation */}
      <section className={`${styles.section} ${styles.innovationSection}`}>
        <div className={styles.innovationContent}>
          <h2>THE FUTURE OF MOBILITY</h2>
          <div className={styles.innovationGrid}>
            <div className={styles.innovationCard}>
              <div className={styles.innovationIcon}>01</div>
              <h3>AI-Powered Systems</h3>
              <p>Adaptive intelligence that learns your driving preferences</p>
            </div>
            <div className={styles.innovationCard}>
              <div className={styles.innovationIcon}>02</div>
              <h3>Eco Engineering</h3>
              <p>Sustainable materials and zero-emission power systems</p>
            </div>
            <div className={styles.innovationCard}>
              <div className={styles.innovationIcon}>03</div>
              <h3>Digital Integration</h3>
              <p>Seamless connectivity with your digital ecosystem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2>JOIN OUR JOURNEY</h2>
          <p>Become part of the Soft Roots legacy</p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              CAREERS
            </button>
            <button className={`${styles.ctaButton} ${styles.secondary}`}>
              INVESTOR RELATIONS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
