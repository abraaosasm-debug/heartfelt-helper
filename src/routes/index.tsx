import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen, Brain, Check, CirclePlay, Clock3, Download,
  FileText, Gift, Heart, MessageCircle, PencilLine, Printer,
  Puzzle, ShieldCheck, Sparkles, Star, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import kitMockup from "@/assets/kit-atividades-mockup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit de Atividades Infantil e Autismo | Pronto para imprimir" },
      { name: "description", content: "Kit educativo em PDF com atividades organizadas para crianças, pronto para baixar e imprimir." },
      { property: "og:title", content: "Kit de Atividades Infantil e Autismo" },
      { property: "og:description", content: "Atividades educativas organizadas e prontas para imprimir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const materials = [
  [FileText, "Kit Principal em PDF"], [BookOpen, "Volume 2 de Atividades"],
  [PencilLine, "Alfabetização Inicial"], [Puzzle, "Coordenação Motora"],
  [Brain, "Números e Raciocínio"], [Heart, "Emoções e Comunicação"],
] as const;

const bonuses = [
  ["01", "Planejamento de 4 Semanas"], ["02", "Rotina Visual para Recortar"],
  ["03", "Jogos de Mesa Imprimíveis"], ["04", "Caderno de Observação da Aprendizagem"],
  ["05", "Atividades para Enviar às Famílias"],
] as const;

const testimonials = [
  ["M", "Comprei ontem e já imprimi. Muito bem organizado!"],
  ["A", "Usei com meu filho e gostei muito das atividades."],
  ["P", "Sou professora e achei bem prático para o dia a dia."],
] as const;

