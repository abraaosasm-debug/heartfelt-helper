import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const vslPath = resolve(root, "src/routes/index.tsx");
const indexPath = resolve(root, "src/routes/oferta.tsx");
const checkoutPath = resolve(root, "src/lib/checkout.ts");
const dialogPath = resolve(root, "src/components/ui/dialog.tsx");
const cssPath = resolve(root, "src/styles.css");
const vsl = readFileSync(vslPath, "utf8");
const index = readFileSync(indexPath, "utf8");
const checkout = readFileSync(checkoutPath, "utf8");
const dialog = readFileSync(dialogPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const errors = [];

for (const vslMarker of [
  'createFileRoute("/")',
  "VSL_VIDEO_SRC",
  "/vsl/kit-atividades-vsl.mp4",
  "Pare de criar atividades do zero toda vez que precisar.",
  "CONHECER O KIT COMPLETO",
  "VSLStarted",
  "VSLCompleted",
  "VSLToOffer",
  'new URL("/oferta", window.location.origin)',
  '"utm_campaign"',
  '"fbclid"',
]) {
  if (!vsl.includes(vslMarker)) {
    errors.push(`Página VSL incompleta: ${vslMarker}`);
  }
}

if (!css.includes("V6.0 — VSL ENTRY PAGE")) {
  errors.push("Camada V6.0 da página VSL ausente.");
}

if (!css.includes("V6.1 — MOBILE VSL CONVERSION PASS")) {
  errors.push("Camada V6.1 de otimização mobile da VSL ausente.");
}

if (!css.includes("V6.2 — VSL VIDEO VISIBILITY FIX")) {
  errors.push("Camada V6.2 de visibilidade do vídeo da VSL ausente.");
}

if (/setTimeout\s*\(/.test(vsl)) {
  errors.push("A VSL não deve liberar fallback ou oferta por timeout.");
}

if (/const handleVideoError[\s\S]*?setShowOffer\(true\)/.test(vsl)) {
  errors.push("Erro de vídeo não deve liberar automaticamente a oferta.");
}

if (!/const handleEnded = \(\) => \{[\s\S]*?setShowOffer\(true\);/.test(vsl)) {
  errors.push("CTA da VSL precisa ser liberado pelo evento ended.");
}

const vslVisibilityLayer = css.slice(css.indexOf("V6.2 — VSL VIDEO VISIBILITY FIX"));

if (!/\.vsl-video\s*\{[^}]*opacity:\s*1;/s.test(vslVisibilityLayer)) {
  errors.push("Camada V6.2 precisa manter o vídeo visível por padrão.");
}

if (
  !/data-state="fallback"[^}]*\.vsl-video|\[data-state="fallback"\][^{]*\.vsl-video/s.test(
    vslVisibilityLayer,
  )
) {
  errors.push("Estado de fallback da VSL precisa continuar isolado do estado padrão.");
}

for (const refinedVslMarker of [
  "ASSISTA À APRESENTAÇÃO",
  "492 páginas organizadas",
  "onLoadedData={handleVideoReady}",
  "onPlaying={handlePlaying}",
  'videoState === "fallback"',
  "3 volumes + 5 bônus",
]) {
  if (!vsl.includes(refinedVslMarker)) {
    errors.push(`Refinamento da VSL ausente: ${refinedVslMarker}`);
  }
}

if (vsl.includes("Sem promessa milagrosa")) {
  errors.push('Texto defensivo "Sem promessa milagrosa" não deve voltar à VSL.');
}

for (const funnelLanguage of [
  "Veja o material por dentro antes de conhecer a oferta.",
  "A oferta completa será liberada ao final da apresentação.",
  "AGORA VEJA A COLEÇÃO COMPLETA",
]) {
  if (vsl.includes(funnelLanguage)) {
    errors.push(`Linguagem antiga de funil não deve voltar à VSL: ${funnelLanguage}`);
  }
}

if (vsl.includes("Pare de começar do zero toda vez que precisar de uma atividade.")) {
  errors.push("Headline longa anterior não deve voltar à VSL.");
}

if (!css.includes("V6.3 — VSL COMPLETION POLISH")) {
  errors.push("Camada V6.3 de acabamento final da VSL ausente.");
}

if (!css.includes("V6.4 — COMPACT MOBILE VSL PLAYER")) {
  errors.push("Camada V6.4 de compactação do player mobile ausente.");
}

if (!css.includes("V6.5 — PRE-PLAY THUMBNAIL")) {
  errors.push("Camada V6.5 da thumbnail de pré-play ausente.");
}

if (!css.includes("V7.0 — VSL PRODUCT SHOWROOM")) {
  errors.push("Camada V7.0 do showroom da VSL ausente.");
}

if (!css.includes("V7.1 — MOBILE DENSITY PASS")) {
  errors.push("Camada V7.1 de densidade mobile da landing ausente.");
}

if (!css.includes("V7.2 — MOBILE HERO ART SAFE FRAME")) {
  errors.push("Camada V7.2 de enquadramento seguro das capas ausente.");
}

if (!css.includes("V7.3 — VSL MOBILE PERFORMANCE")) {
  errors.push("Camada V7.3 de performance mobile da VSL ausente.");
}

for (const vslPerformanceMarker of [
  'preload="metadata"',
  'kit-atividades-vsl.mp4?v=2',
  "lastProgressRef",
  "handlePlaying",
  "Math.floor((video.currentTime / video.duration) * 100)",
]) {
  if (!vsl.includes(vslPerformanceMarker)) {
    errors.push(`Otimização de performance da VSL incompleta: ${vslPerformanceMarker}`);
  }
}

if (vsl.includes('preload="auto"')) {
  errors.push("A VSL não deve voltar a pré-carregar o vídeo inteiro automaticamente.");
}

if (vsl.includes('poster="/covers/1_v3.jpg')) {
  errors.push("A VSL não deve carregar a capa JPG pesada como poster do vídeo.");
}

for (const mobileGpuMarker of [
  "content-visibility: auto;",
  "-webkit-backdrop-filter: none;",
  "contain: layout paint;",
]) {
  if (!css.includes(mobileGpuMarker)) {
    errors.push(`Otimização de GPU mobile ausente: ${mobileGpuMarker}`);
  }
}

for (const safeFrameMarker of [
  "height: 330px;",
  "aspect-ratio: 1080 / 1528;",
  "width: 40%;",
  "top: 24px;",
  "height: 312px;",
]) {
  if (!css.includes(safeFrameMarker)) {
    errors.push(`Enquadramento seguro das capas incompleto: ${safeFrameMarker}`);
  }
}

for (const heroFitMarker of ["width: 43%;", "top: 28px;", "left: 28.5%;", "min-height: 278px;"]) {
  if (!css.includes(heroFitMarker)) {
    errors.push(`Enquadramento mobile das capas incompleto: ${heroFitMarker}`);
  }
}

for (const mobileDensityMarker of [
  "font-size: clamp(2.2rem, 10.6vw, 2.9rem);",
  "font-size: 0.78em;",
  "min-height: 296px;",
  "min-height: 52px;",
]) {
  if (!css.includes(mobileDensityMarker)) {
    errors.push(`Ajuste de densidade mobile incompleto: ${mobileDensityMarker}`);
  }
}

for (const showroomMarker of [
  "vsl-showcase",
  "vsl-showcase-head",
  "vsl-showcase-kicker",
  "Veja o material por dentro antes de decidir.",
  "Em 1min44s, veja páginas reais e entenda como a coleção funciona.",
]) {
  if (!vsl.includes(showroomMarker)) {
    errors.push(`Showroom da VSL incompleto: ${showroomMarker}`);
  }
}

for (const preplayMarker of [
  "vsl-preplay",
  "vsl-preplay-covers",
  "vsl-preplay-button",
  "Assista à apresentação",
  "1min44s • veja o kit por dentro",
  "void video.play()",
]) {
  if (!vsl.includes(preplayMarker)) {
    errors.push(`Thumbnail de pré-play incompleta: ${preplayMarker}`);
  }
}

for (const replayMarker of [
  "showPreplay",
  "setShowPreplay(false)",
  "setShowPreplay(true)",
  "setCompleted(true)",
  "Assistir novamente",
  "Rever apresentação • 1min44s",
]) {
  if (!vsl.includes(replayMarker)) {
    errors.push(`Comportamento pós-VSL incompleto: ${replayMarker}`);
  }
}

if (!vsl.includes('showPreplay && videoState !== "fallback"')) {
  errors.push("Thumbnail da VSL precisa controlar pré-play e replay.");
}

if (!css.includes("width: min(84vw, 340px);")) {
  errors.push("Player mobile da VSL precisa manter largura compactada.");
}

for (const completionMarker of [
  "Vídeo curto • 1min44s",
  "vsl-video-progress",
  "vsl-gate-locked",
  "Ao final da apresentação, você poderá ver tudo o que está incluído no Kit",
  "LockKeyhole",
]) {
  if (!vsl.includes(completionMarker)) {
    errors.push(`Acabamento final da VSL ausente: ${completionMarker}`);
  }
}

if (
  !/\.vsl-player-frame\s*\{[^}]*aspect-ratio:\s*720\s*\/\s*1560;/s.test(
    css.slice(css.indexOf("V6.3 — VSL COMPLETION POLISH")),
  )
) {
  errors.push("Player mobile da VSL precisa respeitar a proporção vertical real do vídeo.");
}

if (!index.includes('createFileRoute("/oferta")')) {
  errors.push("Landing principal precisa permanecer disponível em /oferta.");
}

if (!index.includes('href: "https://kitcompletoautismoeinfantil.lovable.app/oferta"')) {
  errors.push("Canonical da landing /oferta está divergente.");
}

const requiredIds = ["inicio", "como-usar", "conteudo", "bonus", "precos", "duvidas"];
for (const id of requiredIds) {
  if (!index.includes(`id="${id}"`)) {
    errors.push(`Seção obrigatória ausente: #${id}`);
  }
}

const originalCovers = [
  "public/covers/Imagens_1.jpg",
  "public/covers/Imagens_2.jpg",
  "public/covers/Planejamento_de_4_Semanas_Completo_260921_141949.jpg",
  "public/covers/Rotina_Visual_para_Recortar_Completo_260921_141935.jpg",
  "public/covers/Jogos_de_Mesa_Imprimiveis_03_Completo_260921_142019.jpg",
  "public/covers/Caderno_de_Observacao_da_Aprendizagem_04_Completo_260921_142033.jpg",
  "public/covers/Atividades_para_Enviar_as_Familias_05_Completo_260921_142043.jpg",
  "public/covers/1_v3.jpg",
];

for (const path of originalCovers) {
  if (!existsSync(resolve(root, path))) {
    errors.push(`Capa original ausente: ${path}`);
  }
}

for (let number = 1; number <= 7; number += 1) {
  const relative = `public/covers/optimized/cover-${number}.webp`;
  const absolute = resolve(root, relative);

  if (!existsSync(absolute)) {
    errors.push(`Preview WebP ausente: ${relative}`);
    continue;
  }

  const size = statSync(absolute).size;
  if (size > 200 * 1024) {
    errors.push(`Preview WebP acima de 200 KB: ${relative} (${Math.round(size / 1024)} KB)`);
  }
}

const selectedPreviews = Array.from(
  { length: 6 },
  (_, index) => `public/previews/selected/kit1-selected-${index + 1}.jpg`,
);

for (const relative of selectedPreviews) {
  const absolute = resolve(root, relative);
  const publicPath = `/${relative.replace("public/", "")}`;

  if (!existsSync(absolute)) {
    errors.push(`Página real ausente: ${relative}`);
    continue;
  }

  const size = statSync(absolute).size;
  if (size < 100 * 1024) {
    errors.push(`Página real suspeitamente pequena: ${relative} (${Math.round(size / 1024)} KB)`);
  }
  if (size > 2 * 1024 * 1024) {
    errors.push(`Página real acima de 2 MB: ${relative} (${Math.round(size / 1024)} KB)`);
  }
  if (!index.includes(publicPath)) {
    errors.push(`Página real não referenciada na landing: ${publicPath}`);
  }
}

const volume2Previews = Array.from(
  { length: 6 },
  (_, index) => `public/previews/selected/${index + 1}.jpg`,
);

for (const relative of volume2Previews) {
  const absolute = resolve(root, relative);
  const publicPath = `/${relative.replace("public/", "")}`;

  if (!existsSync(absolute)) {
    errors.push(`Página real do Volume 2 ausente: ${relative}`);
    continue;
  }

  const size = statSync(absolute).size;
  if (size < 100 * 1024) {
    errors.push(
      `Página real do Volume 2 suspeitamente pequena: ${relative} (${Math.round(size / 1024)} KB)`,
    );
  }
  if (size > 2 * 1024 * 1024) {
    errors.push(
      `Página real do Volume 2 acima de 2 MB: ${relative} (${Math.round(size / 1024)} KB)`,
    );
  }
  if (!index.includes(publicPath)) {
    errors.push(`Página real do Volume 2 não referenciada na landing: ${publicPath}`);
  }
}

const volume3Previews = Array.from(
  { length: 5 },
  (_, index) => `public/previews/${index + 2}_v3.jpg`,
);

for (const relative of volume3Previews) {
  const absolute = resolve(root, relative);
  const publicPath = `/${relative.replace("public/", "")}`;

  if (!existsSync(absolute)) {
    errors.push(`Página interna real do Volume 3 ausente: ${relative}`);
    continue;
  }

  const size = statSync(absolute).size;
  if (size < 100 * 1024) {
    errors.push(
      `Página interna do Volume 3 suspeitamente pequena: ${relative} (${Math.round(size / 1024)} KB)`,
    );
  }
  if (size > 2 * 1024 * 1024) {
    errors.push(
      `Página interna do Volume 3 acima de 2 MB: ${relative} (${Math.round(size / 1024)} KB)`,
    );
  }
  if (!index.includes(publicPath)) {
    errors.push(`Página interna do Volume 3 não referenciada na landing: ${publicPath}`);
  }
}

if (index.includes("/previews/1_v3.jpg")) {
  errors.push("A capa duplicada do Volume 3 não deve ser apresentada como página interna.");
}

for (let number = 1; number <= 6; number += 1) {
  const legacy = `public/previews/KIT_ATIVIDADES_INFANTIL_AUTISMO_COMPLETO_260921_141803 (${number}).jpg`;
  if (existsSync(resolve(root, legacy))) {
    errors.push(`Preview duplicado legado encontrado: ${legacy}`);
  }
}

if (index.includes("/previews/kit1-amostras.webp")) {
  errors.push("Referência ao sprite comprimido legado encontrada.");
}

if (!dialog.includes("z-[100]") || !dialog.includes("z-[110]")) {
  errors.push("Camadas dos modais não estão acima da barra fixa de compra.");
}

if (!/\.v3-page a\.v3-button\s*\{[^}]*color:\s*var\(--v3-ink\);[^}]*\}/s.test(css)) {
  errors.push("Cor explícita dos CTAs principais não encontrada.");
}

if (!/\.v3-page a\.v3-button-dark\s*\{[^}]*color:\s*white;[^}]*\}/s.test(css)) {
  errors.push("Cor branca explícita do CTA escuro não encontrada.");
}

