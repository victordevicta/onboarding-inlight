import { getPokemon } from "@/pages/api/pokemon-finder";
import { Flavor, PokemonEnum, PokemonType } from "@favware/graphql-pokemon";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string };
}) {
  let { pokemonName } = params;

  //type iterator
  let i = 0;

  // format Missingno's name to the PokemonEnum format
  pokemonName === "missingNo."
    ? (pokemonName = "missingno")
    : (pokemonName = pokemonName);

  // format Mr. Mime's name to the PokemonEnum format
  pokemonName === "Mr.%20Mime"
    ? (pokemonName = "mrmime")
    : (pokemonName = pokemonName);

  const formatedPokemonName = pokemonName.replace(/[^a-zA-Z0-9]/g, "");

  // format the name of the pokemon to upper case for title purpouses
  const formatedPokemonNameUpperCase =
    pokemonName === "mrmime"
      ? "Mr. Mime"
      : pokemonName === "missingno"
      ? "MissingNo."
      : pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const pokemonObject = await getPokemon(formatedPokemonName as PokemonEnum);

  return (
    <>
      <h1 className="text-4xl text-bold pt-4">
        {formatedPokemonNameUpperCase}
      </h1>
      <div className="m-4">
        <PokemonImage
          image={pokemonObject.sprite}
          name={formatedPokemonName}
          width={300}
          height={300}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pokemonObject.types.map((type: PokemonType) => {
          //increase type iterator
          i++;
          return (
            <h3
              key={pokemonObject.key}
              className="p-3"
            >{`Type ${i}: ${type.name}`}</h3>
          );
        })}
      </div>
      <div className="flex-col">
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4">{`Attack: ${pokemonObject.baseStats.attack}`}</h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.attack}
          />
        </div>
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4">
            {" "}
            {`Defense: ${pokemonObject.baseStats.defense}`}
          </h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.defense}
          />
        </div>
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4"> {`HP: ${pokemonObject.baseStats.hp}`}</h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.hp}
          />
        </div>
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4">{`Special Attack: ${pokemonObject.baseStats.specialattack}`}</h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.specialattack}
          />
        </div>
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4">{`Special Defense: ${pokemonObject.baseStats.specialdefense}`}</h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.specialdefense}
          />
        </div>
        <div className="flex items-stretch" style={{ width: "500px" }}>
          <h3 className="p-3 w-2/4">
            {" "}
            {`Speed: ${pokemonObject.baseStats.speed}`}
          </h3>
          <Progress
            className="w-2/4 m-auto"
            value={pokemonObject.baseStats.speed}
          />
        </div>
      </div>
      <div className="m-4">
        {pokemonObject.flavorTexts.map((flavourText: Flavor) => {
          return <h1 key={pokemonObject.key}>{flavourText.flavor}</h1>;
        })}
      </div>
    </>
  );
}
