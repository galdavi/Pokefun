import { useParams } from "react-router-dom";
import { POKEDEX_API_URL, POKEMON_API_URL } from "../constants";
import { useEffect, useState } from "react";
import { type EvolutionChain, type PokedexEntry, type Pokemon } from "../types";
import BaseStats from "../components/pokemon-details/BaseStats";
import TypeDefense from "../components/pokemon-details/TypeDefense";
import BasicData from "../components/pokemon-details/BasicData";
import TrainingData from "../components/pokemon-details/TrainingData";
import BreedingData from "../components/pokemon-details/BreedingData";
import Artwork from "../components/pokemon-details/Artwork";
import PokedexEntries from "../components/pokemon-details/PokedexEntries";
import Evolution from "../components/pokemon-details/Evolution";

export default function PokemonDetails() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokedexEntry, setPokedexEntry] = useState<PokedexEntry | null>(null);
    const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
    const param = useParams();

    useEffect(() => {
        const API_URL = [
        POKEMON_API_URL + param.pokemon?.toLowerCase(),
        POKEDEX_API_URL + param.pokemon?.toLowerCase()
    ]
        const fetchData = async () => {
            try {
                const allPromises = API_URL.map(async (url) => {
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error(`${res.status}`);
                    }
                    return res.json();

                });

                const [pokemonData, pokedexData] = await Promise.all(allPromises)
                setPokemon(pokemonData);
                setPokedexEntry(pokedexData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    },[param]);

    useEffect(() => {
        if(!pokedexEntry){
            return;
        }
        fetch(pokedexEntry.evolution_chain.url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}`);
                }

                return res.json();
            })
            .then((data) => {
                setEvolutionChain(data);
            })
            .catch((err) => { console.error(err); })

    }, [pokedexEntry]);

    console.log(evolutionChain);
    return (
        <>
            {!pokemon || !pokedexEntry || !evolutionChain ? `Pokemon ${param.pokemon} not found` :
                <main className="flex flex-col items-center justify-center w-full bg-white rounded-sm border border-gray-200 shadow-md p-4">
                    <section className="grid grid-cols-1 justify-items-center w-full max-w-lg h-auto pt-2 border border-neutral-200 rounded-md gap-2 shadow-sm">
                        <Artwork pokemon={pokemon} />
                        <PokedexEntries pokedexEntry={pokedexEntry} />
                    </section>

                    <section className="grid grid-cols-1 gap-8">
                        <BasicData pokemon={pokemon} pokedexEntry={pokedexEntry} />
                        <TrainingData pokemon={pokemon} pokedexEntry={pokedexEntry} />
                        <BreedingData pokedexEntry={pokedexEntry} />
                    </section>

                    <section className="grid grid-cols-1 w-full py-4 gap-8">
                        <BaseStats data={pokemon.stats} />
                        <TypeDefense pokemonTypes={pokemon.types} />
                    </section>

                    <section >
                        <Evolution evolutionChain={evolutionChain}/>

                    </section>
                </main>

            }
        </>

    );
}