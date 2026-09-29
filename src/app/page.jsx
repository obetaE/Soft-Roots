import Image from "next/image";
import Link from "next/link";
import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import { getProduct } from "@/libs/products";
import { site } from "@/libs/site";
import ui from "@/components/ui/ui.module.css";
import styles from "./home.module.css";

export const metadata = {
  alternates: { canonical: "/" },
};

const values = [
  { title: "Curated Inventory", text: "Only trucks we would happily drive ourselves" },
  { title: "In-House Customization", text: "Paint, suspension and interiors finished under our roof" },
  { title: "Straight Answers", text: "Transparent pricing with no showroom pressure" },
];

const technology = [
  { title: ["Custom", "Paint"], text: "Two-tone finishes mixed and sprayed in our booth" },
  { title: ["Suspension", "Lab"], text: "Lift kits and all-terrain setups tuned per truck" },
  { title: ["Digital", "Cockpit"], text: "Modern infotainment retrofitted into classic cabs" },
];

const flagship = getProduct("fjord-f100");

export default function HomePage() {
  return (
    <div className={`${ui.page} ${ui.snapPage}`}>
      <VideoBackground scrub />

      <section className={ui.snapSection}>
        <div className={styles.heroCard}>
          <h1 className={styles.heroTitle}>{site.name}</h1>
          <p className={styles.heroSubtitle}>{site.tagline}</p>
          <a href="#values" className={styles.scrollIndicator} aria-label="Scroll to our values">
            <span />
          </a>
        </div>
      </section>

      <section id="values" aria-labelledby="values-title" className={ui.snapSection}>
        <div className={styles.contentCard}>
          <h2 id="values-title">Our Values</h2>
          <ol className={styles.valuesGrid}>
            {values.map((value, index) => (
              <li key={value.title} className={styles.valueItem}>
                <span className={styles.valueNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="model-title" className={ui.snapSection}>
        <article className={styles.modelCard}>
          <div className={styles.modelInfo}>
            <span className={styles.modelBadge}>Now Configurable</span>
            <h2 id="model-title">Fjord F-100 Heritage</h2>
            <p>Design yours in 3D, then drive it home</p>
            <ul className={ui.featureList}>
              {flagship.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href="/build" className={`${ui.btn} ${ui.btnPrimary}`}>
              Build Your Own
            </Link>
          </div>
          <div className={styles.modelVisual}>
            <Image
              src={flagship.image}
              alt="The Fjord F-100 Heritage at the Soft Roots showroom"
              fill
              sizes="(min-width: 768px) 500px, 100vw"
            />
            <span className={styles.yearBadge}>2026</span>
          </div>
        </article>
      </section>

      <section aria-labelledby="tech-title" className={ui.snapSection}>
        <h2 id="tech-title" className="visually-hidden">
          Technology
        </h2>
        <ul className={styles.techGrid}>
          {technology.map((item) => (
            <li key={item.text} className={styles.techCard}>
              <h3>
                {item.title[0]}
                <br />
                {item.title[1]}
              </h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaSection
        title="Ready for the next level?"
        text="Schedule your exclusive test drive today"
        action={{ href: "/book", label: "Book Consultation" }}
        className={`${ui.snapSection} ${ui.ctaCard}`}
      />
    </div>
  );
}
