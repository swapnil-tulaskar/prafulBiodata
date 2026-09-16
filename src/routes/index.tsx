import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Facebook,
  Mail,
  MapPin,
  Maximize,
  Menu,
  Minus,
  Phone,
  Plus,
  Printer,
  RotateCcw,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import heroImage from "../assets/praful-hero.webp";
import kundliImage from "../assets/kundli.webp";

// 👇 groom photos
import groom1 from "../assets/groom-1.webp";
import groom2 from "../assets/groom-2.webp";
import groom3 from "../assets/groom-3.webp";
import groom4 from "../assets/groom-4.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "डॉ. प्रफुल तुळसकर — विवाह बायोडाटा" },
      { name: "description", content: "डॉ. प्रफुल तुळसकर, बी.एच.एम.एस., डी.फार्मा का विवाह बायोडाटा।" },
      { property: "og:title", content: "डॉ. प्रफुल तुळसकर — वैवाहिक प्रोफाइल" },
      { property: "og:description", content: "एक डॉक्टर, एक समर्पित परिवारिक व्यक्ति, और साझा जीवन की तलाश में एक विचारशील साथी।" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImage, fetchPriority: "high" },
    ],
  }),
  component: ProfilePage,
});

type ViewerItem = { src: string; alt: string; label: string };

// 👇 Parents (name + relation + detail only, no photo)
const parents = [
  { name: "श्री. सुभाष बाबुराव तुळसकर", relation: "पिता", detail: "सेवानिवृत्त सरकारी शिक्षक" },
  { name: "श्रीमती. अनिता सुभाष तुळसकर", relation: "माता", detail: "आंगणवाडी शिक्षिका" },
];

// 👇 Siblings (name + relation + detail only, no photo)
const relatives = [
  { name: "श्री. स्वप्निल सुभाष तुळसकर", relation: "मोठा भाऊ", detail: "B.E.इंजिनियर" },
  { name: "श्रीमती. माधुरी स्वप्निल तुळसकर", relation: "वहिनी", detail: "M.Sc. सहा.प्राध्यापिका" },
];

// Gallery viewer list — ONLY groom photos
const groomPhotos: ViewerItem[] = [
  { src: groom1, alt: "डॉ. प्रफुल तुळसकर", label: "वराचा फोटो १" },
  { src: groom2, alt: "डॉ. प्रफुल तुळसकर", label: "वराचा फोटो २" },
  { src: groom3, alt: "डॉ. प्रफुल तुळसकर", label: "वराचा फोटो ३" },
  { src: groom4, alt: "डॉ. प्रफुल तुळसकर", label: "वराचा फोटो ४" },
];

const kundliViewer: ViewerItem[] = [
  { src: kundliImage, alt: "जन्म कुंडली", label: "कुंडली" },
];

// 👇 Contacts — name + relation + detail (व्यवसाय) + phone
const contacts = [
  { name: "श्री. सुभाष बाबुराव तुळसकर", relation: "पिता", detail: "सेवानिवृत्त सरकारी शिक्षक", phone: "9009329148" },
  { name: "श्री. हिरालाल बाबुराव तुळसकर", relation: "काका", detail: "सरकारी शिक्षक", phone: "9977745489" },
  { name: "श्री. प्रविण सिताराम सोनवणे", relation: "मामा", detail: "व्यवसाय", phone: "9028549690" },
];

// 👇 Path + download name for the pre-made PDF
const PDF_URL = "/biodata.pdf";
const PDF_FILENAME = "Dr-Praful-Tulaskar-Biodata.pdf";

