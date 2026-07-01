import { useEffect, useState } from "react";
import { POKEMON_API_URL, POKEDEX_API_URL } from "../constants";
import { type PokedexEntry, type Pokemon } from "../types";
import PokedexEntries from "../components/pokemon-details/PokedexEntries";
import PokedexCard from "../components/PokedexCard";



export default function HomePage() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokedexEntry, setPokedexEntry] = useState<PokedexEntry | null>(null);

    useEffect(() => {
        fetch(`${POKEMON_API_URL}/56`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} `);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                setPokemon(data);
            })
            .catch((error) => { console.error(error); })
    }, []);

   useEffect(() => {
        fetch(`${POKEDEX_API_URL}/56`)
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
    }, []);
    return (
        <>
            {
            pokemon && pokedexEntry &&
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-text-primary py-4">Featured Pokemon</h2>
                    <PokedexCard pokemon={pokemon} />

                    <div className="">
                        <PokedexEntries pokedexEntry={pokedexEntry} />
                    </div>
                </div>
            }
        </>
    );
}