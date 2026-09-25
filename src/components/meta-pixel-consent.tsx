import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const META_PIXEL_ID = "1100314516014264";
const CONSENT_KEY = "marketing-consent-v1";
const CONSENT_VERSION = "2026-09-25";
const REGULATED_REGIONS = new Set([
  "AT", "BE", "BG", "BR", "CA", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT", "NL", "NO",
  "PL", "PT", "RO", "SE", "SI", "SK",
]);

type ConsentChoice = "accepted" | "rejected";

type ConsentRecord = {
  choice: ConsentChoice;
  decidedAt: string;
  noticeVersion: string;
  region: string;
};

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

function readConsent(): ConsentRecord | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (!value) return null;
    const record = JSON.parse(value) as Partial<ConsentRecord>;
    if (
      (record.choice !== "accepted" && record.choice !== "rejected") ||
      record.noticeVersion !== CONSENT_VERSION ||
      typeof record.decidedAt !== "string" ||
      typeof record.region !== "string"
    ) {
      return null;
    }
    return record as ConsentRecord;
  } catch {
    return null;
  }
}

function loadMetaPixel() {
  if (window.fbq) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as Window["fbq"];
  if (!fbq) return;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

async function getRegion(): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2000);

  try {
    const response = await fetch("/cdn-cgi/trace", {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    });
    if (!response.ok) return "XX";
    const location = (await response.text())
      .split("\n")
      .find((line) => line.startsWith("loc="))
      ?.slice(4)
      .trim()
      .toUpperCase();
    return location || "XX";
  } catch {
    return "XX";
  } finally {
    window.clearTimeout(timeout);
  }
}

export function MetaPixelConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [region, setRegion] = useState("XX");

  useEffect(() => {
    let active = true;

    const resolveConsent = async () => {
      const stored = readConsent();
      if (stored) {
        if (stored.choice === "accepted") loadMetaPixel();
        return;
      }

      const detectedRegion = await getRegion();
      if (!active) return;
      setRegion(detectedRegion);

      if (
        detectedRegion === "XX" ||
        detectedRegion === "T1" ||
        REGULATED_REGIONS.has(detectedRegion)
      ) {
        setShowBanner(true);
      } else {
        loadMetaPixel();
      }
    };

    void resolveConsent();

    const openSettings = () => setShowBanner(true);
    const syncConsent = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      const stored = readConsent();
      setShowBanner(!stored);
      if (stored?.choice === "accepted") loadMetaPixel();
    };

    window.addEventListener("marketing-consent-settings", openSettings);
    window.addEventListener("storage", syncConsent);
    return () => {
      active = false;
      window.removeEventListener("marketing-consent-settings", openSettings);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    const record: ConsentRecord = {
      choice,
      decidedAt: new Date().toISOString(),
      noticeVersion: CONSENT_VERSION,
      region,
    };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    setShowBanner(false);
    if (choice === "accepted") loadMetaPixel();
  };

  if (!showBanner) return null;

  return (
    <aside className="v42-consent" aria-label="Preferências de privacidade">
      <div className="v42-consent-copy">
        <strong>Privacidade e anúncios</strong>
        <p>
          Podemos usar o Pixel da Meta para medir visitas e compras e melhorar anúncios. A Meta
          pode receber dados do navegador e identificadores. Você pode aceitar ou recusar e mudar
          sua escolha depois. <Link to="/privacidade">Saiba mais</Link>
        </p>
      </div>
      <div className="v42-consent-actions">
        <Button type="button" variant="outline" onClick={() => saveChoice("rejected")}>
          Recusar
        </Button>
        <Button type="button" onClick={() => saveChoice("accepted")}>
          Aceitar
        </Button>
      </div>
    </aside>
  );
}

export function CookieSettingsButton() {
  return (
    <Button
      type="button"
      variant="link"
      className="v42-cookie-settings"
      onClick={() => window.dispatchEvent(new Event("marketing-consent-settings"))}
    >
      Preferências de privacidade
    </Button>
  );
}