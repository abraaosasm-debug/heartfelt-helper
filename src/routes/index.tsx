import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Check, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import { CookieSettingsButton } from "@/components/meta-pixel-consent";
import vslVideo from "@/assets/kit-atividades-vsl.mp4.asset.json";

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

const VSL_VIDEO_SRC = vslVideo.url;

function trackVslEvent(eventName: "VSLStarted" | "VSLCompleted" | "VSLToOffer") {
  if (!window.fbq) return;

  window.fbq("trackCustom", eventName, {
    content_name: "Kit Completo — VSL",
  });
}

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastProgressRef = useRef(-1);
  const [offerHref, setOfferHref] = useState("/oferta");
  const [videoState, setVideoState] = useState<"loading" | "ready" | "fallback">("loading");
  const [showOffer, setShowOffer] = useState(false);
  const [showPreplay, setShowPreplay] = useState(true);
  const [completed, setCompleted] = useState(false);
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
    if (!completed) setShowOffer(false);

    if (started) return;
    setStarted(true);
    trackVslEvent("VSLStarted");
  };

  const handlePlaying = () => {
    setVideoState("ready");
    setShowPreplay(false);
  };

  const handleEnded = () => {
    setCompleted(true);
    setShowPreplay(true);
    setShowOffer(true);
    lastProgressRef.current = 100;
    setProgress(100);
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
            <h1 id="vsl-title">
              Pare de criar atividades <span className="vsl-title-accent">do zero</span> toda vez
              que precisar.
            </h1>
            <p>
              Veja como ter <strong>492 páginas organizadas</strong> para escolher, imprimir e usar
              quando precisar de uma nova atividade.
            </p>
          </div>

          <div className="vsl-showcase">
            <div className="vsl-showcase-head">
              <span className="vsl-showcase-kicker">POR DENTRO DO KIT</span>
              <strong>Veja o material por dentro antes de decidir.</strong>
              <p>Em 2min31s, veja páginas reais e entenda como a coleção funciona.</p>
            </div>

            <div className="vsl-player-wrap">
              <div className="vsl-player-frame" data-state={videoState}>
                <video
                  ref={videoRef}
                  className="vsl-video"
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedData={handleVideoReady}
                  onCanPlay={handleVideoReady}
                  onPlaying={handlePlaying}
                  onPlay={handlePlay}
                  onTimeUpdate={(event) => {
                    const video = event.currentTarget;
                    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

                    const nextProgress = Math.min(
                      100,
                      Math.floor((video.currentTime / video.duration) * 100),
                    );

                    if (nextProgress === lastProgressRef.current) return;
                    lastProgressRef.current = nextProgress;
                    setProgress(nextProgress);
                  }}
                  onEnded={handleEnded}
                  onError={handleVideoError}
                >
                  <source src={VSL_VIDEO_SRC} type="video/mp4" />
                </video>

                {showPreplay && videoState !== "fallback" ? (
                  <button
                    type="button"
                    className={`vsl-preplay${completed ? " is-replay" : ""}`}
                    aria-label={
                      completed
                        ? "Assistir novamente à apresentação do Kit de Atividades"
                        : "Reproduzir apresentação do Kit de Atividades"
                    }
                    onClick={() => {
                      const video = videoRef.current;
                      if (!video) return;
                      if (completed) {
                        video.currentTime = 0;
                        setProgress(0);
                      }
                      void video.play();
                    }}
                  >
                    <span className="vsl-preplay-covers" aria-hidden="true">
                      <img
                        src="/covers/optimized/cover-1.webp?v=1"
                        alt=""
                        width={1080}
                        height={1528}
                      />
                      <img
                        src="/covers/1_v3.jpg?v=1"
                        srcSet="/covers/optimized/volume-3-420.webp 420w, /covers/optimized/volume-3-840.webp 840w"
                        sizes="180px"
                        alt=""
                        width={1080}
                        height={1528}
                      />
                      <img
                        src="/covers/optimized/cover-2.webp?v=1"
                        alt=""
                        width={1080}
                        height={1527}
                      />
                    </span>

                    <span className="vsl-preplay-action">
                      <span className="vsl-preplay-button" aria-hidden="true">
                        <Play size={24} fill="currentColor" />
                      </span>
                      <strong>{completed ? "Assistir novamente" : "Assista à apresentação"}</strong>
                      <small>
                        {completed
                          ? "Rever apresentação • 2min31s"
                          : "2min31s • veja o kit por dentro"}
                      </small>
                    </span>
                  </button>
                ) : null}

                {videoState === "fallback" ? (
                  <div className="vsl-fallback" aria-live="polite">
                    <div className="vsl-fallback-covers" aria-hidden="true">
                      <img
                        src="/covers/optimized/cover-1.webp?v=1"
                        alt=""
                        width={1080}
                        height={1528}
                      />
                      <img
                        src="/covers/1_v3.jpg?v=1"
                        srcSet="/covers/optimized/volume-3-420.webp 420w, /covers/optimized/volume-3-840.webp 840w"
                        sizes="180px"
                        alt=""
                        width={1080}
                        height={1528}
                      />
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
                  <span>Vídeo curto • 2min31s</span>
                  <strong>{Math.round(progress)}%</strong>
                </div>
                <div
                  className="vsl-video-progress-track"
                  role="progressbar"
                  aria-label="Progresso da apresentação"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                >
                  <span style={{ transform: `scaleX(${progress / 100})` }} />
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
                  <span>AGORA CONHEÇA A COLEÇÃO COMPLETA</span>
                  <h2>Conheça o Kit Completo e veja tudo o que está incluído.</h2>
                  <p>
                    Veja as 492 páginas, os três volumes, os cinco bônus e as condições atuais antes
                    de decidir.
                  </p>
                  <a
                    className="vsl-offer-button"
                    href={offerHref}
                    onClick={() => trackVslEvent("VSLToOffer")}
                  >
                    CONHECER O KIT COMPLETO
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
                    Ao final da apresentação, você poderá ver tudo o que está incluído no Kit
                    Completo.
                  </p>
                </div>
              )}
            </div>
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
