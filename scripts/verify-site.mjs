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

if (errors.length > 0) {
  console.error("\nFalhas na verificação da landing page:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Verificação da landing page concluída com sucesso.");
