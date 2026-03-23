import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../../components/feature/Navigation";
import Footer from "../../../components/feature/Footer";
import AnimatedDropdown from "../../../components/base/AnimatedDropdown";

// Keanu Tails accent palette — warm orange / beige
const KT = {
  accent: "#BF6119",
  accentLight: "#F5E9D8",
  accentDark: "#8C4310",
  accentMuted: "#E8C49A",
};

const reviews = [
  {
    text: '"I found this short story book to be utterly charming. In particular I loved the quote of Keanu\'s lessons in life which preceded each tale. This is written with love and admiration — I can\'t wait for the next collection of Keanu Tails."',
    name: "Fiona Johnstone",
    location: "Amazon Reviewer, United Kingdom",
    rating: 5,
  },
  {
    text: '"This book features short stories set within larger stories. Short, fun snippets designed to spark the imagination. The stories evoke emotions and moods and are often discreet parts of an untold whole left to the reader\'s imagination."',
    name: "Kergillian",
    location: "Amazon Reviewer, United States",
    rating: 5,
  },
  {
    text: '"A beautiful collection of stories that capture the essence of kindness and resilience. Each tale is thoughtfully crafted and leaves you with something to ponder long after you\'ve finished reading."',
    name: "Michael Chen",
    location: "Amazon Reviewer, Canada",
    rating: 5,
  },
];

const stories = [
  { title: "The Unexpected Journey", desc: "A tale of resilience and finding strength in the most unexpected moments of life." },
  { title: "Echoes of Kindness", desc: "How a simple act of compassion creates ripples that change lives forever." },
  { title: "The Road Less Traveled", desc: "A story about choosing your own path and discovering what truly matters." },
  { title: "Whispers of Hope", desc: "Finding light in the darkest times through connection and understanding." },
];

