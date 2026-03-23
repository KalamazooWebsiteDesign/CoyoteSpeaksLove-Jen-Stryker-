import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/feature/Navigation";
import Footer from "../../components/feature/Footer";

interface ColoringItem {
  id: number;
  title: string;
  description: string;
  previewImage: string;
  imageUrl: string;
  pdfFilename: string;
  category: string;
}

const coloringItems: ColoringItem[] = [
  {
    id: 1,
    title: "Keanu Tails — Coloring Page",
    description: "A fun coloring page inspired by the adventurous world of Keanu Tails. Print it out and let the colors fly!",
    previewImage: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/3d21121d-9ad6-4095-b61e-643319632843_fffe4d3b596544cb9c6a43a95dc587e1.jpg",
    imageUrl: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/3d21121d-9ad6-4095-b61e-643319632843_fffe4d3b596544cb9c6a43a95dc587e1.jpg",
    pdfFilename: "Keanu-Tails-Coloring-Page",
    category: "Keanu Tails",
  },
  {
    id: 2,
    title: "My Neighbors Are Vampires — Coloring Page 1",
    description: "Bring the spooky-cute world of My Neighbors Are Vampires to life with your own colors. Perfect for kids who love a little mystery!",
    previewImage: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/7688cc6c-d4a7-487c-944f-feccadf5f39e_c6e1c460864f4ef589b5a29d892f6e12.jpg",
    imageUrl: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/7688cc6c-d4a7-487c-944f-feccadf5f39e_c6e1c460864f4ef589b5a29d892f6e12.jpg",
    pdfFilename: "My-Neighbors-Are-Vampires-Coloring-Page-1",
    category: "My Neighbors Are Vampires",
  },
  {
    id: 3,
    title: "My Neighbors Are Vampires — Coloring Page 2",
    description: "Another adorable scene from My Neighbors Are Vampires — grab your crayons and make it colorful!",
    previewImage: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/57ffdde8-4fd9-4579-96c5-28bae6f8d61c_b2fcdfe03b4b4049a2afa7eb9d72964d.jpg",
    imageUrl: "https://storage.readdy-site.link/project_files/e9f281a4-c274-41fa-8094-5cd347c34556/57ffdde8-4fd9-4579-96c5-28bae6f8d61c_b2fcdfe03b4b4049a2afa7eb9d72964d.jpg",
    pdfFilename: "My-Neighbors-Are-Vampires-Coloring-Page-2",
    category: "My Neighbors Are Vampires",
  },
];

const filterCategories = ["All", "Keanu Tails", "My Neighbors Are Vampires"];

const features = [
  { icon: "ri-home-heart-line", title: "Home Use", desc: "Perfect for a rainy afternoon or a creative weekend activity for kids of all ages." },
  { icon: "ri-book-open-line", title: "Classroom Ready", desc: "Pair with the books for a complete reading and art activity. Teachers love these for group sessions." },
  { icon: "ri-gift-2-line", title: "Party & Events", desc: "Great for birthday parties, library events, and book club gatherings for young readers." },
];

async function downloadAsPdf(imageUrl: string, filename: string, setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Fetch failed");
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const img = new Image();
    img.src = objectUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image load failed"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

    const { jsPDF } = await import("jspdf");
    const isLandscape = img.naturalWidth > img.naturalHeight;
    const pdf = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "px",
      format: [img.naturalWidth, img.naturalHeight],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(dataUrl, "JPEG", 0, 0, img.naturalWidth, img.naturalHeight);
    pdf.save(`${filename}.pdf`);

    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error("PDF download error:", err);
    window.open(imageUrl, "_blank");
  } finally {
    setLoading(false);
  }
}

