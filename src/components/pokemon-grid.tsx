"use client";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PokemonCard } from "./pokemon-card";
import { Pokemon } from "@favware/graphql-pokemon";

interface PokemonGridProps {
  pokemonList: Omit<readonly Pokemon[], "__typename">;
}

export function PokemonGrid({ pokemonList }: PokemonGridProps) {
  const [searchText, setSearchText] = useState("");

  // filter the pokemon by the text typed on the search bar
  const searchFilter = (
    pokemonList: Omit<readonly Pokemon[], "__typename">
  ) => {
    return pokemonList.filter((pokemon: Pokemon) =>
      pokemon.species.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // save the filtered array of objects
  const filteredPokemonList = searchFilter(pokemonList);

  // show the filtered array to user

  return (
    <>
      <div>
        <h3 className="text-2xl py-6 text-center">Search For Your Pokemon!</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="pokemonName">Pokemon Name</Label>
          <Input
            type="text"
            value={searchText}
            id="pokemonName"
            placeholder="Vaporeon, Bulbasaur, Sandslash, etc..."
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-5 lg:text-left">
        {filteredPokemonList.map((pokemon: Pokemon) => {
          return (
            <PokemonCard
              key={pokemon.key}
              num={pokemon.num}
              name={pokemon.species}
              sprite={pokemon.sprite}
              types={pokemon.types}
            />
          );
        })}
      </div>
    </>
  );
}
