import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import ui from "@/components/ui/ui.module.css";
import ShopCatalog from "./ShopCatalog";

export const metadata = {
  title: "Shop",
  description: "Browse Soft Roots luxury trucks, premium accessories and branded merchandise.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className={ui.page}>
      <VideoBackground />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <h1 className={ui.heroTitle}>Soft Roots Collection</h1>
          <p className={ui.heroSubtitle}>Luxury Trucks and Premium Accessories</p>
        </div>
      </section>

      <section aria-label="Products" className={ui.band}>
        <ShopCatalog />
      </section>

      <CtaSection
        title="Need personal assistance?"
        text="Our luxury consultants are ready to help"
        action={{ href: "/contact", label: "Schedule Consultation" }}
      />
    </div>
  );
}
