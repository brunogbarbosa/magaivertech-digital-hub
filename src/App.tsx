import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  Zap, Target, Scale, Lightbulb, Disc, ScanLine, Instagram, MapPin, Clock, Phone, ArrowRight, ChevronDown, MessageCircle,
} from "lucide-react";
import shop1 from "@/assets/shop-1.png";
import shop2 from "@/assets/shop-2.png";
import shop3 from "@/assets/shop-3.png";
import shop4 from "@/assets/shop-4.png";

const WHATSAPP = "5561999999999"; // placeholder
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá MagaiverTech! Quero agendar um serviço.")}`;

/* ------------------- HUD CIRCUIT BACKGROUND ------------------- */
function HudCircuit({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="hudGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f5c200" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5c200" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lineGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#f5c200" stopOpacity="0" />
          <stop offset="50%" stopColor="#f5c200" stopOpacity="1" />
          <stop offset="100%" stopColor="#f5c200" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <g stroke="#f5c200" strokeOpacity="0.08" strokeWidth="1">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
        ))}
      </g>

      <circle cx="600" cy="400" r="320" fill="url(#hudGrad)" className="animate-hud-pulse" />

      {/* Circuit traces */}
      <g fill="none" stroke="#f5c200" strokeWidth="1.5">
        <path className="circuit-path" d="M 0 200 L 240 200 L 280 240 L 480 240 L 520 200 L 800 200 L 840 240 L 1200 240" />
        <path className="circuit-path" style={{ animationDelay: "-2s" }} d="M 0 560 L 200 560 L 240 520 L 520 520 L 560 560 L 760 560 L 800 520 L 1200 520" />
        <path className="circuit-path" style={{ animationDelay: "-4s" }} d="M 100 0 L 100 160 L 140 200 L 140 360 L 100 400 L 100 800" />
        <path className="circuit-path" style={{ animationDelay: "-6s" }} d="M 1100 0 L 1100 200 L 1060 240 L 1060 480 L 1100 520 L 1100 800" />
        <path className="circuit-path" style={{ animationDelay: "-1s" }} d="M 300 800 L 300 640 L 360 580 L 600 580 L 660 640 L 660 800" />
      </g>

      {/* Nodes */}
      <g fill="#f5c200">
        {[
          [240, 200], [520, 200], [840, 240], [240, 520], [560, 560], [100, 200], [1060, 240], [360, 580], [660, 640],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* ------------------- LOADING SCREEN ------------------- */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const dur = 2000;
    let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0f1e]"
    >
      <HudCircuit opacity={0.25} />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-10"
      >
        <div className="font-display text-7xl font-black tracking-tighter">
          <span className="text-gold">M</span>
          <span className="text-white">T</span>
        </div>
        <div className="mt-1 text-center font-tech text-xs tracking-[0.4em] text-mute">MAGAIVER TECH</div>
      </motion.div>

      <div className="relative z-10 h-1 w-72 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gold transition-[width] duration-75"
          style={{ width: `${progress * 100}%`, boxShadow: "0 0 12px #f5c200" }}
        />
      </div>
      <div className="relative z-10 mt-4 font-display text-xs tracking-[0.3em] text-gold animate-blink">
        INICIANDO DIAGNÓSTICO...
      </div>
    </motion.div>
  );
}

/* ------------------- SCROLL PROGRESS ------------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gold"
    />
  );
}

/* ------------------- CUSTOM CURSOR ------------------- */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    setShow(true);
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);
  if (!show) return null;
  return (
    <motion.div
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] -ml-2 -mt-2 h-4 w-4 rounded-full bg-gold mix-blend-difference"
    />
  );
}

