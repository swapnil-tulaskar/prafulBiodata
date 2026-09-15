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

import heroImage from "../assets/praful-hero.jpg";
import kundliImage from "../assets/kundli.jpg";

// 👇 only Father and Mother have photos
import fatherImg from "../assets/father.jpg";
import motherImg from "../assets/mother.jpg";

// 👇 groom photos
import groom1 from "../assets/groom-1.jpg";
import groom2 from "../assets/groom-2.jpg";
import groom3 from "../assets/groom-3.jpg";
import groom4 from "../assets/groom-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Praful Tulaskar — Marriage Biodata" },
      { name: "description", content: "Marriage biodata of Dr. Praful Tulaskar, BHMS, D.Pharma." },
      { property: "og:title", content: "Dr. Praful Tulaskar — Matrimonial Profile" },
      { property: "og:description", content: "A doctor, a devoted family man, and a thoughtful partner in search of a shared life." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

type ViewerItem = { src: string; alt: string; label: string };

// 👇 Parents (with photos)
const parents = [
  { name: "Mr. Subhash Tulaskar", relation: "Father", detail: "Retired Govt. Teacher", src: fatherImg },
  { name: "Mrs. Anita Tulaskar",  relation: "Mother", detail: "Anganwadi Teacher",     src: motherImg },
];

// 👇 Siblings & relatives (name + relation only, no photo)
const relatives = [
  { name: "Mr. Swapnil Tulaskar", relation: "Elder Brother", detail: "B.E. Soft. Engineer" },
  { name: "Mrs. Madhuri Tulaskar", relation: "Sister-in-law", detail: "M.sc. Asst. Professor" },
];

// Gallery viewer list — ONLY groom photos
const groomPhotos: ViewerItem[] = [
  { src: groom1, alt: "Dr. Praful Tulaskar", label: "Groom photo 1" },
  { src: groom2, alt: "Dr. Praful Tulaskar", label: "Groom photo 2" },
  { src: groom3, alt: "Dr. Praful Tulaskar", label: "Groom photo 3" },
  { src: groom4, alt: "Dr. Praful Tulaskar", label: "Groom photo 4" },
];

const heroViewer: ViewerItem[] = [
  { src: heroImage, alt: "Dr. Praful Tulaskar", label: "Profile portrait" },
];

const kundliViewer: ViewerItem[] = [
  { src: kundliImage, alt: "Birth kundli", label: "Kundli" },
];

const parentsItems: ViewerItem[] = parents.map((p) => ({
  src: p.src,
  alt: `${p.name}, ${p.relation}`,
  label: p.name,
}));

const contacts = [
  { name: "Mr. Subhash Tulaskar", relation: "Father", phone: "9009329148" },
  { name: "Mr. Hiralal Tulaskar", relation: "Uncle", phone: "9977745489" },
  { name: "Mr. Pravin Sonavane", relation: "Maternal Uncle", phone: "9028549690" },
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

  const openHero = () => setViewer({ items: heroViewer, index: 0 });
  const openParent = (i: number) => {
    const parent = parentsItems[i];
    if (!parent) return;
    setViewer({ items: [parent], index: 0 });
  };
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
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            onClick={openHero}
            aria-label="Open Dr. Praful's portrait"
          >
            <img
              src={heroImage}
              alt="Dr. Praful Tulaskar in a cream bandhgala"
              width={1920}
              height={1088}
              className="h-full w-full object-cover object-[68%_center]"
            />
          </button>
          <div className="pointer-events-none absolute inset-0 bg-hero-shade" />
          <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl items-end px-5 pb-14 sm:px-6 md:px-10 md:pb-24">
            <div className="max-w-2xl animate-rise">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-gold sm:text-[10px] md:mb-5 md:text-[11px] md:tracking-[0.3em]">
                Matrimonial profile · Basad
              </p>
              <h1 className="font-display text-5xl leading-[0.9] text-paper sm:text-6xl md:text-8xl md:leading-[0.88]">
                Dr. Praful
                <br />
                <span className="italic text-linen">Tulaskar</span>
              </h1>
              <p className="mt-5 max-w-xl font-display text-xl italic leading-snug text-paper/90 sm:text-2xl md:mt-6 md:text-3xl">
                A physician by profession, grounded by family, and in search of a companion for a meaningful life.
              </p>
              <div className="pointer-events-auto mt-7 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
                <a href="#about" className="action-primary">
                  Explore biodata <ChevronRight size={15} />
                </a>
                <a href="#gallery" className="action-ghost">View gallery</a>
                <a
                  href={PDF_URL}
                  download={PDF_FILENAME}
                  className="action-ghost"
                >
                  <Download size={14} /> Biodata
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK SUMMARY */}
        <section aria-label="Quick profile summary" className="border-y border-border bg-secondary/70">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-4 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.12em] sm:grid-cols-3 sm:px-6 md:grid-cols-6 md:gap-y-5 md:px-10 md:py-6">
            {[
              ["Age", "28 years"],
              ["Height", "5'9\""],
              ["Education", "BHMS, D.Pharma"],
              ["Profession", "Clinic Owner"],
              ["Location", "Basad"],
              ["Status", "Never married"],
            ].map(([label, value]) => (
              <div key={label} className="border-l border-border pl-3 md:pl-4">
                <p className="text-muted-foreground">{label}</p>
                <p className="mt-1 text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-grid">
          <SectionIntro index="(a)" eyebrow="Personal profile" title={<>A considered<br />introduction</>} />
          <div className="md:col-span-7 md:col-start-6">
            <p className="editorial-copy">
              I am a BHMS doctor and D.Pharma, running my own clinic—Swapnapurti Day-Care Centre—in Nepanagar Road,
              Nashirabad. Medicine has taught me empathy, patience, and the value of being fully present—qualities I
              hope to bring into a marriage.
            </p>
            <p className="editorial-copy mt-5">
              Outside the clinic, I enjoy reading, photography, Watching Movies,travel, and listening to music. I
              value warmth, intellectual curiosity, and a home built on mutual respect.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:mt-10 md:gap-x-8 md:gap-y-5">
              {[
                ["Full name", "Dr. Praful Subhash Tulaskar"],
                ["Born", "10 April 1998"],
                ["Birth time", "6:55 PM"],
                ["Birth place", "Ainpur, Tal. Raver, Dist. Jalgaon"],
                ["Blood group", "A+"],
                ["Native place", "Shahpur, Dist. Burahanpur"],
              ].map(([label, value]) => (
                  <Detail key={label} label={label ?? ""} value={value ?? ""} />
              ))}
            </div>
          </div>
        </section>

        {/* CAREER */}
        <section id="career" className="border-y border-border bg-secondary/45">
          <div className="section-grid">
            <SectionIntro index="(b)" eyebrow="Education & career" title={<>A vocation<br />of care</>} />
            <div className="space-y-0 md:col-span-7 md:col-start-6">
              <Timeline title="Clinic Owner" detail="Swapnapurti Day-Care Centre · Nepanagar Road, Nashirabad" />
              <Timeline title="BHMS, D.Pharma" detail="Bachelor of Homeopathic Medicine and Surgery · Diploma in Pharmacy" />
            </div>
          </div>
        </section>

        {/* FAMILY */}
        <section id="family" className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
            <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker">(c) — Family</p>
                <h2 className="font-display text-4xl leading-none sm:text-5xl md:text-6xl">
                  Raised in a warm<br />
                  <span className="italic text-linen">household</span>
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/50 md:text-right">
                Parents & relatives
              </p>
            </div>

            {/* Parents — with photos */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:max-w-3xl">
              {parents.map((person, index) => (
                <article key={person.name}>
                  <button
                    type="button"
                    onClick={() => openParent(index)}
                    className="group block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-primary"
                    aria-label={`View ${person.name}'s portrait`}
                  >
                    <img
                      src={person.src}
                      alt={`${person.name}, ${person.relation}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                  <h3 className="mt-3 font-display text-lg italic sm:text-xl">{person.name}</h3>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                    {person.relation} · {person.detail}
                  </p>
                </article>
              ))}
            </div>

            {/* Other family members — name + relation only */}
            <div className="mt-14 max-w-3xl md:mt-20">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50">
                Also in the family
              </p>
              <dl className="mt-5 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                {relatives.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="font-display text-lg italic sm:text-xl">
                      {person.name}
                    </dt>
                    <dd className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold sm:text-right">
                      {person.relation} · {person.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12 max-w-3xl border-t border-primary-foreground/15 pt-6 md:mt-16 md:pt-7">
              <p className="font-display text-xl italic leading-relaxed text-primary-foreground/85 sm:text-2xl">
                "A close-knit, progressive Maharashtrian family that values education, humility, cultural roots, and
                giving each other room to grow."
              </p>
            </div>
          </div>
        </section>

        {/* KUNDLI */}
        <section id="kundli" className="section-grid">
          <div className="md:col-span-5">
            <SectionIntro index="(d)" eyebrow="Horoscope & Kundli" title={<>A brief<br />astrological folio</>} />
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground md:mt-6">
              Included for families who value tradition. The complete chart can be viewed or downloaded.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-8 md:gap-x-8 md:gap-y-5">
              {[
                ["Religion", "Hindu"],
                ["Caste", "Sutar (Panchal)"],
                ["Gotra", "Kaushika"],
                ["Manglik", "Non-Manglik"],
                ["Rashi", "Kanya"],
                ["Nakshatra", "Hasta"],
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
              aria-label="Open Kundli viewer"
            >
              <img
                src={kundliImage}
                alt="Traditional birth Kundli"
                width={1024}
                height={1280}
                loading="lazy"
                className="mx-auto aspect-[4/5] max-h-[520px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015] md:max-h-[620px]"
              />
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-primary px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary-foreground md:bottom-7">
                View Kundli
              </span>
            </button>
          </div>
        </section>

        {/* INTERESTS */}
        <section id="interests" className="border-y border-border bg-secondary/45">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-20">
            <p className="section-kicker">(e) — Beyond medicine</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 font-display text-2xl italic text-primary sm:text-3xl md:gap-x-8 md:gap-y-4 md:text-5xl">
              {["Reading", "Photography", "Watching Movies", "Listening to music"].map((i) => (
                <span key={i} className="border-b border-gold/35 pb-1">{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY — groom photos only */}
        <section id="gallery" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-28">
          <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">(f) — Gallery</p>
              <h2 className="font-display text-4xl text-primary sm:text-5xl md:text-6xl">A few moments</h2>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Gallery · {groomPhotos.length} photos
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
            {groomPhotos.map((item, i) => (
              <button
                type="button"
                key={item.label}
                onClick={() => openGroom(i)}
                className="group block w-full overflow-hidden bg-secondary"
                aria-label="Open photo"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 md:py-24">
            <p className="section-kicker">(g) — A private note</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-primary sm:text-5xl md:mt-5 md:text-7xl md:leading-none">
              If this resonates,<br />
              <span className="italic">let's begin</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-7">
              Reach the Tulaskar family through our designated contact. Personal details are shared privately and
              respectfully.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 md:mt-10 md:gap-4">
              {contacts.map((person) => (
                <div key={person.phone} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <span className="text-left font-display text-base text-foreground sm:text-lg md:text-xl">
                    {person.name}
                    <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-gold sm:text-[10px]">
                      {person.relation}
                    </span>
                  </span>
                  <a href={`tel:+91${person.phone}`} className="action-dark shrink-0" aria-label={`Call ${person.name}`}>
                    <Phone size={14} /> Call
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground md:mt-8">
              <MapPin size={13} className="mr-1 inline" /> Basad Dist. Burahanpur, Madhya Pradesh
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 md:mt-9 md:gap-3">
              
              <button type="button" onClick={() => setShareOpen(true)} className="action-outline">
                <Share2 size={14} /> Share profile
              </button>
              <a
                href={PDF_URL}
                download={PDF_FILENAME}
                className="action-outline"
              >
                <Printer size={14} /> Save to PDF
              </a>
            </div>
            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground md:mt-12">
              Biodata · Updated September 2026
            </p>
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
    ["home", "Home"],
    ["about", "About"],
    ["career", "Career"],
    ["family", "Family"],
    ["kundli", "Kundli"],
    ["gallery", "Gallery"],
    ["contact", "Contact"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 md:px-10">
        <a href="#home" className="flex items-baseline gap-2 sm:gap-3">
          <span className="font-display text-xl italic text-primary sm:text-2xl">Dr. Praful</span>
          <span className="hidden h-4 w-px bg-gold/50 sm:block" />
          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground sm:text-[9px] sm:tracking-[0.2em]">
            Biodata · 1998
          </span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? "nav-link-active" : ""}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" className="icon-control" onClick={onShare} aria-label="Share profile">
            <Share2 size={18} />
          </button>
          <button
            type="button"
            className="icon-control lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="block border-b border-border py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionIntro({ index, eyebrow, title }: { index: string; eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="self-start md:col-span-4 md:sticky md:top-28">
      <p className="section-kicker">{index} — {eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-[1] text-primary sm:text-5xl md:leading-[0.98]">{title}</h2>
      <div className="mt-5 h-px w-16 bg-gold/60 md:mt-7" />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-3">
      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

function Timeline({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="border-t border-border py-4 last:border-b md:py-5">
      <h3 className="font-display text-xl text-primary md:text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function ShareDialog({ onClose, onCopy, copied }: { onClose: () => void; onCopy: () => void; copied: boolean }) {
  const pageUrl = typeof window === "undefined" ? "" : window.location.href;
  const shareText = encodeURIComponent("Dr. Praful Tulaskar — Matrimonial Profile");
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-overlay px-4 py-6 sm:px-5" role="dialog" aria-modal="true" aria-label="Share profile">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border border-border bg-background p-5 shadow-elevated sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-kicker">Share profile</p>
            <h2 className="mt-2 font-display text-2xl text-primary sm:text-3xl">Send with care</h2>
          </div>
          <button type="button" className="icon-control" onClick={onClose} aria-label="Close share dialog">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
          <button type="button" onClick={onCopy} className="share-option">
            <Copy size={16} /> {copied ? "Link copied" : "Copy link"}
          </button>
          <a className="share-option" href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">
            <Phone size={16} /> WhatsApp
          </a>
          <a className="share-option" href={`mailto:?subject=${shareText}&body=${encodeURIComponent(pageUrl)}`}>
            <Mail size={16} /> Email
          </a>
          <a className="share-option" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noreferrer">
            <Facebook size={16} /> Facebook
          </a>
          <button
            type="button"
            className="share-option sm:col-span-2"
            onClick={async () => {
              if (navigator.share) await navigator.share({ title: "Dr. Praful Tulaskar", url: pageUrl });
            }}
          >
            <ExternalLink size={16} /> More options
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
      aria-label={`${item.label} image viewer`}
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
      <div className="flex h-14 items-center justify-between border-b border-paper/15 px-3 md:h-16 md:px-6">
        <p className="truncate pr-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/70 md:text-[10px] md:tracking-[0.18em]">
          {item.label}
          {canNavigate && ` · ${index + 1} / ${items.length}`}
        </p>
        <div className="flex items-center gap-0.5 md:gap-1">
          <ViewerButton label="Zoom out" onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}><Minus /></ViewerButton>
          <ViewerButton label="Reset zoom" onClick={() => setZoom(1)}><RotateCcw /></ViewerButton>
          <ViewerButton label="Zoom in" onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}><Plus /></ViewerButton>
          <ViewerButton label="Full screen" onClick={toggleFullscreen}><Maximize /></ViewerButton>
          <ViewerButton label="Close" onClick={onClose}><X /></ViewerButton>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-auto p-2 md:p-10">
        {canNavigate && (
          <button type="button" className="viewer-nav left-2 md:left-3" onClick={previous} aria-label="Previous image">
            <ChevronLeft />
          </button>
        )}
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[calc(100vh-7rem)] max-w-full select-none object-contain transition-transform duration-200 md:max-h-[calc(100vh-8rem)]"
          style={{ transform: `scale(${zoom})` }}
          draggable={false}
        />
        {canNavigate && (
          <button type="button" className="viewer-nav right-2 md:right-3" onClick={next} aria-label="Next image">
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