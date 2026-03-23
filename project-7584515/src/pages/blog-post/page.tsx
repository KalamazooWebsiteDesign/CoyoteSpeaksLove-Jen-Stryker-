import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";
import { getPostBySlug, getPosts } from "../../lib/wp";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  date: string;
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url: string;
    }>;
  };
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    getPostBySlug(slug)
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    getPosts(4)
      .then((data) => {
        const filtered = data.filter((p: WPPost) => p.slug !== slug).slice(0, 3);
        setRelatedPosts(filtered);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}
      >
        <Navigation />
        <div className="pt-40 pb-20 text-center" style={{ color: "#386FA4" }}>
          Loading post...
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-screen"
        style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}
      >
        <Navigation />
        <div className="pt-40 pb-20 px-6">
          <div
            className="max-w-3xl mx-auto bg-white rounded-2xl border p-8 text-center"
            style={{ borderColor: "#d0eeff", color: "#386FA4" }}
          >
            <h1
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Post not found
            </h1>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg text-white"
              style={{ backgroundColor: "#133C55" }}
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}
    >
      <Navigation />

      {/* Hero */}
      <section
        className="pt-32 pb-16"
        style={{
          background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
          >
            Writer&apos;s Hub
          </div>

          <h1
            className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Fugaz One', cursive" }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <p className="text-sm" style={{ color: "#d0eeff" }}>
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="bg-white rounded-3xl border shadow-lg overflow-hidden"
            style={{ borderColor: "#d0eeff" }}
          >
            {image && (
              <div className="p-8 pb-0">
                <img
                  src={image}
                  alt={post.title.rendered}
                  className="w-full max-w-2xl mx-auto h-auto max-h-[520px] object-cover rounded-2xl"
                />
              </div>
            )}

            <div className="p-8 lg:p-12">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: "#386FA4" }}
                >
                  <i className="ri-arrow-left-line"></i>
                  Back to Blog
                </Link>

                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                >
                  Blog Post
                </span>
              </div>

              {post.excerpt?.rendered && (
                <div
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: "#386FA4" }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              )}

              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              <style>{`
                .blog-content {
                  color: #386FA4;
                  line-height: 1.8;
                  font-size: 1.05rem;
                }

                .blog-content h1,
                .blog-content h2,
                .blog-content h3,
                .blog-content h4,
                .blog-content h5,
                .blog-content h6 {
                  color: #133C55;
                  font-family: 'Fugaz One', cursive;
                  line-height: 1.2;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }

                .blog-content p {
                  margin-bottom: 1.25rem;
                }

                .blog-content img {
                  width: 100%;
                  height: auto;
                  border-radius: 1rem;
                  margin: 1.5rem 0;
                }

                .blog-content a {
                  color: #386FA4;
                  text-decoration: underline;
                }

                .blog-content ul,
                .blog-content ol {
                  margin: 1rem 0 1.25rem 1.5rem;
                }

                .blog-content li {
                  margin-bottom: 0.5rem;
                }

                .blog-content blockquote {
                  border-left: 4px solid #84D2F6;
                  padding-left: 1rem;
                  margin: 1.5rem 0;
                  color: #133C55;
                  font-style: italic;
                }
              `}</style>
            </div>
          </div>

          {/* Keep Reading */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <div
                  className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
                  style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                >
                  Keep Reading
                </div>
                <h2
                  className="text-3xl lg:text-4xl font-bold"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  More from the Writer&apos;s Hub
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => {
                  const relatedImage =
                    related._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

                  return (
                    <article
                      key={related.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md border"
                      style={{ borderColor: "#d0eeff" }}
                    >
                      {relatedImage && (
                        <img
                          src={relatedImage}
                          alt={related.title.rendered}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      <div className="p-6">
                        <p className="text-xs mb-2" style={{ color: "#84BFE0" }}>
                          {new Date(related.date).toLocaleDateString()}
                        </p>

                        <h3
                          className="text-xl font-bold mb-3"
                          style={{
                            fontFamily: "'Fugaz One', cursive",
                            color: "#133C55",
                          }}
                          dangerouslySetInnerHTML={{ __html: related.title.rendered }}
                        />

                        <div
                          className="text-sm mb-4"
                          style={{ color: "#386FA4" }}
                          dangerouslySetInnerHTML={{ __html: related.excerpt?.rendered || "" }}
                        />

                        <Link
                          to={`/blog/${related.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-bold"
                          style={{ color: "#386FA4" }}
                        >
                          Read More <i className="ri-arrow-right-line"></i>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}