import { createFileRoute } from "@tanstack/react-router";
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

const coverSources: Record<number, string> = {
  1: "/covers/Imagens_1.jpg?v=2",
  2: "/covers/Imagens_2.jpg?v=2",
  3: "/covers/Planejamento_de_4_Semanas_Completo_260921_141949.jpg?v=3",
  4: "/covers/Rotina_Visual_para_Recortar_Completo_260921_141935.jpg?v=3",
  5: "/covers/Jogos_de_Mesa_Imprimiveis_03_Completo_260921_142019.jpg?v=3",
  6: "/covers/Caderno_de_Observacao_da_Aprendizagem_04_Completo_260921_142033.jpg?v=3",
  7: "/covers/Atividades_para_Enviar_as_Familias_05_Completo_260921_142043.jpg?v=3",
};

const coverPreviewSources: Record<number, string> = {
  1: "/covers/optimized/cover-1.webp?v=1",
  2: "/covers/optimized/cover-2.webp?v=1",
  3: "/covers/optimized/cover-3.webp?v=1",
  4: "/covers/optimized/cover-4.webp?v=1",
  5: "/covers/optimized/cover-5.webp?v=1",
  6: "/covers/optimized/cover-6.webp?v=1",
  7: "/covers/optimized/cover-7.webp?v=1",
};

const coverDimensions: Record<number, { width: number; height: number }> = {
  1: { width: 1080, height: 1528 },
  2: { width: 1080, height: 1527 },
  3: { width: 1080, height: 1526 },
  4: { width: 1080, height: 1526 },
  5: { width: 1080, height: 1526 },
  6: { width: 1080, height: 1396 },
  7: { width: 1080, height: 1526 },
};

const bonuses = [
  ["Planejamento de 4 semanas", "24 páginas"],
  ["Rotina visual para recortar", "20 páginas"],
  ["Jogos de mesa imprimíveis", "30 páginas"],
  ["Caderno de observação", "16 páginas"],
  ["Atividades para as famílias", "20 páginas"],
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
    "Dois volumes e cinco bônus evitam depender sempre do mesmo tipo de atividade.",
  ],
  [
    Layers3,
    "Imprima só o necessário",
    "Use uma página, uma sequência ou um material complementar sem precisar imprimir tudo.",
  ],
] as const;

