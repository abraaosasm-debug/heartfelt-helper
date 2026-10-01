import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Eye,
  Layers3,
  Printer,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";
import { checkoutUrls } from "@/lib/checkout";
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
    description: "Alfabeto, coordenação, números, sílabas, percepção visual e emoções.",
    cover: "/covers/optimized/cover-1.webp?v=1",
  },
  {
    label: "Volume 2",
    pages: "91 páginas",
    description: "Leitura inicial, quantidades até 20, sequências e situações do cotidiano.",
    cover: "/covers/optimized/cover-2.webp?v=1",
  },
  {
    label: "Volume 3",
    pages: "200 páginas",
    description: "Traçados, leitura, números, raciocínio, percepção visual e desenho.",
    cover: "/covers/1_v3.jpg?v=1",
  },
] as const;

const previewPages = [
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
    title: "Página real",
    volume: "Volume 2",
  },
  {
    src: "/previews/selected/5.jpg",
    title: "Página real",
    volume: "Volume 2",
  },
  {
    src: "/previews/2_v3.jpg",
    title: "Página real",
    volume: "Volume 3",
  },
  {
    src: "/previews/5_v3.jpg",
    title: "Página real",
    volume: "Volume 3",
  },
] as const;

const bonuses = [
  "Planejamento de 4 Semanas",
  "Rotina Visual para Recortar",
  "Jogos de Mesa Imprimíveis",
  "Caderno de Observação",
  "Atividades para as Famílias",
] as const;

const faqs = [
  [
    "O que está incluído no Kit Completo?",
    "Os três volumes completos e os cinco bônus, totalizando 492 páginas digitais em oito materiais.",
  ],
  [
    "Preciso imprimir tudo?",
    "Não. Você pode escolher e imprimir somente as páginas que quiser usar em cada momento.",
  ],
  [
    "Como funciona a garantia?",
    "A oferta apresenta garantia de 30 dias. Confira as condições e o canal de atendimento no checkout da Cakto antes de concluir a compra.",
  ],
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
      href={resolvedHref}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackCheckoutIntent(href)}
    >
      {children}
    </a>
  );
}

function BuyButton({ compact = false }: { compact?: boolean }) {
  return (
    <AttributionLink
      href={checkoutUrls.complete}
      className={`v10-buy-button${compact ? " v10-buy-button-compact" : ""}`}
    >
      <span>QUERO O KIT COMPLETO</span>
      <ArrowRight size={19} />
    </AttributionLink>
  );
}

