import { createFileRoute } from "@tanstack/react-router";
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
    "Após a confirmação do pagamento, você recebe as instruções de acesso ao material digital conforme as informações apresentadas no checkout.",
  ],
  [
    "Tenho garantia?",
    "Sim. A oferta informa garantia de 7 dias. Confira as condições no checkout antes de concluir a compra.",
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
    <a className={`v3-button${dark ? " v3-button-dark" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}

function Index() {
  return (
    <main className="v3-page">
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
              Pare de perder tempo
              <span> procurando atividades.</span>
            </h1>

            <p className="v3-hero-lead">
              Tenha <strong>292 páginas</strong> entre atividades e materiais de apoio para
              trabalhar letras, números, coordenação, emoções, rotina, raciocínio e muito mais.
            </p>

            <div className="v3-proof-row" aria-label="Resumo do Kit Completo">
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
              <span>
                <strong>R$59,90</strong>
                pagamento único
              </span>
            </div>

            <div className="v3-hero-actions">
              <PrimaryButton href={checkoutUrls.complete}>QUERO O KIT COMPLETO</PrimaryButton>
              <a className="v3-text-link" href="#precos">
                Comparar com o Essencial
              </a>
            </div>

            <p className="v3-microcopy">
              Produto digital • acesso após confirmação do pagamento • garantia informada de 7 dias
            </p>
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

            <span className="v3-art-chip v3-art-chip-top">2 VOLUMES</span>
            <span className="v3-art-chip v3-art-chip-bottom">+ 5 BÔNUS</span>
          </div>
        </div>
      </section>

      <section id="conteudo" className="v3-section v3-section-light">
        <div className="v3-shell">
          <div className="v3-section-heading">
            <span className="v3-kicker">VOCÊ RECEBE</span>
            <h2>Um pacote completo, sem transformar a página em um catálogo infinito.</h2>
            <p>
              Dois volumes de atividades e cinco materiais complementares. Tudo separado para você
              entender rapidamente o que está comprando.
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

            <article className="v3-bonus-card">
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

      <section className="v3-section v3-benefits">
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
              <span className="v3-popular-badge">
                <Sparkles size={14} />
                MAIS COMPLETO
              </span>

              <span className="v3-price-tag">2 VOLUMES + 5 BÔNUS</span>
              <h3>Kit Completo</h3>
              <p className="v3-price-description">
                A coleção inteira para ter mais variedade e recursos de apoio.
              </p>

              <div className="v3-price">
                <span>R$</span>
                <strong>59</strong>
                <small>,90</small>
              </div>

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

              <PrimaryButton href={checkoutUrls.complete}>QUERO O KIT COMPLETO</PrimaryButton>

              <p className="v3-price-difference">
                Por R$49,90 a mais, você acrescenta <strong>201 páginas</strong> ao Essencial.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="duvidas" className="v3-section v3-assurance-section">
        <div className="v3-shell v3-assurance-grid">
          <div className="v3-guarantee">
            <span className="v3-guarantee-icon">
              <ShieldCheck size={34} />
            </span>
            <span className="v3-kicker">GARANTIA INFORMADA DE 7 DIAS</span>
            <h2>Escolha com mais tranquilidade.</h2>
            <p>
              Você pode conferir as condições da garantia e as informações de entrega diretamente no
              checkout antes de concluir o pagamento.
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

          <PrimaryButton href={checkoutUrls.complete}>QUERO O KIT COMPLETO — R$59,90</PrimaryButton>
        </div>
      </section>

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
