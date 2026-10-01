import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Eye,
  FileText,
  GraduationCap,
  Layers3,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
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

const covers = [
  {
    label: "VOLUME 1",
    pages: "91 páginas",
    src: "/covers/optimized/cover-1.webp?v=1",
    full: "/covers/Imagens_1.jpg?v=2",
  },
  {
    label: "VOLUME 2",
    pages: "91 páginas",
    src: "/covers/optimized/cover-2.webp?v=1",
    full: "/covers/Imagens_2.jpg?v=2",
  },
  {
    label: "VOLUME 3",
    pages: "200 páginas",
    src: "/covers/1_v3.jpg?v=1",
    full: "/covers/1_v3.jpg?v=1",
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
    title: "Atividade real",
    volume: "Volume 2",
  },
  {
    src: "/previews/selected/5.jpg",
    title: "Atividade real",
    volume: "Volume 2",
  },
  {
    src: "/previews/2_v3.jpg",
    title: "Atividade real",
    volume: "Volume 3",
  },
  {
    src: "/previews/5_v3.jpg",
    title: "Atividade real",
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

const feedbackModels = [
  {
    initials: "MA",
    name: "Marina A.",
    role: "Pedagoga",
    text: "A organização por habilidades facilita muito a seleção das atividades. É o tipo de material que ajuda a reduzir tempo de preparação e dá mais opções para variar as propostas.",
  },
  {
    initials: "CM",
    name: "Carla M.",
    role: "Professora da Educação Infantil",
    text: "O ponto mais forte é a praticidade: escolher uma página, imprimir e usar. Para a rotina de sala, ter diferentes tipos de atividade já organizados faz bastante diferença.",
  },
  {
    initials: "JR",
    name: "Juliana R.",
    role: "Psicopedagoga",
    text: "A variedade entre linguagem, coordenação, números, percepção visual e raciocínio permite alternar objetivos sem depender sempre do mesmo formato de exercício.",
  },
] as const;

const faqs = [
  [
    "O que eu recebo?",
    "Os três volumes completos e cinco bônus, totalizando 492 páginas digitais em oito materiais.",
  ],
  [
    "É material físico?",
    "Não. O produto é digital em PDF. Você escolhe as páginas que quer usar e imprime conforme a necessidade.",
  ],
  [
    "Como funciona a garantia?",
    "A oferta apresenta garantia de 30 dias. Confira no checkout da Cakto as condições, prazos e canal de atendimento antes de concluir a compra.",
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
      className={`v90-buy-button${compact ? " v90-buy-button-compact" : ""}`}
    >
      <span>
        QUERO O KIT COMPLETO
        <small>ACESSO DIGITAL • R$39,90</small>
      </span>
      <ArrowRight size={20} />
    </AttributionLink>
  );
}

function PreviewDialog({
  src,
  title,
  volume,
}: {
  src: string;
  title: string;
  volume: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="v90-preview-card" type="button" aria-label={`Ampliar ${title}`}>
          <div className="v90-preview-image">
            <img src={src} alt={`Página real do ${volume}`} loading="lazy" decoding="async" />
            <span>
              <Eye size={16} />
              ampliar
            </span>
          </div>
          <div className="v90-preview-copy">
            <b>{volume}</b>
            <small>{title}</small>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="v90-preview-dialog">
        <DialogTitle>
          {volume} — {title}
        </DialogTitle>
        <DialogDescription>Página real do material digital.</DialogDescription>
        <div className="v90-preview-dialog-scroll">
          <img src={src} alt={`Página ampliada do ${volume}`} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CoverDialog({
  src,
  full,
  label,
}: {
  src: string;
  full: string;
  label: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="v90-cover-button" type="button" aria-label={`Ampliar ${label}`}>
          <img src={src} alt={`Capa do ${label}`} loading="lazy" decoding="async" />
        </button>
      </DialogTrigger>

      <DialogContent className="v90-preview-dialog">
        <DialogTitle>{label}</DialogTitle>
        <DialogDescription>Capa do material digital.</DialogDescription>
        <div className="v90-preview-dialog-scroll">
          <img src={full} alt={`Capa ampliada do ${label}`} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Offer() {
  return (
    <main className="v90-page">
      <div className="v90-topbar">
        <div className="v90-shell">
          <span>
            <Sparkles size={14} />
            492 PÁGINAS • 3 VOLUMES + 5 BÔNUS
          </span>
          <strong>
            <s>R$59,90</s> R$39,90
          </strong>
        </div>
      </div>

      <header className="v90-header">
        <div className="v90-shell v90-header-inner">
          <a href="#inicio" className="v90-brand" aria-label="Ir para o início">
            <span>
              <BookOpen size={18} />
            </span>
            KIT DE ATIVIDADES
          </a>
          <a href="#oferta" className="v90-header-cta">
            VER OFERTA
          </a>
        </div>
      </header>

      <section id="inicio" className="v90-hero">
        <div className="v90-shell v90-hero-grid">
          <div className="v90-hero-copy">
            <div className="v90-eyebrow">
              <span />
              MATERIAL DIGITAL PRONTO PARA IMPRIMIR
            </div>

            <h1>
              Chega de perder tempo criando
              <em> atividade do zero.</em>
            </h1>

            <p className="v90-hero-sub">
              Abra. Escolha. Imprima. Use.
              <span>
                492 páginas organizadas em 3 volumes + 5 bônus para você ter atividade pronta quando
                precisar.
              </span>
            </p>

            <div className="v90-hero-stats">
              <div>
                <strong>492</strong>
                <span>páginas</span>
              </div>
              <div>
                <strong>8</strong>
                <span>materiais</span>
              </div>
              <div>
                <strong>30</strong>
                <span>dias de garantia</span>
              </div>
            </div>

            <div className="v90-price-line">
              <span>
                de <s>R$59,90</s>
              </span>
              <strong>R$39,90</strong>
              <small>pagamento único</small>
            </div>

            <BuyButton />

            <div className="v90-trustline">
              <ShieldCheck size={16} />
              Checkout via Cakto • produto digital • sem frete
            </div>
          </div>

          <div className="v90-hero-visual" aria-label="Capas dos três volumes">
            <div className="v90-visual-noise" />
            <span className="v90-visual-tag">3 VOLUMES</span>
            <div className="v90-book v90-book-left">
              <img src={covers[0].src} alt="Capa do Volume 1" />
            </div>
            <div className="v90-book v90-book-center">
              <img src={covers[2].src} alt="Capa do Volume 3" />
            </div>
            <div className="v90-book v90-book-right">
              <img src={covers[1].src} alt="Capa do Volume 2" />
            </div>
            <div className="v90-visual-badge">
              <strong>+5</strong>
              <span>BÔNUS</span>
            </div>
          </div>
        </div>
      </section>

      <section id="conteudo" className="v90-section v90-content">
        <div className="v90-shell">
          <div className="v90-section-head">
            <span>O QUE VOCÊ LEVA</span>
            <h2>Oito materiais. Sem enrolação.</h2>
            <p>Três volumes de atividades + cinco complementos para ampliar a rotina de uso.</p>
          </div>

          <div className="v90-volume-grid">
            {covers.map((cover, index) => (
              <article className="v90-volume-card" key={cover.label}>
                <div className="v90-volume-index">0{index + 1}</div>
                <CoverDialog src={cover.src} full={cover.full} label={cover.label} />
                <div className="v90-volume-info">
                  <span>{cover.label}</span>
                  <strong>{cover.pages}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="v90-bonus-panel">
            <div className="v90-bonus-title">
              <Layers3 size={22} />
              <div>
                <span>+ 5 BÔNUS • 110 PÁGINAS</span>
                <strong>Complemente sem aumentar a bagunça.</strong>
              </div>
            </div>
            <div className="v90-bonus-list">
              {bonuses.map((bonus) => (
                <span key={bonus}>
                  <Check size={14} />
                  {bonus}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="amostras" className="v90-section v90-samples">
        <div className="v90-shell">
          <div className="v90-section-head v90-section-head-dark">
            <span>VEJA ANTES DE COMPRAR</span>
            <h2>São páginas reais. Não mockups genéricos.</h2>
            <p>Toque em qualquer atividade para ampliar.</p>
          </div>

          <div className="v90-preview-grid">
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

      <section id="avaliacoes" className="v90-section v90-reviews">
        <div className="v90-shell">
          <div className="v90-review-head">
            <div>
              <span className="v90-script">prova social</span>
              <span className="v90-kicker">MODELOS VISUAIS DE FEEDBACK PROFISSIONAL</span>
              <h2>Feedback que parece gente de verdade — sem fingir que é.</h2>
            </div>
            <p>
              Estes três cards são <strong>modelos ilustrativos</strong>. Os nomes, avatares e textos
              não representam avaliações reais. A estrutura já está pronta para receber depoimentos
              verificados com foto e autorização.
            </p>
          </div>

          <div className="v90-review-grid">
            {feedbackModels.map((review, index) => (
              <article className="v90-review-card" key={review.name}>
                <div className="v90-review-top">
                  <div className={`v90-avatar v90-avatar-${index + 1}`} aria-label="Avatar ilustrativo">
                    <UserRound size={22} />
                    <span>{review.initials}</span>
                  </div>
                  <div className="v90-review-person">
                    <strong>{review.name}</strong>
                    <span>{review.role}</span>
                    <small>PERFIL ILUSTRATIVO</small>
                  </div>
                  <Quote size={26} />
                </div>

                <div className="v90-stars" aria-label="Cinco estrelas ilustrativas">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={15} fill="currentColor" />
                  ))}
                </div>

                <p>“{review.text}”</p>

                <div className="v90-review-disclaimer">
                  <BadgeCheck size={14} />
                  Texto-modelo • substitua por avaliação real
                </div>
              </article>
            ))}
          </div>

          <div className="v90-real-review-note">
            <GraduationCap size={20} />
            <p>
              Para transformar estes cards em prova social real, use apenas avaliações de
              profissionais que tenham analisado o material e autorizado nome, foto e depoimento.
            </p>
          </div>
        </div>
      </section>

      <section id="oferta" className="v90-section v90-offer">
        <div className="v90-shell v90-offer-grid">
          <div className="v90-offer-copy">
            <span>OFERTA PRINCIPAL</span>
            <h2>
              492 páginas.
              <em> R$39,90.</em>
            </h2>
            <p>
              Você recebe os três volumes completos e os cinco bônus. Sem assinatura. Sem frete.
            </p>

            <div className="v90-offer-checks">
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

          <div className="v90-price-card">
            <div className="v90-price-card-top">
              <span>KIT COMPLETO</span>
              <strong>8 MATERIAIS</strong>
            </div>

            <div className="v90-old-price">
              preço de referência <s>R$59,90</s>
            </div>

            <div className="v90-final-price">
              <small>R$</small>
              <strong>39</strong>
              <span>,90</span>
            </div>

            <div className="v90-savings">VOCÊ ECONOMIZA R$20</div>

            <BuyButton compact />

            <div className="v90-card-trust">
              <ShieldCheck size={18} />
              <span>
                <strong>30 dias de garantia</strong>
                Confira as condições no checkout.
              </span>
            </div>
          </div>
        </div>

        <div className="v90-shell">
          <details className="v90-essential">
            <summary>
              <span>
                Quer começar menor?
                <small>Kit Essencial • somente Volume 1 • 91 páginas</small>
              </span>
              <b>R$10,00</b>
            </summary>
            <div>
              <p>
                O Kit Essencial inclui apenas o Volume 1, sem os Volumes 2 e 3 e sem os cinco bônus.
              </p>
              <AttributionLink href={checkoutUrls.essential} className="v90-essential-link">
                VER KIT ESSENCIAL <ArrowRight size={15} />
              </AttributionLink>
            </div>
          </details>
        </div>
      </section>

      <section id="duvidas" className="v90-section v90-faq-section">
        <div className="v90-shell v90-faq-grid">
          <div>
            <span className="v90-kicker">DÚVIDAS RÁPIDAS</span>
            <h2>O que ainda falta saber?</h2>
          </div>

          <div className="v90-faq">
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
        className="v90-mobile-bar"
        ariaLabel="Comprar Kit Completo por R$39,90"
      >
        <div>
          <small>
            <s>R$59,90</s>
          </small>
          <strong>R$39,90</strong>
        </div>
        <span>
          QUERO O KIT <ArrowRight size={16} />
        </span>
      </AttributionLink>

      <footer className="v90-footer">
        <div className="v90-shell">
          <div>
            <strong>Kit de Atividades Infantil e Autismo</strong>
            <p>Material digital educativo. Não substitui avaliação ou acompanhamento individualizado.</p>
          </div>
          <div className="v90-footer-links">
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
      { property: "og:title", content: "Chega de criar atividade do zero" },
      {
        property: "og:description",
        content:
          "492 páginas digitais, 3 volumes + 5 bônus. Abra, escolha, imprima e use.",
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
  component: Offer,
});
