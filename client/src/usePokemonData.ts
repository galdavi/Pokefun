import { useEffect, useState } from "react";
import { NATIONAL_POKEDEX_API_URL } from "./constants";
import type {
  ErrorState,
  EvolutionChain,
  Pokedex,
  Pokemon,
  PokemonSpecies,
} from "./types";

interface PokemonState {
  pokemonSpecies: PokemonSpecies | null;
  pokedex: Pokedex | null;
  pokemon: Pokemon | null;
  formURL: string | null;
  evolutionChain: EvolutionChain | null;
  error: ErrorState | null;
}
export default function usePokemonData(url: string) {
  const [state, setState] = useState<PokemonState>({
    pokemonSpecies: null,
    pokedex: null,
    pokemon: null,
    formURL: null,
    evolutionChain: null,
    error: null,
  });

  const isLoading =
    !state.pokemonSpecies ||
    !state.pokedex ||
    !state.pokemon ||
    !state.evolutionChain;
  function selectPokemonForm(newFormURL: string) {
    setState((prev) => ({
      ...prev,
      formURL: newFormURL,
    }));
  }

  //Pokedex
  useEffect(() => {
    const controller = new AbortController();

    const fetchPokedexData = async () => {
      setState((prev) => ({
        ...prev,
        pokedex: null,
        error: null,
      }));

      try {
        const response = await fetch(NATIONAL_POKEDEX_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const pokedexData = await response.json();
        setState((prev) => ({
          ...prev,
          pokedex: pokedexData,
        }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(`Unexpected error occurred`);
        if (error.name === `AbortError`) {
          return;
        }

        const errorType = {
          title: `Could not load Pokedex data`,
          message: error.message,
        };

        setState((prev) => ({
          ...prev,
          error: errorType,
        }));
      }
    };

    fetchPokedexData();

    return () => controller.abort();
  }, []);

  //Pokemon Species
  useEffect(() => {
    const controller = new AbortController();

    const fetchSpeciesData = async () => {
      setState((prev) => ({
        ...prev,
        pokemonSpecies: null,
        pokemon: null,
        formURL: null,
        evolutionChain: null,
        error: null,
      }));
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const speciesData = await response.json();
        setState((prev) => ({
          ...prev,
          pokemonSpecies: speciesData,
          formURL: speciesData.varieties[0].pokemon.url,
        }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unexpected error occurred");
        if (error.name === `AbortError`) {
          return;
        }
        const errorType = {
          title: `Could not load Pokemon Species data`,
          message: error.message,
        };

        setState((prev) => ({
          ...prev,
          error: errorType,
        }));
      }
    };

    fetchSpeciesData();

    return () => controller.abort();
  }, [url]);

  //Evolution Chain
  useEffect(() => {
    const controller = new AbortController();
    const fetchEvolutionData = async () => {
      const evolutionURL = state.pokemonSpecies?.evolution_chain.url;
      if (!evolutionURL) {
        return;
      }
      setState((prev) => ({
        ...prev,
        evolutionChain: null,
        error: null,
      }));

      try {
        const response = await fetch(evolutionURL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const evolutionData = await response.json();

        setState((prev) => ({
          ...prev,
          evolutionChain: evolutionData,
        }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(`Unexpected error occurred`);

        if (error.name === `AbortError`) {
          return;
        }
        const errorType = {
          title: `Could not load evolution data`,
          message: error.message,
        };

        setState((prev) => ({
          ...prev,
          error: errorType,
        }));
      }
    };

    fetchEvolutionData();

    return () => controller.abort();
  }, [state.pokemonSpecies]);

  //Pokemon Form
  useEffect(() => {
    const controller = new AbortController();

    const fetchFormData = async () => {
      if (!state.formURL) {
        return;
      }

      setState((prev) => ({
        ...prev,
        pokemon: null,
        error: null,
      }));

      try {
        const response = await fetch(state.formURL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const pokemonData = await response.json();
        setState((prev) => ({
          ...prev,
          pokemon: pokemonData,
          error: null,
        }));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(`Unexpected error occurred`);

        if (error.name === `AbortError`) {
          return;
        }
        const errorType = {
          title: `Could not load Pokemon form data`,
          message: error.message,
        };

        setState((prev) => ({
          ...prev,
          error: errorType,
        }));
      }
    };

    fetchFormData();
    return () => controller.abort();
  }, [state.formURL]);

  return { state, isLoading, selectPokemonForm };
}
