import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
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
import kitMockup from "@/assets/kit-atividades-mockup.jpg";

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
  return (
    <main className="min-h-screen overflow-hidden bg-background">
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
              <Sparkles className="size-4 text-coral" /> MATERIAL EDUCATIVO EM PDF
            </div>
            <h1 className="balance text-4xl font-bold leading-[1.03] text-deep sm:text-6xl lg:text-7xl">
              Menos tempo procurando. <span className="marker-text">Mais tempo ensinando.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
              Um kit de atividades infantis organizado por habilidades, pronto para você escolher,
              imprimir e aplicar no seu ritmo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Cta>CONHECER O KIT COMPLETO</Cta>
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
          <div className="float-soft relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-full bg-coral/10 blur-3xl" />
            <div className="mockup-frame relative overflow-hidden rounded-[2rem] bg-white p-3">
              <img
                src={kitMockup}
                width={1408}
                height={1200}
                alt="Apostilas e folhas do kit de atividades educativas"
                className="aspect-[7/6] w-full rounded-[1.35rem] object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-mint-soft text-success">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-coral">
                      Conteúdo digital
                    </p>
                    <p className="font-extrabold text-deep">Volumes + materiais complementares</p>
                  </div>
                </div>
              </div>
            </div>
            <span className="absolute -right-2 top-10 rotate-3 rounded-2xl bg-sun-soft px-4 py-3 text-xs font-black text-deep shadow-lg sm:-right-8">
              ESCOLHA • IMPRIMA • APLIQUE
            </span>
          </div>
        </div>
      </section>

      <section className="border-y border-deep/5 bg-white py-6">
        <div className="section-shell grid grid-cols-3 divide-x divide-deep/10 text-center">
          {[
            ["2", "volumes"],
            ["5", "bônus"],
            ["PDF", "acesso digital"],
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

      <section id="conteudo" className="py-18 sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center reveal-up">
            <p className="eyebrow">CONTEÚDO PENSADO PARA A ROTINA</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Atividades claras, variadas e fáceis de encontrar
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Cada seção trabalha uma habilidade com instruções diretas e uma proposta visual limpa.
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
              DO ARQUIVO PARA A MESA
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Uma sequência simples para começar
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/65">
              Sem preparação complicada. Escolha uma proposta adequada, imprima e acompanhe como a
              criança responde.
            </p>
          </div>
          <ol className="space-y-3">
            {[
              ["01", "Escolha", "Selecione a habilidade que deseja trabalhar."],
              ["02", "Imprima", "Use apenas as páginas necessárias para o dia."],
              ["03", "Aplique e observe", "Dê uma instrução simples e adapte quando preciso."],
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
              <p className="eyebrow">NO KIT COMPLETO</p>
              <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
                Cinco bônus que ampliam as possibilidades
              </h2>
            </div>
            <Gift className="hidden size-16 text-coral/70 md:block" />
          </div>
          <div className="mt-11 grid gap-4 lg:grid-cols-5">
            {bonuses.map(([number, title, text], index) => (
              <article
                key={title}
                className="bonus-card rounded-[1.5rem] bg-white p-5 shadow-sm"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="text-xs font-black tracking-widest text-coral">
                  BÔNUS {number}
                </span>
                <div className="my-5 h-px bg-deep/8" />
                <h3 className="font-bold leading-5 text-deep">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="precos" className="py-18 sm:py-24">
        <div className="section-shell">
          <div className="text-center">
            <p className="eyebrow">ESCOLHA O QUE FAZ SENTIDO PARA VOCÊ</p>
            <h2 className="mt-3 text-3xl font-bold text-deep sm:text-5xl">
              Acesso simples, sem assinatura
            </h2>
          </div>
          <div className="mx-auto mt-11 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            <article className="price-card rounded-[1.75rem] border border-deep/10 bg-white p-7 sm:p-9">
              <p className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                Kit Essencial
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Para começar com o material principal.
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
                ESCOLHER ESSENCIAL
              </a>
            </article>
            <article className="price-card popular relative rounded-[1.75rem] bg-deep p-7 text-white sm:p-9">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral px-4 py-1.5 text-xs font-black shadow-lg">
                CONTEÚDO MAIS COMPLETO
              </span>
              <p className="text-sm font-black uppercase tracking-wider text-accent">
                Kit Completo + Bônus
              </p>
              <p className="mt-3 text-sm text-white/60">
                Para ter mais variedade e apoio na organização.
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
                QUERO O KIT COMPLETO
              </a>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-white/50">
                <LockKeyhole className="size-3.5" /> Pagamento seguro • acesso digital
              </p>
            </article>
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