/* ------------------- NAVBAR ------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { l: "Início", h: "#hero" },
    { l: "Serviços", h: "#servicos" },
    { l: "Diferenciais", h: "#diferenciais" },
    { l: "Sobre", h: "#sobre" },
    { l: "Contato", h: "#contato" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/90 backdrop-blur-lg border-b border-gold/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-xl font-black tracking-wider">
          <span className="text-gold">M</span>
          <span className="text-white">AGAIVER </span>
          <span className="text-gold">T</span>
          <span className="text-white">ECH</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.h} href={l.h} className="font-tech text-sm uppercase tracking-widest text-white/80 transition hover:text-gold">
              {l.l}
            </a>
          ))}
        </nav>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="group relative bg-gold px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-navy transition hover:shadow-[0_0_30px_rgba(245,194,0,0.6)]"
        >
          Agendar Serviço
        </a>
      </div>
    </header>
  );
}

/* ------------------- HERO ------------------- */
function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-navy">
      <HudCircuit opacity={0.45} />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 border border-gold/40 bg-navy/60 px-4 py-1.5 backdrop-blur animate-gold-pulse"
        >
          <Zap className="h-3.5 w-3.5 text-gold" />
          <span className="font-tech text-xs font-semibold tracking-[0.3em] text-gold">DIAGNÓSTICO DIGITAL</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Elétrica
          <br />
          <span className="text-gold">Automotiva</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="my-8 h-px w-32 origin-left bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl font-body text-base leading-relaxed text-white/70 sm:text-lg"
        >
          <span className="text-gold font-semibold">+40 anos</span> resolvendo o que outros não conseguem. Especialistas em diagnóstico
          elétrico, alinhamento e balanceamento em <span className="text-white">Ceilândia – DF</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-gold px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy transition hover:shadow-[0_0_40px_rgba(245,194,0,0.6)]"
          >
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
          >
            Ver Serviços
          </a>
        </motion.div>
      </div>

      <a
        href="#credibilidade"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold animate-bounce-down"
        aria-label="Rolar"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}

