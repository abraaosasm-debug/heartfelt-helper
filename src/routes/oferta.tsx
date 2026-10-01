import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Eye,
  Heart,
  Layers3,
  PencilLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { checkoutUrls } from "@/lib/checkout";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";

const coverSources: Record<number, string> = {
  1: "/covers/Imagens_1.jpg?v=2",
  2: "/covers/Imagens_2.jpg?v=2",
  3: "/covers/Planejamento_de_4_Semanas_Completo_260921_141949.jpg?v=3",
  4: "/covers/Rotina_Visual_para_Recortar_Completo_260921_141935.jpg?v=3",
  5: "/covers/Jogos_de_Mesa_Imprimiveis_03_Completo_260921_142019.jpg?v=3",
  6: "/covers/Caderno_de_Observacao_da_Aprendizagem_04_Completo_260921_142033.jpg?v=3",
  7: "/covers/Atividades_para_Enviar_as_Familias_05_Completo_260921_142043.jpg?v=3",
  8: "/covers/1_v3.jpg?v=1",
};

const coverPreviewSources: Record<number, string> = {
  1: "/covers/optimized/cover-1.webp?v=1",
  2: "/covers/optimized/cover-2.webp?v=1",
  3: "/covers/optimized/cover-3.webp?v=1",
  4: "/covers/optimized/cover-4.webp?v=1",
  5: "/covers/optimized/cover-5.webp?v=1",
  6: "/covers/optimized/cover-6.webp?v=1",
  7: "/covers/optimized/cover-7.webp?v=1",
  8: "/covers/1_v3.jpg?v=1",
};

const coverDimensions: Record<number, { width: number; height: number }> = {
  1: { width: 1080, height: 1528 },
  2: { width: 1080, height: 1527 },
  3: { width: 1080, height: 1526 },
  4: { width: 1080, height: 1526 },
  5: { width: 1080, height: 1526 },
  6: { width: 1080, height: 1396 },
  7: { width: 1080, height: 1526 },
  8: { width: 1080, height: 1528 },
};

const bonuses = [
  ["Planejamento de 4 semanas", "24 páginas", "20 planos de encontros + mapas semanais"],
  ["Rotina visual para recortar", "20 páginas", "Cartões de rotina + quadros personalizáveis"],
  ["Jogos de mesa imprimíveis", "30 páginas", "4 jogos com regras, tabuleiros e peças"],
  ["Caderno de observação", "16 páginas", "14 fichas para acompanhar a aprendizagem"],
  ["Atividades para as famílias", "20 páginas", "15 atividades + 3 modelos de bilhetes"],
] as const;

const curatedPreviewPages = [
  [
    "Trace as Vogais",
    "Alfabetização + grafomotricidade",
    "/previews/selected/kit1-selected-2.jpg",
    "VOLUME 1 • PÁGINA REAL",
    "Volume 1",
  ],
  [
    "Quantos Você Vê?",
    "Números e quantidades",
    "/previews/selected/kit1-selected-4.jpg",
    null,
    "Volume 1",
  ],
  [
    "Amostra real 01",
    "Página real do material",
    "/previews/selected/1.jpg",
    "VOLUME 2 • PÁGINA REAL",
    "Volume 2",
  ],
  ["Amostra real 05", "Página real do material", "/previews/selected/5.jpg", null, "Volume 2"],
  [
    "Amostra real 01",
    "Página real do material",
    "/previews/2_v3.jpg",
    "VOLUME 3 • PÁGINA REAL",
    "Volume 3",
  ],
  ["Amostra real 04", "Página real do material", "/previews/5_v3.jpg", null, "Volume 3"],
] as const;

const educationReview = [
  [
    "Organização por habilidades",
    "A coleção separa propostas de linguagem, coordenação, números, raciocínio, percepção visual e outros eixos, facilitando a escolha conforme o objetivo de cada momento.",
  ],
  [
    "Variedade de propostas",
    "Os três volumes combinam diferentes tipos de atividade, o que ajuda a variar o formato das tarefas sem depender sempre do mesmo exercício.",
  ],
  [
    "Uso flexível",
    "As páginas podem ser escolhidas e impressas individualmente. Isso permite montar sequências curtas ou usar apenas uma atividade quando necessário.",
  ],
] as const;