function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [viewer, setViewer] = useState<{ items: ViewerItem[]; index: number } | null>(null);

  useEffect(() => {
    const sections = ["home", "about", "career", "family", "kundli", "interests", "gallery", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const openGroom = (i: number) => setViewer({ items: groomPhotos, index: i });
  const openKundli = () => setViewer({ items: kundliViewer, index: 0 });
  const closeViewer = () => setViewer(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onShare={() => setShareOpen(true)}
      />

      <main>
        {/* HERO */}
        <section id="home" className="relative min-h-[560px] h-[88svh] w-full overflow-hidden md:min-h-[720px] md:h-[92svh]">
          <img
            src={heroImage}
            alt="डॉ. प्रफुल तुळसकर"
            width={1920}
            height={1088}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
          <div className="pointer-events-none absolute inset-0 bg-hero-shade" />

          <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-end px-5 pb-14 sm:px-6 md:px-10 md:pb-24">
            <div className="max-w-3xl animate-rise">

              {/* Small kicker line */}
              <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-gold/90 sm:text-base md:mb-6 md:text-lg">
                विवाह बायोडाटा
              </p>

              {/* Name — clean, elegant */}
              <h1 className="font-calligraphy text-6xl leading-[1.2] text-paper drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl md:leading-[1.15]">
                डॉ. प्रफुल तुळसकर
              </h1>

              {/* Gold divider line */}
              <div className="mt-5 h-px w-24 bg-gold/70 md:mt-6 md:w-32" />

              {/* Tagline — subdued, professional */}
              <p className="mt-5 max-w-2xl font-display text-2xl italic leading-[1.5] text-paper/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-3xl md:mt-6 md:text-4xl md:leading-[1.5]">
                जबाबदार मुलगा, सेवाभावी डॉक्टर, आणि कुटुंबाचा आधार.
              </p>

              {/* CTAs */}
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3 md:mt-10">
                <a href="#about" className="action-primary text-base md:text-lg">
                  बायोडाटा पहा <ChevronRight size={18} />
                </a>
                <a href="#gallery" className="action-ghost text-base md:text-lg">
                  गॅलरी पहा
                </a>
                <a
                  href={PDF_URL}
                  download={PDF_FILENAME}
                  className="action-ghost text-base md:text-lg"
                >
                  <Download size={18} /> बायोडाटा
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* QUICK SUMMARY */}
        <section aria-label="त्वरित प्रोफाइल सारांश" className="border-y border-border bg-secondary/70">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-5 py-8 font-mono text-xl uppercase tracking-[0.12em] sm:grid-cols-3 sm:px-6 md:grid-cols-6 md:gap-y-8 md:px-10 md:py-10">
            {[
              ["वय", "२८ वर्षे"],
              ["उंची", "५'९\""],
              ["शिक्षण", "B.H.M.S., D.Pharmacy"],
              ["व्यवसाय", "स्वतःचा क्लिनिक"],
              ["स्थान", "बसाड जि. बुऱ्हाणपूर"],
              ["वैवाहिक स्थिती", "अविवाहित"],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 border-l border-border pl-3 md:pl-4">
                <p className="text-muted-foreground">{label}</p>
                <p className="mt-1 break-words leading-snug text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-grid">
          <div className="self-start md:col-span-4 md:sticky md:top-28">
            <p className="font-mono text-2xl uppercase tracking-[0.2em] text-gold sm:text-2xl md:text-3xl">
              वैयक्तिक प्रोफाइल
            </p>
            <div className="mt-5 h-px w-20 bg-gold/60 md:mt-7" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="editorial-copy text-xl md:text-2xl">
              मी <Bold>डॉ. प्रफुल तुळसकर</Bold> बुऱ्हाणपूर-नेपानगर रोड, नाशिराबाद येथे माझे स्वतःचे क्लिनिक{" "}
              <Bold>स्वप्नपूर्ती डे-केअर सेंटर</Bold>
              {" "}मध्ये रुग्णसेवा करतो.माझ्यासाठी प्रत्येक रुग्ण हा एक कुटुंब आहे. त्यांची सेवा करणे
              हेच माझे ध्येय. मी स्वभावाने शांत, प्रामाणिक आणि सहकार्य करणारा आहे.
              जीवनसाथीकडून मला परस्पर आदर, स्पष्ट संवाद आणि एकमेकांना साथ देण्याची तयारी यांची अपेक्षा आहे.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:mt-10 md:gap-x-8 md:gap-y-5">
              {[
                ["पूर्ण नाव", "डॉ. प्रफुल सुभाष तुळसकर"],
                ["जन्म", "१० एप्रिल १९९८"],
                ["जन्म वेळ", "सायं. ६:५५"],
                ["जन्म स्थळ", "ऐनपूर, ता. रावेर, जि. जळगाव"],
                ["रक्तगट", "A+"],
                ["मूळ गाव", "शाहपुर, जि. बुऱ्हाणपूर"],
                ["मामकुळ", "सोनवणे"],
              ].map(([label, value]) => (
                <Detail key={label} label={label ?? ""} value={value ?? ""} />
              ))}
            </div>
          </div>
        </section>

        {/* CAREER */}
        <section id="career" className="border-y border-border bg-secondary/45">
          <div className="section-grid">
            <div className="self-start md:col-span-4 md:sticky md:top-28">
              <p className="font-mono text-2xl uppercase tracking-[0.2em] text-gold sm:text-3xl md:text-3xl">
                व्यवसाय
              </p>
              <div className="mt-5 h-px w-20 bg-gold/60 md:mt-7" />
            </div>
            <div className="space-y-0 md:col-span-7 md:col-start-6">
              <Timeline title="क्लिनिक" detail="स्वप्नपूर्ती डे-केअर सेंटर · नेपानगर रोड, नाशिराबाद" />
              <Timeline title="B.H.M.S., D.Pharmacy" detail="Bachelor of Homeopathic Medicine and Surgery · Diploma in Pharmacy" />
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section id="family" className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
            <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker text-2xl sm:text-3xl md:text-4xl">कुटुंब</p>
              </div>
            </div>

            {/* Parents — name + relation only, no photos */}
            <div className="max-w-3xl">
              <p className="font-mono text-lg uppercase tracking-[0.2em] text-primary-foreground/80 md:text-xl">
                पालक
              </p>
              <dl className="mt-5 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                {parents.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="font-display text-primary-foreground/70 text-2xl italic sm:text-3xl">
                      {person.name}
                    </dt>
                    <dd className="font-mono text-base uppercase tracking-[0.14em] text-gold sm:text-right sm:text-lg">
                      {person.relation} · {person.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Other family members — name + relation only */}
            <div className="mt-14 max-w-3xl md:mt-20">
              <p className="font-mono text-lg uppercase tracking-[0.2em] text-primary-foreground/80 md:text-xl">
                भावंड
              </p>

              {/* भाऊ १ (विवाहित) */}
              <p className="mt-6 font-display text-2xl italic text-gold sm:text-3xl">
                भाऊ १ (विवाहित)
              </p>
              <dl className="mt-3 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                {relatives.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="font-display text-2xl italic text-primary-foreground/70 sm:text-3xl">
                      {person.name}
                    </dt>
                    <dd className="font-mono text-base uppercase tracking-[0.14em] text-gold sm:text-right sm:text-lg">
                      {person.relation} · {person.detail}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* बहीण */}
              <p className="mt-10 font-display text-2xl italic text-gold sm:text-3xl">
                बहीण
              </p>
              <dl className="mt-3 border-y border-primary-foreground/15">
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="font-display text-2xl italic text-primary-foreground/60 sm:text-3xl">
                    नाही
                  </dt>
                  <dd className="font-mono text-lg uppercase tracking-[0.14em] text-white sm:text-right sm:text-xl">
                    —
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* KUNDLI */}
        <section id="kundli" className="section-grid">
          <div className="md:col-span-5">
            <p className="section-kicker text-2xl sm:text-3xl md:text-4xl">
              जन्मपत्रिका आणि कुंडली
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-8 md:gap-x-8 md:gap-y-5">
              {[
                ["धर्म", "हिंदू"],
                ["जात", "सुतार (पांचाळ)"],
                ["गोत्र", "कौशिक"],
                ["मांगलिक", "मांगलिक (स्वराशीमुळे अंशतः शांत)"],
                ["लग्न", "तूळ"],
                ["राशी", "कन्या"],
                ["नक्षत्र", "हस्त, चरण १"],
                ["सध्याची दशा", "राहु–शुक्र (२०२५–२०२८)"],
              ].map(([label, value]) => (
                <Detail key={label} label={label ?? ""} value={value ?? ""} />
              ))}
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <button
              type="button"
              onClick={openKundli}
              className="group relative block w-full overflow-hidden border border-gold/30 bg-card p-2 md:p-3"
              aria-label="कुंडली व्ह्यूअर उघडा"
            >
              <img
                src={kundliImage}
                alt="पारंपारिक जन्म कुंडली"
                width={1024}
                height={1280}
                loading="lazy"
                decoding="async"
                className="mx-auto aspect-[4/5] max-h-[520px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] md:max-h-[620px]"
              />
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-primary px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground md:bottom-7 md:text-sm">
                कुंडली पहा
              </span>
            </button>
          </div>
        </section>

        {/* INTERESTS */}
        <section id="interests" className="border-y border-border bg-secondary/45">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-20">
            <p className="section-kicker text-2xl sm:text-3xl md:text-4xl">
              Hobbies
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 font-display text-3xl italic text-primary sm:text-4xl md:gap-x-8 md:gap-y-4 md:text-6xl">
              {["Reading", "Photography", "Watching Movies", "Listening to Music"].map((i) => (
                <span key={i} className="border-b border-gold/35 pb-1">{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY — groom photos only */}
        <section id="gallery" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-28">
          <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker text-2xl sm:text-3xl md:text-4xl">
                फोटो गॅलरी
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {groomPhotos.map((item, i) => (
              <button
                type="button"
                key={item.label}
                onClick={() => openGroom(i)}
                className="group block w-full overflow-hidden bg-secondary"
                aria-label="फोटो उघडा"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 md:py-24">
            <p className="section-kicker text-3xl sm:text-3xl md:text-4xl">
              संपर्क
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground sm:text-xl md:mt-6 md:text-2xl">
              पसंत पडल्यास,{" "}
              <strong className="block font-bold text-gray-900">तुळसकर कुटुंबाशी संपर्क साधा</strong>{" "}
              आपल्या सोयीनुसार खाली दिलेल्या क्रमांकावर कॉल करा.
            </p>

            <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4 md:mt-10 md:gap-5">
              {contacts.map((person) => (
                <div key={person.phone} className="flex items-center justify-between gap-3 border-b border-border pb-4">
                  <span className="text-left font-display text-2xl text-foreground sm:text-2xl md:text-3xl">
                    {person.name}
                    <span className="ml-2 text-lg uppercase tracking-[0.1em] text-gold sm:text-lg md:text-xl">
                      {person.relation}
                    </span>
                    <span className="block text-base uppercase tracking-[0.1em] text-muted-foreground sm:text-base md:text-lg">
                      {person.detail}
                    </span>
                  </span>
                  <a
                    href={`tel:+91${person.phone}`}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 sm:h-14 sm:w-14"
                    aria-label={`${person.name} यांना कॉल करा`}
                  >
                    <Phone size={26} />
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xl text-muted-foreground md:mt-8 md:text-xl">
              <MapPin size={20} className="mr-1 inline" />
              बसाड, जि. बुऱ्हाणपूर, मध्य प्रदेश
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-9 md:gap-3">
              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className="action-outline text-lg md:text-lg"
              >
                <Share2 size={18} /> प्रोफाइल शेअर करा
              </button>
              <a
                href={PDF_URL}
                download={PDF_FILENAME}
                className="action-outline text-lg md:text-lg"
              >
                <Printer size={18} /> PDF मध्ये जतन करा
              </a>
            </div>

           <div className="mt-10 space-y-3 md:mt-12">
  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-sm">
    ❤️Biodata❤️
  </p>
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-8 bg-gold/40 md:w-12" />
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/80 md:text-sm">
      Created by
    </p>
    <span className="h-px w-8 bg-gold/40 md:w-12" />
  </div>
  <p className="font-script text-3xl leading-tight text-gold md:text-4xl">
    Swapnil Tulaskar
  </p>
</div>
          </div>
        </section>
      </main>

      {viewer && (
        <ImageViewer
          items={viewer.items}
          index={viewer.index}
          setIndex={(i) => setViewer({ items: viewer.items, index: i })}
          onClose={closeViewer}
        />
      )}

      {shareOpen && (
        <ShareDialog onClose={() => setShareOpen(false)} onCopy={copyLink} copied={copied} />
      )}
    </div>
  );
}

/* ---------- Components ---------- */

function Header({ activeSection, menuOpen, setMenuOpen, onShare }: {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onShare: () => void;
}) {
  const links = [
    ["home", "मुख्यपृष्ठ"],
    ["about", "ओळख"],
    ["career", "व्यवसाय"],
    ["family", "कुटुंब"],
    ["kundli", "कुंडली"],
    ["gallery", "गॅलरी"],
    ["contact", "संपर्क"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-5 md:px-10">
        <a href="#home" className="flex items-baseline gap-2 sm:gap-3">
          <span className="font-display text-2xl italic text-primary sm:text-3xl">डॉ. प्रफुल</span>
          <span className="hidden h-5 w-px bg-gold/50 sm:block" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
            बायोडाटा · १९९८
          </span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? "nav-link-active" : ""}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" className="icon-control" onClick={onShare} aria-label="प्रोफाइल शेअर करा">
            <Share2 size={22} />
          </button>
          <button
            type="button"
            className="icon-control lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="नेव्हिगेशन टॉगल करा"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t border-border bg-background px-4 py-3 sm:px-5 sm:py-4 lg:hidden">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-4 font-mono text-base uppercase tracking-[0.18em] text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-foreground">{children}</strong>;
}

function SectionIntro({ index, eyebrow, title }: { index: string; eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="self-start md:col-span-4 md:sticky md:top-28">
      <p className="section-kicker">{index} — {eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl leading-[1] text-primary sm:text-6xl md:leading-[0.98]">{title}</h2>
      <div className="mt-5 h-px w-20 bg-gold/60 md:mt-7" />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-4">
      <dt className="font-mono text-base uppercase tracking-[0.14em] text-muted-foreground md:text-lg">
        {label}
      </dt>
      <dd className="mt-1 text-xl font-bold leading-relaxed text-foreground md:text-2xl">
        {value}
      </dd>
    </div>
  );
}

function Timeline({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="border-t border-border py-5 last:border-b md:py-6">
      <h3 className="font-display text-3xl text-primary md:text-3xl">{title}</h3>
      <p className="mt-2 text-xl text-muted-foreground md:mt-1 md:text-lg">{detail}</p>
    </div>
  );
}

function ShareDialog({ onClose, onCopy, copied }: { onClose: () => void; onCopy: () => void; copied: boolean }) {
  const pageUrl = typeof window === "undefined" ? "" : window.location.href;
  const shareText = encodeURIComponent("डॉ. प्रफुल तुळसकर — वैवाहिक प्रोफाइल");
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-overlay px-4 py-6 sm:px-5" role="dialog" aria-modal="true" aria-label="प्रोफाइल शेअर करा">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-background p-6 shadow-elevated sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-kicker text-base">प्रोफाइल शेअर करा</p>
            <h2 className="mt-2 font-display text-3xl text-primary sm:text-4xl">काळजीपूर्वक पाठवा</h2>
          </div>
          <button type="button" className="icon-control" onClick={onClose} aria-label="शेअर डायलॉग बंद करा">
            <X size={22} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          <button type="button" onClick={onCopy} className="share-option text-base">
            <Copy size={20} /> {copied ? "लिंक कॉपी झाली" : "लिंक कॉपी करा"}
          </button>
          <a className="share-option text-base" href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">
            <Phone size={20} /> व्हॉट्सॲप
          </a>
          <a className="share-option text-base" href={`mailto:?subject=${shareText}&body=${encodeURIComponent(pageUrl)}`}>
            <Mail size={20} /> ईमेल
          </a>
          <a className="share-option text-base" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">
            <Facebook size={20} /> फेसबुक
          </a>
          <button
            type="button"
            className="share-option text-base sm:col-span-2"
            onClick={async () => {
              if (navigator.share) await navigator.share({ title: "डॉ. प्रफुल तुळसकर", url: pageUrl });
            }}
          >
            <ExternalLink size={20} /> अधिक पर्याय
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageViewer({ items, index, setIndex, onClose }: {
  items: ViewerItem[];
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<number | null>(null);

  const canNavigate = items.length > 1;

  const previous = useCallback(() => {
    setZoom(1);
    setIndex((index - 1 + items.length) % items.length);
  }, [index, items.length, setIndex]);
  const next = useCallback(() => {
    setZoom(1);
    setIndex((index + 1) % items.length);
  }, [index, items.length, setIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (canNavigate && event.key === "ArrowLeft") previous();
      if (canNavigate && event.key === "ArrowRight") next();
      if (event.key === "+" || event.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      if (event.key === "-") setZoom((z) => Math.max(z - 0.25, 0.75));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [canNavigate, next, onClose, previous]);

  const item = items[index]!;
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-viewer text-paper print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label} इमेज व्ह्यूअर`}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (!canNavigate) return;
        const end = event.changedTouches[0]?.clientX;
        if (touchStart.current !== null && end !== undefined) {
          const delta = end - touchStart.current;
          if (Math.abs(delta) > 50) delta > 0 ? previous() : next();
        }
        touchStart.current = null;
      }}
    >
      <div className="flex h-16 items-center justify-between border-b border-paper/15 px-3 md:h-20 md:px-6">
        <p className="truncate pr-2 font-mono text-sm uppercase tracking-[0.16em] text-paper/70 md:text-base md:tracking-[0.18em]">
          {item.label}
          {canNavigate && ` · ${index + 1} / ${items.length}`}
        </p>
        <div className="flex items-center gap-1 md:gap-1.5">
          <ViewerButton label="झूम आउट" onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}><Minus /></ViewerButton>
          <ViewerButton label="झूम रीसेट करा" onClick={() => setZoom(1)}><RotateCcw /></ViewerButton>
          <ViewerButton label="झूम इन" onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}><Plus /></ViewerButton>
          <ViewerButton label="पूर्ण स्क्रीन" onClick={toggleFullscreen}><Maximize /></ViewerButton>
          <ViewerButton label="बंद करा" onClick={onClose}><X /></ViewerButton>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-auto p-2 md:p-10">
        {canNavigate && (
          <button type="button" className="viewer-nav left-2 md:left-3" onClick={previous} aria-label="मागील इमेज">
            <ChevronLeft />
          </button>
        )}
        <img
          src={item.src}
          alt={item.alt}
          decoding="async"
          className="max-h-[calc(100vh-7rem)] max-w-full select-none object-contain transition-transform duration-200 md:max-h-[calc(100vh-8rem)]"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
        {canNavigate && (
          <button type="button" className="viewer-nav right-2 md:right-3" onClick={next} aria-label="पुढील इमेज">
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}

function ViewerButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactElement }) {
  return (
    <button type="button" className="viewer-control" onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}