import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../../components/feature/Navigation";
import Footer from "../../../components/feature/Footer";
import AnimatedDropdown from "../../../components/base/AnimatedDropdown";

// My Neighbors Are Vampires palette — dark blue / purple / red-black
const VP = {
  deep: "#0F0818",
  purple: "#2D1B69",
  purpleLight: "#4A2080",
  crimson: "#8B1A2A",
  lavender: "#D4B8E0",
  lavenderMid: "#9B79C2",
  lightBg: "#F0ECF8",
};

const reviews = [
  {
    text: '"Hi. I am a therapist and Dr. of Psychology who practices with children. I just received my copies and have shared it with the interns. We all agree that it is a cute book with a great message of empathy and accepting others for their differences."',
    name: "Robert Willoughby",
    location: "Amazon Reviewer, United States",
    rating: 5,
  },
  {
    text: '"My kids absolutely loved this book! It\'s become a bedtime favorite. The message about acceptance and friendship is so important, and the vampire theme makes it fun and exciting."',
    name: "Jennifer Torres",
    location: "Amazon Reviewer, United States",
    rating: 5,
  },
  {
    text: '"This is a delightful children\'s book with a wonderful message about not judging others based on appearances. The story is engaging and the message is timely and important for young readers."',
    name: "Sarah Mitchell",
    location: "Amazon Reviewer, Canada",
    rating: 5,
  },
];

export default function MyNeighborsAreVampiresPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animate-in"); }),
      { threshold: 0.1 }
    );
    const illustObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = Number((e.target as HTMLElement).dataset.delay ?? 0);
            setTimeout(() => e.target.classList.add("illus-in"), delay);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    document.querySelectorAll(".illus-card").forEach((el) => illustObserver.observe(el));
    return () => { observer.disconnect(); illustObserver.disconnect(); };
  }, []);

  const bookImages = [
    {
      src: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/a8b7446d-ec5a-4d57-a058-900c4320394e_7b908f97ff014cfa82d2c1ba9a96768c.jpg",
      alt: "My Neighbors Are Vampires illustration spread 1",
    },
    {
      src: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/d64db359-51d0-4b17-a04d-ae0bd5baf954_5bb4b01e3c1d4d84b2f0b233476cdfc2.jpg",
      alt: "My Neighbors Are Vampires illustration spread 2",
    },
    {
      src: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/c48c74dc-0567-49bf-997d-8612f230bf37_deede58ee9d443f09c020b63cd34c880.jpg",
      alt: "My Neighbors Are Vampires illustration spread 3",
    },
    {
      src: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/410e6234-c34c-4e27-9e39-e7455d249473_7b14fdab0b5847c588d862fa2ca9d96f.jpg",
      alt: "My Neighbors Are Vampires illustration spread 4",
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <style>{`
        .scroll-animate{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out;}
        .scroll-animate.animate-in{opacity:1;transform:translateY(0);}
        .hover-lift{transition:transform .3s ease;}
        .hover-lift:hover{transform:translateY(-6px);}
        .vp-book-container{width:100%;max-width:480px;height:500px;display:flex;align-items:center;justify-content:center;animation:vpFloat 6s ease-in-out infinite;}
        @keyframes vpFloat{0%,100%{transform:translateY(0) rotateY(-15deg) rotateX(5deg);}50%{transform:translateY(-18px) rotateY(-20deg) rotateX(8deg);}}
        .vp-book-3d{position:relative;width:380px;height:420px;transform-style:preserve-3d;transition:transform .6s ease;filter:drop-shadow(0 30px 60px rgba(0,0,0,.6));}
        .vp-book-3d:hover{transform:rotateY(-35deg) rotateX(10deg) scale(1.05);}
        .vp-book-front{position:absolute;width:100%;height:100%;border-radius:0 8px 8px 0;transform:translateZ(26px);overflow:hidden;box-shadow:inset -3px 0 10px rgba(0,0,0,.1),5px 5px 20px rgba(0,0,0,.3);z-index:10;}
        .vp-book-front img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;}
        .vp-book-spine{position:absolute;width:50px;height:100%;left:0;transform:rotateY(-90deg) translateX(-25px);transform-origin:left center;box-shadow:inset 0 0 10px rgba(0,0,0,.3);}
        .vp-book-back{position:absolute;width:100%;height:100%;border-radius:8px 0 0 8px;transform:translateZ(-26px);}
        .vp-book-pages{position:absolute;width:20px;height:calc(100% - 6px);top:3px;right:-20px;background:linear-gradient(to right,#e0e0e0,#f9f9f9,#fff,#f9f9f9,#e0e0e0);border-radius:0 3px 3px 0;transform:translateZ(0) rotateY(90deg) translateX(10px);transform-origin:left center;}
        @media(max-width:1024px){.vp-book-container{max-width:300px;height:360px;}.vp-book-3d{width:280px;height:320px;}}
        .preview-img-wrap{overflow:hidden;border-radius:12px;cursor:zoom-in;}
        .preview-img-wrap img{transition:transform .5s cubic-bezier(.25,.46,.45,.94);}
        .preview-img-wrap:hover img{transform:scale(1.06);}
        .lightbox-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease;}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}

        /* Illustration card entrance animations */
        .illus-card{opacity:0;transition:opacity .7s ease-out, transform .7s cubic-bezier(.22,.68,0,1.2), box-shadow .35s ease;}
        .illus-card.illus-in{opacity:1;transform:none !important;}
        .illus-card-tl{transform:translate(-60px,-40px) scale(.9);}
        .illus-card-tr{transform:translate(60px,-40px) scale(.9);}
        .illus-card-bl{transform:translate(-60px,40px) scale(.9);}
        .illus-card-br{transform:translate(60px,40px) scale(.9);}

        /* Glow shimmer on hover */
        .illus-card:hover{box-shadow:0 0 40px 6px rgba(139,26,42,0.35), 0 0 80px 16px rgba(45,27,105,0.2);}
        .illus-card .illus-overlay{opacity:0;transition:opacity .4s ease;}
        .illus-card:hover .illus-overlay{opacity:1;}

        /* Shimmer sweep */
        .illus-card::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(212,184,224,0.12) 50%,transparent 60%);transform:translateX(-100%);transition:transform .6s ease;border-radius:12px;}
        .illus-card:hover::after{transform:translateX(100%);}
      `}</style>

      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ backgroundColor: VP.deep }}>
        {/* Watermarked illustration background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{
            backgroundImage: `url('https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/a8b7446d-ec5a-4d57-a058-900c4320394e_7b908f97ff014cfa82d2c1ba9a96768c.jpg')`,
            backgroundSize: "cover",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(ellipse at 30% 60%, ${VP.crimson} 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, ${VP.purple} 0%, transparent 60%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div
                className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: "rgba(212,184,224,0.12)", color: VP.lavender, border: `1px solid rgba(212,184,224,0.25)` }}
              >
                Children&apos;s Book
              </div>
              <h1
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Fugaz One', cursive" }}
              >
                MY NEIGHBORS<br />
                ARE{" "}
                <span style={{ color: VP.crimson }}>VAMPIRES</span>,<br />
                <span style={{ color: VP.lavender }}>I THINK!</span>
              </h1>
              <p className="text-base lg:text-lg leading-relaxed max-w-md" style={{ color: "#9A9692" }}>
                When a curious child starts noticing strange things next door — fluttering bats,
                mysterious shadows, and neighbors who only come out at night — one big question
                comes to mind&hellip; could they be vampires?
              </p>

              {/* ── PURCHASE OPTIONS ─────────────────────────────── */}
              <div
                className="rounded-xl p-5 border"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(212,184,224,0.2)" }}
              >
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: VP.lavender }}>
                  Purchase Options
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="[BOOK_DIRECT_URL]"
                    className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
                    style={{ backgroundColor: VP.crimson }}
                  >
                    Buy Direct
                  </a>
                  <a
                    href="https://www.amazon.com/My-Neighbors-are-Vampires-Think/dp/B0GJKZNLZ3/ref=sr_1_1?crid=139MPO9S9TUEV&dib=eyJ2IjoiMSJ9.RQjvFUOhW_fZyWSrTXJSqjz_9ASXX91RGaiNA807rnTG8XTMcXaCugf-1DOSpUzjLfGL0pPwZKTCT-N573CR6HRSNefw6n93tzH-cyeF7S4.Goy72i-l4BScr2fmhH8iAAR7tm-CpcruAguTUMOQMFc&dib_tag=se&keywords=My+Neighbors+Are+Vampires%2C+I+Think%21&qid=1773948470&s=books&sprefix=my+neighbors+are+vampires%2C+i+think+%2Cstripbooks%2C271&sr=1-1"
                    className="px-5 py-3 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm"
                    style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF", backgroundColor: "transparent" }}
                  >
                    Buy on Amazon
                  </a>
                  <a
                    href="https://www.barnesandnoble.com/w/my-neighbors-are-vampires-i-think-kenneth-togonon/1149374154?ean=979827967694"
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
              <div className="vp-book-container">
                <div className="vp-book-3d">
                  <div className="vp-book-front">
                    <img
                      src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/a5f2067f43d678514359b619340cf52e.jpeg"
                      alt="My Neighbors are Vampires I Think"
                    />
                  </div>
                  <div className="vp-book-spine" style={{ backgroundColor: VP.deep }} />
                  <div className="vp-book-back" style={{ backgroundColor: VP.purple }} />
                  <div className="vp-book-pages" />
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
              <div className="absolute -top-5 -left-5 w-full h-full border rounded-2xl" style={{ borderColor: VP.lightBg }} />
              <img
                src="https://static.readdy.ai/image/577c45d6defa6ac02f4bf39c73856fa0/87575ffe9afdefbdcb5de73e2a8f3584.jpeg"
                alt="Book Preview"
                className="relative w-full h-auto rounded-2xl"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2 scroll-animate" style={{ transitionDelay: "100ms" }}>
              <div
                className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ backgroundColor: VP.lightBg, color: VP.purpleLight }}
              >
                About This Book
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
                A Story About Acceptance
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#386FA4" }}>
                This playful, heartwarming story blends a touch of spooky fun with an uplifting message
                about kindness, empathy, and embracing what makes each of us unique.
              </p>
              <AnimatedDropdown
                label="Read full synopsis"
                summaryBg={VP.lightBg}
                summaryTextColor={VP.purple}
                iconColor={VP.lavenderMid}
                contentBorderColor={VP.lightBg}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>
                  Perfect for young readers, <em>My Neighbors Are Vampires, I Think!</em> reminds us
                  that new friendships can be found in the most unexpected places. Through charming
                  illustrations and engaging storytelling, children will learn valuable lessons about
                  not judging others based on appearances and the importance of getting to know people
                  before making assumptions.
                </p>
              </AnimatedDropdown>
            </div>
          </div>
        </div>
      </section>

      {/* Key Themes */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: VP.lightBg, color: VP.purpleLight }}
            >
              Key Themes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
              What Your Child Will Learn
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { icon: "ri-heart-line", title: "Empathy & Kindness", desc: "Understanding and accepting others who may seem different, teaching children to look beyond appearances." },
              { icon: "ri-group-line", title: "Friendship", desc: "Discovering that the best friendships can come from the most unexpected places and people." },
              { icon: "ri-lightbulb-line", title: "Curiosity & Wonder", desc: "Encouraging children to ask questions, explore their world, and use their imagination in positive ways." },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border bg-white scroll-animate hover-lift"
                style={{ borderColor: "#d0eeff", transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6" style={{ backgroundColor: VP.lightBg }}>
                  <i className={`${t.icon} text-2xl`} style={{ color: VP.purpleLight }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>{t.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#386FA4" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEEK INSIDE THE BOOK ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: VP.deep }}>
        {/* Watermarked illustration bg */}
        <div
          className="absolute inset-0 opacity-[0.05] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/c48c74dc-0567-49bf-997d-8612f230bf37_deede58ee9d443f09c020b63cd34c880.jpg')`,
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `radial-gradient(ellipse at 20% 80%, ${VP.crimson} 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, ${VP.purple} 0%, transparent 55%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full mb-5"
              style={{ backgroundColor: "rgba(212,184,224,0.12)", color: VP.lavender, border: "1px solid rgba(212,184,224,0.25)" }}
            >
              Book Illustrations
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Fugaz One', cursive" }}
            >
              Peek Inside the Book
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "#9A9692" }}>
              Vibrant, full-color spreads that bring every page to life — hover to explore the artwork.
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-2 gap-5 lg:gap-7">
            {bookImages.map((img, i) => {
              const dirClass = ["illus-card-tl", "illus-card-tr", "illus-card-bl", "illus-card-br"][i];
              return (
                <div
                  key={i}
                  className={`illus-card ${dirClass} relative`}
                  data-delay={i * 120}
                  style={{
                    border: "1px solid rgba(212,184,224,0.15)",
                    aspectRatio: "16/10",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-top block transition-transform duration-500 hover:scale-105"
                    style={{ display: "block" }}
                  />
                  <div
                    className="illus-overlay absolute inset-0"
                    style={{ background: `linear-gradient(135deg, rgba(45,27,105,0.3) 0%, rgba(139,26,42,0.18) 100%)` }}
                  />
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs mt-8" style={{ color: "#6B6865" }}>
            All artwork &copy; Kenneth Togonon. All rights reserved.
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20" style={{ backgroundColor: "#0F0818" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-4"
              style={{ backgroundColor: "rgba(212,184,224,0.12)", color: VP.lavender, border: "1px solid rgba(212,184,224,0.2)" }}
            >
              Reader Reviews
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Fugaz One', cursive" }}>
              What Parents &amp; Educators Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border scroll-animate"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(r.rating)].map((_, j) => (
                    <i key={j} className="ri-star-fill text-sm" style={{ color: VP.lavender }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#9A9692" }}>{r.text}</p>
                <p className="font-semibold text-white text-sm">{r.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B6865" }}>{r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="preview" className="py-20" style={{ backgroundColor: VP.lightBg }}>
        <div className="max-w-2xl mx-auto px-6 text-center scroll-animate">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}>
            Get Your Copy Today
          </h2>
          <p className="text-base mb-8" style={{ color: VP.purpleLight }}>
            Available in softcover, hardcover, and digital formats.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="[BOOK_DIRECT_URL]"
              className="px-10 py-4 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white"
              style={{ backgroundColor: VP.crimson }}
            >
              Buy Direct
            </a>
            <a
              href="https://www.amazon.com/My-Neighbors-are-Vampires-Think/dp/B0GJKZNLZ3/ref=sr_1_1?crid=139MPO9S9TUEV&dib=eyJ2IjoiMSJ9.RQjvFUOhW_fZyWSrTXJSqjz_9ASXX91RGaiNA807rnTG8XTMcXaCugf-1DOSpUzjLfGL0pPwZKTCT-N573CR6HRSNefw6n93tzH-cyeF7S4.Goy72i-l4BScr2fmhH8iAAR7tm-CpcruAguTUMOQMFc&dib_tag=se&keywords=My+Neighbors+Are+Vampires%2C+I+Think%21&qid=1773948470&s=books&sprefix=my+neighbors+are+vampires%2C+i+think+%2Cstripbooks%2C271&sr=1-1"
              className="px-8 py-4 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              style={{ borderColor: VP.purple, color: VP.purple }}
            >
              Buy on Amazon
            </a>
            <a
              href="https://www.barnesandnoble.com/w/my-neighbors-are-vampires-i-think-kenneth-togonon/1149374154?ean=979827967694"
              className="px-8 py-4 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              style={{ borderColor: VP.purple, color: VP.purple }}
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
