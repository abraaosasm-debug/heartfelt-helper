import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clock3,
  FileText,
  HelpCircle,
  Layers3,
  Printer,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PreviewCard, FaqItem } from "@/components/offer-details";
import { trackMarketingEvent } from "@/lib/marketing-events";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";
import { canTrackMarketing } from "@/lib/marketing-consent-state";
import { checkoutUrls } from "@/lib/checkout";
import { PrintedKit, VolumeSample } from "@/components/printed-kit";
import { OfferRoutine, DigitalDelivery } from "@/components/offer-routine";
import "./oferta-premium.css";

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

const volumes = [
  {
    label: "Volume 1",
    pages: "91 páginas",
    description: "Alfabeto, coordenação, números, sílabas, percepção visual, emoções e associação.",
    cover: "/covers/optimized/cover-1.webp?v=1",
    tone: "coral",
  },
  {
    label: "Volume 2",
    pages: "91 páginas",
    description:
      "Leitura inicial, quantidades até 20, sequências, comunicação e situações do cotidiano.",
    cover: "/covers/optimized/cover-2.webp?v=1",
    tone: "teal",
  },
  {
    label: "Volume 3",
    pages: "200 páginas",
    description: "Traçados, leitura, números, raciocínio, percepção visual e desenho.",
    cover: "/covers/1_v3.jpg?v=1",
    tone: "violet",
  },
] as const;

const previews = [
  {
    src: "/previews/selected/kit1-selected-2.jpg",
    title: "Trace as Vogais",
    volume: "Volume 1",
  },
  {
    src: "/previews/selected/kit1-selected-4.jpg",
    title: "Quantos Você Vê?",
    volume: "Volume 1",
  },
  {
    src: "/previews/selected/1.jpg",
    title: "Encontre as primeiras atividades",
    volume: "Volume 2",
  },
  {
    src: "/previews/selected/5.jpg",
    title: "Encontre três diferenças",
    volume: "Volume 2",
  },
  {
    src: "/previews/2_v3.jpg",
    title: "Sumário do Volume 3",
    volume: "Volume 3",
  },
  {
    src: "/previews/5_v3.jpg",
    title: "Antes e depois: números",
    volume: "Volume 3",
  },
] as const;

const bonuses = [
  "Planejamento de 4 Semanas",
  "Rotina Visual para Recortar",
  "Jogos de Mesa Imprimíveis",
  "Caderno de Observação da Aprendizagem",
  "Atividades para Enviar às Famílias",
] as const;

const faqs = [
  [
    "O que exatamente eu recebo?",
    "O Kit Completo reúne os Volumes 1, 2 e 3 mais cinco bônus, totalizando 492 páginas digitais em oito materiais.",
  ],
  [
    "É material físico ou digital?",
    "É um produto digital. Você recebe os arquivos em PDF e pode imprimir somente as páginas que quiser utilizar.",
  ],
  [
    "Preciso imprimir as 492 páginas?",
    "Não. A proposta é justamente escolher a atividade que faz sentido para cada momento e imprimir apenas o necessário.",
  ],
  [
    "Como recebo o material depois da compra?",
    "A compra é processada pela Cakto. Após a confirmação do pagamento, siga as instruções de acesso fornecidas pela plataforma.",
  ],
  [
    "Como funciona a garantia?",
    "A oferta apresenta garantia de 30 dias. Consulte no checkout as condições, os prazos e o canal de atendimento aplicável.",
  ],
] as const;

function trackCheckoutIntent(href: string) {
  const offer =
    href === checkoutUrls.complete
      ? { name: "Kit Completo", value: 39.9 }
      : href === checkoutUrls.essential
        ? { name: "Kit Essencial", value: 10 }
        : null;

  if (!offer || !window.fbq || !canTrackMarketing()) return;
  trackMarketingEvent(offer.value === 10 ? "KitEssentialCTA" : "KitCompleteCTA", {
    content_name: offer.name,
  });

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
      href={resolvedHref}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackCheckoutIntent(href)}
    >
      {children}
    </a>
  );
}

function PrimaryCta({
  full = false,
  label = "QUERO O KIT COMPLETO",
}: {
  full?: boolean;
  label?: string;
}) {
  return (
    <AttributionLink
      href={checkoutUrls.complete}
      className={`v11-cta${full ? " v11-cta-full" : ""}`}
    >
      <span>{label}</span>
      <ArrowRight size={19} />
    </AttributionLink>
  );
}

