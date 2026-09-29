"use client";
import Link from "next/link";
import { useEffect } from "react";
import ui from "@/components/ui/ui.module.css";
import styles from "./status.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={ui.page}>
      <section className={`${ui.hero} ${styles.status}`}>
        <div className={ui.heroCard}>
          <span className={ui.eyebrow}>Something went wrong</span>
          <h1 className={ui.heroTitle}>Unexpected Detour</h1>
          <p className={ui.heroSubtitle}>We hit a problem loading this page. Please try again.</p>
          <div className={`${ui.ctaButtons} ${styles.actions}`}>
            <button type="button" onClick={() => reset()} className={`${ui.btn} ${ui.btnPrimary}`}>
              Try Again
            </button>
            <Link href="/" className={`${ui.btn} ${ui.btnOutline}`}>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
