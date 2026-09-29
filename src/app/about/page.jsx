import Image from "next/image";
import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import ui from "@/components/ui/ui.module.css";
import styles from "./about.module.css";

export const metadata = {
  title: "About Us",
  description:
    "From a single-bay Detroit workshop in 2010 to a luxury truck dealership with its own customization studio: the story, people and vision behind Soft Roots.",
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: "2010",
    title: "The First Bay",
    text: "Soft Roots opened as a single-bay Detroit workshop, customizing work trucks for local crews.",
  },
  {
    year: "2015",
    title: "Our First Showroom",
    text: "We moved into a restored warehouse and began selling curated trucks alongside our custom work.",
  },
  {
    year: "2020",
    title: "The Customization Studio",
    text: "An in-house paint booth and suspension lab let us finish every truck under one roof.",
  },
  {
    year: "2024",
    title: "Build It Online",
    text: "Our 3D configurator brought the studio experience to anyone with a browser.",
  },
];

const leaders = [
  {
    name: "Michael Reynolds",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Customization",
    image: "https://plus.unsplash.com/premium_photo-1661730351855-346069d20ef5?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Chen",
    role: "Design Director",
    image: "https://images.unsplash.com/photo-1615851943632-ffb942c2fceb?auto=format&fit=crop&w=400&q=80",
  },
];

const innovations = [
  { title: "Configure in 3D", text: "See every option on your truck before you commit to it" },
  { title: "One Roof", text: "Sales, paint, suspension and service in the same building" },
  { title: "Lifetime Support", text: "Servicing and upgrades for every truck we sell" },
];

export default function AboutPage() {
  return (
    <div className={`${ui.page} ${ui.snapPage}`}>
      <VideoBackground scrub />

      <section className={ui.snapSection}>
        <div className={styles.heroCard}>
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSubtitle}>The journey of Soft Roots</p>
          <a href="#history" className={styles.scrollIndicator} aria-label="Scroll to our history">
            <span />
          </a>
        </div>
      </section>

      <section id="history" aria-labelledby="history-title" className={ui.snapSection}>
        <h2 id="history-title" className="visually-hidden">
          Our history
        </h2>
        <ol className={styles.timeline}>
          {milestones.map((milestone) => (
            <li key={milestone.year} className={styles.milestone}>
              <span className={styles.year}>{milestone.year}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="leadership-title" className={ui.snapSection}>
        <div className={styles.leadership}>
          <h2 id="leadership-title" className={`${ui.sectionTitle} ${ui.sectionTitleCenter}`}>
            Leadership
          </h2>
          <ul className={styles.leaderGrid}>
            {leaders.map((leader) => (
              <li key={leader.name} className={styles.leaderCard}>
                <Image
                  src={leader.image}
                  alt={`Portrait of ${leader.name}`}
                  width={120}
                  height={120}
                  className={styles.leaderImage}
                />
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="innovation-title" className={ui.snapSection}>
        <div className={styles.innovation}>
          <h2 id="innovation-title">Why Soft Roots</h2>
          <ol className={styles.innovationGrid}>
            {innovations.map((item, index) => (
              <li key={item.title} className={styles.innovationCard}>
                <span className={styles.innovationNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        title="Join our journey"
        text="Become part of the Soft Roots legacy"
        action={{ href: "/contact", label: "Get in Touch" }}
        className={`${ui.snapSection} ${ui.ctaCard}`}
      />
    </div>
  );
}
