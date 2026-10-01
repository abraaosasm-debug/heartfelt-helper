import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const paths = {
  vsl: resolve(root, "src/routes/index.tsx"),
  offer: resolve(root, "src/routes/oferta.tsx"),
  offerCss: resolve(root, "src/routes/oferta-premium.css"),
  checkout: resolve(root, "src/lib/checkout.ts"),
  dialog: resolve(root, "src/components/ui/dialog.tsx"),
  rootRoute: resolve(root, "src/routes/__root.tsx"),
  vslAsset: resolve(root, "src/assets/kit-atividades-vsl.mp4.asset.json"),
};

const errors = [];

for (const [label, path] of Object.entries(paths)) {
  if (!existsSync(path)) errors.push(`Arquivo obrigatório ausente (${label}): ${path}`);
}

if (errors.length) finish();

const vsl = readFileSync(paths.vsl, "utf8");
const offer = readFileSync(paths.offer, "utf8");
const offerCss = readFileSync(paths.offerCss, "utf8");
const checkout = readFileSync(paths.checkout, "utf8");
const dialog = readFileSync(paths.dialog, "utf8");
const rootRoute = readFileSync(paths.rootRoute, "utf8");
const vslAsset = readFileSync(paths.vslAsset, "utf8");

function requireAll(source, markers, label) {
  for (const marker of markers) {
    if (!source.includes(marker)) errors.push(`${label}: marcador ausente — ${marker}`);
  }
}

function forbidAll(source, markers, label) {
  for (const marker of markers) {
    if (source.includes(marker)) errors.push(`${label}: conteúdo proibido voltou — ${marker}`);
  }
}

// VSL: entrada do funil, asset Lovable, tracking e desbloqueio por término real.
requireAll(
  vsl,
  [
    'createFileRoute("/")',
    "@/assets/kit-atividades-vsl.mp4.asset.json",
    "VSLStarted",
    "VSLCompleted",
    "VSLToOffer",
    'new URL("/oferta", window.location.origin)',
    'preload="metadata"',
    "onPlaying={handlePlaying}",
    "onEnded={handleEnded}",
    "CONHECER O KIT COMPLETO",
    '"utm_campaign"',
    '"fbclid"',
  ],
  "VSL",
);

forbidAll(
  vsl,
  [
    "OfferCountdown",
    "setTimeout(() => setOfferUnlocked",
    "setTimeout(() => setCompleted",
    "garantia de 7 dias",
  ],
  "VSL",
);

if (!vslAsset.includes('"content_type": "video/mp4"')) {
  errors.push("VSL: asset do Lovable precisa continuar sendo video/mp4.");
}

try {
  const asset = JSON.parse(vslAsset);
  if (!asset.url || !asset.asset_id || Number(asset.size) < 1_000_000) {
    errors.push("VSL: manifesto do asset Lovable está incompleto.");
  }
} catch {
  errors.push("VSL: manifesto JSON do asset Lovable é inválido.");
}

// Landing premium: curta, direta e isolada do CSS legado.
requireAll(
  offer,
  [
    'createFileRoute("/oferta")',
    'import "./oferta-premium.css"',
    'className="v90-page"',
    'id="inicio"',
    'id="conteudo"',
    'id="amostras"',
    'id="avaliacoes"',
    'id="oferta"',
    'id="duvidas"',
    "Chega de perder tempo criando",
    "Abra. Escolha. Imprima. Use.",
    "492",
    "3 VOLUMES",
    "+5",
    "R$39,90",
    "R$59,90",
    "30 dias de garantia",
    "QUERO O KIT COMPLETO",
    "Kit Essencial",
    "R$10,00",
  ],
  "Landing premium",
);

requireAll(
  offer,
  [
    "feedbackModels",
    "MODELOS VISUAIS DE FEEDBACK PROFISSIONAL",
    "modelos ilustrativos",
    "PERFIL ILUSTRATIVO",
    "Texto-modelo • substitua por avaliação real",
    "não representam avaliações reais",
    "foto e autorização",
  ],
  "Transparência dos feedbacks",
);

