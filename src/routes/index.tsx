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

const previewPagesVolume1 = [
  [
    "Sumário do Kit",
    "Visão geral",
    "/previews/selected/kit1-selected-1.jpg",
    "9 MÓDULOS + ENCERRAMENTO",
  ],
  [
    "Trace as Vogais",
    "Alfabetização + grafomotricidade",
    "/previews/selected/kit1-selected-2.jpg",
    null,
  ],
  ["Coordenação Motora", "Grafomotricidade", "/previews/selected/kit1-selected-3.jpg", null],
  ["Quantos Você Vê?", "Números e quantidades", "/previews/selected/kit1-selected-4.jpg", null],
  [
    "Qual Sílaba Está Faltando?",
    "Formação de palavras",
    "/previews/selected/kit1-selected-5.jpg",
    null,
  ],
  ["Emoções e Comunicação", "Emoções", "/previews/selected/kit1-selected-6.jpg", null],
] as const;

const previewPagesVolume2 = [
  ["Amostra real 01", "Volume 2", "/previews/selected/1.jpg", "VOLUME 2 • CONTEÚDO REAL"],
  ["Amostra real 02", "Volume 2", "/previews/selected/2.jpg", null],
  ["Amostra real 03", "Volume 2", "/previews/selected/3.jpg", null],
  ["Amostra real 04", "Volume 2", "/previews/selected/4.jpg", null],
  ["Amostra real 05", "Volume 2", "/previews/selected/5.jpg", null],
  ["Amostra real 06", "Volume 2", "/previews/selected/6.jpg", null],
] as const;

const previewPagesVolume3 = [
  ["Amostra real 01", "Volume 3", "/previews/2_v3.jpg", "VOLUME 3 • CONTEÚDO REAL"],
  ["Amostra real 02", "Volume 3", "/previews/3_v3.jpg", null],
  ["Amostra real 03", "Volume 3", "/previews/4_v3.jpg", null],
  ["Amostra real 04", "Volume 3", "/previews/5_v3.jpg", null],
  ["Amostra real 05", "Volume 3", "/previews/6_v3.jpg", null],
] as const;

const benefits = [
  [
    PencilLine,
    "Atividades já prontas",
    "Você não precisa criar exercícios do zero toda vez que quiser trabalhar uma habilidade.",
  ],
  [
    Brain,
    "Conteúdo organizado",
    "Letras, números, raciocínio, coordenação e outras propostas separadas por objetivo.",
  ],
  [
    Heart,
    "Mais opções para variar",
    "Três volumes e cinco bônus evitam depender sempre do mesmo tipo de atividade.",
  ],
  [
    Layers3,
    "Imprima só o necessário",
    "Use uma página, uma sequência ou um material complementar sem precisar imprimir tudo.",
  ],
] as const;