export default function KeanuTailsPage() {
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
        .scroll-animate{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out;}
        .scroll-animate.animate-in{opacity:1;transform:translateY(0);}
        .hover-lift{transition:transform .3s ease;}
        .hover-lift:hover{transform:translateY(-6px);}
        .kt-book-container{width:100%;max-width:480px;height:540px;display:flex;align-items:center;justify-content:center;animation:ktFloat 6s ease-in-out infinite;}
        @keyframes ktFloat{0%,100%{transform:translateY(0) rotateY(-15deg) rotateX(5deg);}50%{transform:translateY(-18px) rotateY(-20deg) rotateX(8deg);}}
        .kt-book-3d{position:relative;width:360px;height:460px;transform-style:preserve-3d;transition:transform .6s ease;filter:drop-shadow(0 30px 60px rgba(0,0,0,.5));}
        .kt-book-3d:hover{transform:rotateY(-35deg) rotateX(10deg) scale(1.05);}
        .kt-book-front{position:absolute;width:100%;height:100%;border-radius:0 8px 8px 0;transform:translateZ(26px);overflow:hidden;box-shadow:inset -3px 0 10px rgba(0,0,0,.1),5px 5px 20px rgba(0,0,0,.3);z-index:10;}
        .kt-book-front img{width:100%;height:100%;object-fit:contain;display:block;}
        .kt-book-spine{position:absolute;width:50px;height:100%;left:0;transform:rotateY(-90deg) translateX(-25px);transform-origin:left center;box-shadow:inset 0 0 10px rgba(0,0,0,.3);}
        .kt-book-back{position:absolute;width:100%;height:100%;border-radius:8px 0 0 8px;transform:translateZ(-26px);}
        .kt-book-pages{position:absolute;width:20px;height:calc(100% - 6px);top:3px;right:-20px;background:linear-gradient(to right,#e0e0e0,#f9f9f9,#fff,#f9f9f9,#e0e0e0);border-radius:0 3px 3px 0;transform:translateZ(0) rotateY(90deg) translateX(10px);transform-origin:left center;}
        @media(max-width:1024px){.kt-book-container{max-width:300px;height:400px;}.kt-book-3d{width:270px;height:350px;}}
      `}</style>

      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(ellipse at 60% 50%, ${KT.accent} 0%, transparent 70%)` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div
                className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "rgba(191,97,25,0.25)", color: KT.accentMuted, border: `1px solid rgba(191,97,25,0.4)` }}
              >
                Short Story Collection
              </div>
              <h1
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Fugaz One', cursive" }}
              >
                KEANU<br />
                <span style={{ color: KT.accentMuted }}>TAILS</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed max-w-md" style={{ color: "#d0eeff" }}>
                A captivating collection of short stories inspired by the spirit of Keanu Reeves and
                the creative energy of his band, Dogstar. Love, resilience, and the unexpected.
              </p>

              {/* ── PURCHASE OPTIONS ─────────────────────────────── */}
              <div
                className="rounded-xl p-5 border"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: KT.accentMuted }}>
                  Purchase Options
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="[BOOK_DIRECT_URL]"
                    className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
                    style={{ backgroundColor: KT.accent }}
                  >
                    Buy Direct
                  </a>
                  <a
                    href="https://www.amazon.com/Keanu-Tails-exploring-unexpected-Inspired/dp/B0DX1YFNYD"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF", backgroundColor: "transparent" }}
                  >
                    Buy on Amazon
                  </a>
                  <a
                    href="[BARNES_NOBLE_URL]"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF", backgroundColor: "transparent" }}
                  >
                    Barnes &amp; Noble
                  </a>
                </div>
              </div>
            </div>

            {/* 3D Book */}
            <div className="relative flex items-center justify-center" style={{ perspective: "1200px" }}>
              <div className="kt-book-container">
                <div className="kt-book-3d">
                  <div className="kt-book-front" style={{ backgroundColor: KT.accent }}>
                    <img src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/98866d2c2bb52c84592aa86eee0f4fc0.jpeg" alt="Keanu Tails" />
                  </div>
                  <div className="kt-book-spine" style={{ backgroundColor: KT.accentDark }} />
                  <div className="kt-book-back" style={{ backgroundColor: KT.accentDark }} />
                  <div className="kt-book-pages" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative order-2 lg:order-1 scroll-animate">
              <div className="absolute -top-5 -left-5 w-full h-full border rounded-2xl" style={{ borderColor: KT.accentLight }} />
              <img
                src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/d48e620e5802dbaa8730dddacde4d6ae.jpeg"
                alt="Story Preview"
                className="relative w-full h-auto rounded-2xl"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2 scroll-animate" style={{ transitionDelay: "100ms" }}>
              <div
                className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: KT.accentLight, color: KT.accentDark }}
              >
                About This Collection
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold"
                style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
              >
                Stories That Inspire
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#386FA4" }}>
                Each story is preceded by a thoughtful quote from Keanu Reeves, setting the tone for
                the tale that follows. These stories are designed to be read independently or as part
                of a larger narrative tapestry.
              </p>
              <AnimatedDropdown
                label="Read more about the collection"
                summaryBg={KT.accentLight}
                summaryTextColor={KT.accentDark}
                iconColor={KT.accent}
                contentBorderColor={KT.accentLight}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>
                  Through imaginative storytelling and real-world inspiration, this collection invites
                  readers into powerful narratives about kindness, courage, and finding meaning in the
                  twists of fate. Perfect for teens and adults, <em>Keanu Tails</em> sparks the
                  imagination while celebrating the quiet strength that lives within us all.
                </p>
              </AnimatedDropdown>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section id="preview" className="py-20" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: KT.accentLight, color: KT.accentDark }}
            >
              Inside the Collection
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              Featured Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((s, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border bg-white scroll-animate hover-lift"
                style={{ borderColor: "#d0eeff", transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: KT.accentLight }}>
                    <i className="ri-book-open-line text-xl" style={{ color: KT.accent }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
            >
              Core Themes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
              What You&apos;ll Discover
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { icon: "ri-heart-3-line", title: "Love & Connection", desc: "Stories exploring the depths of human relationships and the bonds that tie us together." },
              { icon: "ri-shield-star-line", title: "Resilience", desc: "Characters who face adversity with courage and emerge stronger, inspiring readers to do the same." },
              { icon: "ri-compass-3-line", title: "Life's Journey", desc: "Unexpected twists and turns that mirror the unpredictable nature of our own paths." },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border scroll-animate hover-lift"
                style={{ backgroundColor: "#FAFAF8", borderColor: "#d0eeff", transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6" style={{ backgroundColor: KT.accentLight }}>
                  <i className={`${t.icon} text-2xl`} style={{ color: KT.accent }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #133C55 0%, #386FA4 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "rgba(191,97,25,0.25)", color: KT.accentMuted, border: "1px solid rgba(191,97,25,0.35)" }}
            >
              Reader Reviews
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Fugaz One', cursive" }}>
              What Readers Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border scroll-animate"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(r.rating)].map((_, j) => (
                    <i key={j} className="ri-star-fill text-sm" style={{ color: KT.accentMuted }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#d0eeff" }}>{r.text}</p>
                <p className="font-semibold text-white text-sm">{r.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#84D2F6" }}>{r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: KT.accentLight }}>
        <div className="max-w-2xl mx-auto px-6 text-center scroll-animate">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
            Start Your Journey Today
          </h2>
          <p className="text-base mb-8" style={{ color: KT.accentDark }}>
            Available in paperback and digital formats.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="[BOOK_DIRECT_URL]"
              className="px-10 py-4 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white"
              style={{ backgroundColor: KT.accent }}
            >
              Buy Direct
            </a>
            <a
              href="https://www.amazon.com/Keanu-Tails-exploring-unexpected-Inspired/dp/B0DX1YFNYD"
              className="px-8 py-4 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              style={{ borderColor: KT.accent, color: KT.accentDark }}
            >
              Buy on Amazon
            </a>
            <a
              href="[BARNES_NOBLE_URL]"
              className="px-8 py-4 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              style={{ borderColor: KT.accent, color: KT.accentDark }}
            >
              Barnes &amp; Noble
            </a>
            <Link
              to="/current-releases"
              className="px-8 py-4 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: "#d0eeff", color: "#133C55" }}
            >
              All Releases
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
