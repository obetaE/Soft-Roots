import Link from "next/link";
import ui from "@/components/ui/ui.module.css";
import styles from "./terms.module.css";

export const metadata = {
  title: "Terms & Credits",
  description:
    "Soft Roots is a fictional dealership created as a portfolio project. Read the terms of use, trademark notice and credits.",
  alternates: { canonical: "/terms" },
};

const credits = [
  {
    item: "3D pickup truck model",
    source: "“Pickup Truck” by Quaternius, via Poly Pizza",
    license: "CC0 1.0 (public domain)",
    href: "https://poly.pizza/m/qn4grQgHm8",
  },
  {
    item: "Photography",
    source: "Various photographers on Unsplash",
    license: "Unsplash License",
    href: "https://unsplash.com/license",
  },
  {
    item: "Background video",
    source: "Pixabay",
    license: "Pixabay Content License",
    href: "https://pixabay.com/service/license-summary/",
  },
  {
    item: "Typefaces",
    source: "Geist by Vercel and Playfair Display by Claus Eggers Sørensen",
    license: "SIL Open Font License 1.1",
    href: "https://openfontlicense.org",
  },
];

export default function TermsPage() {
  return (
    <div className={ui.page}>
      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <span className={ui.eyebrow}>Last updated September 2026</span>
          <h1 className={ui.heroTitle}>Terms &amp; Credits</h1>
          <p className={ui.heroSubtitle}>The fine print behind a fictional dealership</p>
        </div>
      </section>

      <section className={ui.band}>
        <article className={`${ui.card} ${styles.content}`}>
          <h2>A portfolio project</h2>
          <p>
            Soft Roots is a fictional luxury truck dealership created as a web development portfolio piece. It is not a
            real business, and nothing on this site is for sale.
          </p>
          <ul>
            <li>No orders, payments, test drives or reservations are processed.</li>
            <li>
              The booking, contact and newsletter forms only demonstrate the interface. Nothing you type is sent or
              stored.
            </li>
            <li>People, prices, specifications, addresses, phone numbers and email addresses are invented.</li>
          </ul>

          <h2>Vehicle names and trademarks</h2>
          <p>
            Vehicles on this site are inspired by real-world trucks and presented under parody names. All trademarks,
            brand names and vehicle designs belong to their respective owners. Soft Roots is not affiliated with,
            sponsored by or endorsed by any vehicle manufacturer.
          </p>

          <h2>Your data</h2>
          <p>
            This site has no accounts, analytics or advertising trackers. Your cart and truck configurations are saved
            only in your own browser’s local storage, and you can clear them at any time by clearing your site data.
          </p>

          <h2>Credits and licenses</h2>
          <div className={styles.tableWrap}>
            <table className={styles.credits}>
              <thead>
                <tr>
                  <th scope="col">Asset</th>
                  <th scope="col">Source</th>
                  <th scope="col">License</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((credit) => (
                  <tr key={credit.item}>
                    <th scope="row">{credit.item}</th>
                    <td>{credit.source}</td>
                    <td>
                      <a href={credit.href} target="_blank" rel="noopener noreferrer">
                        {credit.license}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>No warranty</h2>
          <p>
            This site is provided as-is for demonstration purposes. Content may change at any time without notice.
          </p>

          <p className={styles.back}>
            <Link href="/">← Back to Home</Link>
          </p>
        </article>
      </section>
    </div>
  );
}
