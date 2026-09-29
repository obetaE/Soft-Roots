import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import ui from "@/components/ui/ui.module.css";
import CartView from "./CartView";

export const metadata = {
  title: "Your Cart",
  description: "Review your Soft Roots selection before checkout.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <div className={ui.page}>
      <VideoBackground />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <h1 className={ui.heroTitle}>Your Luxury Cart</h1>
          <p className={ui.heroSubtitle}>Refined Selection Awaits Your Approval</p>
        </div>
      </section>

      <section aria-label="Shopping cart" className={ui.band}>
        <CartView />
      </section>

      <CtaSection
        title="Need personal assistance?"
        text="Our luxury consultants are ready to help"
        action={{ href: "/contact", label: "Schedule Consultation" }}
      />
    </div>
  );
}
