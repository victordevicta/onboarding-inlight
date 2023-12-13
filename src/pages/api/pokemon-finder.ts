import type {
  PokemonEnum,
  Query,
  QueryGetAllPokemonArgs,
  QueryGetPokemonArgs,
} from "@favware/graphql-pokemon";
import ApolloClient from "apollo-boost";
import fetch from "cross-fetch";
import gql from "graphql-tag";
const POKEMON_API = "https://graphqlpokemon.favware.tech/v8";

type GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> = Record<
  K,
  Omit<Query[K], "__typename">
>;

const apolloClient = new ApolloClient({
  uri: POKEMON_API,
  fetch,
});

export async function getAllPokemon() {
  const getAllPokemon = gql`
    query getAllPokemon($offset: Int, $take: Int) {
      getAllPokemon(offset: $offset, take: $take) {
        key
        num
        mythical
        types {
          name
        }
        sprite
        species
      }
    }
  `;

  const {
    data: { getAllPokemon: pokemonData },
  } = await apolloClient.query<
    GraphQLPokemonResponse<"getAllPokemon">,
    QueryGetAllPokemonArgs
  >({
    query: getAllPokemon,
    variables: { offset: 92, take: 345 },
  });

  return pokemonData;
}

export async function getPokemon(name: PokemonEnum) {
  const getPokemon = gql`
    query GetPokemon($pokemon: PokemonEnum!) {
      getPokemon(pokemon: $pokemon) {
        key
        num
        mythical
        types {
          name
        }
        sprite
        species
        flavorTexts {
          flavor
        }
        baseStats {
          attack
          defense
          hp
          specialattack
          specialdefense
          speed
        }
      }
    }
  `;

  const {
    data: { getPokemon: pokemonData },
  } = await apolloClient.query<
    GraphQLPokemonResponse<"getPokemon">,
    QueryGetPokemonArgs
  >({
    query: getPokemon,
    variables: { pokemon: name },
  });

  return pokemonData;
}
