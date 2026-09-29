import CtaSection from "@/components/CtaSection/CtaSection";
import VideoBackground from "@/components/VideoBackground/VideoBackground";
import { blogCategories, blogPosts, toIsoDate } from "@/libs/blogData";
import ui from "@/components/ui/ui.module.css";
import BlogIndex from "./BlogIndex";

export const metadata = {
  title: "Journal",
  description: "Insights on luxury, innovation and the open road from the Soft Roots team.",
  alternates: { canonical: "/blog" },
};

// Full article bodies stay on the server; the client list only needs summaries.
const summaries = blogPosts.map(({ id, title, excerpt, date, author, category, image }) => ({
  id,
  title,
  excerpt,
  date,
  isoDate: toIsoDate(date),
  author,
  category,
  image,
}));

export default function BlogPage() {
  return (
    <div className={ui.page}>
      <VideoBackground />

      <section className={ui.hero}>
        <div className={ui.heroCard}>
          <h1 className={ui.heroTitle}>Soft Roots Journal</h1>
          <p className={ui.heroSubtitle}>Insights on Luxury, Innovation, and the Open Road</p>
        </div>
      </section>

      <section aria-label="Articles" className={ui.band}>
        <BlogIndex posts={summaries} categories={blogCategories} />
      </section>

      <CtaSection />
    </div>
  );
}