if (
  !/checkoutUrls\.complete\}\s+dark>[\s\S]*QUERO TER AS ATIVIDADES PRONTAS[\s\S]*<\/PrimaryButton>/.test(
    index,
  )
) {
  errors.push("CTA final precisa usar explicitamente a variante escura e a promessa principal.");
}

for (const number of [3, 4, 5, 6, 7]) {
  if (index.includes(`/covers/Imagens_${number}.jpg`)) {
    errors.push(`Referência legada encontrada: Imagens_${number}.jpg`);
  }
}

if (index.includes('decoding="sync"')) {
  errors.push('Imagem com decoding="sync" encontrada na landing page.');
}

const checkoutMatches = [...checkout.matchAll(/(?:essential|complete):\s*"([^"]+)"/g)];
for (const [, url] of checkoutMatches) {
  if (!url.startsWith("https://")) {
    errors.push(`Checkout deve usar HTTPS: ${url}`);
  }
}

const canonicalCheckouts = {
  essential: "https://pay.cakto.com.br/4aafyxo_1130411",
  complete: "https://pay.cakto.com.br/5q3o7zo_1130394",
};

for (const [offer, url] of Object.entries(canonicalCheckouts)) {
  if (!checkout.includes(`${offer}: "${url}"`)) {
    errors.push(`Checkout canônico divergente para ${offer}: ${url}`);
  }
}