const faqs = [
  [
    "Qual a diferença entre o Essencial e o Completo?",
    "O Essencial tem o Volume 1 com 91 páginas. O Completo reúne o Volume 1, o Volume 2 e os cinco bônus — 292 páginas no total.",
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
}: {
  title: string;
  skill: string;
  source: string;
  badge: string | null;
  number: number;
  volume: "Volume 1" | "Volume 2";
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
            <span className="v34-preview-index">{String(number).padStart(2, "0")} / 06</span>
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
    <a className={className} href={resolvedHref} aria-label={ariaLabel}>
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
            <a href="#precos">Preços</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="v3-header-cta" href="#precos">
            Ver opções
          </a>
        </div>
      </header>

      <section id="inicio" className="v3-hero">
        <div className="v3-shell v3-hero-grid">
          <div className="v3-hero-copy">
            <span className="v3-kicker">MATERIAL DIGITAL • PRONTO PARA IMPRIMIR</span>

            <h1>
              Atividades prontas
              <span> para imprimir.</span>
            </h1>

            <p className="v3-hero-lead">
              Sem passar horas procurando o que aplicar. Tenha <strong>292 páginas</strong> entre
              atividades e materiais de apoio para trabalhar letras, números, coordenação, emoções,
              rotina, raciocínio e muito mais.
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
                <strong>292</strong>
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
              <p>292 páginas • 2 volumes • 5 bônus</p>
            </div>

            <div className="v3-hero-actions">
              <PrimaryButton href={checkoutUrls.complete}>
                QUERO O KIT COMPLETO — R$39,90
              </PrimaryButton>
              <a className="v3-text-link" href="#precos">
                Comparar com o Essencial
              </a>
            </div>

            <div className="v31-hero-trust">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>
                Produto digital • pagamento único • acesso após confirmação • garantia de 7 dias
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

            <span className="v3-art-chip v3-art-chip-top">2 VOLUMES</span>
            <span className="v3-art-chip v3-art-chip-bottom">+ 5 BÔNUS</span>
          </div>
        </div>
      </section>

      <section id="conteudo" className="v3-section v3-section-light">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <span className="v3-kicker">VOCÊ RECEBE</span>
            <h2>Tudo o que você recebe, organizado de forma simples.</h2>
            <p>
              Dois volumes de atividades e cinco materiais complementares para você entender
              rapidamente o que está comprando e escolher o que usar.
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
                {bonuses.map(([title, pages], index) => (
                  <div className="v3-bonus-item" key={title}>
                    <Cover number={index + 3} title={title} compact />
                    <span>{pages}</span>
                  </div>
                ))}
              </div>
            </article>
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
              O Kit Completo reúne os dois volumes e os cinco bônus: <strong>292 páginas</strong> em
              uma única compra.
            </p>
            <PrimaryButton href={checkoutUrls.complete}>
              QUERO O KIT COMPLETO — R$39,90
            </PrimaryButton>
          </div>
        </div>
      </section>

      <section className="v38-upgrade-section" aria-labelledby="upgrade-title">
        <div className="v3-shell v38-upgrade-grid">
          <div className="v38-upgrade-copy">
            <span className="v3-kicker">ALÉM DO ESSENCIAL</span>
            <h2 id="upgrade-title">Você já viu os dois volumes por dentro.</h2>
            <p>
              No Kit Completo, os dois volumes somam 182 páginas. Com os cinco bônus, você recebe
              <strong> 292 páginas no total</strong> — 201 páginas além do Essencial.
            </p>

            <div className="v38-upgrade-stats" aria-label="Conteúdo adicional do Kit Completo">
              <span>
                <strong>+91</strong>
                páginas do Volume 2
              </span>
              <span>
                <strong>+110</strong>
                páginas em 5 bônus
              </span>
              <span>
                <strong>292</strong>
                páginas no total
              </span>
            </div>

            <ul className="v38-upgrade-list">
              <li>
                <Check size={17} /> Leitura inicial, quantidades até 20, sequências e cotidiano
              </li>
              <li>
                <Check size={17} /> Planejamento de 4 semanas e rotina visual
              </li>
              <li>
                <Check size={17} /> Jogos imprimíveis, observação e atividades para famílias
              </li>
            </ul>

            <PrimaryButton href={checkoutUrls.complete}>
              QUERO AS 292 PÁGINAS — R$39,90
            </PrimaryButton>
          </div>

          <div className="v38-upgrade-visual" aria-label="Materiais adicionais do Kit Completo">
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
            <span className="v38-upgrade-caption">+ 5 BÔNUS • 110 PÁGINAS</span>
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
            <span className="v3-kicker">ESCOLHA SEM COMPLICAÇÃO</span>
            <h2>Quer começar ou quer levar o pacote completo?</h2>
          </div>

          <div className="v3-pricing-grid">
            <article className="v3-price-card v3-price-card-essential">
              <span className="v3-price-tag">PARA COMEÇAR</span>
              <h3>Kit Essencial</h3>
              <p className="v3-price-description">O Volume 1 com as atividades principais.</p>

              <div className="v3-price">
                <span>R$</span>
                <strong>10</strong>
                <small>,00</small>
              </div>

              <ul>
                {["91 páginas", "Volume 1 completo", "PDF para imprimir", "Pagamento único"].map(
                  (item) => (
                    <li key={item}>
                      <Check size={17} />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <PrimaryButton href={checkoutUrls.essential} dark>
                QUERO O ESSENCIAL
              </PrimaryButton>
            </article>

            <article className="v3-price-card v3-price-card-complete">
              <span className="v31-complete-ribbon">292 PÁGINAS • 2 VOLUMES + 5 BÔNUS</span>

              <span className="v3-popular-badge">
                <Sparkles size={14} />
                OFERTA DE LANÇAMENTO
              </span>

              <span className="v3-price-tag">COLEÇÃO COMPLETA</span>
              <div className="v41-price-promo-headline">
                <strong>R$20 DE DESCONTO</strong>
                <span>preço de lançamento</span>
              </div>
              <h3>Kit Completo</h3>
              <p className="v3-price-description">
                A coleção inteira para ter mais variedade e recursos de apoio.
              </p>

              <div className="v40-price-anchor">
                Preço normal <s>R$59,90</s>
              </div>

              <div className="v3-price v40-promo-price">
                <span>R$</span>
                <strong>39</strong>
                <small>,90</small>
              </div>

              <p className="v40-price-savings">Você economiza R$20,00</p>

              <ul>
                {[
                  "292 páginas no total",
                  "Volume 1 — 91 páginas",
                  "Volume 2 — 91 páginas",
                  "5 bônus — 110 páginas",
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
                <strong>Inclui tudo do Essencial + 201 páginas extras:</strong> Volume 2 completo e
                todos os 5 bônus. Hoje, o Kit Completo sai por R$39,90 em pagamento único.
              </p>

              <p className="v40-upgrade-delta">
                Por R$29,90 além do Essencial, você acrescenta o Volume 2 e todos os 5 bônus.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="v3-section v38-purchase-section" aria-labelledby="purchase-title">
        <div className="v3-shell">
          <div className="v3-section-heading v38-purchase-heading">
            <span className="v3-kicker">SEM SURPRESA NA HORA DE COMPRAR</span>
            <h2 id="purchase-title">O que acontece depois que você escolhe seu kit.</h2>
            <p>O fluxo é simples e o produto é totalmente digital.</p>
          </div>

          <ol className="v38-purchase-grid">
            <li>
              <span>01</span>
              <strong>Escolha a versão</strong>
              <p>Essencial com 91 páginas ou Completo com 292 páginas.</p>
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
              Ver opções <ArrowRight size={16} />
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
            <h2>292 páginas. Dois volumes. Cinco bônus. Uma escolha.</h2>
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
        </div>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Atividades Infantil e Autismo | 292 páginas" },
      {
        name: "description",
        content:
          "Kit digital com 2 volumes, 5 bônus e 292 páginas de atividades e materiais educativos para imprimir.",
      },
      { property: "og:title", content: "Kit de Atividades Infantil e Autismo" },
      {
        property: "og:description",
        content: "2 volumes + 5 bônus. 292 páginas de materiais digitais para imprimir.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});