function ColoringCard({ item, index }: { item: ColoringItem; index: number }) {
  const [downloading, setDownloading] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border scroll-animate hover-lift group"
      style={{ borderColor: "#84D2F6", transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative w-full h-80 overflow-hidden bg-white">
        <img
          src={item.previewImage}
          alt={item.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full"
          style={{ backgroundColor: "#91E5F6", color: "#133C55" }}
        >
          FREE
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: "#d0eeff", color: "#386FA4" }}
          >
            {item.category}
          </span>
        </div>

        <h3
          className="text-base font-bold mb-2 leading-snug"
          style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
        >
          {item.title}
        </h3>

        <p className="text-xs leading-relaxed mb-5" style={{ color: "#386FA4" }}>
          {item.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => downloadAsPdf(item.imageUrl, item.pdfFilename, setDownloading)}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#133C55" }}
          >
            {downloading ? (
              <>
                <i className="ri-loader-4-line animate-spin" />
                Preparing…
              </>
            ) : (
              <>
                <i className="ri-file-pdf-2-line" />
                Download PDF
              </>
            )}
          </button>
          <a
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 font-semibold rounded-lg border transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-sm flex items-center justify-center"
            style={{ borderColor: "#84D2F6", color: "#133C55" }}
            title="Open full image"
          >
            <i className="ri-eye-line" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function KidsCornerPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animate-in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeCategory === "All" ? coloringItems : coloringItems.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: "#f0f8ff" }}>
      <style>{`
        .scroll-animate{opacity:0;transform:translateY(28px);transition:opacity .6s ease-out,transform .6s ease-out;}
        .scroll-animate.animate-in{opacity:1;transform:translateY(0);}
        .hover-lift{transition:transform .3s ease;}
        .hover-lift:hover{transform:translateY(-6px);}
        @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        .animate-spin{animation:spin .8s linear infinite;display:inline-block;}
      `}</style>

      <Navigation />

      {/* Hero */}
      <section
        className="pt-36 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a7a9e 0%, #2eb8d4 50%, #91E5F6 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-15" style={{ backgroundColor: "#FFFFFF" }} />
          <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: "#FFFFFF" }} />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: "#FFFFFF" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-block px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}
          >
            Free Printables
          </div>
          <h1
            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Fugaz One', cursive" }}
          >
            Kids Corner
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed">
            Free printable coloring pages for home, classrooms, and book-loving kids.
          </p>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
            A warm welcome to parents, teachers, and kids — all downloads are free PDFs, just click and print!
          </p>
        </div>
      </section>

      {/* Free badge banner */}
      <section className="py-4" style={{ background: "linear-gradient(90deg, #133C55 0%, #386FA4 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-wide" style={{ color: "#91E5F6" }}>
            All coloring pages are completely FREE — no sign-up required. Download as PDF &amp; print!
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 bg-white border-b" style={{ borderColor: "#84D2F6" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer"
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#133C55", color: "#FFFFFF", border: "1px solid #133C55" }
                    : { backgroundColor: "transparent", color: "#386FA4", border: "1px solid #84D2F6" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Coloring pages grid */}
      <section className="py-16" style={{ background: "linear-gradient(180deg, #f0f8ff 0%, #d0eeff 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((item, index) => (
              <ColoringCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* More coming soon */}
          <div
            className="mt-12 p-10 rounded-2xl border text-center scroll-animate bg-white"
            style={{ borderColor: "#84D2F6" }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5"
              style={{ backgroundColor: "#d0eeff" }}
            >
              <i className="ri-palette-line text-3xl" style={{ color: "#386FA4" }} />
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
            >
              More Coloring Pages Coming Soon!
            </h3>
            <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "#386FA4" }}>
              New coloring pages for every book and season are on the way. Subscribe below to be notified when new free printables arrive.
            </p>
            <Link
              to="/writers-hub"
              className="inline-flex items-center gap-2 px-7 py-3 font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer text-white text-sm"
              style={{ backgroundColor: "#133C55" }}
            >
              Visit Writer&apos;s Hub
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </section>

      {/* For parents & teachers */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #133C55 0%, #1a7a9e 100%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="scroll-animate">
            <div
              className="inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full mb-6"
              style={{ backgroundColor: "rgba(145,229,246,0.2)", color: "#91E5F6" }}
            >
              For Parents &amp; Educators
            </div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-white mb-5"
              style={{ fontFamily: "'Fugaz One', cursive" }}
            >
              Designed for the Classroom &amp; Home
            </h2>
            <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: "#d0eeff" }}>
              All coloring pages are free to download and print for personal, classroom, and educational
              use. Share the joy of reading and creativity with the children in your life!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border text-left"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full mb-4"
                    style={{ backgroundColor: "rgba(145,229,246,0.2)" }}
                  >
                    <i className={`${f.icon} text-xl`} style={{ color: "#91E5F6" }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Fugaz One', cursive" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#d0eeff" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #d0eeff 0%, #91E5F6 100%)" }}>
        <div className="max-w-xl mx-auto px-6 text-center scroll-animate">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-3"
            style={{ fontFamily: "'Fugaz One', cursive", color: "#133C55" }}
          >
            Get New Printables First
          </h2>
          <p className="text-sm mb-8" style={{ color: "#386FA4" }}>
            Be the first to know when new free coloring pages drop — sent occasionally, never spam.
          </p>
          <form
            id="newsletter-kids-corner"
            data-readdy-form
            action="https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg"
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
              try {
                await fetch("https://readdy.ai/api/form/d6legiaqoe30lj0v7uhg", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: data.toString(),
                });
                form.reset();
              } catch { /* silent */ }
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
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