forbidAll(
  offer,
  [
    "OFERTA DE LANÇAMENTO",
    "OfferCountdown",
    "R$79,90",
    "garantia de 7 dias",
    "Feedback verificado",
    "Depoimento verificado",
  ],
  "Landing premium",
);

// Oferta e checkouts canônicos.
const canonicalCheckouts = {
  essential: "https://pay.cakto.com.br/4aafyxo_1130411",
  complete: "https://pay.cakto.com.br/5q3o7zo_1130394",
};

for (const [key, url] of Object.entries(canonicalCheckouts)) {
  if (!checkout.includes(`${key}: "${url}"`)) {
    errors.push(`Checkout canônico divergente: ${key}`);
  }
}

requireAll(
  offer,
  [
    "href={checkoutUrls.complete}",
    "href={checkoutUrls.essential}",
    "InitiateCheckout",
    "content_name: offer.name",
    'currency: "BRL"',
    "attributionKeys",
    '"utm_source"',
    '"utm_campaign"',
    '"fbclid"',
  ],
  "Tracking e checkout",
);

// Garantia precisa ser consistente.
if (!/30 dias de garantia|garantia de 30 dias/i.test(offer)) {
  errors.push("Landing: garantia de 30 dias ausente.");
}
if (/7 dias de garantia|garantia de 7 dias/i.test(offer)) {
  errors.push("Landing: referência antiga à garantia de 7 dias encontrada.");
}

// Assets realmente usados na landing.
const requiredAssets = [
  "public/covers/optimized/cover-1.webp",
  "public/covers/optimized/cover-2.webp",
  "public/covers/1_v3.jpg",
  "public/previews/selected/kit1-selected-2.jpg",
  "public/previews/selected/kit1-selected-4.jpg",
  "public/previews/selected/1.jpg",
  "public/previews/selected/5.jpg",
  "public/previews/2_v3.jpg",
  "public/previews/5_v3.jpg",
];

for (const relative of requiredAssets) {
  const absolute = resolve(root, relative);
  if (!existsSync(absolute)) {
    errors.push(`Asset da landing ausente: ${relative}`);
    continue;
  }
  if (statSync(absolute).size === 0) errors.push(`Asset vazio: ${relative}`);
}

// Dialog precisa permanecer acima da barra mobile.
if (!dialog.includes("z-[100]") || !dialog.includes("z-[110]")) {
  errors.push("Dialog: z-index precisa permanecer acima da barra fixa mobile.");
}

// CSS novo: identidade isolada, responsive e sem depender das classes antigas.
requireAll(
  offerCss,
  [
    ".v90-page",
    ".v90-hero",
    ".v90-buy-button",
    ".v90-volume-grid",
    ".v90-preview-grid",
    ".v90-review-grid",
    ".v90-price-card",
    ".v90-mobile-bar",
    "@media (max-width: 640px)",
    "@media (prefers-reduced-motion: reduce)",
    '"Archivo Black"',
    '"Instrument Serif"',
    '"Manrope"',
  ],
  "CSS premium",
);

// Tipografia nova deve estar carregada no documento raiz.
requireAll(
  rootRoute,
  [
    "family=Archivo+Black",
    "family=Instrument+Serif",
    "family=Manrope",
  ],
  "Fontes premium",
);

// Canonical e metadados básicos.
requireAll(
  offer,
  [
    'href: "https://kitcompletoautismoeinfantil.lovable.app/oferta"',
    'title: "Kit de Atividades | 492 páginas prontas para imprimir"',
  ],
  "SEO da oferta",
);

// Sanidade de tamanho: a rota nova deve continuar claramente menor que a versão longa anterior.
const offerLines = offer.split("\n").length;
if (offerLines > 760) {
  errors.push(`Landing voltou a crescer demais: ${offerLines} linhas (limite 760).`);
}

finish();

function finish() {
  if (errors.length > 0) {
    console.error("\nFalhas na verificação do site:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("Verificação do site concluída com sucesso.");
}
