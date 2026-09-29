import Link from "next/link";
import { site } from "@/libs/site";
import ui from "@/components/ui/ui.module.css";

export default function CtaSection({
  title = "Ready to experience luxury?",
  text = "Schedule your private consultation today",
  action = { href: "/book", label: "Book a Test Drive" },
  className = "",
}) {
  return (
    <section className={`${ui.cta} ${className}`}>
      <div className={ui.ctaContent}>
        <h2 className={ui.ctaTitle}>{title}</h2>
        <p className={ui.ctaText}>{text}</p>
        <div className={ui.ctaButtons}>
          <Link href={action.href} className={`${ui.btn} ${ui.btnPrimary}`}>
            {action.label}
          </Link>
          <a href={site.phone.href} className={`${ui.btn} ${ui.btnOutline}`}>
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
