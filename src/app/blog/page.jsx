"use client";
import styles from "./blog.module.css";
import { useState } from "react";
import Link from "next/link";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Technology", "Design", "Heritage", "Events"];

  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Luxury Truck Interiors",
      excerpt:
        "Discover how we blend traditional craftsmanship with modern technology to create unparalleled comfort.",
      date: "May 15, 2024",
      author: "James Wilson",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Innovative Suspension Systems Explained",
      excerpt:
        "A deep dive into our smart adaptive suspension technology that conquers any terrain with elegance.",
      date: "April 28, 2024",
      author: "Sarah Thompson",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "The Heritage of American Truck Craftsmanship",
      excerpt:
        "Exploring the rich history behind our manufacturing techniques and design philosophy.",
      date: "April 10, 2024",
      author: "Michael Rodriguez",
      category: "Heritage",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Soft Roots at Detroit Auto Show 2024",
      excerpt:
        "Highlights from our showcase event where we unveiled the new Pioneer Edition to critical acclaim.",
      date: "March 22, 2024",
      author: "Emily Chen",
      category: "Events",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Sustainable Luxury: Our Eco-Power Initiative",
      excerpt:
        "How we're redefining performance with environmentally conscious engineering.",
      date: "March 5, 2024",
      author: "David Kim",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1549399542-7e7f8d8c8d0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "The Art of Customization",
      excerpt:
        "Personalizing your Soft Roots truck to reflect your unique style and preferences.",
      date: "February 18, 2024",
      author: "Olivia Parker",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className={styles.container}>
      <video
        className={styles.videoBackground}
        src="https://cdn.pixabay.com/video/2024/09/09/230471_tiny.mp4"
        muted
        playsInline
        loop
        autoPlay
      />

      {/* Hero Section */}
      <section className={`${styles.heroSection} ${styles.section}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>SOFT ROOTS JOURNAL</h1>
          <p className={styles.heroSubtitle}>
            Insights on Luxury, Innovation, and the Open Road
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className={styles.blogSection}>
        <div className={styles.blogContainer}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Category Filter */}
            <div className={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${
                    activeCategory === category ? styles.active : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <div
                    className={styles.postImage}
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.postCategory}>
                        {post.category}
                      </span>
                      <span className={styles.postDate}>{post.date}</span>
                    </div>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postFooter}>
                      <span className={styles.postAuthor}>
                        By {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.id}`}
                        className={styles.readMore}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button className={styles.paginationButton}>Previous</button>
              <span className={styles.pageNumber}>Page 1 of 2</span>
              <button className={styles.paginationButton}>Next</button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* About Section */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>About Our Journal</h3>
              <p className={styles.sidebarText}>
                Explore the world of luxury trucks through our curated articles
                on design, technology, and the heritage that defines the Soft
                Roots experience.
              </p>
            </div>

            {/* Recent Posts */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Recent Posts</h3>
              <ul className={styles.recentPosts}>
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.id} className={styles.recentPostItem}>
                    <div
                      className={styles.recentPostImage}
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div>
                      <h4 className={styles.recentPostTitle}>{post.title}</h4>
                      <span className={styles.recentPostDate}>{post.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Categories</h3>
              <ul className={styles.categoriesList}>
                {categories.slice(1).map((category) => (
                  <li key={category} className={styles.categoryItem}>
                    <button
                      className={styles.categoryLink}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Stay Updated</h3>
              <p className={styles.sidebarText}>
                Subscribe to our newsletter for the latest updates and exclusive
                content.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>READY TO EXPERIENCE LUXURY?</h2>
          <p>Schedule your private consultation today</p>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.primary}`}>
              BOOK A TEST DRIVE
            </button>
            <button className={`${styles.ctaButton} ${styles.secondary}`}>
              CALL NOW: 1-800-SOFTROOTS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
