import Link from "next/link";
import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import { getProduct } from "@/libs/products";
import ui from "@/components/ui/ui.module.css";
import BookingForm from "./BookingForm";
import styles from "./book.module.css";

export const metadata = {
  title: "Book a Test Drive",
  description:
    "Schedule a private Soft Roots test drive at a showroom near you and experience the Fjord F-100 Heritage firsthand.",
  alternates: { canonical: "/book" },
};

const steps = [
  {
    title: "Personalized Consultation",
    text: "Begin with a private consultation to understand your preferences and requirements.",
  },
  {
    title: "Vehicle Walkthrough",
    text: "Our specialists will showcase the unique features and craftsmanship of your selected model.",
  },
  {
    title: "Guided Test Drive",
    text: "Experience the vehicle’s performance on a route tailored to demonstrate its capabilities.",
  },
  {
    title: "Post-Drive Discussion",
    text: "After your drive, we’ll answer all your questions with no pressure to purchase.",
  },
];

const flagship = getProduct("fjord-f100");

export default function BookPage() {
  return (
    <div className={ui.page}>
      <VideoBackground />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <h1 className={ui.heroTitle}>Experience Luxury</h1>
          <p className={ui.heroSubtitle}>Book Your Private Test Drive Today</p>
        </div>
      </section>

      <section aria-labelledby="booking-title" className={ui.band}>
        <div className={`${ui.container} ${styles.layout}`}>
          <div>
            <h2 id="booking-title" className={ui.sectionTitle}>
              Schedule Your Test Drive
            </h2>
            <p className={styles.intro}>Experience the pinnacle of luxury truck engineering firsthand</p>
            <BookingForm />
          </div>

          <aside aria-labelledby="model-title" className={`${ui.card} ${styles.modelCard}`}>
            <div className={styles.buildPromo}>
              <span className={ui.eyebrow}>New · 3D Configurator</span>
              <h3>Build yours before you drive it</h3>
              <p>
                Choose paint, wheels, stance, powertrain and accessories in our interactive 3D studio, then bring your
                build to the test drive.
              </p>
              <Link href="/build" className={`${ui.btn} ${ui.btnPrimary}`}>
                Open the Configurator
              </Link>
            </div>
            <div className={styles.modelInfo}>
              <h3 id="model-title">Fjord F-100 Heritage</h3>
              <p>Our most-configured truck, ready to drive</p>
              <ul className={ui.featureList}>
                {[...flagship.features, "Serviced and warranted by our studio"].map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="experience-title" className={`${ui.band} ${ui.bandAlt}`}>
        <div className={ui.container}>
          <h2 id="experience-title" className={`${ui.sectionTitle} ${ui.sectionTitleCenter}`}>
            The Soft Roots Test Drive Experience
          </h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={`${ui.card} ${styles.step}`}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        title="Questions before your test drive?"
        text="Our luxury consultants are ready to help"
        action={{ href: "/contact", label: "Contact a Consultant" }}
      />
    </div>
  );
}
