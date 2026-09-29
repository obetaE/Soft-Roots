"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useCart } from "@/components/cart/useCart";
import { navLinks } from "@/libs/site";
import styles from "./Navbar.module.css";

const subscribeToScroll = (callback) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};

const isActive = (pathname, path) =>
  path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.39c.51 0 .96.35 1.09.84l.38 1.44m0 0L6.75 12h10.5l2.25-6.72H5.11ZM6.75 12 5.5 16.5h13M9 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 10, () => false);
  const { count, ready } = useCart();

  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const showBadge = ready && count > 0;

  return (
    <header>
      <nav aria-label="Main" className={`${styles.navbar} ${scrolled || open ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={close}>
            Soft Roots
          </Link>

          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.path);
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <Link
              href="/cart"
              className={`${styles.cartLink} ${pathname === "/cart" ? styles.active : ""}`}
              aria-label={showBadge ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
              onClick={close}
            >
              <CartIcon />
              {showBadge && (
                <span className={styles.badge} aria-hidden="true">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <Link href="/build" className={styles.ctaButton}>
              Build Your Truck
            </Link>
            <button
              type="button"
              className={`${styles.menuButton} ${open ? styles.open : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={styles.hamburger} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropVisible : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
      >
        <ul className={styles.mobileNav}>
          {navLinks.map((link) => {
            const active = isActive(pathname, link.path);
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`${styles.mobileLink} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/build" className={styles.mobileCta} onClick={close}>
          Build Your Truck
        </Link>
      </nav>
    </header>
  );
}