function PreviewDialog({ src, title, volume }: { src: string; title: string; volume: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="v10-preview-card" type="button" aria-label={`Ampliar ${title}`}>
          <div className="v10-preview-image">
            <img src={src} alt={`Página real do ${volume}`} loading="lazy" decoding="async" />
            <span>
              <Eye size={15} />
              ampliar
            </span>
          </div>
          <div className="v10-preview-meta">
            <strong>{volume}</strong>
            <small>{title}</small>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="v10-preview-dialog">
        <DialogTitle>
          {volume} — {title}
        </DialogTitle>
        <DialogDescription>Página real do material digital.</DialogDescription>
        <div className="v10-preview-dialog-scroll">
          <img src={src} alt={`Página ampliada do ${volume}`} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OfferPage() {
  return (
    <main className="v10-page">
      <header className="v10-header">
        <div className="v10-shell v10-header-inner">
          <a className="v10-brand" href="#inicio">
            <span>
              <BookOpen size={17} />
            </span>
            KIT DE ATIVIDADES
          </a>

          <nav className="v10-nav" aria-label="Navegação da oferta">
            <a href="#conteudo">O que vem</a>
            <a href="#amostras">Por dentro</a>
            <a href="#oferta">Oferta</a>
          </nav>

          <a className="v10-header-cta" href="#oferta">
            VER OFERTA
          </a>
        </div>
      </header>

      <section id="inicio" className="v10-hero">
        <div className="v10-shell v10-hero-grid">
          <div className="v10-hero-copy">
            <span className="v10-kicker">3 VOLUMES + 5 BÔNUS • 492 PÁGINAS</span>

            <h1>
              Tenha atividades prontas para
              <span> escolher, imprimir e usar.</span>
            </h1>

            <p>
              Pare de criar tudo do zero. Tenha uma coleção organizada para encontrar uma atividade
              pronta quando precisar.
            </p>

            <div className="v10-hero-proof">
              <span>
                <strong>492</strong>
                páginas digitais
              </span>
              <span>
                <strong>8</strong>
                materiais
              </span>
              <span>
                <strong>30</strong>
                dias de garantia
              </span>
            </div>

            <div className="v10-hero-offer">
              <div>
                <small>
                  de <s>R$59,90</s> por
                </small>
                <strong>R$39,90</strong>
                <span>pagamento único</span>
              </div>
              <BuyButton />
            </div>

            <div className="v10-trust">
              <ShieldCheck size={16} />
              Produto digital • checkout via Cakto • sem frete
            </div>
          </div>

          <div className="v10-product-stage" aria-label="Capas dos três volumes do Kit">
            <span className="v10-stage-label">KIT COMPLETO</span>

            <div className="v10-cover v10-cover-1">
              <img src={volumes[0].cover} alt="Capa do Volume 1" />
            </div>
            <div className="v10-cover v10-cover-3">
              <img src={volumes[2].cover} alt="Capa do Volume 3" />
            </div>
            <div className="v10-cover v10-cover-2">
              <img src={volumes[1].cover} alt="Capa do Volume 2" />
            </div>

            <div className="v10-stage-badge">
              <strong>+5</strong>
              <span>BÔNUS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="conteudo" className="v10-section v10-content-section">
        <div className="v10-shell">
          <div className="v10-section-head">
            <span className="v10-kicker">O QUE VOCÊ RECEBE</span>
            <h2>Três volumes. Cinco bônus. Tudo em uma coleção.</h2>
          </div>

          <div className="v10-volume-grid">
            {volumes.map((volume) => (
              <article className="v10-volume-card" key={volume.label}>
                <img src={volume.cover} alt={`Capa do ${volume.label}`} loading="lazy" decoding="async" />
                <div>
                  <span>{volume.label}</span>
                  <strong>{volume.pages}</strong>
                  <p>{volume.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="v10-bonus-strip">
            <div>
              <Layers3 size={20} />
              <span>
                <strong>+ 5 bônus • 110 páginas</strong>
                materiais complementares incluídos
              </span>
            </div>

            <div className="v10-bonus-list">
              {bonuses.map((bonus) => (
                <span key={bonus}>
                  <Check size={13} />
                  {bonus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="amostras" className="v10-section v10-preview-section">
        <div className="v10-shell">
          <div className="v10-section-head v10-section-head-light">
            <span className="v10-kicker">PÁGINAS REAIS</span>
            <h2>Veja algumas atividades por dentro.</h2>
            <p>Toque em qualquer página para ampliar.</p>
          </div>

          <div className="v10-preview-grid">
            {previewPages.map((preview) => (
              <PreviewDialog
                key={preview.src}
                src={preview.src}
                title={preview.title}
                volume={preview.volume}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="v10-section v10-benefit-section">
        <div className="v10-shell">
          <div className="v10-benefit-grid">
            <article>
              <Clock3 size={22} />
              <div>
                <strong>Menos preparação.</strong>
                <p>Você parte de uma atividade pronta em vez de começar do zero.</p>
              </div>
            </article>

            <article>
              <Printer size={22} />
              <div>
                <strong>Imprima só o que precisar.</strong>
                <p>Escolha a página certa para aquele momento e use quando quiser.</p>
              </div>
            </article>

            <article>
              <Layers3 size={22} />
              <div>
                <strong>Mais variedade.</strong>
                <p>Linguagem, números, coordenação, raciocínio e percepção visual na mesma coleção.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="oferta" className="v10-section v10-offer-section">
        <div className="v10-shell v10-offer-grid">
          <div className="v10-offer-copy">
            <span className="v10-kicker">KIT COMPLETO</span>
            <h2>492 páginas prontas por R$39,90.</h2>
            <p>
              Três volumes de atividades + cinco bônus. Uma compra única para ter sua coleção
              organizada e pronta para consultar.
            </p>

            <div className="v10-check-list">
              {[
                "Volume 1 — 91 páginas",
                "Volume 2 — 91 páginas",
                "Volume 3 — 200 páginas",
                "5 bônus — 110 páginas",
                "PDFs digitais prontos para imprimir",
                "Garantia de 30 dias",
              ].map((item) => (
                <span key={item}>
                  <Check size={16} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="v10-price-card">
            <span className="v10-price-label">OFERTA PRINCIPAL</span>

            <small className="v10-price-reference">
              preço de referência <s>R$59,90</s>
            </small>

            <div className="v10-price">
              <small>R$</small>
              <strong>39</strong>
              <span>,90</span>
            </div>

            <div className="v10-saving">VOCÊ ECONOMIZA R$20</div>

            <BuyButton compact />

            <div className="v10-guarantee">
              <ShieldCheck size={19} />
              <span>
                <strong>30 dias de garantia</strong>
                Confira as condições no checkout.
              </span>
            </div>
          </div>
        </div>

        <div className="v10-shell">
          <details className="v10-essential">
            <summary>
              <span>
                Quer começar menor?
                <small>Kit Essencial • somente Volume 1 • 91 páginas</small>
              </span>
              <strong>R$10,00</strong>
            </summary>
            <div>
              <p>
                Inclui apenas o Volume 1, sem os Volumes 2 e 3 e sem os cinco bônus.
              </p>
              <AttributionLink href={checkoutUrls.essential} className="v10-essential-link">
                VER KIT ESSENCIAL <ArrowRight size={14} />
              </AttributionLink>
            </div>
          </details>
        </div>
      </section>

      <section id="duvidas" className="v10-section v10-faq-section">
        <div className="v10-shell v10-faq-grid">
          <div>
            <span className="v10-kicker">DÚVIDAS RÁPIDAS</span>
            <h2>Antes de comprar.</h2>
          </div>

          <div className="v10-faq">
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
        href={checkoutUrls.complete}
        className="v10-mobile-bar"
        ariaLabel="Comprar Kit Completo por R$39,90"
      >
        <strong>R$39,90</strong>
        <span>
          QUERO O KIT <ArrowRight size={15} />
        </span>
      </AttributionLink>

      <footer className="v10-footer">
        <div className="v10-shell">
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
      { property: "og:title", content: "492 páginas prontas para escolher, imprimir e usar" },
      {
        property: "og:description",
        content: "3 volumes + 5 bônus em uma coleção digital por R$39,90.",
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
