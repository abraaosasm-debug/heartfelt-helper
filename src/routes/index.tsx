import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Brain,
  CalendarCheck2,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  Gift,
  Heart,
  Layers3,
  LockKeyhole,
  PencilLine,
  Printer,
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

function Cover({
  number,
  title,
  priority = false,
}: {
  number: number;
  title: string;
  priority?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="cover-button" aria-label={`Ampliar capa: ${title}`}>
          <img
            src={`/covers/Imagens_${number}.jpg?v=2`}
            alt={`Capa de ${title}`}
            width={1080}
            height={1527}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
          <span className="cover-zoom">
            <Eye size={15} /> Ver capa
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="cover-dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>Capa do material digital em PDF.</DialogDescription>
        <img
          src={`/covers/Imagens_${number}.jpg?v=2`}
          alt={`Capa ampliada de ${title}`}
          width={1080}
          height={1527}
        />
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
  ["01", "Planejamento de 4 semanas", "Uma sugestão de sequência para tirar o material do papel."],
  ["02", "Rotina visual para recortar", "Cartões e quadros para apoiar a organização do dia."],
  ["03", "Jogos de mesa imprimíveis", "Propostas lúdicas com regras, tabuleiros e peças."],
  ["04", "Caderno de observação", "Fichas práticas para registrar participação e próximos passos."],
  ["05", "Atividades para as famílias", "Exercícios e modelos de bilhete para enviar para casa."],
] as const;

const faqs = [
  [
    "Como recebo o material?",
    "Após a confirmação do pagamento, o acesso ao material digital é liberado para download.",
  ],
  [
    "O material é físico?",
    "Não. Você recebe arquivos digitais em PDF e pode imprimir as páginas que quiser, quando precisar.",
  ],
  [
    "Para qual idade é indicado?",
    "As propostas trabalham habilidades iniciais. A escolha deve considerar o nível de desenvolvimento e os interesses de cada criança, não apenas a idade.",
  ],
  [
    "Preciso imprimir tudo de uma vez?",
    "Não. O kit foi organizado para você selecionar e imprimir somente as atividades adequadas para cada momento.",
  ],
  [
    "O kit substitui acompanhamento profissional?",
    "Não. O material tem finalidade educativa e não substitui avaliação, terapia ou acompanhamento individualizado.",
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

function Index() {
  const page = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const moveGallery = (direction: number) => {
    const rail = gallery.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    rail.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width ?? 280) + 24),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
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
      "section:not(#inicio) > div, .feature-card, .bonus-card",
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

      <section id="inicio" className="hero-grid relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <div className="reveal-up text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-deep/10 bg-white/75 px-4 py-2 text-xs font-black text-deep shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-coral" /> KIT DE ATIVIDADES INFANTIL E AUTISMO
            </div>
            <h1 className="balance text-4xl font-bold leading-[1.03] text-deep sm:text-6xl lg:text-7xl">
              Prepare menos. <span className="marker-text">Compartilhe mais descobertas.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
              Receba um acervo completo de atividades educativas prontas para imprimir, com dois
              volumes e 5 bônus para transformar a rotina em momentos de aprendizado mais leves.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Cta>QUERO O KIT COMPLETO AGORA</Cta>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-deep/65">
                <ShieldCheck className="size-5 text-success" /> 7 dias de garantia
              </span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-extrabold text-deep/60 lg:justify-start">
              <span className="flex items-center gap-2">
                <Download className="size-4 text-coral" /> Acesso digital
              </span>
              <span className="flex items-center gap-2">
                <Printer className="size-4 text-coral" /> Pronto para imprimir
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-coral" /> Uso simples
              </span>
            </div>
          </div>
          <div className="collection-stage">
            <div className="collection-caption">
              <span>A SUA PRÓXIMA ATIVIDADE COMEÇA AQUI</span>
              <strong>Uma coleção. Muitas descobertas.</strong>
            </div>
            <div className="book-pair">
              <div className="book-one">
                <Cover number={1} title="Kit principal" priority />
              </div>
              <div className="book-two">
                <Cover number={2} title="Volume 2" priority />
              </div>
            </div>
            <div className="collection-foot">
              <span>02 volumes + 05 bônus</span>
              <span>Arquivos digitais · PDF</span>
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
            <p className="eyebrow">UM KIT PARA VOCÊ NUNCA FICAR SEM IDEIA</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Abra, escolha a habilidade e comece a aplicar.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Cada módulo reduz a dúvida do “o que fazer hoje?” e aumenta a variedade das
              atividades.
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
                Um acervo que continua útil depois da primeira impressão.
              </h2>
            </div>
            <Gift className="hidden size-16 text-coral/70 md:block" />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Conheça cada material. Toque nas capas para ver os detalhes.
          </p>
          <div className="gallery-controls">
            <span>
              Explore os 5 bônus <span aria-hidden="true">→</span>
            </span>
            <div>
              <button
                type="button"
                onClick={() => moveGallery(-1)}
                aria-label="Ver bônus anteriores"
              >
                <ArrowLeft size={20} />
              </button>
              <button type="button" onClick={() => moveGallery(1)} aria-label="Ver próximos bônus">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div
            ref={gallery}
            className="bonus-gallery"
            role="region"
            aria-label="Capas dos cinco bônus"
            tabIndex={0}
          >
            {bonuses.map(([number, title, text], index) => (
              <article
                key={title}
                className="bonus-product"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Cover number={index + 3} title={title} />
                <span className="bonus-label">BÔNUS {number}</span>
                <h3 className="font-bold leading-5 text-deep">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                <span className="bonus-included">
                  <Check size={14} /> Incluído no Kit Completo
                </span>
              </article>
            ))}
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
            <Cta>SIM, QUERO ACESSAR O KIT COMPLETO</Cta>
          </div>
        </div>
      </section>

      <section id="precos" className="py-18 sm:py-24">
        <div className="section-shell">
          <div className="text-center">
            <p className="eyebrow">ESCOLHA COMO QUER COMEÇAR</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Leve o material para sua rotina hoje.
            </h2>
          </div>
          <div className="mx-auto mt-11 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            <article className="price-card rounded-[1.75rem] border border-deep/10 bg-white p-7 sm:p-9">
              <p className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                Kit Essencial
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Para conhecer o conteúdo-base do kit.
              </p>
              <div className="mt-6 flex items-end gap-1 text-deep">
                <span className="pb-1.5 font-bold">R$</span>
                <strong className="text-5xl font-black">10,00</strong>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {["Kit principal em PDF", "Acesso digital", "Pronto para imprimir"].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="size-5 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-8 flex h-13 items-center justify-center rounded-full border-2 border-deep text-sm font-black text-deep transition hover:bg-deep hover:text-white"
              >
                QUERO COMEÇAR PELO ESSENCIAL
              </a>
            </article>
            <article className="price-card popular relative rounded-[1.75rem] bg-deep p-7 text-white sm:p-9">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral px-4 py-1.5 text-xs font-black shadow-lg">
                MELHOR CUSTO-BENEFÍCIO
              </span>
              <p className="text-sm font-black uppercase tracking-wider text-accent">
                Kit Completo + Bônus
              </p>
              <p className="mt-3 text-sm text-white/60">
                A escolha para quem quer mais variedade desde o primeiro dia.
              </p>
              <div className="mt-6 flex items-end gap-1">
                <span className="pb-1.5 font-bold">R$</span>
                <strong className="text-5xl font-black">59,90</strong>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {[
                  "Kit principal completo",
                  "Volume 2",
                  "Todos os 5 bônus",
                  "Acesso digital",
                  "Material pronto para imprimir",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="size-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="cta-shimmer mt-8 flex h-13 items-center justify-center rounded-full bg-coral text-sm font-black text-white shadow-lg"
              >
                QUERO TUDO QUE ESTÁ INCLUSO
              </a>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-white/50">
                <LockKeyhole className="size-3.5" /> Pagamento seguro • liberação após a compra
              </p>
            </article>
          </div>
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
            Tenha atividades organizadas à mão sempre que precisar.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
            Escolha seu kit, faça o download e imprima no seu ritmo.
          </p>
          <div className="mt-8">
            <Cta light>VER OPÇÕES DE ACESSO</Cta>
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
