import { useParams } from "react-router-dom";
import { POKEDEX_API_URL, POKEMON_API_URL } from "../constants";
import { useEffect, useState } from "react";
import type { PokedexEntry, Pokemon } from "../types";
import PokedexCard from "../components/PokedexCard";
import PokedexEntries from "../components/PokedexEntries";
import PokemonStats from "../components/PokemonStats";


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

    console.log(pokemon);
    console.log(pokedexEntry);
    return (
        <>
            {!pokemon ? `Pokemon ${param.pokemon} not found` :
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-sm border border-gray-200 shadow-md p-4">

                    <div className="flex w-lg items-center pt-4 gap-2 ">
                        <div className="flex w-lg items-center pt-4 gap-2 ">

                            <PokedexCard pokemon={pokemon} />
                            <div>
                                <PokedexEntries pokemon={pokemon} />
                            </div>
                        </div>
                    </div>

                    <div className="grid-rows-1 w-full py-4">
                        <PokemonStats data={pokemon.stats}/>
                    </div>
                </div>
                
            }
        </>

    );
}