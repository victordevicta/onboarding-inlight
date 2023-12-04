import { getPokemon } from "@/pages/api/pokemon-finder";
import { PokemonEnum, PokemonType } from "@favware/graphql-pokemon";
import { PokemonImage } from "@/components/pokemon-image";

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  let { pokemonName } = params;

  //type iterator
  let i = 0;

  // format Missingno's name to the PokemonEnum format
  pokemonName === "'m%20(00)"
    ? (pokemonName = "missingno")
    : (pokemonName = pokemonName);

  const formatedPokemonName = pokemonName.replace(/[^a-zA-Z0-9]/g, "");

  const pokemonObject = await getPokemon(formatedPokemonName as PokemonEnum);

  return (
    <>
      <h1 className="text-4x1 text-bold pt-4">{pokemonObject.species}</h1>
      <div className="m-4">
        <PokemonImage
          image={pokemonObject.sprite}
          name={formatedPokemonName}
          width={300}
          height={300}
        />
      </div>
      <div className="flex">
        {pokemonObject.types.map((type: PokemonType) => {
          //increase type iterator
          i++;
          return (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={pokemonObject.key}
            >
              <h3 className="p-3 w-2/4">{`Type ${i}: ${type.name}`}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}