const faqs = [
  [
    "O que está incluído no Kit Completo?",
    "O Kit Completo reúne o Volume 1, o Volume 2 e os cinco bônus — 492 páginas digitais no total.",
  ],
  [
    "Preciso imprimir as 492 páginas de uma vez?",
    "Não. Você recebe os PDFs e pode escolher apenas as páginas, sequências ou materiais que quiser usar em cada momento.",
  ],
  [
    "O material pode ser usado com diferentes crianças?",
    "Sim. As propostas são educativas e podem ser selecionadas conforme o objetivo e o nível de cada criança. O material não substitui avaliação, terapia ou acompanhamento individualizado.",
  ],
  [
    "O material é físico?",
    "Não. O produto é 100% digital. Você recebe os arquivos em PDF e pode imprimir apenas as páginas que quiser utilizar.",
  ],
  [
    "O que acontece depois da compra?",
    "Você finaliza o pagamento no checkout da Cakto. Após a confirmação, siga as instruções de acesso apresentadas pela plataforma para receber o material digital. Como é um produto digital, não há frete.",
  ],
  [
    "Tenho garantia?",
    "Sim. A oferta apresenta garantia de 7 dias. Confira no checkout as condições, os prazos e o canal de atendimento antes de concluir a compra.",
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
          <strong>OFERTA DE LANÇAMENTO</strong>
          <span>
            de <s>R$59,90</s> por <b>R$39,90</b>
          </span>
          <em>ECONOMIZE R$20</em>
        </div>
        <div className="v41-offer-strip-trust">
          <ShieldCheck size={15} aria-hidden="true" />
          <span>Pagamento único • material digital • 7 dias de garantia</span>
        </div>
        <a href="#precos">Ver oferta</a>
      </div>
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <div className="v31-guarantee-seal" role="img" aria-label="Garantia de 7 dias">
      <div className="v31-guarantee-seal-inner">
        <span className="v31-seal-stars" aria-hidden="true">
          ★ ★ ★
        </span>
        <span className="v31-seal-top">GARANTIA</span>
        <strong>7</strong>
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
        ".v3-section-heading, .v32-preview-heading, .v33-preview-meta, .v3-product-card, .v3-bonus-card, .v34-preview-card, .v3-benefit, .v3-price-card, .v3-guarantee, .v3-faq details, .v3-final-inner",
      ),
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    page.classList.add("v3-motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="v3-page">
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
            <a href="#precos">Oferta</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="v3-header-cta" href="#precos">
            Ver Kit Completo
          </a>
        </div>
      </header>

      <section id="inicio" className="v3-hero">
        <div className="v3-shell v3-hero-grid">
          <div className="v3-hero-copy">
            <span className="v3-kicker">KIT COMPLETO • 492 PÁGINAS • 3 VOLUMES + 5 BÔNUS</span>

            <h1>
              492 páginas de atividades e materiais
              <span> prontos para imprimir.</span>
            </h1>

            <p className="v3-hero-lead">
              Tenha em uma única compra <strong>3 volumes de atividades + 5 bônus</strong> para
              trabalhar letras, números, coordenação, leitura inicial, emoções, raciocínio, rotina
              visual, jogos e muito mais — sem precisar criar tudo do zero.
            </p>

            <div className="v3-proof-row v41-proof-row" aria-label="Resumo do Kit Completo">
              <span>
                <strong>2</strong>
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
                OFERTA DE LANÇAMENTO
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
                QUERO O KIT COMPLETO — R$39,90
              </PrimaryButton>
              <a className="v3-text-link" href="#conteudo">
                Ver tudo o que vem no Kit Completo
              </a>
            </div>

            <div className="v31-hero-trust">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Checkout via Cakto • produto digital • pagamento único • garantia de 7 dias
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

      <section id="conteudo" className="v3-section v3-section-light">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <span className="v3-kicker">VOCÊ RECEBE</span>
            <h2>
              Uma coleção completa, organizada para você saber exatamente o que está comprando.
            </h2>
            <p>
              São 382 páginas nos três volumes de atividades e mais 110 páginas em cinco materiais
              complementares. No total, <strong>492 páginas digitais prontas para imprimir.</strong>
            </p>
          </div>

          <div className="v3-product-grid">
            <article className="v3-product-card v3-product-card-dark">
              <div className="v3-product-cover">
                <Cover number={1} title="Volume 1 — Kit de Atividades Infantil e Autismo" />
              </div>
              <div className="v3-product-copy">
                <span>VOLUME 1 • 91 PÁGINAS</span>
                <h3>O ponto de partida</h3>
                <p>
                  Vogais, alfabeto, coordenação motora, números, sílabas, percepção visual, emoções,
                  associação e revisão.
                </p>
              </div>
            </article>

            <article className="v3-product-card v3-product-card-orange">
              <div className="v3-product-cover">
                <Cover number={2} title="Volume 2 — Kit de Atividades Infantil e Autismo" />
              </div>
              <div className="v3-product-copy">
                <span>VOLUME 2 • 91 PÁGINAS</span>
                <h3>Mais desafios e continuidade</h3>
                <p>
                  Leitura inicial, quantidades até 20, sequências, escolhas, comunicação e situações
                  do cotidiano.
                </p>
              </div>
            </article>

            <article className="v3-product-card v45-product-card-volume3">
              <div className="v3-product-cover">
                <Cover number={8} title="Volume 3 — Kit de Atividades Infantil e Autismo" />
              </div>
              <div className="v3-product-copy">
                <span>VOLUME 3 • 200 PÁGINAS</span>
                <h3>O maior volume da coleção</h3>
                <p>
                  200 páginas organizadas em quatro grandes eixos: traçados e pré-escrita; letras,
                  sílabas, palavras e leitura inicial; números e raciocínio matemático; percepção
                  visual, desenho e raciocínio.
                </p>
                <strong className="v45-new-volume-badge">NOVO • 200 PÁGINAS</strong>
              </div>
            </article>

            <article id="bonus" className="v3-bonus-card">
              <div className="v3-bonus-copy">
                <span>5 BÔNUS • 110 PÁGINAS</span>
                <h3>Apoios que fazem o material sair do PDF e entrar na rotina.</h3>
                <p>
                  Planejamento, rotina visual, jogos, observação e atividades para enviar às
                  famílias.
                </p>
              </div>

              <div className="v3-bonus-covers" aria-label="Capas dos cinco bônus">
                {bonuses.map(([title, pages, details], index) => (
                  <div className="v3-bonus-item" key={title}>
                    <Cover number={index + 3} title={title} compact />
                    <span>{pages}</span>
                    <small>{details}</small>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="v44-bonus-proof" aria-labelledby="bonus-proof-title">
            <div className="v44-bonus-proof-heading">
              <span className="v3-kicker">O QUE EXISTE NOS 5 BÔNUS</span>
              <h2 id="bonus-proof-title">
                Mais 110 páginas para transformar atividades em rotina.
              </h2>
              <p>
                Além dos três volumes, você recebe materiais complementares com funções diferentes.
                Assim, os bônus não ficam apenas como “extras”: cada um resolve uma parte prática do
                uso do kit.
              </p>
            </div>

            <div className="v44-bonus-proof-grid">
              {bonuses.map(([title, pages, details], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{pages}</small>
                    <p>{details}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="v44-bonus-proof-cta">
              <p>
                Somando os 5 bônus: <strong>110 páginas.</strong> Com os três volumes, o Kit
                Completo chega a <strong>492 páginas.</strong>
              </p>
              <PrimaryButton href={checkoutUrls.complete}>
                QUERO OS 3 VOLUMES + 5 BÔNUS — R$39,90
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="v32-preview-section" aria-labelledby="preview-title">
        <div className="v3-shell">
          <div className="v32-preview-heading">
            <div>
              <span className="v3-kicker">PÁGINAS REAIS • VOLUME 1</span>
              <h2 id="preview-title">Veja o Volume 1 por dentro.</h2>
            </div>
            <p>
              Estas são páginas reais escolhidas diretamente do Volume 1. Veja o conteúdo inteiro,
              deslize no celular e toque em qualquer página para ampliar.
            </p>
          </div>

          <div className="v33-preview-meta">
            <span>6 páginas escolhidas do material real</span>
            <span>Volume 1 • 91 páginas no total</span>
          </div>

          <div
            className="v33-preview-carousel"
            role="region"
            aria-label="Carrossel com páginas reais do Volume 1"
          >
            {previewPagesVolume1.map(([title, skill, source, badge], index) => (
              <PreviewPage
                key={title}
                title={title}
                skill={skill}
                source={source}
                badge={badge}
                number={index + 1}
                volume="Volume 1"
              />
            ))}
          </div>

          <p className="v33-preview-hint">
            Deslize para o lado para ver mais • toque em uma página para ampliar
          </p>
        </div>
      </section>

      <section
        className="v32-preview-section v39-preview-section-volume2"
        aria-labelledby="preview-volume2-title"
      >
        <div className="v3-shell">
          <div className="v32-preview-heading">
            <div>
              <span className="v3-kicker">PÁGINAS REAIS • VOLUME 2</span>
              <h2 id="preview-volume2-title">Agora veja o segundo volume por dentro.</h2>
            </div>
            <p>
              O Volume 2 não aparece aqui só como uma capa. Estas são páginas reais do arquivo que
              faz parte do Kit Completo, para você avaliar o material antes de comprar.
            </p>
          </div>

          <div className="v33-preview-meta">
            <span>6 páginas reais do Volume 2</span>
            <span>Volume 2 • 91 páginas no total</span>
          </div>

          <div
            className="v33-preview-carousel"
            role="region"
            aria-label="Carrossel com páginas reais do Volume 2"
          >
            {previewPagesVolume2.map(([title, skill, source, badge], index) => (
              <PreviewPage
                key={source}
                title={title}
                skill={skill}
                source={source}
                badge={badge}
                number={index + 1}
                volume="Volume 2"
              />
            ))}
          </div>

          <p className="v33-preview-hint">
            Deslize para o lado para ver mais • toque em uma página para ampliar
          </p>

          <div className="v39-preview-proof">
            <span>
              <Check size={16} /> Leitura inicial e formação de sentido
            </span>
            <span>
              <Check size={16} /> Quantidades até 20 e sequências
            </span>
            <span>
              <Check size={16} /> Comunicação, escolhas e situações do cotidiano
            </span>
          </div>

          <div className="v39-preview-cta">
            <p>
              O Kit Completo reúne os três volumes e os cinco bônus: <strong>492 páginas</strong> em
              uma única compra.
            </p>
            <PrimaryButton href={checkoutUrls.complete}>
              QUERO O KIT COMPLETO — R$39,90
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section
        className="v32-preview-section v45-preview-section-volume3"
        aria-labelledby="preview-volume3-title"
      >
        <div className="v3-shell">
          <div className="v32-preview-heading">
            <div>
              <span className="v3-kicker">PÁGINAS REAIS • VOLUME 3</span>
              <h2 id="preview-volume3-title">Veja o novo Volume 3 por dentro.</h2>
            </div>
            <p>
              O maior volume da coleção acrescenta 200 páginas novas. Estas cinco imagens são
              páginas internas reais do arquivo que passa a fazer parte do Kit Completo.
            </p>
          </div>

          <div className="v33-preview-meta">
            <span>5 páginas internas reais do Volume 3</span>
            <span>Volume 3 • 200 páginas no total</span>
          </div>

          <div
            className="v33-preview-carousel"
            role="region"
            aria-label="Carrossel com páginas reais do Volume 3"
          >
            {previewPagesVolume3.map(([title, skill, source, badge], index) => (
              <PreviewPage
                key={source}
                title={title}
                skill={skill}
                source={source}
                badge={badge}
                number={index + 1}
                volume="Volume 3"
                total={5}
              />
            ))}
          </div>

          <p className="v33-preview-hint">
            Deslize para o lado para ver mais • toque em uma página para ampliar
          </p>

          <div className="v45-volume3-themes" aria-label="Quatro eixos do Volume 3">
            <article>
              <span>01</span>
              <strong>Traçados e Pré-Escrita</strong>
              <p>Coordenação motora, caminhos, contornos, padrões e precisão gráfica.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Letras e Leitura Inicial</strong>
              <p>Letras, sílabas, formação de palavras e leitura inicial.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Números e Raciocínio</strong>
              <p>Quantidades, sequências, comparação e raciocínio matemático visual.</p>
            </article>
            <article>
              <span>04</span>
              <strong>Percepção Visual e Desenho</strong>
              <p>Observação, padrões, desenho guiado e raciocínio visual.</p>
            </article>
          </div>

          <div className="v39-preview-cta v45-preview-cta">
            <p>
              Agora o Kit Completo reúne <strong>3 volumes + 5 bônus</strong>:
              <strong> 492 páginas</strong> em uma única compra.
            </p>
            <PrimaryButton href={checkoutUrls.complete}>
              QUERO AS 492 PÁGINAS — R$39,90
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="v38-upgrade-section" aria-labelledby="upgrade-title">
        <div className="v3-shell v38-upgrade-grid">
          <div className="v38-upgrade-copy">
            <span className="v3-kicker">UMA COLEÇÃO, OITO MATERIAIS</span>
            <h2 id="upgrade-title">O Kit Completo vai muito além de um único PDF de atividades.</h2>
            <p>
              Os três volumes somam 382 páginas de atividades. Os cinco bônus acrescentam mais
              <strong> 110 páginas de apoio</strong> para planejamento, rotina, jogos, observação e
              participação das famílias.
            </p>

            <div className="v38-upgrade-stats" aria-label="Resumo do Kit Completo">
              <span>
                <strong>382</strong>
                páginas nos 3 volumes
              </span>
              <span>
                <strong>110</strong>
                páginas nos 5 bônus
              </span>
              <span>
                <strong>492</strong>
                páginas no total
              </span>
            </div>

            <ul className="v38-upgrade-list">
              <li>
                <Check size={17} /> Atividades de alfabetização, números, coordenação e raciocínio
              </li>
              <li>
                <Check size={17} /> Leitura inicial, comunicação, escolhas e situações do cotidiano
              </li>
              <li>
                <Check size={17} /> Planejamento, rotina visual, jogos e materiais para famílias
              </li>
            </ul>

            <PrimaryButton href={checkoutUrls.complete}>
              QUERO AS 492 PÁGINAS — R$39,90
            </PrimaryButton>
          </div>

          <div className="v38-upgrade-visual" aria-label="Volume 2 e cinco bônus do Kit Completo">
            <div className="v45-upgrade-volumes">
              <div className="v38-upgrade-volume">
                <img
                  src={getCoverPreviewSource(2)}
                  alt="Capa do Volume 2"
                  width={1080}
                  height={1527}
                  loading="lazy"
                  decoding="async"
                />
                <span>VOLUME 2 • 91 PÁGINAS</span>
              </div>
              <div className="v38-upgrade-volume v45-upgrade-volume3">
                <img
                  src={getCoverPreviewSource(8)}
                  alt="Capa do Volume 3"
                  width={1080}
                  height={1528}
                  loading="lazy"
                  decoding="async"
                />
                <span>VOLUME 3 • 200 PÁGINAS</span>
              </div>
            </div>

            <div className="v38-upgrade-bonuses">
              {[3, 4, 5, 6, 7].map((number) => {
                const dimensions = getCoverDimensions(number);
                return (
                  <img
                    key={number}
                    src={getCoverPreviewSource(number)}
                    alt={`Capa do bônus ${number - 2}`}
                    width={dimensions.width}
                    height={dimensions.height}
                    loading="lazy"
                    decoding="async"
                  />
                );
              })}
            </div>
            <span className="v38-upgrade-caption">5 BÔNUS • 110 PÁGINAS EXTRAS</span>
          </div>
        </div>
      </section>

      <section id="como-usar" className="v3-section v3-benefits">
        <div className="v3-shell">
          <div className="v3-benefit-intro">
            <span className="v3-kicker v3-kicker-light">MENOS PREPARAÇÃO. MAIS AÇÃO.</span>
            <h2>Material feito para você abrir, escolher e usar.</h2>
          </div>

          <div className="v3-benefit-grid">
            {benefits.map(([Icon, title, text]) => (
              <article className="v3-benefit" key={title}>
                <span className="v3-benefit-icon">
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="precos" className="v3-section v3-pricing-section">
        <div className="v3-shell">
          <div className="v3-section-heading v3-pricing-heading">
            <span className="v3-kicker">OFERTA PRINCIPAL</span>
            <h2>Leve o Kit Completo com 492 páginas por R$39,90.</h2>
            <p>
              Uma única compra com os três volumes e todos os cinco bônus. Sem assinatura e sem
              frete: o material é digital e pronto para imprimir.
            </p>
          </div>

          <div className="v3-pricing-grid v43-pricing-focus">
            <article className="v3-price-card v3-price-card-complete">
              <span className="v31-complete-ribbon">492 PÁGINAS • 3 VOLUMES + 5 BÔNUS</span>

              <span className="v3-popular-badge">
                <Sparkles size={14} />
                OFERTA DE LANÇAMENTO
              </span>

              <span className="v3-price-tag">KIT COMPLETO</span>
              <div className="v41-price-promo-headline">
                <strong>R$20 DE DESCONTO</strong>
                <span>preço de lançamento</span>
              </div>
              <h3>Receba a coleção inteira</h3>
              <p className="v3-price-description">
                Três volumes de atividades e cinco bônus para ampliar as possibilidades de uso.
              </p>

              <div className="v40-price-anchor">
                Preço normal <s>R$59,90</s>
              </div>

              <div className="v3-price v40-promo-price">
                <span>R$</span>
                <strong>39</strong>
                <small>,90</small>
              </div>

              <p className="v40-price-savings">
                Você economiza R$20,00 • cerca de R$0,08 por página
              </p>

              <ul>
                {[
                  "492 páginas no total",
                  "Volume 1 — 91 páginas",
                  "Volume 2 — 91 páginas",
                  "Volume 3 — 200 páginas",
                  "5 bônus — 110 páginas",
                  "PDFs digitais prontos para imprimir",
                  "Pagamento único",
                ].map((item) => (
                  <li key={item}>
                    <Check size={17} />
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton href={checkoutUrls.complete}>
                QUERO O KIT COMPLETO — R$39,90
              </PrimaryButton>

              <p className="v3-price-difference v40-price-difference">
                <strong>Você recebe os 8 materiais da coleção:</strong> os três volumes completos
                mais Planejamento de 4 Semanas, Rotina Visual, Jogos de Mesa, Caderno de Observação
                e Atividades para as Famílias.
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
        </div>
      </section>

      <section className="v3-section v38-purchase-section" aria-labelledby="purchase-title">
        <div className="v3-shell">
          <div className="v3-section-heading v38-purchase-heading">
            <span className="v3-kicker">SEM SURPRESA NA HORA DE COMPRAR</span>
            <h2 id="purchase-title">Da página ao acesso do Kit Completo em três passos.</h2>
            <p>O fluxo é simples e o produto é totalmente digital.</p>
          </div>

          <ol className="v38-purchase-grid">
            <li>
              <span>01</span>
              <strong>Garanta o Kit Completo</strong>
              <p>Clique no botão da oferta de R$39,90 para seguir ao checkout.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Finalize na Cakto</strong>
              <p>O botão leva você ao checkout seguro da plataforma para concluir o pagamento.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Acesse o material</strong>
              <p>
                Após a confirmação do pagamento, siga as instruções de acesso apresentadas pela
                plataforma.
              </p>
            </li>
          </ol>

          <div className="v38-purchase-note">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>
              Produto digital • sem frete • garantia de 7 dias conforme as condições informadas no
              checkout.
            </span>
          </div>
        </div>
      </section>

      <section id="duvidas" className="v3-section v3-assurance-section">
        <div className="v3-shell v3-assurance-grid">
          <div className="v3-guarantee">
            <GuaranteeSeal />
            <span className="v3-kicker">GARANTIA DE 7 DIAS</span>
            <h2>Conheça o material com mais tranquilidade.</h2>
            <p>
              Você tem 7 dias para conhecer o produto. Confira no checkout as condições da garantia,
              entrega e atendimento antes de concluir o pagamento.
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

      <section className="v3-final-cta">
        <div className="v3-shell v3-final-inner">
          <div>
            <span className="v3-kicker v3-kicker-light">PRONTO PARA COMEÇAR?</span>
            <h2>492 páginas. Três volumes. Cinco bônus. Uma escolha.</h2>
          </div>

          <div className="v40-final-offer">
            <span>
              de <s>R$59,90</s> por <strong>R$39,90</strong>
            </span>
            <PrimaryButton href={checkoutUrls.complete} dark>
              QUERO O KIT COMPLETO — R$39,90
            </PrimaryButton>
          </div>
        </div>
      </section>

      <AttributionLink
        className="v31-mobile-buybar"
        href={checkoutUrls.complete}
        ariaLabel="Comprar Kit Completo por R$39,90, preço promocional de lançamento"
      >
        <span className="v41-mobile-price">
          <small>
            OFERTA • <s>R$59,90</s>
          </small>
          <strong>R$39,90</strong>
        </span>
        <b>
          QUERO AGORA <ArrowRight size={16} />
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Atividades Infantil e Autismo | 492 páginas" },
      {
        name: "description",
        content:
          "Kit Completo digital com 492 páginas: 3 volumes de atividades + 5 bônus, prontos para imprimir. Oferta de lançamento por R$39,90.",
      },
      { property: "og:title", content: "Kit de Atividades Infantil e Autismo" },
      {
        property: "og:description",
        content:
          "Kit Completo: 492 páginas, 3 volumes + 5 bônus. Material digital pronto para imprimir por R$39,90.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kitcompletoautismoeinfantil.lovable.app/",
      },
    ],
  }),
  component: Index,
});
