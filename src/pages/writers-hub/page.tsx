import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";
import { getPosts } from "../../lib/wp";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url: string;
    }>;
  };
};

export default function WritersHubPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featuredPost =
  posts.find((post) => post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) ||
  posts[0];

const gridPosts = posts.filter((post) => post.id !== featuredPost?.id);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#f7fbff",
      }}
    >
      <Navigation />

      {/* Hero */}
      <section
        className="pt-32 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div
            className="inline-block px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
          >
            Writer&apos;s Hub
          </div>

          <h1
            className="text-4xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "'Fugaz One', cursive" }}
          >
            Resources for Writers
          </h1>

          <p
            className="max-w-2xl mx-auto text-base lg:text-lg"
            style={{ color: "#d0eeff" }}
          >
            Helpful tips, insights, and inspiration from Jen Stryker to enhance
            your writing journey. Updated regularly and always 100% free.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-16" style={{ color: "#386FA4" }}>
              Loading posts...
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featuredPost && (
                <div className="mb-14">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div
                        className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4"
                        style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                      >
                        Featured Article
                      </div>

                      {/* Thumbnail photo frame */}
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="block w-full h-[260px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg mb-0 cursor-pointer"
                        style={{ border: "3px solid #b9e5f7", backgroundColor: "#eaf7ff" }}
                      >
                        {featuredPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                          <img
                            src={featuredPost._embedded["wp:featuredmedia"][0].source_url}
                            alt={featuredPost.title.rendered}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full" style={{ backgroundColor: "#d0eeff" }}>
                              <i className="ri-image-line text-3xl" style={{ color: "#386FA4" }}></i>
                            </div>
                            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#84BFE0" }}>
                              Featured Image
                            </span>
                          </div>
                        )}
                      </Link>
                    </div>

                    <div>
                      <div
                        className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4"
                        style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
                      >
                        Writing Tips & Insights
                      </div>

                      <h2
                        className="text-3xl lg:text-5xl font-bold mb-4 leading-tight"
                        style={{
                          fontFamily: "'Fugaz One', cursive",
                          color: "#133C55",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: featuredPost.title.rendered,
                        }}
                      />

                      <div
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "#386FA4" }}
                        dangerouslySetInnerHTML={{
                          __html: featuredPost.excerpt.rendered,
                        }}
                      />

                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold"
                        style={{ backgroundColor: "#133C55" }}
                      >
                        Read Full Article
                        <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div
                className="rounded-3xl p-8 lg:p-10"
                style={{ backgroundColor: "#eaf7ff" }}
              >
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  {["All", "Writing Tips", "Creativity", "Publishing"].map(
                    (tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-xs font-semibold border"
                        style={{
                          backgroundColor: tag === "All" ? "#133C55" : "#fff",
                          color: tag === "All" ? "#fff" : "#386FA4",
                          borderColor: "#b9e5f7",
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {(gridPosts.length ? gridPosts : posts).map((post) => {
                    const image =
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "";

                    return (
                      <article
                        key={post.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md border hover:shadow-xl transition-all duration-300"
                        style={{ borderColor: "#d0eeff" }}
                      >
                        {image && (
                          <img
                            src={image}
                            alt={post.title.rendered}
                            className="w-full h-52 object-contain bg-white"
                          />
                        )}

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: "#d0eeff",
                                color: "#386FA4",
                              }}
                            >
                              Blog Post
                            </span>

                            <span
                              className="text-xs"
                              style={{ color: "#84BFE0" }}
                            >
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>

                          <h3
                            className="text-xl font-bold mb-3 leading-tight"
                            style={{
                              fontFamily: "'Fugaz One', cursive",
                              color: "#133C55",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: post.title.rendered,
                            }}
                          />

                          <div
                            className="text-sm leading-relaxed mb-5"
                            style={{ color: "#386FA4" }}
                            dangerouslySetInnerHTML={{
                              __html: post.excerpt.rendered,
                            }}
                          />

                          <div className="flex justify-end">
                            <Link
                              to={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-sm font-bold"
                              style={{ color: "#386FA4" }}
                            >
                              Read More <i className="ri-arrow-right-line"></i>
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* About Jen callout */}
              <div className="mt-12 max-w-3xl mx-auto">
                <div
                  className="rounded-2xl border bg-white p-6 flex flex-col md:flex-row items-center gap-5 shadow-sm"
                  style={{ borderColor: "#b9e5f7" }}
                >
                  <img
                    src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/e2381c277a9cff82a70da1a98cf32923.webp"
                    alt="Jen Stryker"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="text-center md:text-left">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: "'Fugaz One', cursive",
                        color: "#133C55",
                      }}
                    >
                      About Jen Stryker
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#386FA4" }}>
                      Award-winning author, artist, and photographer. Jen shares
                      her creative journey through stories that inspire readers
                      and bring new worlds to life.
                    </p>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-sm font-bold"
                      style={{ color: "#133C55" }}
                    >
                      Learn More About Jen <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
          >
            STAY IN THE CONVERSATION
          </h2>
          <p className="text-lg mb-8" style={{ color: "#386FA4" }}>
            Get new releases, writing tips, and story updates—sent
            occasionally, never spam.
          </p>

          <form
            id="newsletter-form"
            data-readdy-form
            action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new URLSearchParams(
                new FormData(form) as unknown as Record<string, string>
              );
              try {
                await fetch("https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: data.toString(),
                });
                form.reset();
                alert("Thank you for subscribing!");
              } catch {
                alert("Something went wrong. Please try again.");
              }
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="flex-1 px-6 py-4 rounded-lg border-2 focus:outline-none text-sm"
              style={{ borderColor: "#59A5D8", color: "#133C55" }}
              required
            />
            <button
              type="submit"
              className="px-8 py-4 font-bold rounded-lg text-white"
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