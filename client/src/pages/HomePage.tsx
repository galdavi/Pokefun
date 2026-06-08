import { useEffect, useState } from "react";
import { POKEMON_API_URL } from "../constants";
import { type Pokemon } from "../types";
import PokedexCard from "../components/PokedexCard";
import PokedexEntries from "../components/PokedexEntries";



export default function HomePage() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);


    useEffect(() => {
        fetch(`${POKEMON_API_URL}/151`)
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


    return (
        <>
            {
            pokemon &&
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-text-primary py-4">Featured Pokemon</h2>
                    <PokedexCard pokemon={pokemon} />

                    <div className="">
                        <PokedexEntries pokemon={pokemon} />
                    </div>
                </div>
            }
        </>
    );
}