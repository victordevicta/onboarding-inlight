"use client";
import React, { useEffect, useState } from "react";
import { getAllPokemon } from "@/pages/api/pokemon-finder";
import { Pokemon } from "@favware/graphql-pokemon";
import { PokemonGrid } from "@/components/pokemon-grid";

const healthcheck = async () => {
  try {
    const response = await fetch("/api/healthcheck", {
      method: "GET",
    });

    if (response) {
      const { server } = await response.json();
      console.log("server health status:", server);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function App() {
  const [pokemonList, setPokemonList] = useState<
    Omit<readonly Pokemon[], "__typename">
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    healthcheck();
    const getAllPokemonHandler = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemon();
        if (data) {
          const pokemonListNonSpecials = data.reduce(
            (accumulator: Pokemon[], current) => {
              if (
                !accumulator.find((item: Pokemon) => item.num === current.num)
              ) {
                accumulator.push(current);
              }
              return accumulator;
            },
            []
          );
          setPokemonList(pokemonListNonSpecials);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPokemonHandler();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <PokemonGrid pokemonList={pokemonList} />
      )}
    </React.Fragment>
  );
}
