import { useState } from "react";
import { toTitleCase } from "../../helpers/formatters";
import type { Pokemon } from "../../types";

function getArtwork(pokemon: Pokemon) {
    const artwork = new Map<string, string>();
    for (const [key, value] of Object.entries(pokemon.sprites.other)) {
        if (key !== "showdown") {
            artwork.set(toTitleCase(key), value.front_default);
        }
    }
    return artwork
}


export default function Artwork({ pokemon }: { pokemon: Pokemon }) {
    const artwork = getArtwork(pokemon);
    const [current, setCurrent] = useState("Official Artwork");
    return (
        <div className="grid grid-cols-1 justify-items-center w-full">
            <div className="relative">
                <img  className="absolute h-full w-full object-cover"  src={artwork.get(current)} alt={current}/>
            </div>

        </div>
    );
}