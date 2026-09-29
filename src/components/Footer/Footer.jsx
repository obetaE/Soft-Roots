import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";
import { navLinks, site } from "@/libs/site";
import styles from "./Footer.module.css";

const footerLinks = [
  ...navLinks,
  { path: "/build", title: "Build Your Truck" },
  { path: "/book", title: "Book a Test Drive" },
  { path: "/cart", title: "Cart" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <div className={styles.newsletterCopy}>
          <h2 className={styles.newsletterTitle}>Join the Soft Roots Circle</h2>
          <p>Model reveals, private events, and stories from the workshop, delivered monthly.</p>
        </div>
        <NewsletterForm />
      </div>

      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Soft Roots
          </Link>
          <p>{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.list}>
            {footerLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.list}>
            <a href={site.phone.href}>{site.phone.numeric}</a>
            <a href={`mailto:${site.email.info}`}>{site.email.info}</a>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
              {site.address.street}
              <br />
              {site.address.city}
            </a>
          </address>
        </div>

        <div>
          <h2 className={styles.heading}>Showroom Hours</h2>
          <dl className={styles.hours}>
            {site.hours.map((entry) => (
              <div key={entry.days}>
                <dt>{entry.days}</dt>
                <dd>{entry.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Soft Roots. All rights reserved.</p>
        <p>
          A portfolio concept. Soft Roots is a fictional dealership. <Link href="/terms">Terms &amp; Credits</Link>
        </p>
      </div>
    </footer>
  );
}