/* ------------------- MARQUEE ------------------- */
function Credibility() {
  const items = [
    "⚡ +40 ANOS DE EXPERIÊNCIA",
    "🔧 DIAGNÓSTICO DIGITAL",
    "📍 CEILÂNDIA – DF",
    "✅ QUALIDADE GARANTIDA",
  ];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <section id="credibilidade" className="overflow-hidden bg-gold py-5">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {doubled.map((t, i) => (
          <span key={i} className="font-display text-sm font-black uppercase tracking-widest text-navy">
            {t} <span className="ml-12 text-navy/40">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------- SECTION TITLE ------------------- */
function SectionTitle({ children, kicker }: { children: React.ReactNode; kicker?: string }) {
  return (
    <div className="mb-16">
      {kicker && (
        <div className="mb-3 font-tech text-xs font-semibold tracking-[0.4em] text-gold">{kicker}</div>
      )}
      <h2 className="inline-block font-display text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
        {children}
        <div className="mt-3 h-1 w-24 bg-gold" />
      </h2>
    </div>
  );
}

/* ------------------- SERVICES ------------------- */
const services = [
  { Icon: Zap, title: "Elétrica Automotiva", desc: "Diagnóstico computadorizado e reparo de todo sistema elétrico do seu veículo." },
  { Icon: Target, title: "Alinhamento", desc: "Alinhamento computadorizado de precisão para maior segurança e durabilidade dos pneus." },
  { Icon: Scale, title: "Balanceamento", desc: "Balanceamento eletrônico eliminando vibrações e garantindo conforto na direção." },
  { Icon: Lightbulb, title: "Regulagem de Faróis", desc: "Ajuste técnico de faróis para máxima visibilidade e segurança noturna." },
  { Icon: Disc, title: "Sistema de Freios", desc: "Revisão completa de freios: pastilhas, discos, fluido e cabos." },
  { Icon: ScanLine, title: "Diagnóstico Geral", desc: "Scanner automotivo profissional para identificar qualquer problema no veículo." },
];

function ServiceCard({ s, i }: { s: typeof services[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full border border-gold/20 bg-navy-soft p-8 transition-all duration-300 hover:border-gold hover:shadow-[0_0_50px_-10px_rgba(245,194,0,0.6)]"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-0 right-0 font-display text-xs text-gold/30">0{i + 1}</div>
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-gold/40 bg-navy text-gold transition group-hover:scale-110 group-hover:bg-gold group-hover:text-navy">
          <s.Icon className="h-7 w-7" />
        </div>
        <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-wide text-white">{s.title}</h3>
        <p className="font-body text-sm leading-relaxed text-mute">{s.desc}</p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
      </div>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="servicos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="O QUE FAZEMOS">Nossos Serviços</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- DIFERENCIAIS ------------------- */
function Diferenciais() {
  const items = [
    "Mais de 40 anos de experiência real",
    "Equipamentos de diagnóstico de última geração",
    "Atendimento honesto e transparente",
    "Orçamento sem surpresas",
    "Equipe técnica especializada",
    "Localização central em Ceilândia – DF",
  ];
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-navy-soft py-28">
      <div className="absolute inset-0 opacity-30"><HudCircuit opacity={0.25} /></div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <SectionTitle kicker="DIFERENCIAIS">Por que a MagaiverTech?</SectionTitle>
          <p className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-white/75">
            Enquanto outros tentam, nós resolvemos. Desde que a elétrica automotiva era analógica até os sistemas digitais mais
            modernos de hoje — a MagaiverTech esteve aqui, em Ceilândia, resolvendo o que parecia impossível.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-start gap-3"
              >
                <Zap className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <span className="font-body text-white/90">{t}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <div className="font-display text-[18rem] font-black leading-none text-stroke-gold opacity-60 sm:text-[22rem]">
              40
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-3xl font-bold uppercase tracking-widest text-gold sm:text-4xl">
              + Anos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------- COUNTERS ------------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="font-display text-5xl font-black text-navy sm:text-7xl">
      {val.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

function Numbers() {
  const items = [
    { n: 40, suf: "+", l: "Anos de Experiência" },
    { n: 5000, suf: "+", l: "Carros Atendidos" },
    { n: 98, suf: "%", l: "Clientes Satisfeitos" },
    { n: 6, suf: "", l: "Tipos de Serviço" },
  ];
  return (
    <section className="bg-gold py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.l} className="text-center">
            <Counter to={it.n} suffix={it.suf} />
            <div className="mt-3 font-tech text-sm font-bold uppercase tracking-widest text-navy/80">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------- PROCESSO ------------------- */
function Processo() {
  const steps = [
    { n: "01", t: "Chame no WhatsApp" },
    { n: "02", t: "Traga seu veículo" },
    { n: "03", t: "Diagnóstico preciso" },
    { n: "04", t: "Problema resolvido" },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="ETAPAS">Como Funciona</SectionTitle>
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gold font-display text-2xl font-black text-navy shadow-[0_0_30px_rgba(245,194,0,0.4)]">
                {s.n}
              </div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">{s.t}</h3>
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] border-t border-dashed border-gold/60 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- SOBRE / HISTORIA ------------------- */
function Sobre() {
  return (
    <section id="sobre" className="bg-navy-soft py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle kicker="NOSSA HISTÓRIA">A história por trás da tecnologia</SectionTitle>
          <div className="border-l-2 border-gold pl-6">
            <p className="font-body text-lg leading-relaxed text-white/80">
              A MagaiverTech nasceu da paixão por automóveis e da habilidade de resolver problemas que outros deixavam para trás.
              Com mais de 40 anos no mercado, se tornou referência em elétrica automotiva em Ceilândia – DF, combinando a experiência
              de décadas com tecnologia de diagnóstico digital de ponta.
            </p>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 border border-gold/40 bg-navy px-4 py-2">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="font-tech text-sm font-semibold tracking-widest text-white">
              CEILÂNDIA – DF · DESDE OS ANOS 80
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-3"
        >
          <img src={shop4} alt="Carro no elevador da MagaiverTech" className="col-span-2 h-64 w-full border border-gold/30 object-cover" loading="lazy" />
          <img src={shop3} alt="Oficina MagaiverTech" className="h-44 w-full border border-gold/30 object-cover" loading="lazy" />
          <img src={shop2} alt="Equipamento de regulagem de faróis" className="h-44 w-full border border-gold/30 object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------- GALERIA ------------------- */
function Galeria() {
  const imgs = [
    { src: shop1, t: "Estoque & Produtos" },
    { src: shop2, t: "Regulagem de Faróis" },
    { src: shop3, t: "Elevador & Diagnóstico" },
    { src: shop4, t: "Suspensão & Alinhamento" },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="A OFICINA">Bastidores</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {imgs.map((im, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden border border-gold/20"
            >
              <img src={im.src} alt={im.t} loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-tech text-xs font-bold tracking-widest text-gold">0{i + 1}</div>
                <div className="font-display text-base font-bold uppercase text-white">{im.t}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- BIG CTA ------------------- */
function BigCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-mid to-navy py-28">
      <HudCircuit opacity={0.35} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-6xl"
        >
          Seu carro está <span className="text-gold">falhando?</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-white/75">
          A gente resolve. Chame agora e agende seu diagnóstico.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="mt-10 inline-flex items-center gap-3 bg-gold px-10 py-5 font-display text-base font-black uppercase tracking-widest text-navy animate-gold-pulse"
        >
          <Zap className="h-6 w-6" />
          Falar com Especialista
        </a>
        <div className="mt-8 font-tech text-sm tracking-widest text-mute">
          📍 CEILÂNDIA – DF · ATENDIMENTO DE SEGUNDA A SÁBADO
        </div>
      </div>
    </section>
  );
}

/* ------------------- CONTATO ------------------- */
function Contato() {
  return (
    <section id="contato" className="bg-navy-soft py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle kicker="FALE CONOSCO">Contato</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open(WA_URL, "_blank");
            }}
            className="glass-dark p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input required placeholder="Nome" className="bg-navy/60 border border-gold/20 px-4 py-3 font-body text-white placeholder:text-mute focus:border-gold focus:outline-none" />
              <input required placeholder="Telefone" className="bg-navy/60 border border-gold/20 px-4 py-3 font-body text-white placeholder:text-mute focus:border-gold focus:outline-none" />
            </div>
            <select className="mt-5 w-full bg-navy/60 border border-gold/20 px-4 py-3 font-body text-white focus:border-gold focus:outline-none">
              <option>Elétrica</option>
              <option>Alinhamento</option>
              <option>Balanceamento</option>
              <option>Freios</option>
              <option>Diagnóstico</option>
              <option>Outro</option>
            </select>
            <textarea rows={5} placeholder="Mensagem" className="mt-5 w-full bg-navy/60 border border-gold/20 px-4 py-3 font-body text-white placeholder:text-mute focus:border-gold focus:outline-none" />
            <button className="mt-6 w-full bg-gold px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-navy transition hover:shadow-[0_0_30px_rgba(245,194,0,0.6)]">
              Enviar via WhatsApp
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="glass-dark p-6">
              <div className="space-y-5">
                <div className="flex items-start gap-3"><Instagram className="mt-1 h-5 w-5 text-gold" /><div><div className="font-tech text-xs uppercase tracking-widest text-mute">Instagram</div><div className="font-body text-white">@magaivertech</div></div></div>
                <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-gold" /><div><div className="font-tech text-xs uppercase tracking-widest text-mute">Localização</div><div className="font-body text-white">Ceilândia – DF</div></div></div>
                <div className="flex items-start gap-3"><Clock className="mt-1 h-5 w-5 text-gold" /><div><div className="font-tech text-xs uppercase tracking-widest text-mute">Horário</div><div className="font-body text-white">Seg a Sáb · Horário comercial</div></div></div>
                <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-gold" /><div><div className="font-tech text-xs uppercase tracking-widest text-mute">WhatsApp</div><div className="font-body text-white">Toque no botão flutuante</div></div></div>
              </div>
            </div>

            {/* Stylized map */}
            <div className="relative h-56 overflow-hidden border border-gold/30 bg-navy">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(#f5c200 1px, transparent 1px), linear-gradient(90deg, #f5c200 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, transparent 48%, rgba(245,194,0,0.35) 49%, rgba(245,194,0,0.35) 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(245,194,0,0.2) 49%, rgba(245,194,0,0.2) 51%, transparent 52%)",
                  backgroundSize: "120px 120px",
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/40" />
                  <MapPin className="relative h-10 w-10 text-gold drop-shadow-[0_0_10px_#f5c200]" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 font-tech text-xs font-bold tracking-widest text-gold">CEILÂNDIA · DF</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------- FOOTER ------------------- */
function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-[#050810] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-display text-lg font-black tracking-wider">
          <span className="text-gold">M</span>AGAIVER <span className="text-gold">T</span>ECH
        </div>
        <div className="font-body text-sm italic text-mute">"Seu carro falhando? A gente resolve."</div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com/magaivertech" target="_blank" rel="noopener" className="text-gold hover:text-gold-glow"><Instagram className="h-5 w-5" /></a>
          <a href={WA_URL} target="_blank" rel="noopener" className="text-gold hover:text-gold-glow"><MessageCircle className="h-5 w-5" /></a>
        </div>
      </div>
      <div className="mt-6 text-center font-tech text-xs tracking-widest text-mute">
        © 2025 MAGAIVERTECH. TODOS OS DIREITOS RESERVADOS.
      </div>
    </footer>
  );
}

/* ------------------- WHATSAPP FAB ------------------- */
function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-[0_0_30px_rgba(245,194,0,0.6)] animate-gold-pulse transition hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* ------------------- HOME ------------------- */
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Credibility />
      <Services />
      <Diferenciais />
      <Numbers />
      <Processo />
      <Sobre />
      <Galeria />
      <BigCta />
      <Contato />
      <Footer />
      <WhatsAppFab />
    </>
  );
}

/* ------------------- APP ------------------- */
export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <ScrollProgress />
      <CustomCursor />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
