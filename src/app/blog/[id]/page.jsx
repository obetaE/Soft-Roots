import styles from "../blog.module.css";
import { blogPosts } from "@/libs/blogData";
import { notFound } from "next/navigation";
import Link from "next/link"

export default async function BlogPostPage({ params }) {
  const postId = await parseInt(params.id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) return notFound();

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
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <p className={styles.heroSubtitle}>
            By {post.author} • {post.date}
          </p>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className={styles.blogPostSection}>
        <div className={styles.blogPostContainer}>
          <div
            className={styles.postFeaturedImage}
            style={{ backgroundImage: `url(${post.image})` }}
          />

          <div className={styles.postContent}>
            <div className={styles.postMeta}>
              <span className={styles.postCategory}>{post.category}</span>
              <span className={styles.postDate}>{post.date}</span>
            </div>

            {/* Render HTML content safely */}
            <div
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className={styles.postFooter}>
              <div className={styles.authorInfo}>
                <div className={styles.authorAvatar} />
                <div>
                  <h4>{post.author}</h4>
                  <p>Senior Automotive Journalist</p>
                </div>
              </div>

              <div className={styles.shareSection}>
                <h4>Share this article</h4>
                <div className={styles.shareButtons}>
                  <button>Twitter</button>
                  <button>Facebook</button>
                  <button>LinkedIn</button>
                </div>
              </div>
            </div>

            <Link href="/blog" className={styles.backButton}>
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className={styles.relatedSection}>
        <h2>Related Articles</h2>
        <div className={styles.relatedGrid}>
          {blogPosts
            .filter((p) => p.id !== post.id && p.category === post.category)
            .slice(0, 3)
            .map((related) => (
              <article key={related.id} className={styles.relatedCard}>
                <div
                  className={styles.relatedImage}
                  style={{ backgroundImage: `url(${related.image})` }}
                />
                <div className={styles.relatedContent}>
                  <span className={styles.relatedCategory}>
                    {related.category}
                  </span>
                  <h3>{related.title}</h3>
                  <Link
                    href={`/blog/${related.id}`}
                    className={styles.readMore}
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
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
}
