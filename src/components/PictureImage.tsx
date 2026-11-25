import React from "react";
import placeholders from "@/lib/placeholders.json";

type PlaceholderKey = keyof typeof placeholders;

interface PictureImageProps {
  stem: string;
  widths?: number[];
  mobileStem?: string;
  mobileWidths?: number[];
  placeholderKey?: PlaceholderKey | string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  priority?: boolean;
}

function buildSrcSet(stem: string, ext: "avif" | "webp", widths?: number[]) {
  if (!widths || widths.length === 0) {
    return `/images/${stem}.${ext}`;
  }
  return widths.map((w) => `/images/${stem}-${w}.${ext} ${w}w`).join(", ");
}

export default function PictureImage({
  stem,
  widths,
  mobileStem,
  mobileWidths,
  placeholderKey,
  sizes,
  width,
  height,
  alt,
  className = "w-full h-full object-cover",
  priority = false,
}: PictureImageProps) {
  const desktopFallback =
    widths && widths.length > 0
      ? `/images/${stem}-${widths[widths.length - 1]}.webp`
      : `/images/${stem}.webp`;

  const blurUri = placeholderKey
    ? (placeholders as Record<string, string>)[placeholderKey]
    : undefined;

  return (
    <picture className="block w-full h-full">
      {mobileStem && (
        <>
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet={buildSrcSet(mobileStem, "avif", mobileWidths)}
            sizes={sizes}
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet={buildSrcSet(mobileStem, "webp", mobileWidths)}
            sizes={sizes}
          />
        </>
      )}
      <source
        type="image/avif"
        srcSet={buildSrcSet(stem, "avif", widths)}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildSrcSet(stem, "webp", widths)}
        sizes={sizes}
      />
      <img
        src={desktopFallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={className}
        style={
          blurUri
            ? {
                backgroundImage: `url("${blurUri}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      />
    </picture>
  );
}
