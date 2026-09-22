import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen, Brain, Check, CirclePlay, Clock3, Download,
  FileText, Gift, Heart, MessageCircle, PencilLine, Printer,
  Puzzle, ShieldCheck, Sparkles, Star, Users, LockKeyhole, Play,
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
  return <Button asChild size="lg" className="cta-shimmer h-15 w-full rounded-2xl bg-coral px-7 text-base font-black shadow-xl shadow-coral/25 transition-transform hover:scale-[1.02] hover:bg-coral/90 active:scale-[0.98] sm:w-auto"><a href="#precos">{children}</a></Button>;
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div className="bg-coral px-4 py-3 text-center text-xs font-black text-primary-foreground sm:text-sm">
        <span className="inline-flex items-center gap-2"><span className="size-2 animate-pulse rounded-full bg-primary-foreground" /> OFERTA VÁLIDA SOMENTE HOJE! 21/09/2026</span>
      </div>

      <section className="relative bg-sky-soft py-10 sm:py-16">
        <div className="absolute left-0 top-20 h-40 w-40 rounded-full bg-lilac-soft/80 blur-3xl" /><div className="absolute bottom-8 right-0 h-48 w-48 rounded-full bg-sun-soft/80 blur-3xl" />
        <div className="section-shell relative grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="reveal-up text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-xs font-black text-deep shadow-sm backdrop-blur"><Sparkles className="size-4 text-coral" /> MATERIAL INCLUSIVO E PEDAGÓGICO</div>
            <h1 className="text-4xl font-bold leading-[1.06] text-deep sm:text-5xl">Kit de Atividades <span className="text-coral">Infantil e Autismo</span> pronto para imprimir</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground md:mx-0 md:text-lg">Atividades educativas organizadas para estimular alfabetização, coordenação motora, números, percepção visual, emoções, associação e raciocínio de forma simples e prática.</p>
            <div className="mt-7"><Cta>QUERO ACESSAR AGORA</Cta></div>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-foreground/65 md:justify-start"><span className="inline-flex items-center gap-1.5"><Download className="size-4 text-success" /> ACESSO IMEDIATO</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-success" /> 7 DIAS DE GARANTIA</span></div>
          </div>
          <div className="float-soft relative mx-auto w-full max-w-xl"><div className="absolute -inset-3 rounded-[2rem] bg-card/50 blur-xl" /><div className="relative rotate-1 rounded-[1.75rem] border border-card/80 bg-card/70 p-2 soft-shadow backdrop-blur"><img src={kitMockup} width={1408} height={1200} alt="Mockup do kit com apostilas e folhas de atividades educativas" className="aspect-[7/6] w-full rounded-[1.3rem] object-cover" /><span className="absolute -bottom-3 right-3 rotate-[-4deg] rounded-xl bg-accent px-4 py-2 text-xs font-black text-accent-foreground shadow-lg">PDF PRONTO PARA IMPRIMIR</span></div></div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="section-shell text-center">
          <p className="text-sm font-extrabold uppercase text-success">Veja por dentro</p>
          <h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">Assista e veja como o kit pode facilitar sua rotina.</h2>
          <div className="mx-auto mt-8 aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border-[9px] border-deep bg-deep soft-shadow">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-mint-soft px-8 text-center">
              <img src={kitMockup} loading="lazy" width={1408} height={1200} alt="Prévia das folhas educativas do kit" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-deep/20" /><div className="relative grid size-20 place-items-center rounded-full bg-card/85 text-coral shadow-xl backdrop-blur transition-transform hover:scale-110"><Play className="ml-1 size-9 fill-current" /></div>
              <p className="relative mt-5 text-xl font-black text-deep">Conheça o material</p><p className="relative mt-2 text-sm font-semibold leading-6 text-deep/75">Veja as atividades, os volumes e tudo que você recebe.</p>
              <span className="absolute bottom-4 h-1 w-24 rounded-full bg-deep/40" />
            </div>
          </div>
          <div className="mt-7"><Cta>QUERO RECEBER O MATERIAL</Cta></div>
        </div>
      </section>

      <section className="bg-mint-soft py-14 sm:py-20">
        <div className="section-shell"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-extrabold uppercase text-success">Conteúdo completo</p><h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">O que você recebe</h2><p className="mt-3 text-muted-foreground">Materiais organizados para apoiar uma rotina de aprendizagem mais prática.</p></div>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">{materials.map(([Icon, label], index) => <article key={label} className="glass-panel rounded-2xl p-4 text-center transition-transform duration-300 hover:-translate-y-1 sm:p-6" style={{ animationDelay: `${index * 70}ms` }}><div className="mx-auto grid size-12 place-items-center rounded-xl bg-sky-soft text-deep shadow-sm"><Icon className="size-5" /></div><h3 className="mt-4 text-sm font-extrabold leading-5 sm:text-base">{label}</h3></article>)}</div>
        </div>
      </section>

      <section className="py-14 sm:py-20"><div className="section-shell"><div className="text-center"><div className="inline-flex items-center gap-2 rounded-full bg-sun-soft px-3 py-1.5 text-xs font-extrabold"><Gift className="size-4" /> BÔNUS INCLUSOS NO KIT COMPLETO</div><h2 className="mt-3 text-3xl font-black text-deep sm:text-4xl">Mais recursos para o dia a dia</h2></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{bonuses.map(([number, title], index) => <article key={title} className={`flex min-h-44 flex-col rounded-2xl border border-border bg-card p-5 soft-shadow transition-all duration-300 hover:-translate-y-1 hover:rotate-0 ${index % 2 ? "rotate-1" : "-rotate-1"}`}><span className="text-xs font-black text-coral">BÔNUS {number}</span><div className="mt-5 grid size-11 place-items-center rounded-xl bg-lilac-soft"><BookOpen className="size-6 text-deep" /></div><h3 className="mt-auto pt-5 font-extrabold leading-5">{title}</h3></article>)}</div>
      </div></section>

      <section id="precos" className="bg-sky-soft py-14 sm:py-20"><div className="section-shell"><div className="text-center"><p className="text-sm font-extrabold uppercase text-success">Escolha seu kit</p><h2 className="mt-2 text-3xl font-black text-deep sm:text-4xl">Comece agora mesmo</h2></div>
        <div className="mx-auto mt-9 grid max-w-4xl items-stretch gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8"><p className="font-extrabold text-muted-foreground">Kit Essencial</p><div className="mt-3 flex items-end gap-1"><span className="pb-1 text-lg font-bold">R$</span><strong className="text-5xl font-black text-deep">10,00</strong></div><ul className="mt-6 space-y-3 text-sm">{["Kit principal em PDF", "Acesso imediato", "Pronto para imprimir"].map(item => <li key={item} className="flex gap-2"><Check className="size-5 shrink-0 text-success" />{item}</li>)}</ul></article>
          <article className="relative rounded-2xl border-2 border-coral bg-card p-6 shadow-2xl shadow-coral/15 sm:p-8"><span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1.5 text-xs font-black text-primary-foreground shadow-lg">MAIS VENDIDO</span><p className="font-extrabold text-coral">Kit Completo + Bônus</p><div className="mt-3 flex items-end gap-1"><span className="pb-1 text-lg font-bold">R$</span><strong className="text-5xl font-black text-deep">59,90</strong></div><ul className="mt-6 space-y-3 text-sm">{["Kit principal completo", "Volume 2", "Todos os 5 bônus", "Acesso imediato", "Material pronto para imprimir"].map(item => <li key={item} className="flex gap-2"><Check className="size-5 shrink-0 text-success" />{item}</li>)}</ul><Button className="cta-shimmer mt-7 h-14 w-full rounded-xl bg-coral text-base font-black shadow-lg shadow-coral/20 hover:bg-coral/90">QUERO O KIT COMPLETO</Button><p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground"><LockKeyhole className="size-3.5" /> Compra segura</p></article>
        </div>
      </div></section>

      <section className="py-14 sm:py-20"><div className="section-shell"><div className="text-center"><p className="text-sm font-extrabold uppercase text-success">O que dizem</p><h2 className="mt-2 text-3xl font-black text-deep">Mensagens de quem comprou</h2></div><div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">{testimonials.map(([initial, text]) => <article key={text} className="rounded-2xl border border-border bg-mint-soft p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary font-black text-primary-foreground">{initial}</span><div><strong className="text-sm">Mensagem recebida</strong><div className="flex text-accent-foreground">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-3.5 fill-current" />)}</div></div><MessageCircle className="ml-auto size-5 text-success" /></div><div className="mt-4 rounded-xl rounded-tl-sm bg-card p-3 shadow-sm"><p className="text-sm leading-6">{text}</p></div></article>)}</div></div></section>

      <section className="bg-mint-soft py-10"><div className="section-shell"><div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:flex-row sm:text-left"><div className="grid size-16 shrink-0 place-items-center rounded-full bg-card text-success shadow-sm"><ShieldCheck className="size-9" /></div><div><h2 className="text-xl font-black text-deep">Compra protegida por 7 dias</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">7 dias de garantia incondicional. Se não gostar, você pode pedir reembolso dentro do prazo.</p></div></div></div></section>

      <section className="bg-deep py-14 text-center text-primary-foreground sm:py-20"><div className="section-shell"><Users className="mx-auto size-9 text-accent" /><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black sm:text-4xl">Comece hoje com atividades prontas, organizadas e fáceis de aplicar.</h2><div className="mt-7"><Cta>QUERO MEU ACESSO AGORA</Cta></div><p className="mx-auto mt-8 max-w-2xl text-xs leading-5 text-primary-foreground/70">Este material tem finalidade educativa e não substitui acompanhamento profissional, terapias ou avaliações individualizadas.</p></div></section>
      <footer className="border-t border-border bg-background px-4 py-6 text-center text-xs text-muted-foreground">© 2026 Kit de Atividades Infantil e Autismo. Material digital educativo.</footer>
    </main>
  );
}
