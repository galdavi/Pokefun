import { useParams } from "react-router-dom";
import { NATIONAL_POKEDEX_API_URL, POKEMON_SPECIES_API_URL, POKEMON_API_URL } from "../constants";
import { useEffect, useState } from "react";
import type { Pokedex, ErrorState, EvolutionChain, Pokemon, PokemonSpecies } from "../types";
import BaseStats from "../components/pokemon-details/BaseStats";
import TypeDefense from "../components/pokemon-details/TypeDefense";
import BasicData from "../components/pokemon-details/BasicData";
import TrainingData from "../components/pokemon-details/TrainingData";
import BreedingData from "../components/pokemon-details/BreedingData";
import Artwork from "../components/pokemon-details/Artwork";
import PokedexEntries from "../components/pokemon-details/PokedexEntries";
import Evolution from "../components/pokemon-details/Evolution";
import Loader from "../components/Loader";
import FetchError from "../components/FetchError";
import PageTitle from "../components/pokemon-details/PageTitle";


export default function PokemonDetails() {
    const [error, setError] = useState<ErrorState | null>(null);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
    const [pokedex, setPokedex] = useState<Pokedex | null>(null);
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
    const param = useParams();
    const detailsSectionLayout = "flex flex-col lg:flex-row w-full items-center justify-evenly gap-8 pb-10";
    useEffect(() => {
        const API_URLS = [
            POKEMON_API_URL + param.pokemon?.toLowerCase(),
            POKEMON_SPECIES_API_URL + param.pokemon?.toLowerCase(),
            NATIONAL_POKEDEX_API_URL
        ]
        const fetchData = async () => {
            setError(null);
            setPokemon(null);
            setPokemonSpecies(null);
            setPokedex(null);
            try {
                const allPromises = API_URLS.map(async (url) => {
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error(`${res.status}`);
                    }
                    return res.json();

                });

                const [pokemonData, pokemonSpeciesData, pokedexData] = await Promise.all(allPromises)
                setPokemon(pokemonData);
                setPokemonSpecies(pokemonSpeciesData);
                setPokedex(pokedexData);

            } catch (error) {
                const errorType = {
                    title: `Could not load Pokémon data`,
                    message: error instanceof Error ? error.message : "Unexpected error occurred"
                }

                setError(errorType)
            }
        }

        fetchData();
    }, [param.pokemon]);

    useEffect(() => {
        
        if (!pokemonSpecies) {
            return;
        }
        
        fetch(pokemonSpecies.evolution_chain.url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}`);
                }

                return res.json();
            })
            .then((data) => {
                setEvolutionChain(data);
            })
            .catch((error) => {
                const errorType = {
                    title: `Could not find evolution chain`,
                    message: error instanceof Error ? error.message : "Unexpected error occurred"
                }

                setError(errorType)
            })

    }, [pokemonSpecies]);

    if (error) {
        return (
            <FetchError error={error} />
        );
    }
    if (!pokemon || !pokemonSpecies || !evolutionChain || !pokedex) {
        return (
            <Loader />
        );
    }

    return (
        <div className="flex flex-col items-center w-full max-w-7xl py-4 px-10 bg-white border border-gray-200 shadow-md gap-10 divide-y divide-gray-200 ">
            <PageTitle name={pokemon.name} id={pokemon.id} pokedex={pokedex.pokemon_entries} />

            <section className={detailsSectionLayout}>
                <div className="flex flex-col items-center w-full max-w-sm h-auto pt-2 border border-neutral-200 rounded-md gap-4 shadow-sm">
                    <Artwork pokemon={pokemon} />
                    <PokedexEntries pokedexEntry={pokemonSpecies} />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 ">
                    <BasicData pokemon={pokemon} pokedexEntry={pokemonSpecies} />
                    <div className="flex flex-col gap-8">
                        <TrainingData pokemon={pokemon} pokedexEntry={pokemonSpecies} />
                        <BreedingData pokedexEntry={pokemonSpecies} />
                    </div>
                </div>
            </section>
            <section className={detailsSectionLayout}>
                <BaseStats data={pokemon.stats} />
                <TypeDefense pokemonTypes={pokemon.types} />
            </section>
            <section className={detailsSectionLayout}>
                <Evolution pokemonName={pokemon.name} evolutionChain={evolutionChain.chain} />
            </section>
        </div>


    );
}