if (!index.includes("v43-essential-downsell") || !index.includes("R$10,00")) {
  errors.push("Kit Essencial deve permanecer disponível como opção menor por R$10,00.");
}

if (!index.includes("<strong>39</strong>") || !index.includes("<small>,90</small>")) {
  errors.push("Preço visual atual do Kit Completo deve ser R$39,90.");
}

if (!index.includes('<div className="v40-price-anchor">') || !index.includes("<s>R$59,90</s>")) {
  errors.push("Preço normal riscado de R$59,90 precisa aparecer na oferta promocional.");
}

if (!index.includes("Você economiza R$20,00")) {
  errors.push("Economia de R$20,00 precisa aparecer no card do Kit Completo.");
}

for (const obsoletePositioning of [
  "Comparar com o Essencial",
  "ALÉM DO ESSENCIAL",
  "Por R$29,90 além do Essencial",
  "Quer começar ou quer levar o pacote completo?",
]) {
  if (index.includes(obsoletePositioning)) {
    errors.push(
      `Posicionamento antigo do Essencial voltou para a rota principal: ${obsoletePositioning}`,
    );
  }
}

for (const completeFocusMarker of [
  "ATIVIDADES PRONTAS • 3 VOLUMES + 5 BÔNUS",
  "Tenha atividades prontas para escolher, imprimir e usar.",
  "Sem precisar criar tudo do zero.",
  "Ver tudo o que vem no Kit Completo",
  "v43-pricing-focus",
  "OFERTA PRINCIPAL",
  "Tenha sua coleção de atividades pronta por R$39,90.",
]) {
  if (!index.includes(completeFocusMarker)) {
    errors.push(`Foco do Kit Completo ausente: ${completeFocusMarker}`);
  }
}

