import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";
import BlogPostCard, { BlogCardPost } from "../../components/feature/BlogPostCard";
import { getPosts } from "../../lib/wp";

export default function WritersHubPage() {
  const [posts, setPosts] = useState<BlogCardPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featuredPost =
    posts.find((p) => p._embedded?.["wp:featuredmedia"]?.[0]?.source_url) || posts[0];
  const gridPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <Navigation />

      {/* Hero */}
      <section
        className="pt-36 pb-16"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div
            className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
          >
            Writer&apos;s Hub
          </div>
          <h1
            className="text-5xl lg:text-7xl font-bold text-white mb-5"
            style={{ fontFamily: "'Fugaz One', cursive" }}
          >
            Resources for Writers
          </h1>
          <p className="max-w-xl mx-auto text-base" style={{ color: "#d0eeff" }}>
            Helpful tips, insights, and inspiration from Jen Stryker to enhance your writing
            journey. Updated regularly and always 100% free.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="py-24 text-center" style={{ color: "#386FA4" }}>
              <i className="ri-loader-4-line text-4xl animate-spin block mb-4" />
              <p className="text-sm tracking-wide">Loading posts&hellip;</p>
            </div>
          ) : posts.length === 0 ? (
            <div
              className="py-24 text-center rounded-2xl border"
              style={{ borderColor: "#84D2F6", backgroundColor: "#FFFFFF" }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5"
                style={{ backgroundColor: "#d0eeff" }}
              >
                <i className="ri-quill-pen-line text-3xl" style={{ color: "#386FA4" }} />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
              >
                Posts Coming Soon
              </h3>
              <p className="text-sm max-w-sm mx-auto" style={{ color: "#386FA4" }}>
                Jen&apos;s writing tips and creative insights will appear here once the blog is live.
                Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && (
                <div
                  className="mb-16 rounded-2xl border overflow-hidden bg-white"
                  style={{ borderColor: "#84D2F6" }}
                >
                  <div className="grid lg:grid-cols-2">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="block w-full h-72 lg:h-auto overflow-hidden"
                      style={{ backgroundColor: "#d0eeff" }}
                    >
                      {featuredPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                        <img
                          src={featuredPost._embedded["wp:featuredmedia"][0].source_url}
                          alt={featuredPost.title.rendered.replace(/<[^>]+>/g, "")}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="ri-image-line text-4xl" style={{ color: "#84D2F6" }} />
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-col justify-center p-10 lg:p-14">
                      <div
                        className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-5 self-start"
                        style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                      >
                        Featured Article
                      </div>
                      <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#84D2F6" }}>
                        {new Date(featuredPost.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      <h2
                        className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                        style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                        dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                      />
                      <div
                        className="text-sm leading-relaxed mb-7"
                        style={{ color: "#386FA4" }}
                        dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                      />
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold self-start transition-all duration-300 hover:-translate-y-0.5"
                        style={{ backgroundColor: "#133C55" }}
                      >
                        Read Full Article <i className="ri-arrow-right-line" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Filter chips */}
              {gridPosts.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {["All", "Writing Tips", "Creativity", "Publishing"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-xs font-semibold border cursor-pointer transition-colors"
                        style={{
                          backgroundColor: tag === "All" ? "#133C55" : "#FFFFFF",
                          color: tag === "All" ? "#FFFFFF" : "#386FA4",
                          borderColor: "#84D2F6",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
                    {gridPosts.map((post, i) => (
                      <BlogPostCard key={post.id} post={post} delay={i * 80} isVisible />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* About callout */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div
              className="rounded-2xl border p-7 flex flex-col md:flex-row items-center gap-6 bg-white"
              style={{ borderColor: "#84D2F6" }}
            >
              <img
                src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/e2381c277a9cff82a70da1a98cf32923.webp"
                alt="Jen Stryker"
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div className="text-center md:text-left">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                >
                  About Jen Stryker
                </h3>
                <p className="text-sm mb-4" style={{ color: "#386FA4" }}>
                  Author, artist, and photographer. Jen shares her creative journey through stories
                  that inspire readers and bring new worlds to life.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#133C55" }}
                >
                  Learn More About Jen <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)" }}
      >
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
          >
            Stay in the Conversation
          </h2>
          <p className="text-sm mb-8" style={{ color: "#386FA4" }}>
            New releases, writing tips, and story updates — sent occasionally, never spam.
          </p>
          <form
            id="newsletter-writers-hub"
            data-readdy-form
            action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
              try {
                await fetch("https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() });
                form.reset();
              } catch { /* silent */ }
            }}
          >
            <input
              type="email" name="email" placeholder="Your email address"
              className="flex-1 px-5 py-3.5 rounded-lg text-sm focus:outline-none"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #84D2F6", color: "#133C55" }}
              required
            />
            <button
              type="submit"
              className="px-7 py-3.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white"
              style={{ backgroundColor: "#133C55" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
