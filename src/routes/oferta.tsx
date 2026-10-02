import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  FileText,
  HelpCircle,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PreviewCard, FaqItem } from "@/components/offer-details";
import { trackMarketingEvent } from "@/lib/marketing-events";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";
import { canTrackMarketing } from "@/lib/marketing-consent-state";
import { checkoutUrls } from "@/lib/checkout";
import { PrintedKit, VolumeSample } from "@/components/printed-kit";
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
    description:
      "Reúna em um só volume propostas de alfabeto, coordenação, números, sílabas, percepção visual, emoções e associação para não precisar procurar cada tema separadamente.",
    cover: "/covers/optimized/cover-1.webp?v=1",
    tone: "coral",
  },
  {
    label: "Volume 2",
    pages: "91 páginas",
    description:
      "Avance para leitura inicial, quantidades até 20, sequências, comunicação e situações do cotidiano com novas opções para variar as atividades.",
    cover: "/covers/optimized/cover-2.webp?v=1",
    tone: "teal",
  },
  {
    label: "Volume 3",
    pages: "200 páginas",
    description:
      "Amplie o repertório com 200 páginas de traçados, leitura, números, raciocínio, percepção visual e desenho dentro da mesma coleção.",
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
    src: "/previews/3_v3.jpg",
    title: "Atividade real do Volume 3",
    volume: "Volume 3",
  },
  {
    src: "/previews/5_v3.jpg",
    title: "Antes e depois: números",
    volume: "Volume 3",
  },
] as const;

const bonuses = [
  {
    title: "Planejamento de 4 Semanas",
    description:
      "24 páginas para distribuir propostas ao longo de quatro semanas e facilitar a organização do que usar.",
  },
  {
    title: "Rotina Visual para Recortar",
    description: "Recursos visuais para recortar e apoiar a organização de momentos da rotina.",
  },
  {
    title: "Jogos de Mesa Imprimíveis",
    description:
      "Quatro jogos em 30 páginas para variar o uso do material com propostas imprimíveis.",
  },
  {
    title: "Caderno de Observação da Aprendizagem",
    description:
      "Um material para concentrar registros e observações em vez de deixá-los espalhados.",
  },
  {
    title: "Atividades para Enviar às Famílias",
    description:
      "Propostas prontas para compartilhar com as famílias quando isso fizer sentido no contexto educacional.",
  },
] as const;

const faqs = [
  [
    "O que exatamente eu recebo?",
    "3 volumes + 5 bônus, totalizando 492 páginas digitais em oito materiais.",
  ],
  ["É material físico ou digital?", "É um produto digital em PDF. Não há envio físico nem frete."],
  [
    "Como recebo o material depois da compra?",
    "A compra é processada pela Cakto. Após a confirmação do pagamento, siga as instruções de acesso fornecidas pela plataforma.",
  ],
  [
    "Preciso imprimir as 492 páginas?",
    "Não. Você pode consultar os PDFs e imprimir apenas as páginas que fizerem sentido para o momento.",
  ],
  [
    "Serve para casa e para o contexto educacional?",
    "A coleção foi apresentada para mães, pais e profissionais da educação. A escolha de cada atividade deve considerar o nível, a necessidade e o contexto da criança.",
  ],
  [
    "Existe uma faixa etária única?",
    "A oferta não define uma faixa etária única. O responsável ou profissional deve selecionar as atividades adequadas ao nível e ao contexto da criança.",
  ],
  [
    "Preciso de impressora colorida?",
    "Os arquivos são entregues em PDF para impressão. A página não estabelece uma exigência técnica de impressora colorida; o resultado de cada impressão depende da página, da impressora e das configurações usadas.",
  ],
  [
    "Quais formas de pagamento estão disponíveis?",
    "Confira no checkout da Cakto as formas de pagamento disponíveis no momento da compra.",
  ],
  [
    "O material substitui terapia ou acompanhamento individualizado?",
    "Não. É um material educativo e não substitui avaliação, terapia ou acompanhamento individualizado quando esses forem necessários.",
  ],
  [
    "Como funciona a garantia e o atendimento?",
    "A oferta apresenta garantia de 30 dias. Consulte no checkout as condições, os prazos e o canal de atendimento aplicável; não tratamos o reembolso como automático.",
  ],
] as const;