if (index.includes("R$79,90")) {
  errors.push("Preço de referência não histórico R$79,90 não deve ser usado.");
}

if (!index.includes("href={checkoutUrls.essential}")) {
  errors.push("CTA do Kit Essencial não está ligado ao checkout canônico.");
}

if (!index.includes("href={checkoutUrls.complete}")) {
  errors.push("CTA do Kit Completo não está ligado ao checkout canônico.");
}

if (index.includes("OfferCountdown")) {
  errors.push("Contador de urgência artificial não deve voltar para a landing.");
}

if (index.includes("R$49,90 a mais")) {
  errors.push("Comparação de preço regressiva encontrada no Kit Completo.");
}

for (const requiredConversionMarker of [
  "v46-compact-preview-section",
  "v46-checkout-note",
  "attributionKeys",
  '"utm_campaign"',
  '"fbclid"',
]) {
  if (!index.includes(requiredConversionMarker)) {
    errors.push(`Otimização de conversão ausente: ${requiredConversionMarker}`);
  }
}

if (!css.includes("V3.8 — CONVERSION CLARITY + TRUST + VALUE PROOF")) {
  errors.push("Camada de estilos V3.8 ausente.");
}

for (const requiredVolume2Marker of [
  "previewPagesVolume2",
  "PÁGINAS REAIS • 3 VOLUMES",
  "v46-compact-preview-section",
  "QUERO TER AS ATIVIDADES PRONTAS",
]) {
  if (!index.includes(requiredVolume2Marker)) {
    errors.push(`Prova do Volume 2 ausente: ${requiredVolume2Marker}`);
  }
}

