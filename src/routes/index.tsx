import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  Gift,
  Heart,
  Layers3,
  Pause,
  PencilLine,
  Play,
  Puzzle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
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

const coverDimensions: Record<number, { width: number; height: number }> = {
  1: { width: 1080, height: 1528 },
  2: { width: 1080, height: 1527 },
  3: { width: 1080, height: 1526 },
  4: { width: 1080, height: 1526 },
  5: { width: 1080, height: 1526 },
  6: { width: 1080, height: 1396 },
  7: { width: 1080, height: 1526 },
};

function getCoverSource(number: number) {
  return coverSources[number] ?? `/covers/Imagens_${number}.jpg?v=3`;
}

function getCoverDimensions(number: number) {
  return coverDimensions[number] ?? { width: 1080, height: 1527 };
}

function Cover({
  number,
  title,
  priority = false,
  onDialogOpenChange,
}: {
  number: number;
  title: string;
  priority?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const coverSource = getCoverSource(number);
  const dimensions = getCoverDimensions(number);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <Dialog {...(onDialogOpenChange ? { onOpenChange: onDialogOpenChange } : {})}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`cover-button${loaded ? " is-loaded" : ""}${failed ? " is-error" : ""}`}
          data-cover-number={number}
          aria-label={`Ampliar capa: ${title}`}
        >
          <span className="cover-skeleton" aria-hidden="true" />
          <img
            ref={imageRef}
            className="cover-image"
            src={coverSource}
            alt={`Capa de ${title}`}
            width={dimensions.width}
            height={dimensions.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
          <span className="cover-glare" aria-hidden="true" />
          {failed ? <span className="cover-error">Não foi possível carregar a capa.</span> : null}
          <span className="cover-zoom">
            <Eye size={16} />
            <span>Ampliar capa</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="cover-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>Capa do material digital em PDF.</DialogDescription>
        <div className="cover-dialog-image-frame" data-cover-number={number}>
          <img
            src={coverSource}
            alt={`Capa ampliada de ${title}`}
            width={dimensions.width}
            height={dimensions.height}
            loading="eager"
            decoding="async"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Atividades Infantil e Autismo | Pronto para imprimir" },
      {
        name: "description",
        content:
          "Atividades educativas em PDF, organizadas e prontas para imprimir. Um recurso prático para famílias e educadores.",
      },
      { property: "og:title", content: "Kit de Atividades Infantil e Autismo" },
      {
        property: "og:description",
        content: "Atividades educativas organizadas e prontas para imprimir.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const materials = [
  [PencilLine, "Alfabetização inicial", "Letras, vogais, sílabas e formação de palavras."],
  [Puzzle, "Coordenação motora", "Traçados, recortes e propostas de grafomotricidade."],
  [Brain, "Números e raciocínio", "Quantidades, sequências, associação e percepção visual."],
  [Heart, "Emoções e comunicação", "Atividades simples para reconhecer e expressar emoções."],
  [Target, "Atividades integradas", "Exercícios de revisão que conectam diferentes habilidades."],
  [Layers3, "Material organizado", "Conteúdo dividido por temas para facilitar a escolha diária."],
] as const;

const bonuses = [
  [
    "01",
    "Planejamento de 4 semanas",
    "Organize o foco de cada encontro e o que pretende aplicar.",
    "24 páginas",
  ],
  [
    "02",
    "Rotina visual para recortar",
    "Apresente a sequência do dia com cartões e quadros visuais.",
    "20 páginas",
  ],
  [
    "03",
    "Jogos de mesa imprimíveis",
    "Quatro jogos com orientações, tabuleiros e peças para imprimir e montar.",
    "30 páginas",
  ],
  [
    "04",
    "Caderno de observação da aprendizagem",
    "Registre participação, preferências, apoios e próximos passos.",
    "16 páginas",
  ],
  [
    "05",
    "Atividades para enviar às famílias",
    "Dê continuidade em casa com propostas e modelos de bilhetes.",
    "20 páginas",
  ],
] as const;

const faqs = [
  [
    "Qual a diferença entre Essencial e Completo?",
    "O Essencial reúne o kit principal de 91 páginas por R$10. O Completo inclui esse mesmo kit, o Volume 2 e os cinco bônus, que somam 110 páginas, por R$59,90. A diferença de R$49,90 acrescenta atividades e recursos para planejar, organizar a rotina e registrar observações.",
  ],
  [
    "Consigo comprar agora?",
    "As compras ainda não estão disponíveis nesta página. Você pode conhecer o conteúdo e comparar as opções; os botões de pagamento serão habilitados quando as vendas estiverem abertas.",
  ],
  [
    "O material é físico? Preciso imprimir tudo?",
    "Você recebe arquivos digitais em PDF, sem envio de material físico. Escolha e imprima apenas as páginas que pretende utilizar. A impressão é por sua conta.",
  ],
  [
    "Como escolher uma atividade para a criança?",
    "Comece pela habilidade que deseja trabalhar e observe se a instrução e o desafio fazem sentido para a criança. Considere seus interesses e os apoios de que precisa; adapte a proposta quando necessário.",
  ],
  [
    "Preciso ter formação para usar em casa?",
    "O kit é um recurso educativo para selecionar e acompanhar atividades. Leia a orientação de cada proposta e ofereça ajuda quando necessário. Ele não substitui avaliação, terapia ou acompanhamento individualizado.",
  ],
  [
    "O que acontece depois da compra?",
    "Quando as vendas estiverem abertas, o acesso ao material digital será liberado após a confirmação do pagamento. Antes de comprar, confira no checkout as informações de entrega e atendimento.",
  ],
] as const;

const included = [
  [
    "Kit principal — 91 páginas",
    "Atividades para alfabetização, coordenação, números, percepção, emoções e associação.",
  ],
  [
    "Volume 2 de atividades",
    "Mais variedade de propostas para manter a rotina de aprendizagem interessante.",
  ],
  [
    "5 bônus — 110 páginas",
    "Planejamento, rotina visual, jogos, caderno de observação e atividades para enviar às famílias.",
  ],
] as const;

function Cta({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <a
      href="#precos"
      className={`cta-shimmer group inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black tracking-wide transition-all duration-300 hover:-translate-y-1 active:translate-y-0 ${light ? "bg-white text-deep shadow-xl shadow-black/10" : "bg-coral text-white shadow-xl shadow-coral/25"}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function PurchaseAction({ kit }: { kit: "essential" | "complete" }) {
  const url = checkoutUrls[kit];
  const complete = kit === "complete";
  const label = complete ? "Quero o Completo — R$59,90" : "Escolher Essencial — R$10";
  return (
    <div className="purchase-action">
      {url ? (
        <a className={complete ? "purchase-button primary" : "purchase-button"} href={url}>
          {label}
          <ArrowRight size={18} />
        </a>
      ) : (
        <button
          className={complete ? "purchase-button primary" : "purchase-button"}
          disabled
          aria-describedby={`availability-${kit}`}
        >
          Compra indisponível no momento
        </button>
      )}
      <p id={`availability-${kit}`}>
        {url
          ? "PDF para imprimir • acesso após confirmação do pagamento"
          : "As vendas ainda não estão abertas nesta página."}
      </p>
    </div>
  );
}

function GuaranteeSeal() {
  return (
    <div className="guarantee-lockup" aria-label="Garantia de 7 dias">
      <div className="guarantee-seal" aria-hidden="true">
        <span className="guarantee-glint" />
        <ShieldCheck className="guarantee-icon" />
        <strong>7 DIAS</strong>
        <span>GARANTIA</span>
      </div>
      <div className="guarantee-copy">
        <strong>Garantia de 7 dias</strong>
        <span>Conheça o material com tranquilidade.</span>
      </div>
    </div>
  );
}

function Index() {
  const page = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const galleryPaused = useRef(false);
  const galleryModalOpen = useRef(false);
  const galleryResetTimer = useRef<number | null>(null);
  const galleryLastInteraction = useRef(0);
  const bonusVisible = useRef(false);
  const pageVisible = useRef(true);
  const [galleryAutoplayEnabled, setGalleryAutoplayEnabled] = useState(true);

  const markGalleryInteraction = useCallback(() => {
    galleryLastInteraction.current = window.performance?.now?.() ?? Date.now();
  }, []);

  const moveGallery = useCallback((direction: number) => {
    const rail = gallery.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>(".bonus-product");
    const gap = 24;
    const step = (card?.getBoundingClientRect().width ?? 280) + gap;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const originalCount = bonuses.length;
    let currentIndex = Math.round(rail.scrollLeft / step);

    if (galleryResetTimer.current) {
      window.clearTimeout(galleryResetTimer.current);
      galleryResetTimer.current = null;
    }

    if (currentIndex >= originalCount) {
      rail.scrollTo({ left: 0, behavior: "instant" });
      currentIndex = 0;
    }

    if (direction > 0 && currentIndex === originalCount - 1) {
      rail.scrollTo({
        left: originalCount * step,
        behavior: reducedMotion ? "instant" : "smooth",
      });

      if (reducedMotion) {
        rail.scrollTo({ left: 0, behavior: "instant" });
      } else {
        galleryResetTimer.current = window.setTimeout(() => {
          rail.scrollTo({ left: 0, behavior: "instant" });
          galleryResetTimer.current = null;
        }, 760);
      }
      return;
    }

    if (direction < 0 && currentIndex <= 0) {
      rail.scrollTo({ left: originalCount * step, behavior: "instant" });
      window.requestAnimationFrame(() => {
        rail.scrollTo({
          left: (originalCount - 1) * step,
          behavior: reducedMotion ? "instant" : "smooth",
        });
      });
      return;
    }

    rail.scrollTo({
      left: (currentIndex + direction) * step,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !galleryAutoplayEnabled) return;

    const bonusSection = document.getElementById("bonus");
    const updatePageVisibility = () => {
      pageVisible.current = document.visibilityState === "visible";
    };

    updatePageVisibility();
    markGalleryInteraction();

    let visibilityObserver: IntersectionObserver | null = null;
    if (bonusSection && "IntersectionObserver" in window) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          bonusVisible.current = entry?.isIntersecting ?? false;
        },
        { rootMargin: "180px 0px", threshold: 0.01 },
      );
      visibilityObserver.observe(bonusSection);
    } else {
      bonusVisible.current = true;
    }

    const autoplay = window.setInterval(() => {
      const now = window.performance?.now?.() ?? Date.now();
      const idleFor = now - galleryLastInteraction.current;

      if (
        pageVisible.current &&
        bonusVisible.current &&
        !galleryPaused.current &&
        !galleryModalOpen.current &&
        idleFor >= 3400
      ) {
        moveGallery(1);
        galleryLastInteraction.current = now;
      }
    }, 400);

    document.addEventListener("visibilitychange", updatePageVisibility);

    return () => {
      window.clearInterval(autoplay);
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", updatePageVisibility);
      if (galleryResetTimer.current) window.clearTimeout(galleryResetTimer.current);
    };
  }, [galleryAutoplayEnabled, markGalleryInteraction, moveGallery]);

  useEffect(() => {
    const root = page.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("motion-active"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("motion-active", entry.isIntersecting);
        });
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = page.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const elements = root.querySelectorAll(
      "section:not(#inicio) > div, .feature-card, .bonus-card, .bonus-product",
    );
    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });
    const disableMotion = () => elements.forEach((element) => element.classList.add("is-visible"));
    preference.addEventListener("change", disableMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", disableMotion);
      elements.forEach((element) => element.classList.remove("scroll-reveal"));
    };
  }, []);
  return (
    <main ref={page} className="editorial-page min-h-screen overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="section-shell flex h-18 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 font-display font-bold text-deep">
            <span className="grid size-9 place-items-center rounded-xl bg-coral text-white">
              <BookOpen className="size-5" />
            </span>
            <span className="hidden sm:block">Kit de Atividades</span>
          </a>
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 text-sm font-bold text-deep/65 md:flex"
          >
            <a className="hover:text-deep" href="#conteudo">
              Conteúdo
            </a>
            <a className="hover:text-deep" href="#bonus">
              Bônus
            </a>
            <a className="hover:text-deep" href="#duvidas">
              Dúvidas
            </a>
          </nav>
          <a
            href="#precos"
            className="rounded-full bg-deep px-5 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-deep/90"
          >
            VER OS KITS
          </a>
        </div>
      </header>

      <section id="inicio" className="premium-hero relative pt-28 pb-12 sm:pt-36 sm:pb-18">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="section-shell relative">
          <div className="premium-hero-card">
            <div className="premium-hero-copy">
              <div className="premium-hero-eyebrow">
                <span aria-hidden="true" />
                KIT COMPLETO • DIGITAL
              </div>

              <h1>
                Mais que atividades.
                <br />
                Um kit para aplicar
                <br />
                <span>com mais clareza.</span>
              </h1>

              <p className="premium-hero-intro">
                Atividades prontas para imprimir + recursos para planejar, organizar a rotina,
                jogar, observar e continuar em casa.
              </p>

              <div className="premium-hero-badges" aria-label="Destaques do kit">
                <span>2 VOLUMES + 5 BÔNUS</span>
                <span>PRONTO PARA IMPRIMIR</span>
                <span>USO SIMPLES</span>
              </div>

              <div className="premium-hero-actions">
                <Cta>CONHECER O COMPLETO — R$59,90</Cta>
                <GuaranteeSeal />
              </div>

              <a href="#como-usar" className="usage-link premium-hero-link">
                Veja como começar com uma página <ArrowRight size={16} />
              </a>

              <div className="premium-hero-topics" aria-label="Conteúdos trabalhados">
                {["Letras", "Números", "Coordenação", "Emoções", "Rotina", "Jogos"].map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
            </div>

            <div
              className="premium-hero-visual"
              aria-label="Prévia dos cinco bônus do Kit Completo"
            >
              <div className="premium-hero-visual-grid" aria-hidden="true" />
              <div className="premium-hero-offer-chip">5 BÔNUS • 110 PÁGINAS</div>

              <span className="premium-hero-callout callout-plan">
                <Check size={17} /> PLANEJAR
              </span>
              <span className="premium-hero-callout callout-routine">
                <CheckCircle2 size={17} /> ROTINA
              </span>
              <span className="premium-hero-callout callout-play">
                <Sparkles size={17} /> JOGAR
              </span>
              <span className="premium-hero-callout callout-observe">
                <Eye size={17} /> OBSERVAR
              </span>

              <div className="premium-cover premium-cover-1">
                <img
                  src={getCoverSource(3)}
                  alt="Capa do bônus Planejamento de 4 semanas"
                  width={1080}
                  height={1526}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>
              <div className="premium-cover premium-cover-2">
                <img
                  src={getCoverSource(4)}
                  alt="Capa do bônus Rotina visual para recortar"
                  width={1080}
                  height={1526}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>
              <div className="premium-cover premium-cover-3">
                <img
                  src={getCoverSource(5)}
                  alt="Capa do bônus Jogos de mesa imprimíveis"
                  width={1080}
                  height={1526}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="premium-cover premium-cover-4">
                <img
                  src={getCoverSource(6)}
                  alt="Capa do bônus Caderno de observação da aprendizagem"
                  width={getCoverDimensions(6).width}
                  height={getCoverDimensions(6).height}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>
              <div className="premium-cover premium-cover-5">
                <img
                  src={getCoverSource(7)}
                  alt="Capa do bônus Atividades para enviar às famílias"
                  width={1080}
                  height={1526}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>

              <div className="premium-hero-ribbon">Escolha • imprima • aplique • acompanhe</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-deep/5 bg-white py-6">
        <div className="section-shell grid grid-cols-3 divide-x divide-deep/10 text-center">
          {[
            ["91", "páginas no kit principal"],
            ["110", "páginas só em bônus"],
            ["PDF", "pronto para imprimir"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong className="block text-2xl font-black text-deep sm:text-3xl">{value}</strong>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="como-usar" className="usage-section">
        <div className="section-shell">
          <p className="eyebrow">DO ARQUIVO PARA A SUA ROTINA</p>
          <h2>
            Comece com uma página.
            <br />
            Uma proposta de cada vez.
          </h2>
          <p className="usage-intro">
            Você não precisa preparar o kit inteiro. Escolha uma atividade, separe o necessário e
            acompanhe a criança.
          </p>
          <ol className="usage-steps">
            <li>
              <span>01</span>
              <h3>Escolha uma habilidade</h3>
              <p>Encontre o tema que quer trabalhar e leia a instrução da proposta.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Prepare só o necessário</h3>
              <p>
                Imprima a página escolhida e separe os materiais indicados para aquela atividade.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Apresente e observe</h3>
              <p>Dê uma instrução clara, acompanhe a resposta e adapte quando necessário.</p>
            </li>
          </ol>
          <div className="usage-note">
            <BookOpen size={24} aria-hidden="true" />
            <p>
              <strong>O que você está comprando é organização.</strong> Atividades reunidas por
              habilidade e, no Completo, materiais que ajudam a planejar e acompanhar o uso.
            </p>
          </div>
        </div>
      </section>
      <section className="relative py-18 sm:py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">SE A ROTINA DE ATIVIDADES VIROU UMA CORRERIA</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Você não precisa criar tudo do zero.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Em vez de abrir dezenas de abas, adaptar materiais confusos e ficar sem ideia na hora
              de aplicar, você terá atividades separadas por habilidade — prontas para escolher e
              imprimir.
            </p>
            <div className="mt-7 rounded-2xl border border-coral/20 bg-coral-soft p-5 text-sm leading-6 text-deep">
              <strong className="font-black">O objetivo é simples:</strong> facilitar a preparação e
              deixar mais energia para a interação com a criança.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                [
                  CalendarCheck2,
                  "Economize tempo",
                  "Tenha propostas prontas para a rotina, sem montar atividade do zero.",
                ],
                [
                  Eye,
                  "Escolha com clareza",
                  "Encontre rapidamente uma atividade pela habilidade que quer trabalhar.",
                ],
                [
                  CheckCircle2,
                  "Aplique com leveza",
                  "Páginas visuais e instruções simples, feitas para entrar em ação.",
                ],
              ] as const
            ).map(([Icon, title, text]) => (
              <article
                key={title}
                className="feature-card rounded-[1.5rem] border border-deep/8 bg-white p-5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-sun-soft text-deep">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-bold text-deep">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="conteudo" className="py-18 sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center reveal-up">
            <p className="eyebrow">ESCOLHA PELA HABILIDADE QUE QUER TRABALHAR</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Encontre uma proposta para o próximo encontro.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Letras, traçados, números e outras propostas reunidas por tema, para você selecionar o
              que faz sentido agora.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map(([Icon, title, description], index) => (
              <article
                key={title}
                className="feature-card reveal-card rounded-[1.5rem] border border-deep/8 bg-white p-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-sky-soft text-deep">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-deep">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep py-18 text-white sm:py-24">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">
              NÃO É UM MONTE DE PÁGINAS SOLTAS
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Você recebe um caminho prático para aplicar.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/65">
              O material vem organizado para você começar pelo que faz sentido agora e avançar no
              ritmo da criança.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              [
                "01",
                "Encontre a habilidade",
                "Vogais, números, coordenação, emoções e muito mais.",
              ],
              [
                "02",
                "Imprima o que precisa",
                "Use uma página ou monte uma sequência — sem desperdício.",
              ],
              [
                "03",
                "Aplique e avance",
                "Observe a resposta e escolha a próxima proposta com mais segurança.",
              ],
            ].map(([number, title, text]) => (
              <li
                key={number}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/6 p-5 transition hover:translate-x-1 hover:bg-white/10"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-coral font-black">
                  {number}
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="bonus" className="bg-mint-soft py-18 sm:py-24">
        <div className="section-shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">O QUE VOCÊ LEVA NO KIT COMPLETO</p>
              <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
                Cinco apoios para colocar as atividades em prática.
              </h2>
            </div>
            <Gift className="bonus-gift hidden size-16 text-coral/70 md:block" />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            110 páginas em materiais complementares, incluídas no Completo. Toque para ampliar as
            capas.
          </p>
          <div className="gallery-controls">
            <span>
              Explore os 5 bônus <span aria-hidden="true">→</span>
            </span>
            <div>
              <button
                type="button"
                onClick={() => {
                  markGalleryInteraction();
                  moveGallery(-1);
                }}
                aria-label="Ver bônus anteriores"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => {
                  markGalleryInteraction();
                  moveGallery(1);
                }}
                aria-label="Ver próximos bônus"
              >
                <ArrowRight size={20} />
              </button>
              <button
                type="button"
                className="gallery-autoplay-toggle"
                onClick={() => {
                  markGalleryInteraction();
                  setGalleryAutoplayEnabled((enabled) => !enabled);
                }}
                aria-pressed={!galleryAutoplayEnabled}
                aria-label={
                  galleryAutoplayEnabled
                    ? "Pausar rotação automática dos bônus"
                    : "Retomar rotação automática dos bônus"
                }
                title={
                  galleryAutoplayEnabled
                    ? "Pausar rotação automática"
                    : "Retomar rotação automática"
                }
              >
                {galleryAutoplayEnabled ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
          </div>
          <div
            ref={gallery}
            className="bonus-gallery"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Capas dos cinco bônus em carrossel automático"
            aria-live="off"
            tabIndex={0}
            onPointerEnter={() => {
              galleryPaused.current = true;
            }}
            onPointerLeave={() => {
              galleryPaused.current = galleryModalOpen.current;
              markGalleryInteraction();
            }}
            onPointerDown={() => {
              galleryPaused.current = true;
              markGalleryInteraction();
            }}
            onPointerUp={() => {
              galleryPaused.current = galleryModalOpen.current;
              markGalleryInteraction();
            }}
            onPointerCancel={() => {
              galleryPaused.current = galleryModalOpen.current;
              markGalleryInteraction();
            }}
            onFocusCapture={() => {
              galleryPaused.current = true;
              markGalleryInteraction();
            }}
            onBlurCapture={() => {
              galleryPaused.current = galleryModalOpen.current;
              markGalleryInteraction();
            }}
          >
            {bonuses.map(([number, title, text, pages], index) => (
              <article key={title} className="bonus-product">
                <div className="bonus-visual">
                  <span className="bonus-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <Cover
                    number={index + 3}
                    title={title}
                    onDialogOpenChange={(open) => {
                      galleryModalOpen.current = open;
                      galleryPaused.current = open;
                      markGalleryInteraction();
                    }}
                  />
                </div>
                <span className="bonus-label">
                  BÔNUS {number} · {pages}
                </span>
                <h3 className="font-bold leading-5 text-deep">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                <span className="bonus-included">
                  <Check size={14} /> Incluído no Kit Completo
                </span>
              </article>
            ))}
            <article className="bonus-product bonus-clone" aria-hidden="true">
              <div className="bonus-visual">
                <span className="bonus-index" aria-hidden="true">
                  01
                </span>
                <div className="cover-button is-loaded" data-cover-number={3}>
                  <img
                    className="cover-image"
                    src={getCoverSource(3)}
                    alt=""
                    width={getCoverDimensions(3).width}
                    height={getCoverDimensions(3).height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="cover-zoom" aria-hidden="true">
                    <Eye size={16} />
                    <span>Ampliar capa</span>
                  </span>
                </div>
              </div>
              <span className="bonus-label">BÔNUS 01 · 24 páginas</span>
              <h3 className="font-bold leading-5 text-deep">Planejamento de 4 semanas</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Organize o foco de cada encontro e o que pretende aplicar.
              </p>
              <span className="bonus-included">
                <Check size={14} /> Incluído no Kit Completo
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">TUDO ORGANIZADO EM UM SÓ LUGAR</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Veja exatamente o que entra no seu acesso.
            </h2>
          </div>
          <div className="mx-auto mt-11 grid max-w-4xl gap-4">
            {included.map(([title, text], index) => (
              <article
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-deep/8 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-coral text-sm font-black text-white">
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-bold text-deep">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
                <CheckCircle2 className="size-6 shrink-0 text-success" />
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Cta>COMPARAR OS KITS</Cta>
          </div>
        </div>
      </section>

      <section id="precos" className="offer-section">
        <div className="section-shell">
          <div className="offer-heading">
            <p className="eyebrow">O QUE FAZ SENTIDO PARA A SUA ROTINA?</p>
            <h2>
              Atividades para começar.
              <br />
              Apoios para continuar.
            </h2>
            <p>Compare o que você recebe em cada opção. Os dois kits são digitais, em PDF.</p>
          </div>
          <div className="offer-grid">
            <article className="offer-card offer-complete">
              <span className="offer-label">DOIS VOLUMES + CINCO BÔNUS</span>
              <h3>Kit Completo</h3>
              <p>
                Para quem quer atividades e recursos para organizar o uso, do planejamento ao
                registro.
              </p>
              <div className="offer-price">
                <span>R$</span>
                <strong>59,90</strong>
              </div>
              <p className="offer-payment">Pagamento único • sem assinatura</p>
              <ul>
                {[
                  "Kit principal — 91 páginas",
                  "Volume 2 — mais propostas de atividades",
                  "Planejamento de 4 semanas",
                  "Rotina visual para recortar",
                  "Quatro jogos de mesa imprimíveis",
                  "Caderno de observação da aprendizagem",
                  "Atividades para enviar às famílias",
                ].map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="offer-difference">
                <strong>O que os R$49,90 a mais acrescentam?</strong>
                <p>
                  O Volume 2 e os cinco bônus: 110 páginas de apoio para planejar, organizar a
                  rotina, jogar e registrar observações.
                </p>
              </div>
              <PurchaseAction kit="complete" />
            </article>
            <article className="offer-card offer-essential">
              <span className="offer-label">O MATERIAL PRINCIPAL</span>
              <h3>Kit Essencial</h3>
              <p>Para começar pelas atividades do kit principal.</p>
              <div className="offer-price">
                <span>R$</span>
                <strong>10,00</strong>
              </div>
              <p className="offer-payment">Pagamento único • sem assinatura</p>
              <ul>
                {[
                  "Kit principal — 91 páginas",
                  "Atividades organizadas por habilidade",
                  "Arquivo digital em PDF para imprimir",
                ].map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="essential-limits">
                O Volume 2 e os cinco bônus fazem parte apenas do Kit Completo.
              </p>
              <PurchaseAction kit="essential" />
            </article>
          </div>
          <p className="offer-footnote">
            Sem envio físico. Imprima as páginas que escolher; os custos de impressão não estão
            incluídos.
          </p>
        </div>
      </section>

      <section className="guarantee-section" aria-labelledby="guarantee-title">
        <div className="section-shell guarantee-layout">
          <div className="gold-seal" role="img" aria-label="Garantia de 7 dias">
            <div className="seal-inner">
              <span className="seal-stars" aria-hidden="true">
                ★ ★ ★
              </span>
              <span className="seal-top">GARANTIA</span>
              <strong>7</strong>
              <span className="seal-days">DIAS</span>
              <ShieldCheck aria-hidden="true" size={24} />
            </div>
          </div>
          <div>
            <p className="eyebrow">TEMPO PARA CONHECER O MATERIAL</p>
            <h2 id="guarantee-title">Sua escolha merece tranquilidade.</h2>
            <p>
              Você tem 7 dias de garantia para conhecer o kit. Se o material não atender às suas
              expectativas, solicite o reembolso dentro desse prazo.
            </p>
            <a href="#precos" className="guarantee-link">
              Escolher meu kit <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section id="duvidas" className="bg-sky-soft py-18 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">ANTES DE COMEÇAR</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">Dúvidas frequentes</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Informações diretas para você saber exatamente o que está adquirindo.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <details
                key={question}
                className="faq group rounded-2xl border border-deep/8 bg-white p-5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-deep">
                  {question}
                  <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-2xl pr-8 text-sm leading-6 text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-coral py-18 text-center text-white sm:py-24">
        <div className="absolute inset-0 opacity-15 hero-grid" />
        <div className="section-shell relative">
          <Users className="mx-auto size-10" />
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-5xl">
            Seu próximo encontro pode começar com uma escolha simples.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
            Conheça os materiais e escolha entre as atividades do Essencial e os apoios adicionais
            do Completo.
          </p>
          <div className="mt-8">
            <Cta light>COMPARAR ESSENCIAL E COMPLETO</Cta>
          </div>
        </div>
      </section>
      <footer className="bg-deep px-4 py-8 text-center text-xs leading-5 text-white/45">
        © 2026 Kit de Atividades Infantil e Autismo. Material digital educativo.
        <br />
        Não substitui acompanhamento profissional ou avaliação individualizada.
      </footer>
    </main>
  );
}
