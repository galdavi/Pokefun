import { useEffect, useState } from "react";
import { type Pokemon } from "../types";
import { POKEDEX_API_URL } from "../constants";



export default function PokedexEntries({ pokemon }: { pokemon: Pokemon }) {
    const [pokdexEntry, setPokdexEntry] = useState();
    
    useEffect(() => {
        fetch(`${POKEDEX_API_URL}/${pokemon.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} `);
                }

                return response.json();
            })
            .then((data) => {
                console.log(data.flavor_text_entries[0]);
                setPokdexEntry(data.flavor_text_entries[0].flavor_text.replace(/[\t\r\n]+/g, " "));
            })
            .catch((error) => { console.error(error); })
    }, [pokemon.id]);
    return (
        <div className="">
            {pokdexEntry}
        </div>
    );
}
