import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";

const books = [
  {
    id: 1,
    title: "My Neighbors are Vampires, I Think!",
    category: "Children's Book",
    accentBg: "#2D1B69",
    accentText: "#D4B8E0",
    description:
      "When a curious child starts noticing strange things next door — fluttering bats, mysterious shadows, and neighbors who only come out at night — one big question comes to mind… could they be vampires?",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-2-1011x1024.jpg",
    slug: "my-neighbors-are-vampires",
    directUrl: "[BOOK_DIRECT_URL]",
    amazonUrl: "https://www.amazon.com/My-Neighbors-are-Vampires-Think/dp/B0GJKZNLZ3/ref=sr_1_1?crid=139MPO9S9TUEV&dib=eyJ2IjoiMSJ9.RQjvFUOhW_fZyWSrTXJSqjz_9ASXX91RGaiNA807rnTG8XTMcXaCugf-1DOSpUzjLfGL0pPwZKTCT-N573CR6HRSNefw6n93tzH-cyeF7S4.Goy72i-l4BScr2fmhH8iAAR7tm-CpcruAguTUMOQMFc&dib_tag=se&keywords=My+Neighbors+Are+Vampires%2C+I+Think%21&qid=1773948470&s=books&sprefix=my+neighbors+are+vampires%2C+i+think+%2Cstripbooks%2C271&sr=1-1",
    barnesUrl: "https://www.barnesandnoble.com/w/my-neighbors-are-vampires-i-think-kenneth-togonon/1149374154?ean=979827967694",
  },
  {
    id: 2,
    title: "Keanu Tails",
    category: "Short Stories",
    accentBg: "#BF6119",
    accentText: "#FFF3E0",
    description:
      "A captivating collection of short stories inspired by the spirit of Keanu Reeves and the creative energy of his band, Dogstar. Each story explores love, resilience, and the unexpected turns that shape our lives.",
    image: "https://coyotespeakslove.com/staging/9788/wp-content/uploads/2026/03/Placeholder-Image-1-1.jpg",
    slug: "keanu-tails",
    directUrl: "[BOOK_DIRECT_URL]",
    amazonUrl: "https://www.amazon.com/Keanu-Tails-exploring-unexpected-Inspired/dp/B0DX1YFNYD",
    barnesUrl: "[BARNES_NOBLE_URL]",
  },
];

export default function CurrentReleasesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animate-in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <style>{`
        .scroll-animate { opacity:0; transform:translateY(28px); transition:opacity .6s ease-out,transform .6s ease-out; }
        .scroll-animate.animate-in { opacity:1; transform:translateY(0); }
        .hover-lift { transition:transform .3s ease; }
        .hover-lift:hover { transform:translateY(-6px); }
      `}</style>

      <Navigation />

      {/* Hero */}
      <section
        className="pt-36 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div
            className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
          >
            Latest Books
          </div>
          <h1
            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Fugaz One', cursive" }}
          >
            Current Releases
          </h1>
          <p className="text-base lg:text-lg max-w-2xl mx-auto" style={{ color: "#d0eeff" }}>
            Explore Jen Stryker&apos;s newest books — stories crafted with heart, imagination, and a
            touch of magic for readers of every age.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14">
            {books.map((book, index) => (
              <div
                key={book.id}
                className="group scroll-animate hover-lift"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div
                    className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                    style={{ backgroundColor: book.accentBg, color: book.accentText }}
                  >
                    {book.category}
                  </div>
                  <h3
                    className="text-3xl lg:text-4xl font-bold"
                    style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#386FA4" }}>
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={book.directUrl}
                      className="px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
                      style={{ backgroundColor: book.accentBg }}
                    >
                      Buy Direct
                    </a>
                    <a
                      href={book.amazonUrl}
                      className="px-5 py-2.5 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                      style={{ borderColor: book.accentBg, color: book.accentBg }}
                    >
                      Amazon
                    </a>
                    <a
                      href={book.barnesUrl}
                      className="px-5 py-2.5 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                      style={{ borderColor: book.accentBg, color: book.accentBg }}
                    >
                      Barnes &amp; Noble
                    </a>
                    <Link
                      to={`/books/${book.slug}`}
                      className="px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                      style={{ backgroundColor: "#d0eeff", color: "#133C55" }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Books */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
            >
              Why Choose These Books
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Stories That Stay With You
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { icon: "ri-heart-line", title: "Written with Heart", desc: "Every story is infused with genuine emotion, empathy, and a passion for connecting with readers of all ages." },
              { icon: "ri-lightbulb-line", title: "Sparks Imagination", desc: "From curious children to thoughtful adults, these books inspire creativity and wonder in every reader." },
              { icon: "ri-star-line", title: "5-Star Quality", desc: "Recognized by readers and reviewers for excellence in storytelling and the ability to touch hearts across generations." },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border bg-white scroll-animate hover-lift"
                style={{ borderColor: "#d0eeff", transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6" style={{ backgroundColor: "#d0eeff" }}>
                  <i className={`${f.icon} text-2xl`} style={{ color: "#386FA4" }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)" }}
      >
        <div className="max-w-xl mx-auto px-6 text-center scroll-animate">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
            Stay in the Conversation
          </h2>
          <p className="text-sm mb-8" style={{ color: "#386FA4" }}>
            New releases, writing tips, and story updates — sent occasionally, never spam.
          </p>
          <form
            id="newsletter-releases"
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
              className="px-7 py-3.5 font-semibold rounded-lg whitespace-nowrap cursor-pointer transition-all duration-300 hover:-translate-y-0.5 text-white"
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
