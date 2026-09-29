import localFont from "next/font/local";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { site } from "@/libs/site";
import "./globals.css";

// Self-hosted variable fonts (SIL OFL 1.1, licenses alongside), so builds never depend on the network.
const sans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const display = localFont({
  src: "./fonts/PlayfairDisplay-Variable.woff2",
  weight: "400 900",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["luxury trucks", "truck dealership", "truck configurator", "test drive", "Soft Roots", "Fjord F-100 Heritage"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
