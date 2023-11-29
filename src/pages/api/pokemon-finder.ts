import type { Query, QueryGetAllPokemonArgs } from "@favware/graphql-pokemon";
import ApolloClient from "apollo-boost";
import fetch from "cross-fetch";
import gql from "graphql-tag";
const POKEMON_URL = "https://graphqlpokemon.favware.tech/v8";

type GraphQLPokemonResponse<K extends keyof Omit<Query, "__typename">> = Record<
  K,
  Omit<Query[K], "__typename">
>;

const apolloClient = new ApolloClient({
  uri: POKEMON_URL,
  fetch,
});

export default async function getAllPokemon() {
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
    variables: { offset: 89, take: 251 },
  });

  return pokemonData;
}
