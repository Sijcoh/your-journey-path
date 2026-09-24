import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Check, Link2, LockKeyhole, Menu, Pause, Play, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import footballImage from "../assets/journey-football.jpg";
import healthImage from "../assets/journey-health.jpg";
import heroImage from "../assets/journey-hero.jpg";
import lawImage from "../assets/journey-law.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Build Your Journey — AI-led journeys for life’s defining moments" },
      { name: "description", content: "Discover, build and connect AI-led journeys for the moments that shape your life — private by default and connected only with your permission." },
      { property: "og:title", content: "Build Your Journey" },
      { property: "og:description", content: "Discover, build and connect AI-led journeys — sharing between them only when you choose." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const journeyNodes = [
  { name: "Football", className: "node-football", accent: "bg-cyan" },
  { name: "Health", className: "node-health", accent: "bg-lime" },
  { name: "Law", className: "node-law", accent: "bg-coral" },
  { name: "Complaints", className: "node-complaints", accent: "bg-foreground" },
];

const proofItems = ["The Journey Football", "The Journey Health", "The Journey Law", "Complaints"];

function BrandMark() {
  return (
    <span className="relative grid size-8 shrink-0 place-items-center" aria-hidden="true">
      <span className="absolute inset-1 rotate-45 border border-cyan/70" />
      <span className="size-2 bg-lime shadow-[0_0_16px_var(--lime)]" />
    </span>
  );
}

function LifeMap({ compact = false }: { compact?: boolean }) {
  const [connected, setConnected] = useState(false);
  return (
    <div className={`life-map ${connected ? "is-connected" : ""} ${compact ? "life-map-compact" : ""}`}>
      <svg className="map-lines" viewBox="0 0 600 420" aria-hidden="true">
        <path className="map-line line-cyan" d="M115 112 C210 110 215 205 300 210" />
        <path className="map-line line-lime" d="M485 112 C390 110 385 205 300 210" />
        <path className="map-line line-coral" d="M115 320 C205 320 215 220 300 210" />
        <path className="map-line line-white" d="M485 320 C395 320 385 220 300 210" />
      </svg>
      <div className="map-core">
        <span className="core-ring" />
        <ShieldCheck className="size-5" />
        <span>{connected ? "You chose to connect" : "Private by default"}</span>
      </div>
      {journeyNodes.map((node) => (
        <div className={`map-node ${node.className}`} key={node.name}>
          <span className={`node-light ${node.accent}`} />
          <span>{node.name}</span>
        </div>
      ))}
      <button
        type="button"
        className="permission-toggle"
        aria-pressed={connected}
        onClick={() => setConnected((value) => !value)}
      >
        <span className="toggle-track"><span className="toggle-thumb" /></span>
        <span>{connected ? "Connected — switch off" : "Connect with permission"}</span>
      </button>
    </div>
  );
}

function MediaStage({ image, title, accent, videoLabel }: { image: string; title: string; accent: "cyan" | "lime" | "coral"; videoLabel: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`media-stage media-${accent}`}>
      <video poster={image} muted playsInline aria-label={`${title} video placeholder`} />
      <img src={image} alt="" loading="lazy" width={1600} height={1000} />
      <div className="media-shade" />
      <button type="button" className="media-control" onClick={() => setPlaying((value) => !value)} aria-label={`${playing ? "Pause" : "Play"} ${title} preview`}>
        {playing ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
      </button>
      <span className="media-label">{playing ? "Preview loop active" : videoLabel}</span>
      <span className="media-corner media-corner-a" />
      <span className="media-corner media-corner-b" />
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState("I need to understand the next step for…");
  const [routeReady, setRouteReady] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Build Your Journey home"><BrandMark /><span>Build Your Journey</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#journeys">Journeys</a><a href="#life-map">Life Map</a><a href="#builders">For builders</a>
        </nav>
        <a href="#start" className="nav-cta">Explore journeys <ArrowDownRight className="size-4" /></a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && <nav className="mobile-nav"><a onClick={() => setMenuOpen(false)} href="#journeys">Journeys</a><a onClick={() => setMenuOpen(false)} href="#life-map">Life Map</a><a onClick={() => setMenuOpen(false)} href="#builders">For builders</a></nav>}
      </header>

      <section id="top" className="hero-section">
        <img src={heroImage} alt="A luminous route crossing a dark mountain landscape" width={1920} height={1080} className="hero-image" />
        <div className="hero-overlay" />
        <svg className="hero-path" viewBox="0 0 1440 820" aria-hidden="true"><path d="M-20 760 C180 650 285 790 470 620 S690 590 805 420 S1040 350 1120 170 S1340 160 1480 45" /></svg>
        <div className="hero-content">
          <div className="eyebrow"><span /> A platform for life’s defining moments</div>
          <h1>Every goal<br />starts a <em>journey.</em></h1>
          <p>Discover, build and connect AI-led journeys across the moments that shape your life — sharing between them only when you choose.</p>
          <div className="hero-actions">
            <a href="#start" className="button-primary">Explore journeys <ArrowRight className="size-4" /></a>
            <a href="#builders" className="button-secondary">Build on the platform</a>
          </div>
        </div>
        <div className="hero-map"><LifeMap compact /></div>
        <a className="scroll-cue" href="#proof"><span>Discover the platform</span><ArrowDownRight /></a>
      </section>

      <section id="proof" className="proof-strip" aria-label="Initial journey products">
        <div className="proof-track">{[...proofItems, ...proofItems].map((item, index) => <span key={`${item}-${index}`}><i className={index % 4 === 1 ? "lime" : index % 4 === 2 ? "coral" : "cyan"} />{item}</span>)}</div>
      </section>

      <section id="start" className="section goal-section">
        <Reveal className="section-intro">
          <span className="section-number">01 / START HERE</span>
          <h2>Start with what<br /><em>matters now.</em></h2>
          <p>Bring a goal, a problem or a life event. The platform helps turn it into a clear sequence of questions, evidence, decisions and next steps.</p>
        </Reveal>
        <Reveal className="goal-builder">
          <div className="goal-input-wrap">
            <label htmlFor="goal">What’s happening?</label>
            <textarea id="goal" value={goal} onFocus={() => goal.startsWith("I need") && setGoal("")} onChange={(event) => setGoal(event.target.value)} />
            <button type="button" onClick={() => setRouteReady(true)} disabled={!goal.trim()} aria-label="Create guided route"><ArrowRight /></button>
          </div>
          <div className={`route-preview ${routeReady ? "is-ready" : ""}`} aria-live="polite">
            <div className="route-head"><span>{routeReady ? "Your route is ready to shape" : "A route forms around you"}</span><Sparkles className="size-4" /></div>
            {["Understand the situation", "Gather what matters", "Choose the next safe step"].map((step, index) => <div className="route-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p>{routeReady && <Check className="size-4" />}</div>)}
            <p className="route-note"><LockKeyhole className="size-4" /> Nothing leaves this journey unless you decide.</p>
          </div>
        </Reveal>
      </section>

      <section id="life-map" className="section life-map-section">
        <Reveal className="section-intro wide">
          <span className="section-number">02 / YOUR LIFE MAP</span>
          <h2>Separate by default.<br /><em>Connected by you.</em></h2>
          <p>Your journeys can inform each other, but they never assume permission. Every connection is explicit, specific and reversible.</p>
        </Reveal>
        <Reveal><LifeMap /></Reveal>
        <div className="trust-row">
          <span><LockKeyhole /> Private by default</span><span><ShieldCheck /> Explicit permission</span><span><Link2 /> Reversible connections</span>
        </div>
      </section>

      <section id="journeys" className="showcase-section">
        <article className="showcase showcase-football">
          <MediaStage image={footballImage} title="The Journey Football" accent="cyan" videoLabel="Film placeholder · 00:24" />
          <Reveal className="showcase-copy">
            <span className="section-number">03 / THE JOURNEY FOOTBALL</span>
            <h2>The game is only<br />part of the <em>story.</em></h2>
            <p>Navigate opportunities, development, wellbeing and safeguarding — while supporting the whole family around the player.</p>
            <a href="#close">Explore Football <ArrowRight /></a>
          </Reveal>
        </article>
        <article className="showcase showcase-health">
          <Reveal className="showcase-copy">
            <span className="section-number">04 / THE JOURNEY HEALTH</span>
            <h2>From uncertainty<br />to a <em>clearer next step.</em></h2>
            <p>Turn a confusing health situation into focused questions, organised evidence and safer next steps. It supports decisions; it never replaces a doctor.</p>
            <a href="#close">Explore Health <ArrowRight /></a>
          </Reveal>
          <MediaStage image={healthImage} title="The Journey Health" accent="lime" videoLabel="Film placeholder · 00:18" />
        </article>
        <article className="showcase showcase-law">
          <MediaStage image={lawImage} title="The Journey Law" accent="coral" videoLabel="Film placeholder · 00:21" />
          <Reveal className="showcase-copy">
            <span className="section-number">05 / THE JOURNEY LAW</span>
            <h2>Make the complex<br /><em>navigable.</em></h2>
            <p>Organise a legal problem into a guided route through documents, deadlines and appropriate professional support. It never replaces a lawyer.</p>
            <a href="#close">Explore Law <ArrowRight /></a>
          </Reveal>
        </article>
      </section>

      <section id="builders" className="section builders-section">
        <Reveal className="builders-lead">
          <span className="section-number">06 / FOR BUILDERS</span>
          <h2>Your specialist idea.<br /><em>A platform behind it.</em></h2>
          <p>Journey Studio gives people and organisations the infrastructure to turn deep expertise into a trusted Journey product.</p>
          <a href="#partner" className="button-primary">Bring a Journey to the platform <ArrowRight /></a>
        </Reveal>
        <Reveal className="studio-grid">
          {["Shared AI intake", "Journey logic", "Milestones", "Evidence", "Permissions", "Family relationships"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}
        </Reveal>
      </section>

      <section id="partner" className="partner-section">
        <Reveal className="partner-inner">
          <span className="section-number">07 / ALREADY BUILT SOMETHING BRILLIANT?</span>
          <h2>Give your AI-led product<br />a place in the <em>ecosystem.</em></h2>
          <p>Become discoverable through a trusted home for journeys. Connect to the wider Life Map only where it adds value — and only with the user’s permission.</p>
          <div className="partner-actions"><a href="#close" className="button-primary">Connect an existing product <ArrowRight /></a><span>No forced data sharing. No loss of product identity.</span></div>
        </Reveal>
      </section>

      <section id="close" className="closing-section">
        <svg className="closing-path" viewBox="0 0 1200 500" aria-hidden="true"><path d="M0 410 C240 360 220 120 470 210 S680 410 820 240 S970 90 1200 55" /></svg>
        <Reveal>
          <span className="section-number">YOUR NEXT MOVE</span>
          <h2>One platform.<br /><em>Two ways in.</em></h2>
          <div className="closing-routes">
            <a href="#start"><span>For people & families</span><strong>Find or build my journey</strong><ArrowRight /></a>
            <a href="#builders"><span>For builders & partners</span><strong>Bring a Journey product to the platform</strong><ArrowRight /></a>
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="brand"><BrandMark /><span>Build Your Journey</span></div>
        <p>Private by default. Connected only with your permission.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
