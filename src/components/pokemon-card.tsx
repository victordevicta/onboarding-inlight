import { PokemonEnum, PokemonType } from "@favware/graphql-pokemon";
import Link from "next/link";
import { PokemonImage } from "./pokemon-image";

interface PokemonCardProps {
  key: PokemonEnum;
  name: string;
  sprite: string;
  types: readonly PokemonType[];
}

export function PokemonCard({ key, name, sprite, types }: PokemonCardProps) {
  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <Link
      href={name}
      className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      key={key}
    >
      <h2 className="text-2xl font-semibold text-center">{formatedName}</h2>
      <div
        className="m-4"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <PokemonImage
          image={sprite}
          name={formatedName}
          width={50}
          height={50}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {types.map((type: PokemonType) => {
            return <h3 key={key}>{`Type: ${type.name}`}</h3>;
          })}
        </div>
      </div>
    </Link>
  );
}