const faqs = [
  [
    "O que está incluído no Kit Completo?",
    "Os Volumes 1, 2 e 3 mais cinco bônus, totalizando 492 páginas digitais em oito materiais.",
  ],
  [
    "Preciso imprimir tudo de uma vez?",
    "Não. Os arquivos são digitais e você pode imprimir somente as páginas que quiser usar em cada momento.",
  ],
  [
    "O material pode ser usado com diferentes crianças?",
    "As propostas são educativas e podem ser selecionadas conforme o objetivo e o nível de cada criança. O material não substitui avaliação, terapia ou acompanhamento individualizado.",
  ],
  [
    "Como funcionam entrega e garantia?",
    "A compra é concluída pela Cakto. Após a confirmação, siga as instruções de acesso da plataforma. A oferta apresenta garantia de 30 dias; confira as condições no checkout.",
  ],
] as const;

function getCoverSource(number: number) {
  return coverSources[number] ?? coverSources[1];
}

function getCoverPreviewSource(number: number) {
  return coverPreviewSources[number] ?? getCoverSource(number);
}

function getCoverDimensions(number: number) {
  return coverDimensions[number] ?? { width: 1080, height: 1527 };
}

function Cover({
  number,
  title,
  priority = false,
  compact = false,
}: {
  number: number;
  title: string;
  priority?: boolean;
  compact?: boolean;
}) {
  const dimensions = getCoverDimensions(number);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`v3-cover${compact ? " v3-cover-compact" : ""}`}
          aria-label={`Ampliar capa: ${title}`}
        >
          <img
            src={getCoverPreviewSource(number)}
            alt={`Capa de ${title}`}
            width={dimensions.width}
            height={dimensions.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
          />
          <span className="v3-cover-zoom" aria-hidden="true">
            <Eye size={15} />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="v3-cover-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>Capa do material digital em PDF.</DialogDescription>
        <img
          src={getCoverSource(number)}
          alt={`Capa ampliada de ${title}`}
          width={dimensions.width}
          height={dimensions.height}
          loading="eager"
          decoding="async"
        />
      </DialogContent>
    </Dialog>
  );
}

function PreviewPage({
  title,
  skill,
  source,
  badge,
  number,
  volume,
  total = 6,
}: {
  title: string;
  skill: string;
  source: string;
  badge: string | null;
  number: number;
  volume: "Volume 1" | "Volume 2" | "Volume 3";
  total?: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="v34-preview-card" aria-label={`Ampliar página: ${title}`}>
          <div className="v34-preview-media">
            <img
              src={source}
              alt={`Página real do ${volume}: ${title}`}
              width={1086}
              height={1536}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
            {badge ? <span className="v34-preview-badge">{badge}</span> : null}
            <span className="v34-preview-zoom-icon" aria-hidden="true">
              <Eye size={18} />
            </span>
          </div>

          <div className="v34-preview-card-copy">
            <div>
              <span>{skill}</span>
              <strong>{title}</strong>
            </div>
            <span className="v34-preview-index">
              {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="v34-preview-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Página real do {volume}. Visualização individual em alta nitidez.
        </DialogDescription>
        <div className="v34-preview-dialog-scroll">
          <img
            src={source}
            alt={`Página ampliada do ${volume}: ${title}`}
            width={1086}
            height={1536}
            loading="eager"
            decoding="async"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

function trackCheckoutIntent(href: string) {
  const offer =
    href === checkoutUrls.complete
      ? { name: "Kit Completo", value: 39.9 }
      : href === checkoutUrls.essential
        ? { name: "Kit Essencial", value: 10 }
        : null;

  if (!offer || !window.fbq) return;

  window.fbq("track", "InitiateCheckout", {
    content_name: offer.name,
    content_type: "product",
    currency: "BRL",
    value: offer.value,
  });
}

function AttributionLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    const source = new URL(window.location.href);
    const target = new URL(href);

    attributionKeys.forEach((key) => {
      const value = source.searchParams.get(key);
      if (value) target.searchParams.set(key, value);
    });

    setResolvedHref(target.toString());
  }, [href]);

  return (
    <a
      className={className}
      href={resolvedHref}
      aria-label={ariaLabel}
      onClick={() => trackCheckoutIntent(href)}
    >
      {children}
    </a>
  );
}

