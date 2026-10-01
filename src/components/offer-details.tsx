import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackMarketingEvent } from "@/lib/marketing-events";
const previewPaths = [
  "/previews/selected/kit1-selected-2.jpg",
  "/previews/selected/kit1-selected-4.jpg",
  "/previews/selected/1.jpg",
  "/previews/selected/5.jpg",
  "/previews/2_v3.jpg",
  "/previews/5_v3.jpg",
];
const previewSources: Record<string, string> = Object.fromEntries(
  previewPaths.map((src, index) => [src, `/previews/optimized/editorial-${index + 1}.webp`]),
);

export function PreviewCard({
  src,
  title,
  volume,
}: {
  src: string;
  title: string;
  volume: string;
}) {
  const thumbnail = previewSources[src];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="v11-preview-card"
          type="button"
          aria-label={`Ampliar ${title}`}
          onClick={() => trackMarketingEvent("SampleOpened", { title, volume })}
        >
          <div className="v11-preview-image">
            <img
              src={src}
              srcSet={
                thumbnail
                  ? `${thumbnail} 420w, ${thumbnail.replace(".webp", "-840.webp")} 840w`
                  : undefined
              }
              sizes="(min-width: 960px) 340px, (min-width: 640px) 30vw, 44vw"
              width={1080}
              height={1527}
              alt={`${title} — página real do ${volume}`}
              loading="lazy"
              decoding="async"
            />
            <span>
              <Eye size={14} />
              ampliar
            </span>
          </div>
          <div className="v11-preview-meta">
            <strong>{volume}</strong>
            <small>{title}</small>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="v11-preview-dialog">
        <DialogTitle>
          {volume} — {title}
        </DialogTitle>
        <DialogDescription>Página real do material digital.</DialogDescription>
        <div className="v11-preview-dialog-scroll">
          <img
            src={src}
            width={1080}
            height={1527}
            alt={`${title} — página ampliada do ${volume}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      onToggle={(event) => {
        setOpen(event.currentTarget.open);
        if (event.currentTarget.open) trackMarketingEvent("FAQOpened", { question });
      }}
    >
      <summary aria-expanded={open} aria-controls={`faq-answer-${index}`}>
        {question}
      </summary>
      <p id={`faq-answer-${index}`}>{answer}</p>
    </details>
  );
}
