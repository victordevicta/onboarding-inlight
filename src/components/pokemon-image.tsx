"use client";
import Image from "next/image";

export function PokemonImage({
  image,
  name,
  width,
  height,
}: {
  image: string;
  name: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={image}
      alt={`${name} Sprite`}
      width={width}
      height={height}
      priority
      style={{ objectFit: "contain" }}
      className="transition-opacity opacity-0 duration-[2s]"
      onLoadingComplete={(image) => image.classList.remove("opacity-0")}
    />
  );
}
