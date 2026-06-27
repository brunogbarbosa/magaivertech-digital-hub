import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring, useInView, animate, useTransform } from "framer-motion";
import {
  Zap, Target, Scale, Lightbulb, Disc, ScanLine, Instagram, MapPin, Clock,
  ArrowUpRight, ArrowRight, Plus, Wrench, Cog, Sparkles, Star,
} from "lucide-react";
import shop1 from "@/assets/shop-1.png";
import shop2 from "@/assets/shop-2.png";
import shop3 from "@/assets/shop-3.png";
import shop4 from "@/assets/shop-4.png";
import logoAsset from "@/assets/magaiver-logo.png";
import farolAsset from "@/assets/farol-machine.png";

const WHATSAPP = "5561981406061";
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá MagaiverTech! Quero agendar um serviço.")}`;

/* ─────────── SCROLL PROGRESS ─────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-amber"
    />
  );
}

/* ─────────── NAVBAR ─────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { l: "Serviços", h: "#servicos" },
    { l: "Diferenciais", h: "#diferenciais" },
    { l: "Oficina", h: "#oficina" },
    { l: "Sobre", h: "#sobre" },
    { l: "Contato", h: "#contato" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-xl border-b hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="#" className="group flex items-center gap-3">
          <img src={logoAsset} alt="MagaiverTech" className="h-11 w-11 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight text-cream">Magaiver<span className="text-amber">Tech</span></span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-mute">Auto Center · DF</span>
          </div>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a key={l.h} href={l.h} className="group relative font-body text-[13px] font-medium text-cream/70 transition hover:text-cream">
              {l.l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-5 py-2.5 font-display text-[12px] font-semibold tracking-tight text-amber backdrop-blur transition hover:bg-amber hover:text-ink"
        >
          Agendar
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-45" />
        </a>
      </div>
    </header>
  );
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-ink">
      {/* Background gradient + grain */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,180,0,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(31,42,68,0.6),transparent_55%)]" />
        <div className="grain" />
      </div>

      {/* Vertical rule */}
      <div className="absolute left-6 top-0 hidden h-full border-l hairline lg:block lg:left-10" />
      <div className="absolute right-6 top-0 hidden h-full border-r hairline lg:block lg:right-10" />

      <div className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-12 gap-6 px-6 pt-32 pb-16 lg:px-10 lg:pt-40">
        {/* Left column: kicker + title */}
        <div className="col-span-12 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-amber" />
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-amber">Ceilândia · DF · Desde 1984</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[44px] font-medium leading-[0.95] tracking-[-0.03em] text-cream sm:text-[68px] lg:text-[104px]"
          >
            Tecnologia
            <br />
            <span className="font-serif-it text-amber">que move</span>
            <br />
            <span className="text-mute">seu carro.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 max-w-xl font-body text-[15px] leading-relaxed text-cream/65 sm:text-base"
          >
            Auto Center completo em Ceilândia – DF. Elétrica, mecânica, alinhamento, balanceamento, freios,
            suspensão e regulagem de faróis. Mais de quatro décadas decifrando o que outros desistem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href={WA_URL} target="_blank" rel="noopener"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber px-7 py-4 font-display text-[13px] font-semibold text-ink transition hover:shadow-[0_20px_60px_-10px_rgba(245,180,0,0.5)]"
            >
              <span className="relative z-10">Falar no WhatsApp</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition group-hover:rotate-45" />
            </a>
            <a
              href="#servicos"
              className="group inline-flex items-center gap-3 rounded-full border hairline px-7 py-4 font-display text-[13px] font-medium text-cream/85 transition hover:border-cream/40 hover:text-cream"
            >
              Ver serviços
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Right column: stats card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
          className="col-span-12 lg:col-span-4 lg:pt-6"
        >
          <div className="relative h-full">
            <div className="relative overflow-hidden rounded-2xl border hairline bg-ink-soft/60 backdrop-blur">
              <img src={shop4} alt="Veículo no elevador" className="h-72 w-full object-cover opacity-75 sm:h-96" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-ink/70 px-3 py-1 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-glow-soft" />
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-amber">Em operação</span>
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-[64px] font-medium leading-none tracking-tight text-cream">40<span className="text-amber">+</span></div>
                    <div className="mt-1 font-body text-[11px] uppercase tracking-[0.25em] text-mute">anos resolvendo</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-medium text-cream">5k+</div>
                    <div className="font-body text-[10px] uppercase tracking-[0.2em] text-mute">carros</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="col-span-12 mt-16 flex flex-wrap items-end justify-between gap-6 border-t hairline pt-8">
          <div className="font-body text-[12px] tracking-[0.18em] text-mute uppercase">
            <span className="text-cream">01</span> / 09 — Auto Center completo
          </div>
          <a href="#servicos" className="group inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.25em] text-cream/60 hover:text-amber">
            Role para explorar
            <span className="inline-block h-px w-10 bg-current transition-all group-hover:w-16" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── MARQUEE ─────────── */
