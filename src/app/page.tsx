"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import { getAllPokemon, getPokemon } from "@/pages/api/pokemon-finder";
import { Pokemon, PokemonEnum } from "@favware/graphql-pokemon";
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
  const [pokemon, setPokemon] = useState<Omit<Pokemon, "__typename">>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPokemonHandler = async (pokemonName: PokemonEnum) => {
    setIsLoading(true);
    try {
      const data = await getPokemon(pokemonName);
      if (data) setPokemon(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    healthcheck();
    const getAllPokemonHandler = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemon();
        if (data) setPokemonList(data);
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
