import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Link2,
  LockKeyhole,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import brandLogo from "../assets/build-your-journey-logo.png.asset.json";
import footballImage from "../assets/platform-football.jpg";
import healthImage from "../assets/platform-health.jpg";
import heroImage from "../assets/platform-hero.jpg";
import lawImage from "../assets/platform-law.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Build Your Journey — Discover, create and connect AI-led journeys" },
      { name: "description", content: "Turn a goal, problem or life event into a guided AI-led journey. Discover journeys, build new Journey products and connect them only with permission." },
      { property: "og:title", content: "Build Your Journey" },
      { property: "og:description", content: "The AI-led web and app platform for discovering, creating and connecting life’s journeys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
  return <img className="brand-logo" src={brandLogo.url} alt="Build Your Journey" />;
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
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function LifeMap() {
  const [connected, setConnected] = useState(false);

  return (
    <div className={`life-map ${connected ? "is-connected" : ""}`}>
      <svg className="map-lines" viewBox="0 0 900 560" aria-hidden="true">
        <path className="map-line line-cyan" d="M116 115 C275 85 320 245 450 280" />
        <path className="map-line line-lime" d="M784 115 C625 85 580 245 450 280" />
        <path className="map-line line-coral" d="M116 445 C275 475 320 315 450 280" />
        <path className="map-line line-navy" d="M784 445 C625 475 580 315 450 280" />
      </svg>
      <div className="map-orbit orbit-one" />
      <div className="map-orbit orbit-two" />
      <div className="map-core">
        <ShieldCheck />
        <strong>{connected ? "Connected by you" : "Your Life Map"}</strong>
        <span>{connected ? "Permission active" : "Private by default"}</span>
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

function MediaStage({ image, title, accent }: { image: string; title: string; accent: "cyan" | "lime" | "coral" }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`media-stage media-${accent}`}>
      <video poster={image} muted playsInline aria-label={`${title} video placeholder`} />
      <img src={image} alt={`${title} — a real-life moment`} loading="lazy" width={1600} height={1104} />
      <div className="media-path"><span /><i /><b /></div>
      <button type="button" className="media-control" onClick={() => setPlaying((value) => !value)} aria-label={`${playing ? "Pause" : "Play"} ${title} preview`}>
        {playing ? <Pause /> : <Play />}
      </button>
      <span className="media-label">{playing ? "Preview active" : "Film ready"}</span>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState("I need to understand the next step for…");
  const [routeReady, setRouteReady] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Build Your Journey home"><BrandMark /></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#start">How it works</a><a href="#life-map">Life Map</a><a href="#journeys">Journeys</a><a href="#builders">For builders</a>
        </nav>
        <a href="#close" className="nav-cta">Find your way in <ArrowDownRight /></a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav">
            <a onClick={() => setMenuOpen(false)} href="#start">How it works</a>
            <a onClick={() => setMenuOpen(false)} href="#life-map">Life Map</a>
            <a onClick={() => setMenuOpen(false)} href="#journeys">Journeys</a>
            <a onClick={() => setMenuOpen(false)} href="#builders">For builders</a>
          </nav>
        )}
      </header>

      <section id="top" className="hero-section">
        <svg className="hero-route" viewBox="0 0 1440 860" aria-hidden="true">
          <path d="M-20 655 C210 790 275 475 495 555 S775 765 930 470 S1130 190 1480 250" />
        </svg>
        <div className="hero-copy">
          <div className="eyebrow"><span /> Discover it. Build it. Connect it.</div>
          <h1>Every goal<br />starts a <em>journey.</em></h1>
          <p>Build Your Journey is the AI-led web and app platform for turning a goal, problem or life event into a guided journey — discovered, created and connected around real life.</p>
          <div className="hero-actions">
            <a href="#start" className="button-primary">Explore journeys <ArrowRight /></a>
            <a href="#builders" className="button-secondary">Build on the platform</a>
          </div>
          <p className="hero-consent"><LockKeyhole /> Build each journey around your life.</p>
        </div>
        <div className="hero-canvas" aria-label="Real-life journeys connected through the platform">
          <div className="hero-image-frame"><img src={heroImage} alt="Real-life football, health, legal and product-building moments connected by a luminous path" width={1920} height={1200} /></div>
          <div className="canvas-ticket ticket-discover"><span>Discover</span><strong>Football journey</strong><i /></div>
          <div className="canvas-ticket ticket-create"><span>Create</span><strong>Journey Studio</strong><i /></div>
          <div className="canvas-ticket ticket-connect"><span>Connect</span><strong>Bring journeys together</strong><ShieldCheck /></div>
          <span className="canvas-index">01—04 / LIFE, CONNECTED BY CHOICE</span>
        </div>
        <a className="scroll-cue" href="#proof">See what’s possible <ArrowDownRight /></a>
      </section>

      <section id="proof" className="proof-strip" aria-label="Initial journey products">
        <div className="proof-label">Live possibilities</div>
        {proofItems.map((item, index) => (
          <a href={index === 3 ? "#start" : "#journeys"} key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowRight /></a>
        ))}
      </section>

      <section id="start" className="goal-section">
        <Reveal className="goal-story">
          <span className="section-number">01 / START WITH NOW</span>
          <p className="story-kicker">One honest starting point.</p>
          <h2>Tell us what<br /><em>matters now.</em></h2>
          <p>Bring a goal, a problem or a life event. The platform turns it into a useful sequence of questions, evidence, decisions and next steps.</p>
        </Reveal>
        <Reveal className="goal-builder">
          <div className="goal-input-wrap">
            <label htmlFor="goal"><span>01</span> What’s happening?</label>
            <textarea id="goal" value={goal} onFocus={() => goal.startsWith("I need") && setGoal("")} onChange={(event) => setGoal(event.target.value)} />
            <button type="button" onClick={() => setRouteReady(true)} disabled={!goal.trim()} aria-label="Create guided route"><ArrowRight /></button>
          </div>
          <div className={`route-preview ${routeReady ? "is-ready" : ""}`} aria-live="polite">
            <div className="route-head"><span>{routeReady ? "Your first route" : "A useful path forms here"}</span><Sparkles /></div>
            {[
              ["Understand", "Make sense of the situation"],
              ["Gather", "Bring the right evidence together"],
              ["Move", "Choose the next safe step"],
            ].map(([label, step], index) => (
              <div className="route-step" key={label}><span>0{index + 1}</span><div><b>{label}</b><p>{step}</p></div>{routeReady && <Check />}</div>
            ))}
            <p className="route-note"><LockKeyhole /> Nothing leaves this journey unless you decide.</p>
          </div>
        </Reveal>
      </section>

      <section id="life-map" className="life-map-section">
        <Reveal className="map-intro">
          <span className="section-number">02 / YOUR LIFE MAP</span>
          <h2>Many journeys.<br /><em>One life.</em></h2>
          <div><p>Football can stay Football. Health can stay Health. Law can stay Law.</p><p>When a connection helps, you decide what joins up — and you can reverse it.</p></div>
        </Reveal>
        <Reveal><LifeMap /></Reveal>
        <div className="trust-row">
          <span><LockKeyhole /> Private by default</span><span><ShieldCheck /> Explicit permission</span><span><Link2 /> Reversible connections</span>
        </div>
      </section>

      <section id="journeys" className="journeys-section">
        <div className="journey-section-head"><span>03—05 / JOURNEYS IN REAL LIFE</span><p>Not categories. Complete routes through the moments that matter.</p></div>
        <article className="journey-story story-football">
          <MediaStage image={footballImage} title="The Journey Football" accent="cyan" />
          <Reveal className="journey-copy">
            <span className="story-number">03 / FOOTBALL</span>
            <h2>The game is only<br />part of the <em>story.</em></h2>
            <p>Navigate opportunities, development, wellbeing and safeguarding — while supporting the whole family around the player.</p>
            <a href="#close">Explore Football <ArrowRight /></a>
          </Reveal>
          <span className="story-word">PLAY</span>
        </article>
        <article className="journey-story story-health">
          <MediaStage image={healthImage} title="The Journey Health" accent="lime" />
          <Reveal className="journey-copy">
            <span className="story-number">04 / HEALTH</span>
            <h2>Clarity for the<br /><em>next conversation.</em></h2>
            <p>Turn a confusing health situation into focused questions, organised evidence and safer next steps. It supports decisions; it never replaces a doctor.</p>
            <a href="#close">Explore Health <ArrowRight /></a>
          </Reveal>
          <span className="story-word">CLARITY</span>
        </article>
        <article className="journey-story story-law">
          <MediaStage image={lawImage} title="The Journey Law" accent="coral" />
          <Reveal className="journey-copy">
            <span className="story-number">05 / LAW</span>
            <h2>Make the complex<br /><em>navigable.</em></h2>
            <p>Organise a legal problem into a guided route through documents, deadlines and appropriate professional support. It never replaces a lawyer.</p>
            <a href="#close">Explore Law <ArrowRight /></a>
          </Reveal>
          <span className="story-word">ORDER</span>
        </article>
      </section>

      <section id="builders" className="builders-section">
        <svg className="builder-path" viewBox="0 0 1200 720" aria-hidden="true"><path d="M-50 590 C250 620 180 220 485 335 S800 600 930 260 S1120 110 1260 170" /></svg>
        <Reveal className="builders-lead">
          <span className="section-number">06 / THE OTHER SIDE OF THE PLATFORM</span>
          <h2>Expertise becomes<br />a <em>Journey product.</em></h2>
          <p>Journey Studio gives people and organisations the infrastructure to turn deep expertise into responsive AI-led web and app Journey products.</p>
          <a href="#partner" className="button-primary">Build with Journey Studio <ArrowRight /></a>
        </Reveal>
        <Reveal className="studio-system">
          <div className="studio-core"><Sparkles /><strong>Journey Studio</strong><span>Build once. Work everywhere.</span></div>
          {[
            ["01", "Shared AI intake"], ["02", "Journey logic"], ["03", "Milestones"],
            ["04", "Evidence"], ["05", "Permissions"], ["06", "Family relationships"],
          ].map(([number, item]) => <div className="studio-node" key={item}><span>{number}</span><p>{item}</p></div>)}
        </Reveal>
      </section>

      <section id="partner" className="partner-section">
        <Reveal className="partner-copy">
          <span className="section-number">07 / ALREADY BUILT SOMETHING BRILLIANT?</span>
          <h2>Bring your product.<br /><em>Keep its identity.</em></h2>
          <p>Existing AI-led web and app products can become discoverable through a trusted home for journeys, then connect to the Life Map only where it adds value — and only with the user’s permission.</p>
        </Reveal>
        <Reveal className="partner-visual">
          <div className="product-tile"><span>YOUR PRODUCT</span><strong>Already built</strong></div>
          <div className="join-line"><i /><ArrowRight /><i /></div>
          <div className="ecosystem-tile"><span>BUILD YOUR JOURNEY</span><strong>Discoverable. Connectable.</strong></div>
          <p><ShieldCheck /> No forced data sharing. No loss of product identity.</p>
        </Reveal>
      </section>

      <section id="close" className="closing-section">
        <div className="closing-intro"><span>YOUR NEXT MOVE</span><h2>How will you<br /><em>begin?</em></h2></div>
        <div className="closing-routes">
          <a href="#start"><span>For people & families</span><strong>Find or build<br />my journey</strong><ArrowRight /></a>
          <a href="#builders"><span>For builders & partners</span><strong>Bring a Journey product<br />to the platform</strong><ArrowRight /></a>
        </div>
      </section>

      <footer>
        <div className="brand"><BrandMark /></div>
        <p>Private by default. Connected only with your permission.</p>
        <a href="#top">Back to top <span>↑</span></a>
      </footer>
    </main>
  );
}