if (!css.includes("V3.9 — REAL VOLUME 2 PREVIEWS")) {
  errors.push("Camada de estilos V3.9 ausente.");
}

for (const launchOfferMarker of [
  "v40-price-anchor",
  "v40-promo-price",
  "v40-final-offer",
  "v41-offer-strip",
  "v41-hero-offer",
  "v41-price-promo-headline",
  "v41-mobile-price",
  "R$39,90",
  "OFERTA DE LANÇAMENTO",
  "ECONOMIZE R$20",
]) {
  if (!index.includes(launchOfferMarker)) {
    errors.push(`Oferta promocional ausente: ${launchOfferMarker}`);
  }
}

if (!css.includes("V4.0 — LAUNCH PRICE PRESENTATION")) {
  errors.push("Camada de estilos V4.0 ausente.");
}

if (!css.includes("V4.1 — PROMOTION CLARITY")) {
  errors.push("Camada de estilos V4.1 ausente.");
}

if (!css.includes("V4.3 — COMPLETE OFFER FOCUS")) {
  errors.push("Camada de estilos V4.3 para foco no Kit Completo ausente.");
}

if (!css.includes("V4.4 — BONUS VALUE + COLLAPSED DOWNSELL")) {
  errors.push("Camada V4.4 de valor dos bônus e downsell recolhido ausente.");
}

if (!css.includes("V4.5 — VOLUME 3 INTEGRATION")) {
  errors.push("Camada V4.5 de integração visual do Volume 3 ausente.");
}

if (!css.includes("V4.6 — COMPACT SALES FUNNEL")) {
  errors.push("Camada V4.6 de compactação do funil ausente.");
}

if (!css.includes("V4.7 — MOBILE HERO CONVERSION PASS")) {
  errors.push("Camada V4.7 de otimização mobile do hero ausente.");
}

if (!css.includes("V4.8 — REFINED COLOR SYSTEM")) {
  errors.push("Camada V4.8 de refinamento cromático ausente.");
}

