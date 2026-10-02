import "./printed-kit.css";

const covers = [
  "/covers/optimized/cover-1.webp?v=1",
  "/covers/optimized/cover-2.webp?v=1",
  "/covers/optimized/volume-3-420.webp",
];

/** Composição ilustrativa de impressão, construída somente com páginas e capas reais. */
export function PrintedKit({
  eager = false,
  compact = false,
}: {
  eager?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={`printed-kit${compact ? " printed-kit-compact" : ""}`}>
      <span className="printed-kit-label">A COLEÇÃO, DO PDF AO PAPEL</span>
      <span className="printed-kit-desk">
        {covers.map((src, index) => (
          <span className={`printed-book printed-book-${index + 1}`} key={src}>
            <img
              src={src}
              width={420}
              height={594}
              alt={`Capa real do Volume ${index + 1}, em composição de apostila impressa`}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="printed-book-tab" aria-hidden="true">
              0{index + 1}
            </span>
          </span>
        ))}
        {[1, 6].map((number, index) => (
          <span className={`printed-sheet printed-sheet-${index + 1}`} key={number}>
            <img
              src={`/previews/optimized/editorial-${number}.webp`}
              width={420}
              height={594}
              alt={
                index === 0
                  ? "Amostra real: trace as vogais, Volume 1"
                  : "Amostra real: antes e depois dos números, Volume 3"
              }
              loading={eager ? "eager" : "lazy"}
              decoding="async"
            />
          </span>
        ))}
      </span>
      <span className="printed-kit-caption">
        <strong>492 páginas digitais</strong>
        <span>PDFs para imprimir • composição ilustrativa</span>
      </span>
    </span>
  );
}

export function VolumeSample({ index }: { index: number }) {
  const samples = [1, 4, 6];
  const titles = ["Trace as vogais", "Encontre três diferenças", "Antes e depois dos números"];
  return (
    <img
      className="volume-internal-sample"
      src={`/previews/optimized/editorial-${samples[index]}.webp`}
      width={420}
      height={594}
      alt={`${titles[index]} — amostra do Volume ${index + 1}`}
      loading="lazy"
      decoding="async"
    />
  );
}