function PrimaryButton({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <AttributionLink className={`v3-button${dark ? " v3-button-dark" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={18} />
    </AttributionLink>
  );
}

function TrustStrip() {
  return (
    <div className="v32-offer-bar v38-trust-strip v41-offer-strip">
      <div className="v3-shell v32-offer-bar-inner v38-trust-strip-inner v41-offer-strip-inner">
        <div className="v41-offer-strip-main">
          <Sparkles size={16} aria-hidden="true" />
          <strong>KIT COMPLETO</strong>
          <span>
            de <s>R$59,90</s> por <b>R$39,90</b>
          </span>
          <em>ECONOMIZE R$20</em>
        </div>
        <div className="v41-offer-strip-trust">
          <ShieldCheck size={15} aria-hidden="true" />
          <span>Pagamento único • material digital • 30 dias de garantia</span>
        </div>
        <a href="#precos">Ver oferta</a>
      </div>
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <div className="v31-guarantee-seal" role="img" aria-label="Garantia de 30 dias">
      <div className="v31-guarantee-seal-inner">
        <span className="v31-seal-stars" aria-hidden="true">
          ★ ★ ★
        </span>
        <span className="v31-seal-top">GARANTIA</span>
        <strong>30</strong>
        <span className="v31-seal-days">DIAS</span>
        <ShieldCheck className="v31-seal-icon" size={24} aria-hidden="true" />
      </div>
    </div>
  );
}

function Index() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".v3-page");
    if (!page) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(
      page.querySelectorAll<HTMLElement>(
        ".v3-section-heading, .v32-preview-heading, .v80-material-card, .v80-bonus-strip, .v34-preview-card, .v80-edu-card, .v3-price-card, .v3-guarantee, .v3-faq details",
      ),
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    page.classList.add("v3-motion-ready");

    const cleanup: Array<() => void> = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));
    cleanup.push(() => observer.disconnect());

    const header = page.querySelector<HTMLElement>(".v3-header");
    let scrollFrame = 0;
    const updateHeader = () => {
      scrollFrame = 0;
      header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanup.push(() => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    });

    const heroArt = page.querySelector<HTMLElement>(".v3-hero-art");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (heroArt && finePointer) {
      let pointerFrame = 0;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const renderParallax = () => {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        heroArt.style.setProperty("--v50-left-x", `${currentX * -7}px`);
        heroArt.style.setProperty("--v50-left-y", `${currentY * -4}px`);
        heroArt.style.setProperty("--v50-right-x", `${currentX * 7}px`);
        heroArt.style.setProperty("--v50-right-y", `${currentY * -5}px`);
        heroArt.style.setProperty("--v50-center-x", `${currentX * 3}px`);
        heroArt.style.setProperty("--v50-center-y", `${currentY * -7}px`);
        heroArt.style.setProperty("--v50-tilt-x", `${currentY * -1.1}deg`);
        heroArt.style.setProperty("--v50-tilt-y", `${currentX * 1.25}deg`);

        if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
          pointerFrame = window.requestAnimationFrame(renderParallax);
        } else {
          pointerFrame = 0;
        }
      };

      const scheduleParallax = () => {
        if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderParallax);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = heroArt.getBoundingClientRect();
        targetX = Math.max(
          -1,
          Math.min(1, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)),
        );
        targetY = Math.max(
          -1,
          Math.min(1, (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)),
        );
        scheduleParallax();
      };

      const onPointerLeave = () => {
        targetX = 0;
        targetY = 0;
        scheduleParallax();
      };

      heroArt.addEventListener("pointermove", onPointerMove, { passive: true });
      heroArt.addEventListener("pointerleave", onPointerLeave, { passive: true });

      cleanup.push(() => {
        heroArt.removeEventListener("pointermove", onPointerMove);
        heroArt.removeEventListener("pointerleave", onPointerLeave);
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      });
    }

    return () => {
      cleanup.forEach((dispose) => dispose());
      page.classList.remove("v3-motion-ready");
    };
  }, []);

  return (
    <main className="v3-page v80-page">
      <TrustStrip />

      <header className="v3-header">
        <div className="v3-shell v3-header-inner">
          <a className="v3-brand" href="#inicio" aria-label="Ir para o início">
            <span className="v3-brand-mark">
              <BookOpen size={18} />
            </span>
            <span>Kit de Atividades</span>
          </a>

          <nav className="v3-nav" aria-label="Navegação principal">
            <a href="#conteudo">O que vem</a>
            <a href="#amostras">Por dentro</a>
            <a href="#precos">Oferta</a>
          </nav>

          <a className="v3-header-cta" href="#precos">
            Ver Kit Completo
          </a>
        </div>
      </header>

      <section id="inicio" className="v3-hero">
        <div className="v3-shell v3-hero-grid">
          <div className="v3-hero-copy">
            <span className="v3-kicker">ATIVIDADES PRONTAS • 3 VOLUMES + 5 BÔNUS</span>

            <h1>
              Tenha atividades prontas para escolher, imprimir e usar.
              <span> Sem precisar criar tudo do zero.</span>
            </h1>

            <p className="v3-hero-lead">
              Uma coleção com <strong>492 páginas digitais</strong> entre atividades, rotina visual,
              jogos e materiais de apoio para escolher e imprimir conforme a necessidade.
            </p>

            <div className="v3-proof-row v41-proof-row" aria-label="Resumo do Kit Completo">
              <span>
                <strong>3</strong>
                volumes
              </span>
              <span>
                <strong>5</strong>
                bônus
              </span>
              <span>
                <strong>492</strong>
                páginas
              </span>
            </div>

            <div className="v41-hero-offer" aria-label="Oferta de lançamento do Kit Completo">
              <div className="v41-hero-offer-label">
                <Sparkles size={15} aria-hidden="true" />
                KIT COMPLETO
              </div>
              <div className="v41-hero-offer-prices">
                <span>
                  de <s>R$59,90</s>
                </span>
                <strong>R$39,90</strong>
              </div>
              <div className="v41-hero-offer-meta">
                <b>ECONOMIZE R$20</b>
                <span>Pagamento único</span>
              </div>
              <p>492 páginas • 3 volumes • 5 bônus</p>
            </div>

            <div className="v3-hero-actions">
              <PrimaryButton href={checkoutUrls.complete}>
                QUERO TER AS ATIVIDADES PRONTAS
              </PrimaryButton>
              <a className="v3-text-link" href="#conteudo">
                Ver tudo o que vem no Kit Completo
              </a>
            </div>

            <div className="v31-hero-trust">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Checkout via Cakto • produto digital • pagamento único • garantia de 30 dias
              </span>
            </div>
          </div>

          <div className="v3-hero-art" aria-label="Capas dos materiais do Kit Completo">
            <div className="v3-art-orbit v3-art-orbit-one" />
            <div className="v3-art-orbit v3-art-orbit-two" />

            <div className="v3-book v3-book-one">
              <img
                src={getCoverPreviewSource(1)}
                alt="Capa do Volume 1"
                width={1080}
                height={1528}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="v3-book v3-book-two">
              <img
                src={getCoverPreviewSource(2)}
                alt="Capa do Volume 2"
                width={1080}
                height={1527}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            </div>

            <div className="v3-book v3-book-three">
              <img
                src={getCoverPreviewSource(8)}
                alt="Capa do Volume 3"
                width={1080}
                height={1528}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="v3-mini-stack" aria-hidden="true">
              {[3, 4, 5].map((number) => (
                <img
                  key={number}
                  src={getCoverPreviewSource(number)}
                  alt=""
                  width={1080}
                  height={1526}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>

            <span className="v3-art-chip v3-art-chip-top">3 VOLUMES</span>
            <span className="v3-art-chip v3-art-chip-bottom">+ 5 BÔNUS</span>
          </div>
        </div>
      </section>

      <section id="conteudo" className="v3-section v3-section-light v80-content-section">
        <div className="v3-shell">
          <div className="v3-section-heading v80-section-heading">
            <span className="v3-kicker">O QUE VOCÊ RECEBE</span>
            <h2>Os oito materiais, em uma visão rápida.</h2>
            <p>
              <strong>382 páginas</strong> nos três volumes de atividades +{" "}
              <strong>110 páginas</strong> nos cinco bônus. Total:{" "}
              <strong>492 páginas digitais</strong>.
            </p>
          </div>

          <div className="v80-materials-grid">
            <article className="v80-material-card">
              <div className="v80-material-cover">
                <Cover number={1} title="Volume 1 — Kit de Atividades Infantil e Autismo" compact />
              </div>
              <div>
                <span>VOLUME 1 • 91 PÁGINAS</span>
                <h3>Fundamentos</h3>
                <p>
                  Alfabeto, coordenação, números, sílabas, percepção visual, emoções e associação.
                </p>
              </div>
            </article>

            <article className="v80-material-card">
              <div className="v80-material-cover">
                <Cover number={2} title="Volume 2 — Kit de Atividades Infantil e Autismo" compact />
              </div>
              <div>
                <span>VOLUME 2 • 91 PÁGINAS</span>
                <h3>Continuidade</h3>
                <p>
                  Leitura inicial, quantidades até 20, sequências, comunicação e situações do
                  cotidiano.
                </p>
              </div>
            </article>

            <article className="v80-material-card">
              <div className="v80-material-cover">
                <Cover number={8} title="Volume 3 — Kit de Atividades Infantil e Autismo" compact />
              </div>
              <div>
                <span>VOLUME 3 • 200 PÁGINAS</span>
                <h3>Maior volume</h3>
                <p>Traçados, leitura inicial, números, raciocínio, percepção visual e desenho.</p>
              </div>
            </article>
          </div>

          <div className="v80-bonus-strip" id="bonus">
            <div className="v80-bonus-summary">
              <span>5 BÔNUS • 110 PÁGINAS</span>
              <strong>Materiais complementares para organizar e variar o uso.</strong>
            </div>
            <div className="v80-bonus-chips" aria-label="Bônus incluídos">
              {bonuses.map(([title]) => (
                <span key={title}>{title}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="amostras"
        className="v32-preview-section v46-compact-preview-section v80-preview-section"
        aria-labelledby="preview-title"
      >
        <div className="v3-shell">
          <div className="v32-preview-heading v46-preview-heading v80-preview-heading">
            <div>
              <span className="v3-kicker">6 PÁGINAS REAIS • 3 VOLUMES</span>
              <h2 id="preview-title">Veja o material por dentro.</h2>
            </div>
            <p>Seis páginas reais, escolhidas para mostrar os três volumes sem alongar a página.</p>
          </div>

          <div
            className="v33-preview-carousel v46-preview-carousel v80-preview-carousel"
            role="region"
            aria-label="Galeria compacta com páginas reais dos três volumes"
          >
            {curatedPreviewPages.map(([title, skill, source, badge, volume], index) => (
              <PreviewPage
                key={source}
                title={title}
                skill={skill}
                source={source}
                badge={badge}
                number={index + 1}
                volume={volume}
                total={6}
              />
            ))}
          </div>

          <p className="v33-preview-hint">
            6 amostras reais • deslize no celular • toque para ampliar
          </p>
        </div>
      </section>

      <section id="avaliacao" className="v3-section v80-edu-section" aria-labelledby="edu-title">
        <div className="v3-shell">
          <div className="v80-edu-head">
            <span className="v3-kicker">LEITURA EDUCACIONAL DO MATERIAL</span>
            <h2 id="edu-title">
              Três pontos relevantes ao selecionar atividades para o dia a dia.
            </h2>
            <p>
              Análise editorial baseada nas características observáveis dos próprios PDFs.
              <strong> Não é depoimento nem endosso de profissional externo.</strong>
            </p>
          </div>

          <div className="v80-edu-grid">
            {educationReview.map(([title, text], index) => (
              <article className="v80-edu-card" key={title}>
                <span>CRITÉRIO {String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <p className="v80-edu-note">
            Para uso profissional, a escolha das atividades deve considerar o objetivo educacional,
            o contexto e as necessidades individuais da criança.
          </p>
        </div>
      </section>

      <section id="precos" className="v3-section v3-pricing-section">
        <div className="v3-shell">
          <div className="v3-section-heading v3-pricing-heading">
            <span className="v3-kicker">OFERTA PRINCIPAL</span>
            <h2>Leve os oito materiais por R$39,90.</h2>
            <p>492 páginas digitais • 3 volumes • 5 bônus • pagamento único.</p>
          </div>

          <div className="v3-pricing-grid v43-pricing-focus">
            <article className="v3-price-card v3-price-card-complete">
              <span className="v31-complete-ribbon">492 PÁGINAS • 3 VOLUMES + 5 BÔNUS</span>

              <span className="v3-popular-badge">
                <Sparkles size={14} />
                KIT COMPLETO
              </span>

              <span className="v3-price-tag">KIT COMPLETO</span>
              <div className="v41-price-promo-headline">
                <strong>R$20 DE DESCONTO</strong>
                <span>valor atual</span>
              </div>
              <h3>Abra, escolha, imprima e use</h3>
              <p className="v3-price-description">
                Três volumes de atividades e cinco bônus organizados em uma única coleção digital.
              </p>

              <div className="v40-price-anchor">
                Preço normal <s>R$59,90</s>
              </div>

              <div className="v3-price v40-promo-price">
                <span>R$</span>
                <strong>39</strong>
                <small>,90</small>
              </div>

              <p className="v40-price-savings">Você economiza R$20,00 • pagamento único</p>

              <ul>
                {[
                  "492 páginas digitais",
                  "3 volumes de atividades",
                  "5 bônus complementares",
                  "PDFs prontos para selecionar e imprimir",
                  "Pagamento único",
                ].map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton href={checkoutUrls.complete}>
                QUERO TER AS ATIVIDADES PRONTAS
              </PrimaryButton>

              <p className="v3-price-difference v40-price-difference">
                <strong>8 materiais no total:</strong> 3 volumes + 5 bônus.
              </p>
            </article>
          </div>

          <details className="v43-essential-downsell">
            <summary>
              <span>
                Prefere começar com uma opção menor?
                <small>Ver Kit Essencial de 91 páginas</small>
              </span>
              <b>R$10,00</b>
            </summary>
            <div className="v43-essential-downsell-body">
              <div>
                <strong>Kit Essencial — somente Volume 1</strong>
                <p>
                  91 páginas, sem os Volumes 2 e 3 e sem os cinco bônus. Esta opção permanece
                  disponível para quem prefere começar com uma versão menor.
                </p>
              </div>
              <div className="v43-essential-downsell-action">
                <span>R$10,00</span>
                <PrimaryButton href={checkoutUrls.essential} dark>
                  VER KIT ESSENCIAL
                </PrimaryButton>
              </div>
            </div>
          </details>

          <div className="v46-checkout-note">
            <ShieldCheck size={17} aria-hidden="true" />
            <span>Checkout via Cakto • produto digital • sem frete • garantia de 30 dias</span>
          </div>
        </div>
      </section>

      <section id="duvidas" className="v3-section v3-assurance-section">
        <div className="v3-shell v3-assurance-grid">
          <div className="v3-guarantee">
            <GuaranteeSeal />
            <span className="v3-kicker">GARANTIA DE 30 DIAS</span>
            <h2>Compra digital com garantia de 30 dias.</h2>
            <p>
              Confira no checkout as condições da garantia, entrega e atendimento antes de concluir
              o pagamento.
            </p>
            <a href="#precos">
              Ver oferta <ArrowRight size={16} />
            </a>
          </div>

          <div className="v3-faq">
            <span className="v3-kicker">DÚVIDAS RÁPIDAS</span>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AttributionLink
        className="v31-mobile-buybar"
        href={checkoutUrls.complete}
        ariaLabel="Ter a coleção de atividades prontas por R$39,90, preço promocional de lançamento"
      >
        <span className="v41-mobile-price">
          <small>
            OFERTA • <s>R$59,90</s>
          </small>
          <strong>R$39,90</strong>
        </span>
        <b>
          QUERO AS ATIVIDADES <ArrowRight size={16} />
        </b>
      </AttributionLink>

      <footer className="v3-footer">
        <div className="v3-shell">
          <p>© 2026 Kit de Atividades Infantil e Autismo. Material digital educativo.</p>
          <p>
            Não substitui avaliação, terapia ou acompanhamento individualizado. Confira as
            informações de pagamento, entrega e atendimento no checkout antes da compra.
          </p>
          <div className="v42-footer-links">
            <Link to="/privacidade">Política de privacidade</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Atividades prontas para imprimir | Kit com 492 páginas" },
      {
        name: "description",
        content:
          "Tenha atividades prontas para escolher, imprimir e usar sem criar tudo do zero. Kit digital com 492 páginas, 3 volumes + 5 bônus por R$39,90.",
      },
      { property: "og:title", content: "Atividades prontas para escolher, imprimir e usar" },
      {
        property: "og:description",
        content:
          "Pare de começar do zero toda vez que precisar de uma atividade. Tenha 492 páginas organizadas em 3 volumes + 5 bônus por R$39,90.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kitcompletoautismoeinfantil.lovable.app/oferta",
      },
    ],
  }),
  component: Index,
});
