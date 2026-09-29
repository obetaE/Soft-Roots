"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import NewsletterForm from "@/components/NewsletterForm/NewsletterForm";
import ui from "@/components/ui/ui.module.css";
import styles from "./blog.module.css";

export default function BlogIndex({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const listRef = useRef(null);
  const filteredPosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  // On narrow screens the sidebar sits below the list, so bring the filtered results into view.
  const showCategory = (category) => {
    setActiveCategory(category);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    listRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className={`${ui.container} ${styles.layout}`}>
      <div ref={listRef} className={styles.main}>
        <div className={styles.filters} role="group" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="visually-hidden" role="status">
          {`${filteredPosts.length} ${filteredPosts.length === 1 ? "article" : "articles"} shown`}
        </p>

        <ul className={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <article className={`${ui.card} ${styles.postCard}`}>
                <div className={styles.postImage}>
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1400px) 440px, (min-width: 1025px) 30vw, (min-width: 700px) 50vw, 100vw"
                  />
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={ui.tag}>{post.category}</span>
                    <time dateTime={post.isoDate} className={styles.postDate}>
                      {post.date}
                    </time>
                  </div>
                  <h2 className={styles.cardTitle}>
                    <Link href={`/blog/${post.id}`} className={styles.stretchedLink}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.postAuthor}>By {post.author}</span>
                    <span className={styles.readMore} aria-hidden="true">
                      Read More →
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <aside className={styles.sidebar}>
        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>About Our Journal</h2>
          <p className={styles.sidebarText}>
            Explore the world of luxury trucks through our curated articles on design, technology, and the
            heritage that defines the Soft Roots experience.
          </p>
        </div>

        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>Recent Posts</h2>
          <ul className={styles.recentPosts}>
            {posts.slice(0, 3).map((post) => (
              <li key={post.id} className={styles.recentPost}>
                <Image src={post.image} alt="" width={72} height={72} className={styles.recentImage} />
                <div>
                  <h3 className={styles.recentTitle}>
                    <Link href={`/blog/${post.id}`} className={styles.stretchedLink}>
                      {post.title}
                    </Link>
                  </h3>
                  <time dateTime={post.isoDate} className={styles.recentDate}>
                    {post.date}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>Categories</h2>
          <ul className={styles.categoryList}>
            {categories.slice(1).map((category) => (
              <li key={category}>
                <button type="button" className={styles.categoryLink} onClick={() => showCategory(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${ui.card} ${styles.sidebarCard}`}>
          <h2 className={styles.sidebarTitle}>Stay Updated</h2>
          <p className={styles.sidebarText}>
            Subscribe to our newsletter for the latest updates and exclusive content.
          </p>
          <NewsletterForm stacked />
        </div>
      </aside>
    </div>
  );
}
