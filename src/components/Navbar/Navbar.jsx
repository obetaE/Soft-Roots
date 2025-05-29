"use client";
import React from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About Us" },
    { path: "/shop", title: "Shop" },
    { path: "/cart", title: "Cart" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            SOFT ROOTS
          </Link>

          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.link} ${
                  pathName === link.path && styles.active
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className={styles.ctaContainer}>
            <button className={styles.ctaButton}>BOOK A TEST DRIVE</button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className={styles.mobileToggle} onClick={() => setOpen(!open)}>
            <div className={`${styles.hamburger} ${open ? styles.open : ""}`} />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
        <div className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.mobileLink} ${
                pathName === link.path && styles.active
              }`}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <button className={styles.mobileCta}>BOOK A TEST DRIVE</button>
        </div>
      </div>
    </>
  );
}
