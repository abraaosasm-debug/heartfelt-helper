import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

const VSL_VIDEO_SRC = "/vsl/kit-atividades-vsl.mp4?v=1";

function trackVslEvent(eventName: "VSLStarted" | "VSLCompleted" | "VSLToOffer") {
  if (!window.fbq) return;

  window.fbq("trackCustom", eventName, {
    content_name: "Kit Completo — VSL",
  });
}

function Index() {
  const [offerHref, setOfferHref] = useState("/oferta");
  const [videoState, setVideoState] = useState<"loading" | "ready" | "fallback">("loading");
  const [showOffer, setShowOffer] = useState(false);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const source = new URL(window.location.href);
    const target = new URL("/oferta", window.location.origin);

    attributionKeys.forEach((key) => {
      const value = source.searchParams.get(key);
      if (value) target.searchParams.set(key, value);
    });

    setOfferHref(`${target.pathname}${target.search}`);
  }, []);

  const handlePlay = () => {
    setVideoState("ready");
    setShowOffer(false);

    if (started) return;
    setStarted(true);
    trackVslEvent("VSLStarted");
  };

  const handleEnded = () => {
    setShowOffer(true);
    trackVslEvent("VSLCompleted");
  };

  const handleVideoReady = () => {
    setVideoState("ready");
  };

  const handleVideoError = () => {
    setVideoState("fallback");
  };

  return (
    <main className="vsl-page">
      <header className="vsl-header">
        <div className="vsl-shell vsl-header-inner">
          <div className="vsl-brand" aria-label="Kit de Atividades Infantil e Autismo">
            <span className="vsl-brand-mark" aria-hidden="true">
              <BookOpen size={18} />
            </span>
            <span>Kit de Atividades</span>
          </div>

          <div className="vsl-header-trust">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Material digital • 30 dias de garantia</span>
          </div>
        </div>
      </header>

      <section className="vsl-hero" aria-labelledby="vsl-title">
        <div className="vsl-shell vsl-hero-inner">
          <div className="vsl-copy">
            <span className="vsl-eyebrow">ASSISTA À APRESENTAÇÃO</span>
            <h1 id="vsl-title">Pare de criar atividades do zero toda vez que precisar.</h1>
            <p>
              Veja como ter <strong>492 páginas organizadas</strong> para escolher, imprimir e usar
              quando precisar de uma nova atividade.
            </p>
          </div>

          <div className="vsl-player-wrap">
            <div className="vsl-player-frame" data-state={videoState}>
              <video
                className="vsl-video"
                controls
                playsInline
                preload="auto"
                poster="/covers/1_v3.jpg?v=1"
                onLoadedData={handleVideoReady}
                onCanPlay={handleVideoReady}
                onPlaying={handleVideoReady}
                onPlay={handlePlay}
                onTimeUpdate={(event) => {
                  const video = event.currentTarget;
                  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
                  setProgress(Math.min(100, (video.currentTime / video.duration) * 100));
                }}
                onEnded={handleEnded}
                onError={handleVideoError}
              >
                <source src={VSL_VIDEO_SRC} type="video/mp4" />
              </video>

              {videoState === "fallback" ? (
                <div className="vsl-fallback" aria-live="polite">
                  <div className="vsl-fallback-covers" aria-hidden="true">
                    <img
                      src="/covers/optimized/cover-1.webp?v=1"
                      alt=""
                      width={1080}
                      height={1528}
                    />
                    <img src="/covers/1_v3.jpg?v=1" alt="" width={1080} height={1528} />
                    <img
                      src="/covers/optimized/cover-2.webp?v=1"
                      alt=""
                      width={1080}
                      height={1527}
                    />
                  </div>

                  <div className="vsl-fallback-copy">
                    <span className="vsl-play-mark" aria-hidden="true">
                      <Play size={24} fill="currentColor" />
                    </span>
                    <strong>Atividades prontas. Uma coleção organizada.</strong>
                    <p>
                      492 páginas digitais em 3 volumes + 5 bônus para consultar, escolher e
                      imprimir.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="vsl-video-progress" aria-label="Progresso da apresentação">
              <div className="vsl-video-progress-copy">
                <span>Vídeo curto • 1min44s</span>
                <strong>{Math.round(progress)}%</strong>
              </div>
              <div
                className="vsl-video-progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="vsl-player-meta" aria-label="Resumo da apresentação">
              <span>
                <Check size={15} aria-hidden="true" />
                Demonstração do material
              </span>
              <span>
                <Check size={15} aria-hidden="true" />
                Páginas reais
              </span>
              <span>
                <Check size={15} aria-hidden="true" />3 volumes + 5 bônus
              </span>
            </div>
          </div>

          <div className={`vsl-offer-gate${showOffer ? " is-visible" : ""}`} aria-live="polite">
            {showOffer ? (
              <>
                <span>AGORA VEJA A COLEÇÃO COMPLETA</span>
                <h2>Conheça as 492 páginas, os 3 volumes e os 5 bônus.</h2>
                <p>
                  Veja as páginas por dentro, tudo o que está incluído e a oferta atual antes de
                  decidir.
                </p>
                <a
                  className="vsl-offer-button"
                  href={offerHref}
                  onClick={() => trackVslEvent("VSLToOffer")}
                >
                  VER O KIT COMPLETO
                  <ArrowRight size={19} />
                </a>
              </>
            ) : videoState === "fallback" ? (
              <p className="vsl-gate-hint">
                Não foi possível carregar o vídeo. Atualize a página e tente novamente.
              </p>
            ) : (
              <div className="vsl-gate-locked">
                <LockKeyhole size={15} aria-hidden="true" />
                <p className="vsl-gate-hint">
                  A oferta completa será liberada ao final da apresentação.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="vsl-proof-strip" aria-label="Resumo da oferta">
        <div className="vsl-shell vsl-proof-grid">
          <div>
            <strong>492</strong>
            <span>páginas digitais</span>
          </div>
          <div>
            <strong>3</strong>
            <span>volumes</span>
          </div>
          <div>
            <strong>5</strong>
            <span>bônus</span>
          </div>
          <div>
            <strong>30</strong>
            <span>dias de garantia</span>
          </div>
        </div>
      </section>

      <footer className="vsl-footer">
        <div className="vsl-shell">
          <p>© 2026 Kit de Atividades Infantil e Autismo. Material digital educativo.</p>
          <p>
            O material não substitui avaliação, terapia ou acompanhamento individualizado. Confira
            as condições de pagamento, entrega, garantia e atendimento antes da compra.
          </p>
          <div className="vsl-footer-links">
            <Link to="/privacidade">Política de privacidade</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </footer>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veja como ter atividades prontas para imprimir" },
      {
        name: "description",
        content:
          "Assista à apresentação do Kit de Atividades Infantil e Autismo e conheça uma coleção com 492 páginas, 3 volumes e 5 bônus.",
      },
      {
        property: "og:title",
        content: "Pare de criar atividades do zero toda vez que precisar",
      },
      {
        property: "og:description",
        content:
          "Veja como ter atividades prontas para escolher, imprimir e usar e depois conheça a coleção completa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kitcompletoautismoeinfantil.lovable.app/",
      },
    ],
  }),
  component: Index,
});
