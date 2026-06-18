import { useParams } from "react-router-dom";
import { POKEDEX_API_URL, POKEMON_API_URL } from "../constants";
import { useEffect, useState } from "react";
import type { PokedexEntry, Pokemon } from "../types";
import PokedexCard from "../components/PokedexCard";
import PokedexEntries from "../components/pokemon-details/PokedexEntries";
import BaseStats from "../components/pokemon-details/BaseStats";
import TypeDefense from "../components/pokemon-details/TypeDefense";
import BasicData from "../components/pokemon-details/BasicData";
import TrainingData from "../components/pokemon-details/TrainingData";
import BreedingData from "../components/pokemon-details/BreedingData";
import { colHead } from "../components/pokemon-details/styles";


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
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-sm border border-gray-200 shadow-md p-4">

                    <div className="flex w-lg items-center pt-4 gap-2 ">
                        <div className="flex w-lg items-center pt-4 gap-2 ">

                            <PokedexCard pokemon={pokemon} />
                            <div>
                                <PokedexEntries pokemon={pokemon} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 text-sm  gap-4 px-2 py-8">
                        <div className="flex flex-col gap-4">
                            <h2 className={`${colHead} h-8`}>Pokemon Data</h2>
                            <BasicData pokemon={pokemon} pokedexEntry={pokedexEntry} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <h2 className={colHead}>Training</h2>
                            <TrainingData pokemon={pokemon} pokedexEntry={pokedexEntry} />
                            <h2 className={colHead}>Breeding</h2>
                            <BreedingData pokedexEntry={pokedexEntry} />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 w-full py-4 gap-4">
                        <BaseStats data={pokemon.stats} />
                        <TypeDefense pokemonTypes={pokemon.types} />
                    </div>
                </div>

            }
        </>

    );
}