function trackCheckoutIntent(href: string) {
  const offer =
    href === checkoutUrls.complete
      ? { name: "Kit Completo", value: 29.9 }
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
    <main className="v11-page v11-simple">
      <div className="v11-trustbar">
        <div className="v11-shell">
          <span>
            <FileText size={14} />
            ENTREGA DIGITAL
          </span>
          <span>
            <ShieldCheck size={14} />
            30 dias de garantia
          </span>
          <span>
            <BadgeCheck size={14} />
            COMPRA VIA CAKTO
          </span>
        </div>
      </div>

      <section id="inicio" className="v11-hero">
        <div className="v11-shell v11-hero-grid">
          <div className="v11-hero-copy">
            <span className="v11-eyebrow">
              <Sparkles size={14} /> 3 VOLUMES + 5 BÔNUS • 492 PÁGINAS
            </span>

            <h1>
              Mães, pais e educadores:
              <span> pare de montar cada atividade do zero.</span>
            </h1>

            <p className="v11-hero-lead">
              Tenha 492 páginas digitais em 3 volumes + 5 bônus para escolher, imprimir e usar
              conforme a necessidade e o contexto da criança.
            </p>

            <div className="v11-hero-benefits">
              <span>
                <Check size={15} />3 volumes + 5 bônus
              </span>
              <span>
                <Check size={15} />
                492 páginas digitais
              </span>
              <span>
                <Check size={15} />
                PDFs para escolher e imprimir
              </span>
              <span>
                <Check size={15} />
                Garantia de 30 dias
              </span>
            </div>

            <div className="v11-hero-purchase">
              <div className="v11-hero-price">
                <small>
                  de <s>R$59,90</s> por
                </small>
                <strong>R$29,90</strong>
                <span>pagamento único</span>
              </div>
              <PrimaryCta label="QUERO AS 492 PÁGINAS" />
            </div>

            <p className="v11-microcopy">
              Pagamento único • entrega digital • compra processada pela Cakto
            </p>
            <p className="v11-hero-value">Aproximadamente R$0,06 por página digital.</p>
          </div>

          <div className="v11-product-visual">
            <PrintedKit eager />
          </div>
        </div>
      </section>

      <section id="conteudo" className="v11-section v11-content-section">
        <div className="v11-shell">
          <div className="v11-section-head">
            <span className="v11-kicker">O QUE VEM NO KIT</span>
            <h2>O que você recebe por R$29,90.</h2>
            <p>3 volumes + 5 bônus reunidos em 492 páginas digitais.</p>
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
                <article className="v11-bonus-item" key={bonus.title}>
                  <img
                    src={`/covers/optimized/cover-${index + 3}.webp`}
                    width={420}
                    height={index === 3 ? 543 : 593}
                    alt={`Capa de ${bonus.title}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span>
                    <Check size={13} aria-hidden="true" />
                    {bonus.title}
                  </span>
                  <p className="v11-bonus-purpose">{bonus.description}</p>
                  <div className="v11-bonus-price" aria-label="Valor do bônus: de R$4,90 por grátis hoje">
                    <s>R$4,90</s>
                    <strong>HOJE GRÁTIS</strong>
                  </div>
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

      <section id="oferta" className="v11-guarantee-section">
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
              A oferta possui garantia de 30 dias. Antes de finalizar, consulte no checkout da Cakto
              as condições, os prazos e o canal de atendimento aplicável. Não há promessa de
              reembolso automático ou incondicional fora dessas condições.
            </p>
          </div>
        </div>
      </section>

      {/* Prova social entra aqui somente com depoimentos reais e autorização de publicação. */}
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
          <h2>3 volumes + 5 bônus. 492 páginas. R$29,90.</h2>
          <p>
            Escolha as atividades, imprima o que precisar e mantenha tudo em uma única coleção
            digital.
          </p>
          <p>
            <s>R$59,90</s> • R$29,90 pagamento único • garantia de 30 dias • checkout via Cakto
          </p>
          <PrintedKit />
          <PrimaryCta label="QUERO O KIT COMPLETO POR R$29,90" />
        </div>
      </section>

      <AttributionLink
        href={checkoutUrls.complete}
        className="v11-mobile-bar"
        ariaLabel="Comprar Kit Completo por R$29,90"
      >
        <strong>R$29,90</strong>
        <span>
          COMPRAR O KIT <ArrowRight size={15} />
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
          "Tenha 492 páginas digitais organizadas em 3 volumes + 5 bônus para escolher, imprimir e usar. Kit Completo por R$29,90.",
      },
      { property: "og:title", content: "Atividades prontas para escolher, imprimir e usar" },
      {
        property: "og:description",
        content: "3 volumes + 5 bônus, 492 páginas digitais por R$29,90.",
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
