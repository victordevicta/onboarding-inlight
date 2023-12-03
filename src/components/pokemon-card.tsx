import { PokemonEnum } from "@favware/graphql-pokemon";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  key: PokemonEnum;
  name: string;
  sprite: string;
}

export function PokemonCard({ key, name, sprite }: PokemonCardProps) {
  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Link
      href={name}
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      key={key}
    >
      <h2 className="text-2xl font-semibold">{formatedName}</h2>
      <Image
        src={sprite}
        width={100}
        height={100}
        alt={`${formatedName} Sprite`}
      />
    </Link>
  );
}
