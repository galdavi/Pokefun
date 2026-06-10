import { useEffect, useState } from "react";
import PokedexCard from "./PokedexCard";


interface Pokedex {
    pokemon_species: Array<{ name: string, url: string }>
}


function getSortedPokemons(pokedex: Pokedex | null) {
    if (!pokedex) {
        return [];
    }
    const pokemons = pokedex.pokemon_species.map((p) => {
        const id = Number(p.url.slice(42, -1));
        
        let name = p.name.replace(/-/g, " ");
        name = name.replace(/(^|\s)[a-z]/g, match => match.toUpperCase())


        return ({ id, name });
    })
    pokemons.sort((a, b) => a.id - b.id)
    return pokemons;

}
export default function Pokedex({ url }: { url: string | null }) {
    const [pokedex, setPokedex] = useState<Pokedex | null>(null);

    const pokemons = getSortedPokemons(pokedex);

    useEffect(() => {
        if (url) {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    return response.json();
                })
                .then((data) => {
                    setPokedex(data);
                })
                .catch((err) => { console.error(err); })
        }
    }, [url]);
    return (
        <>
            {pokedex &&
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {pokemons.map((p) => {
                        return (<PokedexCard key={p.id} pokemon={p} />);
                    })}
                </div>
            }
        </>
    );
}