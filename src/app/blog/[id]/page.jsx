import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import { blogPosts, getPost, toIsoDate } from "@/libs/blogData";
import { site } from "@/libs/site";
import ui from "@/components/ui/ui.module.css";
import styles from "../blog.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) return {};

  const path = `/blog/${post.id}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.excerpt,
      publishedTime: toIsoDate(post.date),
      authors: [post.author],
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = getPost(id);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.id}`;
  const isoDate = toIsoDate(post.date);

  // Prefer the same category, then fill with other recent articles.
  const others = blogPosts.filter((candidate) => candidate.id !== post.id);
  const related = [
    ...others.filter((candidate) => candidate.category === post.category),
    ...others.filter((candidate) => candidate.category !== post.category),
  ].slice(0, 3);

  const shareLinks = [
    {
      label: "X",
      href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: new URL(post.image, site.url).href,
    datePublished: isoDate,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  return (
    <div className={ui.page}>
      <VideoBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <span className={ui.eyebrow}>{post.category}</span>
          <h1 className={`${ui.heroTitle} ${styles.articleTitle}`}>{post.title}</h1>
          <p className={ui.heroSubtitle}>
            By {post.author} · <time dateTime={isoDate}>{post.date}</time>
          </p>
        </div>
      </section>

      <article className={ui.band}>
        <div className={styles.article}>
          <div className={styles.featuredImage}>
            <Image
              src={post.image}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1140px) 1100px, 100vw"
            />
          </div>

          <div className={`${ui.card} ${styles.articleBody}`}>
            {/* Trusted, first-party HTML from src/libs/blogData.js. Never render user input this way. */}
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.content }} />

            <footer className={styles.articleFooter}>
              <div className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(post.author)}
                </span>
                <div>
                  <p className={styles.authorName}>{post.author}</p>
                  <p className={styles.authorRole}>Soft Roots Journal</p>
                </div>
              </div>

              <div>
                <h2 className={styles.shareTitle}>Share this article</h2>
                <ul className={styles.shareLinks}>
                  {shareLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ui.btn} ${ui.btnOutline} ${styles.shareButton}`}
                      >
                        {link.label}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </footer>

            <Link href="/blog" className={styles.backLink}>
              ← Back to Journal
            </Link>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className={`${ui.band} ${ui.bandAlt}`}>
        <div className={ui.container}>
          <h2 id="related-title" className={`${ui.sectionTitle} ${ui.sectionTitleCenter}`}>
            Related Articles
          </h2>
          <ul className={styles.relatedGrid}>
            {related.map((article) => (
              <li key={article.id} className={`${ui.card} ${styles.relatedCard}`}>
                <div className={styles.relatedImage}>
                  <Image src={article.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" />
                </div>
                <div className={styles.relatedContent}>
                  <span className={ui.tag}>{article.category}</span>
                  <h3>
                    <Link href={`/blog/${article.id}`} className={styles.stretchedLink}>
                      {article.title}
                    </Link>
                  </h3>
                  <span className={styles.readMore} aria-hidden="true">
                    Read Article →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
