import Image from "next/image";
import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import { site } from "@/libs/site";
import ui from "@/components/ui/ui.module.css";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact",
  description:
    "Talk to a Soft Roots luxury consultant, visit our Detroit showroom, or send us a message. We respond within 24 hours.",
  alternates: { canonical: "/contact" },
};

const icons = {
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const contactCards = [
  {
    title: "Email",
    icon: icons.email,
    lines: [
      { label: site.email.info, href: `mailto:${site.email.info}` },
      { label: site.email.support, href: `mailto:${site.email.support}` },
    ],
  },
  {
    title: "Phone",
    icon: icons.phone,
    lines: [
      { label: site.phone.display, href: site.phone.href },
      { label: site.phone.numeric, href: site.phone.href },
    ],
  },
  {
    title: "Visit Us",
    icon: icons.location,
    lines: [{ label: site.address.street }, { label: site.address.city }, { label: site.address.country }],
  },
];

export default function ContactPage() {
  return (
    <div className={ui.page}>
      <VideoBackground />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <h1 className={ui.heroTitle}>Contact Us</h1>
          <p className={ui.heroSubtitle}>Your Gateway to Luxury Truck Ownership</p>
        </div>
      </section>

      <section aria-labelledby="contact-title" className={ui.band}>
        <div className={`${ui.container} ${styles.layout}`}>
          <ul className={styles.infoGrid} aria-label="Contact details">
            {contactCards.map((card) => (
              <li key={card.title} className={`${ui.card} ${styles.infoCard}`}>
                <span className={styles.infoIcon}>{card.icon}</span>
                <h2 className={styles.infoTitle}>{card.title}</h2>
                {card.lines.map((line) => (
                  <p key={line.label}>{line.href ? <a href={line.href}>{line.label}</a> : line.label}</p>
                ))}
              </li>
            ))}
          </ul>

          <div className={`${ui.card} ${styles.formCard}`}>
            <h2 id="contact-title" className={styles.formTitle}>
              Send us a message
            </h2>
            <p className={styles.formSubtitle}>Our team will respond within 24 hours</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="showroom-title" className={`${ui.band} ${ui.bandAlt}`}>
        <div className={`${ui.container} ${styles.showroom}`}>
          <Image
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className={styles.showroomImage}
          />
          <div className={styles.showroomOverlay}>
            <h2 id="showroom-title">Visit Our Showroom</h2>
            <p>
              Experience our luxury trucks in person at {site.address.street}, {site.address.city}.
            </p>
            <a
              href={site.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${ui.btn} ${ui.btnOutline}`}
            >
              Get Directions
              <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
