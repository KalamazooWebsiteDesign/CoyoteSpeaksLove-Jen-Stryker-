import { Link } from "react-router-dom";

export type BlogCardPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

type Props = {
  post: BlogCardPost;
  delay?: number;
  isVisible?: boolean;
};

export default function BlogPostCard({ post, delay = 0, isVisible = true }: Props) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const postUrl = `/blog/${post.slug}`;
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
        borderColor: "#d0eeff",
        backgroundColor: "#FFFFFF",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Link to={postUrl} className="block w-full h-52 overflow-hidden bg-blue-50 flex-shrink-0">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={post.title.rendered.replace(/<[^>]+>/g, "")}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#d0eeff" }}>
            <i className="ri-image-line text-3xl" style={{ color: "#84D2F6" }} />
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <span className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#84D2F6" }}>
          {formattedDate}
        </span>

        <h3
          className="text-lg font-bold mb-3 leading-snug group-hover:text-[#386FA4] transition-colors"
          style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div
          className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
          style={{ color: "#386FA4" }}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <Link
          to={postUrl}
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors whitespace-nowrap"
          style={{ color: "#133C55" }}
        >
          Read Article <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </article>
  );
}
