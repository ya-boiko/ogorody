"use client";

import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

type PlotGalleryProps = {
  photos: string[];
  alt: string;
};

export function PlotGallery({ photos, alt }: PlotGalleryProps) {
  const [active, setActive] = useState(0);
  if (photos.length === 0) return null;
  const main = photos[active] ?? photos[0]!;

  return (
    <div className="gallery">
      <div className="main-img-wrap">
        <Image
          className="main-img"
          src={asset(main)}
          alt={alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
      {photos.length > 1 && (
        <div className="thumbs">
          {photos.map((photo, i) => (
            <button
              type="button"
              key={photo}
              onClick={() => setActive(i)}
              aria-label={`Показать фото ${i + 1}`}
              style={{
                display: "contents",
              }}
            >
              <Image
                src={asset(photo)}
                alt=""
                width={200}
                height={140}
                className={i === active ? "active" : undefined}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
