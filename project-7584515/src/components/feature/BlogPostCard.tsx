import { Link } from "react-router-dom";

/**
 * WordPress-ready blog post card.
 * Maps to WordPress REST API post structure:
 *   [POST_IMAGE]   → featuredImage
 *   [POST_TITLE]   → title (rendered HTML string)
 *   [POST_EXCERPT] → excerpt (rendered HTML string)
 *   [POST_DATE]    → date (ISO string)
 *   [POST_URL]     → slug → /blog/{slug}
 */
export type BlogCardPost = {
  id: number;
  slug: string;                       // [POST_URL] fragment
  title: { rendered: string };        // [POST_TITLE]
  excerpt: { rendered: string };      // [POST_EXCERPT]
  date: string;                       // [POST_DATE]
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;             // [POST_IMAGE]
    }>;
  };
};

type Props = {
  post: BlogCardPost;
  delay?: number;
  isVisible?: boolean;
};

export default function BlogPostCard({ post, delay = 0, isVisible = true }: Props) {
  // [POST_IMAGE]
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // [POST_URL]
  const postUrl = `/blog/${post.slug}`;
  // [POST_DATE]
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        borderColor: "#E3DDD6",
        backgroundColor: "#FFFFFF",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* [POST_IMAGE] */}
      <Link to={postUrl} className="block w-full h-52 overflow-hidden bg-stone-100 flex-shrink-0">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={post.title.rendered.replace(/<[^>]+>/g, "")}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#F0EDE8" }}>
            <i className="ri-image-line text-3xl" style={{ color: "#C5B08A" }}></i>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-6">
        {/* [POST_DATE] */}
        <span className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#9A9692" }}>
          {formattedDate}
        </span>

        {/* [POST_TITLE] */}
        <h3
          className="text-lg font-bold mb-3 leading-snug group-hover:text-stone-600 transition-colors"
          style={{ fontFamily: "'Fugaz One', cursive", color: "#1C1C1C" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* [POST_EXCERPT] */}
        <div
          className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
          style={{ color: "#6B6361" }}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        {/* [POST_URL] */}
        <Link
          to={postUrl}
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap"
          style={{ color: "#1C1C1C" }}
        >
          Read Article <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </article>
  );
}
