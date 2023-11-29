"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import getAllPokemon from "@/pages/api/pokemon-finder";
import { Pokemon } from "@favware/graphql-pokemon";

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
  const [pokemonData, setPokemonData] = useState<
    Omit<readonly Pokemon[], "__typename">
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    healthcheck();
    const getAllPokemonHandler = async () => {
      setIsLoading(true);
      try {
        const data = await getAllPokemon();
        if (data) setPokemonData(data);
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
        <>
          <h1>Get Pokemon API</h1>
          <Button
            onClick={() => {
              console.log(pokemonData);
            }}
          >
            Button
          </Button>
        </>
      )}
    </React.Fragment>
  );
}
