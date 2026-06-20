import { useParams } from "react-router-dom";
import { POKEDEX_API_URL, POKEMON_API_URL } from "../constants";
import { useEffect, useState } from "react";
import type { PokedexEntry, Pokemon } from "../types";
import BaseStats from "../components/pokemon-details/BaseStats";
import TypeDefense from "../components/pokemon-details/TypeDefense";
import BasicData from "../components/pokemon-details/BasicData";
import TrainingData from "../components/pokemon-details/TrainingData";
import BreedingData from "../components/pokemon-details/BreedingData";


export default function PokemonDetails() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokedexEntry, setPokedexEntry] = useState<PokedexEntry | null>(null);
    const param = useParams();

    useEffect(() => {
        fetch(POKEMON_API_URL + param.pokemon)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}`);
                }

                return res.json();
            })
            .then((data) => {
                setPokemon(data);
            })
            .catch((err) => { console.error(err); })

    }, [param])

    useEffect(() => {
        fetch(POKEDEX_API_URL + param.pokemon)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}`)
                }
                return res.json();
            })
            .then((data) => {
                setPokedexEntry(data);
            })
            .catch((err) => { console.error(err); })
    }, [param.pokemon]);

    return (
        <>
            {!pokemon || !pokedexEntry ? `Pokemon ${param.pokemon} not found` :
                <main className="flex flex-col items-center justify-center w-full bg-white rounded-sm border border-gray-200 shadow-md p-4">
                    <section className="grid grid-cols-1 gap-8">
                        <BasicData pokemon={pokemon} pokedexEntry={pokedexEntry}/>
                        <TrainingData pokemon={pokemon} pokedexEntry={pokedexEntry}/>
                        <BreedingData pokedexEntry={pokedexEntry}/>
                    </section>

                    <section className="grid grid-cols-1 w-full py-4 gap-8">
                        <BaseStats data={pokemon.stats} />
                        <TypeDefense pokemonTypes={pokemon.types} />
                    </section>
                </main>

            }
        </>

    );
}