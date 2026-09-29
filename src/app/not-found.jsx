import Link from "next/link";
import ui from "@/components/ui/ui.module.css";
import styles from "./status.module.css";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className={ui.page}>
      <section className={`${ui.hero} ${styles.status}`}>
        <div className={ui.heroCard}>
          <span className={ui.eyebrow}>Error 404</span>
          <h1 className={ui.heroTitle}>Off the Map</h1>
          <p className={ui.heroSubtitle}>The page you’re looking for has moved or never existed.</p>
          <div className={`${ui.ctaButtons} ${styles.actions}`}>
            <Link href="/" className={`${ui.btn} ${ui.btnPrimary}`}>
              Back to Home
            </Link>
            <Link href="/shop" className={`${ui.btn} ${ui.btnOutline}`}>
              Browse the Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
