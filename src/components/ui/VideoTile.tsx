"use client";

import { useEffect, useRef, useState } from "react";

type VideoTileProps = {
  src: string;
  poster: string;
  label: string;
  title?: string;
  /** Play icon only — parent supplies the caption. */
  minimal?: boolean;
  className?: string;
  onEngage?: () => void;
};

export function VideoTile({
  src,
  poster,
  label,
  title,
  minimal = false,
  className = "",
  onEngage,
}: VideoTileProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "240px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const hoverPlay = () => {
    if (engaged || !canHover()) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => undefined);
  };

  const hoverStop = () => {
    if (engaged) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* metadata may not be ready */
    }
  };

  const engage = () => {
    setEngaged(true);
    onEngage?.();
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.controls = true;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => undefined);
    });
  };

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full overflow-hidden bg-bg ${className}`}
      onMouseEnter={hoverPlay}
      onMouseLeave={hoverStop}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full ${engaged ? "object-contain bg-black" : "object-cover"}`}
        poster={poster}
        preload={inView ? "metadata" : "none"}
        playsInline
        loop={!engaged}
        muted={!engaged}
        src={inView ? src : undefined}
        aria-label={title ? `${label}. ${title}` : label}
      />
      {!engaged && (
        <button
          type="button"
          onClick={engage}
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-bg/70 via-bg/10 to-bg/20 transition-colors hover:via-transparent"
          aria-label={`Play ${title ?? label}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/80 bg-bg/55 text-gold backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 h-6 w-6"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {!minimal && (
            <>
              <span className="mt-4 text-[10px] tracking-[0.28em] uppercase text-gold">
                {label}
              </span>
              {title && (
                <span className="mt-1 px-4 text-center text-xs tracking-wide text-text/90">
                  {title}
                </span>
              )}
            </>
          )}
        </button>
      )}
    </div>
  );
}
