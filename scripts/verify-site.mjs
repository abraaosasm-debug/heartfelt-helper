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
  ],
  "VSL",
);

forbidAll(vsl, ["OfferCountdown", "garantia de 7 dias"], "VSL");

try {
  const asset = JSON.parse(vslAsset);
  if (!asset.url || !asset.asset_id || Number(asset.size) < 1_000_000) {
    errors.push("VSL: manifesto do asset Lovable está incompleto.");
  }
} catch {
  errors.push("VSL: manifesto JSON do asset Lovable é inválido.");
}

requireAll(
  offer,
  [
    'createFileRoute("/oferta")',
    'import "./oferta-premium.css"',
    'className="v11-page"',
    'id="inicio"',
    'id="conteudo"',
    'id="amostras"',
    'id="oferta"',
    'id="duvidas"',
    "Atividades prontas para",
    "escolher, imprimir e usar.",
    "3 VOLUMES + 5 BÔNUS • 492 PÁGINAS",
    "Páginas reais do material.",
    "POR QUE ISSO É PRÁTICO",
    "CONFIANÇA ANTES DA COMPRA",
    "GARANTIA",
    "PERGUNTAS FREQUENTES",
    "R$39,90",
    "R$59,90",
    "Economize R$20",
    "30 dias de garantia",
    "QUERO O KIT COMPLETO",
    "Kit Essencial",
    "R$10,00",
  ],
  "Landing V11",
);

forbidAll(
  offer,
  [
    "feedbackModels",
    "PERFIL ILUSTRATIVO",
    "Marina A.",
    "Carla M.",
    "Juliana R.",
    "OFERTA DE LANÇAMENTO",
    "OfferCountdown",
    "R$79,90",
    "garantia de 7 dias",
  ],
  "Landing V11",
);

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

if (!/30 dias de garantia|garantia de 30 dias/i.test(offer)) {
  errors.push("Landing V11: garantia de 30 dias ausente.");
}
if (/7 dias de garantia|garantia de 7 dias/i.test(offer)) {
  errors.push("Landing V11: referência antiga à garantia de 7 dias encontrada.");
}

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

if (!dialog.includes("z-[100]") || !dialog.includes("z-[110]")) {
  errors.push("Dialog: z-index precisa permanecer acima da barra fixa mobile.");
}

requireAll(
  offerCss,
  [
    ".v11-page",
    ".v11-trustbar",
    ".v11-hero",
    ".v11-product-visual",
    ".v11-volume-grid",
    ".v11-preview-grid",
    ".v11-benefit-grid",
    ".v11-proof-grid",
    ".v11-offer-grid",
    ".v11-guarantee-section",
    ".v11-faq-grid",
    ".v11-mobile-bar",
    "min-height: 52px",
    "@media (max-width: 640px)",
    "@media (prefers-reduced-motion: reduce)",
    '"Instrument Serif"',
    '"Work Sans"',
  ],
  "CSS V11",
);

requireAll(rootRoute, ["family=Instrument+Serif", "family=Work+Sans"], "Fontes V11");

requireAll(
  offer,
  [
    'href: "https://kitcompletoautismoeinfantil.lovable.app/oferta"',
    'title: "Kit de Atividades | 492 páginas prontas para imprimir"',
  ],
  "SEO da oferta",
);

const offerLines = offer.split("\n").length;
if (offerLines > 760) {
  errors.push(`Landing V11 voltou a crescer demais: ${offerLines} linhas (limite 760).`);
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