if (!css.includes("V4.9 — EDUCATIONAL STATIONERY BRAND SYSTEM")) {
  errors.push("Camada V4.9 de identidade educacional ausente.");
}

if (!css.includes("V5.0 — REALISTIC MOTION SYSTEM")) {
  errors.push("Camada V5.0 de motion design otimizado ausente.");
}

if (!css.includes("V5.1 — 30 DAY GUARANTEE SEAL")) {
  errors.push("Camada V5.1 do selo de garantia de 30 dias ausente.");
}

for (const guaranteeMarker of [
  "garantia de 30 dias",
  "GARANTIA DE 30 DIAS",
  "<strong>30</strong>",
]) {
  if (!index.includes(guaranteeMarker)) {
    errors.push(`Garantia de 30 dias incompleta: ${guaranteeMarker}`);
  }
}

if (/garantia de 7 dias|Garantia de 7 dias|GARANTIA DE 7 DIAS|7 dias de garantia/.test(index)) {
  errors.push("Referência antiga à garantia de 7 dias ainda presente.");
}

for (const motionMarker of [
  "--v50-left-x",
  "v50-cover-settle",
  "v50-buybar-enter",
  'classList.toggle("is-scrolled"',
]) {
  const source = motionMarker.startsWith("classList") ? index : css;
  if (!source.includes(motionMarker)) {
    errors.push(`Motion design incompleto: ${motionMarker}`);
  }
}

if (!index.includes('className="v47-preview-summary-new"')) {
  errors.push("Volume 3 precisa permanecer destacado primeiro na prova compacta.");
}

if (index.includes("R$0,08 por página")) {
  errors.push("Argumento de preço por página não deve voltar para a oferta principal.");
}

for (const promiseMarker of [
  "Tenha atividades prontas para escolher, imprimir e usar.",
  "Sem precisar criar tudo do zero.",
  "Pare de começar do zero toda vez que precisar de uma atividade.",
  "Abra, escolha, imprima e use",
  "comece escolhendo — não criando.",
]) {
  if (!index.includes(promiseMarker)) {
    errors.push(`Promessa principal enfraquecida ou ausente: ${promiseMarker}`);
  }
}

if (index.includes("492 páginas de atividades e materiais")) {
  errors.push("A headline não deve voltar a vender quantidade antes da promessa.");
}

for (const removedLongSection of ["v38-upgrade-section", "v38-purchase-section"]) {
  if (index.includes(removedLongSection)) {
    errors.push(`Seção longa removida voltou para a landing: ${removedLongSection}`);
  }
}

if ((index.match(/className="v32-preview-section/g) ?? []).length !== 1) {
  errors.push("A landing deve manter apenas uma seção principal de prévias.");
}

for (const requiredVolume3Marker of [
  "previewPagesVolume3",
  "v46-volume3-highlight",
  "VOLUME 3 • 200 PÁGINAS",
  "3 volumes + 5 bônus",
  "492 páginas",
]) {
  if (!index.includes(requiredVolume3Marker)) {
    errors.push(`Integração do Volume 3 ausente: ${requiredVolume3Marker}`);
  }
}

for (const conversionTrackingMarker of [
  "InitiateCheckout",
  "content_name: offer.name",
  'currency: "BRL"',
]) {
  if (!index.includes(conversionTrackingMarker)) {
    errors.push(`Rastreamento de intenção de checkout ausente: ${conversionTrackingMarker}`);
  }
}

for (const bonusValueMarker of [
  "5 BÔNUS • 110 PÁGINAS",
  "20 planos de encontros + mapas semanais",
  "4 jogos com regras, tabuleiros e peças",
  "15 atividades + 3 modelos de bilhetes",
  'details className="v43-essential-downsell"',
]) {
  if (!index.includes(bonusValueMarker)) {
    errors.push(`Prova de valor dos bônus/downsell ausente: ${bonusValueMarker}`);
  }
}

for (const requiredPromoCopy of [
  "de <s>R$59,90</s> por <b>R$39,90</b>",
  "492 páginas • 3 volumes • 5 bônus",
  "QUERO TER AS ATIVIDADES PRONTAS",
]) {
  if (!index.includes(requiredPromoCopy)) {
    errors.push(`Clareza promocional ausente: ${requiredPromoCopy}`);
  }
}

if (errors.length > 0) {
  console.error("\nFalhas na verificação da landing page:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Verificação da landing page concluída com sucesso.");

// VSL player fix validated at source level.
