import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clock3,
  Eye,
  FileText,
  HelpCircle,
  Layers3,
  Printer,
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

function PrimaryCta({ full = false }: { full?: boolean }) {
  return (
    <AttributionLink
      href={checkoutUrls.complete}
      className={`v11-cta${full ? " v11-cta-full" : ""}`}
    >
      <span>QUERO O KIT COMPLETO</span>
      <ArrowRight size={19} />
    </AttributionLink>
  );
}

function PreviewCard({ src, title, volume }: { src: string; title: string; volume: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="v11-preview-card" type="button" aria-label={`Ampliar ${title}`}>
          <div className="v11-preview-image">
            <img src={src} alt={`Página real do ${volume}`} loading="lazy" decoding="async" />
            <span>
              <Eye size={14} />
              ampliar
            </span>
          </div>
          <div className="v11-preview-meta">
            <strong>{volume}</strong>
            <small>{title}</small>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="v11-preview-dialog">
        <DialogTitle>
          {volume} — {title}
        </DialogTitle>
        <DialogDescription>Página real do material digital.</DialogDescription>
        <div className="v11-preview-dialog-scroll">
          <img src={src} alt={`Página ampliada do ${volume}`} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OfferPage() {
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
              Tenha uma coleção organizada para não precisar criar tudo do zero sempre que precisar
              de uma nova atividade.
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
            <div className="v11-product-copy">
              <span>KIT COMPLETO</span>
              <strong>492 páginas</strong>
              <small>3 volumes + 5 bônus</small>
            </div>

            <div className="v11-cover v11-cover-left">
              <img src={volumes[0].cover} alt="Capa do Volume 1" />
            </div>
            <div className="v11-cover v11-cover-center">
              <img src={volumes[2].cover} alt="Capa do Volume 3" />
            </div>
            <div className="v11-cover v11-cover-right">
              <img src={volumes[1].cover} alt="Capa do Volume 2" />
            </div>

            <div className="v11-bonus-stamp">
              <strong>+5</strong>
              <span>BÔNUS</span>
            </div>
          </div>
        </div>
      </section>

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
            {volumes.map((volume) => (
              <article className={`v11-volume-card v11-volume-${volume.tone}`} key={volume.label}>
                <img
                  src={volume.cover}
                  alt={`Capa do ${volume.label}`}
                  loading="lazy"
                  decoding="async"
                />
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
          <details className="v11-essential">
            <summary>
              <span>
                Prefere começar com uma opção menor?
                <small>Kit Essencial • somente Volume 1 • 91 páginas</small>
              </span>
              <strong>R$10,00</strong>
            </summary>
            <div>
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
          <div className="v11-guarantee-seal">
            <ShieldCheck size={34} />
            <strong>30</strong>
            <span>DIAS</span>
          </div>

          <div>
            <span className="v11-kicker">GARANTIA</span>
            <h2>Você tem 30 dias de garantia.</h2>
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
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="v11-final">
        <div className="v11-shell">
          <span className="v11-kicker">KIT COMPLETO</span>
          <h2>Escolha a atividade. Imprima. Use.</h2>
          <p>3 volumes + 5 bônus • 492 páginas digitais • R$39,90</p>
          <PrimaryCta />
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