function Cta({ children }: { children: string }) {
  return <Button asChild size="lg" className="h-14 w-full rounded-lg px-6 text-base font-extrabold shadow-lg shadow-primary/20 sm:w-auto"><a href="#precos">{children}</a></Button>;
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div className="bg-deep px-4 py-3 text-center text-sm font-extrabold text-primary-foreground">
        <span className="inline-flex items-center gap-2"><Clock3 className="size-4" /> OFERTA VÁLIDA SOMENTE HOJE! 21/09/2026</span>
      </div>

      <section className="bg-sky-soft py-10 sm:py-16">
        <div className="section-shell grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-extrabold text-accent-foreground"><Sparkles className="size-4" /> MATERIAL DIGITAL EM PDF</div>
            <h1 className="text-4xl font-black leading-[1.08] text-deep sm:text-5xl">Kit de Atividades Infantil e Autismo pronto para imprimir</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground md:mx-0 md:text-lg">Atividades educativas organizadas para estimular alfabetização, coordenação motora, números, percepção visual, emoções, associação e raciocínio de forma simples e prática.</p>
            <div className="mt-7"><Cta>QUERO ACESSAR AGORA</Cta></div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-foreground/70 md:justify-start"><span className="inline-flex items-center gap-1.5"><Download className="size-4 text-success" /> Acesso imediato</span><span className="inline-flex items-center gap-1.5"><Printer className="size-4 text-success" /> Pronto para imprimir</span></div>
          </div>
          <div className="relative"><div className="absolute inset-x-8 bottom-2 h-12 rounded-full bg-primary/20 blur-2xl" /><img src={kitMockup} width={1408} height={1200} alt="Mockup do kit com apostilas e folhas de atividades educativas" className="relative aspect-[7/6] w-full rounded-lg object-cover soft-shadow" /></div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="section-shell text-center">
          <p className="text-sm font-extrabold uppercase text-success">Veja por dentro</p>
          <h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">Assista e veja como o kit pode facilitar sua rotina.</h2>
          <div className="mx-auto mt-8 aspect-[9/16] w-full max-w-[330px] overflow-hidden rounded-[2rem] border-[8px] border-deep bg-deep soft-shadow">
            <div className="relative flex h-full flex-col items-center justify-center bg-sky-soft px-8 text-center">
              <div className="mb-5 grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"><CirclePlay className="size-10" /></div>
              <p className="text-xl font-black text-deep">Conheça o material</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Veja as atividades, os volumes e tudo que você recebe.</p>
              <span className="absolute bottom-4 h-1 w-24 rounded-full bg-deep/40" />
            </div>
          </div>
          <div className="mt-7"><Cta>QUERO RECEBER O MATERIAL</Cta></div>
        </div>
      </section>

      <section className="bg-mint-soft py-14 sm:py-20">
        <div className="section-shell"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-extrabold uppercase text-success">Conteúdo completo</p><h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">O que você recebe</h2><p className="mt-3 text-muted-foreground">Materiais organizados para apoiar uma rotina de aprendizagem mais prática.</p></div>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">{materials.map(([Icon, label]) => <article key={label} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm sm:p-6"><div className="mx-auto grid size-11 place-items-center rounded-lg bg-sky-soft text-deep"><Icon className="size-5" /></div><h3 className="mt-4 text-sm font-extrabold leading-5 sm:text-base">{label}</h3></article>)}</div>
        </div>
      </section>

      <section className="py-14 sm:py-20"><div className="section-shell"><div className="text-center"><div className="inline-flex items-center gap-2 rounded-full bg-sun-soft px-3 py-1.5 text-xs font-extrabold"><Gift className="size-4" /> BÔNUS INCLUSOS NO KIT COMPLETO</div><h2 className="mt-3 text-3xl font-black text-deep sm:text-4xl">Mais recursos para o dia a dia</h2></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{bonuses.map(([number, title]) => <article key={title} className="flex min-h-40 flex-col rounded-lg border border-border bg-card p-5 shadow-sm"><span className="text-xs font-black text-success">BÔNUS {number}</span><BookOpen className="mt-5 size-8 text-deep" /><h3 className="mt-auto pt-5 font-extrabold leading-5">{title}</h3></article>)}</div>
      </div></section>

      <section id="precos" className="bg-sky-soft py-14 sm:py-20"><div className="section-shell"><div className="text-center"><p className="text-sm font-extrabold uppercase text-success">Escolha seu kit</p><h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">Comece agora mesmo</h2></div>
        <div className="mx-auto mt-9 grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8"><p className="font-extrabold text-muted-foreground">Kit Essencial</p><div className="mt-3 flex items-end gap-1"><span className="pb-1 text-lg font-bold">R$</span><strong className="text-5xl font-black text-deep">10,00</strong></div><ul className="mt-6 space-y-3 text-sm">{["Kit principal em PDF", "Acesso imediato", "Pronto para imprimir"].map(item => <li key={item} className="flex gap-2"><Check className="size-5 shrink-0 text-success" />{item}</li>)}</ul></article>
          <article className="relative rounded-lg border-2 border-primary bg-card p-6 shadow-xl shadow-primary/15 sm:p-8"><span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-black text-primary-foreground">MAIS VENDIDO</span><p className="font-extrabold text-success">Kit Completo + Bônus</p><div className="mt-3 flex items-end gap-1"><span className="pb-1 text-lg font-bold">R$</span><strong className="text-5xl font-black text-deep">59,90</strong></div><ul className="mt-6 space-y-3 text-sm">{["Kit principal completo", "Volume 2", "Todos os 5 bônus", "Acesso imediato", "Material pronto para imprimir"].map(item => <li key={item} className="flex gap-2"><Check className="size-5 shrink-0 text-success" />{item}</li>)}</ul><Button className="mt-7 h-14 w-full rounded-lg text-base font-extrabold">QUERO O KIT COMPLETO</Button></article>
        </div>
      </div></section>

      <section className="py-14 sm:py-20"><div className="section-shell"><div className="text-center"><p className="text-sm font-extrabold uppercase text-success">Experiências reais</p><h2 className="mt-2 text-3xl font-black text-deep">Quem comprou, aprovou</h2></div><div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">{testimonials.map(([initial, text]) => <article key={text} className="rounded-lg border border-border bg-card p-5 shadow-sm"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary font-black text-primary-foreground">{initial}</span><div><strong className="text-sm">Cliente verificada</strong><div className="flex text-accent-foreground">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-3.5 fill-current" />)}</div></div><MessageCircle className="ml-auto size-5 text-success" /></div><p className="mt-4 text-sm leading-6">“{text}”</p></article>)}</div></div></section>

      <section className="bg-mint-soft py-10"><div className="section-shell"><div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:flex-row sm:text-left"><div className="grid size-16 shrink-0 place-items-center rounded-full bg-card text-success shadow-sm"><ShieldCheck className="size-9" /></div><div><h2 className="text-xl font-black text-deep">Compra protegida por 7 dias</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">7 dias de garantia incondicional. Se não gostar, você pode pedir reembolso dentro do prazo.</p></div></div></div></section>

      <section className="bg-deep py-14 text-center text-primary-foreground sm:py-20"><div className="section-shell"><Users className="mx-auto size-9 text-accent" /><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-4xl">Comece hoje com atividades prontas, organizadas e fáceis de aplicar.</h2><div className="mt-7"><Cta>QUERO MEU ACESSO AGORA</Cta></div><p className="mx-auto mt-8 max-w-2xl text-xs leading-5 text-primary-foreground/70">Este material tem finalidade educativa e não substitui acompanhamento profissional, terapias ou avaliações individualizadas.</p></div></section>
      <footer className="border-t border-border bg-background px-4 py-6 text-center text-xs text-muted-foreground">© 2026 Kit de Atividades Infantil e Autismo. Material digital educativo.</footer>
    </main>
  );
}
