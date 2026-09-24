import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const indexPath = resolve(root, "src/routes/index.tsx");
const checkoutPath = resolve(root, "src/lib/checkout.ts");
const dialogPath = resolve(root, "src/components/ui/dialog.tsx");
const cssPath = resolve(root, "src/styles.css");
const index = readFileSync(indexPath, "utf8");
const checkout = readFileSync(checkoutPath, "utf8");
const dialog = readFileSync(dialogPath, "utf8");
const css = readFileSync(cssPath, "utf8");
const errors = [];

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
  !/checkoutUrls\.complete\}\s+dark>[\s\S]*QUERO O KIT COMPLETO — R\$39,90[\s\S]*<\/PrimaryButton>/.test(
    index,
  )
) {
  errors.push("CTA final precisa usar explicitamente a variante escura e o preço promocional.");
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

if (!index.includes("<strong>10</strong>") || !index.includes("<small>,00</small>")) {
  errors.push("Preço visual do Kit Essencial deve permanecer em R$10,00.");
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

if (!index.includes("Por R$29,90 além do Essencial")) {
  errors.push("Comparação de valor entre Essencial e Completo está ausente.");
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
  "v38-upgrade-section",
  "v38-purchase-section",
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
  "preview-volume2-title",
  "v39-preview-section-volume2",
  "QUERO O KIT COMPLETO — R$39,90",
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

for (const requiredPromoCopy of [
  "de <s>R$59,90</s> por <b>R$39,90</b>",
  "292 páginas • 2 volumes • 5 bônus",
  "QUERO AS 292 PÁGINAS — R$39,90",
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