function Marquee() {
  const items = [
    "Elétrica Automotiva",
    "Mecânica Geral",
    "Alinhamento Computadorizado",
    "Balanceamento Eletrônico",
    "Regulagem de Faróis",
    "Sistema de Freios",
    "Suspensão",
    "Diagnóstico Scanner",
  ];
  const tripled = [...items, ...items, ...items];
  return (
    <section className="border-y hairline bg-ink py-7 overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {tripled.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-serif-it text-2xl text-cream/70 sm:text-3xl">{t}</span>
            <Plus className="h-4 w-4 text-amber" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────── SECTION LABEL ─────────── */
function SectionLabel({ num, kicker, title, sub }: { num: string; kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-14 grid grid-cols-12 gap-6 lg:mb-20">
      <div className="col-span-12 lg:col-span-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-xs font-medium text-amber">{num}</span>
          <div className="h-px w-8 bg-amber" />
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-mute">{kicker}</span>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">{title}</h2>
        {sub && <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-cream/55">{sub}</p>}
      </div>
    </div>
  );
}

/* ─────────── SERVICES ─────────── */
const services = [
  { Icon: Zap, t: "Elétrica Automotiva", d: "Diagnóstico computadorizado e reparo de todo o sistema elétrico." },
  { Icon: Wrench, t: "Mecânica Geral", d: "Motor, embreagem, câmbio, suspensão e revisões completas." },
  { Icon: Target, t: "Alinhamento", d: "Alinhamento computadorizado de precisão para sua segurança." },
  { Icon: Scale, t: "Balanceamento", d: "Balanceamento eletrônico eliminando vibrações na direção." },
  { Icon: Lightbulb, t: "Regulagem de Faróis", d: "Equipamento exclusivo para ajuste técnico de farol." },
  { Icon: Disc, t: "Sistema de Freios", d: "Pastilhas, discos, fluido, cabos e revisão completa." },
];

function Services() {
  return (
    <section id="servicos" className="relative bg-ink py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel
          num="02"
          kicker="O que fazemos"
          title={<>Seis especialidades, <span className="font-serif-it text-amber">uma obsessão</span> — resolver.</>}
          sub="Do diagnóstico ao reparo final, cada serviço passa pelas mãos de quem viu de tudo na elétrica automotiva."
        />
        <div className="grid grid-cols-1 gap-px border hairline bg-line/30 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft sm:p-10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/30 bg-amber/5 text-amber transition group-hover:bg-amber group-hover:text-ink">
                  <s.Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <span className="font-display text-xs font-medium text-mute">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-medium tracking-tight text-cream">{s.t}</h3>
              <p className="mt-3 font-body text-[14px] leading-relaxed text-cream/55">{s.d}</p>
              <div className="mt-8 flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.25em] text-amber/0 transition group-hover:text-amber">
                Saber mais <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
              {/* corner accent */}
              <div className="absolute right-0 bottom-0 h-12 w-12 origin-bottom-right scale-0 bg-amber transition-transform duration-500 group-hover:scale-100" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── DIFERENCIAIS (asymmetric) ─────────── */
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
    <section id="diferenciais" className="relative overflow-hidden bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel
          num="03"
          kicker="Diferenciais"
          title={<>Por que a <span className="font-serif-it text-amber">MagaiverTech?</span></>}
        />
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="max-w-2xl font-display text-2xl font-light leading-[1.35] tracking-tight text-cream sm:text-3xl">
              Enquanto outros tentam, nós <span className="font-serif-it text-amber">resolvemos</span>. Desde quando a elétrica
              automotiva era analógica até os sistemas digitais de hoje — estivemos aqui, em Ceilândia, fazendo o impossível parecer rotina.
            </p>
            <ul className="mt-12 divide-y hairline border-y hairline">
              {items.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex items-center justify-between py-5"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-display text-xs font-medium text-amber">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-body text-base text-cream/85 transition group-hover:text-cream">{t}</span>
                  </div>
                  <Plus className="h-4 w-4 text-mute transition group-hover:rotate-90 group-hover:text-amber" />
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-2xl border hairline">
              <img src={shop3} alt="Interior da oficina" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="font-serif-it text-3xl text-cream sm:text-4xl">
                  "Onde os carros voltam <span className="text-amber">a funcionar.</span>"
                </div>
                <div className="mt-3 font-body text-[11px] uppercase tracking-[0.25em] text-mute">— Magaiver Tech, Ceilândia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── NUMBERS ─────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.floor(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString("pt-BR")}{suffix}</span>;
}

function Numbers() {
  const items = [
    { n: 40, suf: "+", l: "Anos de oficina", k: "Desde 1984" },
    { n: 5000, suf: "+", l: "Carros atendidos", k: "Histórico real" },
    { n: 98, suf: "%", l: "Clientes satisfeitos", k: "Avaliação direta" },
    { n: 6, suf: "", l: "Especialidades", k: "Linha completa" },
  ];
  return (
    <section className="border-y hairline bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-px bg-line/30 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-ink p-8 sm:p-10"
            >
              <div className="font-body text-[11px] uppercase tracking-[0.25em] text-amber">{it.k}</div>
              <div className="mt-6 font-display text-5xl font-medium tracking-tight text-cream sm:text-6xl">
                <Counter to={it.n} suffix={it.suf} />
              </div>
              <div className="mt-3 font-body text-[13px] text-cream/55">{it.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── PROCESSO ─────────── */
function Processo() {
  const steps = [
    { n: "01", t: "Você chama", d: "Mande um oi pelo WhatsApp com o sintoma do carro." },
    { n: "02", t: "Trazemos diagnóstico", d: "Recebemos seu veículo e abrimos uma ordem técnica." },
    { n: "03", t: "Scanner & análise", d: "Equipamento profissional identifica a causa raiz." },
    { n: "04", t: "Reparo & entrega", d: "Resolvemos, testamos e devolvemos pronto pra rodar." },
  ];
  return (
    <section className="bg-ink py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel num="04" kicker="Processo" title={<>Quatro passos, <span className="font-serif-it text-amber">zero mistério.</span></>} />
        <div className="grid grid-cols-1 gap-px border hairline bg-line/30 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative bg-ink p-8 sm:p-10"
            >
              <div className="font-display text-6xl font-medium text-cream/8 leading-none sm:text-7xl" style={{ color: "rgba(244,241,234,0.06)" }}>{s.n}</div>
              <h3 className="mt-6 font-display text-xl font-medium text-cream">{s.t}</h3>
              <p className="mt-3 font-body text-[13px] leading-relaxed text-cream/55">{s.d}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute right-6 top-10 hidden h-4 w-4 text-amber/60 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── OFICINA / GALERIA ─────────── */
function Oficina() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  return (
    <section id="oficina" className="relative overflow-hidden bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel
          num="05"
          kicker="A oficina"
          title={<>Bastidores de quem <span className="font-serif-it text-amber">faz acontecer.</span></>}
          sub="Equipamentos de regulagem de faróis, scanners, elevadores e o estoque sempre pronto. Tudo o que você precisa, num só lugar."
        />
        <div className="grid grid-cols-12 gap-4">
          <motion.div style={{ y }} className="col-span-12 overflow-hidden rounded-2xl border hairline lg:col-span-7 lg:row-span-2">
            <img src={shop4} alt="Veículo no elevador" className="h-full max-h-[640px] w-full object-cover" loading="lazy" />
          </motion.div>
          <div className="col-span-12 overflow-hidden rounded-2xl border hairline sm:col-span-6 lg:col-span-5">
            <img src={shop2} alt="Regulagem de faróis" className="h-72 w-full object-cover sm:h-80" loading="lazy" />
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-4 sm:col-span-6 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border hairline">
              <img src={shop1} alt="Estoque de peças" className="h-44 w-full object-cover sm:h-56" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-2xl border hairline">
              <img src={shop3} alt="Interior da oficina" className="h-44 w-full object-cover sm:h-56" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SOBRE ─────────── */
function Sobre() {
  return (
    <section id="sobre" className="bg-ink py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-medium text-amber">06</span>
              <div className="h-px w-8 bg-amber" />
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-mute">Nossa história</span>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber" />
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-cream/70">Ceilândia – DF · desde os anos 80</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              A história por trás da <span className="font-serif-it text-amber">tecnologia</span>.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <p className="font-body text-[15px] leading-relaxed text-cream/70">
                A MagaiverTech nasceu da paixão por automóveis e da habilidade rara de resolver o que outros deixavam para trás.
                Com quatro décadas no mercado, virou referência em elétrica automotiva no DF.
              </p>
              <p className="font-body text-[15px] leading-relaxed text-cream/70">
                Combinamos a experiência de décadas com equipamentos de diagnóstico digital de ponta. O carro mais antigo ou o
                mais moderno: aqui, ambos saem rodando.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── BIG CTA ─────────── */
function BigCta() {
  return (
    <section className="relative overflow-hidden border-y hairline bg-ink-soft py-32 lg:py-40">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,180,0,0.18),transparent_60%)]" />
        <div className="grain" />
      </div>
      <div className="relative mx-auto max-w-[1100px] px-6 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-4 py-1.5 backdrop-blur">
          <Zap className="h-3.5 w-3.5 text-amber" />
          <span className="font-body text-[11px] uppercase tracking-[0.3em] text-amber">Pronto pra rodar?</span>
        </div>
        <h2 className="mt-8 font-display text-5xl font-medium leading-[1] tracking-tight text-cream sm:text-7xl lg:text-[96px]">
          Seu carro está
          <br />
          <span className="font-serif-it text-amber">falhando?</span> A gente resolve.
        </h2>
        <p className="mx-auto mt-8 max-w-xl font-body text-base text-cream/65">
          Chame agora e agende seu diagnóstico. Atendimento de segunda a sábado, em Ceilândia – DF.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href={WA_URL} target="_blank" rel="noopener" className="group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 font-display text-sm font-semibold text-ink transition hover:shadow-[0_20px_60px_-10px_rgba(245,180,0,0.6)]">
            Falar com especialista
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
          <a href="#contato" className="inline-flex items-center gap-3 rounded-full border hairline px-8 py-4 font-display text-sm text-cream/85 hover:border-cream/40 hover:text-cream">
            Enviar mensagem
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CONTATO ─────────── */
function Contato() {
  return (
    <section id="contato" className="bg-ink py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel num="07" kicker="Contato" title={<>Vamos resolver <span className="font-serif-it text-amber">isso?</span></>} />
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          <form
            onSubmit={(e) => { e.preventDefault(); window.open(WA_URL, "_blank"); }}
            className="col-span-12 rounded-2xl border hairline bg-ink-soft/40 p-8 lg:col-span-7 lg:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nome" name="nome" />
              <Field label="Telefone" name="tel" />
            </div>
            <div className="mt-6">
              <label className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">Tipo de serviço</label>
              <select className="mt-2 w-full appearance-none border-b hairline bg-transparent py-3 font-body text-cream focus:border-amber focus:outline-none">
                {["Elétrica","Alinhamento","Balanceamento","Freios","Diagnóstico","Outro"].map(o => (
                  <option key={o} className="bg-ink">{o}</option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <label className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">Mensagem</label>
              <textarea rows={4} className="mt-2 w-full resize-none border-b hairline bg-transparent py-3 font-body text-cream placeholder:text-mute/60 focus:border-amber focus:outline-none" placeholder="Conte o que está acontecendo..." />
            </div>
            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 font-display text-[13px] font-semibold text-ink transition hover:shadow-[0_20px_50px_-10px_rgba(245,180,0,0.6)]">
              Enviar via WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>

          <div className="col-span-12 lg:col-span-5">
            <div className="space-y-px overflow-hidden rounded-2xl border hairline">
              <InfoRow icon={Instagram} k="Instagram" v="@magaivertech" />
              <InfoRow icon={MapPin} k="Endereço" v="Ceilândia – DF" />
              <InfoRow icon={Clock} k="Atendimento" v="Seg – Sáb · horário comercial" />
            </div>
            <div className="relative mt-6 h-64 overflow-hidden rounded-2xl border hairline bg-ink-soft">
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: "linear-gradient(rgba(245,180,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,180,0,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
              <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: "linear-gradient(45deg, transparent 49%, rgba(245,180,0,0.4) 50%, transparent 51%)",
                backgroundSize: "160px 160px",
              }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-amber/30" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-amber text-ink shadow-[0_0_30px_rgba(245,180,0,0.6)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-5 font-body text-[11px] uppercase tracking-[0.25em] text-amber">Ceilândia · DF</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">{label}</label>
      <input name={name} required className="mt-2 w-full border-b hairline bg-transparent py-3 font-body text-cream placeholder:text-mute/60 focus:border-amber focus:outline-none" />
    </div>
  );
}

function InfoRow({ icon: Icon, k, v }: { icon: any; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between bg-ink-soft/40 p-5">
      <div className="flex items-center gap-4">
        <Icon className="h-4 w-4 text-amber" />
        <div>
          <div className="font-body text-[10px] uppercase tracking-[0.25em] text-mute">{k}</div>
          <div className="font-body text-sm text-cream">{v}</div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-mute" />
    </div>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="bg-[#050810] py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 border-t-2 border-amber pt-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-display text-3xl font-medium tracking-tight text-cream">
              Magaiver<span className="text-amber">Tech</span>
            </div>
            <p className="mt-4 max-w-sm font-serif-it text-xl text-cream/80">
              Seu carro falhando? <span className="text-amber">A gente resolve.</span>
            </p>
          </div>
          <div className="col-span-6 lg:col-span-3">
            <div className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">Navegue</div>
            <ul className="mt-4 space-y-2">
              {["Serviços", "Diferenciais", "Oficina", "Sobre", "Contato"].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="font-body text-sm text-cream/70 hover:text-amber">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-4">
            <div className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">Contato</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-cream/70">
              <li>Ceilândia – DF</li>
              <li>Seg – Sáb · comercial</li>
              <li><a href="https://instagram.com/magaivertech" className="hover:text-amber">@magaivertech</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t hairline pt-6 sm:flex-row sm:items-center">
          <div className="font-body text-xs text-mute">© 2025 MagaiverTech. Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/magaivertech" className="text-cream/70 hover:text-amber"><Instagram className="h-4 w-4" /></a>
            <a href={WA_URL} className="font-body text-xs uppercase tracking-[0.25em] text-cream/70 hover:text-amber">WhatsApp ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── FAROL (special machine) ─────────── */
function Farol() {
  return (
    <section id="farol" className="relative overflow-hidden bg-ink-soft py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(245,180,0,0.12),transparent_55%)]" />
      <div className="grain" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-2xl border hairline">
              <img src={farolAsset} alt="Máquina de regulagem de farol" className="w-full h-[460px] object-cover sm:h-[560px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber/50 bg-ink/80 px-3 py-1.5 backdrop-blur">
                <Sparkles className="h-3 w-3 text-amber" />
                <span className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-amber">Equipamento exclusivo</span>
              </div>
            </div>
          </motion.div>

          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-xs font-medium text-amber">★</span>
              <div className="h-px w-8 bg-amber" />
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-mute">Destaque · Regulagem de faróis</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Uma máquina <span className="font-serif-it text-amber">quase única</span> no DF.
            </h2>
            <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-cream/65">
              Desenvolvida sob medida para a MagaiverTech, nossa máquina de regulagem de faróis garante
              precisão milimétrica no ajuste do feixe de luz — mais segurança à noite, mais visibilidade na chuva
              e zero ofuscamento para o motorista que vem na contramão.
            </p>
            <ul className="mt-10 space-y-4">
              {[
                "Aferição calibrada por padrão técnico",
                "Ajuste de altura e angulação por feixe",
                "Equipamento próprio, raro de encontrar na região",
              ].map((t, i) => (
                <li key={t} className="flex items-center gap-4 border-b hairline pb-4">
                  <span className="font-display text-xs font-medium text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-body text-[15px] text-cream/85">{t}</span>
                </li>
              ))}
            </ul>
            <a href={WA_URL} target="_blank" rel="noopener" className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber px-7 py-3.5 font-display text-[13px] font-semibold text-ink transition hover:shadow-[0_20px_50px_-10px_rgba(245,180,0,0.6)]">
              Agendar regulagem de farol
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CHATGPT TYPING / SOCIAL PROOF ─────────── */
function GptProof() {
  const question = "qual é a melhor mecânica de Ceilândia – DF?";
  const answer = "A MagaiverTech é uma das oficinas mais bem avaliadas de Ceilândia – DF, com 4,9 ★ e mais de 230 avaliações no Google. Especialistas em elétrica, mecânica e regulagem de faróis há mais de 40 anos.";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [qText, setQText] = useState("");
  const [aText, setAText] = useState("");
  const [phase, setPhase] = useState<"idle" | "q" | "think" | "a" | "card">("idle");

  useEffect(() => {
    if (!inView) return;
    setPhase("q");
    let i = 0;
    const qi = setInterval(() => {
      i++;
      setQText(question.slice(0, i));
      if (i >= question.length) {
        clearInterval(qi);
        setPhase("think");
        setTimeout(() => {
          setPhase("a");
          let j = 0;
          const ai = setInterval(() => {
            j += 2;
            setAText(answer.slice(0, j));
            if (j >= answer.length) {
              clearInterval(ai);
              setTimeout(() => setPhase("card"), 400);
            }
          }, 18);
        }, 900);
      }
    }, 35);
    return () => clearInterval(qi);
  }, [inView]);

  return (
    <section className="relative overflow-hidden bg-ink py-28 lg:py-36" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,180,0,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel
          num="06"
          kicker="Indicação que vem de longe"
          title={<>Pergunte à <span className="font-serif-it text-amber">IA</span>. Ela já sabe.</>}
          sub="Quando o ChatGPT é questionado sobre a melhor mecânica de Ceilândia – DF, o nome que aparece é o nosso."
        />

        <div className="mx-auto max-w-[920px]">
          <div className="overflow-hidden rounded-2xl border hairline bg-ink-soft/60 backdrop-blur">
            {/* window bar */}
            <div className="flex items-center justify-between border-b hairline bg-ink/50 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="font-body text-[11px] uppercase tracking-[0.25em] text-mute">chat.openai.com</div>
              <div className="w-12" />
            </div>

            <div className="space-y-5 p-6 sm:p-8 min-h-[420px]">
              {/* user message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-amber/15 border border-amber/20 px-4 py-3 font-body text-[14px] text-cream">
                  {qText}
                  {phase === "q" && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-amber" />}
                </div>
              </div>

              {/* gpt response */}
              {phase !== "idle" && phase !== "q" && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber to-amber-soft">
                    <Sparkles className="h-4 w-4 text-ink" />
                  </div>
                  <div className="flex-1 rounded-2xl rounded-tl-sm border hairline bg-ink/50 px-4 py-3">
                    {phase === "think" ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="h-2 w-2 rounded-full bg-cream/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-cream/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-cream/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <p className="font-body text-[14px] leading-relaxed text-cream/90">
                        {aText}
                        {phase === "a" && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-cream" />}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* business card reveal */}
              {phase === "card" && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="ml-11 mt-4 overflow-hidden rounded-xl border border-amber/30 bg-ink"
                >
                  <div className="grid grid-cols-3 gap-px bg-line/40">
                    <img src={shop1} alt="" className="h-24 w-full object-cover bg-ink" />
                    <img src={shop4} alt="" className="h-24 w-full object-cover bg-ink" />
                    <img src={shop3} alt="" className="h-24 w-full object-cover bg-ink" />
                  </div>
                  <div className="p-5">
                    <div className="font-display text-lg font-semibold text-cream">
                      Magaiver Tech Auto Elétrica e Mecânica
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-amber">4,9</span>
                      <div className="flex">
                        {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />)}
                      </div>
                      <span className="font-body text-xs text-mute">230 avaliações no Google</span>
                    </div>
                    <div className="mt-1 font-body text-xs text-cream/60">Oficina mecânica no Distrito Federal</div>
                    <div className="mt-4 grid grid-cols-1 gap-1.5 font-body text-[12px] text-cream/75 sm:grid-cols-2">
                      <div><span className="text-mute">Endereço:</span> St. M QNM 09 Conj. H Lote 39 — Ceilândia, DF</div>
                      <div><span className="text-mute">Telefone:</span> (61) 98140-6061</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center font-body text-[12px] uppercase tracking-[0.25em] text-mute">
            Reconhecimento real · Google e IA recomendam
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────── WHATSAPP FAB ─────────── */
function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-amber px-5 py-3.5 font-display text-[13px] font-semibold text-ink shadow-[0_20px_50px_-10px_rgba(245,180,0,0.6)] transition hover:shadow-[0_30px_60px_-10px_rgba(245,180,0,0.7)]"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
      </span>
      WhatsApp
    </a>
  );
}

/* ─────────── HOME ─────────── */
function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Farol />
        <Diferenciais />
        <Numbers />
        <GptProof />
        <Processo />
        <Oficina />
        <Sobre />
        <BigCta />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

/* ─────────── APP ─────────── */
export default function App() {
  return (
    <>
      <ScrollProgress />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