function OfferPage() {
  const [essentialOpen, setEssentialOpen] = useState(false);
  useEffect(() => {
    let sent = false;
    const recordView = () => {
      if (!sent) sent = trackMarketingEvent("OfferView", { content_name: "Kit Completo" });
    };
    recordView();
    window.addEventListener("marketing-consent-change", recordView);
    const footer = document.querySelector(".v11-footer");
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-footer-visible", entry.isIntersecting),
      ),
    );
    if (footer) observer.observe(footer);
    return () => {
      observer.disconnect();
      window.removeEventListener("marketing-consent-change", recordView);
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          element.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
          if (entry.isIntersecting) element.classList.add("is-revealed");
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".v11-section-head, .v11-volume-card, .v11-bonus-item, .v11-preview-card, .v11-price-card",
      )
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <main className="v11-page">
      <div className="v11-trustbar">
        <div className="v11-shell">
          <span>
            <FileText size={14} />
            PRODUTO DIGITAL
          </span>
          <span>
            <ShieldCheck size={14} />
            GARANTIA DE 30 DIAS
          </span>
          <span>
            <BadgeCheck size={14} />
            CHECKOUT VIA CAKTO
          </span>
        </div>
      </div>

      <header className="v11-header">
        <div className="v11-shell v11-header-inner">
          <a className="v11-brand" href="#inicio">
            <span>
              <BookOpen size={17} />
            </span>
            <strong>KIT DE ATIVIDADES</strong>
          </a>

          <a className="v11-header-cta" href="#oferta">
            VER OFERTA
          </a>
        </div>
      </header>

      <section id="inicio" className="v11-hero">
        <div className="v11-shell v11-hero-grid">
          <div className="v11-hero-copy">
            <span className="v11-eyebrow">
              <Sparkles size={14} /> 3 VOLUMES + 5 BÔNUS • 492 PÁGINAS
            </span>

            <h1>
              Atividades prontas para
              <span> escolher, imprimir e usar.</span>
            </h1>

            <p className="v11-hero-lead">
              Para mães, pais e profissionais da educação: uma coleção digital em PDF, organizada
              para escolher, imprimir e usar sem criar cada atividade do zero.
            </p>

            <div className="v11-hero-benefits">
              <span>
                <Check size={15} />
                492 páginas digitais
              </span>
              <span>
                <Check size={15} /> 8 materiais no total
              </span>
              <span>
                <Check size={15} />
                Imprima somente o que precisar
              </span>
            </div>

            <div className="v11-hero-purchase">
              <div className="v11-hero-price">
                <small>
                  de <s>R$59,90</s> por
                </small>
                <strong>R$39,90</strong>
                <span>pagamento único</span>
              </div>
              <PrimaryCta />
            </div>

            <p className="v11-microcopy">
              Compra processada pela Cakto • produto digital • sem frete
            </p>
          </div>

          <div className="v11-product-visual">
            <PrintedKit eager />
          </div>
        </div>
      </section>

      <OfferRoutine />

      <section id="conteudo" className="v11-section v11-content-section">
        <div className="v11-shell">
          <div className="v11-section-head">
            <span className="v11-kicker">O QUE VEM NO KIT</span>
            <h2>Você recebe oito materiais organizados em uma única oferta.</h2>
            <p>
              Três volumes de atividades e cinco complementos para ampliar as possibilidades de uso.
            </p>
          </div>

          <div className="v11-volume-grid">
            {volumes.map((volume, index) => (
              <article className={`v11-volume-card v11-volume-${volume.tone}`} key={volume.label}>
                <div className="volume-print-spread">
                  <img
                    src={volume.cover}
                    srcSet={
                      volume.label === "Volume 3"
                        ? "/covers/optimized/volume-3-420.webp 420w, /covers/optimized/volume-3-840.webp 840w"
                        : undefined
                    }
                    sizes="(min-width: 960px) 185px, 180px"
                    width={volume.label === "Volume 3" ? 1080 : 420}
                    height={volume.label === "Volume 3" ? 1527 : 594}
                    alt={`Capa do ${volume.label}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <VolumeSample index={index} />
                </div>
                <div>
                  <span>{volume.label}</span>
                  <strong>{volume.pages}</strong>
                  <p>{volume.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="v11-bonus-box">
            <div className="v11-bonus-intro">
              <Layers3 size={21} />
              <div>
                <span>5 BÔNUS • 110 PÁGINAS</span>
                <strong>Materiais complementares incluídos no Kit Completo.</strong>
              </div>
            </div>

            <div className="v11-bonus-list">
              {bonuses.map((bonus, index) => (
                <article className="v11-bonus-item" key={bonus}>
                  <img
                    src={`/covers/optimized/cover-${index + 3}.webp`}
                    width={420}
                    height={index === 3 ? 543 : 593}
                    alt={`Capa de ${bonus}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <Check size={13} aria-hidden="true" />
                    {bonus}
                  </span>
                  <p className="v11-bonus-purpose">
                    {
                      [
                        "Planejamento para organizar quatro semanas.",
                        "Propostas de rotina visual para recortar.",
                        "Jogos de mesa para imprimir e utilizar.",
                        "Um caderno para registrar observações da aprendizagem.",
                        "Atividades para compartilhar com as famílias.",
                      ][index]
                    }
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="amostras" className="v11-section v11-preview-section">
        <div className="v11-shell">
          <div className="v11-section-head v11-section-head-dark">
            <span className="v11-kicker">VEJA POR DENTRO</span>
            <h2>Páginas reais do material.</h2>
            <p>Veja uma seleção dos três volumes antes de decidir.</p>
          </div>

          <div className="v11-preview-grid">
            {previews.map((preview) => (
              <PreviewCard
                key={preview.src}
                src={preview.src}
                title={preview.title}
                volume={preview.volume}
              />
            ))}
          </div>

          <div className="v11-preview-cta">
            <p>Gostou do que viu? O Kit Completo reúne 492 páginas.</p>
            <PrimaryCta />
          </div>
        </div>
      </section>

      <section className="v11-section v11-benefit-section">
        <div className="v11-shell">
          <div className="v11-section-head">
            <span className="v11-kicker">POR QUE ISSO É PRÁTICO</span>
            <h2>Menos tempo preparando. Mais facilidade para escolher.</h2>
          </div>

          <div className="v11-benefit-grid">
            <article>
              <div className="v11-icon v11-icon-coral">
                <Clock3 size={20} />
              </div>
              <strong>Comece de algo pronto</strong>
              <p>
                Em vez de montar uma atividade do zero, abra a coleção e procure a proposta
                adequada.
              </p>
            </article>

            <article>
              <div className="v11-icon v11-icon-teal">
                <Printer size={20} />
              </div>
              <strong>Imprima só o necessário</strong>
              <p>
                Você não precisa imprimir o material inteiro. Escolha páginas individuais quando
                quiser.
              </p>
            </article>

            <article>
              <div className="v11-icon v11-icon-violet">
                <Layers3 size={20} />
              </div>
              <strong>Varie as propostas</strong>
              <p>
                Linguagem, coordenação, números, leitura inicial, percepção visual e raciocínio.
              </p>
            </article>
          </div>
        </div>
      </section>

      <DigitalDelivery />

      <section className="v11-section v11-proof-section">
        <div className="v11-shell v11-proof-grid">
          <div>
            <span className="v11-kicker">CONFIANÇA ANTES DA COMPRA</span>
            <h2>Não dependa de promessa. Confira o que é verificável.</h2>
          </div>

          <div className="v11-proof-list">
            <article>
              <span>01</span>
              <div>
                <strong>Páginas reais exibidas acima</strong>
                <p>As amostras mostradas fazem parte dos volumes do produto.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Quantidade declarada por material</strong>
                <p>91 + 91 + 200 páginas nos volumes e 110 páginas nos cinco bônus.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>Garantia de 30 dias</strong>
                <p>As condições aplicáveis ficam disponíveis no checkout.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="oferta" className="v11-section v11-offer-section">
        <div className="v11-shell v11-offer-grid">
          <div className="v11-offer-copy">
            <span className="v11-kicker">OFERTA PRINCIPAL</span>
            <h2>Tenha sua coleção completa por R$39,90.</h2>
            <p>
              Uma compra única com os três volumes e os cinco bônus, totalizando 492 páginas
              digitais.
            </p>

            <div className="v11-offer-list">
              {[
                "Volume 1 — 91 páginas",
                "Volume 2 — 91 páginas",
                "Volume 3 — 200 páginas",
                "5 bônus — 110 páginas",
                "PDFs digitais prontos para imprimir",
                "Garantia de 30 dias",
              ].map((item) => (
                <span key={item}>
                  <Check size={15} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="v11-price-card">
            <div className="v11-price-card-top">
              <span>KIT COMPLETO</span>
              <small>8 MATERIAIS</small>
            </div>

            <p className="v11-reference-price">
              Preço de referência: <s>R$59,90</s>
            </p>

            <div className="v11-price">
              <small>R$</small>
              <strong>39</strong>
              <span>,90</span>
            </div>

            <p className="v11-economy">Economize R$20</p>

            <PrimaryCta full />

            <div className="v11-guarantee-mini">
              <ShieldCheck size={18} />
              <span>
                <strong>Garantia de 30 dias</strong>
                Consulte as condições no checkout.
              </span>
            </div>
          </div>
        </div>

        <div className="v11-shell">
          <details
            className="v11-essential"
            onToggle={(event) => setEssentialOpen(event.currentTarget.open)}
          >
            <summary aria-expanded={essentialOpen} aria-controls="essential-content">
              <span>
                Ainda não quer a coleção completa?
                <small>Kit Essencial • somente Volume 1 • 91 páginas</small>
              </span>
              <strong>R$10,00</strong>
            </summary>
            <div id="essential-content">
              <p>Inclui apenas o Volume 1, sem os Volumes 2 e 3 e sem os cinco bônus.</p>
              <AttributionLink href={checkoutUrls.essential} className="v11-essential-link">
                VER KIT ESSENCIAL <ArrowRight size={14} />
              </AttributionLink>
            </div>
          </details>
        </div>
      </section>

      <section className="v11-guarantee-section">
        <div className="v11-shell v11-guarantee-grid">
          <div
            className="v11-guarantee-seal"
            role="img"
            aria-label="Garantia de 30 dias. Compra protegida."
          >
            <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false">
              <circle className="v11-seal-ring-outer" cx="120" cy="120" r="111" />
              <circle className="v11-seal-ring-inner" cx="120" cy="120" r="101" />
              <circle className="v11-seal-radials" cx="120" cy="120" r="96" />

              <text className="v11-seal-label v11-seal-label-top" x="120" y="47">
                GARANTIA
              </text>

              <g className="v11-seal-shield">
                <path d="M120 64 138 71v14c0 11-7.3 20.6-18 25-10.7-4.4-18-14-18-25V71l18-7Z" />
                <path d="m111.5 85 5.7 5.8 11.8-12" />
              </g>

              <text className="v11-seal-days-number" x="120" y="151">
                30
              </text>
              <text className="v11-seal-days-label" x="120" y="174">
                DIAS
              </text>

              <text className="v11-seal-label v11-seal-label-bottom" x="120" y="207">
                COMPRA PROTEGIDA
              </text>
            </svg>
          </div>

          <div className="v11-guarantee-copy">
            <span className="v11-kicker">GARANTIA DE 30 DIAS</span>
            <h2>Você tem 30 dias para conhecer o material com tranquilidade.</h2>
            <p>
              Antes de finalizar, consulte no checkout da Cakto as condições, os prazos e o canal de
              atendimento aplicável à oferta.
            </p>
          </div>
        </div>
      </section>

      <section id="duvidas" className="v11-section v11-faq-section">
        <div className="v11-shell v11-faq-grid">
          <div>
            <span className="v11-kicker">PERGUNTAS FREQUENTES</span>
            <h2>Respostas antes de comprar.</h2>
            <HelpCircle size={28} />
          </div>

          <div className="v11-faq">
            {faqs.map(([question, answer], index) => (
              <FaqItem key={question} question={question} answer={answer} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="v11-final">
        <div className="v11-shell">
          <span className="v11-kicker">KIT COMPLETO</span>
          <h2>Escolha a atividade. Imprima. Use.</h2>
          <p>Comece hoje com atividades prontas, organizadas e fáceis de aplicar.</p>
          <p>3 volumes + 5 bônus • 492 páginas digitais • R$39,90 • 30 dias de garantia</p>
          <PrintedKit />
          <PrimaryCta label="QUERO MEU ACESSO AGORA" />
        </div>
      </section>

      <AttributionLink
        href={checkoutUrls.complete}
        className="v11-mobile-bar"
        ariaLabel="Comprar Kit Completo por R$39,90"
      >
        <strong>R$39,90</strong>
        <span>
          QUERO O KIT <ArrowRight size={15} />
        </span>
      </AttributionLink>

      {/* Identificação comercial, suporte e licença de uso aguardam dados confirmados do responsável. */}
      <footer className="v11-footer">
        <div className="v11-shell">
          <div>
            <strong>Kit de Atividades Infantil e Autismo</strong>
            <p>
              Material digital educativo. Não substitui avaliação ou acompanhamento individualizado.
            </p>
          </div>

          <div>
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
      { title: "Kit de Atividades | 492 páginas prontas para imprimir" },
      {
        name: "description",
        content:
          "Tenha 492 páginas digitais organizadas em 3 volumes + 5 bônus para escolher, imprimir e usar. Kit Completo por R$39,90.",
      },
      { property: "og:title", content: "Atividades prontas para escolher, imprimir e usar" },
      {
        property: "og:description",
        content: "3 volumes + 5 bônus, 492 páginas digitais por R$39,90.",
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
  component: OfferPage,
});
