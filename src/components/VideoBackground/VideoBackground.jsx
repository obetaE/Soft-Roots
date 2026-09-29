"use client";
import { useEffect, useRef } from "react";
import { heroVideo } from "@/libs/site";
import styles from "./VideoBackground.module.css";

// Fraction of the remaining distance covered each frame when scrubbing.
const SCRUB_EASING = 0.12;

const scrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
};

/**
 * Fixed full-screen background video.
 * With `scrub`, page scroll position drives playback instead of time.
 * The source is attached after hydration so the poster paints first, and it is
 * skipped entirely for reduced-motion or data-saver users.
 */
export default function VideoBackground({ scrub = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!video || reduceMotion || navigator.connection?.saveData) return;

    let frame = 0;
    let duration = 0;
    let current = 0;
    let target = 0;

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.01) {
        current = target;
        frame = 0;
      } else {
        current += diff * SCRUB_EASING;
        frame = requestAnimationFrame(tick);
      }
      // Skipping while a seek is in flight avoids queueing seeks the decoder can't keep up with.
      if (!video.seeking) video.currentTime = current;
    };

    const handleScroll = () => {
      if (!duration) return;
      target = scrollProgress() * duration;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const handleMetadata = () => {
      duration = video.duration;
      current = target = scrollProgress() * duration;
      video.currentTime = current;
    };

    if (scrub) {
      video.addEventListener("loadedmetadata", handleMetadata);
      window.addEventListener("scroll", handleScroll, { passive: true });
      video.preload = "auto";
    } else {
      video.loop = true;
      video.autoplay = true;
    }

    video.src = heroVideo.src;
    video.load();
    if (!scrub) video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", handleMetadata);
      window.removeEventListener("scroll", handleScroll);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [scrub]);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      poster={heroVideo.poster}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
